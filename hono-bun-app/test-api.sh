#!/bin/bash

# Test script for Hono + Bun + Mongoose + MongoDB API
# Make sure the server is running before executing this script

BASE_URL="http://localhost:3000"

echo "🧪 Testing Hono + Bun + Mongoose + MongoDB API"
echo "=============================================="

# Test health endpoint
echo ""
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | json_pp || curl -s "$BASE_URL/health"

# Test root endpoint
echo ""
echo "2. Testing root endpoint..."
curl -s "$BASE_URL/" | json_pp || curl -s "$BASE_URL/"

# Create a new user
echo ""
echo "3. Creating a new user..."
RESPONSE=$(curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice@example.com", "age": 28}')
echo "$RESPONSE" | json_pp 2>/dev/null || echo "$RESPONSE"

# Extract user ID from response (works with jq if available)
USER_ID=$(echo "$RESPONSE" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

# Get all users
echo ""
echo "4. Getting all users..."
curl -s "$BASE_URL/api/users" | json_pp || curl -s "$BASE_URL/api/users"

if [ ! -z "$USER_ID" ]; then
  # Get user by ID
  echo ""
  echo "5. Getting user by ID ($USER_ID)..."
  curl -s "$BASE_URL/api/users/$USER_ID" | json_pp || curl -s "$BASE_URL/api/users/$USER_ID"

  # Update user
  echo ""
  echo "6. Updating user..."
  curl -s -X PUT "$BASE_URL/api/users/$USER_ID" \
    -H "Content-Type: application/json" \
    -d '{"name": "Alice Johnson", "age": 29}' | json_pp || curl -s -X PUT "$BASE_URL/api/users/$USER_ID" \
    -H "Content-Type: application/json" \
    -d '{"name": "Alice Johnson", "age": 29}'

  # Delete user
  echo ""
  echo "7. Deleting user..."
  curl -s -X DELETE "$BASE_URL/api/users/$USER_ID" | json_pp || curl -s -X DELETE "$BASE_URL/api/users/$USER_ID"
else
  echo ""
  echo "⚠️  Could not extract user ID, skipping individual user tests"
fi

echo ""
echo "✅ API testing completed!"
echo ""
echo "To run this test script:"
echo "1. Start the server: bun run dev"
echo "2. In another terminal: chmod +x test-api.sh && ./test-api.sh"