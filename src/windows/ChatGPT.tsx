import { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";
import  Typewriter from "../components/Typewriter";
import { ArrowRight } from 'lucide-react';

type Message = { role: "user" | "assistant"; content: string };

function ChatGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [tokensUsed, setTokensUsed] = useState<number>(0);
  const MAX_TOKENS = 3;


  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!input.trim() || tokensUsed >= MAX_TOKENS) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://macos-portfolio-3exg.onrender.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage.content,
        }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setTokensUsed((prev) => prev + 1);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }
  }


  return (
    <>
      <div id="chatgpt-window">
        <div id="window-header">
          <WindowControls target="chatgpt" />
          <h2>Chat GPT</h2>
        </div>

        <div className="chatgpt-body">
          <div className="chatgpt-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-bubble ${m.role}`}
              >
                <b>{m.role === "user" ? "You" : "AI assistant"}</b>
                <br />
                {m.role === "assistant"
                  ? <Typewriter text={m.content} />
                  : m.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="chatgpt-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type your prompt.."
              rows={1}
              className={`chatgpt-textarea ${input.trim() ? "expanded" : ""}`}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = t.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                  (e.target as HTMLTextAreaElement).style.height = "";
                }
              }}
              disabled={tokensUsed >= MAX_TOKENS}
            />

            <button
              type="submit"
              disabled={!input.trim() || tokensUsed >= MAX_TOKENS}
              className={`send-btn ${input.trim() ? "active" : ""}`}
            >
              <ArrowRight />
            </button>
          </form>

          <p className="chatgpt-footer">
            {`You have ${MAX_TOKENS - tokensUsed} tokens to use.`}
          </p>
        </div>
      </div>
    </>
  );
}

const ChatGPTWindow = WindowWrapper(ChatGPT, "chatgpt");

export default ChatGPTWindow;
