#!/bin/bash

echo "🚀 Starting Deployment Basics Full-Stack Application"
echo "=================================================="

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Start backend
echo "📡 Starting Backend Server..."
cd backend
if check_port 3001; then
    echo "⚠️  Port 3001 is already in use. Backend might already be running."
else
    npm start &
    BACKEND_PID=$!
    echo "✅ Backend started on http://localhost:3001"
fi
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "⚛️  Starting Frontend Application..."
cd frontend
if check_port 3000; then
    echo "⚠️  Port 3000 is already in use. Frontend might already be running."
else
    npm start &
    FRONTEND_PID=$!
    echo "✅ Frontend started on http://localhost:3000"
fi
cd ..

echo ""
echo "🎉 Application is starting up!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to stop
wait 