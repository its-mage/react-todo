import React, { useState } from "react";
import "./AddTodo.css";

type AddEditTodoProps = {
  todo?: Todo;
  onSubmit: (todo: Todo, isEditFlag: boolean) => void;
  onCancel?: () => void;
  isEdit?: boolean;
};

const AddTodo = ({ onSubmit, isEdit = false }: AddEditTodoProps) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todoTitle) {
        return;
    }
    const todo = {
        title: todoTitle,
        description: todoDescription,
        id: Date.now()
    }
    onSubmit(todo, isEdit);
  }

  return (
    <>
      <div>
        <h1>Add todo</h1>
      </div>
      <form onSubmit={(e) => onSubmitTodo(e)}>
        <div className="form-item">
          <label htmlFor="todo">Todo</label>
        </div>
        <div className="form-item">
          <input
            type="text"
            placeholder="What needs to be done?"
            name="todo"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(() => e.target.value);
            }}
            required={true}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="description">Description</label>
        </div>
        <div className="form-item">
          <textarea
            about="description"
            name="description"
            aria-label="description"
            value={todoDescription}
            onChange={(e) => {
              setTodoDescription(() => e.target.value);
            }}
            placeholder="Tell me more"
          ></textarea>
        </div>
        <button className="btn btn-primary mr-2">Add</button>
        <button className="btn btn-secondary">Cancel</button>
      </form>
    </>
  );
};

export default AddTodo;

export type Todo = {
  id: number;
  title: string;
  description: string;
};
