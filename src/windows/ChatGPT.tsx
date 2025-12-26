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
      <div id="window-header">
        <WindowControls target="chatgpt" />
        <h2>Chat GPT</h2>
      </div>

      <div
        className="flex flex-col rounded-b-lg h-170 bg-white shadow-2xl drop-shadow-2xl max-sm:w-screen"
      >
        <div className="flex-1 min-h-0 overflow-y-auto w-3xl break-words overflow-x-hidden flex flex-col shrink justify-end">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`relative rounded-xl m-4 p-4 ${
                m.role === "user"
                  ? "bg-gray-300 text-right"
                  : "bg-gray-100 text-left break-words whitespace-pre-wrap"
              }`}
            >
              <b>{m.role === "user" ? "You" : "AI assistant"}</b> <br />
              {m.role === "assistant" ? <Typewriter text={m.content} /> : m.content}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="shrink-0 sticky bottom-0 bg-white/10 border-2 border-gray-400 rounded-xl mx-4 p-2 flex items-end gap-2 transition-all"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type your prompt.."
            rows={1}
            className={`
              w-full text-black resize-none outline-0 overflow-hidden
              transition-all duration-200
              ${input.trim() ? "mb-8 min-h-[64px]" : "mb-0 h-8"}
            `}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
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
            className={`
              border-1 border-gray-400 p-2 rounded-full h-fit w-fit
              transition-all duration-700 ease-out
              ${input.trim()
                ? "opacity-100 -rotate-90"
                : "opacity-60 rotate-0 cursor-default"}
            `}
          >
            <ArrowRight color="black"/>
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 my-1">
          {`You have ${3-tokensUsed} tokens to use.`}
        </p>
      </div>
    </>
  );
}

const ChatGPTWindow = WindowWrapper(ChatGPT, "chatgpt");

export default ChatGPTWindow;
