import { useState, useEffect } from "react";

/**
 * Component 컴포넌트
 *
 * 주요 구성:
 * 1. [주요 영역 1]: [설명]
 * 2. [주요 영역 2]: [설명]
 *
 * 특징:
 * - [특징 1]
 * - [특징 2]
 *
 * 마지막 업데이트: [작업자/AI 이름] (YYYY-MM-DD)
 */

// =====================
// 타입 정의
// =====================
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// =====================
// 상수
// =====================
const CONSTANT_VALUE = "value";

// =====================
// 컴포넌트 정의
// =====================
const Component: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // ---------------------
  // 상태 및 변수
  // ---------------------
  const [state, setState] = useState<string>("");

  // ---------------------
  // 부수 효과
  // ---------------------
  useEffect(() => {
    // 효과 코드
  }, []);

  // ---------------------
  // 이벤트 핸들러
  // ---------------------
  const handleEvent = () => {
    setState(CONSTANT_VALUE);
  };

  // ---------------------
  // 렌더링
  // ---------------------
  return (
    <div className="component-container">
      <h1>{prop1}</h1>
      <p>{state}</p>
      <button onClick={handleEvent}>Action</button>
    </div>
  );
};

export default Component;
