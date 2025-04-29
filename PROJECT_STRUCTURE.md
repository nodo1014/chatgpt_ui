# ChatGPT Style AI Starter 프로젝트 구조

이 문서는 ChatGPT Style AI Starter 프로젝트의 전반적인 구조와 설계 방식을 설명합니다.

## 개요

이 프로젝트는 ChatGPT와 유사한 스타일의 AI 채팅 인터페이스를 구현한 스타터 템플릿입니다. 프론트엔드는 Next.js(TypeScript)로, 백엔드는 FastAPI(Python)로 구성되어 있습니다.

## 기술 스택

### 프론트엔드
- **Next.js 15.3.1**: React 기반 프레임워크
- **React 19.1.0**: UI 라이브러리
- **TypeScript 5.8.3**: 정적 타입 지원

### 백엔드
- **FastAPI**: 고성능 Python 웹 프레임워크
- **Uvicorn**: ASGI 서버
- **Pydantic**: 데이터 유효성 검증

## 프로젝트 구조

```
📦 chatgpt_style_starter
├── 📄 README.md                # 프로젝트 개요 및 실행 방법
├── 📄 STYLE_GUIDE.md           # 코딩 스타일 가이드
├── 📂 backend                   # 백엔드 (FastAPI)
│   ├── 📂 app
│   │   ├── 📄 main.py          # FastAPI 메인 애플리케이션
│   │   └── 📂 __pycache__
│   ├── 📂 templates
│   │   └── 📄 api_endpoint_template.py  # API 엔드포인트 템플릿
│   └── 📂 venv                  # Python 가상환경
└── �� frontend                  # 프론트엔드 (Next.js)
    ├── 📄 next-env.d.ts        # Next.js 타입 정의
    ├── 📄 package.json         # 프론트엔드 패키지 관리
    ├── �� tsconfig.json        # TypeScript 설정
    ├── 📂 components           # React 컴포넌트
    │   ├── 📄 ChatInput.tsx    # 채팅 입력 컴포넌트
    │   ├── 📄 Layout.tsx       # 전체 레이아웃 컴포넌트
    │   ├── 📄 Sidebar.tsx      # 사이드바 컴포넌트
    │   ├── 📂 layout           # 레이아웃 관련 컴포넌트
    │   │   └── 📄 Header.tsx   # 헤더 컴포넌트
    │   └── 📂 ui               # UI 컴포넌트
    ├── 📂 config               # 설정 파일
    │   └── 📄 theme.ts         # 테마 설정 (색상, 간격 등)
    ├── 📂 lib                  # 유틸리티 및 헬퍼
    │   └── 📂 hooks           # React 커스텀 훅
    │       └── 📄 useLayout.ts # 레이아웃 관련 커스텀 훅
    ├── 📂 pages               # Next.js 페이지
    │   ├── 📄 _app.tsx        # Next.js 앱 컴포넌트
    │   └── 📄 index.tsx       # 홈페이지
    ├── 📂 styles              # 스타일 파일
    │   ├── 📄 globals.css     # 전역 CSS
    │   └── 📂 modules        # CSS 모듈
    └── 📂 templates           # 템플릿 파일
        └── 📄 ComponentTemplate.tsx  # 컴포넌트 템플릿
```

## 핵심 컴포넌트 설명

### 프론트엔드

#### 레이아웃 구조
- **Layout.tsx**: 전체 애플리케이션의 레이아웃을 정의 (사이드바, 헤더, 콘텐츠 영역)
- **Header.tsx**: 상단 네비게이션 바 (로그인/로그아웃, 메뉴 토글)
- **Sidebar.tsx**: 좌측 사이드바 (채팅 목록, 새 채팅 버튼, 설정)

#### 채팅 인터페이스
- **ChatInput.tsx**: 사용자 입력을 받는 컴포넌트

### 스타일 및 테마
- **theme.ts**: 색상, 간격, 타이포그래피, 레이아웃 등 UI 테마 설정
- **globals.css**: 글로벌 스타일 정의

### 백엔드
- **main.py**: FastAPI 애플리케이션 및 API 엔드포인트 정의

## 설계 원칙

1. **컴포넌트 중심 설계**: 모든 UI 요소는 재사용 가능한 컴포넌트로 분리
2. **일관된 코드 스타일**: STYLE_GUIDE.md에 정의된 규칙 준수
3. **명확한 주석과 문서화**: 모든 컴포넌트와 함수에 표준화된 주석 포함
4. **테마 시스템**: 중앙 집중식 테마 관리로 디자인 일관성 유지
5. **반응형 설계**: 모바일과 데스크톱 모두 지원하는 UI

## 개발 가이드라인

### 새 컴포넌트 추가
1. `templates/ComponentTemplate.tsx`를 참조하여 새 파일 생성
2. STYLE_GUIDE.md에 정의된 주석 형식과 코드 구성 준수
3. 적절한 폴더에 배치 (기능/역할에 따라)

### 스타일링
- 인라인 스타일은 레이아웃 관련 속성만 사용
- 복잡한 스타일링은 CSS 모듈 또는 테마 시스템 활용

### 백엔드 API 개발
- `templates/api_endpoint_template.py` 템플릿 활용
- FastAPI의 타입 힌트와 Pydantic 모델 적극 활용

## 실행 방법

### 백엔드
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pydantic
uvicorn app.main:app --reload --port 8000
```

### 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

## 코드 품질 관리

- ESLint와 Prettier를 사용한 코드 스타일 통일
- TypeScript와 Pydantic을 통한 타입 안정성 확보
- 표준화된 주석과 문서화로 코드 이해도 향상

