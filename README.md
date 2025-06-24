# 🎬 Vanilla JS 영화 소개 SPA

Vanilla JS로 만든 영화 소개 웹앱입니다.  
React 없이 컴포넌트 기반 UI, 상태 관리, 라우팅, 모달 인터랙션 등을 직접 구현하며, SPA 구조에 대한 이해를 목표로 제작했습니다.
Cypress로 E2E테스트 진행하였습니다.  

[👉 데모 사이트](https://devpearlkim.github.io/js-movie-review/)

## 🔍 주요 기능

### 📌 영화 목록 조회
- TMDB API를 이용하여 인기 영화 목록을 조회
- Skeleton UI 구현으로 로딩 중 사용자 경험 개선
- "더보기" 버튼을 통해 페이지네이션 처리
- 스크롤 하단 도달 시 더보기 버튼 자동 숨김
- 탭 선택에 따라 카테고리 변경 (기본값: 인기순)

### 🎯 영화 검색 기능
- 검색창 입력 시 검색 결과 화면으로 이동
- 결과가 없을 경우 `"검색결과가 없습니다"` 메시지 표시
- URL에 검색 쿼리를 반영하여 상태 유지

### 🔄 무한스크롤
- "더보기" 버튼 제거 → 스크롤 하단에서 자동 로딩
- 기존 리스트 유지하며 영화 추가 로드

### 🪄 영화 상세 모달
- 포스터 또는 제목 클릭 시 상세 정보 모달 표시
- ESC 키로 모달 닫기

### ⭐ 별점 매기기
- 0~10점(별 5개 단위)로 영화 별점 부여
- localStorage에 저장하여 새로고침 후에도 유지

### 📱 반응형 UI
- Figma 시안 기반으로 모바일/데스크탑 대응 UI 구성

### 🧪 테스트
- Cypress 기반 E2E 테스트 포함
- 검색, 모달 동작, 렌더링 등 주요 기능 테스트
- 테스트 폴더: `/cypress/`

## 🧰 기술 스택

- JavaScript / TypeScript
- HTML / CSS
- Cypress

## 📁 디렉토리 구조

본 프로젝트는 실제 서비스 구조를 참고하여, 기능별 책임 분리를 중심으로 구성했습니다.

- `components/` – UI 구성 요소 (Modal, Header, Tabs 등)
- `controllers/` – 페이지 로직 제어 및 초기화 흐름 관리
- `services/` – API 통신, 상태 관리, 비즈니스 로직 모듈화
- `utils/` – 공통 유틸리티 함수 및 DOM 조작 헬퍼
- `types/` – 타입 정의 및 도메인 모델링
- `main.ts` – 진입점 (앱 초기화 및 컨트롤러 호출)

📁 src/  
├── 📁 components/  
│   ├── Heade.ts  
│   ├── LoadMoreButton.ts  
│   ├── Modal.ts  
│   ├── MovieRenderers.ts  
│   └── Tabs.ts  
├── 📁 controllers/  
│   └── createMovieController.ts  
├── 📁 services/  
│   ├── api.ts  
│   ├── createMovie.ts  
│   ├── createMovieService.ts  
│   └── userRating.ts  
├── 📁 utils/  
│   ├── error.ts  
│   ├── helper.ts  
│   ├── history.ts  
│   ├── infiniteScroll.ts  
│   ├── state.ts  
│   ├── storage.ts  
│   └── ui.ts  
├── 📁 types/  
│   └── type.ts  
├── constants.ts  
└── main.ts  
  



