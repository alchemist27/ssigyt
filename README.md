# 씨익 플랫폼 - UI/UX 프로토타입

유튜브 스타일의 다크모드 인터페이스를 가진 프로젝트/3D 라이브러리/상품 공유 플랫폼입니다.

## 📋 프로젝트 개요

PRD 문서를 기반으로 구현된 씨익 플랫폼의 프론트엔드 UI/UX 프로토타입입니다.
서버 연동 없이 HTML, CSS, JavaScript만으로 전체 웹사이트를 구현했습니다.

## 🎨 주요 특징

- **유튜브 스타일 다크모드 UI** - 깔끔하고 현대적인 디자인
- **완전한 모바일 반응형** - 모바일, 태블릿, 데스크톱 지원
- **인터랙티브한 UX** - 필터링, 정렬, 무한 스크롤 등
- **컴포넌트 기반 구조** - 재사용 가능한 UI 컴포넌트

## 📁 프로젝트 구조

```
SSIGYT/
├── index.html              # 홈 페이지
├── css/
│   ├── common.css          # 공통 스타일 및 변수
│   ├── header.css          # 헤더 컴포넌트
│   ├── sidebar.css         # 사이드바 컴포넌트
│   ├── layout.css          # 메인 레이아웃
│   ├── card.css            # 카드 컴포넌트
│   ├── channel.css         # 마이채널 페이지
│   ├── map.css             # 지도 페이지
│   ├── create.css          # 등록하기 페이지
│   └── settings.css        # 설정 페이지
├── js/
│   └── common.js           # 공통 JavaScript 기능
├── pages/
│   ├── channel.html        # 마이채널 페이지
│   ├── map.html            # 지도(WideMap) 페이지
│   ├── create.html         # 등록하기 페이지
│   └── settings.html       # 설정 페이지
├── images/                 # 이미지 파일 (필요시 추가)
├── PRD.md                  # 제품 요구사항 문서
└── README.md               # 프로젝트 설명서
```

## 🚀 시작하기

### 실행 방법

1. 프로젝트 폴더를 다운로드합니다
2. `index.html` 파일을 브라우저에서 엽니다
3. 또는 로컬 서버를 실행합니다:
   ```bash
   # Python 3
   python -m http.server 8000

   # 또는 Node.js의 http-server
   npx http-server
   ```
4. 브라우저에서 `http://localhost:8000` 접속

### 브라우저 호환성

- Chrome, Edge (권장)
- Firefox
- Safari
- 모바일 브라우저 지원

## 📱 페이지 구성

### 1. 홈 페이지 (index.html)
- 통합 콘텐츠 피드 (프로젝트, 3D 라이브러리, 상품)
- 키워드 필터링
- 거리순/최신순/인기순 정렬
- 무한 스크롤

### 2. 마이채널 (pages/channel.html)
- 프로필 배너 및 정보
- 프로젝트/3D 라이브러리/상품/광고 탭
- 통계 정보 (팔로워, 콘텐츠 수)
- 소셜 링크

### 3. 지도 (pages/map.html)
- 구글맵 연동 영역 (플레이스홀더)
- 주변 업체 검색 및 필터링
- 거리 기반 업체 카드
- 모바일 하단 슬라이드 패널

### 4. 등록하기 (pages/create.html)
- 콘텐츠 유형 선택 (프로젝트/3D/상품/광고)
- 파일 업로드 (드래그 앤 드롭)
- 태그 입력
- 폼 유효성 검사

### 5. 설정 (pages/settings.html)
- 프로필 정보 수정
- 소셜 링크 관리
- 알림 설정 토글
- 계정 관리

## 🎯 주요 기능

### 반응형 디자인
- **데스크톱 (1920px)**: 6열 그리드, 사이드바 항상 표시
- **태블릿 (1024px)**: 4열 그리드, 축소형 사이드바
- **모바일 (768px 이하)**: 2열 그리드, 햄버거 메뉴

### 인터랙티브 요소
- 카드 호버 효과
- 좋아요/공유 버튼
- 필터 및 정렬 기능
- 무한 스크롤 로딩
- 토스트 알림

### 색상 테마
```css
--bg-primary: #0f0f0f      /* 메인 배경 */
--bg-secondary: #181818     /* 카드 배경 */
--brand-orange: #F56342     /* 주요 액센트 */
--brand-blue: #00AEEF       /* 보조 액센트 */
```

## 🔧 커스터마이징

### 색상 변경
`css/common.css` 파일의 `:root` 변수를 수정하세요:
```css
:root {
  --brand-orange: #YOUR_COLOR;
  --brand-blue: #YOUR_COLOR;
}
```

### 레이아웃 조정
`css/common.css`에서 사이드바 너비, 헤더 높이 등을 조정할 수 있습니다:
```css
:root {
  --sidebar-width: 240px;
  --header-height: 60px;
}
```

## 📝 구현 세부사항

### 사용된 기술
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **Vanilla JavaScript**: ES6+, DOM 조작, Event Handling

### CSS 아키텍처
- BEM 스타일 네이밍 컨벤션
- CSS 변수를 통한 테마 관리
- 모바일 퍼스트 접근 방식
- 컴포넌트 기반 스타일 분리

### JavaScript 기능
- 모바일 메뉴 토글
- 검색 및 필터링
- 무한 스크롤 (IntersectionObserver)
- 파일 업로드 미리보기
- 토스트 알림 시스템

## 🔜 향후 개선사항

- [ ] 실제 구글 맵 API 연동
- [ ] 백엔드 API 연동
- [ ] 데이터베이스 연결
- [ ] 사용자 인증 시스템
- [ ] 이미지 최적화
- [ ] SEO 최적화
- [ ] 접근성 개선 (ARIA 레이블)
- [ ] 다크/라이트 모드 토글

## 📄 라이선스

이 프로젝트는 프로토타입 목적으로 제작되었습니다.

## 👥 제작

PRD 문서 기반으로 구현된 씨익 플랫폼 UI/UX 프로토타입

---

**참고**: 이 프로젝트는 서버 연동 없이 UI/UX 프로토타입만 구현되었습니다.
실제 서비스 구현 시 백엔드 API, 데이터베이스, 인증 시스템 등이 추가로 필요합니다.
