@echo off
REM Task Bundle 작업 완료 후 커밋 및 푸시 스크립트 (Windows)
REM 사용법: scripts\commit-and-push.bat <bundle-number> <description>
REM 예: scripts\commit-and-push.bat 1 "프로젝트 기본 구조 및 패키지 설치"

if "%1"=="" (
    echo 사용법: scripts\commit-and-push.bat ^<bundle-number^> ^<description^>
    echo 예: scripts\commit-and-push.bat 1 "프로젝트 기본 구조 및 패키지 설치"
    exit /b 1
)

if "%2"=="" (
    echo 사용법: scripts\commit-and-push.bat ^<bundle-number^> ^<description^>
    echo 예: scripts\commit-and-push.bat 1 "프로젝트 기본 구조 및 패키지 설치"
    exit /b 1
)

set BUNDLE_NUMBER=%1
set DESCRIPTION=%2
set BRANCH_NAME=feature/task-bundle-%BUNDLE_NUMBER%

REM 현재 브랜치 확인
git branch --show-current > temp_branch.txt
set /p CURRENT_BRANCH=<temp_branch.txt
del temp_branch.txt

if not "%CURRENT_BRANCH%"=="%BRANCH_NAME%" (
    echo ⚠️  현재 브랜치가 '%BRANCH_NAME%'가 아닙니다. 현재 브랜치: %CURRENT_BRANCH%
    echo 계속하시겠습니까? (Y/N)
    set /p CONTINUE=
    if /i not "%CONTINUE%"=="Y" exit /b 1
)

REM 변경사항 추가
git add .

REM 커밋
git commit -m "feat: TASK BUNDLE %BUNDLE_NUMBER% %DESCRIPTION%"

REM 푸시
git push origin %BRANCH_NAME%

echo.
echo ✅ 커밋 및 푸시 완료!
echo 📦 브랜치: %BRANCH_NAME%
echo.
echo 다음 단계:
echo 1. GitHub에서 Pull Request를 생성하세요
echo 2. 리뷰 후 main 브랜치로 병합하세요

