package dev.harsh.movies.user;

import java.util.List;

import dev.harsh.movies.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetWatchlistResponse {
    private boolean success;
    private String message;
    private List<Movie> watchlist;
}
