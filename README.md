# Movies Review

## Description

This project is a full-stack web application for managing a movie watchlist, built using Java, Spring Boot, MongoDB, React.js, and Node.js. It enables users to create accounts, sign in, view and manage their personal watchlists, and add reviews to movies.

## Key Features

User registration and authentication with JWT
CRUD operations for managing movies in a watchlist
Ability to add reviews to movies
Secure API endpoints with JWT authentication
User-friendly React.js frontend interface

## Development Environment

### Backend:
Java Development Kit (JDK)
Spring Boot
MongoDB (or other preferred database)
MongoDB Java Driver
### Frontend:
React.js
Node.js and npm

## API Routes

### Authentication:

`/signup`: Register a new user

`/login`: Log in a user and obtain a JWT token

`/logout`: Log out a user

### Movie Management:

`/movies`: Get a list of all movies

`/watchlist`: Get a user's watchlist (requires JWT)

`/watchlist/add`: Add a movie to a user's watchlist (requires JWT)

`/watchlist/remove`: Remove a movie from a user's watchlist (requires JWT)

`/reviews/add`: Add a review to a movie (requires JWT)

## Installation and Setup

#### Clone the repository:

```Bash
git clone https://github.com/your-username/your-project-name.git
```

#### Install dependencies:
Backend:
```Bash
cd backend
mvn clean install
```
Frontend:
```Bash
cd frontend
npm install
```
Configure database connection in backend/src/main/resources/application.properties
Start the backend server:
```Bash
cd backend
mvn spring-boot:run
```

Start the frontend server:

```Bash
cd frontend
npm start
```
## Usage

Access the application in your web browser, typically at http://localhost:3000
Sign up or log in to create or access your watchlist
Manage your watchlist by adding, removing, and reviewing movies

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Architecture Diagram


![image](https://github.com/LordHarsh/movies-review/assets/56753150/3bddd841-630f-4cd6-b079-400647eb7b2f)

![image](https://github.com/LordHarsh/movies-review/assets/56753150/a625de37-cb48-4014-b513-ada73318616c)


## Screenshots
![image](https://github.com/LordHarsh/movies-review/assets/56753150/1f0a37e8-ad9c-4e61-9ced-5df652f25de7)
![image](https://github.com/LordHarsh/movies-review/assets/56753150/d3973b63-3e20-42f0-87c0-30b542a091ca)
![image](https://github.com/LordHarsh/movies-review/assets/56753150/f5f296c3-2251-4aac-9855-69fffe6ad332)
![image](https://github.com/LordHarsh/movies-review/assets/56753150/fe8c2d2b-38d7-4ed3-b4ce-15dd36afcdf5)
![image](https://github.com/LordHarsh/movies-review/assets/56753150/5dd681c7-a179-4400-af30-e5a1e34e9e84)
![image](https://github.com/LordHarsh/movies-review/assets/56753150/f7ee6194-4af0-43cc-a3a6-d763384e63f1)
