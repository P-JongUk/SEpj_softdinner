"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ChefHat, Truck, LogOut, ArrowLeft } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useAuth } from "@/context/AuthContext"
import { apiRequest } from "@/lib/api"

export default function StaffDashboardPage() {
  const router = useRouter()
  const { signOut } = useAuth()
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentActivities()
  }, [])

  const loadRecentActivities = async () => {
    try {
      setLoading(true)
      // 최근 활동 조회 (재료 입출고, 요리 작업, 배달 작업)
      const [ingredientLogs, cookingTasks, deliveryTasks] = await Promise.all([
        apiRequest('/api/ingredients/logs?limit=20').catch(() => []),
        apiRequest('/api/cooking-tasks').catch(() => []),
        apiRequest('/api/delivery-tasks').catch(() => []),
      ])

      const activities = []
      
      // 재료 입출고 기록 (입고만 표시)
      if (ingredientLogs && Array.isArray(ingredientLogs)) {
        ingredientLogs
          .filter(log => log.action === 'in') // 입고만 필터링
          .forEach(log => {
            activities.push({
              type: 'ingredient',
              message: `${log.ingredientName || '재료'} ${Number(log.quantity).toLocaleString()}${log.ingredientUnit || ''} 입고 완료`,
              timestamp: log.createdAt || log.created_at,
              color: 'bg-green-600'
            })
          })
      }

      // 재료 차감 기록 (요리 시작 시)
      if (ingredientLogs && Array.isArray(ingredientLogs)) {
        ingredientLogs
          .filter(log => log.action === 'out' && log.orderId) // 출고 중 주문 관련만
          .forEach(log => {
            // notes가 있으면 notes를 사용, 없으면 기본 형식 사용
            let message = ''
            if (log.notes && log.notes.trim()) {
              message = `주문번호 ${log.orderId?.substring(0, 8) || '알 수 없음'} - ${log.notes}`
            } else {
              message = `주문번호 ${log.orderId?.substring(0, 8) || '알 수 없음'} - ${log.ingredientName || '재료'} ${Number(log.quantity).toLocaleString()}${log.ingredientUnit || ''} 차감`
            }
            activities.push({
              type: 'ingredient-deduction',
              message: message,
              timestamp: log.createdAt || log.created_at,
              color: 'bg-red-600'
            })
          })
      }

      // 요리 작업 기록 (시작/완료)
      const cookingTasksList = cookingTasks?.tasks || (Array.isArray(cookingTasks) ? cookingTasks : [])
      if (Array.isArray(cookingTasksList)) {
        cookingTasksList.forEach(task => {
          const orderId = task.orderId ? task.orderId.substring(0, 8) : '알 수 없음'
          const customerName = task.customerName || '고객'
          
          // 요리 시작
          if (task.status === 'in_progress' && (task.startedAt || task.started_at)) {
            activities.push({
              type: 'cooking-start',
              message: `주문번호 ${orderId} - ${customerName} 요리 시작`,
              timestamp: task.startedAt || task.started_at,
              color: 'bg-orange-500'
            })
          }
          
          // 요리 완료
          if (task.status === 'completed' && (task.completedAt || task.completed_at)) {
            activities.push({
              type: 'cooking-complete',
              message: `주문번호 ${orderId} - ${customerName} 요리 완료`,
              timestamp: task.completedAt || task.completed_at,
              color: 'bg-orange-600'
            })
          }
        })
      }

      // 배달 작업 기록 (시작/완료)
      const deliveryTasksList = deliveryTasks?.tasks || (Array.isArray(deliveryTasks) ? deliveryTasks : [])
      if (Array.isArray(deliveryTasksList)) {
        deliveryTasksList.forEach(task => {
          const orderId = task.orderId ? task.orderId.substring(0, 8) : '알 수 없음'
          const customerName = task.customerName || '고객'
          
          // 배달 시작
          if (task.status === 'in_transit' && (task.startedAt || task.started_at)) {
            activities.push({
              type: 'delivery-start',
              message: `주문번호 ${orderId} - ${customerName} 배달 시작`,
              timestamp: task.startedAt || task.started_at,
              color: 'bg-blue-500'
            })
          }
          
          // 배달 완료
          if (task.status === 'completed' && (task.completedAt || task.completed_at)) {
            activities.push({
              type: 'delivery-complete',
              message: `주문번호 ${orderId} - ${customerName} 배달 완료`,
              timestamp: task.completedAt || task.completed_at,
              color: 'bg-blue-600'
            })
          }
        })
      }

      // 시간순 정렬 (최신순)
      activities.sort((a, b) => {
        const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0
        const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0
        return timeB - timeA
      })

      setRecentActivities(activities.slice(0, 10))
    } catch (error) {
      console.error("최근 활동 조회 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "알 수 없음"
    try {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    } catch (e) {
      return "알 수 없음"
    }
  }

  const menuItems = [
    {
      title: "재료 관리",
      description: "재료 입고 및 재고 관리",
      icon: Package,
      href: "/staff/ingredients",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "요리 관리",
      description: "주문 요리 및 재료 차감",
      icon: ChefHat,
      href: "/staff/cooking",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "배달 관리",
      description: "배달 작업 및 완료 처리",
      icon: Truck,
      href: "/staff/delivery",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]


  return (
    <ProtectedRoute requiredRole="staff">
      <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">직원 대시보드</h1>
            <p className="text-muted-foreground">SoftDinner 관리 시스템에 오신 것을 환영합니다</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>


        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => router.push(item.href)}
            >
              <div
                className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <Button variant="outline" className="w-full bg-transparent">
                관리하기
              </Button>
            </Card>
          ))}
        </div>

        {/* 최근 활동 */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-bold mb-4">최근 활동</h3>
          {loading ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">활동 내역을 불러오는 중...</p>
            </div>
          ) : recentActivities.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">최근 활동이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                  <span className="text-muted-foreground min-w-[150px]">{formatTimestamp(activity.timestamp)}</span>
                  <span>{activity.message}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  )
}
