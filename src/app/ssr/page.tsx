// app/ssr/page.tsx
import { getPosts } from "@/lib/api";
import Link from "next/link";

export default async function SSRListPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Server-Side Rendered List (SSR)
      </h2>

      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-center text-blue-700">
          💡 Каждый пост ниже ссылается на отдельную страницу рендеринга на
          стороне сервера. Нажмите на любой пост, чтобы увидеть SSR в действии
          для динамического контента.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/ssr/${post.id}`}
            className="block hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Post ID: {post.id}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  View SSR Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          SSR Характеристики :
        </h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Эта страница отрисовывается на сервере при каждом запросе</li>
          <li>•  Данные всегда свежие из API</li>
          <li>• Подходит для часто обновляемого контента</li>
          <li>• Медленнее, чем SSG, но обеспечивает актуальность данных</li>
        </ul>
      </div>
    </div>
  );
}
