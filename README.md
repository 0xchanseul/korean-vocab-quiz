# 찬슬이와 Aslak의 재미있는 vocabulary quiz

귀엽고 가벼운 한국어/노르웨이어 낱말퀴즈 PWA입니다. 개인 취미용 앱으로, 백엔드 없이 IndexedDB에 단어와 퀴즈 기록을 저장합니다.

## 기술 스택

- React
- TypeScript
- Vite
- Web App Manifest + Service Worker
- IndexedDB
- Dexie.js
- Mobile First UI
- Vercel 배포 가능

## 실행 방법

```bash
npm install
npm run dev
```

빌드 확인:

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다. Vercel에서는 일반 Vite 프로젝트처럼 배포하면 됩니다.

## 주요 기능

- 한국어 단어 출제, 노르웨이어 보기 4개
- 노르웨이어 단어 출제, 한국어 보기 4개
- 10문제 1세트
- 보기 순서 랜덤
- 중복 출제 방지
- 점수 계산
- 오답 시 정답 표시 후 수동으로 다음 문제 이동
- 결과 화면, 다시 시작, 초기 화면 이동
- 첫 실행 시 쉬운 단어 100개 seed
- IndexedDB 중복 저장 방지
- PWA manifest, offline fallback, 앱 아이콘 포함

## 폴더 구조

```text
src
├─ assets
├─ components
├─ data
├─ db
├─ hooks
├─ pages
├─ pwa
├─ repositories
├─ services
├─ types
└─ utils
```

## 아키텍처

UI는 DB에 직접 접근하지 않습니다.

```text
React UI
  ↓
Service
  ↓
Repository
  ↓
IndexedDB / Dexie
```

추후 Spring Boot + MariaDB 백엔드로 확장할 때는 repository 계층의 Dexie 구현을 API 호출 구현으로 교체하는 방향을 의도했습니다. 관련 파일에 `TODO: future backend integration` 주석이 있습니다.

## 데이터 모델

### Word

- id
- korean
- norwegian
- category
- level
- createdAt
- updatedAt

### QuizHistory

- id
- score
- language
- playedAt

### WrongAnswer

- id
- wordId
- createdAt

## PWA 아이콘

아이콘 원본은 `public/icons/app-icon.svg`에 있습니다. 흰 배경, 파란 말풍선, 한국어 `ㅎ`과 노르웨이어 `Å` 조합으로 앱 아이콘에서 잘 보이도록 단순하게 구성했습니다.
