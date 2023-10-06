package dev.harsh.movies.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    public boolean success;
    public String message;
    public String name;
    public String email;
    public String role;
}
