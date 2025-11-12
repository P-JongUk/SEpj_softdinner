"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ChefHat, Truck, TrendingUp } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function StaffDashboardPage() {
  const router = useRouter()

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

  const stats = [
    { label: "오늘 주문", value: "12건", trend: "+3" },
    { label: "대기 중 요리", value: "5건", trend: "" },
    { label: "배달 중", value: "3건", trend: "" },
    { label: "완료", value: "4건", trend: "+2" },
  ]

  return (
    <ProtectedRoute requiredRole="staff">
      <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">직원 대시보드</h1>
          <p className="text-muted-foreground">SoftDinner 관리 시스템에 오신 것을 환영합니다</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                {stat.trend && (
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.trend}
                  </div>
                )}
              </div>
            </Card>
          ))}
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
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="text-muted-foreground">10분 전</span>
              <span>샴페인 2병 입고 완료</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-orange-600"></div>
              <span className="text-muted-foreground">25분 전</span>
              <span>ORD-001 요리 완료 (재료 자동 차감)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-muted-foreground">45분 전</span>
              <span>ORD-002 배달 완료</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  )
}
