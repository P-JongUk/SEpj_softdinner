package com.softdinner.repository;

import lombok.extern.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.reactive.function.client.*;

import java.util.*;

@Slf4j
@Repository
public class MenuRepository {

    private final WebClient supabaseWebClient;
    private final String supabaseUrl;
    private final String supabaseServiceRoleKey;

    public MenuRepository(
            @Qualifier("supabaseWebClient") WebClient supabaseWebClient,
            @Qualifier("supabaseUrl") String supabaseUrl,
            @Qualifier("supabaseServiceRoleKey") String supabaseServiceRoleKey
    ) {
        this.supabaseWebClient = supabaseWebClient;
        this.supabaseUrl = supabaseUrl;
        this.supabaseServiceRoleKey = supabaseServiceRoleKey;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> findAllDinners() {
        try {
            Map<String, Object>[] dinners = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/dinners")
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            return dinners != null ? Arrays.asList(dinners) : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching dinners: {}", e.getMessage(), e);
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> findDinnerById(String dinnerId) {
        try {
            Map<String, Object>[] dinners = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/dinners?id=eq." + dinnerId)
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            if (dinners != null && dinners.length > 0) {
                return dinners[0];
            }
            return null;
        } catch (Exception e) {
            log.error("Error fetching dinner by id: {}", e.getMessage(), e);
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> findMenuItemsByDinnerId(String dinnerId) {
        try {
            Map<String, Object>[] items = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/menu_items?dinner_id=eq." + dinnerId)
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            return items != null ? Arrays.asList(items) : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching menu items: {}", e.getMessage(), e);
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> findAllStyles() {
        try {
            Map<String, Object>[] styles = supabaseWebClient.get()
                    .uri(supabaseUrl + "/rest/v1/styles")
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("apikey", supabaseServiceRoleKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            return styles != null ? Arrays.asList(styles) : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching styles: {}", e.getMessage(), e);
            return new ArrayList<>();
        }
    }
}

