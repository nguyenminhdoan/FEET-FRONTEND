#!/bin/bash

echo "======================================"
echo "Fleet Frontend Application"
echo "Starting Development Server"
echo "======================================"
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null
then
    echo "Error: docker-compose is not installed"
    echo "Please install Docker and Docker Compose first"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "Starting frontend service with hot reload..."
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API should be running at: http://localhost:8000"
echo ""

docker-compose -f docker-compose.dev.yml up --build

echo ""
echo "======================================"
echo "Frontend Application stopped"
echo "======================================"
