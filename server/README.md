# Secure Todo Server

## Setup
1. .env.example -> .env and set values
2. npm install
3. npm run dev

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/todos (protected)
- GET /api/admin/users (admin only)
- PATCH /api/admin/users/:id/role (admin only)
- GET /api/admin/todos (admin only)
