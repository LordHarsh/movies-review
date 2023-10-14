package dev.harsh.movies.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private boolean success;
    private String message;
    private String name;
    private String email;
    private String role;
    private String token;
}
