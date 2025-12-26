import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../lib/useTodos";

function fmt(ts) {
  if (!ts) return "—";
  //ts为时间戳，没有时间时显示横杠防止报错
  return new Date(ts).toLocaleString();
}
//时间戳转化为易于阅读的时间

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, toggleTodo, removeTodo } = useTodos();

  const todo = getTodoById(id);
  //获取id和todo

  if (!todo) {
    return (
      <div className="grid gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
        <div className="font-medium text-stone-900">
          TODO not found
        </div>
        <div className="text-stone-500">
          这条TODO好像走丢啦
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{todo.title || "（无标题）"}</h3>
          <Link
            to="/"
            className="
              ml-auto
              inline-flex items-center gap-1
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95
            "
          >
            ← 返回列表
          </Link>
      </div>

      <div style={{ display: "grid", gap: 6, opacity: 0.85 }}>
        <div>
          状态：<b>{todo.done ? "已完成" : "未完成"}</b>
        </div>
        <div>期望完成时间：{fmt(todo.dueAt)}</div>
        <div>创建时间：{fmt(todo.createdAt)}</div>
        <div>上次编辑：{fmt(todo.updatedAt)}</div>
        <div>完成时间：{todo.completedAt ? fmt(todo.completedAt) : "—"}</div>
      </div>

      {todo.description ? (
        <div
          style={{
            padding: 12,
            whiteSpace: "pre-wrap",
            //可以显示输入的换行
          }}
        >
          {todo.description}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}>（无描述）</div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
        className="
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95"
               onClick={() => toggleTodo(todo.id)}>
          {todo.done ? "标记为未完成" : "标记为已完成"}
        </button>

        <button
        className="
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95"
          onClick={() => {
            navigate(`/todo/${todo.id}/edit`);//不可以用双引号！！双引号无法调用todo.id
          }}
        >
          编辑
        </button>

        <button
        className="
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95"
          onClick={() => {
            removeTodo(todo.id);
            navigate("/");
          }}
        >
          删除
        </button>
      </div>
    </div>
  );
}
