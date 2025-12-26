//负责页面整体布局

import { Routes, Route, Link, Navigate, useLocation, useMatch } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage.jsx";
import TodoFormPage from "./pages/TodoFormPage.jsx";
import TodoDetailPage from "./pages/TodoDetailPage.jsx";

export default function App() {
  const location = useLocation();
  const isNew = location.pathname === "/todo/new";
  const isIndex = location.pathname === "/";
  const isEdit = useMatch("/todo/:id/edit") != null;
  const headerTitle = isNew ? "NEW" : isEdit ? "EDIT" : "TODO"

  return (
    //响应式调整距离
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12 lg:pt-16 pb-6">
        
        {/* 顶栏 */}
        <header className="mb-6 flex items-center gap-4">
          <h2 className="flex-1 text-xl font-semibold tracking-tight text-stone-900">
            {headerTitle}
          </h2>

          {isIndex && (
            //条件渲染,即只在根目录显示

            <Link
              to="/todo/new"
              className="
                inline-flex items-center gap-2
                rounded-xl
                bg-amber-50
                px-4 py-2
                text-sm font-medium text-white
                transition
                hover:bg-amber-100
                active:scale-95
              "
            >
              + 添加任务
            </Link>
          )}
        </header>

        {/* 内容 */}
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todo/new" element={<TodoFormPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="/todo/:id/edit" element={<TodoFormPage mode="edit" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </div>
  );
}
