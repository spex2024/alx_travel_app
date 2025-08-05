import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { connectDatabase } from './src/database';
import User, { type IUser } from './src/models/User';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check route
app.get('/', (c) => {
  return c.json({ 
    message: 'Hono + Bun + Mongoose + MongoDB API', 
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// User routes
const users = app.basePath('/api/users');

// GET /api/users - Get all users
users.get('/', async (c) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return c.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return c.json({
      success: false,
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// GET /api/users/:id - Get user by ID
users.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const user = await User.findById(id);
    
    if (!user) {
      return c.json({
        success: false,
        message: 'User not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: user
    });
  } catch (error) {
    return c.json({
      success: false,
      message: 'Failed to fetch user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// POST /api/users - Create new user
users.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const user = new User(body);
    await user.save();
    
    return c.json({
      success: true,
      message: 'User created successfully',
      data: user
    }, 201);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return c.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, 400);
    }
    
    return c.json({
      success: false,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// PUT /api/users/:id - Update user
users.put('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    
    const user = await User.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return c.json({
        success: false,
        message: 'User not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return c.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, 400);
    }
    
    return c.json({
      success: false,
      message: 'Failed to update user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// DELETE /api/users/:id - Delete user
users.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return c.json({
        success: false,
        message: 'User not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    return c.json({
      success: false,
      message: 'Failed to delete user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Start server
const port = parseInt(process.env.PORT || '3000');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log('📚 API Documentation:');
    console.log('  GET    /                    - Health check');
    console.log('  GET    /api/users           - Get all users');
    console.log('  GET    /api/users/:id       - Get user by ID');
    console.log('  POST   /api/users           - Create new user');
    console.log('  PUT    /api/users/:id       - Update user');
    console.log('  DELETE /api/users/:id       - Delete user');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Initialize the server
startServer();

export default {
  port,
  fetch: app.fetch,
};