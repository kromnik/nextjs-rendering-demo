'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '@/lib/api';
import { PostNotification } from '@/hooks/use-posts-websocket';

interface PostsContextType {
  posts: Post[];
  notifications: PostNotification[];
  hasLoadedInitialPosts: boolean; // Флаг в контексте
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
  setHasLoadedInitialPosts: (value: boolean) => void; // Установка флага
  addNotification: (notification: PostNotification) => void;
  // clearNotifications: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<PostNotification[]>([]);
  const [hasLoadedInitialPosts, setHasLoadedInitialPosts] = useState(false); // Флаг ТЕПЕРЬ В КОНТЕКСТЕ

  const addPost = (newPost: Post) => {
    console.log('📝 Adding post to context:', newPost.title);
    setPosts(prev => [newPost, ...prev]);
  };

   const setPostsGlobal = (newPosts: Post[]) => {
    console.log('📥 Setting posts in context:', newPosts.length);
    setPosts(newPosts);
  };

  const addNotification = (notification: PostNotification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Ограничиваем 10 уведомлениями
  };

  // const clearNotifications = () => {
  //   setNotifications([]);
  // };

  return (
    <PostsContext.Provider value={{
      posts,
      notifications,
      hasLoadedInitialPosts, // Предоставляем флаг
      addPost,
      setPosts: setPostsGlobal,
      setHasLoadedInitialPosts, // Предоставляем установку флага
      addNotification,
      // clearNotifications
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }
  return context;
}