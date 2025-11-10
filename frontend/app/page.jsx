import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

export default function HomePage() {
  return (
    <>
      <Header user={null} role="customer" />
      <main className="flex-1">
        <section className="relative h-[600px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/elegant-fine-dining-restaurant-interior.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
              특별한 날을 위한
              <br />
              프리미엄 디너
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              발렌타인, 프렌치, 잉글리시, 샴페인 축제
              <br />
              당신의 특별한 순간을 Mr. 대박 디너서비스와 함께하세요
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/auth">로그인하고 시작하기</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-12">
              프리미엄 디너 컬렉션
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "발렌타인 디너",
                  description: "로맨틱한 발렌타인 특별 디너",
                  emoji: "💝",
                  price: "₩89,000~",
                },
                {
                  name: "프렌치 디너",
                  description: "정통 프랑스 요리의 우아함",
                  emoji: "🇫🇷",
                  price: "₩120,000~",
                },
                {
                  name: "잉글리시 디너",
                  description: "클래식한 영국 정통 요리",
                  emoji: "🇬🇧",
                  price: "₩95,000~",
                },
                {
                  name: "샴페인 축제 디너",
                  description: "프리미엄 샴페인과 함께하는 럭셔리",
                  emoji: "🍾",
                  price: "₩180,000~",
                },
              ].map((dinner) => (
                <div
                  key={dinner.name}
                  className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="text-8xl group-hover:scale-110 transition-transform">{dinner.emoji}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{dinner.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{dinner.description}</p>
                    <p className="text-lg font-bold text-primary mb-4">{dinner.price}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href="/dinners">자세히 보기</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">단골 혜택 프로그램</h2>
              <p className="text-lg text-muted-foreground mb-12">
                주문할수록 커지는 할인 혜택
                <br />
                플래티넘 등급은 최대 20% 할인
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { tier: "브론즈", discount: "0%", emoji: "🥉" },
                  { tier: "실버", discount: "5%", emoji: "🥈" },
                  { tier: "골드", discount: "10%", emoji: "🥇" },
                  { tier: "플래티넘", discount: "20%", emoji: "💎" },
                ].map((tier) => (
                  <div
                    key={tier.tier}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-3">{tier.emoji}</div>
                    <div className="text-lg font-semibold text-foreground mb-1">{tier.tier}</div>
                    <div className="text-2xl font-bold text-green-600">{tier.discount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
