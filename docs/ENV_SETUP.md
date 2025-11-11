# 환경변수 설정 가이드

SoftDinner 프로젝트를 실행하기 위한 환경변수 설정 가이드입니다.

## 📋 목차

1. [Supabase 프로젝트 생성](#supabase-프로젝트-생성)
2. [Frontend 환경변수 설정](#frontend-환경변수-설정)
3. [Backend 환경변수 설정](#backend-환경변수-설정)
4. [환경변수 확인](#환경변수-확인)

---

## 🔧 Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. 새 프로젝트 생성
3. 프로젝트 설정 → API 설정으로 이동
4. 다음 정보를 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (긴 문자열)
   - **service_role key**: `eyJhbGc...` (긴 문자열, 비밀!)

---

## 🎨 Frontend 환경변수 설정

### 1. `.env.example` 파일 복사

```bash
cd frontend
copy .env.example .env.local
```

또는

```bash
cd frontend
cp .env.example .env.local
```

### 2. `.env.local` 파일 수정

`frontend/.env.local` 파일을 열고 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. 환경변수 설명

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 공개 키 (클라이언트용) | `eyJhbGc...` |
| `NEXT_PUBLIC_API_URL` | Spring Boot API 서버 URL | `http://localhost:8080` (로컬) 또는 배포된 URL |

⚠️ **주의**: 
- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트 사이드에서 접근 가능합니다.
- Frontend에서 Supabase Auth는 직접 사용하고, 비즈니스 로직은 Spring Boot API를 통해 호출합니다.

---

## 🔧 Backend 환경변수 설정

### 1. `.env.example` 파일 복사

```bash
cd backend
copy .env.example .env.local
```

또는

```bash
cd backend
cp .env.example .env.local
```

### 2. `.env.local` 파일 수정

`backend/.env.local` 파일을 열고 Supabase 정보를 입력하세요:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # service_role key 사용
CORS_ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=your-jwt-secret-key-change-in-production
```

### 3. 환경변수 설명

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (서버 전용) | `eyJhbGc...` |
| `CORS_ALLOWED_ORIGINS` | CORS 허용 Origin (쉼표로 구분) | `http://localhost:3000,http://localhost:3001` |
| `JWT_SECRET` | JWT 토큰 서명용 비밀키 | `your-jwt-secret-key` (프로덕션에서는 반드시 변경!) |

⚠️ **중요**: 
- `SUPABASE_SERVICE_ROLE_KEY`는 **Service Role Key**를 사용해야 합니다. 이 키는 RLS를 우회하고 모든 권한을 가지므로 절대 클라이언트에 노출하지 마세요!
- `JWT_SECRET`은 프로덕션 환경에서 반드시 강력한 랜덤 문자열로 변경하세요!

---

## ✅ 환경변수 확인

### Frontend 확인

```bash
cd frontend
npm run dev
```

브라우저 콘솔에서 환경변수가 제대로 로드되었는지 확인:
```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Backend 확인

```bash
cd backend
mvn spring-boot:run
```

또는

```bash
cd backend
mvn clean package
java -jar target/softdinner-backend-0.1.0.jar
```

서버가 정상적으로 시작되면 환경변수가 올바르게 설정된 것입니다.

---

## 🔒 보안 주의사항

1. **`.env.local` 파일은 절대 Git에 커밋하지 마세요!**
   - 이미 `.gitignore`에 포함되어 있습니다.

2. **Service Role Key 보호**
   - `SUPABASE_KEY`는 서버 사이드에서만 사용
   - 클라이언트 코드에 포함하지 않기
   - GitHub에 업로드하지 않기

3. **프로덕션 환경**
   - Vercel 등 배포 플랫폼에서 환경변수 설정
   - 웹 인터페이스에서 직접 입력 (Git에 커밋하지 않음)

---

## 🆘 문제 해결

### 환경변수가 로드되지 않는 경우

1. **파일 이름 확인**
   - `.env.local` (정확한 이름)
   - `.env` 또는 `.env.development`는 작동하지 않을 수 있음

2. **서버 재시작**
   - 환경변수 변경 후 개발 서버를 재시작하세요

3. **변수명 확인**
   - Frontend: `NEXT_PUBLIC_` 접두사 필수
   - 대소문자 구분

4. **경로 확인**
   - `frontend/.env.local` (frontend 폴더 내부)
   - `backend/.env.local` (backend 폴더 내부)

---

## 📚 참고 자료

- [Supabase 문서](https://supabase.com/docs)
- [Next.js 환경변수](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase API 키 가이드](https://supabase.com/docs/guides/api/api-keys)

