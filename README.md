# MERN_Site

## Project Overview
MERN_Site is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). The website is developed for practicing the Backend Concept[CRUD Operation], it provides feature such as user registration, log in, and sending contact messages. It also includes admin functionalities for managing users and messages.

## Features
- **User Authentication & Authorization**: Secure registration and login system for users.
- **Contact Messaging**: Users can send messages to the admin/company via a contact form.
- **Server Side Validation** : The inputs entered by users are validated in backend using zod library [for learning purpose]
- **Admin Panel**: Admin users have access to an additional menu where they can:
  - View and delete contact messages.
  - Edit or delete registered users' details.
- **React Router DOM**: Used for multi-page navigation.
- **Context API**: Employed for state management across the application.

## Technologies Used
- **Frontend**: React, Context API, React Router DOM
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/dheeraaz/MERN_Site.git
2. Navigate to the project directory:
   ```bash
   cd MERN_Site
3. Install Server/Backend dependency:
   ```bash  
   cd Backend
   npm install
4. Install Client/Frontend dependency:
   ```bash
   cd ../Frontend
   npm install
5. Create a `.env` file in the `Backend` directory and add the following:
   ```plaintext
   PORT = 3000
   MONGODB_URI = <YOUR MONGODB_URI>
   CORS_ORIGIN = http://localhost:5173
   NODE_ENV = development
   ACCESS_TOKEN_KEY = <YOUR_SECRET_ACCESS_KEY>
   ACCESS_TOKEN_EXPIRY = 10d
6. Run the application
- Run the server
   ```bash
   cd ../Backend
   npm run start
- Start the client
  ```bash
  cd ../Frontend
  npm run dev

## Usage
- **Client-side**: Visit http://localhost:5173 to access the web application.
- **Register**: First Register as normal user, and if you are admin, go to your mongodb database and edit yourself in `users collections` as:- `isAdmin: true` 
- **Admin Panel**: After logging in as an admin, an additional admin option will be available in the navbar.
