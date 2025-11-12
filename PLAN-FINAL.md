# SoftDinner - 최종 개발 계획서 (PLAN.md)

## 📋 프로젝트 개요

**프로젝트명**: SoftDinner - 프리미엄 디너 배달 서비스  
**기술 스택**: 
- **Frontend**: Next.js, JavaScript (Zustand, TailwindCSS)
- **Backend**: Spring Boot (Java 17), REST API
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
**아키텍처**: Monorepo 구조 (Frontend + Backend + Database 명확 분리)  
**배포 플랫폼**: 
- **Frontend**: Vercel
- **Backend**: Heroku, AWS, 또는 Docker (별도 배포)
- **Database**: Supabase
**개발 기간**: Phase 1 → Phase 2  

---

## 🚀 TASK BUNDLE 시스템

### **PHASE 0: 프로젝트 초기화 & 설정**

---

## 📌 TASK BUNDLE 0 - 깃허브, 도커, 환경변수 초기 설정

**AI 작업량**: ⭐⭐⭐ (중간 수준)  
**예상 시간**: 1.5~2시간  
**폴더 위치**: 루트 디렉토리

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 0                                  │
│  GitHub, Docker, 환경변수 초기화               │
└─────────────────────────────────────────────────┘

[x] Task 0.1: 프로젝트 폴더 구조 생성
    ├─ mkdir softdinner
    ├─ cd softdinner
    ├─ mkdir frontend backend database docs
    └─ git init

[x] Task 0.2: GitHub 저장소 연동
    ├─ GitHub에서 softdinner 원격 저장소 생성 (수동 작업 필요)
    ├─ git remote add origin <repo-url> (수동 작업 필요)
    ├─ .gitignore 생성 및 설정 ✅
    │  ├─ node_modules/
    │  ├─ .env.local
    │  ├─ .env.production.local
    │  ├─ .DS_Store
    │  └─ dist/ build/ .next/
    ├─ 초기 커밋: "chore: initial project setup" (수동 작업 필요)
    └─ git push -u origin main (수동 작업 필요)

