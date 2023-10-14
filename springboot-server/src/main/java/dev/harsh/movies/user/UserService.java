package dev.harsh.movies.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import dev.harsh.movies.Movie;
import dev.harsh.movies.MovieRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public UserResponse getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            User user = userRepository.findByEmail(authentication.getName())
                .orElse(null);
            if(user != null){
                return UserResponse.builder()
                    .success(true)
                    .message("User found")
                    .name(user.getName())
                    .email(user.getEmail())
                    .role(user.getRole().toString())
                    .build();
            }
        }
        return UserResponse.builder()
            .success(false)
            .message("User not found")
            .build();
    }
    public GetWatchlistResponse getWatchlist() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
               .orElseThrow();
            List<Movie> watchlist = new ArrayList<Movie>();
            user.getWatchlist().forEach(imdbId -> {
                movieRepository.findMovieByImdbId(imdbId).ifPresent(movie -> {
                    watchlist.add(movie);
                });
            });
                return GetWatchlistResponse.builder()
                    .success(true)
                    .message("Watchlist found")
                    .watchlist(watchlist)
                    .build();
        } else {
            throw new RuntimeException("User not found");
        }
    }
    public AddWatchlistResponse addToWatchlist(String imdbId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String email = authentication.getName();
            List<String> watchList = userRepository.findByEmail(email)
                .orElseThrow().getWatchlist();
            if(watchList.contains(imdbId)){
                throw new RuntimeException("Already in watchlist");
            }
            watchList.add(imdbId);
            movieRepository.findMovieByImdbId(imdbId)
            .orElseThrow(()->new RuntimeException("Movie not found"));
            mongoTemplate.update(User.class)
                .matching(Criteria.where("email").is(email))
                .apply(new Update().set("watchlist", watchList))
                .first();
            return AddWatchlistResponse.builder()
                .success(true)
                .message("Added to watchlist")
                .build();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public DeleteWatchlistResponse removeFromWatchlist(String imdbId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String email = authentication.getName();
            List<String> watchList = userRepository.findByEmail(email)
                .orElseThrow().getWatchlist();
            if(watchList.contains(imdbId)){
                watchList.remove(imdbId);
            } else {
                throw new RuntimeException("Not in watchlist");
            }
            mongoTemplate.update(User.class)
                .matching(Criteria.where("email").is(email))
                .apply(new Update().set("watchlist", watchList))
                .first();
            return DeleteWatchlistResponse.builder()
                .success(true)
                .message("Removed from watchlist")
                .build();
        } else {
            throw new RuntimeException("User not found");
        }
    }

}
