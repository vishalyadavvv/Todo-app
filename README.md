# Todo Web Application

A full-stack Todo app with authentication, role-based access, and dashboards for users and admins.

## Features

- User registration & login (JWT-based authentication)
- Role-based access: Admin & User dashboards
- CRUD operations for todos
- Protected routes (client-side)
- Persistent login (localStorage)
- Responsive UI (React + Vite)
- RESTful API (Node.js + Express + MongoDB)

## Tech Stack

- **Frontend:** React, Vite, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, JWT
- **Other:** ESLint, Context API

## Folder Structure

```
client/         # React frontend
server/         # Node.js backend
```

## Getting Started

### 1. Clone the repository

```sh
git clone <repo-url>
cd Todo Web Application
```

### 2. Install dependencies

#### Server

```sh
cd server
npm install
```

#### Client

```sh
cd ../client
npm install
```

### 3. Configure Environment

- Set up MongoDB and update connection string in `server/config/db.js` if needed.

### 4. Run the applications

#### Server

```sh
npm start
```

#### Client

```sh
npm run dev
```

### 5. Access the app

- Client: [http://localhost:5173](http://localhost:5173)
- Server: [http://localhost:4000](http://localhost:4000)

## Usage

- Register a new user or login.
- Users can create, edit, and delete their todos.
- Admins have access to the admin dashboard.

## Project Structure

- `client/src/context/AuthContext.jsx`: Handles authentication state and logic.
- `client/src/pages/`: Contains main pages (Login, Register, Dashboards).
- `server/controllers/`: API logic for users, todos, and admin.
- `server/routes/`: API endpoints.

## License

MIT
