/**
 * UI 테마 설정을 위한 중앙 관리 파일
 *
 * 모든 색상, 간격, 폰트 크기, 애니메이션 등의 UI 관련 설정을
 * 한 곳에서 관리하여 일관된 디자인 시스템을 유지합니다.
 *
 * 사용법:
 * import { colors, spacing, typography } from '../config/theme';
 */

// 색상 팔레트 - 모든 색상을 여기서 정의
export const colors = {
  // 메인 테마 색상
  primary: {
    main: "#10a37f",
    light: "#1ac298",
    dark: "#0d8a6c",
    contrastText: "#FFFFFF",
  },

  // 보조 색상
  secondary: {
    main: "#6e6e80",
    light: "#8e8ea0",
    dark: "#4d4d5f",
    contrastText: "#FFFFFF",
  },

  // 중립/회색 계열
  neutral: {
    50: "#f7f7f8",
    100: "#ececf1",
    200: "#d9d9e3",
    300: "#c5c5d2",
    400: "#acacbe",
    500: "#8e8ea0",
    600: "#6e6e80",
    700: "#565869",
    800: "#343541",
    900: "#202123",
  },

  // 배경 색상
  background: {
    main: "#ffffff",
    secondary: "#f7f7f8",
    tertiary: "#ececf1",
  },

  // 텍스트 색상
  text: {
    primary: "#343541",
    secondary: "#6e6e80",
    disabled: "#acacbe",
    inverted: "#ffffff",
  },

  // 상태 색상
  status: {
    error: "#ef4146",
    warning: "#f5a623",
    info: "#2374e1",
    success: "#10a37f",
  },

  // 기타 색상
  divider: "#d9d9e3",
  overlay: "rgba(52, 53, 65, 0.5)",
};

// 간격 설정 - 여백, 패딩 등
export const spacing = {
  // 기본 단위
  xxs: "0.25rem", // 4px
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "3rem", // 48px
  xxl: "4rem", // 64px

  // 컴포넌트 특정 간격
  sidebar: {
    width: "260px",
    padding: "1rem",
  },

  header: {
    height: "64px",
    padding: "0 1rem",
  },

  container: {
    maxWidth: "1200px",
    padding: "0 1rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    circle: "50%",
  },
};

// 타이포그래피 설정
export const typography = {
  fontFamily: {
    main: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    code: '"SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },

  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    xxl: "2rem", // 32px
    xxxl: "3rem", // 48px
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// 레이아웃 관련 설정
export const layout = {
  zIndex: {
    modal: 1000,
    popup: 900,
    overlay: 800,
    sidebar: 700,
    header: 600,
    content: 1,
  },

  transitions: {
    default: "all 0.3s ease",
    fast: "all 0.15s ease",
    slow: "all 0.5s ease",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  breakpoints: {
    mobile: "480px", // 추가: 2025-04-29 16:31:00 KST (UTC+9) - Copilot
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
};

// 애니메이션 관련 설정
export const animations = {
  keyframes: {
    fadeIn: `
      from { opacity: 0; }
      to { opacity: 1; }
    `,
    slideIn: `
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    `,
    pulse: `
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    `,
  },

  duration: {
    fast: "0.2s",
    normal: "0.3s",
    slow: "0.5s",
  },

  timing: {
    default: "ease",
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
};

// 전역 CSS 변수 설정
export const cssVariables = {
  sidebarWidth: spacing.sidebar.width,
  headerHeight: spacing.header.height,
  containerMaxWidth: spacing.container.maxWidth,
};

// 기본 내보내기
export default {
  colors,
  spacing,
  typography,
  layout,
  animations,
  cssVariables,
};
