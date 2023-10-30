
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/movies-api.jar movies-api.jar
EXPOSE 8080
CMD [ "java", "-jar", "movies-api.jar" ]