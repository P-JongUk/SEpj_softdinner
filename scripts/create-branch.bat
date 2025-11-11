@echo off
REM Task Bundle 브랜치 생성 및 전환 스크립트 (Windows)
REM 사용법: scripts\create-branch.bat <bundle-number> <description>
REM 예: scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"
REM ⚠️ 모든 브랜치는 v2에서 생성됩니다.

if "%1"=="" (
    echo 사용법: scripts\create-branch.bat ^<bundle-number^> ^<description^>
    echo 예: scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"
    exit /b 1
)

if "%2"=="" (
    echo 사용법: scripts\create-branch.bat ^<bundle-number^> ^<description^>
    echo 예: scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"
    exit /b 1
)

set BUNDLE_NUMBER=%1
set DESCRIPTION=%2
set BRANCH_NAME=feature/task-bundle-%BUNDLE_NUMBER%
set BASE_BRANCH=v2

REM v2 브랜치 확인 및 생성
git show-ref --verify --quiet refs/heads/%BASE_BRANCH%
if errorlevel 1 (
    echo v2 브랜치가 없습니다. main에서 v2 브랜치를 생성합니다...
    git checkout main
    git checkout -b %BASE_BRANCH%
    echo v2 브랜치 생성 완료.
)

REM v2 브랜치로 전환
git checkout %BASE_BRANCH%

REM 최신 변경사항 가져오기
git pull origin %BASE_BRANCH%

REM 새 브랜치 생성 및 전환 (v2에서 생성)
git checkout -b %BRANCH_NAME%

echo ✅ 브랜치 '%BRANCH_NAME%' 생성 및 전환 완료!
echo 📝 작업 설명: %DESCRIPTION%
echo 🌿 베이스 브랜치: %BASE_BRANCH%
echo.
echo ⚠️  중요: 모든 개발은 v2 브랜치 계열에서만 진행됩니다.
echo.
echo 다음 단계:
echo 1. 작업을 진행하세요
echo 2. 완료 후 다음 명령어로 커밋 및 푸시:
echo    git add .
echo    git commit -m "feat: TASK BUNDLE %BUNDLE_NUMBER% %DESCRIPTION%"
echo    git push origin %BRANCH_NAME%
