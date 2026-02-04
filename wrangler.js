const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

async function getClientIp(request) {
	// Get the client's IP address
	return request.headers.get("CF-Connecting-IP");
}

async function checkRateLimit(ip, database) {
	const now = Date.now();
	const rateLimitKey = `rate-limit:${ip}`;

	// Fetch the current rate limit data from D1
	const result = await database.prepare(`
    SELECT count, last_request_time FROM RateLimit
    WHERE ip = ?`)
		.bind(ip)
		.first();

	if (result) {
		const { count, last_request_time } = result;

		// If the time window has passed, reset the count
		if (now - last_request_time > RATE_LIMIT_WINDOW) {
			await database.prepare(`
        UPDATE RateLimit SET count = 1, last_request_time = ? WHERE ip = ?`)
				.bind(now, ip)
				.run();
			return { allowed: true };
		}

		// If the count is within the limit, allow the request
		if (count < RATE_LIMIT_MAX_REQUESTS) {
			await database.prepare(`
        UPDATE RateLimit SET count = count + 1 WHERE ip = ?`)
				.bind(ip)
				.run();
			return { allowed: true };
		}

		// Rate limit exceeded
		return { allowed: false, message: 'Rate limit exceeded. Try again later.' };
	} else {
		// First request from this IP
		await database.prepare(`
      INSERT INTO RateLimit (ip, count, last_request_time) VALUES (?, 1, ?)`)
			.bind(ip, now)
			.run();
		return { allowed: true };
	}
}

async function handleRequest(request, database) {
	const ip = await getClientIp(request);

	// Check rate limit
	const rateLimitStatus = await checkRateLimit(ip, database);

	if (!rateLimitStatus.allowed) {
		return new Response(rateLimitStatus.message, {
			status: 429,
		});
	}

	// Handle the RESTful API endpoint
	const url = new URL(request.url);
	const path = url.pathname.split('/').filter(Boolean);

	if (path.length === 0) {
		return new Response("Welcome to the Sample RESTful API!", {
			status: 200
		});
	}

	const resource = path[0].toLowerCase();
	const id = path[1] ? path[1] : null;

	switch (resource) {
		case 'customers':
			if (id) {
				return await handleGetCustomer(id, database);
			}
			return new Response("Invalid request for customers.", { status: 400 });

		case 'orders':
			if (id) {
				return await handleGetOrder(id, database);
			}
			return new Response("Invalid request for orders.", { status: 400 });

		default:
			return new Response("Not found", { status: 404 });
	}
}

async function handleGetCustomer(id, database) {
	const customer = await database.prepare(`
    SELECT * FROM Customers WHERE CustomerID = ?`)
		.bind(id)
		.first();

	if (customer) {
		return new Response(JSON.stringify(customer), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}

	return new Response("Customer not found.", { status: 404 });
}

async function handleGetOrder(id, database) {
	const order = await database.prepare(`
    SELECT * FROM Orders WHERE OrderID = ?`)
		.bind(id)
		.first();

	if (order) {
		return new Response(JSON.stringify(order), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}

	return new Response("Order not found.", { status: 404 });
}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request, D1_DATABASE));
});
