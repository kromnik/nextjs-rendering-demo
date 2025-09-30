import { Post } from "@/lib/api";
import { PostCard } from "./PostCard";

type PostListProps = {
  posts: Post[];
  title?: string;
};

export const PostList = ({ posts, title = "Posts" }: PostListProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
