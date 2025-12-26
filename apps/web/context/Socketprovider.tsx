"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => any;
  messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([])


  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("Send message", msg);
      if (socket) {
        socket.emit("event: message", { message: msg });
      }
    },
    [socket]
  );

  const onMessageReceived = useCallback((msg: any) => {
    console.log("From Server Message Recovered", msg);
    let message: string;
    if (typeof msg === "string") {
      try {
        const parsed = JSON.parse(msg);
        message = typeof parsed === "object" ? parsed.message ?? JSON.stringify(parsed) : String(parsed);
      } catch {
        message = msg;
      }
    } else if (msg && typeof msg === "object") {
      message = msg.message ?? JSON.stringify(msg);
    } else {
      message = String(msg);
    }
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageReceived);
    setSocket(_socket);
    return () => {
      _socket.off("message", onMessageReceived);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
