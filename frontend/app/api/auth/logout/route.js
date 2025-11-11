import { NextResponse } from 'next/server'

export async function POST() {
  // 클라이언트 사이드에서 처리하므로 여기서는 성공 응답만 반환
  return NextResponse.json({ success: true })
}

