"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

// 디너 데이터 (실제로는 API에서 가져옴)
const DINNERS_DATA = {
  valentine: {
    id: "valentine",
    name: "발렌타인 디너",
    description: "사랑하는 사람과 함께하는 로맨틱한 디너",
    basePrice: 89000,
    icon: "💝",
    availableStyles: ["simple", "grand", "deluxe"],
  },
  french: {
    id: "french",
    name: "프렌치 디너",
    description: "정통 프랑스 요리의 우아함",
    basePrice: 120000,
    icon: "🇫🇷",
    availableStyles: ["simple", "grand", "deluxe"],
  },
  english: {
    id: "english",
    name: "잉글리시 디너",
    description: "클래식한 영국 정통 요리",
    basePrice: 95000,
    icon: "🇬🇧",
    availableStyles: ["simple", "grand", "deluxe"],
  },
  champagne: {
    id: "champagne",
    name: "샴페인 축제 디너",
    description: "특별한 날을 위한 최고급 디너",
    basePrice: 180000,
    icon: "🍾",
    availableStyles: ["grand", "deluxe"], // Simple 불가!
  },
}

// 스타일 정의
const STYLES = {
  simple: {
    id: "simple",
    name: "심플 스타일",
    description: "기본적이면서도 완벽한 구성",
    priceModifier: 0,
    icon: "🍽️",
  },
  grand: {
    id: "grand",
    name: "그랜드 스타일",
    description: "더 풍성하고 화려한 구성",
    priceModifier: 10000,
    icon: "✨",
  },
  deluxe: {
    id: "deluxe",
    name: "디럭스 스타일",
    description: "최고급 프리미엄 구성",
    priceModifier: 20000,
    icon: "💎",
  },
}

export default function DinnerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const dinnerId = params.dinnerId

  const [dinner, setDinner] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Supabase에서 실제 인증 상태 확인
    const mockUser = {
      id: "1",
      email: "customer@example.com",
      full_name: "홍길동",
    }

    if (!mockUser) {
      router.push("/auth")
      return
    }

    setUser(mockUser)

    // 디너 데이터 로드
    const dinnerData = DINNERS_DATA[dinnerId]
    if (dinnerData) {
      setDinner(dinnerData)
      setTotalPrice(dinnerData.basePrice)
    }

    setLoading(false)
  }, [dinnerId, router])

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId)
    const style = STYLES[styleId]
    setTotalPrice(dinner.basePrice + style.priceModifier)
  }

  const handleNext = () => {
    if (!selectedStyle) {
      alert("서빙 스타일을 선택해주세요")
      return
    }
    // 선택 정보를 저장하고 커스터마이징 페이지로 이동
    router.push(`/order/customize?dinner=${dinnerId}&style=${selectedStyle}`)
  }

  if (loading) {
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

  if (!dinner) {
    return (
      <>
        <Header user={user} role="customer" />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">디너를 찾을 수 없습니다</p>
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
          {/* 뒤로가기 */}
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            디너 목록으로
          </Button>

          {/* 디너 정보 */}
          <Card className="p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{dinner.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{dinner.name}</h1>
                <p className="text-muted-foreground mb-4">{dinner.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">기본 가격</span>
                  <span className="text-2xl font-bold text-primary">₩{dinner.basePrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 스타일 선택 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">서빙 스타일 선택</h2>
            <p className="text-muted-foreground mb-6">
              원하시는 서빙 스타일을 선택해주세요
              {dinnerId === "champagne" && (
                <span className="text-primary font-medium ml-2">
                  ⭐ 샴페인 축제 디너는 그랜드/디럭스 스타일만 가능합니다
                </span>
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(STYLES).map(([styleId, style]) => {
                const isAvailable = dinner.availableStyles.includes(styleId)
                const isSelected = selectedStyle === styleId

                return (
                  <Card
                    key={styleId}
                    className={`p-6 cursor-pointer transition-all ${
                      !isAvailable
                        ? "opacity-40 cursor-not-allowed"
                        : isSelected
                          ? "border-2 border-primary shadow-lg"
                          : "hover:shadow-md"
                    }`}
                    onClick={() => isAvailable && handleStyleSelect(styleId)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{style.icon}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{style.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{style.description}</p>
                    <div className="flex items-baseline gap-2">
                      {style.priceModifier === 0 ? (
                        <span className="text-lg font-bold text-green-600">무료</span>
                      ) : (
                        <>
                          <span className="text-lg font-bold text-primary">
                            +₩{style.priceModifier.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">추가</span>
                        </>
                      )}
                    </div>
                    {!isAvailable && (
                      <Badge variant="secondary" className="mt-2">
                        선택 불가
                      </Badge>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 현재 가격 & 다음 버튼 */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">현재 총 가격</p>
                <p className="text-3xl font-bold text-primary">₩{totalPrice.toLocaleString()}</p>
              </div>
              <Button size="lg" onClick={handleNext} disabled={!selectedStyle}>
                다음: 메뉴 커스터마이징
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
