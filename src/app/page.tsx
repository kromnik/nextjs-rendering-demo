export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Next.js Posts with Real-time Updates
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Это приложение демонстрирует различные методы рендеринга страницы в 
        next.js. Используйте навигацию выше, чтобы увидеть каждый подход на
        реальных примерах. Создайте сообщения и смотрите, как они появляются в
        режиме реального времени на странице WebSocket.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Что внутри
          </h3>
          <ul className="text-gray-600 text-left space-y-2">
            <li>
              • <strong>SSG</strong> - Static Generation во время сборки
            </li>
            <li>
              • <strong>ISR</strong> - Incremental Static Regeneration
            </li>
            <li>
              • <strong>SSR</strong> - Server-Side Rendering по запросу
            </li>
            <li>
              • <strong>CSR</strong> - Client-Side Rendering в браузере
            </li>
            <li>
              • <strong>WebSocket</strong> - Real-time уведомления
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Начало работы
          </h3>
          <ol className="text-gray-600 text-left space-y-2 list-decimal list-inside">
            <li>
              Используйте панель навигации для перехода между страницами
            </li>
            <li>
              Посетите <strong>CSR страницу</strong> для создания постов
            </li>
            <li>
              Проверьте <strong>WebSocket страницу</strong> для получения
              обновлений в реальном времени
            </li>
            <li>Сравните поведение загрузки между различными страницами</li>
          </ol>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl  text-blue-800 mb-3">
          Technical Stack
        </h2>
        <div className="text-blue-700 text-sm grid grid-cols-2 gap-2 text-left">
          <div>• Next.js 15 with App Router</div>
          <div>• React 19 with Server Components</div>
          <div>• TypeScript for type safety</div>
          <div>• Tailwind CSS for styling</div>
          <div>• JSONPlaceholder API</div>
          <div>• WebSocket for real-time</div>
        </div>
      </div>
    </div>
  );
}
