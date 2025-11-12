# Docker 설정 가이드

팀 협업을 위한 Docker 환경 설정 가이드입니다.

## 📋 사전 요구사항

- Docker Desktop 설치 (Windows/Mac) 또는 Docker Engine (Linux)
- Docker Compose 설치 (Docker Desktop에 포함됨)

## 🚀 빠른 시작

### 1. 환경 변수 설정

#### Frontend 환경 변수
`frontend/.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Backend 환경 변수
`backend/.env.local` 파일 생성:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### 2. Docker Compose로 실행

```bash
# 프로젝트 루트에서
docker-compose up -d --build
```

### 3. 서비스 접속

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 🛠️ 주요 명령어

### 서비스 시작
```bash
docker-compose up -d
```

### 서비스 중지
```bash
docker-compose down
```

### 로그 확인
```bash
# 모든 서비스 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 서비스 재시작
```bash
docker-compose restart frontend
docker-compose restart backend
```

### 컨테이너 내부 접속
```bash
# Frontend 컨테이너
docker exec -it softdinner-frontend sh

# Backend 컨테이너
docker exec -it softdinner-backend bash
```

### 이미지 재빌드
```bash
# 모든 서비스 재빌드
docker-compose build --no-cache

# 특정 서비스만 재빌드
docker-compose build --no-cache frontend
docker-compose build --no-cache backend
```

## 📁 볼륨 마운트

개발 모드에서는 소스 코드가 볼륨으로 마운트되어 변경사항이 즉시 반영됩니다:

- `./frontend` → `/app` (프론트엔드)
- `./backend` → `/app` (백엔드)

## 🔧 문제 해결

### Docker 이미지 다운로드 실패 (네트워크 타임아웃)
Docker Hub에서 이미지를 다운로드하는 중 타임아웃이 발생하는 경우:

```bash
# 1. Docker 재시작
# Windows: Docker Desktop 재시작
# Linux/Mac: sudo systemctl restart docker

# 2. 네트워크 재시도
docker-compose build --no-cache

# 3. 수동으로 이미지 다운로드
docker pull maven:3.9.9-eclipse-temurin-17
docker pull node:18-alpine

# 4. Docker Hub 대체 레지스트리 사용 (선택사항)
# docker-compose.yml에 registry 설정 추가
```

### 포트 충돌
포트 3000 또는 8080이 이미 사용 중인 경우:
```bash
# 사용 중인 포트 확인
netstat -ano | findstr :3000
netstat -ano | findstr :8080

# docker-compose.yml에서 포트 변경
ports:
  - "3001:3000"  # 프론트엔드
  - "8081:8080"  # 백엔드
```

### 컨테이너가 시작되지 않는 경우
```bash
# 로그 확인
docker-compose logs

# 컨테이너 상태 확인
docker-compose ps

# 강제 재시작
docker-compose down
docker-compose up -d --build
```

### 환경 변수 문제
`.env.local` 파일이 제대로 로드되지 않는 경우:
```bash
# 환경 변수 확인
docker-compose config

# 컨테이너 내부에서 확인
docker exec softdinner-frontend env
docker exec softdinner-backend env
```

## 🏗️ 프로덕션 빌드

프로덕션 환경에서는 별도의 Dockerfile을 사용하거나 docker-compose.prod.yml을 생성하세요.

```bash
# 프로덕션 빌드
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📝 참고사항

- 개발 모드에서는 핫 리로드가 지원됩니다
- 소스 코드 변경 시 자동으로 반영됩니다
- `node_modules`와 `.next`는 볼륨으로 마운트되어 성능이 향상됩니다
- Maven 캐시는 볼륨으로 저장되어 빌드 시간이 단축됩니다

