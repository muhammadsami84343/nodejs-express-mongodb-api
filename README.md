# E-commerce RESTful API

A robust, database-driven backend API for an e-commerce application built with Node.js, Express, and Mongoose (MongoDB).

## Features

- Three interconnected data models: Category, Product, and Order
- Complete CRUD functionality (15 endpoints total)
- MongoDB integration with Mongoose ODM
- Proper error handling and validation
- RESTful API design

## Project Structure

```
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── server.js             # Main application and database connection
├── models/
│   ├── Category.js       # Category schema/model
│   ├── Product.js        # Product schema/model (references Category)
│   └── Order.js          # Order schema/model (references Product)
├── routes/
│   ├── categoryRoutes.js # Category CRUD endpoints
│   ├── productRoutes.js  # Product CRUD endpoints
│   └── orderRoutes.js    # Order CRUD endpoints
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nodejs-express-mongodb-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=3000
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
```

## Running the Server

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in .env).

## API Endpoints

### Categories (`/api/categories`)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| POST | `/api/categories` | Create a new category | 201 Created |
| GET | `/api/categories` | Get all categories | 200 OK |
| GET | `/api/categories/:id` | Get a single category by ID | 200 OK / 404 Not Found |
| PUT | `/api/categories/:id` | Update a category | 200 OK |
| DELETE | `/api/categories/:id` | Delete a category | 200 OK |

### Products (`/api/products`)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| POST | `/api/products` | Create a new product | 201 Created |
| GET | `/api/products` | Get all products (with category populated) | 200 OK |
| GET | `/api/products/:id` | Get a single product (with category populated) | 200 OK / 404 Not Found |
| PUT | `/api/products/:id` | Update a product | 200 OK |
| DELETE | `/api/products/:id` | Delete a product | 200 OK |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| POST | `/api/orders` | Create a new order | 201 Created |
| GET | `/api/orders` | Get all orders (with products populated) | 200 OK |
| GET | `/api/orders/:id` | Get a single order (with products populated) | 200 OK / 404 Not Found |
| PUT | `/api/orders/:id` | Update an order | 200 OK |
| DELETE | `/api/orders/:id` | Delete an order | 200 OK |

## Sample Requests

### Create a Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics", "description": "Electronic devices and gadgets"}'
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "<category_id>",
    "stockQuantity": 50
  }'
```

### Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product": "<product_id>",
        "quantity": 2,
        "priceAtTimeOfOrder": 999.99
      }
    ],
    "customerName": "John Doe",
    "totalAmount": 1999.98,
    "status": "Pending"
  }'
```

### Get All Products (with populated category)
```bash
curl http://localhost:3000/api/products
```

### Get Single Order (with populated products)
```bash
curl http://localhost:3000/api/orders/<order_id>
```

### Update a Category
```bash
curl -X PUT http://localhost:3000/api/categories/<category_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Electronics", "description": "Updated description"}'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:3000/api/products/<product_id>
```

## Data Models

### Category
```javascript
{
  name: String,        // required, unique
  description: String
}
```

### Product
```javascript
{
  name: String,           // required
  description: String,
  price: Number,          // required
  category: ObjectId,     // references Category
  stockQuantity: Number   // default: 0
}
```

### Order
```javascript
{
  items: [{
    product: ObjectId,       // references Product, required
    quantity: Number,        // required, min: 1
    priceAtTimeOfOrder: Number // required
  }],
  customerName: String,      // required
  totalAmount: Number,       // required
  status: String            // default: "Pending"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK` - Successful GET, PUT, DELETE operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Validation errors or invalid ID format
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## License

ISC