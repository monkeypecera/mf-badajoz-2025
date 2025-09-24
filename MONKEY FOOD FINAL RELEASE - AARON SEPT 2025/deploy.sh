#!/bin/bash

# =================================
# MONKEY FOOD COMPETITION - DEPLOY SCRIPT
# =================================

echo "🐒 Monkey Food Competition - Deployment Script"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration:"
    echo "   - MongoDB connection string"
    echo "   - Email credentials"
    echo "   - JWT secret"
    echo "   - Admin password"
    echo ""
    echo "🔧 Edit .env file now? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        if command -v nano &> /dev/null; then
            nano .env
        elif command -v vim &> /dev/null; then
            vim .env
        else
            echo "Please edit .env manually"
        fi
    fi
else
    echo "✅ .env file found"
fi

# Start the application
echo "🚀 Starting Monkey Food Competition..."
echo "📱 Application will be available at: http://localhost:3000"
echo "🔧 Admin panel: http://localhost:3000/admin.html"
echo "📋 Terms: http://localhost:3000/terms.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"

# Start the server
node server/index.js