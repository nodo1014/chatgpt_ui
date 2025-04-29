import { useState, useRef, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import Layout from "../components/Layout";

/**
 * 메인 채팅 페이지
 *
 * 주요 구성:
 * 1. 채팅 시작 화면: 메시지가 없을 때 타이틀, 설명, 제안 메시지 표시
 * 2. 채팅 메시지 영역: 사용자와 AI 간 대화 메시지 표시 (자동 스크롤)
 * 3. 로딩 표시: AI 응답 생성 중 표시되는 애니메이션
 *
 * 특징:
 * - 메시지 추가 시 자동 스크롤 (하단 유지)
 * - 새 메시지마다 자연스러운 애니메이션 효과
 * - 레이아웃 내에 콘텐츠 중앙 정렬
 *
 * 마지막 업데이트: Claude (2025-04-29)
 */
export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 메시지 전송 및 API 호출 처리
  const sendMessage = async (text: string) => {
    // 사용자 메시지 추가
    setMessages([...messages, { sender: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/infer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      // 잠시 지연 후 AI 응답 추가 (더 자연스러운 느낌을 위해)
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "ai", text: data.result }]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "죄송합니다. 요청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.",
        },
      ]);
      setLoading(false);
    }
  };

  // 새 메시지가 추가될 때마다 스크롤 아래로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      {/* 메인 콘텐츠 컨테이너 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          maxWidth: "1024px", // 더 넓게 조정
          margin: "0 auto", // 중앙 정렬
          position: "relative",
          paddingBottom: "140px", // ChatInput 공간 확보
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {messages.length === 0 ? (
          // 1. 채팅 시작 화면 (메시지 없을 때)
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "20px",
              textAlign: "center",
            }}
          >
            {/* 1-1. 시작 화면 타이틀 */}
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 600,
                marginBottom: "24px",
                color: "var(--primary-color)",
              }}
            >
              ChatGPT
            </h1>

            {/* 1-2. 시작 화면 설명 */}
            <div
              style={{
                fontSize: "18px",
                lineHeight: 1.6,
                color: "var(--text-primary)",
                maxWidth: "480px",
              }}
            >
              어떤 질문이든 자유롭게 물어보세요.
              <br />
              도움이 필요한 내용이 있다면 알려주세요.
            </div>

            {/* 1-3. 제안 질문 그리드 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
                maxWidth: "640px",
                marginTop: "32px",
              }}
            >
              {[
                "웹 개발 방법에 대해 알려줘",
                "Python으로 머신러닝 시작하기",
                "창업 아이디어 제안해줘",
                "다음 휴가 계획 세우기",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(suggestion)}
                  style={{
                    padding: "12px",
                    background: "#f7f7f8",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius-sm)",
                    fontSize: "14px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // 2. 채팅 메시지 영역 (대화 있을 때)
          <div style={{ padding: "16px" }}>
            {/* 2-1. 메시지 목록 */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 2-1-1. 메시지 헤더 (아이콘+이름) */}
                <div
                  style={{
                    display: "flex",
                    padding: "0 12px",
                    marginBottom: "8px",
                  }}
                >
                  {/* 사용자/AI 아이콘 */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "12px",
                      backgroundColor:
                        msg.sender === "user"
                          ? "#5436DA"
                          : "var(--primary-color)",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {msg.sender === "user" ? "U" : "AI"}
                  </div>

                  {/* 사용자/AI 이름 */}
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "28px",
                    }}
                  >
                    {msg.sender === "user" ? "You" : "ChatGPT"}
                  </div>
                </div>

                {/* 2-1-2. 메시지 내용 */}
                <div
                  style={{
                    padding: "0 12px 0 52px", // 아이콘 공간 고려
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* 2-2. 로딩 표시 (AI 응답 생성 중) */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  padding: "0 12px",
                  marginBottom: "8px",
                }}
              >
                {/* AI 아이콘 */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  AI
                </div>

                {/* 로딩 애니메이션 (..) */}
                <div style={{ paddingTop: "5px" }}>
                  <span className="loading-dots">
                    <span style={{ marginRight: "4px" }}>·</span>
                    <span style={{ marginRight: "4px" }}>·</span>
                    <span>·</span>
                  </span>
                </div>
              </div>
            )}

            {/* 2-3. 스크롤 자동 이동을 위한 참조 지점 */}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* 3. 채팅 입력 컴포넌트 */}
        <ChatInput onSend={sendMessage} />
      </div>

      {/* 로딩 애니메이션 스타일 */}
      <style jsx>{`
        .loading-dots {
          font-size: 24px;
          font-weight: bold;
        }
        .loading-dots span {
          animation: loading 1.4s infinite;
          display: inline-block;
        }
        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes loading {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
}
