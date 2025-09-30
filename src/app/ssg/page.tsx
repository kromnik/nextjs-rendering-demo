import { getPosts } from '@/lib/api';
import { PostList } from '@/components/posts/PostList';

// По умолчанию в app router страницы статические, но можно явно указать
export const dynamic = 'force-static';

export default async function SsgPage() {
  const posts = await getPosts();

  return (
    <div>
      <p className="text-center w-[75%] mx-auto mb-8 bg-blue-50 border border-blue-200 text-blue-500">
        💡 Эта страница была предварительно отрендерена во время сборки. <br />
           Данные извлекаются один раз во время сборки и используются повторно для каждого запроса.
      </p>
      <PostList posts={posts} title="Statically Generated (SSG)" />
    </div>
  );
}