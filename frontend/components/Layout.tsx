import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./layout/Header";
import { useLayout } from "../lib/hooks/useLayout";
import { colors, layout, spacing } from "../config/theme";

/**
 * 메인 레이아웃 컴포넌트
 *
 * 기능:
 * - 반응형 레이아웃: 모바일/데스크톱 자동 감지
 * - 헤더와 사이드바 제공
 * - 자동 상태 관리: 로그인 여부에 따라 UI 조정
 * - 컨텐츠 영역 동적 조절: 사이드바 상태에 따라 너비 조정
 *
 * 사용법:
 * ```jsx
 * <Layout>
 *   <YourContent />
 * </Layout>
 * ```
 *
 * 커스터마이징:
 * - `theme.ts`에서 색상 및 레이아웃 설정 가능
 * - `className` 속성으로 스타일 오버라이드 가능
 * - 헤더 및 사이드바 표시 여부 설정 가능
 *
 * 마지막 업데이트: GitHub Copilot (2025-04-29)
 */

export interface LayoutProps {
  /** 레이아웃 내에 표시할 컨텐츠 */
  children: React.ReactNode;
  /** 사이드바 사용 여부 (기본값: true) */
  useSidebar?: boolean;
  /** 헤더 사용 여부 (기본값: true) */
  useHeader?: boolean;
  /** 초기 로그인 상태 (기본값: false) */
  initialLoggedIn?: boolean;
  /** 초기 사이드바 표시 상태 (기본값: false) */
  initialSidebarVisible?: boolean;
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** 로그인 상태 변경 콜백 */
  onLoginStateChange?: (isLoggedIn: boolean) => void;
  /** 사이드바 상태 변경 콜백 */
  onSidebarStateChange?: (isVisible: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  useSidebar = true,
  useHeader = true,
  initialLoggedIn = false,
  initialSidebarVisible = false,
  className = "",
  onLoginStateChange,
  onSidebarStateChange,
}) => {
  // 레이아웃 훅을 통한 상태 관리: 로그인, 모바일 여부, 사이드바 표시 상태
  const {
    isLoggedIn,
    setIsLoggedIn,
    isMobile,
    sidebarVisible,
    setSidebarVisible,
    toggleSidebar,
  } = useLayout({
    initialLoggedIn,
    initialSidebarVisible,
  });

  // 로그인 상태 변경 시 콜백 호출
  useEffect(() => {
    if (onLoginStateChange) {
      onLoginStateChange(isLoggedIn);
    }
  }, [isLoggedIn, onLoginStateChange]);

  // 사이드바 상태 변경 시 콜백 호출
  useEffect(() => {
    if (onSidebarStateChange) {
      onSidebarStateChange(sidebarVisible);
    }
  }, [sidebarVisible, onSidebarStateChange]);

  // CSS 변수를 문서에 추가하여 채팅 입력창 조정에 사용
  useEffect(() => {
    if (!isMobile && sidebarVisible && useSidebar) {
      document.documentElement.style.setProperty(
        "--sidebar-visible-width",
        "var(--sidebar-width)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--sidebar-visible-width",
        "0px"
      );
    }
  }, [sidebarVisible, isMobile, useSidebar]);

  return (
    <div
      className={`layout-container ${className}`}
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: colors.background.main,
        color: colors.text.primary,
      }}
    >
      {/* 1. 배경 오버레이 (모바일 사이드바 오픈 시) */}
      {isMobile && sidebarVisible && useSidebar && (
        <div
          className="mobile-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* 2. 사이드바 영역 */}
      {useSidebar && (
        <Sidebar
          visible={sidebarVisible}
          isMobile={isMobile}
          onClose={() => setSidebarVisible(false)}
          chatHistory={[
            {
              id: "chat1",
              name: "웹 개발 프로젝트에 대해 논의",
              date: "오늘",
            },
            {
              id: "chat2",
              name: "React 상태관리 질문",
              date: "오늘",
            },
            {
              id: "chat3",
              name: "코드 최적화 방법",
              date: "어제",
            },
            {
              id: "chat4",
              name: "디자인 패턴 비교",
              date: "이번 주",
            },
            {
              id: "chat5",
              name: "API 설계 질문",
              date: "지난 주",
            },
          ]}
          onNewChat={() => console.log("새 채팅 시작")}
          onSettingsClick={() => console.log("설정 열기")}
          onUserProfileClick={() => console.log("사용자 프로필 열기")}
        />
      )}

      {/* 3. 메인 콘텐츠 영역 (헤더 + 컨텐츠) */}
      <div
        className="content-container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "absolute",
          left:
            !isMobile && sidebarVisible && useSidebar
              ? "var(--sidebar-width)"
              : 0,
          right: 0,
          width:
            !isMobile && sidebarVisible && useSidebar
              ? "calc(100% - var(--sidebar-width))"
              : "100%",
          transition: layout.transitions.default,
        }}
      >
        {/* 3-1. 상단 헤더 영역 */}
        {useHeader && (
          <Header
            isLoggedIn={isLoggedIn}
            toggleSidebar={useSidebar ? toggleSidebar : () => {}}
            setIsLoggedIn={setIsLoggedIn} // 수정: 2025-04-29 16:50:00 KST (UTC+9) - 누락된 setIsLoggedIn 함수 전달
            title="ChatGPT"
            onLogin={() => console.log("로그인 성공")} // 추가: 2025-04-29 16:50:00 KST (UTC+9) - onLogin 콜백 추가
            onLogout={() => console.log("로그아웃 성공")} // 추가: 2025-04-29 16:50:00 KST (UTC+9) - onLogout 콜백 추가
          />
        )}

        {/* 3-2. 메인 컨텐츠 영역 */}
        <div
          className="main-content light-scrollbar"
          style={{
            flex: 1,
            overflow: "auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: spacing.sm,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
