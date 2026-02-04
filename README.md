# CF-Northwind-Sample REST API

Welcome to **CF-Northwind-Sample**, a RESTful API built to interact with the classic Northwind database, running on Cloudflare's D1 database service. This API provides endpoints to interact with data related to customers, orders, products, and order details. It's designed for testing and validating REST-compliant applications.

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Deployment](#deployment)
* [API Endpoints](#api-endpoints)
* [Database Structure](#database-structure)
* [Testing and Validation](#testing-and-validation)

## Overview

The **CF-Northwind-Sample** API is a simple RESTful service built using **SQLite** for the database, deployed in **Cloudflare's D1 database environment**. It exposes endpoints that allow you to interact with the Northwind data model, which includes entities like `Customers`, `Orders`, `Products`, and `OrderDetails`.

This API is ideal for developers looking to test their RESTful applications or explore how APIs interact with relational databases in the cloud.

### Key Features

* Fully functional **CRUD operations** (Create, Read, Update, Delete) for managing:

  * Customers
  * Orders
  * Products
  * Order Details
* Built on **Cloudflare D1** database to simulate production-level database usage.
* **REST-compliant** API endpoints with HTTP methods such as `GET`, `POST`, `PUT`, `DELETE`.
* Sample data from the classic **Northwind** database for realistic use cases.
* **Lightweight** and easy-to-extend API suitable for testing and development.

## Features

* **Customer Management**: Create, retrieve, update, and delete customer records.
* **Order Management**: Handle orders, linking customers to products.
* **Product Management**: Add, retrieve, and update product details.
* **Order Details**: Track specific items ordered within each order.
* **Relationships**: Foreign key constraints to enforce data integrity between entities.

## Prerequisites

* **Cloudflare Account**: You will need a Cloudflare account to deploy to D1.
* **D1 Database**: The API uses Cloudflare's **D1 Database** for storing data. Ensure your account is set up with D1.
* **Node.js & npm**: If running locally, you’ll need Node.js (v16 or higher) installed for setting up the server.

## Deployment

### Deploying to Cloudflare

1. **Set up Cloudflare D1**:

   * Follow the steps in Cloudflare's documentation to provision a **D1 database** for your account. You will need to create the database and the necessary tables (the schema is provided in this repo).

2. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/CF-Northwind-Sample.git
   cd CF-Northwind-Sample
   ```

3. **Configure your environment**:
   Create a `.env` file and add the following configuration details:

   ```
   D1_DATABASE_ID=your_d1_database_id
   D1_API_TOKEN=your_api_token
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Deploy the API**:
   Using Cloudflare's development tools (such as `wrangler`), deploy the API:

   ```bash
   wrangler publish
   ```

   This will deploy the API to Cloudflare's edge network, making it accessible globally.

### Testing Locally

If you'd prefer to test locally before deploying, you can use **SQLite** for local development.

1. **Install SQLite**:

   ```bash
   npm install sqlite3
   ```

2. **Start the API locally**:

   ```bash
   npm run dev
   ```

   This will spin up a local server running on `http://localhost:3000`.

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

### Order Details

* **GET** `/orderdetails`

  * Retrieve all order details.

* **GET** `/orderdetails/:id`

  * Retrieve order details by ID.

* **POST** `/orderdetails`

  * Add a product to an order.

* **PUT** `/orderdetails/:id`

  * Update the details of a specific order item.

* **DELETE** `/orderdetails/:id`

  * Delete an order item by ID.

## Database Structure

The API interacts with a **D1 SQLite** database structured as follows:

* **Customers**:

  * `CustomerID` (TEXT)
  * `CompanyName` (TEXT)
  * `ContactName` (TEXT)
  * `ContactTitle` (TEXT)
  * `Address` (TEXT)
  * `City` (TEXT)
  * `Region` (TEXT)
  * `PostalCode` (TEXT)
  * `Country` (TEXT)

* **Products**:

  * `ProductID` (INTEGER, PRIMARY KEY AUTOINCREMENT)
  * `ProductName` (TEXT)
  * `SupplierID` (INTEGER)
  * `CategoryID` (INTEGER)
  * `QuantityPerUnit` (TEXT)
  * `UnitPrice` (REAL)
  * `InStock` (INTEGER)

* **Orders**:

  * `OrderID` (INTEGER, PRIMARY KEY AUTOINCREMENT)
  * `CustomerID` (TEXT, FOREIGN KEY)
  * `EmployeeID` (INTEGER)
  * `OrderDate` (TEXT)
  * `ShippedDate` (TEXT)
  * `ShipAddress` (TEXT)
  * `ShipCity` (TEXT)
  * `ShipCountry` (TEXT)

* **OrderDetails**:

  * `OrderDetailID` (INTEGER, PRIMARY KEY AUTOINCREMENT)
  * `OrderID` (INTEGER, FOREIGN KEY)
  * `ProductID` (INTEGER, FOREIGN KEY)
  * `Quantity` (INTEGER)
  * `UnitPrice` (REAL)
  * `Discount` (REAL)

## Testing and Validation

### Postman Collection

You can import the Postman collection provided in this repo to test all the API endpoints in a **RESTful** manner.

1. Download the Postman collection (`CF-Northwind-Sample.postman_collection.json`).
2. Import it into Postman.
3. Run the requests against the deployed API or your local server.

### Unit Testing

The project includes a suite of unit tests using **Jest** and **Supertest** to ensure the API functions as expected.

To run the tests locally:

```bash
npm test
```

This will execute the tests and verify that all endpoints are working properly.
