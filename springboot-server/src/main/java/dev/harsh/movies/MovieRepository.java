package dev.harsh.movies;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    Optional<Movie> findMovieByImdbId(String imdbId);
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByTitleIgnoreCase(String title);

}
