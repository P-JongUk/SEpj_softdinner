"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, CheckCircle } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function StaffDeliveryPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // TODO: API에서 배달 작업 목록 로드 (Task Bundle 11에서 구현 예정)
    // 현재는 빈 배열로 시작
    setTasks([])
  }, [])

  const handleStart = (taskId) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "in_transit" } : task)))
  }

  const handleComplete = (taskId) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))
    alert("배달 완료!")
  }

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: "배달 대기", variant: "secondary", color: "text-blue-600" },
      in_transit: { label: "배달 중", variant: "default", color: "text-orange-600" },
      completed: { label: "배달 완료", variant: "outline", color: "text-green-600" },
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
          <h1 className="text-3xl font-bold mb-2">배달 작업 관리</h1>
          <p className="text-muted-foreground mb-8">준비된 디너를 고객에게 배달하세요</p>

          {/* 작업 목록 */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{task.customerName}</h3>
                      {getStatusBadge(task.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">주문:</span>
                        <span className="font-medium">{task.dinnerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{task.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>배달 날짜: {task.deliveryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-2">
                    {task.status === "pending" && (
                      <Button onClick={() => handleStart(task.id)}>
                        <Truck className="w-4 h-4 mr-2" />
                        배달 시작
                      </Button>
                    )}
                    {task.status === "in_transit" && (
                      <Button onClick={() => handleComplete(task.id)} variant="default">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        배달 완료
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
                <p className="text-muted-foreground">현재 배달 작업이 없습니다</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
