import { apiRequest } from '../api'

export const orderService = {
  // 주문 생성
  createOrder: async (orderData) => {
    return apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },

  // 사용자의 주문 목록 조회
  getUserOrders: async () => {
    return apiRequest('/api/orders', {
      method: 'GET',
    })
  },
}

