# SoftDinner - 프리미엄 디너 배달 서비스

프리미엄 디너 배달 서비스 프로젝트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 16, React 19, TailwindCSS, Zustand
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
softdinner/
├── frontend/     # Next.js 프론트엔드
├── backend/      # Next.js API Routes 백엔드
└── database/     # Supabase 마이그레이션 및 시드
```

## 🛠️ 개발 환경 설정

### 1. 환경 변수 설정

#### Frontend
`frontend/.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**참고**: Frontend에서 Supabase를 직접 사용하므로 별도의 API URL이 필요하지 않습니다.

#### Backend
`backend/.env.local` 파일 생성:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_database_url
```

**참고**: `NODE_ENV`는 Next.js가 자동으로 설정하므로 수동으로 설정할 필요가 없습니다.

### 2. 의존성 설치

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 3. 개발 서버 실행

```bash
# Frontend (포트 3000)
cd frontend
npm run dev

# Backend (포트 3001)
cd backend
npm run dev
```

### 4. Docker로 실행 (선택사항)

```bash
docker-compose up
```

## 📝 Git 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 새 기능 개발
- `bugfix/*`: 버그 수정
- `hotfix/*`: 긴급 수정

## 📝 커밋 메시지 규칙

- `feat`: 새 기능
- `fix`: 버그 수정
- `refactor`: 코드 개선
- `docs`: 문서
- `style`: 스타일 변경
- `test`: 테스트
- `chore`: 기타 작업

## 📚 문서

자세한 개발 계획은 [PLAN-FINAL.md](./PLAN-FINAL.md)를 참고하세요.

## 📄 라이선스

Private

