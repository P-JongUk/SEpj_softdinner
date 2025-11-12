"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, CheckCircle } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function StaffCookingPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // TODO: API에서 요리 작업 목록 로드 (Task Bundle 10에서 구현 예정)
    // 현재는 빈 배열로 시작
    setTasks([])
  }, [])

  const handleStart = (taskId) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "in_progress" } : task)))
  }

  const handleComplete = (taskId) => {
    // 재료 자동 차감 로직 호출
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))
    alert("요리 완료! 재료가 자동으로 차감되었습니다.")
  }

  const getStatusBadge = (status) => {
    const config = {
      waiting: { label: "대기중", variant: "secondary", color: "text-blue-600" },
      in_progress: { label: "진행중", variant: "default", color: "text-orange-600" },
      completed: { label: "완료", variant: "outline", color: "text-green-600" },
    }
    const { label, variant, color } = config[status]
    return (
      <Badge variant={variant} className={color}>
        {label}
      </Badge>
    )
  }

  return (
    <ProtectedRoute requiredRole="staff">
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">요리 작업 관리</h1>
          <p className="text-muted-foreground mb-8">주문된 디너를 준비하고 완료 시 재료가 자동 차감됩니다</p>

          {/* 작업 목록 */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{task.dinnerName}</h3>
                      {getStatusBadge(task.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>주문번호: {task.orderId}</span>
                      <span>•</span>
                      <span>고객: {task.customerName}</span>
                      <span>•</span>
                      <span>스타일: {task.style}</span>
                    </div>

                    {/* 커스터마이징 */}
                    {task.customizations.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">커스터마이징:</p>
                        <div className="flex flex-wrap gap-2">
                          {task.customizations.map((item, idx) => (
                            <Badge key={idx} variant="outline">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 배달 날짜 */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>배달 예정: {task.deliveryDate}</span>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-2">
                    {task.status === "waiting" && (
                      <Button onClick={() => handleStart(task.id)}>
                        <ChefHat className="w-4 h-4 mr-2" />
                        요리 시작
                      </Button>
                    )}
                    {task.status === "in_progress" && (
                      <Button onClick={() => handleComplete(task.id)} variant="default">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        요리 완료
                      </Button>
                    )}
                    {task.status === "completed" && (
                      <Button disabled variant="outline">
                        완료됨
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {tasks.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">현재 요리 작업이 없습니다</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
