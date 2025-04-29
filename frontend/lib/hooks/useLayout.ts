/**
 * 레이아웃 관련 커스텀 훅
 *
 * 레이아웃 상태 관리 및 반응형 디자인을 위한 훅
 * - 사이드바 표시 여부
 * - 디바이스 타입 (모바일/데스크톱)
 * - 테마 변수 설정
 *
 * 마지막 업데이트: GitHub Copilot (2025-04-29 16:32:00 KST (UTC+9))
 */
import { useState, useEffect } from "react";
import { layout } from "../../config/theme"; // 수정: breakpoints를 직접 가져오지 않고 layout 객체를 가져옵니다

// =====================
// 타입 정의
// =====================
export interface LayoutState {
  isMobile: boolean;
  sidebarVisible: boolean;
  isLoggedIn: boolean;
  toggleSidebar: () => void;
  setSidebarVisible: (visible: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

/**
 * 레이아웃 상태 관리를 위한 커스텀 훅
 */
export function useLayout(): LayoutState {
  // 상태 관리: 로그인, 모바일 여부, 사이드바 표시 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // 반응형 디자인을 위한 리사이즈 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < parseInt(layout.breakpoints.sm)); // 수정: layout.breakpoints.sm 사용 (480px 대신)
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모바일에서는 기본적으로 사이드바 숨김
  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(isLoggedIn);
    }
  }, [isMobile, isLoggedIn]);

  // CSS 변수를 문서에 추가하여 채팅 입력창 조정에 사용
  useEffect(() => {
    if (!isMobile && sidebarVisible) {
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
  }, [sidebarVisible, isMobile]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return {
    isMobile,
    sidebarVisible,
    isLoggedIn,
    toggleSidebar,
    setSidebarVisible,
    setIsLoggedIn,
  };
}
