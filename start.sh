#!/bin/bash

echo "======================================"
echo "Fleet Frontend Application"
echo "Starting Production Server"
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
    echo "Please update .env with your backend API URL if needed"
fi

echo "Building and starting frontend service..."
echo ""

docker-compose up -d --build

echo ""
echo "======================================"
echo "Frontend Application started successfully!"
echo "======================================"
echo ""
echo "Access the application at:"
echo "  - Web UI: http://localhost"
echo ""
echo "Backend API should be running at:"
echo "  - API: http://localhost:8000"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the service:"
echo "  docker-compose down"
echo ""
