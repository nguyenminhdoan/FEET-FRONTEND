@echo off
echo ======================================
echo Fleet Frontend Application
echo Starting Development Server
echo ======================================
echo.

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

echo Starting frontend service with hot reload...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API should be running at: http://localhost:8000
echo.

docker-compose -f docker-compose.dev.yml up --build

echo.
echo ======================================
echo Frontend Application stopped
echo ======================================
pause
