# Role-Based Access System

## Overview
This project is a role-based access control system built with the MERN stack (MongoDB, Express.js, React, Node.js). It is designed to manage different user roles and their specific permissions within the application.

### Project Features
- *Admin Role*:
  - Can create and delete notices.
  - Can view users.
  - Can assign roles to users.

- *Patient, Doctor, Staff, Admin*:
  - Can view their own notices.

- *Staff Role*:
  - Can add users.
  - Can view users.

- *Doctor Role*:
  - Can view users.

## Technologies Used
- *MongoDB*: For the database.
- *Express.js*: Server-side application framework.
- *React.js*: Frontend library.
- *Node.js*: Backend runtime environment.
- *Mongoose*: ODM for MongoDB.
- *JWT (JSON Web Tokens)*: For authentication and role-based authorization.

## Project Setup
### Prerequisites
Ensure the following are installed:
- *Node.js*: [Download and install Node.js](https://nodejs.org/).
- *MongoDB Atlas*: A cloud database for MongoDB (or you can set up a local MongoDB instance).
- *Postman*: To test API endpoints.

### Setup Instructions

#### 1. Clone the Repository
Clone the repository to your local machine using:
git clone https://github.com/your-username/role-based-access-system.git

#### 2. Set Up the Backend
1. Navigate to the backend directory:
cd role-based-access-system/backend
2. Install the dependencies:
npm install
3. Create a .env file in the backend folder and add your MongoDB connection URI:
dotenv
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>
JWT_SECRET=your_jwt_secret
4. Start the server:
npm start

The backend will be running on http://localhost:4000.

#### 3. Set Up the Frontend
1. Navigate to the frontend directory:
cd role-based-access-system/frontend
2. Install the dependencies:
npm install
3. Start the React development server:
npm start

The frontend will be running on http://localhost:3000.

### Project Structure

#### Backend
- **/models**: Contains Mongoose models for users and notices.
- **/routes**: Contains routes for user and notice-related operations.
- **/controllers**: Handles the business logic.
- **/middlewares**: Middleware for authentication and authorization.
- **server.js**: Main server entry point.

#### Frontend
- **/src/components**: React components for user interaction.
- **/src/pages**: Pages for different views (e.g., Login, Dashboard).
- **/src/context**: React context for user state management.
- **App.js**: Main entry point for the React application.

### How to Use

1. *Registration & Login*:
   - Admin can register users and other users log in through the frontend.
   - Admin registered through seeder if not exist already at first.
   - Upon login, a JWT token is generated and stored in localStorage for authentication.

3. *Role-Based Access Control*:
   - The backend middleware checks the user role from the JWT token and allows access to specific routes based on the assigned role.

4. *Permissions*:
   - Admins can manage notices, view all users, and assign roles.
   - Patients, doctors, and staff can view notices relevant to their role.
   - Staff can add and view users.
   - Doctors can view users.

## API Endpoints

### Authentication
- *POST /api/user/register*: Register a new user.
- *POST /api/user/login*: Log in and generate a token.

### User Management
- *GET /api/users*: Retrieve all users (Admin only).
- *POST /api/users*: Add a new user (Staff only).

### Notice Management
- *GET /api/notices*: View notices for the logged-in user.
- *POST /api/notices*: Create a new notice (Admin only).
- *DELETE /api/notices/:id*: Delete a notice (Admin only).

## Contributing
Feel free to fork this repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
