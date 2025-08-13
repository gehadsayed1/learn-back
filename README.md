# Learn Backend API

A Node.js RESTful API project with Express and MongoDB.

## Features

* User Authentication (Register/Login)
* Course Management System
* Input Validation
* Error Handling Middleware
* MongoDB Integration

## Prerequisites

* Node.js
* MongoDB
* NPM

## Installation

1. Clone the repository
```bash
git clone https://github.com/gehadsayed1/learn-back.git
cd learn-back
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in root directory
```env
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

4. Run the application
```bash
npm run dev
```

## API Endpoints

### Users
* `POST /api/users/register` - Register new user
* `POST /api/users/login` - User login
* `GET /api/users` - Get all users

### Courses
* `GET /api/courses` - Get all courses
* `POST /api/courses` - Create new course
* `GET /api/courses/:id` - Get specific course
* `PATCH /api/courses/:id` - Update course
* `DELETE /api/courses/:id` - Delete course

## Dependencies

* Express.js: ^4.18.2
* Mongoose: ^8.17.0
* Validator: ^13.15.15
* Express Validator: ^7.2.1
* CORS: ^2.8.5
* Dotenv: ^17.2.1

## Project Structure

```
learn-back/
├── controller/
│   ├── Courses.controller.js
│   └── Users.controller.js
├── middleware/
│   ├── asyncWrapper.js
│   └── ValidationSchema.js
├── Models/
│   ├── Course.Model.js
│   └── User.Model.js
├── routes/
│   ├── Courses.route.js
│   └── Users.route.js
├── utils/
│   ├── Apperror.js
│   └── httpStatusText.js
└── index.js
```

## License

ISC
