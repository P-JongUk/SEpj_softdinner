# 다음 단계 가이드

현재 프로젝트 상태와 다음에 해야 할 작업을 안내합니다.

## 📊 현재 상태

### ✅ 완료된 작업

#### Task Bundle 0-1: 프로젝트 초기화
- ✅ 프로젝트 폴더 구조
- ✅ Spring Boot 프로젝트 구조 생성
- ✅ Docker 설정
- ✅ 환경변수 예시 파일
- ✅ Git 브랜치 전략 (v2 브랜치)

#### Task Bundle 2: 데이터베이스 설계
- ✅ SQL 마이그레이션 파일 (15개)
- ✅ SQL 시드 파일 (5개)
- ✅ RLS 정책 SQL 파일

#### Task Bundle 3: 인증 시스템 (프론트엔드)
- ✅ 로그인/회원가입 UI (`frontend/app/auth/page.jsx`)
- ✅ AuthContext (`frontend/context/AuthContext.jsx`)
- ✅ ProtectedRoute 컴포넌트
- ✅ Supabase 클라이언트 설정

#### Task Bundle 4-11: 프론트엔드 UI
- ✅ 디너 목록/상세 페이지
- ✅ 커스터마이징 페이지
- ✅ 주문 체크아웃 페이지
- ✅ 직원 대시보드 및 관리 페이지

### ⚠️ 주의사항

**Next.js API Routes 파일들** (`frontend/app/api/`)
- `frontend/app/api/auth/me/route.js`
- `frontend/app/api/auth/logout/route.js`

이 파일들은 **Spring Boot로 전환해야 합니다**. 현재는 임시로 남겨두었지만, Spring Boot API가 구현되면 제거하거나 Spring Boot API를 호출하도록 변경해야 합니다.

---

## 🎯 다음 단계 (우선순위 순)

### 1️⃣ 개발 환경 설정 (필수)

**JDK 17 및 Maven 설치**
- `docs/SETUP_GUIDE.md` 참고
- 설치 확인: `java -version`, `mvn -version`

**예상 시간**: 30분~1시간

---

### 2️⃣ Supabase 프로젝트 생성 및 데이터베이스 구축 (필수)

**Task Bundle 2 완료**

