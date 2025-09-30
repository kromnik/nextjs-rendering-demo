'use client';

import { useState, useEffect } from "react";
import { getPosts, Post } from "@/lib/api";
import { PostList } from "@/components/posts/PostList";

export default function IsrPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка и автоматическое обновление
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLastUpdate(new Date().toLocaleTimeString());
        setUpdateCount(prev => prev + 1);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData(); // Первая загрузка

    // Авто-обновление каждые 10 секунд
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-gray-500">Loading ISR page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-blue-800">
          🕒 Страница автоматически обновляется каждые 10 секунд
        </p>
        <p className="text-blue-600 text-sm mt-1">
          Последнее обновление: <strong>{lastUpdate}</strong> • Количество обновлений: <strong>{updateCount}</strong>
        </p>
      </div>

      <PostList posts={posts} title="Incremental Static Regeneration (ISR)" />
    </div>
  );
}