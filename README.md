# User Authentication and Password Reset System

This project implements a user authentication system with password reset functionality using Node.js, Express, MongoDB, and React.

## Features

- User registration with username, email, and password.
- User login with email and password.
- Password reset request via email.
- Resetting password using a unique token sent via email.

## Installation

1. Clone the repository:

    ```bash
    git clone 
    ```

2. Install dependencies for both backend and frontend:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following variables:

    ```plaintext
    PORT=3001
    MONGODBCONNECTIONSTRING=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

5. Start the frontend development server:

    ```bash
    npm start
    ```

## Backend

- **Express Server**: Handles HTTP requests and serves as the backend API.
- **MongoDB**: Database to store user information and password reset tokens.
- **JWT (JSON Web Tokens)**: Used for user authentication and generating reset tokens.
- **Nodemailer**: Sends emails for password reset requests.

## Frontend

- **React**: Frontend framework for building user interfaces.
- **React Router**: Handles client-side routing for different pages.
- **Axios**: Makes HTTP requests to the backend API.

## API Endpoints

- `POST /api/user/register`: Registers a new user.
- `POST /api/user/login`: Logs in a user.
- `POST /api/user/forgot-password`: Initiates a password reset request.
- `POST /api/user/reset-password/:token`: Resets the password using the provided token.

## Folder Structure

- **backend**: Contains the Express server code, database configuration, routers, controllers, models, and services.
- **frontend**: Contains the React frontend code with components, pages, and styles.

## Usage

1. Register a new user by providing a username, email, and password.
2. Log in with the registered email and password.
3. If you forget your password, request a password reset via email.
4. Click on the password reset link sent to your email and set a new password.

## License

This project is licensed under the [MIT License](LICENSE).
