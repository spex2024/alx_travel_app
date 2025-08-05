# Hono + Bun + Mongoose + MongoDB API

A modern, fast API built with:
- **Hono** - Fast web framework for the Edge
- **Bun** - Fast JavaScript runtime
- **Mongoose** - MongoDB object modeling
- **MongoDB** - NoSQL database

## 🚀 Features

- ⚡ Lightning-fast performance with Bun runtime
- 🛡️ TypeScript support with full type safety
- 🗄️ MongoDB integration with Mongoose ODM
- 🔄 Complete CRUD operations
- 🧹 Input validation and error handling
- 📝 Comprehensive API documentation
- 🔧 Development tools and scripts

## 📋 Prerequisites

- [Bun](https://bun.sh/) installed
- [MongoDB](https://www.mongodb.com/) running locally or MongoDB Atlas connection

## 🛠️ Installation

1. **Clone and navigate to the project:**
   ```bash
   cd /workspace
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   # The .env file is already created with default values
   # Modify MONGODB_URI if using a different MongoDB instance
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Ubuntu/Debian
   sudo systemctl start mongod

   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

## 🏃‍♂️ Running the Application

### Development Mode (with auto-reload)
```bash
bun run dev
```

### Production Mode
```bash
bun run start
```

### Seed Database with Sample Data
```bash
bun run seed
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
```http
GET /
```
**Response:**
```json
{
  "message": "Hono + Bun + Mongoose + MongoDB API",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "healthy"
}
```

#### Users API

##### Get All Users
```http
GET /api/users
```
**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 30,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

##### Get User by ID
```http
GET /api/users/:id
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### Create New User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "age": 25
}
```
**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 25,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 26
}
```
**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Doe",
    "email": "jane.smith@example.com",
    "age": 26,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:01:00.000Z"
  }
}
```

##### Delete User
```http
DELETE /api/users/:id
```
**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## 🧪 Testing the API

### Using curl

**Get all users:**
```bash
curl http://localhost:3000/api/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "age": 25}'
```

**Get a specific user:**
```bash
curl http://localhost:3000/api/users/USER_ID_HERE
```

**Update a user:**
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "age": 30}'
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID_HERE
```

## 📁 Project Structure

```
/workspace/
├── src/
│   ├── database.ts       # MongoDB connection setup
│   ├── models/
│   │   └── User.ts       # User model and schema
│   └── seed.ts           # Database seeding script
├── index.ts              # Main server file
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
└── README.md             # This file
```

## 🔧 Available Scripts

- `bun run start` - Start the production server
- `bun run dev` - Start development server with auto-reload
- `bun run seed` - Populate database with sample data
- `bun run clean` - Clean node_modules and .bun cache
- `bun run type-check` - Run TypeScript type checking

## 🌍 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/hono-app` | MongoDB connection string |
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## ⚡ Performance

This stack provides excellent performance:
- **Bun**: 4x faster than Node.js for many operations
- **Hono**: Minimal overhead, fast routing
- **Mongoose**: Efficient MongoDB operations with connection pooling

## 🛡️ Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- Consistent error response format

## 🚀 Deployment

For production deployment:

1. **Set environment variables:**
   ```bash
   export MONGODB_URI="your-production-mongodb-uri"
   export NODE_ENV="production"
   export PORT="80"
   ```

2. **Build and run:**
   ```bash
   bun run start
   ```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🔗 Useful Links

- [Hono Documentation](https://hono.dev/)
- [Bun Documentation](https://bun.sh/docs)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
