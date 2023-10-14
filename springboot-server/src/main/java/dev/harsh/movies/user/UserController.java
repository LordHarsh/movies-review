package dev.harsh.movies.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<UserResponse> getUser() {
        return ResponseEntity.ok(userService.getUser());
    }

    @GetMapping("/watchlist")
    public ResponseEntity<GetWatchlistResponse> getWatchlist() {
        try {
            return ResponseEntity.ok(userService.getWatchlist());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(GetWatchlistResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/watchlist")
    public ResponseEntity<AddWatchlistResponse> addToWatchlist(@RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(userService.addToWatchlist(request.get("imdbId")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(AddWatchlistResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/watchlist")
    public ResponseEntity<DeleteWatchlistResponse> removeFromWatchlist(@RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(userService.removeFromWatchlist(request.get("imdbId")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(DeleteWatchlistResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}
