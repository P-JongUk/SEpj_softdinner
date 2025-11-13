# SoftDinner - 프리미엄 디너 배달 서비스

프리미엄 디너 배달 서비스 프로젝트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 16, React 19, TailwindCSS, Zustand
- **Backend**: Spring Boot, Java
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT (Spring Security)
- **Deployment**: Docker Compose

## 📁 프로젝트 구조

```
softdinner/
├── frontend/     # Next.js 프론트엔드
├── backend/      # Spring Boot 백엔드
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
`backend/src/main/resources/application.yml` 파일에서 환경 변수 설정:
```yaml
supabase:
  url: your_supabase_url
  service-role-key: your_supabase_service_role_key
```

### 2. 의존성 설치

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
mvn install
```

### 3. 개발 서버 실행

```bash
# Frontend (포트 3000)
cd frontend
npm run dev

# Backend (포트 8080)
cd backend
mvn spring-boot:run
```

### 4. Docker로 실행 (팀 협업 권장)

#### 환경 변수 설정
`frontend/.env.local`과 `backend/.env.local` 파일을 생성하세요. (위의 환경 변수 설정 참고)

#### Docker Compose 실행
```bash
# 프로젝트 루트에서
docker-compose up -d --build
```

#### 서비스 접속
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

#### 주요 명령어
```bash
# 서비스 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f

# 재빌드
docker-compose build --no-cache
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


## 📄 라이선스

Private

