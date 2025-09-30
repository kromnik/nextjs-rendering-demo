'use client';

import { usePostsWebSocket } from '@/hooks/use-posts-websocket';

export default function WebSocketPage() {
  const { notifications } = usePostsWebSocket();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Real-time Post Notifications
      </h2>

      {/* Уведомления о действиях с постами */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Уведомлений пока нет. Создайте пост на CSR странице, чтобы видеть обновления в режиме реального времени здесь!
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.timestamp} className="bg-white rounded-lg shadow-md border-l-4 border-blue-500 p-6">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  notification.type === 'post_created' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {notification.type === 'post_created' ? 'New Post' : 'Post Updated'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2">{notification.post.title}</h3>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Post ID: {notification.post.id}</span>
                <span>User ID: {notification.post.userId}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Как это работает:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Перейдите на страницу CSR и создайте новый пост</li>
          <li>• WebSocket получит уведомление в режиме реального времени</li>
          <li>• Уведомление появится здесь мгновенно. Ограничено последними 10 уведомлениями</li>
          <li>• Посты сохраняются в контексте между переходами по страницам</li>
        </ul>
      </div>
    </div>
  );
}