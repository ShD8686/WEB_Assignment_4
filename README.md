# Assignment 4: Secure GameDev Registry (MVC + RBAC)

## 1. Project Overview
This project is a scalable API for managing Game Developers and their Games. It is built using **Node.js, Express, and MongoDB**. The core focus of this assignment was refactoring the code into an **MVC pattern** and implementing professional security measures.

## 2. Objects Description
- **Primary Object (Developer):** Stores information about game development companies (Name, Country, Founded Year).
- **Secondary Object (Game):** Stores details about specific video games (Title, Genre, Release Year). 
  - **Relationship:** Each Game is linked to a Developer via a Reference (ObjectId), creating a One-to-Many relationship.

## 3. Security Features (RBAC)
I have implemented a Role-Based Access Control system:
- **Public Access:** Any user (even guests) can view the list of developers and games (GET routes).
- **User Role:** Registered users can log in and view detailed information.
- **Admin Role:** Only users with the `admin` role can Create, Update, or Delete data.
- **Admin Security:** 
  - To prevent unauthorized admin registrations, I implemented a **keyword check** (the email must contain "admin").
  - Even if a user registers as an admin, they are blocked by an `isApproved: false` flag and must be **manually approved** in the database by the owner.

## 4. Architectural Choices (Defense)
- **MVC Pattern:** By separating code into `models/`, `views/` (public), `controllers/`, and `routes/`, the project becomes modular. This allows multiple developers to work on different parts of the app without conflicts.
- **JWT (JSON Web Tokens):** Used for stateless authentication. Instead of the server remembering every session, the client sends a token. This is more scalable for professional applications.
- **Bcrypt Hashing:** Passwords are never stored in plain text. Even if the database is compromised, user passwords remain secure.
- **Middleware:** Created a centralized `authMiddleware` to handle protection logic in one place rather than repeating code in every route.

## 5. Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies (`express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `dotenv`).
3. Create a `.env` file and add:
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_secret_key`
4. Run `node server.js` to start the server.
5. Open `http://localhost:3000` in your browser.

## 6. Postman Testing
The project includes a Postman collection to verify:
1. **Unauthorized Access:** POST requests fail without a token.
2. **Forbidden Access:** A user with role `user` gets a `403 Forbidden` error when trying to delete.
3. **Admin Success:** A user with role `admin` and `isApproved: true` successfully modifies data.
