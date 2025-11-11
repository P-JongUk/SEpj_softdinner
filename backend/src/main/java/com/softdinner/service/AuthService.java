package com.softdinner.service;

import com.softdinner.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class AuthService {

    private final WebClient supabaseWebClient;
    private final String supabaseUrl;
    private final String supabaseServiceRoleKey;

    public AuthService(
            @Qualifier("supabaseWebClient") WebClient supabaseWebClient,
            @Qualifier("supabaseUrl") String supabaseUrl,
            @Qualifier("supabaseServiceRoleKey") String supabaseServiceRoleKey
    ) {
        this.supabaseWebClient = supabaseWebClient;
        this.supabaseUrl = supabaseUrl;
        this.supabaseServiceRoleKey = supabaseServiceRoleKey;
    }

    public AuthResponseDTO signup(SignupRequestDTO request) {
        try {
            // 1. Create user in Supabase Auth
            Map<String, Object> authRequest = new HashMap<>();
            authRequest.put("email", request.getEmail());
            authRequest.put("password", request.getPassword());
            authRequest.put("user_metadata", Map.of(
                    "full_name", request.getFullName(),
                    "phone", request.getPhone() != null ? request.getPhone() : "",
                    "address", request.getAddress() != null ? request.getAddress() : ""
            ));

            Map<String, Object> authResponse = supabaseWebClient.post()
                    .uri(supabaseUrl + "/auth/v1/admin/users")
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .bodyValue(authRequest)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (authResponse == null) {
                throw new RuntimeException("Failed to create user in Supabase Auth");
            }

            String userId = (String) authResponse.get("id");
            String accessToken = (String) authResponse.get("access_token");
            String refreshToken = (String) authResponse.get("refresh_token");

            // 2. Create user record in users table
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", userId);
            userData.put("email", request.getEmail());
            userData.put("full_name", request.getFullName());
            userData.put("phone", request.getPhone());
            userData.put("address", request.getAddress());
            userData.put("role", request.getRole());
            userData.put("loyalty_tier", "bronze");
            userData.put("total_orders", 0);
            userData.put("total_spent", 0.0);

            Map<String, Object> dbResponse = supabaseWebClient.post()
                    .uri(supabaseUrl + "/rest/v1/users")
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .header("Content-Type", "application/json")
                    .header("Prefer", "return=representation")
                    .bodyValue(userData)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            // 3. Build response
            UserResponseDTO userDTO = UserResponseDTO.builder()
                    .id(userId)
                    .email(request.getEmail())
                    .fullName(request.getFullName())
                    .phone(request.getPhone())
                    .address(request.getAddress())
                    .role(request.getRole())
                    .loyaltyTier("bronze")
                    .totalOrders(0)
                    .totalSpent(0.0)
                    .build();

            return AuthResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(userDTO)
                    .role(request.getRole())
                    .message("User registered successfully")
                    .build();

        } catch (Exception e) {
            log.error("Error during signup: {}", e.getMessage(), e);
            throw new RuntimeException("Signup failed: " + e.getMessage());
        }
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            // 1. Authenticate with Supabase Auth
            Map<String, Object> authRequest = new HashMap<>();
            authRequest.put("email", request.getEmail());
            authRequest.put("password", request.getPassword());

            Map<String, Object> authResponse = supabaseWebClient.post()
                    .uri(supabaseUrl + "/auth/v1/token?grant_type=password")
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(authRequest)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (authResponse == null) {
                throw new RuntimeException("Invalid email or password");
            }

            String userId = (String) authResponse.get("user_id");
            String accessToken = (String) authResponse.get("access_token");
            String refreshToken = (String) authResponse.get("refresh_token");

            // 2. Get user data from users table
            @SuppressWarnings("unchecked")
            Map<String, Object>[] userDataArray = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/users?id=eq." + userId)
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            if (userDataArray == null || userDataArray.length == 0) {
                throw new RuntimeException("User not found in database");
            }

            Map<String, Object> user = userDataArray[0];

            UserResponseDTO userDTO = UserResponseDTO.builder()
                    .id((String) user.get("id"))
                    .email((String) user.get("email"))
                    .fullName((String) user.get("full_name"))
                    .phone((String) user.get("phone"))
                    .address((String) user.get("address"))
                    .role((String) user.get("role"))
                    .loyaltyTier((String) user.get("loyalty_tier"))
                    .totalOrders((Integer) user.get("total_orders"))
                    .totalSpent(((Number) user.get("total_spent")).doubleValue())
                    .build();

            return AuthResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(userDTO)
                    .role(userDTO.getRole())
                    .message("Login successful")
                    .build();

        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage(), e);
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    public UserResponseDTO getCurrentUser(String userId) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object>[] userDataArray = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/users?id=eq." + userId)
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            if (userDataArray == null || userDataArray.length == 0) {
                throw new RuntimeException("User not found");
            }

            Map<String, Object> user = userDataArray[0];

            return UserResponseDTO.builder()
                    .id((String) user.get("id"))
                    .email((String) user.get("email"))
                    .fullName((String) user.get("full_name"))
                    .phone((String) user.get("phone"))
                    .address((String) user.get("address"))
                    .role((String) user.get("role"))
                    .loyaltyTier((String) user.get("loyalty_tier"))
                    .totalOrders((Integer) user.get("total_orders"))
                    .totalSpent(((Number) user.get("total_spent")).doubleValue())
                    .build();

        } catch (Exception e) {
            log.error("Error getting current user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get user: " + e.getMessage());
        }
    }
}

