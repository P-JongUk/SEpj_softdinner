package com.softdinner.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Repository
public class OrderRepository {

    private final WebClient supabaseWebClient;
    private final String supabaseUrl;
    private final String supabaseServiceRoleKey;

    public OrderRepository(
            @Qualifier("supabaseWebClient") WebClient supabaseWebClient,
            @Qualifier("supabaseUrl") String supabaseUrl,
            @Qualifier("supabaseServiceRoleKey") String supabaseServiceRoleKey
    ) {
        this.supabaseWebClient = supabaseWebClient;
        this.supabaseUrl = supabaseUrl;
        this.supabaseServiceRoleKey = supabaseServiceRoleKey;
    }

    /**
     * 주문 생성
     */
    @SuppressWarnings({"unchecked", "null"})
    public Map<String, Object> createOrder(Map<String, Object> orderData) {
        Map<String, Object>[] result = supabaseWebClient.post()
                .uri(supabaseUrl + "/rest/v1/orders")
                .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                .header("apikey", supabaseServiceRoleKey)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=representation")
                .bodyValue(orderData)
                .retrieve()
                .bodyToMono(Map[].class)
                .block();

        return result != null && result.length > 0 ? result[0] : null;
    }

    /**
     * 사용자 정보 조회
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getUserById(String userId) {
        Map<String, Object>[] result = supabaseWebClient.get()
                .uri(supabaseUrl + "/rest/v1/users?id=eq." + userId)
                .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                .header("apikey", supabaseServiceRoleKey)
                .retrieve()
                .bodyToMono(Map[].class)
                .block();

        return result != null && result.length > 0 ? result[0] : null;
    }

    /**
     * 사용자 정보 업데이트 (total_orders, total_spent, loyalty_tier)
     */
    @SuppressWarnings({"unchecked", "null"})
    public Map<String, Object> updateUser(String userId, Map<String, Object> updateData) {
        Map<String, Object>[] result = supabaseWebClient.patch()
                .uri(supabaseUrl + "/rest/v1/users?id=eq." + userId)
                .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                .header("apikey", supabaseServiceRoleKey)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=representation")
                .bodyValue(updateData)
                .retrieve()
                .bodyToMono(Map[].class)
                .block();

        return result != null && result.length > 0 ? result[0] : null;
    }

    /**
     * 디너 정보 조회
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getDinnerById(String dinnerId) {
        List<Map<String, Object>> result = supabaseWebClient.get()
                .uri(supabaseUrl + "/rest/v1/dinners?id=eq." + dinnerId)
                .header("apikey", supabaseServiceRoleKey)
                .retrieve()
                .bodyToMono(List.class)
                .block();

        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    /**
     * 스타일 정보 조회
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getStyleById(String styleId) {
        List<Map<String, Object>> result = supabaseWebClient.get()
                .uri(supabaseUrl + "/rest/v1/styles?id=eq." + styleId)
                .header("apikey", supabaseServiceRoleKey)
                .retrieve()
                .bodyToMono(List.class)
                .block();

        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    /**
     * 사용자의 주문 목록 조회 (최근순)
     */
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getUserOrders(String userId) {
        List<Map<String, Object>> result = supabaseWebClient.get()
                .uri(supabaseUrl + "/rest/v1/orders?user_id=eq." + userId + "&order=order_date.desc")
                .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                .header("apikey", supabaseServiceRoleKey)
                .retrieve()
                .bodyToMono(List.class)
                .block();

        return result != null ? result : new java.util.ArrayList<>();
    }
}

