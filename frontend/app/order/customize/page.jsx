"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Minus, X, Loader2 } from "lucide-react"
import useOrderStore from "@/store/orderStore"
import { menuAPI } from "@/lib/services/menu.service"
import { orderService } from "@/lib/services/order.service"

// 아이콘 매핑 (DB에 없는 필드이므로 이름으로 매핑)
const getItemIcon = (name) => {
  const iconMap = {
    "스테이크": "🥩",
    "와인": "🍷",
    "바게트빵": "🥖",
    "커피": "☕",
    "샴페인": "🍾",
    "로제 와인": "🍷",
    "비프 스테이크": "🥩",
    "랍스터": "🦞",
    "트러플 파스타": "🍝",
    "초콜릿 디저트": "🍫",
    "레드 로즈": "🌹",
    "프렌치 와인": "🍷",
    "오리 콩피": "🦆",
    "푸아그라": "🥓",
    "프렌치 어니언 수프": "🍲",
    "에스카르고": "🐌",
    "크렘 브륄레": "🍮",
    "에스프레소": "☕",
    "잉글리시 티": "🫖",
    "비프 웰링턴": "🥩",
    "피쉬 앤 칩스": "🐟",
    "셰퍼드 파이": "🥧",
    "요크셔 푸딩": "🧁",
    "스콘": "🥐",
    "트라이플": "🍰",
    "캐비어": "🥚",
    "와규 스테이크": "🥩",
    "킹크랩": "🦀",
    "트러플 리조또": "🍚",
    "굴": "🦪",
    "마카롱": "🍪",
  }
  return iconMap[name] || "🍽️"
}

// 하드코딩된 MENU_ITEMS 제거 - 모든 데이터는 API에서 가져옵니다

