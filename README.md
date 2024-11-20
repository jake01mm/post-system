# Post System

This project is a simple post management system built with Node.js, Express, and Sequelize. It allows users to register, log in, and manage posts. The system supports user authentication and provides RESTful API endpoints for post operations.

## Features

- User Registration and Authentication
- Create, Read, Update, and Delete (CRUD) operations for posts
- Pagination and search functionality for posts
- JWT-based authentication
- Sequelize ORM for database management

## Prerequisites

- Node.js (v14 or later)
- MySQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/post-system.git
   cd post-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```

4. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Seed the database (optional):

   ```bash
   npx sequelize-cli db:seed:all
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   Or for development with hot-reloading:

   ```bash
   npm run dev
   ```

2. The server will be running at `http://localhost:3000` (or your specified port).

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user

### Post Routes

- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts` - Get all posts with pagination and search
- `GET /api/posts/:id` - Get a single post by ID
- `PUT /api/posts/:id` - Update a post by ID (requires authentication)
- `DELETE /api/posts/:id` - Delete a post by ID (requires authentication)

## Code Structure

- `src/app.js`: Express application setup
- `src/routes`: Contains route definitions for users and posts
- `src/controllers`: Contains logic for handling requests
- `models`: Sequelize models and database configuration
- `migrations`: Database migration files
- `seeders`: Database seeding files

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License.