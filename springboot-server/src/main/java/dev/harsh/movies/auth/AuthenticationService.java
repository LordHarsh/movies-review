package dev.harsh.movies.auth;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.harsh.movies.config.JwtService;
import dev.harsh.movies.user.Role;
import dev.harsh.movies.user.User;
import dev.harsh.movies.user.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail())
            .orElse(null);
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }
        User user = userRepository.insert(new User(
            request.getName(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            Role.USER
        ));
        var jwtToken =jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .success(true)
            .message("User registered successfully")
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole().toString())
            .token(jwtToken)
            .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .success(true)
            .message("User authenticated successfully")
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole().toString())
            .token(jwtToken)
            .build();
    }
}
