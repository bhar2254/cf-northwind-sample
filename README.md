# CF-Northwind-Sample REST API

**CF-Northwind-Sample** is a RESTful API built to interact with the classic Northwind database, running on **Cloudflare Workers** and **D1 Database**. It exposes endpoints for managing customers, orders, and products, designed for testing and validating REST-compliant applications.

This project is released under the **GNU General Public License (GPL)**, providing open-source flexibility for modification and redistribution.

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Deployment](#deployment)
* [API Endpoints](#api-endpoints)
* [Database Structure](#database-structure)
* [Testing and Validation](#testing-and-validation)
* [License](#license)

## Overview

The **CF-Northwind-Sample** API is a **Cloudflare Workers**-based REST API that interacts with an **SQLite**-based **D1 Database**. It provides endpoints to manage core business entities like customers, products, and orders, making it an ideal tool for testing REST APIs and cloud-based databases.

### Key Features

* Fully functional **CRUD operations** (Create, Read, Update, Delete) for managing:

  * Customers
  * Orders
  * Products
* Built using **Cloudflare Workers** for easy deployment at the edge.
* **REST-compliant** API endpoints with HTTP methods such as `GET`, `POST`, `PUT`, `DELETE`.
* **SQLite** database powered by **Cloudflare D1** for easy management and testing.
* **Open-source** under the **GNU General Public License (GPL)**.

## Features

* **Customer Management**: Create, retrieve, update, and delete customer records.
* **Order Management**: Handle orders, linking customers to products.
* **Product Management**: Add, retrieve, and update product details.
* **Lightweight and scalable**: Easy-to-use API designed to test REST-compliant applications at scale.

## Prerequisites

* **Cloudflare Account**: You will need a Cloudflare account to deploy to D1.
* **D1 Database**: The API uses Cloudflare's **D1 Database** for storing data. Ensure your account is set up with D1.
* **Node.js & npm**: If running locally, you’ll need Node.js (v16 or higher) installed for setting up the server.
* **Cloudflare Workers**: The app is deployed using **Cloudflare Workers**. Ensure you have **wrangler** installed for deployment.

## Deployment

### Deploying to Cloudflare Workers

1. **Set up Cloudflare D1**:

   * Follow Cloudflare’s guide to provision a **D1 database**.
   * Create the database and apply the schema for **Customers**, **Orders**, and **Products** (see Database Structure section).

2. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/CF-Northwind-Sample.git
   cd CF-Northwind-Sample
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure your Cloudflare Workers**:

   * Set up `wrangler.toml` and configure your environment with the D1 database details.
   * Create a `.env` file and add the following:

   ```
   D1_DATABASE_ID=your_d1_database_id
   D1_API_TOKEN=your_api_token
   ```

5. **Deploy to Cloudflare Workers**:

   ```bash
   wrangler publish
   ```

   This will deploy your API to Cloudflare’s edge network, making it globally accessible.

### Testing Locally

If you prefer testing the API locally, you can run it using **SQLite** instead of D1:

1. **Install SQLite**:

   ```bash
   npm install sqlite3
   ```

2. **Start the API locally**:

   ```bash
   npm run dev
   ```

   This will start the server locally, typically at `http://localhost:3000`.

## API Endpoints

### Customers

* **GET** `/customers`

  * Retrieve a list of all customers.

* **GET** `/customers/:id`

  * Retrieve a specific customer by ID.

* **POST** `/customers`

  * Create a new customer.

* **PUT** `/customers/:id`

  * Update a customer's details by ID.

* **DELETE** `/customers/:id`

  * Delete a customer by ID.

### Products

* **GET** `/products`

  * Retrieve a list of all products.

* **GET** `/products/:id`

  * Retrieve a specific product by ID.

* **POST** `/products`

  * Create a new product.

* **PUT** `/products/:id`

  * Update a product's details by ID.

* **DELETE** `/products/:id`

  * Delete a product by ID.

### Orders

* **GET** `/orders`

  * Retrieve a list of all orders.

* **GET** `/orders/:id`

  * Retrieve a specific order by ID.

* **POST** `/orders`

  * Create a new order.

* **PUT** `/orders/:id`

  * Update an order by ID.

* **DELETE** `/orders/:id`

  * Delete an order by ID.

## Database Structure

The API interacts with a **SQLite** database, structured as follows:

* **Customers**:

  * `CustomerID` (TEXT, Primary Key)
  * `CompanyName` (TEXT)
  * `ContactName` (TEXT)
  * `ContactTitle` (TEXT)
  * `Address` (TEXT)
  * `City` (TEXT)
  * `Region` (TEXT)
  * `PostalCode` (TEXT)
  * `Country` (TEXT)

* **Products**:

  * `ProductID` (INTEGER, Primary Key, AUTOINCREMENT)
  * `ProductName` (TEXT)
  * `SupplierID` (INTEGER)
  * `CategoryID` (INTEGER)
  * `QuantityPerUnit` (TEXT)
  * `UnitPrice` (REAL)
  * `InStock` (INTEGER)

* **Orders**:

  * `OrderID` (INTEGER, Primary Key, AUTOINCREMENT)
  * `CustomerID` (TEXT, Foreign Key)
  * `EmployeeID` (INTEGER)
  * `OrderDate` (TEXT)
  * `ShippedDate` (TEXT)
  * `ShipAddress` (TEXT)
  * `ShipCity` (TEXT)
  * `ShipCountry` (TEXT)

## Testing and Validation

### Postman Collection

You can import the **Postman collection** to test all API endpoints.

1. Download the **Postman collection** (`CF-Northwind-Sample.postman_collection.json`).
2. Import it into Postman.
3. Test the API against your deployed instance or local server.

### Unit Testing

The project includes unit tests using **Jest** and **Supertest**.

To run tests locally:

```bash
npm test
```

This will run the test suite and ensure the API endpoints are functioning correctly.

## License

This project is licensed under the **GNU General Public License (GPL)**, version 3.0 or later. See the [LICENSE](LICENSE) file for full terms.
