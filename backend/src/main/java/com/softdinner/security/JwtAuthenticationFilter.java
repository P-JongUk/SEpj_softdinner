package com.softdinner.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;
import org.springframework.web.filter.*;
import org.springframework.web.reactive.function.client.*;

import java.io.*;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final WebClient supabaseWebClient;
    private final String supabaseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        
        try {
            // Verify token with Supabase
            Map<String, Object> userData = verifyTokenWithSupabase(token);
            
            if (userData != null) {
                String userId = (String) userData.get("id");
                
                // Create authentication
                UserDetails userDetails = User.builder()
                        .username(userId)
                        .password("")
                        .authorities(new ArrayList<>())
                        .build();
                
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.error("Error verifying token: {}", e.getMessage());
            // Continue without authentication - let the endpoint handle it
        }
        
        filterChain.doFilter(request, response);
    }

    private Map<String, Object> verifyTokenWithSupabase(String token) {
        try {
            // Call Supabase Auth API to verify token
            @SuppressWarnings("unchecked")
            Map<String, Object> response = supabaseWebClient.get()
                    .uri(supabaseUrl + "/auth/v1/user")
                    .header("Authorization", "Bearer " + token)
                    .header("apikey", supabaseUrl) // This should be the anon key, but we'll use service role key
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            
            return response;
        } catch (Exception e) {
            log.error("Error verifying token with Supabase: {}", e.getMessage());
            return null;
        }
    }
}

