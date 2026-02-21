"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";

const chat_service =
    process.env.NEXT_PUBLIC_CHAT_SERVICE || "http://localhost:5007";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    unreadCount: number;
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    unreadCount: 0,
    setUnreadCount: () => { },
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) return;

        // Fetch initial unread count
        axios.get(`${chat_service}/api/chat/unread-count`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(({ data }) => {
            setUnreadCount((data as any).count || 0);
        }).catch(() => { /* ignore */ });

        // Create socket connection with JWT auth
        const newSocket = io(chat_service, {
            auth: { token },
            transports: ["websocket", "polling"],
        });

        newSocket.on("connect", () => {
            console.log("🟢 Socket connected");
            setIsConnected(true);
        });

        newSocket.on("disconnect", () => {
            console.log("🔴 Socket disconnected");
            setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
            setIsConnected(false);
        });

        // Listen for new message notifications (for unread badge)
        newSocket.on("new-message-notification", () => {
            setUnreadCount((prev) => prev + 1);
        });

        // Send heartbeat every 4 minutes to keep online status alive
        const heartbeatInterval = setInterval(() => {
            if (newSocket.connected) {
                newSocket.emit("heartbeat");
            }
        }, 4 * 60 * 1000);

        // Use setState so React re-renders and consumers get the socket
        setSocket(newSocket);

        return () => {
            clearInterval(heartbeatInterval);
            newSocket.disconnect();
            setSocket(null);
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket,
                isConnected,
                unreadCount,
                setUnreadCount,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

