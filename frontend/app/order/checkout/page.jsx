"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"
import { orderAPI } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import useOrderStore from "@/store/orderStore"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  
  const dinnerId = searchParams.get("dinner")
  const styleId = searchParams.get("style")

  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Zustand store에서 커스터마이징 정보 가져오기
  const { customizations } = useOrderStore()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth")
      return
    }
  }, [user, authLoading, router])

  const handleSubmitOrder = async () => {
    if (!deliveryAddress || !deliveryDate) {
      alert("배달 주소와 날짜를 입력해주세요")
      return
    }

    if (!dinnerId || !styleId) {
      alert("주문 정보가 올바르지 않습니다. 다시 시도해주세요.")
      router.push("/dinners")
      return
    }

    setIsProcessing(true)

    try {
      // 주문 데이터 구성
      const orderData = {
        dinnerId: dinnerId,
        styleId: styleId,
        deliveryAddress: deliveryAddress,
        deliveryDate: deliveryDate.toISOString(),
        customizations: customizations || {},
        paymentInfo: {
          cardNumber: cardNumber,
          expiryDate: expiryDate,
          cvc: cvc,
        },
      }

      // API 호출하여 주문 생성
      const response = await orderAPI.createOrder(orderData)

      // 성공 시 완료 페이지로 이동 (주문 ID 전달)
      router.push(`/order/success?orderId=${response.id}`)
    } catch (error) {
      console.error("주문 실패:", error)
      alert(`주문에 실패했습니다: ${error.message}`)
      setIsProcessing(false)
    }
  }

  if (authLoading) {
    return (
      <>
        <Header user={user} role="customer" />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header user={user} role="customer" />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>

          <h1 className="text-3xl font-bold mb-2">주문 완료하기</h1>
          <p className="text-muted-foreground mb-8">배달 정보와 결제 정보를 입력해주세요</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 배달 & 결제 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 배달 정보 */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">배달 정보</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">배달 주소 *</Label>
                    <Input
                      id="address"
                      placeholder="서울시 강남구 테헤란로 123"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>배달 날짜 *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left mt-2 bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deliveryDate ? format(deliveryDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deliveryDate}
                          onSelect={setDeliveryDate}
                          disabled={(date) => date < new Date()}
                          locale={ko}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </Card>

              {/* 결제 정보 */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">결제 정보</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">카드 번호</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">만료일</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4">최종 결제 금액</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">기본 가격</span>
                    <span>₩180,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">스타일 추가</span>
                    <span>₩20,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">커스터마이징</span>
                    <span>₩15,000</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>단골 할인 (Silver 5%)</span>
                    <span>-₩10,750</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">총 결제 금액</span>
                    <span className="text-2xl font-bold text-primary">₩204,250</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleSubmitOrder} disabled={isProcessing}>
                  {isProcessing ? "처리 중..." : "결제하기"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">결제 시 이용약관에 동의하게 됩니다</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
