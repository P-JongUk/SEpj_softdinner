# 개발 환경 설정 가이드

Spring Boot 백엔드 개발을 위한 개발 환경 설정 가이드입니다.

## 📋 필수 설치 항목

### 1. JDK 17 (Java Development Kit) ⭐ 필수

Spring Boot 3.2.0은 Java 17 이상이 필요합니다.

#### 설치 방법

**옵션 1: Oracle JDK (권장)**
1. [Oracle JDK 17 다운로드](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
2. Windows x64 Installer 다운로드
3. 설치 후 환경변수 설정:
   - `JAVA_HOME`: `C:\Program Files\Java\jdk-17` (설치 경로)
   - `PATH`에 `%JAVA_HOME%\bin` 추가

**옵션 2: OpenJDK (무료, 추천)**
1. [Eclipse Temurin (Adoptium)](https://adoptium.net/temurin/releases/?version=17) 다운로드
2. Windows x64 JDK 17 선택
3. 설치 후 환경변수 설정 (위와 동일)

**옵션 3: Chocolatey 사용 (간편)**
```powershell
# 관리자 권한 PowerShell에서 실행
choco install openjdk17
```

#### 설치 확인
```powershell
java -version
# 출력 예시: openjdk version "17.0.x" ...
javac -version
```

---

### 2. Maven ⭐ 필수

Maven은 Java 프로젝트 빌드 및 의존성 관리 도구입니다.

#### 설치 방법

**옵션 1: 직접 설치**
1. [Apache Maven 다운로드](https://maven.apache.org/download.cgi)
2. Binary zip archive 다운로드 (예: `apache-maven-3.9.5-bin.zip`)
3. 압축 해제 (예: `C:\Program Files\Apache\maven`)
4. 환경변수 설정:
   - `MAVEN_HOME`: `C:\Program Files\Apache\maven`
   - `PATH`에 `%MAVEN_HOME%\bin` 추가

**옵션 2: Chocolatey 사용 (간편)**
```powershell
# 관리자 권한 PowerShell에서 실행
choco install maven
```

#### 설치 확인
```powershell
mvn -version
# 출력 예시: Apache Maven 3.9.x ...
```

---

### 3. IDE (선택사항, 권장)

**IntelliJ IDEA Community Edition (무료, 추천)**
- [다운로드](https://www.jetbrains.com/idea/download/)
- Spring Boot 개발에 최적화
- 자동 완성, 디버깅, 테스트 지원

**VS Code (무료)**
- [다운로드](https://code.visualstudio.com/)
- Extension 설치:
  - Extension Pack for Java
  - Spring Boot Extension Pack

**Eclipse (무료)**
- [다운로드](https://www.eclipse.org/downloads/)
- Spring Tools 4 플러그인 설치

---

## 🚀 빠른 설치 (Chocolatey 사용)

Chocolatey가 설치되어 있다면 한 번에 설치 가능:

```powershell
# 관리자 권한 PowerShell에서 실행
choco install openjdk17 maven -y
```

Chocolatey 설치가 안 되어 있다면:
```powershell
# 관리자 권한 PowerShell에서 실행
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

---

## ✅ 설치 확인

모든 설치가 완료되면 다음 명령어로 확인:

```powershell
java -version
javac -version
mvn -version
```

모두 정상적으로 버전이 출력되면 설치 완료!

---

## 🔧 환경변수 설정 (수동 설치 시)

### Windows 환경변수 설정 방법

1. **시스템 속성 열기**
   - `Win + R` → `sysdm.cpl` 입력 → Enter
   - 또는 제어판 → 시스템 → 고급 시스템 설정

2. **환경 변수 버튼 클릭**

3. **시스템 변수 섹션에서 추가**
   - `JAVA_HOME`: `C:\Program Files\Java\jdk-17`
   - `MAVEN_HOME`: `C:\Program Files\Apache\maven`

4. **Path 변수 편집**
   - `%JAVA_HOME%\bin` 추가
   - `%MAVEN_HOME%\bin` 추가

5. **새 PowerShell 창 열어서 확인**
   ```powershell
   java -version
   mvn -version
   ```

---

## 📝 다음 단계

설치가 완료되면:

1. **프로젝트 빌드 테스트**
   ```powershell
   cd backend
   mvn clean install
   ```

2. **Spring Boot 실행 테스트**
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

3. **Task Bundle 1.4 완료 체크**
   - PLAN-FINAL.md의 Task 1.4가 완료된 것으로 표시

---

## 🆘 문제 해결

### Java가 인식되지 않는 경우
- 환경변수 `JAVA_HOME`과 `PATH` 확인
- PowerShell 재시작
- 시스템 재부팅 (필요시)

### Maven이 인식되지 않는 경우
- 환경변수 `MAVEN_HOME`과 `PATH` 확인
- PowerShell 재시작

### 버전이 맞지 않는 경우
- Java 17 이상 필요 (Java 8, 11은 작동하지 않음)
- `java -version`으로 확인

---

## 📚 참고 자료

- [Oracle JDK 다운로드](https://www.oracle.com/java/technologies/downloads/#java17)
- [Eclipse Temurin (OpenJDK)](https://adoptium.net/)
- [Apache Maven](https://maven.apache.org/)
- [Chocolatey](https://chocolatey.org/)

