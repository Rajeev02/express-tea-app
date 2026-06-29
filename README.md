# Express Tea API (backtech)

An Express.js REST API providing user authentication, role-based access control, and user management capabilities. This project serves as the backend infrastructure for a Tea application, built with a focus on security, structured logging, and containerized deployment.

## Overview

The backend is built with Express.js and MongoDB. It provides a structured API separating authentication, regular user operations, and administrative controls. With integrated JWT authentication and comprehensive logging, the server is designed to be secure, observable, and easy to deploy via Docker and Fly.io.

## Features

* **Authentication & Security**: Secure user registration and login using `bcryptjs` for password hashing and JSON Web Tokens (JWT) for stateless authentication.
* **Role-Based Access Control**: Middleware-enforced authorization separating standard user endpoints (`/users`) from administrative operations (`/admin`).
* **Robust Logging**: Centralized and structured logging using `winston` and `morgan`, capturing detailed HTTP request metrics and application events into a file (`app.log`) and standard output.
* **Database Integration**: MongoDB integration via `mongoose` using strongly-typed schemas for data integrity.
* **Container-Ready**: Includes a multi-stage Dockerfile for lightweight, production-ready containerization, along with a `fly.toml` configuration for Fly.io deployment.

## Technology Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js (18.x+) |
| **Framework** | Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Logging** | Winston, Morgan |
| **Containerization** | Docker |
| **Deployment** | Fly.io |

## Project Structure

```text
.
├── Dockerfile              # Docker multi-stage build configuration
├── fly.toml                # Fly.io deployment configuration
├── index.js                # Application entry point & server setup
├── logger.js               # Winston logger configuration
├── db/
│   └── clearDatabase.js    # Database utility scripts
├── middleware/
│   └── authMiddleware.js   # JWT validation and authorization middleware
├── models/
│   └── userModel.js        # Mongoose schema definitions
├── routes/
│   ├── adminRoutes.js      # Administrator-specific API endpoints
│   ├── authRoutes.js       # Authentication endpoints (login, register)
│   └── userRoutes.js       # User profile and management endpoints
└── package.json            # Project dependencies and scripts
```

## Prerequisites

* **Node.js**: Version 18.x or higher
* **MongoDB**: A running instance (local or MongoDB Atlas)
* **Docker** (Optional): For running the containerized version

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express-tea-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory based on the configuration section below.

4. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## Configuration

The application uses `dotenv` for environment variable management. Define the following variables in your `.env` file:

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | The port on which the Express server listens. | `4000` (defaults to 3000 if unset) |
| `MONGO_URI` | Connection string for the MongoDB database. | `mongodb://127.0.0.1:27017/tea-app` |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens. | `your_super_secret_key` |
| `API_KEY` | General API key for external service integrations. | `your_api_key` |

## Quick Start

```bash
# Set up a minimal .env file
echo "PORT=4000\nMONGO_URI=mongodb://127.0.0.1:27017/tea-app\nJWT_SECRET=devsecret" > .env

# Start the server in development mode
npm run dev
```

The server will initialize, connect to MongoDB, and listen for incoming HTTP requests on the specified port. Check the console or `app.log` to verify the connection.

## API Reference

The API is mounted onto the following base routes:

* `GET /` - Health check endpoint returning "Hello World!"
* `POST /auth` - Authentication workflows (e.g., registration, login)
* `GET, PUT, DELETE /users` - Endpoints to manage standard user resources (requires valid JWT)
* `GET, PUT, DELETE /admin` - Endpoints strictly for users with the administrator role

## Deployment / Publishing

The repository is configured for immediate deployment using Docker and Fly.io.

**Using Docker:**
```bash
docker build -t express-tea-app .
docker run -p 3000:3000 --env-file .env express-tea-app
```

**Using Fly.io:**
The included `fly.toml` and Dockerfile provide seamless deployment to Fly.io.
```bash
flyctl deploy
```

## License

ISC License
