import { apiRequest } from "../api"

/**
 * 배달 작업 관련 API 서비스
 */
export const deliveryService = {
  /**
   * 배달 작업 목록 조회
   */
  async getDeliveryTasks() {
    return apiRequest("/api/delivery-tasks", {
      method: "GET",
    })
  },

  /**
   * 배달 시작
   */
  async startDelivery(taskId) {
    return apiRequest(`/api/delivery-tasks/${taskId}/start`, {
      method: "POST",
    })
  },

  /**
   * 배달 완료
   */
  async completeDelivery(taskId) {
    return apiRequest(`/api/delivery-tasks/${taskId}/complete`, {
      method: "POST",
    })
  },
}

