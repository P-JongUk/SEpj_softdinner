# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 파일 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 포트 3000 노출
EXPOSE 3000

# 개발 모드 실행
CMD ["npm", "run", "dev"]