export default function CustomizePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dinnerId = searchParams.get("dinner")
  const styleId = searchParams.get("style")
  const reorderId = searchParams.get("reorder")

  // Zustand store 사용
  const {
    customizations,
    totalPrice,
    updateCustomization,
    removeCustomization,
    initializeCustomizations,
  } = useOrderStore()

  // 로컬 계산용 totalPrice (Zustand와 별도로 계산)
  const [localTotalPrice, setLocalTotalPrice] = useState(0)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenuItems = async () => {
      if (!dinnerId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // API에서 메뉴 항목 조회
        const menuItems = await menuAPI.getMenuItemsByDinnerId(dinnerId)
        
        // API 응답이 있고 비어있지 않으면 사용
        if (menuItems && menuItems.length > 0) {
          // DB 응답을 프론트엔드 형식으로 변환
          const formattedItems = menuItems.map((item) => ({
            id: item.id,
            name: item.name,
            unit: item.unit,
            defaultQuantity: item.defaultQuantity || 1,
            pricePerUnit: item.additionalPrice || 0,
            minQuantity: item.minQuantity || 0,
            maxQuantity: item.maxQuantity || 999,
            isRequired: item.isRequired || false,
            canRemove: item.canRemove !== false, // 기본값 true
            icon: getItemIcon(item.name),
          }))

          setItems(formattedItems)
          
          // 재주문인 경우 이전 주문의 커스터마이징 복원
          if (reorderId && formattedItems.length > 0) {
            try {
              const orders = await orderService.getUserOrders()
              const previousOrder = orders.find(o => o.id === reorderId)
              
              if (previousOrder && previousOrder.orderItems?.customizations) {
                // 이전 주문의 커스터마이징을 복원
                const previousCustomizations = previousOrder.orderItems.customizations
                
                // 먼저 기본값으로 초기화
                initializeCustomizations(formattedItems)
                
                // 이전 커스터마이징 복원
                Object.entries(previousCustomizations).forEach(([itemId, qty]) => {
                  const item = formattedItems.find(i => i.id === itemId)
                  if (item && qty > 0) {
                    // 수량이 최소/최대 범위 내인지 확인
                    const validQty = Math.max(item.minQuantity, Math.min(item.maxQuantity, qty))
                    updateCustomization(itemId, { quantity: validQty })
                  }
                })
              } else {
                // 재주문 데이터가 없으면 기본값으로 초기화
                initializeCustomizations(formattedItems)
              }
            } catch (error) {
              console.error("재주문 데이터 로드 실패:", error)
              // 실패 시 기본값으로 초기화
              initializeCustomizations(formattedItems)
            }
          } else {
            // 일반 주문인 경우 기본값으로 초기화
            if (formattedItems.length > 0) {
              initializeCustomizations(formattedItems)
            }
          }
        } else {
          // API 응답이 비어있으면 에러 표시
          console.error("API에서 메뉴 항목이 비어있습니다.")
          setItems([])
        }
      } catch (error) {
        console.error("메뉴 항목 조회 실패:", error)
        // 에러 발생 시 빈 배열로 설정
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dinnerId, reorderId])

  useEffect(() => {
    // 로컬 가격 계산 (Zustand store와 동기화)
    let total = 0
    items.forEach((item) => {
      const currentQty = customizations[item.id] || 0
      total += currentQty * item.pricePerUnit
    })
    setLocalTotalPrice(total)
  }, [customizations, items])

  const handleIncrease = (itemId) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const current = customizations[itemId] || 0
    if (current < item.maxQuantity) {
      updateCustomization(itemId, { quantity: current + 1 })
    }
  }

  const handleDecrease = (itemId) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const current = customizations[itemId] || 0
    if (current > item.minQuantity) {
      updateCustomization(itemId, { quantity: current - 1 })
    }
  }

  const handleRemove = (itemId) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    
    // 제약 조건 확인: is_required가 true이면 삭제 불가
    if (item.isRequired) {
      alert(`${item.name}은(는) 필수 항목입니다. 삭제할 수 없습니다.`)
      return
    }
    
    // can_remove가 false이면 삭제 불가
    if (item.canRemove === false) {
      alert(`${item.name}은(는) 삭제할 수 없습니다.`)
      return
    }
    
    removeCustomization(itemId)
  }

  const handleNext = () => {
    // 주문 폼으로 이동
    router.push(`/order/checkout?dinner=${dinnerId}&style=${styleId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>

        <h1 className="text-3xl font-bold mb-2">메뉴 커스터마이징</h1>
        <p className="text-muted-foreground mb-8">
          모든 메뉴를 자유롭게 추가하거나 삭제할 수 있습니다. 수량을 조절하면 가격이 자동으로 계산됩니다.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 커스터마이징 */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <Card className="p-6">
                <p className="text-muted-foreground text-center">메뉴 항목을 불러오는 중...</p>
              </Card>
            ) : (
              items.map((item) => {
              const currentQty = customizations[item.id] || 0

              return (
                <Card key={item.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* 아이템 정보 */}
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-4xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          {currentQty === 0 && (
                            <Badge variant="secondary" className="text-xs">
                              제거됨
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-primary">
                          {item.unit}당 ₩{item.pricePerUnit.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          기본 {item.defaultQuantity}
                          {item.unit} • 최대 {item.maxQuantity}
                          {item.unit}
                        </p>
                      </div>
                    </div>

                    {/* 컨트롤 */}
                    <div className="flex items-center gap-2">
                      {/* 감소 버튼 */}
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDecrease(item.id)}
                        disabled={currentQty <= item.minQuantity}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      {/* 수량 표시 */}
                      <div className="w-16 text-center">
                        <span className="text-xl font-bold">{currentQty}</span>
                        <span className="text-sm text-muted-foreground ml-1">{item.unit}</span>
                      </div>

                      {/* 증가 버튼 */}
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleIncrease(item.id)}
                        disabled={currentQty >= item.maxQuantity}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>

                      {/* 삭제 버튼 (필수 항목이 아니고 can_remove가 true일 때만 표시) */}
                      {(!item.isRequired && item.canRemove !== false) && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemove(item.id)}
                          disabled={currentQty === 0}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-30"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      {/* 필수 항목 표시 */}
                      {item.isRequired && (
                        <Badge variant="outline" className="text-xs">
                          필수
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 항목별 총 가격 표시 */}
                  {currentQty > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {currentQty}
                          {item.unit} × ₩{item.pricePerUnit.toLocaleString()}
                        </span>
                        <span className="font-bold text-primary text-lg">
                          ₩{(currentQty * item.pricePerUnit).toLocaleString()}
                        </span>
                      </div>
                      {/* 기본 수량과 다를 경우 차이 표시 */}
                      {currentQty !== item.defaultQuantity && (
                        <div className="flex justify-end mt-1">
                          <span
                            className={`text-xs font-medium ${
                              currentQty > item.defaultQuantity ? "text-primary" : "text-green-600"
                            }`}
                          >
                            {currentQty > item.defaultQuantity ? "+" : ""}
                            {currentQty - item.defaultQuantity}
                            {item.unit} ({currentQty > item.defaultQuantity ? "+" : ""}₩
                            {((currentQty - item.defaultQuantity) * item.pricePerUnit).toLocaleString()})
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              )
            }))}
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">주문 요약</h3>

              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                {items.map((item) => {
                  const currentQty = customizations[item.id] || 0
                  if (currentQty === 0) return null

                  return (
                    <div key={item.id} className="flex justify-between text-sm gap-2">
                      <span className="text-muted-foreground">
                        {item.icon} {item.name} {currentQty}
                        {item.unit}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        ₩{(currentQty * item.pricePerUnit).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">총 금액</span>
                  <span className="text-2xl font-bold text-primary">₩{localTotalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleNext}>
                다음: 배달 정보 입력
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                * 단골 등급에 따른 할인은 결제 단계에서 적용됩니다
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
