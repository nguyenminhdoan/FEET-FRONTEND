@echo off
echo ======================================
echo Fleet Frontend Application
echo Starting Production Server
echo ======================================
echo.

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Please update .env with your backend API URL if needed
    echo.
)

docker-compose up -d --build

echo.
echo ======================================
echo Frontend Application started successfully!
echo ======================================
echo.
echo Access the application at:
echo   - Web UI: http://localhost
echo.
echo Backend API should be running at:
echo   - API: http://localhost:8000
echo.
echo To view logs:
echo   docker-compose logs -f
echo.
echo To stop the service:
echo   docker-compose down
echo.
pause
