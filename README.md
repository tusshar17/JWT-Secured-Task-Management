# Task Management Backend - Secured with JWT

## Technologies Used

- Node.js
- Express.js
- Monogdb
- Docker

## Features

1. User Authentication (using JWT)
   - SignUp
   - LogIn
   - Auth middleware for protected routes
2. Task Management
   - Create a new task
   - Update an existing task
   - Delete a task
   - View a paginated list of tasks

## Insatallation and Setup

- Clone the Repository:

```
git clone https://github.com/tusshar17/JWT-Secured-Task-Management.git
```

- Install Dependencies

```
npm install
```

- Set Up Enviroment Variables : Create a .env file in the root directory

```
PORT = 8000
DB_URL = "mongodb+srv://<username>:<password>@cluster0.flcnn.mongodb.net/<db>?retryWrites=true&w=majority&appName=Cluster0"

JWT_SECRET_KEY =
JWT_EXPIRES_IN = "7d"
```

- Run the Application

###### For production

```
npm start
```

###### For production

```
npm run dev
```

## API Endpoints

#### Authentication Routes

| Method | Endpoint         | Description            | Authentication Required |
| ------ | ---------------- | ---------------------- | ----------------------- |
| POST   | /api/user/signup | Register and get token | No                      |
| POST   | /api/user/login  | LogIn and get a token  | No                      |

#### Task Management Routes

| Method | Endpoint      | Description                      | Authentication Required |
| ------ | ------------- | -------------------------------- | ----------------------- |
| GET    | /api/task     | Get all the task with pagination | Yes                     |
| GET    | /api/task/:id | Get a task with ID               | Yes                     |
| POST   | /api/task/    | Create a new task                | Yes                     |
| PUT    | /api/task/:id | Update a task with ID            | Yes                     |
| DELETE | /api/task/:id | Delete a task with ID            | Yes                     |
