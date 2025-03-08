
# Job Portal Full Stack Application

This is a full-stack job portal application with a React frontend and Express backend.

## Project Structure

- `src/` - Frontend React application
- `server/` - Backend Express API

## Getting Started

### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Run development server
npm run dev
```

## API Endpoints

### Groups

- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get a specific group by ID
- `POST /api/groups` - Create a new group
- `PUT /api/groups/:id` - Update a group
- `DELETE /api/groups/:id` - Delete a group

### Jobs

- `GET /api/jobs` - Get all jobs (with optional filtering)
- `GET /api/jobs/:id` - Get a specific job by ID
- `GET /api/jobs/featured/list` - Get featured jobs
- `GET /api/jobs/tags/all` - Get all job tags
- `GET /api/jobs/recent/list` - Get recent jobs
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job
