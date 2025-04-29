import React from "react";
import { colors, spacing, layout } from "../../config/theme";

/**
 * 헤더 컴포넌트
 *
 * 주요 구성:
 * 1. 좌측 영역: 햄버거 메뉴와 타이틀
 * 2. 우측 영역: 로그인/계정 정보
 *
 * 특징:
 * - 사이드바 토글 기능
 * - 반응형 디자인 대응
 * - 로그인 상태에 따른 UI 변경
 *
 * 마지막 업데이트: GitHub Copilot (2025-04-29)
 */

// =====================
// 타입 정의
// =====================
export interface HeaderProps {
  isLoggedIn: boolean;
  toggleSidebar: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  title?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

// =====================
// 컴포넌트 정의
// =====================
const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  toggleSidebar,
  setIsLoggedIn,
  title = "ChatGPT",
  onLogin,
  onLogout,
}) => {
  // ---------------------
  // 이벤트 핸들러
  // ---------------------
  const handleLoginClick = () => {
    setIsLoggedIn(true);
    if (onLogin) onLogin();
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  // ---------------------
  // 렌더링
  // ---------------------
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${spacing.md} ${spacing.lg}`,
        borderBottom: "1px solid var(--border-color)",
        width: "100%",
        height: "var(--header-height)",
      }}
    >
      {/* 햄버거 메뉴 및 타이틀 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={toggleSidebar}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: spacing.borderRadius.sm, // 수정: 2025-04-29 16:31:00 KST (UTC+9) - layout.borderRadius.sm → spacing.borderRadius.sm
            marginRight: spacing.sm,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="메뉴 토글"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* 로그인 버튼 또는 프로필 */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogoutClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: spacing.borderRadius.circle, // 수정: 2025-04-29 17:00:00 KST (UTC+9) - layout.borderRadius.circle → spacing.borderRadius.circle
              backgroundColor: "var(--primary-color)",
              color: colors.text.light,
              border: "none",
              cursor: "pointer",
            }}
            aria-label="로그아웃"
          >
            <span>K</span>
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            style={{
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: "var(--border-radius-sm)",
              border: "1px solid var(--border-color)",
              backgroundColor: colors.background.light,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
