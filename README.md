# Dress Suggestion App

## Overview

The Dress Suggestion App is a web application that suggests clothing colors based on weather conditions, user preferences, and occasions. The app fetches weather data, evaluates the weather condition, and suggests suitable colors for different skin tones.

## Features

- User registration and login
- Password reset via email
- Fetch weather data based on user location
- Suggest clothing colors based on weather, skin tone, and occasion
- Get complementary colors and shades of a specified color

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- bcrypt for password hashing
- nodemailer for email services
- chroma-js for color manipulations
- axios for HTTP requests

## API Endpoints

### User Authentication

- `POST /register`: Register a new user
- `POST /login`: Login an existing user
- `GET /getuser`: Get user details (requires authentication)
- `POST /forgot-password`: Request a password reset link
- `GET /reset-password/:token`: Redirect to password reset page
- `POST /reset-password/:token`: Reset the password using the token

### User Preferences

- `POST /user-preference/:userId`: Set user preferences (skin tone, location)

### Dress Suggestion

- `POST /dress-suggestion/:userId`: Get dress color suggestion based on user data and occasion

### Color Utilities

- `GET /shades/:colorName`: Get shades of a specified color
- `GET /complementary/:colorName`: Get complementary color of a specified color

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/dress-suggestion-app.git
    cd dress-suggestion-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT = 4000
    MONGODBCONNECTIONSTRING = mongodb+srv://bavithrasjh:r6KQvXjUylWMtgtj@cluster0.zctslm7.mongodb.net/
    JWT_SECRET = secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

    The server will run on `http://localhost:4000`.

### Usage

1. Register a new user by sending a POST request to `/register` with `username`, `email`, and `password`.
2. Login the user by sending a POST request to `/login` with `email` and `password`.
3. Set user preferences by sending a POST request to `/user-preference/:userId` with `skinTone` and `location`.
4. Get dress suggestions by sending a POST request to `/dress-suggestion/:userId` with `occasion`.
5. Fetch shades of a color by sending a GET request to `/shades/:colorName`.
6. Fetch complementary color by sending a GET request to `/complementary/:colorName`.


## Contact

For any inquiries or issues, please contact [your email](mailto:bavithra.sjh@gmail.com).


