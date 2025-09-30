"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePostsContext } from '@/contexts/posts-context'; // Импортируем контекст

export interface PostNotification {
  type: "post_created";
  post: { id: number; title: string; userId: number };
  timestamp: string;
}

export function usePostsWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  
  // Используем контекст
  const { notifications, addNotification } = usePostsContext();

  // ДЕМО: эмуляция получения уведомлений
  const sendPostNotification = useCallback((notification: PostNotification) => {
    // Добавляем уведомление в контекст
    addNotification(notification);

    // Отправляем на эхо-сервер (демо отправки сообщения)
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          action: "post_created",
          demo: "This is being sent to echo server",
        })
      );
    }
  }, [addNotification]);

  useEffect(() => {
    // Подключаемся к эхо-серверу только для демо связи
    const ws = new WebSocket("wss://echo.websocket.events");
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log("✅ WebSocket connected (demo mode)");
    };

    ws.onmessage = (event) => {
      // Просто показываем что эхо-сервер работает
      console.log("📨 Echo server replied:", event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  return {
    isConnected,
    notifications, // Возвращаем notifications из контекста
    sendPostNotification,
  };
}
