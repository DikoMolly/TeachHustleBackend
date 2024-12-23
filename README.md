
# **Authentication Backend API Documentation**

This is the backend implementation for a user authentication system using Node.js, Express, MongoDB, and Passport.js. The system supports standard signup, login, and third-party login via Google Authentication. 

## **Project Structure**

```
project-folder/
│
├── config/
│   ├── db.js            # Database connection setup
│   ├── passportGoogle.js # Google OAuth configuration
│
├── controllers/
│   ├── authController.js # Controller logic for authentication
│
├── models/
│   ├── User.js          # Mongoose schema for user data
│
├── routes/
│   ├── auth.js          # Routes for authentication
│
├── utils/
│   ├── validations.js   # Validation logic for user inputs
│
├── .env                 # Environment variables (not included in the repository)
├── app.js               # Entry point of the application
├── package.json         # Dependencies and project metadata
├── README.md            # Project documentation
└── ...                  # Other files and folders
```

---

## **API Endpoints**

### **Base URL**
```plaintext
        http://localhost:<PORT>
```

### **Authentication Routes**

| Endpoint          | HTTP Method | Description             | Required Data                        |
|-------------------|-------------|-------------------------|--------------------------------|
| `/auth/signup`    | `POST`      |   Register a new user   | `firstName`, `lastName`, `email`, `password`, `gender`, `phoneNumber`, `dateOfBirth`, `termsAccepted`                                      |

| `/auth/login`     | `POST`      | Log in a user           | `email`, `password`            |

| `/auth/google`            | `GET`       | Initiate Google OAuth                 | N/                                   |
| `/auth/google/callback`   | `GET`       | Handle Google OAuth callback          | N/A                                    |

---

## **How to Use**

### 1. **Signup**
To register a new user, send a `POST` request to `/auth/signup` with the following payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "gender": "male",
  "phoneNumber": "1234567890",
  "dateOfBirth": "2000-01-01",
  "termsAccepted": true
}
```

### 2. **Login**
To log in a user, send a `POST` request to `/auth/login` with:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### 3. **Google Authentication**
- To initiate Google OAuth, direct the user to:
  ```plaintext
  /auth/google
  ```
- After successful authentication, Google will redirect to:
  ```plaintext
  /auth/google/callback
  ```

---

## **Environment Variables**

The backend uses environment variables for sensitive data. These should be stored in a `.env` file at the root of your project. Below are the required variables:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbName>?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=<Your Google Client ID>
GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

---

## **Dependencies**

Below are the main dependencies used in this project:

| Dependency      | Description                                      |
|------------------|--------------------------------------------------|
| `express`        | Backend framework for routing and middleware     |
| `mongoose`       | ODM for MongoDB                                 |
| `passport`       | Authentication middleware                       |
| `passport-google-oauth20` | Strategy for Google OAuth               |
| `dotenv`         | Loads environment variables from `.env`         |
| `bcryptjs`       | Hashing passwords for security                  |
| `express-validator` | Validates and sanitizes user inputs          |

---

## **Setup for Frontend Developer**

1. **Run the Server Locally**
   - Clone the repository.
   - Install dependencies:  
     ```bash
     npm install
     ```
   - Create a `.env` file with the environment variables mentioned above.
   - Start the server:  
     ```bash
     npm start
     ```
   - The server will run at `http://localhost:5000 ph`.

2. **Frontend Integration**
   - Use the `/auth/signup` and `/auth/login` endpoints for user registration and login.
   - For Google OAuth, redirect users to `/auth/google`.

---

## **Notes**
- **Validation**: Validation rules are applied on the backend for all inputs. Frontend validation can be added for a better user experience.
- **Security**: Passwords are hashed using `bcryptjs` before saving to the database.
- **OAuth Setup**: Ensure Google API credentials are correctly configured in `.env`.

---

This documentation should help you integrate the backend with your frontend application seamlessly. If you encounter any issues, refer to the backend logs or contact the backend developer.
