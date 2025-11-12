"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

// 4가지 디너 정의
const DINNERS = [
  {
    id: "valentine",
    name: "발렌타인 디너",
    description: "사랑하는 사람과 함께하는 로맨틱한 디너. 와인과 스테이크로 특별한 밤을 만들어보세요.",
    basePrice: 89000,
    icon: "💝",
    image: "/valentine-dinner.jpg",
    availableStyles: ["simple", "grand", "deluxe"],
    defaultItems: ["스테이크", "와인 1병", "샐러드", "디저트"],
  },
  {
    id: "french",
    name: "프렌치 디너",
    description: "정통 프랑스 요리의 우아함. 섬세한 맛과 향으로 미식의 즐거움을 선사합니다.",
    basePrice: 120000,
    icon: "🇫🇷",
    image: "/french-dinner.jpg",
    availableStyles: ["simple", "grand", "deluxe"],
    defaultItems: ["프렌치 코스 요리", "와인 1병", "바게트빵", "치즈"],
  },
  {
    id: "english",
    name: "잉글리시 디너",
    description: "클래식한 영국 정통 요리. 품격있는 식사 경험을 제공합니다.",
    basePrice: 95000,
    icon: "🇬🇧",
    image: "/english-dinner.jpg",
    availableStyles: ["simple", "grand", "deluxe"],
    defaultItems: ["로스트 비프", "요크셔 푸딩", "채소", "와인 1병"],
  },
  {
    id: "champagne",
    name: "샴페인 축제 디너",
    description: "특별한 날을 위한 최고급 디너. 프리미엄 샴페인과 함께하는 럭셔리 경험.",
    basePrice: 180000,
    icon: "🍾",
    image: "/champagne-dinner.jpg",
    availableStyles: ["grand", "deluxe"], // Simple 불가!
    defaultItems: ["샴페인 1병", "고급 스테이크", "바게트빵 4개", "커피"],
  },
]

export default function DinnersPage() {
  const router = useRouter()
  const [selectedDinner, setSelectedDinner] = useState(null)
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
    setLoading(false)
  }, [router])

  const handleSelectDinner = (dinner) => {
    router.push(`/dinners/${dinner.id}`)
  }

  if (loading || authLoading) {
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
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">프리미엄 디너 선택</h1>
            <p className="text-lg text-muted-foreground">특별한 날을 위한 완벽한 디너를 선택하세요</p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600">{error}</p>
              <Button onClick={loadDinners} variant="outline" className="mt-2">다시 시도</Button>
            </div>
          )}

          {/* 디너 그리드 */}
          {dinners.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">디너가 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dinners.map((dinner) => (
                <Card
                  key={dinner.id}
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => handleSelectDinner(dinner)}
                >
                  {/* 이미지 */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl">{dinner.icon}</span>
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{dinner.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{dinner.description}</p>

                    {/* 기본 가격 */}
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">기본 가격</span>
                      <p className="text-2xl font-bold text-primary">₩{dinner.basePrice.toLocaleString()}</p>
                    </div>

                    {/* 버튼 */}
                    <Button className="w-full group-hover:bg-primary/90">선택하기</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              💡 디너 선택 후 서빙 스타일과 메뉴를 커스터마이징할 수 있습니다
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
