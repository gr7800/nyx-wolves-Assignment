# Nyx Wolves Application

This is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides functionality to register users, manage user details, and perform various operations on user data.

# Deployed Links

* Backend: https://nyxbackend-cteo.onrender.com
* Frontend: https://nyx-woloves.netlify.app/

# Features

* User Registration: Allows users to register by providing their first name, last name, email, mobile number, gender, status, profile image, and location.
* User Details: Provides an interface to view user details with filtering and pagination options.
* Edit User: Enables users to edit their details, including their profile image.
* Delete User: Allows users to delete their account from the system.
* Change User Status: Allows users to change their status (e.g., active, inactive) in the system.
* Export Users: Provides the option to export user details to a CSV file.

# Backend API Routes
* `POST /user/register:` Registers a new user by providing the required user details.
* `GET /user/details:` Retrieves user details with * filtering and pagination options.
* `GET /user/:id:` Retrieves a single user by their ID.
* `PUT /user/edit/:id:` Updates user details by their ID, including the profile image.
* `DELETE /user/delete/:id:` Deletes a user by their ID.
* `PUT /user/status/:id:` Changes the status of a user by their ID.
* `GET /user/export:` Exports user details to a CSV file.

# Backend Technologies and Configuration
* `Server Framework:` Express.js
* `Database:` MongoDB
* `File Upload:` Multer
* `User Model:` Mongoose schema for user data validation and modeling

# Frontend

The frontend of the application is built using React.js, which provides an interactive and responsive user interface for seamless user experience.

## How to Run the Application Locally

#### To run the application locally, follow these steps:

1. Clone the repository from GitHub Repository Link.
2. Install the necessary dependencies by running npm install in the root directory.
3. Set up the MongoDB database and configure the connection in the backend code.
4. Start the backend server by running npm start in the backend directory.
5. Start the frontend development server by running npm start in the frontend directory.

6. Access the application in your browser at `http://localhost:3000`

# Conclusion
The Nyx Wolves application is a MERN stack web application that provides user registration, management, and various operations on user data. It demonstrates the use of MongoDB for data storage, Express.js for backend development, React.js for frontend development, and Node.js as the runtime environment. Feel free to explore and enhance the application based on your requirements.