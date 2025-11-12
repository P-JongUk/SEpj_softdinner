"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ChevronRight, Package, Loader2 } from "lucide-react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"
import LoyaltyCard from "@/components/common/loyalty-card"
import { useAuth } from "@/context/AuthContext"
import { orderService } from "@/lib/services/order.service"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [reordering, setReordering] = useState(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth")
      return
    }

    if (user) {
      loadOrders()
    }
  }, [user, authLoading, router])

  const loadOrders = async () => {
    try {
      const ordersData = await orderService.getUserOrders()
      // API 응답을 기존 형식에 맞게 변환
      const formattedOrders = ordersData.map((order) => ({
        id: order.id,
        dinner_name: order.dinnerName || "알 수 없음",
        dinner_style: order.styleName || "알 수 없음",
        created_at: order.orderDate,
        delivery_date: order.deliveryDate,
        total_price: order.finalPrice,
        status: order.deliveryStatus || order.cookingStatus || "pending",
        customizations: order.orderItems?.customizations || {},
      }))
      setOrders(formattedOrders)
    } catch (error) {
      console.error("주문 내역 조회 실패:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleReorder = async (order) => {
    setReordering(order.id)

    // TODO: Supabase에 실제로 주문 데이터 저장
    // 여기서는 커스터마이징 정보를 세션이나 상태로 전달하고 체크아웃으로 이동
    console.log("[v0] 재주문:", order)

    // 잠시 로딩 표시 후 커스터마이징 페이지로 이동
    setTimeout(() => {
      router.push(`/order/customize?dinnerId=${order.dinner_name}&style=${order.dinner_style}&reorder=${order.id}`)
    }, 500)
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: "결제 대기",
      confirmed: "주문 확인",
      cooking: "조리 중",
      delivering: "배달 중",
      delivered: "배달 완료",
      cancelled: "취소됨",
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "text-yellow-600 bg-yellow-50",
      confirmed: "text-blue-600 bg-blue-50",
      cooking: "text-orange-600 bg-orange-50",
      delivering: "text-purple-600 bg-purple-50",
      delivered: "text-green-600 bg-green-50",
      cancelled: "text-red-600 bg-red-50",
    }
    return colorMap[status] || "text-gray-600 bg-gray-50"
  }

  if (loading) {
    return (
      <>
        <Header user={user} role="customer" />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header user={user} role="customer" />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">내 대시보드</h1>
            <p className="text-muted-foreground">주문 내역을 확인하고 새로운 디너를 주문하세요</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LoyaltyCard tier={user.loyalty_tier} points={user.loyalty_points} />
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <ShoppingBag className="w-12 h-12 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">새로운 디너 주문</h3>
              <p className="text-sm text-muted-foreground mb-4">특별한 날을 위한 프리미엄 디너</p>
              <Button asChild className="w-full">
                <Link href="/dinners">
                  디너 메뉴 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">주문 내역</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">아직 주문 내역이 없습니다</h3>
              <p className="text-muted-foreground mb-6">첫 디너를 주문해보세요!</p>
              <Button asChild>
                <Link href="/dinners">디너 메뉴 보기</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {order.dinner_name} ({order.dinner_style})
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          주문일: {new Date(order.created_at).toLocaleDateString("ko-KR")} | 배달일:{" "}
                          {new Date(order.delivery_date).toLocaleDateString("ko-KR")}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">주문 내용</h4>
                      <div className="space-y-1">
                        {order.customizations.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-foreground">
                              {(item.unit_price * item.quantity).toLocaleString()}원
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-2xl font-bold text-primary">총 {order.total_price.toLocaleString()}원</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>상세보기</Link>
                        </Button>
                        <Button size="sm" onClick={() => handleReorder(order)} disabled={reordering === order.id}>
                          {reordering === order.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              처리중...
                            </>
                          ) : (
                            <>똑같이 재주문</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
