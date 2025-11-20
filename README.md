# Fleet Maintenance Cost Predictor - Frontend

Modern React-based frontend for the Fleet Maintenance Cost Predictor application.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Charts**: Chart.js + react-chartjs-2
- **HTTP Client**: Axios
- **Styling**: CSS3 (custom styles matching original design)

## Project Structure

```
fleet-frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── Controls.jsx
│   │   ├── Loading.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── CostChart.jsx
│   │   ├── DataTable.jsx
│   │   └── Results.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── styles/           # CSS styles
│   │   └── App.css
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── nginx.conf            # Nginx configuration for production
└── README.md
```

## Setup

### Prerequisites

- Node.js 20+ (or use Docker)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend URL:
```env
VITE_API_URL=http://localhost:8000
```

4. Run development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Development with Docker

**Quick Start with Docker Compose (Recommended):**
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

**Manual Docker Commands:**
```bash
# Development mode with hot reload
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down
```

**Without Docker Compose:**
```bash
# Build development image
docker build -f Dockerfile.dev -t fleet-frontend-dev .

# Run development container
docker run -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -e VITE_API_URL=http://localhost:8000 \
  fleet-frontend-dev
```

## Production Build

### Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Docker Production Build:

**Quick Start with Docker Compose (Recommended):**
```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

**Manual Docker Commands:**
```bash
# Production mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

**Without Docker Compose:**
```bash
# Build production image
docker build -t fleet-frontend .

# Run production container
docker run -p 80:80 fleet-frontend
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: `http://localhost:8000`)

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Predictions**: Fetches predictions from backend API
- **Interactive Charts**: Visualizes cost predictions with Chart.js
- **Data Table**: Displays detailed monthly breakdown
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

## Component Overview

### Header
Displays the application title and description.

### Controls
Form component for selecting subsystem and date range. Handles validation and triggers predictions.

### Loading
Shows a spinner and message during API calls.

### ErrorMessage
Displays error messages in a user-friendly format.

### SummaryCards
Four summary cards showing average cost, total cost, cost range, and trend.

### CostChart
Line chart visualization of predicted costs over time using Chart.js.

### DataTable
Tabular display of monthly predictions with cost, age, and mileage details.

### Results
Container component that combines SummaryCards, CostChart, and DataTable.

## API Integration

The frontend communicates with the backend API through the `api.js` service:

- `GET /api/subsystems` - Fetch available subsystems
- `POST /api/predict` - Generate cost predictions
- `GET /api/health` - Check API health

## Styling

The application uses custom CSS that matches the original UI design:
- Modern gradient headers
- Card-based layout
- Responsive grid system
- Professional color scheme
- Smooth animations and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Standalone Deployment

This frontend can run independently and connect to any backend API:

1. **Configure backend URL** in `.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   # or your backend URL
   VITE_API_URL=https://api.yourdomain.com
   ```

2. **Start the frontend:**
   ```bash
   ./start.sh  # or start.bat on Windows
   ```

3. **Access the app:**
   - Production: http://localhost
   - Development: http://localhost:3000

## Working with the Backend

If you have the fleet-backend project:

1. **Start backend first:**
   ```bash
   cd fleet-backend
   ./start.sh
   ```

2. **Start frontend:**
   ```bash
   cd fleet-frontend
   ./start.sh
   ```

3. **Access:**
   - Frontend: http://localhost or http://localhost:3000
   - Backend API: http://localhost:8000

## Cloud Deployment

Deploy to different platforms:

### Frontend Only:
- **Vercel**: Connect GitHub repo, auto-deploys
- **Netlify**: Drag & drop `dist/` folder after `npm run build`
- **AWS S3 + CloudFront**: Upload `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch

### Backend URL Configuration:
Set `VITE_API_URL` environment variable on your hosting platform to point to your backend server.

## Troubleshooting

### CORS Issues
Ensure the backend has the frontend URL in its CORS allowed origins list.

### API Connection Failed
Check that:
- Backend is running
- `VITE_API_URL` is correctly set
- Network connectivity is working

### Build Errors
Try:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## License

MIT
