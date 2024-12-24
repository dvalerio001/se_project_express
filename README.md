# WTWR (What to Wear?): Back End

This back-end project is the API for the WTWR application. It allows users to create and manage clothing items based on weather conditions, making it easier for users to decide what to wear.

## Deployed Applications

- Frontend: https://wtwrdv.jumpingcrab.com
- Backend API: https://api.wtwrdv.jumpingcrab.com

## Functionality

The API provides the following features:

- User Management: Create and retrieve user profiles
- Clothing Items: Add, retrieve, and delete clothing items
- Likes System: Users can like/unlike clothing items
- Weather-Based Clothing: Items are tagged with appropriate weather types (hot, warm, cold)

## **Newly Implemented Features**

1. **User Registration & Authentication**

   - Implemented **sign up** and **sign in** functionality allowing users to create an account and authenticate.
   - Utilized **JWT tokens** for handling user sessions and authorization.
   - **Sign out** functionality is included, which removes the JWT token from localStorage, logging the user out.

2. **User Profile Management**

   - Users can **view their profiles**, edit their profile details (name, avatar), and manage their clothing items.
   - Implemented a modal for updating user information such as name and avatar URL.

3. **Clothing Item Management**

   - Users can **add, view, and delete clothing items**.
   - Implemented a "like" feature that allows users to like/unlike clothing items. The state of likes is updated dynamically in the UI.

4. **Weather-Based Clothing Items**

   - Clothing items are tagged with weather types (e.g., **hot, warm, cold**).
   - Users can view clothing items categorized based on the weather condition and make decisions accordingly.

5. **API Integration**

   - Integrated the backend API for creating and managing clothing items, as well as for handling user authentication and profile management.
   - Implemented functionality to communicate with endpoints like `/signup`, `/signin`, `/items`, and `/users/me`.

6. **Protected Routes**
   - Added route protection for user profile pages and item management. Unauthorized users are redirected to the main page, and certain actions (e.g., liking items, adding/deleting items) are only available to logged-in users.

---

## **Link to Backend Repository**

This project integrates with the backend API for the **WTWR (What to Wear?)** application. The backend repository can be found here:

## [WTWR Back End Repo](https://github.com/dvalerio001/se_project_express.git)

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
