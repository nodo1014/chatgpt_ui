import React from "react";
import { colors, spacing, layout } from "../config/theme";

/**
 * 사이드바 컴포넌트
 *
 * 주요 구성:
 * 1. 상단 영역: 새 채팅 버튼 및 컨트롤
 * 2. 중간 영역: 대화 기록 목록 (날짜별 분류)
 * 3. 하단 영역: 설정 및 사용자 계정 관련 메뉴
 *
 * 특징:
 * - 반응형: 모바일에서는 오버레이 형태로 동작
 * - 접근성: 모든 컨트롤에 ARIA 역할 및 레이블 추가
 * - 커스터마이징: 테마 및 채팅 이력 전달 가능
 *
 * 마지막 업데이트: GitHub Copilot (2025-04-29)
 */

// =====================
// 타입 정의
// =====================
export interface ChatHistoryItem {
  id: string | number;
  name: string;
  date: string;
  onClick?: () => void;
}

export interface GroupedChatHistory {
  [key: string]: ChatHistoryItem[];
}

export interface SidebarProps {
  visible: boolean;
  isMobile: boolean;
  onClose: () => void;
  chatHistory?: ChatHistoryItem[];
  onNewChat?: () => void;
  onSettingsClick?: () => void;
  onUserProfileClick?: () => void;
  customBackgroundColor?: string;
  className?: string;
}

// =====================
// 컴포넌트 정의
// =====================
const Sidebar: React.FC<SidebarProps> = ({
  visible,
  isMobile,
  onClose,
  chatHistory = [],
  onNewChat,
  onSettingsClick,
  onUserProfileClick,
  customBackgroundColor,
  className = "",
}) => {
  // ---------------------
  // 상태 및 로직
  // ---------------------
  // 채팅 이력을 날짜별로 그룹화
  const groupChatsByDate = (chats: ChatHistoryItem[]): GroupedChatHistory => {
    return chats.reduce((groups: GroupedChatHistory, chat) => {
      const date = chat.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(chat);
      return groups;
    }, {});
  };

  const groupedChats = groupChatsByDate(chatHistory);

  // 날짜 그룹 정렬 순서 (오늘, 어제, 이번 주, 지난 주, 이번 달, 지난 달...)
  const dateOrder = [
    "오늘",
    "어제",
    "이번 주",
    "지난 주",
    "이번 달",
    "지난 달",
  ];

  // 정렬된 날짜 그룹 추출
  const sortedDateGroups = Object.keys(groupedChats).sort((a, b) => {
    return dateOrder.indexOf(a) - dateOrder.indexOf(b);
  });

  // ---------------------
  // 이벤트 핸들러
  // ---------------------
  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  // ---------------------
  // 렌더링
  // ---------------------
  return (
    <aside
      className={`sidebar ${className}`}
      style={{
        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: 0,
        bottom: 0,
        width: "var(--sidebar-width)",
        backgroundColor: customBackgroundColor || colors.neutral[50], // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 배경색을 아주 옅은 회색으로 변경
        color: colors.text.primary, // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 텍스트 색상 유지
        transform: visible ? "translateX(0)" : "translateX(-100%)",
        transition: "var(--transition-default)",
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 사이드바 내용 컨테이너 */}
      <div
        className="light-scrollbar sidebar-content"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "auto",
          padding: spacing.sm,
          gap: spacing.sm,
        }}
      >
        {/* 1. 상단 영역 - 새 채팅 버튼 */}
        <div style={{ padding: spacing.sm }}>
          <button
            onClick={handleNewChat}
            className="new-chat-button"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: `${spacing.md} ${spacing.md}`,
              borderRadius: spacing.borderRadius.md,
              border: "1px solid rgba(0, 0, 0, 0.05)", // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 테두리 색상을 더 연하게 변경
              color: colors.text.primary, // 수정: 2025-04-29 16:38:00 KST (UTC+9) - 텍스트 색상을 primary(어두운 색상)으로 변경
              background: "transparent",
              fontSize: "14px",
              fontWeight: 500,
              gap: spacing.sm,
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            새 채팅
          </button>
        </div>

        {/* 2. 중간 영역 - 대화 기록 (시간별 분류) */}
        <div
          className="chat-history-container"
          style={{ flex: 1, overflow: "auto" }}
        >
          {sortedDateGroups.map((date) => (
            <div key={date} className="chat-history-group">
              {/* 날짜 그룹 헤더 */}
              <div
                className="chat-date-header"
                style={{
                  padding: `${spacing.lg} ${spacing.md} 0`,
                  fontSize: "11px", // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 글자 크기 줄임
                  color: colors.text.secondary, // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 날짜 헤더 색상 유지
                  fontWeight: 500,
                }}
              >
                {date}
              </div>

              {/* 채팅 항목 목록 */}
              {groupedChats[date].map((chat) => (
                <button
                  key={chat.id}
                  onClick={chat.onClick}
                  className="chat-history-item"
                  style={{
                    width: "100%",
                    padding: `${spacing.md} ${spacing.md}`,
                    textAlign: "left",
                    borderRadius: spacing.borderRadius.md,
                    color: colors.neutral[700], // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 텍스트 색상을 ChatGPT 스타일로 변경
                    background: "transparent",
                    border: "none",
                    fontSize: "14px",
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  {chat.name}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* 3. 하단 영역 - 설정, 계정 */}
        <div
          className="sidebar-footer"
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.05)", // 수정: 2025-04-29 16:45:00 KST (UTC+9) - 구분선 색상을 더 연하게 변경
            padding: spacing.sm,
          }}
        >
          {/* 3-1. 설정 버튼 */}
          <button
            onClick={onSettingsClick}
            className="sidebar-footer-button"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: `${spacing.md} ${spacing.md}`,
              borderRadius: spacing.borderRadius.md,
              color: colors.text.primary, // 수정: 2025-04-29 16:38:00 KST (UTC+9) - 텍스트 색상을 primary(어두운 색상)으로 변경
              background: "transparent",
              border: "none",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: 500,
              gap: spacing.sm,
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            설정
          </button>

          {/* 3-2. 사용자 갱신 버튼 */}
          <button
            onClick={onUserProfileClick}
            className="sidebar-footer-button"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: `${spacing.md} ${spacing.md}`,
              borderRadius: spacing.borderRadius.md,
              color: colors.text.primary, // 수정: 2025-04-29 16:38:00 KST (UTC+9) - 텍스트 색상을 primary(어두운 색상)으로 변경
              background: "transparent",
              border: "none",
              textAlign: "left",
              fontSize: "14px",
              gap: spacing.sm,
              cursor: "pointer",
            }}
          >
            사용자 갱신
          </button>

          {/* 3-3. 모바일에서만 보이는 닫기 버튼 */}
          {isMobile && (
            <button
              onClick={onClose}
              className="sidebar-footer-button"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: `${spacing.md} ${spacing.md}`,
                borderRadius: spacing.borderRadius.md,
                color: colors.text.primary, // 수정: 2025-04-29 16:38:00 KST (UTC+9) - 텍스트 색상을 primary(어두운 색상)으로 변경
                background: "transparent",
                border: "none",
                textAlign: "left",
                fontSize: "14px",
                gap: spacing.sm,
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              닫기
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
