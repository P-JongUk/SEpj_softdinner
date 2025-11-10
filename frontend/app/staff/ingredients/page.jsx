"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Package } from "lucide-react"

// 7가지 재료 정의
const INGREDIENTS = [
  { id: "meat", name: "고기", icon: "🥩", unit: "kg" },
  { id: "vegetables", name: "채소", icon: "🥬", unit: "kg" },
  { id: "wine", name: "와인", icon: "🍷", unit: "병" },
  { id: "champagne", name: "샴페인", icon: "🍾", unit: "병" },
  { id: "coffee", name: "커피", icon: "☕", unit: "잔" },
  { id: "baguette", name: "바게트빵", icon: "🥖", unit: "개" },
  { id: "eggs", name: "계란", icon: "🥚", unit: "개" },
]

export default function StaffIngredientsPage() {
  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [quantity, setQuantity] = useState("")
  const [inventory, setInventory] = useState({})
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // 재고 데이터 로드
    const mockInventory = {
      meat: 50,
      vegetables: 30,
      wine: 20,
      champagne: 15,
      coffee: 100,
      baguette: 80,
      eggs: 200,
    }
    setInventory(mockInventory)
  }, [])

  const handleStockIn = () => {
    if (!selectedIngredient || !quantity) {
      alert("재료와 수량을 입력해주세요")
      return
    }

    const qty = Number.parseInt(quantity)
    if (qty <= 0) {
      alert("올바른 수량을 입력해주세요")
      return
    }

    // 재고 업데이트
    setInventory((prev) => ({
      ...prev,
      [selectedIngredient]: (prev[selectedIngredient] || 0) + qty,
    }))

    // 로그 추가
    const ingredient = INGREDIENTS.find((i) => i.id === selectedIngredient)
    const newLog = {
      id: Date.now(),
      ingredient: ingredient.name,
      icon: ingredient.icon,
      action: "in",
      quantity: qty,
      unit: ingredient.unit,
      timestamp: new Date(),
    }
    setLogs((prev) => [newLog, ...prev])

    // 폼 초기화
    setQuantity("")
    alert(`${ingredient.name} ${qty}${ingredient.unit} 입고 완료!`)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">재료 입고 관리</h1>
        <p className="text-muted-foreground mb-8">재료를 입고하고 재고를 관리하세요</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입고 폼 */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                재료 입고
              </h3>

              <div className="space-y-4">
                <div>
                  <Label>재료 선택 *</Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="재료를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {INGREDIENTS.map((ingredient) => (
                        <SelectItem key={ingredient.id} value={ingredient.id}>
                          <span className="flex items-center gap-2">
                            <span>{ingredient.icon}</span>
                            <span>{ingredient.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">입고 수량 *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="수량 입력"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-2"
                    min="1"
                  />
                </div>

                <Button className="w-full" onClick={handleStockIn} disabled={!selectedIngredient || !quantity}>
                  <Plus className="w-4 h-4 mr-2" />
                  입고 처리
                </Button>
              </div>
            </Card>

            {/* 최근 입고 기록 */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">최근 입고 기록</h3>
              <div className="space-y-3">
                {logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">입고 기록이 없습니다</p>
                ) : (
                  logs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between text-sm border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{log.icon}</span>
                        <span>{log.ingredient}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          +{log.quantity}
                          {log.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString("ko-KR")}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* 현재 재고 현황 */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                현재 재고 현황
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INGREDIENTS.map((ingredient) => {
                  const stock = inventory[ingredient.id] || 0
                  const isLow = stock < 10

                  return (
                    <Card key={ingredient.id} className={`p-4 ${isLow ? "border-red-300 bg-red-50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{ingredient.icon}</span>
                          <div>
                            <p className="font-bold">{ingredient.name}</p>
                            <p className="text-xs text-muted-foreground">{ingredient.unit}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${isLow ? "text-red-600" : "text-primary"}`}>{stock}</p>
                          <p className="text-xs text-muted-foreground">{ingredient.unit}</p>
                        </div>
                      </div>
                      {isLow && <p className="text-xs text-red-600 mt-2">⚠️ 재고 부족</p>}
                    </Card>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
