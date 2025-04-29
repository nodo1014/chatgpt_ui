# ChatGPT Style AI Starter Project

# 제작 방식

1. 대상 사이트 캡처 후, 목업으로 요청. vscode + gpt 4.1 이용
2. next.js + fast api 로 구성

## 구성

- FastAPI (Python) - 백엔드 API 서버
- Next.js (TypeScript) - 프론트엔드

## 실행 방법

1. backend (가상환경 포함)

```bash
cd backend
python3 -m venv venv           # 가상환경 생성
source venv/bin/activate       # 가상환경 활성화 (Linux/Mac)
pip install fastapi uvicorn pydantic
uvicorn app.main:app --reload --port 8000
```

2. frontend

```bash
cd frontend
npm install next react react-dom
npm run dev
```

## 코드 스타일 가이드

이 프로젝트는 모든 개발자 및 AI 어시스턴트가 준수해야 하는 엄격한 코딩 스타일 가이드를 제공합니다. 상세 가이드는 다음 문서를 참조하세요:

- [코딩 스타일 가이드](./STYLE_GUIDE.md)

### 주요 규칙 요약

1. **컴포넌트 주석:** 모든 컴포넌트는 표준화된 헤더 주석을 포함해야 합니다
2. **코드 구성:** 정해진 순서(임포트 > 타입 > 상수 > 컴포넌트 > 내보내기)를 따릅니다
3. **네이밍 규칙:** 컴포넌트는 PascalCase, 함수/변수는 camelCase를 사용합니다
4. **주석 구조화:** 섹션 구분은 지정된 형식의 주석을 사용합니다

### 린팅 및 포맷팅

코드 품질 유지를 위해 다음 도구를 사용합니다:

#### 프론트엔드

```bash
# 린팅 실행
npx eslint --fix .

# 포맷팅 실행
npx prettier --write .
```

#### 백엔드

```bash
# 린팅 실행
flake8 .

# 포맷팅 실행
black .
```

### 새 파일 생성 시

새 파일을 만들 때는 템플릿을 활용하세요:

- React 컴포넌트: [ComponentTemplate.tsx](./frontend/templates/ComponentTemplate.tsx)
- API 엔드포인트: [api_endpoint_template.py](./backend/templates/api_endpoint_template.py)

## AI 어시스턴트 사용 시 지침

AI 어시스턴트(GitHub Copilot, ChatGPT 등)를 사용할 때는 다음 프롬프트를 포함하여 일관된 스타일을 유지하세요:

```
이 프로젝트는 STYLE_GUIDE.md에 정의된 엄격한 코딩 스타일 가이드를 따릅니다.
다음 템플릿 구조와 주석 형식을 준수하여 코드를 생성해 주세요.
React 컴포넌트는 frontend/templates/ComponentTemplate.tsx를,
API는 backend/templates/api_endpoint_template.py를 참고하세요.
```
