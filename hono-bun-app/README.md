# Hono + Bun + Mongoose + MongoDB API

A modern, fast API built with:
- **Hono** - Fast web framework for edge environments
- **Bun** - JavaScript/TypeScript runtime and package manager
- **Mongoose** - MongoDB object modeling for Node.js
- **MongoDB** - NoSQL document database

## 🚀 Features

- ⚡ Fast HTTP server with Hono
- 🏃‍♂️ High-performance Bun runtime
- 🗄️ MongoDB integration with Mongoose ODM
- 📝 TypeScript support out of the box
- 🔄 Hot reload in development
- 🛡️ CORS enabled
- 📊 Request logging
- ✨ Pretty JSON responses
- 🏥 Health check endpoint

## 📦 Installation

Make sure you have [Bun](https://bun.sh) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Clone and install dependencies:

```bash
git clone <your-repo>
cd hono-bun-app
bun install
```

## ⚙️ Configuration

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/hono-bun-app
PORT=3000
NODE_ENV=development
```

## 🗄️ Database Setup

Make sure MongoDB is running on your system:

### Option 1: Local MongoDB
```bash
# Install MongoDB (Ubuntu/Debian)
sudo apt update
sudo apt install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Option 2: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 3: MongoDB Atlas
Use a MongoDB Atlas connection string in your `.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hono-bun-app
```

## 🏃‍♂️ Running the Application

### Development (with hot reload)
```bash
bun run dev
```

### Production
```bash
bun run start
```

### Build
```bash
bun run build
```

The server will start at `http://localhost:3000`

## 📚 API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API documentation and welcome message |
| GET | `/health` | Health check endpoint |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |

### User Model

```typescript
{
  name: string,      // required
  email: string,     // required, unique
  age: number,       // optional, minimum: 0
  createdAt: Date    // auto-generated
}
```

## 🧪 API Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/USER_ID
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "age": 31}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

## 🔧 Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run build` - Build the application
- `bun run clean` - Clean build directory
- `bun run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
hono-bun-app/
├── index.ts          # Main application file
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables
├── .env.example      # Environment variables example
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🛠️ Tech Stack Details

- **Hono**: A small, simple, and fast web framework for Cloudflare Workers, Deno, Bun, and Node.js
- **Bun**: An all-in-one JavaScript runtime & toolkit designed for speed
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **MongoDB**: A general purpose, document-based, distributed database
- **TypeScript**: Typed superset of JavaScript

## 🚀 Performance

This stack provides excellent performance characteristics:
- Bun's fast startup and runtime performance
- Hono's minimal overhead and edge-optimized design
- Mongoose's efficient MongoDB operations
- TypeScript's compile-time optimizations

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on the specified port
- Check your connection string in `.env`
- Verify network connectivity for remote databases

### Bun Issues
- Make sure you have the latest version of Bun installed
- Try clearing the cache: `bun pm cache rm`

### TypeScript Errors
- Run type checking: `bun run type-check`
- Ensure all dependencies are properly installed
