@echo off
REM Task Bundle 브랜치 생성 및 전환 스크립트 (Windows)
REM 사용법: scripts\create-branch.bat <bundle-number> <description>
REM 예: scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"

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

REM main 브랜치로 전환
git checkout main

REM 최신 변경사항 가져오기
git pull origin main

REM 새 브랜치 생성 및 전환
git checkout -b %BRANCH_NAME%

echo ✅ 브랜치 '%BRANCH_NAME%' 생성 및 전환 완료!
echo 📝 작업 설명: %DESCRIPTION%
echo.
echo 다음 단계:
echo 1. 작업을 진행하세요
echo 2. 완료 후 다음 명령어로 커밋 및 푸시:
echo    git add .
echo    git commit -m "feat: TASK BUNDLE %BUNDLE_NUMBER% %DESCRIPTION%"
echo    git push origin %BRANCH_NAME%

