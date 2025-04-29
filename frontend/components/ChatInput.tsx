import { useState, useRef, useEffect } from "react";

/**
 * 채팅 입력 컴포넌트
 *
 * 주요 구성:
 * 1. 입력 영역: 사용자 메시지 입력 텍스트 영역 (자동 높이 조절)
 * 2. 전송 버튼: 메시지 전송 버튼 (입력 있을 때만 활성화)
 * 3. 안내 문구: 하단 알림 텍스트
 *
 * 특징:
 * - 텍스트 입력 시 자동 높이 조절
 * - 사이드바 상태에 맞춰 위치 및 너비 조정
 * - 엔터키로 메시지 전송 (Shift+Enter는 줄바꿈)
 *
 * 마지막 업데이트: Claude (2025-04-29)
 */
export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 영역의 높이를 내용에 맞게 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "12px 16px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 20%)",
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
        // transform으로 위치 조정
        transform: "translateX(var(--sidebar-visible-width, 0px))",
        width: "calc(100% - var(--sidebar-visible-width, 0px))",
        transition:
          "transform 0.4s cubic-bezier(.4,0,.2,1), width 0.4s cubic-bezier(.4,0,.2,1)",
      }}
      className="chat-input-container"
    >
      {/* 1. 입력창 컨테이너 */}
      <div
        style={{
          display: "flex",
          position: "relative",
          maxWidth: "1024px",
          width: "calc(100% - 40px)",
          borderRadius: "var(--border-radius-lg)",
          border: "1px solid var(--border-color)",
          backgroundColor: "#fff",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}
      >
        {/* 1-1. 텍스트 입력 영역 */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          style={{
            flex: 1,
            border: "none",
            padding: "12px 48px 12px 16px",
            outline: "none",
            resize: "none",
            fontSize: "16px",
            lineHeight: "24px",
            maxHeight: "200px",
            background: "transparent",
          }}
          rows={1}
        />

        {/* 1-2. 전송 버튼 */}
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            position: "absolute",
            right: "12px",
            bottom: "10px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            backgroundColor: input.trim() ? "var(--primary-color)" : "#E5E5E5",
            color: "#fff",
            cursor: input.trim() ? "pointer" : "not-allowed",
            transition: "background-color 0.2s",
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
              d="M22 2L15 22L11 13L2 9L22 2Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 2. 하단 알림 문구 */}
      <div
        style={{
          position: "absolute",
          bottom: "4px",
          fontSize: "11px",
          color: "var(--text-secondary)",
          width: "100%",
          textAlign: "center",
        }}
      >
        ChatGPT는 AI 비서로, 때때로 부정확한 정보를 생성할 수 있습니다.
      </div>
    </div>
  );
}
