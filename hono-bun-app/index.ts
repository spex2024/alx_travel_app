import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import mongoose from 'mongoose'

// Initialize Hono app
const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())
app.use('*', prettyJSON())

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hono-bun-app'
    await mongoose.connect(mongoURI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)

// Routes
app.get('/', (c) => {
  return c.json({ 
    message: 'Welcome to Hono + Bun + Mongoose + MongoDB API!',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: {
        'GET /api/users': 'Get all users',
        'POST /api/users': 'Create a new user',
        'GET /api/users/:id': 'Get user by ID',
        'PUT /api/users/:id': 'Update user by ID',
        'DELETE /api/users/:id': 'Delete user by ID'
      }
    }
  })
})

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  })
})

// User Routes
app.get('/api/users', async (c) => {
  try {
    const users = await User.find()
    return c.json({ success: true, data: users })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return c.json({ success: false, error: message }, 500)
  }
})

app.post('/api/users', async (c) => {
  try {
    const body = await c.req.json()
    const user = new User(body)
    const savedUser = await user.save()
    return c.json({ success: true, data: savedUser }, 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return c.json({ success: false, error: message }, 400)
  }
})

app.get('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const user = await User.findById(id)
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }
    return c.json({ success: true, data: user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return c.json({ success: false, error: message }, 400)
  }
})

app.put('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const user = await User.findByIdAndUpdate(id, body, { new: true })
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }
    return c.json({ success: true, data: user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return c.json({ success: false, error: message }, 400)
  }
})

app.delete('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }
    return c.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return c.json({ success: false, error: message }, 400)
  }
})

// 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: 'Route not found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error(`Error: ${err}`)
  return c.json({ success: false, error: 'Internal Server Error' }, 500)
})

// Start server
const port = parseInt(process.env.PORT || '3000')

const startServer = async () => {
  await connectDB()
  
  console.log(`🚀 Server is running on http://localhost:${port}`)
  console.log(`📚 API Documentation available at http://localhost:${port}`)
}

startServer()

export default {
  port,
  fetch: app.fetch,
}