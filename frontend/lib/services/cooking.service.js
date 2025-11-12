import { apiRequest } from "../api"

/**
 * 요리 작업 관련 API 서비스
 */
export const cookingService = {
  /**
   * 요리 작업 목록 조회
   */
  async getCookingTasks() {
    return apiRequest("/api/cooking-tasks", {
      method: "GET",
    })
  },

  /**
   * 요리 시작
   */
  async startCooking(taskId) {
    return apiRequest(`/api/cooking-tasks/${taskId}/start`, {
      method: "POST",
    })
  },

  /**
   * 요리 완료 (재료 자동 차감 포함)
   */
  async completeCooking(taskId) {
    return apiRequest(`/api/cooking-tasks/${taskId}/complete`, {
      method: "POST",
    })
  },
}