[x] Task 0.3: Git 브랜치 전략 및 자동화
    ├─ 브랜치 네이밍 규칙 정의 ✅ (README.md에 문서화)
    │  ├─ feature/* : 새 기능
    │  ├─ bugfix/* : 버그 수정
    │  └─ hotfix/* : 긴급 수정
    ├─ 커밋 메시지 표준화 정의 ✅ (README.md에 문서화)
    │  ├─ feat: 새 기능
    │  ├─ fix: 버그 수정
    │  ├─ refactor: 코드 개선
    │  └─ docs: 문서
    └─ PR 템플릿 작성 ✅ (.github/pull_request_template.md)

[x] Task 0.4: Docker 환경 설정
    ├─ Dockerfile.frontend 작성 ✅ (frontend/Dockerfile)
    │  ├─ Node.js 18+ 기본 이미지
    │  ├─ 포트 3000 (Next.js)
    │  └─ npm install & npm run dev
    ├─ Dockerfile.backend 작성 ✅ (backend/Dockerfile)
    │  ├─ Maven + Java 17 기본 이미지
    │  └─ Spring Boot 애플리케이션
    ├─ docker-compose.yml 작성 ✅
    │  ├─ frontend 서비스 (포트 3000)
    │  ├─ backend 서비스 (포트 8080, Spring Boot)
    │  └─ 볼륨 매운트 (개발 편의)
    └─ .dockerignore 작성 ✅

[x] Task 0.5: 환경변수 관리
    ├─ frontend/.env.example 작성 ✅
    │  ├─ NEXT_PUBLIC_SUPABASE_URL=
    │  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY=
    │  └─ NEXT_PUBLIC_API_URL= (Spring Boot API URL)
    ├─ .env.local 생성 (로컬 개발용, .gitignore 적용) - 수동 작업 필요
    ├─ backend/.env.example 작성 ✅
    │  ├─ SUPABASE_URL=
    │  ├─ SUPABASE_SERVICE_ROLE_KEY=
    │  ├─ CORS_ALLOWED_ORIGINS=
    │  └─ JWT_SECRET=
    └─ 문서화: 환경변수 설정 가이드 작성 ✅ (docs/ENV_SETUP.md)

[x] Task 0.6: CI/CD 및 배포 준비 (Vercel 배포는 마지막에)
    ├─ GitHub Actions 워크플로우 생성 ✅ (.github/workflows/)
    │  ├─ build.yml : 커밋 푸시 시 자동 테스트 ✅
    │  └─ docker-build.yml : Docker 이미지 자동 빌드 ✅
    └─ Vercel 배포는 Task Bundle 15에서 처리
```

---

### **PHASE 1: GUI 주문 + 직원 관리 시스템**

---

## 📌 TASK BUNDLE 1 - 프로젝트 기본 구조 & 의존성

**AI 작업량**: ⭐⭐ (매우 가벼움)  
**예상 시간**: 1~1.5시간  
**폴더 위치**: `frontend/`, `backend/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 1                                  │
│  프로젝트 구조 및 필수 패키지 설치            │
└─────────────────────────────────────────────────┘

[x] Task 1.1: Frontend 프로젝트 초기화
    ├─ cd frontend
    ├─ npx create-next-app@latest . (JavaScript 사용)
    ├─ npm install zustand (상태 관리)
    ├─ npm install @supabase/supabase-js (DB 클라이언트)
    └─ package.json 생성 및 필수 스크립트 추가

[x] Task 1.2: Frontend 기본 패키지 설치
    ├─ npm install tailwindcss postcss autoprefixer
    ├─ npx tailwindcss init -p
    ├─ npm install react-datepicker (날짜 선택기)
    ├─ npm install next-router-events (라우팅)
    └─ npm install classnames (조건부 클래스)

[x] Task 1.3: Frontend TailwindCSS 설정
    ├─ tailwind.config.js 설정
    ├─ postcss.config.js 설정
    ├─ globals.css 작성 (기본 스타일)
    └─ next.config.mjs 확인

[x] Task 1.4: Backend 기본 구조 설정 (Spring Boot)
    ├─ backend/ 폴더에서 Spring Boot 프로젝트 초기화 ✅
    ├─ pom.xml 생성 (Maven 의존성 관리) ✅
    │  ├─ Spring Boot Starter Web
    │  ├─ Spring Boot Starter Security
    │  ├─ Spring Boot Starter Validation
    │  ├─ JWT 라이브러리 (jjwt)
    │  ├─ WebClient (Supabase API 호출용)
    │  └─ Lombok
    ├─ application.yml 설정 ✅
    │  ├─ 서버 포트: 8080
    │  ├─ Supabase 설정
    │  └─ CORS 설정
    ├─ 기본 패키지 구조 생성 ✅
    │  ├─ com.softdinner.controller
    │  ├─ com.softdinner.service
    │  ├─ com.softdinner.repository
    │  ├─ com.softdinner.model
    │  └─ com.softdinner.config
    └─ 개발 환경 설정 (수동 작업 필요)
       ├─ JDK 17 설치 (docs/SETUP_GUIDE.md 참고)
       ├─ Maven 설치 (docs/SETUP_GUIDE.md 참고)
       └─ 설치 확인: java -version, mvn -version

[ ] Task 1.5: Git 커밋 (첫 번째 브랜치)
    ├─ git checkout -b feature/task-bundle-1
    ├─ git add .
    ├─ git commit -m "feat: TASK BUNDLE 1 프로젝트 기본 구조 및 패키지 설치"
    └─ git push origin feature/task-bundle-1
```

---

## 📌 TASK BUNDLE 2 - 데이터베이스 설계 & 구축

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: `database/migrations/`, `database/seeds/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 2                                  │
│  Supabase 데이터베이스 설계 & 구축           │
└─────────────────────────────────────────────────┘

[ ] Task 2.1: Supabase 프로젝트 생성
    ├─ Supabase.com 회원가입 및 로그인
    ├─ 새 프로젝트 생성 (softdinner)
    ├─ Supabase URL 및 API Key 복사
    └─ .env.local에 저장

[x] Task 2.2: 11개 테이블 생성 (SQL 파일 준비 완료)
    ├─ 001_create_users.sql ⭐
    │  ├─ id, email, full_name, phone, address
    │  ├─ role ('customer' | 'staff')
    │  ├─ loyalty_tier, total_orders, total_spent
    │  └─ 인덱스: email, role, loyalty_tier
    │
    ├─ 002_create_dinners.sql
    │  ├─ id, name (Valentine, French, English, Champagne Feast)
    │  ├─ base_price, description, available_styles
    │  └─ 인덱스: name
    │
    ├─ 003_create_styles.sql
    │  ├─ id, name (simple, grand, deluxe)
    │  ├─ price_modifier, details
    │  └─ Champagne Feast는 Grand/Deluxe만 가능 (제약 처리)
    │
    ├─ 004_create_menu_items.sql ⭐
    │  ├─ id, dinner_id (FK), name
    │  ├─ default_quantity, unit ('병', '개', '잔' 등)
    │  ├─ base_price, additional_price (고정 가격)
    │  ├─ is_required (필수 여부), can_remove, can_increase, can_decrease
    │  ├─ max_quantity, min_quantity
    │  ├─ ingredient_id (FK), ingredient_quantity_per_unit
    │  └─ 인덱스: dinner_id
    │
    ├─ 005_create_ingredients.sql ⭐
    │  ├─ id, name (고기, 채소, 와인, 샴페인, 커피, 바게트빵, 계란)
    │  ├─ quantity (현재 재고), unit, category
    │  └─ 인덱스: name, category
    │
    ├─ 006_create_ingredient_logs.sql ⭐
    │  ├─ id, ingredient_id (FK), action ('in' | 'out')
    │  ├─ quantity, previous_quantity, new_quantity
    │  ├─ staff_id (FK), order_id (FK, nullable), notes
    │  └─ 인덱스: ingredient_id, created_at
    │
    ├─ 007_create_orders.sql ⭐
    │  ├─ id, user_id (FK), order_date, delivery_date ⭐
    │  ├─ delivery_address, order_items (JSONB)
    │  ├─ total_price, discount_applied, final_price
    │  ├─ payment_status, delivery_status, cooking_status
    │  ├─ assigned_staff_id (FK), delivery_staff_id (FK)
    │  └─ 인덱스: user_id, delivery_date
    │
    ├─ 008_create_order_items.sql ⭐
    │  ├─ id, order_id (FK), dinner_id (FK), style_id (FK)
    │  ├─ customizations (JSONB) ⭐ 커스터마이징 내용
    │  ├─ quantity, unit_price, subtotal
    │  └─ 인덱스: order_id
    │
    ├─ 009_create_cooking_tasks.sql ⭐
    │  ├─ id, order_id (FK), staff_id (FK)
    │  ├─ status (waiting, in_progress, completed)
    │  ├─ started_at, completed_at
    │  └─ 인덱스: order_id, status, staff_id
    │
    ├─ 010_create_delivery_tasks.sql ⭐
    │  ├─ id, order_id (FK), staff_id (FK)
    │  ├─ status (pending, in_transit, completed)
    │  ├─ started_at, completed_at
    │  ├─ customer_address, notes
    │  └─ 인덱스: order_id, status
    │
    ├─ 011_create_voice_orders.sql ⭐
    │  ├─ id, order_id (FK)
    │  ├─ voice_transcript, recognized_items (JSONB)
    │  ├─ confidence_score
    │  └─ 인덱스: order_id, created_at
    │
    ├─ 012_create_loyalty_tiers.sql ⭐
    │  ├─ id, name (bronze, silver, gold, platinum)
    │  ├─ min_orders (0, 5, 15, 30)
    │  ├─ min_spent (0, 100000, 300000, 700000)
    │  ├─ discount_rate (0, 5, 10, 20)
    │  └─ benefits (JSONB)
    │
    └─ 013_create_loyalty_history.sql ⭐
       ├─ id, user_id (FK)
       ├─ action_type ('tier_upgrade', 'tier_downgrade', 'discount_applied')
       ├─ previous_tier, new_tier, discount_amount
       ├─ order_id (FK), notes
       └─ 인덱스: user_id, created_at

[x] Task 2.3: Row Level Security (RLS) 정책 설정 (SQL 파일 준비 완료)
    ├─ 고객은 자신의 주문만 조회/수정 가능 ✅
    ├─ staff는 할당된 작업만 조회/수정 가능 ✅
    ├─ 관리자는 모든 데이터 접근 가능 ✅
    └─ 재고 테이블은 staff만 접근 가능 ✅

[x] Task 2.4: 초기 데이터 입력 (Seeds) (SQL 파일 준비 완료)
    ├─ dinners_seed.sql (Valentine, French, English, Champagne Feast) ✅
    ├─ styles_seed.sql (simple, grand, deluxe) ✅
    ├─ menu_items_seed.sql (각 디너별 메뉴 항목) ✅
    ├─ ingredients_seed.sql (7가지 재료: 고기, 채소, 와인, 샴페인, 커피, 바게트빵, 계란) ✅
    └─ loyalty_tiers_seed.sql (4단계 등급) ✅

[ ] Task 2.5: Git 커밋 (DB 설계)
    ├─ git checkout -b feature/task-bundle-2
    ├─ database/migrations/ 모든 파일 커밋
    ├─ git commit -m "feat: TASK BUNDLE 2 데이터베이스 테이블 및 시드 생성"
    └─ git push origin feature/task-bundle-2
```

---

## 📌 TASK BUNDLE 3 - 인증 시스템 (회원가입/로그인/역할 구분)

**AI 작업량**: ⭐⭐⭐⭐⭐ (높음)  
**예상 시간**: 3~3.5시간  
**폴더 위치**: `frontend/app/auth/`, `backend/src/main/java/com/softdinner/controller/auth/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 3                                  │
│  Supabase Auth + 단일 로그인 + 역할 자동 구분│
└─────────────────────────────────────────────────┘

[x] Task 3.1: Supabase Auth 초기 설정
    ├─ frontend/lib/supabase.client.js 작성 ✅
    │  └─ createClient() 설정
    ├─ backend/src/main/java/com/softdinner/config/SupabaseConfig.java 작성 ✅
    │  └─ WebClient 설정 (Supabase API 호출용)
    └─ Supabase Auth 활성화 (이메일/비밀번호 인증) - 수동 작업 필요

[x] Task 3.2: 회원가입 페이지 (고객/staff 역할 선택) ⭐
    ├─ frontend/app/auth/page.jsx (페이지 - 로그인/회원가입 통합) ✅
    ├─ frontend/components/auth/SignupForm.jsx (컴포넌트) ✅
    │  ├─ 이메일, 비밀번호, 이름, 전화, 주소 입력
    │  ├─ 역할 선택 드롭다운 ⭐
    │  │  ├─ customer (고객)
    │  │  └─ staff (스태프)
    │  └─ 유효성 검증
    ├─ backend/src/main/java/com/softdinner/controller/auth/AuthController.java
    │  ├─ @PostMapping("/api/auth/signup")
    │  ├─ AuthService.signup() 호출
    │  └─ ResponseEntity 반환
    ├─ backend/src/main/java/com/softdinner/service/AuthService.java
    │  ├─ Supabase Auth 회원가입 처리
    │  ├─ users 테이블에 역할 저장 ⭐
    │  └─ 회원가입 성공 정보 반환
    └─ frontend/lib/validators.js (이메일, 비밀번호 검증) - 선택사항

[x] Task 3.3: 로그인 페이지 (단일 페이지, 자동 역할 구분) ⭐⭐⭐
    ├─ frontend/app/auth/page.jsx (페이지 - 로그인/회원가입 통합) ✅
    ├─ frontend/components/auth/LoginForm.jsx (컴포넌트) ✅
    │  ├─ 이메일, 비밀번호 입력 필드
    │  ├─ 고객/staff 선택 옵션 없음 (자동 구분) ⭐
    │  └─ "로그인" 버튼
    ├─ backend/src/main/java/com/softdinner/controller/auth/AuthController.java
    │  ├─ @PostMapping("/api/auth/login")
    │  ├─ AuthService.login() 호출
    │  └─ ResponseEntity 반환
    ├─ backend/src/main/java/com/softdinner/service/AuthService.java
    │  ├─ Supabase Auth 로그인 처리
    │  ├─ users 테이블에서 역할(role) 조회 ⭐
    │  └─ 응답: { user, role: 'customer' | 'staff' }
    └─ 로그인 후 역할에 따라 자동 라우팅 ⭐ ✅
       ├─ 'staff' → /staff
       └─ 'customer' → /dashboard

[x] Task 3.4: 인증 상태 관리 (AuthContext)
    ├─ frontend/context/AuthContext.jsx ✅
    │  ├─ Supabase.auth.onAuthStateChange() 리스닝
    │  ├─ user 상태 및 role 상태 관리 ⭐
    │  ├─ localStorage JWT 토큰 자동 유지
    │  └─ /api/auth/me API로 추가 정보 조회 (Spring Boot API로 변경 필요)
    ├─ frontend/hooks/useAuth.js (AuthContext에 통합됨) ✅
    │  └─ const { user, role, loading } = useAuth()
    ├─ frontend/app/layout.jsx ✅
    │  ├─ AuthProvider로 감싸기
    │  └─ 로그인 후 역할별 자동 라우팅 ⭐
    └─ frontend/components/auth/ProtectedRoute.jsx ✅
       ├─ requiredRole 파라미터 지원 ⭐
       └─ 접근 권한 없으면 /auth로 이동

[x] Task 3.5: 백엔드 인증 미들웨어 (Spring Security)
    ├─ backend/src/main/java/com/softdinner/config/SecurityConfig.java ✅
    │  ├─ JWT 필터 설정 ✅
    │  ├─ CORS 설정 ✅
    │  └─ 보안 규칙 설정 ✅
    ├─ backend/src/main/java/com/softdinner/security/JwtAuthenticationFilter.java ✅
    │  ├─ Authorization 헤더에서 JWT 토큰 추출 ✅
    │  ├─ Supabase 토큰 검증 ✅
    │  └─ SecurityContext에 사용자 정보 추가 ✅
    └─ @PreAuthorize 어노테이션으로 보호된 API 제어 ✅

[x] Task 3.6: 현재 사용자 정보 API
    ├─ backend/src/main/java/com/softdinner/controller/auth/AuthController.java ✅
    │  ├─ @GetMapping("/api/auth/me") ✅
    │  ├─ @PreAuthorize("isAuthenticated()") ✅
    │  └─ AuthService.getCurrentUser() 호출 ✅
    ├─ backend/src/main/java/com/softdinner/service/AuthService.java ✅
    │  ├─ 현재 사용자 정보 조회 ✅
    │  ├─ role, loyalty_tier 등 포함 ✅
    │  └─ UserDTO 반환 ✅
    ├─ frontend/context/AuthContext.jsx 수정 ✅
    │  └─ /api/auth/me 호출을 Spring Boot API로 변경 (NEXT_PUBLIC_API_URL 사용) ✅
    └─ frontend/app/api/auth/me/route.js 삭제 (Spring Boot API로 대체됨) ✅

[ ] Task 3.7: Zustand 상태 관리 (선택사항 강화)
    ├─ npm install zustand (이미 설치됨)
    ├─ frontend/src/store/orderStore.js
    │  ├─ selectedDinner, selectedStyle, customizations 상태
    │  ├─ deliveryAddress, deliveryDate 상태
    │  └─ totalPrice 상태
    └─ Redux DevTools 통합 (디버깅용)

[x] Task 3.8: 로그아웃 기능
    ├─ backend/src/main/java/com/softdinner/controller/auth/AuthController.java ✅
    │  ├─ @PostMapping("/api/auth/logout") ✅
    │  └─ 로그아웃 처리 (클라이언트에서 토큰 삭제) ✅
    ├─ frontend/context/AuthContext.jsx 수정 ✅
    │  └─ 로그아웃 시 Spring Boot API 호출 (선택사항, 클라이언트에서 처리 가능) ✅
    └─ frontend/app/api/auth/logout/route.js 삭제 (Spring Boot API로 대체됨) ✅

[ ] Task 3.9: Git 커밋 (인증 시스템)
    ├─ git checkout -b feature/task-bundle-3
    ├─ 회원가입, 로그인, 역할 구분 모든 파일
    ├─ git commit -m "feat: TASK BUNDLE 3 인증 시스템 및 역할 자동 구분"
    └─ git push origin feature/task-bundle-3
```

---

## 📌 TASK BUNDLE 4 - 고객 메뉴 & 디너 선택 UI

**AI 작업량**: ⭐⭐⭐ (중간 수준)  
**예상 시간**: 2~2.5시간  
**폴더 위치**: `frontend/app/dinners/`, `backend/src/main/java/com/softdinner/controller/menu/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 4                                  │
│  메뉴 조회 & 디너 선택 페이지                 │
└─────────────────────────────────────────────────┘

[x] Task 4.1: 메뉴 조회 API
    ├─ backend/src/main/java/com/softdinner/controller/menu/MenuController.java ✅
    │  ├─ @GetMapping("/api/menus") ✅
    │  │  └─ 모든 디너 목록 조회 ✅
    │  ├─ @GetMapping("/api/menus/{dinnerId}") ✅
    │  │  └─ 특정 디너 상세 정보 ✅
    │  └─ @GetMapping("/api/menus/{dinnerId}/items") ✅
    │     └─ 디너별 메뉴 항목 조회 ✅
    ├─ backend/src/main/java/com/softdinner/service/MenuService.java ✅
    │  ├─ findAllDinners(): 모든 디너 조회 ✅
    │  ├─ findDinnerById(): 디너 상세 조회 ✅
    │  └─ findMenuItemsByDinnerId(): 메뉴 항목 조회 ✅
    ├─ backend/src/main/java/com/softdinner/repository/MenuRepository.java ✅
    │  └─ Supabase API 호출 (WebClient 사용) ✅
    └─ frontend/lib/services/menu.service.js ✅
       └─ API 호출 서비스 함수 ✅

[x] Task 4.2: 디너 목록 페이지
    ├─ frontend/app/dinners/page.jsx (페이지)
    ├─ 디너 카드 UI
    │  ├─ 디너 이미지, 이름, 기본 가격 표시
    │  ├─ 설명 표시
    │  └─ 클릭 시 상세 페이지로 이동
    └─ 반응형 그리드 레이아웃

[x] Task 4.3: 디너 상세 페이지 + 스타일 선택
    ├─ frontend/app/dinners/[dinnerId]/page.jsx (페이지)
    ├─ 디너 상세 정보 표시
    │  ├─ 기본 가격, 설명
    │  └─ 포함된 메뉴 항목 표시
    ├─ 스타일 선택 UI ⭐
    │  ├─ 3가지 스타일 버튼
    │  ├─ Simple (무료), Grand (+10,000원), Deluxe (+20,000원)
    │  ├─ Champagne Feast는 Grand, Deluxe만 표시 ⭐
    │  └─ 선택 시 가격 실시간 계산
    └─ "다음: 커스터마이징" 버튼 → Task Bundle 5로 이동

[x] Task 4.4: 메뉴 페이지 스타일
    ├─ frontend/src/styles/menu.module.css
    ├─ TailwindCSS로 스타일링
    └─ 모바일, 태블릿, 데스크톱 반응형

[ ] Task 4.5: Git 커밋 (메뉴)
    ├─ git checkout -b feature/task-bundle-4
    ├─ git commit -m "feat: TASK BUNDLE 4 메뉴 조회 및 디너 선택"
    └─ git push origin feature/task-bundle-4
```

---

## 📌 TASK BUNDLE 5 - 고객 음식 커스터마이징 ⭐⭐⭐

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: `frontend/src/components/order/`, `frontend/src/utils/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 5                                  │
│  음식 커스터마이징 (추가/삭제/수량 변경) ⭐│
└─────────────────────────────────────────────────┘

[x] Task 5.1: 커스터마이징 페이지 레이아웃
    ├─ frontend/app/order/customize/page.jsx (페이지)
    ├─ Customizer 컴포넌트 (페이지 내 통합)
    ├─ OrderSummary 컴포넌트 (실시간 가격, 페이지 내 통합)
    └─ 모바일: 상하 배치

[x] Task 5.2: Customizer 컴포넌트 (핵심!) ⭐⭐⭐
    ├─ 페이지 내 통합 구현
    ├─ 1️⃣ 선택된 음식 목록
    │  ├─ 각 음식별 +/- 버튼 (수량 조절) ⭐
    │  ├─ 수량 표시
    │  ├─ X 버튼으로 수량 0 만들기 ⭐
    │  ├─ 모든 항목 자유롭게 추가/삭제 ⭐
    │  └─ 각 항목의 개별 가격 표시 ⭐
    ├─ 2️⃣ 추가 가능한 음식 목록
    │  ├─ 추가되지 않은 항목만 표시
    │  ├─ + 추가 버튼
    │  └─ 추가 시 가격 표시
    └─ 3️⃣ 선택 요약 (텍스트 목록)

[x] Task 5.3: 커스터마이징 상태 관리 (Zustand) ⭐
    ├─ frontend/store/orderStore.js 생성 ✅
    ├─ addCustomization(item): 음식 추가 ⭐ ✅
    ├─ removeCustomization(itemId): 음식 삭제 ⭐ ✅
    ├─ updateCustomization(itemId, updates): 수량 변경 ⭐ ✅
    └─ customizationAdditions: 누적 추가 가격 ✅

[x] Task 5.4: 실시간 가격 계산 (매우 중요!) ⭐⭐
    ├─ 페이지 내 구현
    ├─ calculateOrderPrice 함수
    │  ├─ 기본 가격
    │  ├─ 스타일 추가 가격 (고정)
    │  ├─ 커스터마이징 각 항목의 고정 가격 합계 ⭐
    │  │  └─ 서빙 스타일과 상관없이 고정 가격 적용 ⭐
    │  ├─ 소계
    │  ├─ 단골 할인 계산
    │  └─ 최종 가격
    └─ useEffect 내에서 커스터마이징 변경 시 자동 계산

[x] Task 5.5: OrderSummary 컴포넌트 (실시간 업데이트) ⭐
    ├─ 페이지 내 통합 구현
    ├─ 선택 정보 표시 (디너, 스타일, 배달날짜)
    ├─ 가격 상세 (실시간 갱신)
    │  ├─ 기본 가격
    │  ├─ 스타일 추가
    │  ├─ 각 커스터마이징 항목 (고정 가격 표시) ⭐
    │  ├─ 소계
    │  ├─ 단골 할인
    │  └─ 최종 가격 (굵은 글씨)
    └─ 선택된 음식 목록 표시

[x] Task 5.6: 제약 조건 적용 ⭐
    ├─ menu_items 테이블의 제약 조건 반영 ✅
    ├─ 필수 항목 (is_required): 삭제 불가 ⭐ ✅
    ├─ 선택 항목 (is_optional): 삭제 가능 ✅
    ├─ 수량 범위 (min_quantity ~ max_quantity): 버튼 활성/비활성 ✅
    └─ 예: 샴페인 1~3병, 바게트빵 1~6개 등 ✅

[ ] Task 5.7: 커스터마이징 예시 (데모 시나리오)
    ├─ 샴페인 축제 디너 선택
    ├─ 기본: 샴페인 1병 (+15,000원), 바게트빵 4개 (포함), 커피 1잔 (포함)
    ├─ 커스터마이징:
    │  1. 샴페인 1병 → 2병 (+15,000원 추가)
    │  2. 커피 삭제 (포함이므로 가격 변화 없음)
    │  3. 바게트빵 4개 → 6개 (포함이므로 가격 변화 없음)
    └─ 최종: 추가 가격 +30,000원

[ ] Task 5.8: Git 커밋 (커스터마이징)
    ├─ git checkout -b feature/task-bundle-5
    ├─ git commit -m "feat: TASK BUNDLE 5 음식 커스터마이징 (추가/삭제/수량변경)"
    └─ git push origin feature/task-bundle-5
```

---

## 📌 TASK BUNDLE 6 - 고객 주문 생성 & 결제

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: `frontend/app/order/`, `backend/src/main/java/com/softdinner/controller/order/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 6                                  │
│  주문 생성 & 결제 & 단골 할인 자동 적용     │
└─────────────────────────────────────────────────┘

[x] Task 6.1: 주문 폼 개발
    ├─ frontend/app/order/checkout/page.jsx (페이지)
    ├─ 배달 주소 입력 필드
    ├─ 배달 날짜/시간 선택 (datepicker) ⭐
    │  ├─ 예: 12월 2일, 12월 3일
    │  └─ 유효성 검증 (과거 날짜 제외)
    └─ 폼 유효성 검증

[x] Task 6.2: 결제 폼 개발 (간단한 버전)
    ├─ 페이지 내 통합 구현
    ├─ 신용카드 정보 입력 (간단 구현 가능)
    │  ├─ 카드 번호, 만료일, CVC
    │  └─ 유효성 검증
    ├─ 결제 방식 선택 (추가 결제 게이트웨이 통합 옵션)
    └─ "결제하기" 버튼

[x] Task 6.3: 주문 생성 API ⭐⭐
    ├─ backend/src/main/java/com/softdinner/controller/order/OrderController.java ✅
    │  ├─ @PostMapping("/api/orders") ✅
    │  ├─ @PreAuthorize("isAuthenticated()") ✅
    │  └─ OrderService.createOrder() 호출 ✅
    ├─ backend/src/main/java/com/softdinner/service/OrderService.java ✅
    │  ├─ 1️⃣ 사용자의 현재 loyalty_tier 조회 ✅
    │  ├─ 2️⃣ 할인율 계산 (tier별) ✅
    │  │  ├─ bronze: 0%, silver: 5%, gold: 10%, platinum: 20% ✅
    │  │  └─ 기본 가격에서 할인액 자동 계산 ⭐ ✅
    │  ├─ 3️⃣ orders 테이블에 저장 ✅
    │  │  ├─ order_items (JSONB): 디너, 스타일, 커스터마이징 ✅
    │  │  ├─ total_price, discount_applied, final_price ✅
    │  │  └─ delivery_date 저장 ⭐ ✅
    │  ├─ 4️⃣ total_orders, total_spent 업데이트 ⭐ ✅
    │  ├─ 5️⃣ loyalty_tier 자동 업그레이드 확인 ⭐⭐ ✅
    │  │  ├─ LoyaltyService.updateLoyaltyTier() 호출 ✅
    │  │  ├─ 새 등급 결정 ✅
    │  │  └─ 등급 변경 시 loyalty_history 기록 (TODO)
    │  ├─ 6️⃣ loyalty_history에 할인 기록 저장 ⭐ (TODO)
    │  ├─ 7️⃣ cooking_task 자동 생성 (요리 대기 상태) (TODO)
    │  └─ OrderResponseDTO 반환 ✅
    └─ 응답: { order, discount, loyaltyUpdate, message } ✅

[x] Task 6.4: 단골 할인 자동 적용 로직 ⭐⭐⭐
    ├─ backend/src/main/java/com/softdinner/service/LoyaltyService.java ✅
    │  ├─ determineLoyaltyTier(totalOrders, totalSpent) ✅
    │  │  ├─ 주문 횟수와 지출액으로 등급 결정 ✅
    │  │  └─ 가장 높은 기준을 만족하는 등급 반환 ✅
    │  ├─ updateLoyaltyTier(userId, newOrders, newSpent) ✅
    │  │  ├─ 현재 등급과 새 등급 비교 ✅
    │  │  ├─ 변경 시 loyalty_history 기록 (TODO)
    │  │  └─ LoyaltyUpdateResult 반환 ✅
    │  └─ getDiscountRateByTier(tier) ✅
    │     └─ tier별 할인율 반환 ✅
    └─ 주문 완료 후 자동 등급 업그레이드! ⭐ ✅

[ ] Task 6.5: 단골 등급 자동 업그레이드 예시
    ├─ 사용자가 5번째 주문 완료 (총 100,000원 이상 지출)
    │  └─ bronze → silver (5% 할인 시작)
    ├─ 사용자가 15번째 주문 완료 (총 300,000원 이상 지출)
    │  └─ silver → gold (10% 할인으로 업)
    ├─ 사용자가 30번째 주문 완료 (총 700,000원 이상 지출)
    │  └─ gold → platinum VIP (20% 할인!)
    └─ 모든 업그레이드 시 고객에게 축하 메시지 전송

[x] Task 6.6: 주문 완료 페이지
    ├─ frontend/app/order/success/page.jsx
    ├─ 주문 번호, 주문 내용, 최종 가격 표시
    ├─ 할인 정보 표시 (tier, 할인율, 할인액)
    ├─ 다음 등급까지의 진행률 표시
    └─ "주문 히스토리로" 버튼

[ ] Task 6.7: Git 커밋 (주문 생성 & 할인)
    ├─ git checkout -b feature/task-bundle-6
    ├─ git commit -m "feat: TASK BUNDLE 6 주문 생성 및 단골 할인 자동 적용"
    └─ git push origin feature/task-bundle-6
```

---

## 📌 TASK BUNDLE 7 - 고객 주문 히스토리

**AI 작업량**: ⭐⭐⭐ (중간 수준)  
**예상 시간**: 1.5~2시간  
**폴더 위치**: `frontend/app/dashboard/`, `backend/src/main/java/com/softdinner/controller/order/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 7                                  │
│  주문 히스토리 조회 & 상세 보기 ⭐            │
└─────────────────────────────────────────────────┘

[x] Task 7.1: 주문 히스토리 조회 API
    ├─ backend/src/main/java/com/softdinner/controller/order/OrderController.java ✅
    │  ├─ @GetMapping("/api/orders") ✅
    │  ├─ @PreAuthorize("isAuthenticated()") ✅
    │  └─ OrderService.getUserOrders() 호출 ✅
    ├─ backend/src/main/java/com/softdinner/service/OrderService.java ✅
    │  ├─ 현재 사용자의 주문 목록 조회 ✅
    │  ├─ 최근순 정렬 (order_date DESC) ✅
    │  └─ 각 주문: 주문시간, 디너명, 가격, 배달시간, 주소 ⭐ ✅
    └─ frontend/lib/services/order.service.js ✅

[x] Task 7.2: 주문 히스토리 페이지 UI ⭐
    ├─ frontend/app/dashboard/page.jsx (페이지)
    ├─ 주문 목록 표시 (최근순)
    │  ├─ 각 주문 항목: 주문시간, 디너명, 가격, 배달시간, 주소 ⭐
    │  ├─ 상태 배지 (대기중, 배송중, 완료)
    │  ├─ 재주문 버튼 추가 ⭐
    │  └─ 디너 메뉴 선택 버튼 추가 ⭐
    └─ 클릭 시 상세 모달 표시

[x] Task 7.3: 주문 상세 페이지
    ├─ 주문 상세 모달 (컴포넌트 준비됨)
    ├─ 주문 상세 정보
    │  ├─ 주문 번호, 주문시간, 배달예정시간, 배달주소
    │  ├─ 디너명, 서빙 스타일
    │  ├─ 커스터마이징 내용 표시 (추가/삭제/수량)
    │  ├─ 원가, 할인율, 할인액, 최종가격
    │  └─ 현재 배송 상태
    └─ "다시 주문하기" 버튼

[x] Task 7.4: 단골 정보 카드 (대시보드에 표시) ⭐
    ├─ frontend/components/common/loyalty-card.jsx
    ├─ 현재 등급 표시 (🥉 bronze, 🥈 silver, 🥇 gold, 💎 platinum)
    ├─ 총 주문 횟수, 총 지출액
    ├─ 현재 할인율
    ├─ 다음 등급까지 남은 주문 횟수
    │  └─ 진행률 바(%)
    └─ 최근 할인 기록 5개

[x] Task 7.5: 백엔드 API 추가
    ├─ backend/src/main/java/com/softdinner/controller/user/UserController.java ✅
    │  ├─ @GetMapping("/api/users/loyalty") ✅
    │  ├─ @PreAuthorize("isAuthenticated()") ✅
    │  └─ LoyaltyService.getLoyaltyInfo() 호출 ✅
    ├─ backend/src/main/java/com/softdinner/service/LoyaltyService.java ✅
    │  ├─ 현재 사용자의 단골 정보 조회 ✅
    │  ├─ tier, totalOrders, totalSpent, discountRate ✅
    │  ├─ nextTier 정보, 진행률 ✅
    │  └─ 최근 할인 기록 5개 ✅
    └─ LoyaltyInfoDTO 반환 ✅

[ ] Task 7.6: Git 커밋 (주문 히스토리)
    ├─ git checkout -b feature/task-bundle-7
    ├─ git commit -m "feat: TASK BUNDLE 7 주문 히스토리 조회 및 단골 정보 표시"
    └─ git push origin feature/task-bundle-7
```

---

## 📌 TASK BUNDLE 8 - 직원 대시보드 초기 설정

**AI 작업량**: ⭐⭐ (가벼움)  
**예상 시간**: 1~1.5시간  
**폴더 위치**: `frontend/src/pages/staff/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 8                                  │
│  직원 대시보드 레이아웃 & 네비 (staff) ⭐   │
└─────────────────────────────────────────────────┘

[x] Task 8.1: 직원 대시보드 메인 페이지
    ├─ frontend/app/staff/page.jsx (페이지)
    ├─ 환영 메시지 ("○○○ staff님, 환영합니다")
    └─ 주요 메뉴 버튼

[x] Task 8.2: 직원 네비게이션 메뉴
    ├─ frontend/components/common/header.jsx 업데이트
    ├─ staff 계정일 때만 표시되는 메뉴
    ├─ 재료 관리 (Ingredients) → /staff/ingredients
    ├─ 요리 관리 (Cooking) → /staff/cooking
    ├─ 배달 관리 (Delivery) → /staff/delivery
    └─ 로그아웃

[x] Task 8.3: 직원용 ProtectedRoute 업데이트
    ├─ frontend/components/auth/ProtectedRoute.jsx ✅
    ├─ <ProtectedRoute requiredRole="staff"> 지원 ⭐ ✅
    └─ staff가 아니면 /auth/unauthorized로 이동 ✅

[ ] Task 8.4: 직원 컨텍스트 (선택사항)
    ├─ frontend/src/context/StaffContext.jsx
    └─ 직원 관련 전역 상태 관리

[ ] Task 8.5: Git 커밋 (staff 대시보드)
    ├─ git checkout -b feature/task-bundle-8
    ├─ git commit -m "feat: TASK BUNDLE 8 직원 대시보드 초기 설정"
    └─ git push origin feature/task-bundle-8
```

---

## 📌 TASK BUNDLE 9 - 직원 재료 입고 관리 ⭐

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: `frontend/app/staff/ingredients/`, `backend/src/main/java/com/softdinner/controller/ingredient/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 9                                  │
│  재료 입고 & 재고 관리 (staff 전용) ⭐       │
└─────────────────────────────────────────────────┘

[x] Task 9.1: 재료 입고 페이지
    ├─ frontend/app/staff/ingredients/page.jsx (페이지)
    ├─ 재료 선택 드롭다운 ⭐
    │  ├─ 고기 🥩
    │  ├─ 채소 🥬
    │  ├─ 와인 🍷
    │  ├─ 샴페인 🍾
    │  ├─ 커피 ☕
    │  ├─ 바게트빵 🥖
    │  └─ 계란 🥚
    ├─ 입고 수량 입력 필드
    └─ "입고 처리" 버튼

[x] Task 9.2: 재고 목록 표시
    ├─ 페이지 내 통합 구현
    ├─ 현재 재고량 표시
    ├─ 단위 표시 (병, 개, 잔 등)
    └─ 실시간 업데이트

[x] Task 9.3: 재료 API (스토어에서 제약 조건 정보 조회는 불필요)
    ├─ backend/src/main/java/com/softdinner/controller/ingredient/IngredientController.java ✅
    │  ├─ @GetMapping("/api/ingredients") ✅
    │  │  └─ 모든 재료 목록 (현재 재고) ✅
    │  ├─ @PostMapping("/api/ingredients/stock") ✅
    │  │  ├─ @PreAuthorize("isAuthenticated()") + 역할 확인 ✅
    │  │  └─ 입고 처리 ✅
    │  └─ @GetMapping("/api/ingredients/logs") ✅
    │     └─ 입출고 기록 조회 ✅
    ├─ backend/src/main/java/com/softdinner/service/IngredientService.java ✅
    │  ├─ getAllIngredients(): 모든 재료 조회 ✅
    │  ├─ addStock(): 입고 처리 ✅
    │  │  ├─ ingredients 테이블 업데이트 (quantity) ✅
    │  │  └─ ingredient_logs 기록 저장 ✅
    │  └─ getIngredientLogs(): 입출고 기록 조회 ✅
    ├─ backend/src/main/java/com/softdinner/repository/IngredientRepository.java ✅
    ├─ backend/src/main/java/com/softdinner/dto/IngredientDTO.java ✅
    ├─ backend/src/main/java/com/softdinner/dto/AddStockRequestDTO.java ✅
    ├─ backend/src/main/java/com/softdinner/dto/IngredientLogDTO.java ✅
    ├─ frontend/lib/services/ingredient.service.js ✅
    ├─ frontend/hooks/useIngredients.js ✅
    └─ frontend/app/staff/ingredients/page.jsx API 연동 완료 ✅

[x] Task 9.4: 입출고 기록 저장
    ├─ ingredient_logs 테이블 기록 ✅
    ├─ 이전 수량, 입고 수량, 새 수량 저장 ✅
    ├─ staff ID, 타임스탬프 기록 ✅
    └─ 투명한 이력 관리 ✅

[ ] Task 9.5: Git 커밋 (재료 관리)
    ├─ git checkout -b feature/task-bundle-9
    ├─ git commit -m "feat: TASK BUNDLE 9 재료 입고 및 재고 관리"
    └─ git push origin feature/task-bundle-9
```

---

## 📌 TASK BUNDLE 10 - 직원 요리 진행도 관리 & 재료 자동 차감 ⭐⭐⭐

**AI 작업량**: ⭐⭐⭐⭐⭐ (높음 - 핵심)  
**예상 시간**: 3~3.5시간  
**폴더 위치**: `frontend/app/staff/cooking/`, `backend/src/main/java/com/softdinner/controller/cooking/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 10                                 │
│  요리 진행도 & 재료 자동 차감 (핵심!) ⭐⭐│
└─────────────────────────────────────────────────┘

[x] Task 10.1: 요리 작업 목록 페이지
    ├─ frontend/app/staff/cooking/page.jsx (페이지)
    ├─ 대기 중인 주문 목록 (cooking_tasks)
    ├─ 각 주문: 디너명, 고객명, 배달날짜 표시
    ├─ 상태별 필터 (대기중, 진행중, 완료)
    └─ 클릭 시 상세 작업 카드로 이동

[x] Task 10.2: 요리 작업 카드 개발
    ├─ 페이지 내 통합 구현
    ├─ 주문 상세 정보 표시
    │  ├─ 디너명, 스타일
    │  ├─ 커스터마이징 내용 표시 (중요!) ⭐
    │  └─ 배달날짜, 고객주소
    ├─ "요리 시작" → "요리 중" → "완료" 상태 전환
    └─ 상태별 버튼 활성/비활성

[ ] Task 10.3: 요리 상태 업데이트 API
    ├─ backend/src/main/java/com/softdinner/controller/cooking/CookingTaskController.java
    │  ├─ @GetMapping("/api/cooking-tasks")
    │  │  ├─ @PreAuthorize("hasRole('STAFF')")
    │  │  └─ 해당 staff의 요리 작업 목록
    │  ├─ @PostMapping("/api/cooking-tasks/{id}/start")
    │  │  └─ 상태: waiting → in_progress
    │  └─ @PostMapping("/api/cooking-tasks/{id}/complete") ⭐⭐
    │     ├─ 상태: in_progress → completed
    │     ├─ 타임스탬프 기록 (completed_at)
    │     └─ 다음: 재료 자동 차감 호출!
    ├─ backend/src/main/java/com/softdinner/service/CookingTaskService.java
    │  ├─ getCookingTasksByStaff(): 작업 목록 조회
    │  ├─ startCooking(): 요리 시작
    │  └─ completeCooking(): 요리 완료 (재료 차감 포함)
    ├─ frontend/lib/services/cooking.service.js
    └─ frontend/hooks/useCookingTasks.js

[ ] Task 10.4: 요리 완료 시 재료 자동 차감 (매우 중요!) ⭐⭐⭐
    ├─ backend/src/main/java/com/softdinner/service/IngredientDeductionService.java
    │  ├─ deductIngredientsForOrder(orderId) 메서드
    │  ├─ 1️⃣ order_items에서 주문 정보 조회
    │  ├─ 2️⃣ 디너의 기본 재료 및 수량 조회
    │  ├─ 3️⃣ 커스터마이징 아이템별 재료 수량 추가 계산 ⭐
    │  │  └─ 예: 샴페인 2병이면 샴페인 재료 2개 차감
    │  ├─ 4️⃣ ingredients 테이블에서 각 재료 수량 감소
    │  ├─ 5️⃣ ingredient_logs에 출고 기록 저장
    │  │  ├─ action: 'out'
    │  │  ├─ order_id 참고
    │  │  └─ 차감된 수량 기록
    │  └─ 6️⃣ DeductionResult 반환
    └─ CookingTaskService.completeCooking()에서 호출

[ ] Task 10.5: 재료 차감 예시 (데모)
    ├─ 샴페인 축제 디너 주문 (커스터마이징 포함)
    ├─ 기본 재료: 샴페인 1병, 스테이크 1개, 바게트빵 4개 등
    ├─ 커스터마이징:
    │  ├─ 샴페인: 1병 → 2병 (추가 1병)
    │  ├─ 바게트빵: 4개 → 6개 (기본값만 차감)
    │  └─ 커피: 삭제 (포함 항목, 차감 안 함)
    ├─ 요리 완료 시 차감되는 재료:
    │  ├─ 샴페인: 2병 차감 (기본 1 + 추가 1) ⭐
    │  ├─ 스테이크: 1개 차감
    │  ├─ 바게트빵: 6개 차감
    │  ├─ 포트와인: 1개 차감
    │  └─ 커피: 0개 차감 (삭제됨)
    └─ 재고 정확하게 반영됨!

[x] Task 10.6: 요리 관리 페이지 스타일
    ├─ 페이지 내 TailwindCSS 스타일링
    ├─ 상태별 색상 코딩
    │  ├─ 대기중: 파란색 (🔵)
    │  ├─ 진행중: 주황색 (🟠)
    │  └─ 완료: 초록색 (🟢)
    └─ 반응형 디자인

[ ] Task 10.7: Git 커밋 (요리 관리)
    ├─ git checkout -b feature/task-bundle-10
    ├─ git commit -m "feat: TASK BUNDLE 10 요리 진행도 관리 및 재료 자동 차감"
    └─ git push origin feature/task-bundle-10
```

---

## 📌 TASK BUNDLE 11 - 직원 배달 관리 ⭐

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: `frontend/app/staff/delivery/`, `backend/src/main/java/com/softdinner/controller/delivery/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 11                                 │
│  배달 작업 관리 ⭐                             │
└─────────────────────────────────────────────────┘

[x] Task 11.1: 배달 작업 목록 페이지
    ├─ frontend/app/staff/delivery/page.jsx (페이지)
    ├─ 배달 대기 중인 주문 목록
    ├─ 각 주문: 고객명, 배달주소, 배달날짜 표시
    ├─ 상태별 필터
    └─ 클릭 시 상세 작업 카드로 이동

[x] Task 11.2: 배달 작업 카드 개발
    ├─ 페이지 내 통합 구현
    ├─ 주문 상세 정보
    │  ├─ 고객명, 배달주소 (지도 표시 선택사항)
    │  ├─ 배달날짜, 배달시간
    │  └─ 주문 내용 요약
    ├─ "배달 시작" → "배달 중" → "완료" 상태 전환
    └─ 상태별 버튼 활성/비활성

[ ] Task 11.3: 배달 상태 업데이트 API
    ├─ backend/src/main/java/com/softdinner/controller/delivery/DeliveryTaskController.java
    │  ├─ @GetMapping("/api/delivery-tasks")
    │  │  ├─ @PreAuthorize("hasRole('STAFF')")
    │  │  └─ 해당 staff의 배달 작업 목록
    │  ├─ @PostMapping("/api/delivery-tasks/{id}/start")
    │  │  └─ 상태: pending → in_transit
    │  └─ @PostMapping("/api/delivery-tasks/{id}/complete") ⭐
    │     ├─ 상태: in_transit → completed
    │     ├─ orders 테이블 delivery_status 업데이트
    │     └─ 배송 완료 시간 기록
    ├─ backend/src/main/java/com/softdinner/service/DeliveryTaskService.java
    │  ├─ getDeliveryTasksByStaff(): 작업 목록 조회
    │  ├─ startDelivery(): 배달 시작
    │  └─ completeDelivery(): 배달 완료
    ├─ frontend/lib/services/delivery.service.js
    └─ frontend/hooks/useDeliveryTasks.js

[ ] Task 11.4: 배달 페이지 스타일
    ├─ frontend/src/styles/delivery.module.css
    └─ 반응형 디자인

[ ] Task 11.5: Git 커밋 (배달 관리)
    ├─ git checkout -b feature/task-bundle-11
    ├─ git commit -m "feat: TASK BUNDLE 11 배달 작업 관리"
    └─ git push origin feature/task-bundle-11
```

---

## 📌 TASK BUNDLE 12 - 고객 음성 주문 ⭐⭐⭐

**AI 작업량**: ⭐⭐⭐⭐⭐ (높음 - 복잡)  
**예상 시간**: 3.5~4시간  
**폴더 위치**: `frontend/app/order/voice/`, `frontend/components/voice/`, `backend/src/main/java/com/softdinner/controller/voice/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 12                                 │
│  고객 음성 주문 (Phase 1 고도화) ⭐⭐        │
└─────────────────────────────────────────────────┘

[ ] Task 12.1: 음성 입력 컴포넌트
    ├─ frontend/src/components/voice/VoiceInput.jsx
    ├─ 마이크 버튼 (녹음 시작/중지)
    ├─ 음성 녹음 기능 (Web Audio API)
    ├─ 녹음 상태 표시 (빨간 점 애니메이션 등)
    └─ frontend/src/hooks/useVoice.js

[ ] Task 12.2: 음성 인식 엔진 통합
    ├─ frontend/src/components/voice/VoiceRecognition.jsx
    ├─ Web Speech API 통합 (구글 음성 인식 사용 가능)
    │  ├─ 또는 react-speech-recognition 라이브러리
    │  └─ npm install react-speech-recognition
    ├─ 음성 → 텍스트 변환
    └─ 인식된 텍스트 실시간 표시 (자막)

[ ] Task 12.3: 음성 명령어 파싱 (핵심!) ⭐⭐
    ├─ frontend/src/utils/voiceCommandParser.js
    ├─ 의도 추출 (디너 선택, 스타일 선택, 커스터마이징, 날짜)
    ├─ 엔티티 추출
    │  ├─ 디너 이름 매칭 (Valentine, French, English, Champagne Feast)
    │  ├─ 스타일 매칭 (simple, grand, deluxe)
    │  ├─ 커스터마이징 항목 추출
    │  │  └─ 예: "샴페인을 2병으로" → {item: "샴페인", quantity: 2}
    │  └─ 날짜 파싱 (예: "내일", "모레", "12월 2일" → Date)
    ├─ 신뢰도 점수 계산
    └─ 결과: { intent, entities, confidence_score }

[ ] Task 12.4: 음성 주문 대화 페이지 UI
    ├─ frontend/src/pages/order/voice.js (페이지) ⭐
    ├─ frontend/src/components/voice/VoiceOrderSummary.jsx
    ├─ 현재까지 수집된 주문 내용 실시간 표시 ⭐
    │  ├─ 선택된 디너
    │  ├─ 선택된 스타일
    │  ├─ 커스터마이징 항목
    │  └─ 배달 날짜
    ├─ 시스템 프롬프트 표시
    │  └─ "안녕하세요, ○○○ 고객님, 어떤 디너를 주문하시겠습니까?"
    └─ "확인", "취소", "수정" 버튼

[ ] Task 12.5: 음성 주문 대화 흐름 (데모 시나리오) ⭐⭐⭐
    ├─ Step 1: 인사
    │  └─ 시스템: "안녕하세요, ○○○ 고객님, 어떤 디너를 주문하시겠습니까?"
    │
    ├─ Step 2: 디너 선택
    │  ├─ 고객: "맛있는 디너 추천해주세요"
    │  ├─ 시스템: "무슨 기념일인가요?"
    │  ├─ 고객: "어머님 생신이에요" 또는 "특별한 날이에요"
    │  └─ 시스템: "프렌치 디너 또는 샴페인 축제 디너는 어떨까요?"
    │
    ├─ Step 3: 디너 확정
    │  ├─ 고객: "샴페인 축제 디너 좋겠어요"
    │  ├─ 시스템: "샴페인 축제 디너 맞습니다. 그리고 서빙 스타일은?"
    │  └─ 고객: "디럭스 스타일 좋아요"
    │
    ├─ Step 4: 커스터마이징 ⭐
    │  ├─ 시스템: "기본 구성: 샴페인 1병, 바게트빵 4개, 커피 1잔..."
    │  ├─ 고객: "바게트빵을 6개로, 샴페인 2병으로, 커피는 빼줘"
    │  ├─ 시스템: "네, 샴페인 2병, 바게트빵 6개, 커피 제거했습니다"
    │  └─ 고객: "맞습니다"
    │
    ├─ Step 5: 배달날짜 선택
    │  ├─ 시스템: "배달 날짜는 언제로 할까요?"
    │  ├─ 고객: "12월 2일" 또는 "내일"
    │  └─ 시스템: "12월 2일에 배송하겠습니다"
    │
    ├─ Step 6: 배달주소 확인
    │  ├─ 시스템: "배달 주소는 ○○○○로 맞습니까?"
    │  └─ 고객: "네" 또는 "아니요, ××××로 바꿔"
    │
    └─ Step 7: 최종 확인 & 주문
       ├─ 시스템: "샴페인 축제 디너, 디럭스 스타일, 샴페인 2병, 바게트빵 6개로 주문하시겠습니까?"
       ├─ 고객: "네"
       └─ 주문 완료 (Bundle 6의 주문 생성 로직 호출)

[ ] Task 12.6: 음성 주문 API
    ├─ backend/src/main/java/com/softdinner/controller/voice/VoiceOrderController.java
    │  ├─ @PostMapping("/api/voice/process")
    │  ├─ @PreAuthorize("isAuthenticated()")
    │  └─ VoiceOrderService.processVoiceCommand() 호출
    ├─ backend/src/main/java/com/softdinner/service/VoiceOrderService.java
    │  ├─ 음성 텍스트 수신
    │  ├─ VoiceCommandParser로 파싱
    │  ├─ 주문 데이터 누적
    │  ├─ 다음 프롬프트 결정 (state machine)
    │  └─ VoiceOrderResponseDTO 반환
    ├─ backend/src/main/java/com/softdinner/util/VoiceCommandParser.java
    │  └─ 음성 명령어 파싱 로직
    ├─ frontend/lib/services/voice.service.js
    └─ 음성 주문 히스토리 저장 (voice_orders 테이블)

[ ] Task 12.7: State Machine (음성 주문 상태 관리)
    ├─ frontend/src/store/voiceOrderStore.js (Zustand)
    ├─ currentStep (greeting, dinner_select, style_select, customization, delivery_date, address_confirm, final_confirm)
    ├─ recognizedOrder (진행 중인 주문 정보)
    ├─ conversation (대화 이력)
    └─ updateStep(), addToOrder(), resetOrder()

[ ] Task 12.8: Git 커밋 (음성 주문)
    ├─ git checkout -b feature/task-bundle-12
    ├─ git commit -m "feat: TASK BUNDLE 12 고객 음성 주문 시스템"
    └─ git push origin feature/task-bundle-12
```

---

## 📌 TASK BUNDLE 13 - UI/UX & 공통 컴포넌트

**AI 작업량**: ⭐⭐⭐ (중간 수준)  
**예상 시간**: 2~2.5시간  
**폴더 위치**: `frontend/src/components/common/`, `frontend/src/styles/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 13                                 │
│  공통 UI 컴포넌트 & 스타일링                  │
└─────────────────────────────────────────────────┘

[x] Task 13.1: 공통 컴포넌트 개발
    ├─ frontend/components/common/header.jsx (헤더)
    │  ├─ 회사명 "Mr. 대박 디너서비스" ⭐
    │  ├─ 역할별 네비게이션 다르게 표시
    │  └─ 로그인 버튼만 표시 (로그인 전) ⭐
    ├─ frontend/components/common/footer.jsx (푸터)
    │  ├─ 회사명, 저작권
    │  └─ 연락처
    ├─ frontend/components/common/loading.jsx (로딩)
    │  └─ 스피너 애니메이션
    ├─ frontend/components/common/modal.jsx (모달)
    ├─ frontend/components/common/toast.jsx (토스트)
    │  ├─ 성공, 에러, 경고 메시지
    │  └─ 자동 제거 (3초)
    └─ frontend/components/common/loyalty-card.jsx (단골 카드)
       └─ 등급, 진행률, 할인 정보 표시

[x] Task 13.2: 전역 스타일 설정
    ├─ frontend/app/globals.css
    │  ├─ 기본 폰트 설정
    │  ├─ 기본 색상 팔레트
    │  └─ reset.css
    ├─ frontend/styles/globals.css
    └─ TailwindCSS v4 설정 (이미 설정됨)

[ ] Task 13.3: 에러 처리 & 로깅
    ├─ frontend/src/lib/errorHandler.js
    │  ├─ 에러 타입별 처리
    │  └─ 사용자 친화적 메시지
    ├─ frontend/src/lib/logger.js
    │  └─ 콘솔 로깅 (development만)
    └─ 페이지별 에러 화면
       ├─ 404 Not Found
       └─ 500 Server Error

[ ] Task 13.4: Git 커밋 (UI/UX)
    ├─ git checkout -b feature/task-bundle-13
    ├─ git commit -m "feat: TASK BUNDLE 13 공통 UI 컴포넌트 및 스타일링"
    └─ git push origin feature/task-bundle-13
```

---

## 📌 TASK BUNDLE 14 - 반응형 디자인 & 최적화

**AI 작업량**: ⭐⭐⭐ (중간 수준)  
**예상 시간**: 2~2.5시간  
**폴더 위치**: `frontend/src/styles/`

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 14                                 │
│  반응형 디자인 & 성능 최적화                  │
└─────────────────────────────────────────────────┘

[ ] Task 14.1: 반응형 디자인 적용
    ├─ 모바일 (320px~480px)
    │  ├─ 싱글 컬럼 레이아웃
    │  ├─ 터치 친화적 버튼 크기 (최소 44px)
    │  └─ 세로 방향 최적화
    ├─ 태블릿 (481px~768px)
    │  ├─ 2열 그리드
    │  └─ 양쪽 패딩
    ├─ 데스크톱 (769px+)
    │  ├─ 3열 그리드
    │  └─ 최대 너비 제한
    └─ 모든 페이지 반응형 테스트 (Chrome DevTools)

[ ] Task 14.2: 성능 최적화
    ├─ 이미지 최적화
    │  ├─ next/image 사용
    │  ├─ WebP 포맷 지원
    │  └─ lazy loading
    ├─ 번들 크기 최소화
    │  ├─ Code splitting
    │  ├─ dynamic imports
    │  └─ tree shaking
    ├─ 캐싱 전략
    │  ├─ SWR 또는 TanStack Query
    │  └─ localStorage 활용
    └─ 렌더링 최적화
       ├─ useMemo, useCallback
       └─ React.memo

[ ] Task 14.3: 접근성 개선
    ├─ ARIA 라벨 추가
    │  └─ aria-label, aria-describedby 등
    ├─ 키보드 네비게이션
    │  └─ Tab, Enter, Escape 지원
    ├─ 색상 대비 확인
    │  └─ WCAG AA 기준 충족
    └─ 스크린 리더 지원

[ ] Task 14.4: 크로스 브라우저 테스트
    ├─ Chrome/Edge (Chromium 기반)
    ├─ Firefox
    ├─ Safari
    └─ 모바일 브라우저 (Chrome Mobile, Safari iOS)

[ ] Task 14.5: Git 커밋 (최적화)
    ├─ git checkout -b feature/task-bundle-14
    ├─ git commit -m "feat: TASK BUNDLE 14 반응형 디자인 및 성능 최적화"
    └─ git push origin feature/task-bundle-14
```

---

## 📌 TASK BUNDLE 15 - 통합 테스트 & Vercel 배포

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간  
**폴더 위치**: 전체 프로젝트

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 15                                 │
│  전체 통합 테스트 & Vercel 배포               │
└─────────────────────────────────────────────────┘

[ ] Task 15.1: E2E 통합 테스트 (수동)
    ├─ 고객 전체 플로우 테스트
    │  ├─ 회원가입 → 로그인
    │  ├─ 메뉴 조회 → 디너 선택
    │  ├─ 커스터마이징 → 주문 생성
    │  ├─ 주문 히스토리 확인
    │  └─ 단골 할인 적용 확인
    ├─ staff 전체 플로우 테스트
    │  ├─ staff 회원가입 → 로그인
    │  ├─ 재료 입고 → 재고 확인
    │  ├─ 요리 완료 → 재료 차감 확인
    │  └─ 배달 관리
    ├─ 음성 주문 테스트
    │  ├─ 음성 인식 정확도 확인
    │  ├─ 주문 정확성 확인
    │  └─ 최종 주문 생성 확인
    └─ 데이터 일관성 확인

[ ] Task 15.2: 엣지 케이스 처리
    ├─ 네트워크 오류
    │  ├─ 재시도 로직
    │  └─ 오프라인 상태 처리
    ├─ 동시성 문제
    │  ├─ 중복 주문 방지
    │  └─ 재고 동시 수정 처리
    ├─ 입력값 검증
    │  ├─ 빈 값, 특수 문자
    │  └─ 숫자 범위 확인
    └─ 타임아웃 처리

[ ] Task 15.3: 보안 점검
    ├─ CORS 설정 확인
    │  └─ allowed origins 제한
    ├─ HTTPS/SSL 준비
    │  └─ 모든 트래픽 암호화
    ├─ 민감 정보 보호
    │  ├─ 신용카드 정보 (PCI DSS)
    │  ├─ 주소 정보 암호화
    │  └─ JWT 토큰 보안
    ├─ 권한 검증
    │  ├─ API 레벨에서 역할 확인
    │  └─ customer/staff 구분 강제
    ├─ SQL Injection 방지
    │  └─ Supabase 기본 방어 (매개변수화된 쿼리)
    └─ XSS 방지
       └─ React 기본 방어 (innerHTML 피함)

[ ] Task 15.4: Vercel 배포 준비 ⭐
    ├─ Vercel 프로젝트 생성
    │  ├─ vercel.com 로그인
    │  ├─ GitHub 저장소 선택
    │  └─ 프로젝트 추가
    ├─ 환경변수 설정 ⭐
    │  ├─ Frontend (Vercel):
    │  │  ├─ NEXT_PUBLIC_SUPABASE_URL
    │  │  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY
    │  │  └─ NEXT_PUBLIC_API_URL (Spring Boot API URL)
    │  └─ Backend (별도 배포):
    │     ├─ SUPABASE_URL
    │     ├─ SUPABASE_SERVICE_ROLE_KEY
    │     ├─ CORS_ALLOWED_ORIGINS
    │     └─ JWT_SECRET
    ├─ Build 설정 확인
    │  ├─ Build command: npm run build
    │  ├─ Output directory: .next
    │  └─ Install command: npm install
    ├─ 도메인 연결 (선택사항)
    │  └─ custom domain 또는 vercel.app 사용
    └─ 자동 배포 설정
       └─ main 브랜치 push 시 자동 배포

[ ] Task 15.5: 배포 후 검증
    ├─ 배포된 사이트 접속 확인
    ├─ API 정상 동작 확인
    ├─ Supabase 연결 확인
    ├─ 주요 기능 테스트
    │  ├─ 회원가입/로그인
    │  ├─ 주문 생성
    │  └─ 스태프 기능
    ├─ 성능 모니터링 (Vercel Analytics)
    ├─ 에러 로깅 (Sentry 또는 유사)
    └─ DNS, SSL 인증서 확인

[ ] Task 15.6: 배포 문서 작성
    ├─ docs/DEPLOYMENT.md
    │  ├─ 배포 절차
    │  ├─ 환경변수 설정
    │  ├─ 자동 배포 설정
    │  └─ 롤백 절차
    └─ README.md 최종 업데이트

[ ] Task 15.7: Git 커밋 (테스트 & 배포)
    ├─ git checkout -b feature/task-bundle-15
    ├─ git commit -m "feat: TASK BUNDLE 15 통합 테스트 및 Vercel 배포"
    ├─ git push origin feature/task-bundle-15
    └─ GitHub에서 PR 생성 후 main으로 merge

[ ] Task 15.8: 최종 Vercel 배포
    ├─ GitHub main 브랜치 merge
    ├─ Vercel 자동 배포 확인
    ├─ 배포된 URL 확인
    └─ 🎉 SoftDinner 라이브 배포 완료!
```

---

### **PHASE 2: 음성인식 고도화 (선택사항)**

---

## 📌 TASK BUNDLE 16 - Text-to-Speech & 음성 안내

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2.5~3시간

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 16                                 │
│  TTS (음성 안내) & 음성 고도화              │
└─────────────────────────────────────────────────┘

[ ] Task 16.1: Text-to-Speech 라이브러리
    ├─ npm install react-text-to-speech (또는 Web Speech API)
    ├─ frontend/src/components/voice/TextToSpeech.jsx
    └─ 브라우저 TTS 또는 Google Cloud TTS 통합

[ ] Task 16.2: 시스템 음성 질문 구현
    ├─ "안녕하세요, ○○○ 고객님"
    ├─ "무슨 기념일인가요?"
    ├─ "서빙 스타일은 어떻게 할까요?"
    ├─ "추가로 필요한 것 있으세요?"
    └─ 기타 안내 메시지

[ ] Task 16.3: 다국어 지원 (선택사항)
    ├─ 한국어 TTS (기본)
    └─ 영어 TTS (옵션)

[ ] Task 16.4: Git 커밋
    ├─ git checkout -b feature/task-bundle-16
    ├─ git commit -m "feat: TASK BUNDLE 16 Text-to-Speech 및 음성 안내"
    └─ git push origin feature/task-bundle-16
```

---

## 📌 TASK BUNDLE 17 - 음성 명령 고도화 & 최적화

**AI 작업량**: ⭐⭐⭐⭐ (중상 수준)  
**예상 시간**: 2~2.5시간

```
┌─────────────────────────────────────────────────┐
│  TASK BUNDLE 17                                 │
│  음성 명령 정확도 개선 & 최적화               │
└─────────────────────────────────────────────────┘

[ ] Task 17.1: 음성 명령 재확인 시스템
    ├─ 인식된 내용 다시 한 번 사용자 확인
    ├─ "○○○로 들었는데 맞습니까?" 패턴
    └─ 수정 옵션 제공

[ ] Task 17.2: 신뢰도 기반 처리
    ├─ confidence_score 낮으면 재시도 요청
    ├─ 임계값 설정 (예: 70% 이상만 진행)
    └─ 사용자에게 수동 입력 옵션 제공

[ ] Task 17.3: 성능 최적화
    ├─ 음성 인식 속도 개선 (timeout 조정)
    ├─ 배치 처리 최적화
    └─ 메모리 사용 최소화

[ ] Task 17.4: Phase 2 최종 배포
    ├─ GitHub main에 merge
    ├─ Vercel 자동 배포
    └─ Phase 2 완료!

[ ] Task 17.5: Git 커밋
    ├─ git checkout -b feature/task-bundle-17
    ├─ git commit -m "feat: TASK BUNDLE 17 음성 명령 고도화 및 최적화"
    └─ git push origin feature/task-bundle-17
```

---

## 📊 전체 작업량 요약

| Bundle | 이름 | 난이도 | 예상 시간 | 누적 시간 |
|--------|------|--------|----------|----------|
| 0 | GitHub, Docker, 환경변수 | ⭐⭐⭐ | 1.5-2h | 1.5-2h |
| 1 | 프로젝트 기본 구조 | ⭐⭐ | 1-1.5h | 2.5-3.5h |
| 2 | 데이터베이스 구축 | ⭐⭐⭐⭐ | 2.5-3h | 5-6.5h |
| 3 | 인증 시스템 | ⭐⭐⭐⭐⭐ | 3-3.5h | 8-10h |
| 4 | 메뉴 & 디너 선택 | ⭐⭐⭐ | 2-2.5h | 10-12.5h |
| 5 | 음식 커스터마이징 | ⭐⭐⭐⭐ | 2.5-3h | 12.5-15.5h |
| 6 | 주문 생성 & 할인 | ⭐⭐⭐⭐ | 2.5-3h | 15-18.5h |
| 7 | 주문 히스토리 | ⭐⭐⭐ | 1.5-2h | 16.5-20.5h |
| 8 | staff 대시보드 초기화 | ⭐⭐ | 1-1.5h | 17.5-22h |
| 9 | 재료 입고 관리 | ⭐⭐⭐⭐ | 2.5-3h | 20-25h |
| **10** | **요리 관리 & 재료 차감** | **⭐⭐⭐⭐⭐** | **3-3.5h** | **23-28.5h** |
| 11 | 배달 관리 | ⭐⭐⭐⭐ | 2.5-3h | 25.5-31.5h |
| **12** | **음성 주문** | **⭐⭐⭐⭐⭐** | **3.5-4h** | **29-35.5h** |
| 13 | UI/UX 공통 컴포넌트 | ⭐⭐⭐ | 2-2.5h | 31-38h |
| 14 | 반응형 & 최적화 | ⭐⭐⭐ | 2-2.5h | 33-40.5h |
| 15 | 테스트 & Vercel 배포 | ⭐⭐⭐⭐ | 2.5-3h | 35.5-43.5h |
| **Phase 1 합계** | | | | **35.5-43.5h** |
| 16 | TTS & 음성 안내 | ⭐⭐⭐⭐ | 2.5-3h | 38-46.5h |
| 17 | 음성 고도화 | ⭐⭐⭐⭐ | 2-2.5h | 40-49h |
| **Phase 2 합계** | | | | **4.5-5.5h** |

**전체 예상 시간: 40~49시간 (약 2주 집중 개발)**

---

## 📁 최종 폴더 구조 (softdinner)

```
softdinner/
│
├── 📁 FRONTEND/
│   ├── app/ (Next.js App Router)
│   │   ├── auth/ (인증 페이지 - 추후 생성)
│   │   ├── dashboard/ (고객 대시보드)
│   │   ├── dinners/ (디너 목록 및 상세)
│   │   ├── order/ (주문: 커스터마이징, 체크아웃, 완료)
│   │   ├── staff/ (직원: 대시보드, 재료, 요리, 배달)
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── auth/ (인증 컴포넌트 - 추후 생성)
│   │   ├── common/ (Header, Footer, Loading, Modal, Toast, LoyaltyCard)
│   │   └── ui/ (Radix UI 컴포넌트)
│   ├── hooks/ (useAuth, useOrder, useMenu, useStaff 등 - 추후 생성)
│   ├── services/ (API 서비스 - 추후 생성)
│   ├── store/ (Zustand 상태: orderStore, voiceOrderStore - 추후 생성)
│   ├── utils/ (priceCalculator, voiceCommandParser 등 - 추후 생성)
│   ├── context/ (AuthContext, StaffContext - 추후 생성)
│   ├── lib/ (supabase.client, logger, errorHandler - 추후 생성)
│   ├── styles/ (globals.css)
│   ├── public/ (이미지, 사운드)
│   ├── package.json
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── components.json
│   ├── Dockerfile.frontend (추후 생성)
│   └── .env.example (추후 생성)
│
├── 📁 BACKEND/ (Spring Boot)
│   ├── src/main/java/com/softdinner/
│   │   ├── controller/ (REST API 컨트롤러)
│   │   │   ├── auth/ (AuthController - 회원가입, 로그인, 현재사용자)
│   │   │   ├── user/ (UserController - 사용자 정보, 단골 정보)
│   │   │   ├── menu/ (MenuController - 메뉴, 디너, 스타일, 항목)
│   │   │   ├── order/ (OrderController - 주문 생성, 조회, 수정)
│   │   │   ├── ingredient/ (IngredientController - 재료 조회, 입고, 로그)
│   │   │   ├── cooking/ (CookingTaskController - 요리 작업 관리 & 재료 차감)
│   │   │   ├── delivery/ (DeliveryTaskController - 배달 작업 관리)
│   │   │   └── voice/ (VoiceOrderController - 음성 주문 처리)
│   │   ├── service/ (비즈니스 로직)
│   │   │   ├── AuthService.java
│   │   │   ├── OrderService.java
│   │   │   ├── LoyaltyService.java
│   │   │   ├── IngredientService.java
│   │   │   ├── IngredientDeductionService.java
│   │   │   ├── CookingTaskService.java
│   │   │   ├── DeliveryTaskService.java
│   │   │   └── VoiceOrderService.java
│   │   ├── repository/ (데이터 접근 - Supabase API 호출)
│   │   │   └── SupabaseRepository.java
│   │   ├── model/ (DTO, Entity)
│   │   │   ├── dto/ (Request/Response DTO)
│   │   │   └── entity/ (도메인 모델)
│   │   ├── config/ (설정)
│   │   │   ├── SecurityConfig.java
│   │   │   ├── WebConfig.java
│   │   │   └── SupabaseConfig.java
│   │   ├── security/ (보안)
│   │   │   └── JwtAuthenticationFilter.java
│   │   └── util/ (유틸리티)
│   │       ├── VoiceCommandParser.java
│   │       └── LoyaltyUtils.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── application-dev.yml
│   │   └── application-prod.yml
│   ├── pom.xml (Maven 의존성)
│   ├── Dockerfile
│   └── .env.example
│
├── 📁 DATABASE/
│   ├── migrations/ (001~013 테이블 생성 - 추후 생성)
│   ├── seeds/ (초기 데이터 - 추후 생성)
│   ├── schema.sql (전체 스키마 - 추후 생성)
│   └── README.md
│
├── 📁 docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEPLOYMENT.md (Vercel 배포 가이드)
│   ├── DEMO_SCENARIO.md (전체 데모 시나리오)
│   └── TROUBLESHOOTING.md
│
├── docker-compose.yml ⭐ (로컬 개발용)
├── .dockerignore
├── .github/workflows/ (CI/CD)
│   ├── build.yml
│   ├── deploy.yml (Vercel 배포)
│   └── docker-build.yml
│
├── .gitignore ⭐
├── vercel.json ⭐ (Vercel 설정)
├── README.md (프로젝트 소개)
├── PLAN.md (이 파일)
└── package.json (루트, 선택사항)
```

---

## ✅ 최종 체크리스트

### Phase 1 (GUI + staff 관리)
- [x] Bundle 0-1: 초기 설정 완료 (프로젝트 구조, Spring Boot 설정)
- [x] Bundle 2: DB 설계 완료 (SQL 파일 준비 완료, Supabase 실행 필요)
- [x] Bundle 3: 인증 & 역할 구분 완료 (프론트엔드 UI 완료, 백엔드 API 구현 필요)
- [x] Bundle 4-7: 고객 주문 플로우 완료 (프론트엔드 UI 완료, 백엔드 API 구현 필요)
- [x] Bundle 8-11: staff 관리 플로우 완료 (프론트엔드 UI 완료, 백엔드 API 구현 필요)
- [ ] Bundle 12: 음성 주문 완료
- [ ] Bundle 13-15: UI/UX 최적화 & Vercel 배포 완료

### Phase 2 (음성 고도화)
- [ ] Bundle 16-17: TTS & 음성 고도화 완료

---

## 🎯 모든 요구사항 반영 완료!

✅ **단일 로그인 + 자동 역할 구분** (Bundle 3)  
✅ **단골 등급 시스템 + 자동 할인** (Bundle 6)  
✅ **음식 추가/삭제/수량 변경** (Bundle 5)  
✅ **서빙 스타일별 가격 & 메뉴 고정 가격** (Bundle 4-6)  
✅ **직원 재료 입고 관리** (Bundle 9)  
✅ **요리 완료 시 재료 자동 차감 (커스터마이징 포함)** (Bundle 10)  
✅ **주문 히스토리 조회** (Bundle 7)  
✅ **배달 날짜 지정** (Bundle 6)  
✅ **GitHub & Docker 연동** (Bundle 0)  
✅ **기능별 브랜치 & 자동 커밋** (모든 Bundle)  
✅ **Vercel 배포** (Bundle 15)  
✅ **Supabase 환경변수 관리** (Bundle 0, 15)  
✅ **음성 주문 시스템** (Bundle 12)  
✅ **프로젝트명: softdinner, 직원명: staff** ⭐

---

**🎉 완벽한 SoftDinner 프로젝트 계획 완성!**

이제 Cursor AI에게 Bundle 0부터 차례대로 전달하고 구현하면 됩니다!
