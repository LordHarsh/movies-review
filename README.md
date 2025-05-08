# Movies Review Platform

<div align="center">
  <img src="express-server/docs/logo.svg" height="120" alt="Movies Review Logo" />

  <h1>Reel Reviewer</h1>
  <p>A full-stack movie review application with features for browsing movies, watching trailers, leaving reviews, and managing personal watchlists</p>
</div>

## 📋 Project Overview

Reel Reviewer is a feature-rich movie review platform that allows users to:

- Browse a collection of movies
- Watch movie trailers
- Read and write movie reviews
- Create personal watchlists
- Search for movies by title

The project consists of three main components:
- React.js frontend client
- Express.js backend server (Node.js/TypeScript)
- Spring Boot backend server (Java)

## 🚀 Technologies Used

### Frontend
- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Font Awesome](https://fontawesome.com/)
- [React Player](https://github.com/CookPete/react-player)

### Backend (Express)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [JWT Authentication](https://jwt.io/)

### Backend (Spring Boot)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [MongoDB](https://www.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
- [Lombok](https://projectlombok.org/)

## 💻 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or a remote connection)
- [Java](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (JDK 17 or higher for Spring Boot)
- [Maven](https://maven.apache.org/) (for Spring Boot server)

### Frontend Setup

```bash
# Navigate to the React client directory
cd reactjs-client

# Install dependencies
npm install
# or
yarn

# Start the development server
npm start
# or
yarn start
```

The frontend will be accessible at `http://localhost:3000`.

### Express Backend Setup

```bash
# Navigate to the Express server directory
cd express-server

# Install dependencies
npm install
# or
yarn

# Start the development server
npm start
# or
yarn start
```

The Express server will run on `http://localhost:8080` by default.

### Spring Boot Backend Setup

```bash
# Navigate to the Spring Boot server directory
cd springboot-server

# Build and package the application
mvn clean install

# Run the application
java -jar target/movies-api.jar
```

The Spring Boot server will run on `http://localhost:8080` by default.

## 🐳 Docker Setup

You can also run the entire application stack using Docker:

```bash
# Build and start all services
docker-compose up -d
```

This will start the MongoDB database, Express server, Spring Boot server, and React client in separate containers.

## 📝 Features

- **User Authentication**: Register, login, and manage your profile
- **Movie Browsing**: Browse through a collection of movies with details
- **Movie Search**: Search for movies by title
- **Trailer Viewing**: Watch movie trailers directly in the application
- **Review System**: Read and write reviews for movies
- **Watchlist**: Maintain a personal watchlist of movies you want to watch
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🔄 API Endpoints

### Movies
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/movies/{imdbId}` - Get movie by IMDb ID
- `GET /api/v1/movies/search/{title}` - Search movies by title

### Reviews
- `POST /api/v1/reviews` - Add a new review

### User
- `GET /api/v1/user` - Get user information
- `GET /api/v1/user/watchlist` - Get user's watchlist
- `POST /api/v1/user/watchlist` - Add movie to watchlist
- `DELETE /api/v1/user/watchlist` - Remove movie from watchlist

### Auth
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/authenticate` - Authenticate user

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read the [Contributing.md](express-server/Contributing.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is available for use under the MIT License. See the LICENSE file for more information.