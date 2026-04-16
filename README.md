# Dockerized Todo Application

A full-stack Todo application built to practice containerized development with Docker and Docker Compose. The project combines a React frontend, an Express API, and MongoDB, with separate configurations for local development, staging, and production-style deployments.

## Overview

This repository demonstrates how to run a modern JavaScript application as a multi-container stack. It includes:

- A React + Vite frontend for creating and deleting todos
- An Express + Mongoose backend exposing REST endpoints
- A MongoDB database for persistence
- Docker Compose workflows for development, staging, and production
- Container health checks for MongoDB and the API

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Containerization: Docker, Docker Compose

## Project Structure

```text
.
├── client/                    # React frontend
├── server/                    # Express backend
├── docker-compose.yml         # Local development stack
├── docker-compose.staging.yml # Staging-like deployment
├── docker-compose.prod.yml    # Production-like deployment
└── README.md
```

## Features

- Create and delete todo items
- Persist data in MongoDB
- Run the full application with Docker
- Hot-reload-oriented local development setup
- Dedicated staging and production compose files
- Health check endpoint at `/health`

## Services and Ports

### Development

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27018`

### Staging

- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:5001`
- MongoDB: `localhost:27019`

### Production

- Frontend: `http://localhost`
- Backend API: `http://localhost:5000`

## Running the Project

### Prerequisites

- Docker
- Docker Compose

### Start the Development Stack

```bash
docker compose up --build
```

This starts:

- `frontend` using the Vite development server
- `backend` using the Node development workflow
- `mongo` for data storage

To stop the stack:

```bash
docker compose down
```

To remove containers and volumes:

```bash
docker compose down -v
```

### Start the Staging Stack

```bash
docker compose -f docker-compose.staging.yml up --build
```

### Start the Production Stack

```bash
docker compose -f docker-compose.prod.yml up --build
```

## Environment Configuration

The backend uses these environment variables:

- `MONGO_URI`: MongoDB connection string
- `PORT`: backend server port
- `NODE_ENV`: production mode in the production compose setup

The frontend build uses:

- `VITE_API_URL`: base URL for the backend API

In this repository, these values are already defined inside the Docker Compose files for each environment.

## API Endpoints

Base URL:

- Development: `http://localhost:5000`
- Staging: `http://localhost:5001`

Available routes:

- `GET /` - basic API status response
- `GET /health` - application health and database readiness
- `GET /api/todos` - fetch all todos
- `POST /api/todos` - create a new todo
- `PUT /api/todos/:id` - update a todo
- `DELETE /api/todos/:id` - delete a todo

### Example Create Request

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker Compose"}'
```

## Health Checks

The project includes service health checks to improve container startup reliability.

- MongoDB is checked with a `ping` command
- The backend is checked through `GET /health`
- Frontend startup depends on a healthy backend

Example health response:

```json
{
  "status": "OK",
  "database": "connected",
  "uptime": 12.34,
  "timestamp": "2026-04-16T10:00:00.000Z"
}
```

## Development Notes

- The development compose file mounts the `client` and `server` directories as volumes for faster iteration
- MongoDB data is persisted using named Docker volumes
- Separate compose files are included to reflect different deployment targets without changing application code

## Useful Commands

Rebuild and restart the development environment:

```bash
docker compose up --build
```

View running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop a specific environment:

```bash
docker compose -f docker-compose.prod.yml down
```

## Future Improvements

- Add update and complete-todo support in the UI
- Add validation and better API error handling
- Add automated tests for frontend and backend
- Add CI/CD for staging and production deployments
- Add authentication and user-specific todo lists

## License

This project is currently for learning and practice purposes.
