# TaskMaster API

A RESTful API built with Node.js, Express, Sequelize, and PostgreSQL for managing users and their tasks.

### Installation

1. Clone the repository
```bash
git clone https://github.com/cyber-sekuro/SEC-12-Assignment2.git
```

2. Navigate to project folder
```bash
cd SEC-12-Assignment2
```

3. Install dependencies
```bash
npm install
```

4. Start the server
```bash
npm start
```

The API will run at:

http://localhost:3000

### Database Setup

1. Make sure PostgreSQL is installed and running.

2. Create a database named `taskmaster`.

```sql
CREATE DATABASE taskmaster;
```

3. Create a `.env` file in the project root and add the following:
```env
PORT=3000
NODE_ENV=development
DB_NAME=taskmaster
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
```

4. Replace `your_password` with your actual PostgreSQL password.

5. Start the server:
```bash
npm start
```

When the server starts successfully, Sequelize will automatically sync the models and create the required tables in the database.

Note: Do not commit your real `.env` file to GitHub.

### API Documentation

Base URL:

http://localhost:3000

#### User Endpoints

##### Create User
`POST /users`

Creates a new user.

Request body:
```json
{
  "name":"Jenny",
  "email":"Jenny@gmail.com"
}
```

Example response:
```json
{
    "id": 1,
    "name": "Jenny",
    "email": "Jenny@gmail.com",
    "updatedAt": "2026-03-09T22:02:24.239Z",
    "createdAt": "2026-03-09T22:02:24.239Z"
}
```

##### Get All Users
`GET /users`

Returns all users.

Example response:
```json
[
    {
        "id": 1,
        "name": "Jenny",
        "email": "Jenny@gmail.com",
        "createdAt": "2026-03-09T22:02:24.239Z",
        "updatedAt": "2026-03-09T22:02:24.239Z"
    }
]
```

##### Get User by ID
`GET /users/:id`

Returns a single user by ID.

Example:
`GET /users/1`

##### Delete User by ID
`DELETE /users/:id`

Deletes a user by ID.

Example:
`DELETE /users/1`

Deleting a user will also delete all tasks associated with that user.

#### Task Endpoints

##### Create Task
`POST /tasks`

Creates a new task.

Request body:
```json
{
  "title": "Go for a vacation",
  "description": "Go to Switzerland",
  "dueDate": "2026-03-24",
  "userId": 1
}
```

Example response:
```json
{
  "status": "pending",
  "id": 1,
  "title": "Go for a vacation",
  "description": "Go to Switzerland",
  "dueDate": "2026-03-24T00:00:00.000Z",
  "userId": 1,
  "updatedAt": "2026-03-09T22:05:23.259Z",
  "createdAt": "2026-03-09T22:05:23.259Z"
}
```

##### Get All Tasks
`GET /tasks`

Returns all tasks with associated user data.

Example response:
```json
[
  {
    "id": 1,
    "title": "Go for a vacation",
    "description": "Go to Switzerland",
    "status": "pending",
    "dueDate": "2026-03-24T00:00:00.000Z",
    "User": {
      "id": 1,
      "name": "Jenny",
      "email": "Jenny@gmail.com"
    }
  }
]
```

##### Get Task by ID
`GET /tasks/:id`

Returns a single task by ID with associated user data.

Example:
`GET /tasks/1`

##### Update Task by ID
`PUT /tasks/:id`

Updates a task by ID.

Example:
`PUT /tasks/1`

##### Delete Task by ID
`DELETE /tasks/:id`

Delete a task by ID.

Example:
`DELETE /tasks/1`