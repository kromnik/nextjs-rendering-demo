import { Post } from "@/lib/api";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{post.title}</h3>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>User ID: {post.userId}</span>
        <span>Post ID: {post.id}</span>
      </div>
    </div>
  );
}