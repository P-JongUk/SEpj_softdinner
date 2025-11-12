package com.softdinner.service;

import com.softdinner.dto.*;
import com.softdinner.repository.OrderRepository;
import com.softdinner.service.LoyaltyService.LoyaltyUpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Slf4j
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final LoyaltyService loyaltyService;

    public OrderService(OrderRepository orderRepository, LoyaltyService loyaltyService) {
        this.orderRepository = orderRepository;
        this.loyaltyService = loyaltyService;
    }

    /**
     * 주문 생성
     */
    public OrderResponseDTO createOrder(CreateOrderRequestDTO request, String userId) {
        try {
            // 1. 사용자 정보 조회
            Map<String, Object> user = orderRepository.getUserById(userId);
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            String currentTier = (String) user.getOrDefault("loyalty_tier", "bronze");
            Integer currentTotalOrders = ((Number) user.getOrDefault("total_orders", 0)).intValue();
            BigDecimal currentTotalSpent = new BigDecimal(user.getOrDefault("total_spent", 0).toString());

            // 2. 디너 및 스타일 정보 조회
            Map<String, Object> dinner = orderRepository.getDinnerById(request.getDinnerId());
            if (dinner == null) {
                throw new RuntimeException("Dinner not found");
            }

            Map<String, Object> style = orderRepository.getStyleById(request.getStyleId());
            if (style == null) {
                throw new RuntimeException("Style not found");
            }

            // 3. 가격 계산
            BigDecimal basePrice = new BigDecimal(dinner.get("base_price").toString());
            BigDecimal stylePriceModifier = new BigDecimal(style.get("price_modifier").toString());
            
            // 커스터마이징 추가 가격 계산 (간단한 버전 - 실제로는 menu_items에서 계산해야 함)
            BigDecimal customizationPrice = BigDecimal.ZERO;
            if (request.getCustomizations() != null) {
                // TODO: 실제 menu_items에서 가격 계산
                customizationPrice = BigDecimal.ZERO;
            }

            BigDecimal subtotal = basePrice.add(stylePriceModifier).add(customizationPrice);

            // 4. 단골 할인 계산
            BigDecimal discountRate = loyaltyService.getDiscountRateByTier(currentTier);
            BigDecimal discountAmount = subtotal.multiply(discountRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal finalPrice = subtotal.subtract(discountAmount);

            // 5. 주문 데이터 구성
            Map<String, Object> orderItems = new HashMap<>();
            // dinner와 style에서 실제 UUID 가져오기
            orderItems.put("dinner_id", dinner.get("id")); // 실제 UUID 사용
            orderItems.put("dinner_name", dinner.get("name"));
            orderItems.put("style_id", style.get("id")); // 실제 UUID 사용
            orderItems.put("style_name", style.get("name"));
            orderItems.put("customizations", request.getCustomizations() != null ? request.getCustomizations() : Map.of());

            Map<String, Object> orderData = new HashMap<>();
            orderData.put("user_id", userId);
            // Instant를 ISO 8601 문자열로 변환 (Supabase가 TIMESTAMP WITH TIME ZONE을 기대)
            String deliveryDateStr = request.getDeliveryDate().atZone(ZoneId.systemDefault()).toInstant().toString();
            orderData.put("delivery_date", deliveryDateStr);
            orderData.put("delivery_address", request.getDeliveryAddress());
            orderData.put("order_items", orderItems);
            // BigDecimal을 문자열로 변환 (Supabase DECIMAL 타입이 문자열을 기대할 수 있음)
            orderData.put("total_price", subtotal.toString());
            orderData.put("discount_applied", discountAmount.toString());
            orderData.put("final_price", finalPrice.toString());
            orderData.put("payment_status", "completed"); // 간단한 버전에서는 바로 완료 처리
            orderData.put("delivery_status", "pending");
            orderData.put("cooking_status", "waiting");
            
            log.debug("Creating order with data: {}", orderData);

            // 6. 주문 저장
            Map<String, Object> savedOrder = orderRepository.createOrder(orderData);
            if (savedOrder == null) {
                throw new RuntimeException("Failed to create order");
            }

            // 7. 사용자 통계 업데이트
            int newTotalOrders = currentTotalOrders + 1;
            BigDecimal newTotalSpent = currentTotalSpent.add(finalPrice);

            Map<String, Object> userUpdate = new HashMap<>();
            userUpdate.put("total_orders", newTotalOrders);
            userUpdate.put("total_spent", newTotalSpent);

            orderRepository.updateUser(userId, userUpdate);

            // 8. 단골 등급 업그레이드 확인
            LoyaltyUpdateResult loyaltyUpdate = loyaltyService.updateLoyaltyTier(
                    userId, newTotalOrders, newTotalSpent);

            // 9. 응답 구성
            OrderResponseDTO.DiscountInfoDTO discountInfo = OrderResponseDTO.DiscountInfoDTO.builder()
                    .tier(currentTier)
                    .discountRate(discountRate)
                    .discountAmount(discountAmount)
                    .build();

            OrderResponseDTO.LoyaltyUpdateResultDTO loyaltyUpdateDTO = null;
            if (loyaltyUpdate != null) {
                loyaltyUpdateDTO = OrderResponseDTO.LoyaltyUpdateResultDTO.builder()
                        .upgraded(loyaltyUpdate.getUpgraded())
                        .oldTier(loyaltyUpdate.getOldTier())
                        .newTier(loyaltyUpdate.getNewTier())
                        .message(loyaltyUpdate.getMessage())
                        .build();
            }

            String message = "주문이 성공적으로 생성되었습니다.";
            if (loyaltyUpdate != null && loyaltyUpdate.getUpgraded()) {
                message += " " + loyaltyUpdate.getMessage();
            }

            return OrderResponseDTO.builder()
                    .id((String) savedOrder.get("id"))
                    .userId(userId)
                    .orderDate(LocalDateTime.now())
                    .deliveryDate(request.getDeliveryDate())
                    .deliveryAddress(request.getDeliveryAddress())
                    .orderItems(orderItems)
                    .totalPrice(subtotal)
                    .discountApplied(discountAmount)
                    .finalPrice(finalPrice)
                    .paymentStatus("completed")
                    .deliveryStatus("pending")
                    .cookingStatus("waiting")
                    .discount(discountInfo)
                    .loyaltyUpdate(loyaltyUpdateDTO)
                    .message(message)
                    .build();

        } catch (Exception e) {
            log.error("Error creating order: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create order: " + e.getMessage());
        }
    }

    /**
     * 사용자의 주문 목록 조회
     */
    @SuppressWarnings("unchecked")
    public List<OrderHistoryDTO> getUserOrders(String userId) {
        try {
            List<Map<String, Object>> orders = orderRepository.getUserOrders(userId);
            log.debug("Retrieved {} orders for user {}", orders.size(), userId);
            
            return orders.stream().map(order -> {
                log.debug("Processing order: {}", order.get("id"));
                Map<String, Object> orderItems = (Map<String, Object>) order.get("order_items");
                log.debug("Order items from DB: {}", orderItems);
                
                String dinnerName = orderItems != null ? (String) orderItems.get("dinner_name") : null;
                String styleName = orderItems != null ? (String) orderItems.get("style_name") : null;
                
                log.debug("Extracted dinnerName: {}, styleName: {}", dinnerName, styleName);
                
                // LocalDateTime 변환 (Supabase에서 문자열로 반환됨)
                LocalDateTime orderDate = null;
                LocalDateTime deliveryDate = null;
                if (order.get("order_date") != null) {
                    Object orderDateObj = order.get("order_date");
                    if (orderDateObj instanceof java.time.Instant) {
                        orderDate = ((java.time.Instant) orderDateObj)
                                .atZone(ZoneId.systemDefault())
                                .toLocalDateTime();
                    } else if (orderDateObj instanceof String) {
                        // ISO 8601 문자열 파싱
                        orderDate = java.time.Instant.parse((String) orderDateObj)
                                .atZone(ZoneId.systemDefault())
                                .toLocalDateTime();
                    }
                }
                if (order.get("delivery_date") != null) {
                    Object deliveryDateObj = order.get("delivery_date");
                    if (deliveryDateObj instanceof java.time.Instant) {
                        deliveryDate = ((java.time.Instant) deliveryDateObj)
                                .atZone(ZoneId.systemDefault())
                                .toLocalDateTime();
                    } else if (deliveryDateObj instanceof String) {
                        // ISO 8601 문자열 파싱
                        deliveryDate = java.time.Instant.parse((String) deliveryDateObj)
                                .atZone(ZoneId.systemDefault())
                                .toLocalDateTime();
                    }
                }
                
                return OrderHistoryDTO.builder()
                        .id((String) order.get("id"))
                        .orderDate(orderDate)
                        .deliveryDate(deliveryDate)
                        .deliveryAddress((String) order.get("delivery_address"))
                        .orderItems(orderItems)
                        .totalPrice(new BigDecimal(order.get("total_price").toString()))
                        .discountApplied(new BigDecimal(order.get("discount_applied").toString()))
                        .finalPrice(new BigDecimal(order.get("final_price").toString()))
                        .paymentStatus((String) order.get("payment_status"))
                        .deliveryStatus((String) order.get("delivery_status"))
                        .cookingStatus((String) order.get("cooking_status"))
                        .dinnerName(dinnerName)
                        .styleName(styleName)
                        .build();
            }).collect(java.util.stream.Collectors.toList());
            
        } catch (Exception e) {
            log.error("Error getting user orders: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get user orders: " + e.getMessage());
        }
    }
}

