# WTWR (What to Wear?): Back End

This back-end project is the API for the WTWR application. It allows users to create and manage clothing items based on weather conditions, making it easier for users to decide what to wear.

## Functionality

The API provides the following features:

- User Management: Create and retrieve user profiles
- Clothing Items: Add, retrieve, and delete clothing items
- Likes System: Users can like/unlike clothing items
- Weather-Based Clothing: Items are tagged with appropriate weather types (hot, warm, cold)

## Technologies and Techniques Used

### Core Technologies

- **Express.js**: Web application framework for handling HTTP requests
- **MongoDB**: NoSQL database for storing user and clothing item data
- **Mongoose**: MongoDB object modeling for Node.js
- **Node.js**: Runtime environment for executing JavaScript server-side

### Key Dependencies

- **validator**: For URL validation in user avatars and clothing item images
- **eslint**: Code linting with Airbnb style guide configuration
- **prettier**: Code formatting
- **nodemon**: Development dependency for hot-reloading

### API Endpoints

#### Users

- `GET /users` — Returns all users
- `GET /users/:userId` — Returns user by ID
- `POST /users` — Creates a new user

#### Clothing Items

- `GET /items` — Returns all clothing items
- `POST /items` — Creates a new clothing item
- `DELETE /items/:itemId` — Deletes a clothing item by ID
- `PUT /items/:itemId/likes` — Adds user like to an item
- `DELETE /items/:itemId/likes` — Removes user like from an item

### Error Handling

The API implements centralized error handling with appropriate HTTP status codes:

- 400: Bad Request (invalid data or parameters)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

### Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
