import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm.jsx";
import { useTodos } from "../lib/useTodos";

export default function TodoFormPage({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createTodo, updateTodo, getTodoById } = useTodos();

  const isEdit = mode === "edit";
  //路由区分页面用途

  const initialValues = useMemo(() => {
    if (!isEdit) return { title: "", description: "", dueAt: null };
    return getTodoById(id) || null;
  }, [isEdit, id, getTodoById]);

if (isEdit && !initialValues) {
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
        <h4 style={{ margin: 0 }}>{isEdit ? "让这条TODO更准确一点！" : "又有新的挑战啦！"}</h4>
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

      <TodoForm
        initialValues={initialValues}
        submitText={isEdit ? "保存修改" : "创建"}
        onSubmit={(values) => {
            //复用
          if (isEdit) {
            updateTodo(id, values);
            navigate(`/todo/${id}`);//用id跳转路由
            //编辑
          } else {
            const created = createTodo(values);
            navigate(`/todo/${created.id}`);
            //新建
          }
        }}
      />
    </div>
  );
}
