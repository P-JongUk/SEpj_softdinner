"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Home, Receipt } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 실제로는 orderId로 주문 정보를 가져와야 함
  const orderData = {
    orderId: "ORD-20241202-001",
    dinnerName: "샴페인 축제 디너",
    style: "디럭스",
    customizations: ["샴페인 2병", "바게트빵 6개", "커피 제거"],
    deliveryDate: "2024-12-02",
    deliveryAddress: "서울시 강남구 테헤란로 123",
    basePrice: 180000,
    stylePrice: 20000,
    customizationPrice: 15000,
    subtotal: 215000,
    loyaltyTier: "silver",
    discountRate: 5,
    discountAmount: 10750,
    finalPrice: 204250,
    orderDate: new Date().toLocaleDateString("ko-KR"),
  }

  useEffect(() => {
    // 주문 성공 효과음이나 애니메이션
    console.log("[v0] Order success page loaded")
  }, [])

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 성공 메시지 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">주문이 완료되었습니다!</h1>
          <p className="text-muted-foreground">맛있는 디너를 준비하여 배달해드리겠습니다</p>
        </div>

        {/* 주문 정보 */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <h3 className="text-lg font-bold">주문 번호</h3>
            <Badge variant="outline" className="text-base font-mono">
              {orderData.orderId}
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">주문일</span>
              <span className="font-medium">{orderData.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">디너</span>
              <span className="font-medium">{orderData.dinnerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">스타일</span>
              <span className="font-medium">{orderData.style}</span>
            </div>
            {orderData.customizations.length > 0 && (
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">커스터마이징</span>
                <div className="text-right">
                  {orderData.customizations.map((item, idx) => (
                    <div key={idx} className="text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">배달 예정일</span>
              <span className="font-bold text-primary">{orderData.deliveryDate}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">배달 주소</span>
              <span className="font-medium text-right max-w-xs">{orderData.deliveryAddress}</span>
            </div>
          </div>
        </Card>

        {/* 가격 정보 */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">결제 내역</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">기본 가격</span>
              <span>₩{orderData.basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">스타일 추가</span>
              <span>₩{orderData.stylePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">커스터마이징</span>
              <span>₩{orderData.customizationPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">소계</span>
              <span className="font-medium">₩{orderData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>
                단골 할인 ({orderData.loyaltyTier.toUpperCase()} {orderData.discountRate}%)
              </span>
              <span>-₩{orderData.discountAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold">최종 결제 금액</span>
              <span className="text-3xl font-bold text-primary">₩{orderData.finalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* 할인 혜택 강조 */}
          {orderData.discountAmount > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-sm font-bold text-green-800">단골 고객님께 특별 할인이 적용되었습니다!</p>
                  <p className="text-xs text-green-700">
                    {orderData.discountAmount.toLocaleString()}원을 절약하셨습니다
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* 액션 버튼 */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            <Receipt className="w-4 h-4 mr-2" />
            주문 내역 보기
          </Button>
          <Button className="flex-1" size="lg" onClick={() => router.push("/")}>
            <Home className="w-4 h-4 mr-2" />
            홈으로
          </Button>
        </div>
      </div>
    </div>
  )
}
