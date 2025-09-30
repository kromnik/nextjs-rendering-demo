"use client";

import { useState, useEffect, useCallback } from "react";
import { getPosts, Post } from "@/lib/api";
import { PostList } from "@/components/posts/PostList";
import { Modal } from "@/components/ui/Modal";
import { usePostsWebSocket } from "@/hooks/use-posts-websocket";
import { usePostsContext } from "@/contexts/posts-context";

export default function CsrPage() {
  // const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Используем контекст вместо локального состояния
  const {
    posts,
    setPosts,
    addPost,
    hasLoadedInitialPosts,
    setHasLoadedInitialPosts,
  } = usePostsContext();

  // Используем хук WebSocket для отправки уведомлений
  const { sendPostNotification } = usePostsWebSocket();

  // Загружаем посты с API только ПРИ ПЕРВОМ монтировании
  const loadInitialPosts = useCallback(async () => {
    // Если уже загружали посты - не загружаем снова
    if (hasLoadedInitialPosts) {
      return;
    }

    setIsLoading(true);
    try {
      const initialPosts = await getPosts();
      setPosts(initialPosts);
      setHasLoadedInitialPosts(true); // Помечаем что загрузили
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [hasLoadedInitialPosts, setPosts, setHasLoadedInitialPosts]);

  useEffect(() => {
    loadInitialPosts();
  }, [loadInitialPosts]);

  // Поиск постов
  // const handleSearch = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const results = await searchPosts(query, posts);
  //     setPosts(results);
  //   } catch (error) {
  //     console.error("Error searching posts:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Добавление нового поста
  const handlePostCreated = (newPost: Post) => {
    addPost(newPost); // Добавляем пост в контекст

    // Отправляем уведомление через WebSocket (демо)
    sendPostNotification({
      type: "post_created",
      post: {
        id: newPost.id,
        title: newPost.title,
        userId: newPost.userId,
      },
      timestamp: new Date().toISOString(),
    });

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Client-Side Rendered (CSR)
      </h2>

      <div className="mb-8 p-6  bg-blue-50 rounded-lg shadow-md border border-blue-200">
        {/* <h3 className="text-xl font-semibold text-center text-blue-800 mb-4">
          Управление постами на стороне клиента
        </h3> */}
        <p className="text-blue-700 text-center">
          На этой странице демонстрируется рендеринг на стороне клиента CSR. Вся
          загрузка данных и управление состоянием происходит в браузере после
          первоначальной загрузки страницы. Ограничено первыми 10 постами
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Кнопка создания поста */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
          >
            Create New Post
          </button>

          <p className="text-blue-700 text-center">
            💡 После создания поста проверьте страницу WebSocket для получения уведомлений в режиме реального времени
          </p>

          {/* Поисковая форма */}
          {/* <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              Search
            </button>
          </form> */}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Loading posts...</div>
      ) : (
        <PostList
          posts={posts}
          title={`Результат загрузки(${posts.length} постов)`}
        />
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">
          CSR Характеристики:
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Быстрая начальная загрузка страницы </li>
          <li>
            • Данные загружаются после монтирования компонентов (useEffect)
          </li>
          <li>• Интерактивные функции работают без перезагрузки страницы</li>
          <li>
            • Подходит для панелей управления, админ-панелей,
            аутентифицированного контента
          </li>
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
