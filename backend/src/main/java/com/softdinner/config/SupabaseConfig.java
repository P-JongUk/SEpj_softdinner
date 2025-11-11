package com.softdinner.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class SupabaseConfig {
    
    @Value("${spring.supabase.url}")
    private String supabaseUrl;
    
    @Value("${spring.supabase.service-role-key}")
    private String serviceRoleKey;
    
    @Bean
    public WebClient supabaseWebClient() {
        return WebClient.builder()
                .baseUrl(supabaseUrl)
                .defaultHeader("apikey", serviceRoleKey)
                .defaultHeader("Authorization", "Bearer " + serviceRoleKey)
                .build();
    }
    
    @Bean
    public String supabaseUrl() {
        return supabaseUrl;
    }
    
    @Bean
    public String supabaseServiceRoleKey() {
        return serviceRoleKey;
    }
}

