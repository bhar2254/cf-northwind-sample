import { getDB } from './db';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith('/customers')) {
    return handleCustomersRequest();
  } else if (path.startsWith('/orders')) {
    return handleOrdersRequest();
  } else if (path.startsWith('/products')) {
    return handleProductsRequest();
  }

  return new Response('Not Found', { status: 404 });
}

async function handleCustomersRequest() {
  const db = await getDB();
  const rows = await db.prepare('SELECT * FROM Customers').all();
  return new Response(JSON.stringify(rows), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleOrdersRequest() {
  const db = await getDB();
  const rows = await db.prepare('SELECT * FROM Orders').all();
  return new Response(JSON.stringify(rows), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleProductsRequest() {
  const db = await getDB();
  const rows = await db.prepare('SELECT * FROM Products').all();
  return new Response(JSON.stringify(rows), {
    headers: { 'Content-Type': 'application/json' },
  });
}
