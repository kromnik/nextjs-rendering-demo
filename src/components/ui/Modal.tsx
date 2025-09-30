"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { createPost, Post, CreatePostRequest } from "@/lib/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

export const Modal = ({ isOpen, onClose, onPostCreated }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Закрытие на Escape
  useEffect(() => {
    console.log("Modal isOpen:", isOpen);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    console.log("title:", title, "body:", body);
  }, [title, body]);

  // Закрытие на overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Обработка загрузки файла если нужно
      // Здесь просто выводим информацию о файле в консоль
      const file = fileInputRef.current?.files?.[0] || null;
      if (file) {
        console.log("Selected file:", file.name, file.type);
      }

      const postData: CreatePostRequest = { title, body, userId: 1 };
      const newPost = await createPost(postData);

      alert("Пост успешно создан! Проверьте Websocket страницу");
      console.log("Created post:", newPost);
      onPostCreated(newPost); // Передаем данные наружу (для обновления списка)

      // Сброс формы и закрытие модалки
      setTitle("");
      setBody("");
      // setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Ошибка создания поста.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${
        !isOpen ? "hidden" : "" // условие видимости
      }`}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create New Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Input - Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Заголовок поста *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Пишите здесь..."
              />
            </div>

            {/* Textarea Input для тела поста) */}
            <div>
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Пост *
              </label>
              <textarea
                id="body"
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Пишите здесь..."
              />
            </div>

            {/* File Input */}
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Прикрепить файл
              </label>
              <input
                id="file"
                type="file"
                ref={fileInputRef}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
