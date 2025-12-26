
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/Socketprovider";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#071025]">
      <div className="w-full max-w-md h-[90vh] max-h-[640px] bg-white dark:bg-[#071126] rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">Scalable Chat</div>

        <div ref={messagesRef} className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-transparent">
          <ul className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <li
                key={i}
                className={
                  i % 2 === 0
                    ? "self-start bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl shadow-sm max-w-[75%] break-words"
                    : "self-end bg-gradient-to-r from-cyan-200 to-blue-200 text-slate-900 px-4 py-2 rounded-2xl shadow-sm max-w-[75%] break-words"
                }
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white dark:bg-[#071126] flex gap-3 items-center border-t border-gray-100 dark:border-gray-800">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 h-11 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white dark:bg-transparent text-black dark:text-white placeholder-gray-400"
            placeholder="Message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (message.trim()) sendMessage(message.trim());
                setMessage("");
              }
            }}
          />
          <button
            onClick={() => {
              if (message.trim()) sendMessage(message.trim());
              setMessage("");
            }}
            className="h-11 min-w-[64px] px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
