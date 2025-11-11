package com.softdinner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    
    private String accessToken;
    private String refreshToken;
    private UserResponseDTO user;
    private String role;
    private String message;
}