1. **Supabase 프로젝트 생성** (수동)
   - [Supabase.com](https://supabase.com) 회원가입/로그인
   - 새 프로젝트 생성 (이름: softdinner)
   - 프로젝트 URL 및 API Key 복사

2. **환경변수 설정**
   - `frontend/.env.local` 생성
   - `backend/.env.local` 생성
   - Supabase 정보 입력

3. **데이터베이스 테이블 생성** (수동)
   - Supabase Dashboard → SQL Editor
   - `database/migrations/` 폴더의 파일들을 순서대로 실행:
     - `001_create_users.sql` ~ `013_create_loyalty_history.sql`
     - `014_add_foreign_keys.sql`
     - `015_create_rls_policies.sql`

4. **초기 데이터 입력** (수동)
   - `database/seeds/` 폴더의 파일들을 순서대로 실행:
     - `001_dinners_seed.sql`
     - `002_styles_seed.sql`
     - `003_ingredients_seed.sql`
     - `004_loyalty_tiers_seed.sql`
     - `005_menu_items_seed.sql`

**예상 시간**: 1~1.5시간

---

### 3️⃣ Spring Boot 인증 API 구현 (핵심)

**Task Bundle 3 백엔드 부분**

구현해야 할 Spring Boot 클래스들:

1. **AuthController.java**
   - `POST /api/auth/signup` - 회원가입
   - `POST /api/auth/login` - 로그인
   - `GET /api/auth/me` - 현재 사용자 정보
   - `POST /api/auth/logout` - 로그아웃

2. **AuthService.java**
   - Supabase Auth API 호출
   - users 테이블 CRUD
   - 역할(role) 관리

3. **SecurityConfig.java**
   - Spring Security 설정
   - JWT 필터 설정
   - CORS 설정

4. **JwtAuthenticationFilter.java**
   - JWT 토큰 검증
   - SecurityContext 설정

5. **DTO 클래스들**
   - `SignupRequestDTO`
   - `LoginRequestDTO`
   - `UserResponseDTO`
   - `AuthResponseDTO`

**예상 시간**: 3~3.5시간

---

### 4️⃣ 프론트엔드 API 연동 수정 (Task Bundle 3에서 함께 처리)

**Next.js API Routes → Spring Boot API 호출로 변경**

⚠️ **이 작업은 Task Bundle 3에서 Spring Boot API를 구현할 때 함께 처리됩니다.**

1. **AuthContext 수정** (Task 3.6에서 처리)
   - `frontend/context/AuthContext.jsx`
   - `/api/auth/me` 호출을 Spring Boot API로 변경
   - `NEXT_PUBLIC_API_URL` 환경변수 사용
   - `frontend/app/api/auth/me/route.js` 삭제

2. **로그인/회원가입 폼 수정** (Task 3.2, 3.3에서 처리)
   - `frontend/app/auth/page.jsx`
   - Spring Boot API 호출로 변경 (`NEXT_PUBLIC_API_URL` 사용)

3. **로그아웃 기능 수정** (Task 3.8에서 처리)
   - `frontend/context/AuthContext.jsx`의 signOut 함수
   - `frontend/app/api/auth/logout/route.js` 삭제

**예상 시간**: Task Bundle 3 구현 시 포함됨

---

### 5️⃣ 메뉴 조회 API 구현

**Task Bundle 4.1**

1. **MenuController.java**
   - `GET /api/menus` - 모든 디너 목록
   - `GET /api/menus/{dinnerId}` - 디너 상세
   - `GET /api/menus/{dinnerId}/items` - 메뉴 항목

2. **MenuService.java**
   - Supabase API 호출 (WebClient 사용)
   - 데이터 변환 및 가공

3. **프론트엔드 연동**
   - `frontend/lib/services/menu.service.js` 생성
   - 디너 목록 페이지에서 Spring Boot API 호출

**예상 시간**: 2~2.5시간

---

## 📝 작업 순서 추천

### 옵션 1: 빠른 시작 (권장)
1. JDK 17, Maven 설치
2. Supabase 프로젝트 생성 및 DB 구축
3. Spring Boot 인증 API 구현
4. 프론트엔드 API 연동 수정
5. 테스트 및 검증

### 옵션 2: 단계별 진행
1. JDK 17, Maven 설치
2. Supabase 프로젝트 생성 및 DB 구축
3. Spring Boot 기본 구조 테스트 (빌드 및 실행)
4. Spring Boot 인증 API 구현
5. 프론트엔드 연동 및 테스트

---

## 🔧 현재 해결해야 할 문제

### 1. Next.js API Routes와 Spring Boot API 혼재
- **문제**: `frontend/app/api/auth/me/route.js` 등이 Next.js API Routes로 구현되어 있음
- **해결**: Spring Boot API 구현 후 프론트엔드에서 Spring Boot API를 호출하도록 변경

### 2. 프론트엔드 API 호출 경로
- **현재**: Supabase 직접 호출 또는 Next.js API Routes
- **변경**: Spring Boot API 호출 (`NEXT_PUBLIC_API_URL` 사용)

---

## 📚 참고 문서

- `docs/SETUP_GUIDE.md` - 개발 환경 설정 가이드
- `docs/ENV_SETUP.md` - 환경변수 설정 가이드
- `PLAN-FINAL.md` - 전체 개발 계획서

---

## 💡 팁

1. **Spring Boot 테스트**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   서버가 `http://localhost:8080`에서 실행되면 성공!

2. **프론트엔드와 백엔드 동시 실행**
   - 터미널 1: `cd frontend && npm run dev` (포트 3000)
   - 터미널 2: `cd backend && mvn spring-boot:run` (포트 8080)

3. **API 테스트**
   - Postman 또는 브라우저 개발자 도구 사용
   - Spring Boot API: `http://localhost:8080/api/*`

---

**다음 작업**: JDK 17 및 Maven 설치 후 Supabase 프로젝트 생성 및 데이터베이스 구축!

