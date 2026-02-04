PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
    CustomerID TEXT PRIMARY KEY,
    CompanyName TEXT,
    ContactName TEXT,
    ContactTitle TEXT,
    Address TEXT,
    City TEXT,
    Region TEXT,
    PostalCode TEXT,
    Country TEXT
);

CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName TEXT,
    SupplierID INTEGER,
    CategoryID INTEGER,
    QuantityPerUnit TEXT,
    UnitPrice REAL,
    InStock INTEGER
);

CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerID TEXT,
    EmployeeID INTEGER,
    OrderDate TEXT,
    ShippedDate TEXT,
    ShipAddress TEXT,
    ShipCity TEXT,
    ShipCountry TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

CREATE TABLE OrderDetails (
    OrderDetailID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    UnitPrice REAL,
    Discount REAL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country)
VALUES 
('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', 'Berlin', '12209', 'Germany'),
('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constitución 2222', 'México D.F.', NULL, '05021', 'Mexico');

INSERT INTO Products (ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, InStock)
VALUES 
('Apple', 1, 1, '12 per box', 3.5, 100),
('Orange', 1, 1, '12 per box', 2.2, 150);

INSERT INTO Orders (OrderID, CustomerID, EmployeeID, OrderDate, ShippedDate, ShipAddress, ShipCity, ShipCountry)
VALUES
(1, 'ALFKI', 1, '2026-01-01', '2026-01-03', 'Obere Str. 57', 'Berlin', 'Germany'),
(2, 'ANATR', 2, '2026-01-02', '2026-01-04', 'Avda. de la Constitución 2222', 'México D.F.', 'Mexico');

INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, Discount)
VALUES
(1, 1, 10, 3.5, 0),
(2, 2, 20, 2.2, 0);
