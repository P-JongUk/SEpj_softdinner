# Git 브랜치 자동화 스크립트

Task Bundle 작업을 위한 Git 브랜치 자동화 스크립트입니다.

## ⚠️ 중요: v2 브랜치 사용

**모든 개발은 v2 브랜치에서만 진행됩니다.**
- main 브랜치로 돌아가지 않습니다.
- 모든 feature 브랜치는 v2에서 생성됩니다.
- 모든 커밋과 푸시는 v2 브랜치 계열로 진행됩니다.

## 📋 사용 방법

### 1. Task Bundle 시작 시 브랜치 생성

#### Windows
```bash
scripts\create-branch.bat <bundle-number> "<description>"
```

#### Linux/Mac
```bash
chmod +x scripts/create-branch.sh
./scripts/create-branch.sh <bundle-number> "<description>"
```

**예시:**
```bash
# Task Bundle 1 시작
scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"

# Task Bundle 4 시작
scripts\create-branch.bat 4 "메뉴 조회 및 디너 선택"
```

### 2. 작업 완료 후 커밋 및 푸시

#### Windows
```bash
scripts\commit-and-push.bat <bundle-number> "<description>"
```

#### Linux/Mac
```bash
chmod +x scripts/commit-and-push.sh
./scripts/commit-and-push.sh <bundle-number> "<description>"
```

**예시:**
```bash
# Task Bundle 1 완료
scripts\commit-and-push.bat 1 "프로젝트 기본 구조 및 패키지 설치"

# Task Bundle 4 완료
scripts\commit-and-push.bat 4 "메뉴 조회 및 디너 선택"
```

## 🔄 전체 워크플로우

1. **Task Bundle 시작**
   ```bash
   scripts\create-branch.bat 1 "프로젝트 기본 구조 및 패키지 설치"
   ```
   - v2 브랜치에서 최신 코드 가져오기
   - `feature/task-bundle-1` 브랜치 생성 및 전환 (v2에서 생성)

2. **작업 진행**
   - 코드 작성 및 수정

3. **작업 완료**
   ```bash
   scripts\commit-and-push.bat 1 "프로젝트 기본 구조 및 패키지 설치"
   ```
   - 변경사항 커밋
   - 원격 저장소에 푸시

4. **GitHub에서 Pull Request 생성**
   - GitHub 웹사이트에서 PR 생성 (v2 브랜치로)
   - 리뷰 후 v2 브랜치로 병합

## 📝 브랜치 네이밍 규칙

- `feature/task-bundle-{번호}` 형식 사용
- 예: `feature/task-bundle-1`, `feature/task-bundle-4`

## ⚠️ 주의사항

- **모든 개발은 v2 브랜치에서만 진행됩니다. main 브랜치로 돌아가지 않습니다.**
- 작업 시작 전에 v2 브랜치가 최신 상태인지 확인하세요
- 커밋 메시지는 자동으로 생성되지만, 필요시 수정 가능합니다
- PR은 GitHub 웹사이트에서 수동으로 생성해야 합니다 (v2 브랜치로)

