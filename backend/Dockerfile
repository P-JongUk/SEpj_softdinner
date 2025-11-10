# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 파일 복사
COPY . .

# 포트 3001 노출 (선택사항)
EXPOSE 3001

# 개발 모드 실행
CMD ["npm", "run", "dev"]

