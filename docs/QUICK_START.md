# 빠른 시작 가이드

SoftDinner 프로젝트를 빠르게 실행하는 방법입니다.

## 🚀 한 번에 실행하기

### 1. 환경변수 설정

#### Frontend 환경변수
`frontend/.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Backend 환경변수
`backend/.env.local` 파일 생성 (또는 시스템 환경변수):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

⚠️ **참고**: `JWT_SECRET`은 필요하지 않습니다. Supabase Auth가 JWT 토큰을 자동으로 발급하고 검증합니다.

### 2. 루트에서 실행

```bash
npm run dev
```

이 명령어는 다음을 동시에 실행합니다:
- **Frontend**: `http://localhost:3000` (Next.js)
- **Backend**: `http://localhost:8080` (Spring Boot)

### 3. 로그인 테스트

1. 브라우저에서 `http://localhost:3000/auth` 접속
2. 회원가입 또는 로그인
3. 역할에 따라 자동 라우팅:
   - `customer` → `/dashboard`
   - `staff` → `/staff`

## 📝 개별 실행 (선택사항)

### Frontend만 실행
```bash
npm run dev:frontend
```

### Backend만 실행
```bash
npm run dev:backend
```

## ⚠️ 문제 해결

### Backend가 시작되지 않는 경우
1. JDK 17이 설치되어 있는지 확인: `java -version`
2. Maven이 설치되어 있는지 확인: `mvn -version`
3. 환경변수가 올바르게 설정되었는지 확인

### Frontend가 시작되지 않는 경우
1. `frontend/node_modules`가 설치되어 있는지 확인
2. `frontend/.env.local` 파일이 존재하는지 확인

### 포트 충돌
- Frontend (3000번 포트)가 이미 사용 중이면 다른 포트로 변경
- Backend (8080번 포트)가 이미 사용 중이면 `backend/src/main/resources/application.yml`에서 포트 변경

## 🔍 확인 사항

실행 후 다음을 확인하세요:

1. **Frontend**: 브라우저에서 `http://localhost:3000` 접속 가능
2. **Backend**: `http://localhost:8080/api/auth/login` 엔드포인트 접근 가능
3. **로그**: 터미널에서 두 서버의 로그가 정상적으로 출력되는지 확인

