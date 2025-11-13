"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, CheckCircle, Loader2, ArrowLeft, ChefHat } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useDeliveryTasks } from "@/hooks/useDeliveryTasks"
import { toast } from "sonner"

export default function StaffDeliveryPage() {
  const router = useRouter()
  const { tasks, loading, error, startDelivery, completeDelivery } = useDeliveryTasks()
  const [processing, setProcessing] = useState(null)

  const handleStart = async (taskId) => {
    setProcessing(taskId)
    try {
      const result = await startDelivery(taskId)
      if (result.success) {
        toast.success("배달이 시작되었습니다")
      } else {
        toast.error(result.error || "배달 시작에 실패했습니다")
      }
    } catch (err) {
      toast.error("배달 시작에 실패했습니다")
    } finally {
      setProcessing(null)
    }
  }

  const handleComplete = async (taskId) => {
    setProcessing(taskId)
    try {
      const result = await completeDelivery(taskId)
      if (result.success) {
        toast.success(result.message || "배달이 완료되었습니다")
      } else {
        toast.error(result.error || "배달 완료에 실패했습니다")
      }
    } catch (err) {
      toast.error("배달 완료에 실패했습니다")
    } finally {
      setProcessing(null)
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
          <Button variant="ghost" className="mb-6" onClick={() => router.push("/staff")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <h1 className="text-3xl font-bold mb-2">배달 작업 관리</h1>

          {/* 로딩 상태 */}
          {loading && (
            <Card className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">배달 작업 목록을 불러오는 중...</p>
            </Card>
          )}

          {/* 에러 상태 */}
          {error && !loading && (
            <Card className="p-12 text-center border-destructive">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>다시 시도</Button>
            </Card>
          )}

          {/* 작업 목록 */}
          {!loading && !error && (
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
                      {task.orderId && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">주문번호:</span>
                          <span className="font-medium">{task.orderId}</span>
                        </div>
                      )}
                      {task.dinnerName && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">주문:</span>
                          <span className="font-medium">{task.dinnerName}</span>
                        </div>
                      )}
                      {task.deliveryAddress && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{task.deliveryAddress}</span>
                        </div>
                      )}
                      {task.deliveryDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>배달 예정: {formatTimestamp(task.deliveryDate)}</span>
                        </div>
                      )}
                      {/* 배달 시작 시간 */}
                      {(task.startedAt || task.started_at) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Truck className="w-4 h-4" />
                          <span>배달 시작: {formatTimestamp(task.startedAt || task.started_at)}</span>
                        </div>
                      )}
                      {/* 배달 완료 시간 */}
                      {(task.completedAt || task.completed_at) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4" />
                          <span>배달 완료: {formatTimestamp(task.completedAt || task.completed_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-2">
                    {task.status === "pending" && (
                      <Button 
                        onClick={() => handleStart(task.id)} 
                        disabled={processing === task.id || !task.isCookingComplete}
                        className={!task.isCookingComplete ? "opacity-50" : ""}
                      >
                        {processing === task.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : task.isCookingComplete ? (
                          <Truck className="w-4 h-4 mr-2" />
                        ) : (
                          <ChefHat className="w-4 h-4 mr-2" />
                        )}
                        {task.isCookingComplete ? "배달 시작" : "요리중"}
                      </Button>
                    )}
                    {task.status === "in_transit" && (
                      <Button 
                        onClick={() => handleComplete(task.id)} 
                        variant="default"
                        disabled={processing === task.id}
                      >
                        {processing === task.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
