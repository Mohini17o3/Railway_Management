## Introduction

This Railway Management System API allows users to book train tickets, view bookings, and manage train information. The API supports both user and admin roles, with JWT-based authentication and role-based access control (RBAC). Users can book seats, while admins have the ability to add, update, and delete trains.

---

## User Routes

### Signup

#### `POST auth/signup`
This route allows a new user to sign up by providing a `username` and `password`. Upon successful signup, the user is created in the system.

- **Request Body**:
  ```json
  {
     "name": "user1"
    "username": "user123",
    "password": "securepassword"
    "role" : "user/admin"    (default is user)
  }
   ```
#### Login
#### POST auth/login
 
This route allows a user to log in using their username and password. Upon successful login, a JWT token is returned for future authentication.

Request Body:

```json
{
  "username": "user123",
  "password": "securepassword"
}

```
**Response**:

200 OK with a JWT token if the login is successful.
401 Unauthorized if the credentials are invalid.

### Book Seat
### POST user/bookseat
This route allows a user to book seats on a train. The user must be logged in, and the request should include the trainId and the number of seats to book.

Request Body:

```json
{
  "trainId": 1,
  "numberOfSeats": 4
}
```
**Response**:

201 Created if the booking is successful.
400 Bad Request if the train is not found or insufficient seats are available.

### Show Booking
### GET user/booking/:id
This route allows a user to view their booking details. The id in the URL represents the booking ID, and the request will return the booking details if the user is authorized to view it.

Response:
200 OK with booking details.
404 Not Found if the booking doesn't exist or if the user is not authorized to view it.

#### Admin Routes
#### Add Train
### POST admin/addTrain
This route allows an admin to add a new train to the system. The request body should contain the trainName, source, destination, and seatsAvailable.

Request Body:

```json
{
  "trainName": "Vande Bharat",
  "source": "New Delhi",
  "destination": "Varanasi",
  "seatsAvailable": 500, 
  "trainNumber" : "78625",
  "trainType" :"Superfast",
  "totalSeats" : 400 ,
  "bookedSeats" : 250
}
```
**Response**:

201 Created if the train is added successfully.
403 Forbidden if the user is not an admin or does not provide the correct API key.

### Update Train Seats
### PUT /updateSeats/:trainId
This route allows an admin to update the available seats for a specific train. The trainId is passed in the URL, and the new number of available seats is passed in the request body.

Request Body:

```json
{
  "seatsAvailable": 450
}
```
Response:

200 OK if the seats are updated successfully.
404 Not Found if the train is not found.

### Delete Train
### DELETE /deleteTrain/:trainId
This route allows an admin to delete a specific train by providing the trainId in the URL.

Response:
200 OK if the train is deleted successfully.
404 Not Found if the train is not found.

Authentication
The system uses JWT-based authentication for both users and admins. The token should be passed as a bearer token in the Authorization header for protected routes. For example:

Authorization: Bearer <JWT_TOKEN>
For admin-specific routes, an additional header is required to verify the admin's API key:
x-api-key: <ADMIN_API_KEY>  

###  Running the Server

To run the Express server locally:

### Prerequisites

Ensure that you have the following installed:
- Node.js (v16.x or higher)
- npm (Node Package Manager)

### Steps to Run the Server

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/Mohini17o3/Railway-MAnagement.git
   cd railway_management/Backend
   npm install
   ```
2 . **Set up environment variables**: Create a .env file in the root directory and add the necessary environment variables:

```bash
TOKEN_SECRET=your-secret-key
API_KEY=your-api-key
```
Start the Express server: Run the following command to start the server:

```bash
npm start
```
This will start the server on port 3000 by default. You should see the following message if the server is running correctly:

```bash
Server running on port 3000   
```
