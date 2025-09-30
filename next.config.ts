import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Базовые настройки Next.js
  reactStrictMode: true,

  // Указываем корневую директорию для Turbopack
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
