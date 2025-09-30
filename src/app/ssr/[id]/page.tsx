import { getPost } from '@/lib/api';
import { PostCard } from '@/components/posts/PostCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Отключаем статическую генерацию для этой страницы, делаем её рендеринг на сервере при каждом запросе
export const dynamic = 'force-dynamic';

interface SSRPageProps {
  params: Promise<{ id: string }>;
}

export default async function SSRPage({ params }: SSRPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Server-Side Rendered (SSR)
        </h2>
        <p className="text-gray-600">
          Individual Post Details - рендерятся на сервере для каждого запроса
        </p>
      </div>

      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-800">SSR Active</h3>
            <p className="text-green-700 text-sm">
              Эта страница была отрисована на сервере в: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <Link 
            href="/ssr"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            ← Back to SSR List
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <PostCard post={post} />
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-gray-200 rounded-lg">
        <p className="text-center text-gray-600">
          🔄 Обновите страницу, чтобы увидеть новую временную метку - доказательство рендеринга на стороне сервера при каждом запросе!
        </p>
      </div>
    </div>
  );
}