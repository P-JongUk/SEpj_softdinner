# Backend Dockerfile (개발 모드)
FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Maven 캐시를 위한 볼륨 마운트 포인트
VOLUME ["/root/.m2"]

# 개발 모드: 소스 코드 변경 시 자동 재시작
# 프로덕션 모드로 사용하려면 아래 주석 처리하고 multi-stage build 사용
CMD ["mvn", "spring-boot:run"]

# 프로덕션 빌드를 위한 multi-stage (주석 처리됨)
# FROM maven:3.9-eclipse-temurin-17 AS build
# WORKDIR /app
# COPY pom.xml .
# RUN mvn dependency:go-offline -B
# COPY src ./src
# RUN mvn clean package -DskipTests
# 
# FROM eclipse-temurin:17-jre-alpine
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]
