#!/bin/bash

echo "======================================"
echo "Fleet Frontend Application"
echo "Starting Production Server"
echo "======================================"
echo ""

# Check if docker compose is available (v2 or v1)
if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
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

$DOCKER_COMPOSE up -d --build

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
echo "  $DOCKER_COMPOSE logs -f"
echo ""
echo "To stop the service:"
echo "  $DOCKER_COMPOSE down"
echo ""
