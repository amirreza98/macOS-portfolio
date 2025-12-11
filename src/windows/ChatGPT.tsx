import { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";
import {Typewriter} from "#components"
import { AlignJustify } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

function ChatGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    setInput("");

    const res = await fetch("http://localhost:3001/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();

    setMessages([...messages, userMessage, { role: "assistant", content: data.answer }]);
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="chatgpt" />
        <h2>Chat GPT</h2>
      </div>
      <div className="rounded-b-lg bg-white shadow-2xl drop-shadow-2xl" style={{border:"1px solid #ddd"}}>
        <div className="min-h-120 max-h-160 mb-2 overflow-y-scroll w-3xl break-words overflow-x-hidden flex flex-col justify-end">
          {messages.map((m,i)=>(
            <div className={`relative rounded-xl m-4 p-4
              ${m.role === "user" ? "bg-gray-300 text-right" : "bg-gray-100 text-left break-words whitespace-pre-wrap"}
            `}>
              <b>{m.role === "user" ? "You" : "AI assistant"}</b> <br/>

              {m.role === "assistant" ? <Typewriter text={m.content} /> : m.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex flex-row min-h-12 bg-gray-200 rounded-xl break-words m-4">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="type your prompt.."
            className="w-full p-2 max-h-28 overflow-y-scroll text-black break-words resize-none" 
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // جلوی خط جدید
                handleSend(e);
              }
            }}
          />
          <button type="submit" className="bg-white p-2 rounded-4xl">Send</button>
        </form>
      </div>
    </>
    
  );
}


const ChatGPTWindow = WindowWrapper(ChatGPT, 'chatgpt')

export default ChatGPTWindow;
