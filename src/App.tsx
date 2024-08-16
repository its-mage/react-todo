import React, { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Dialog from './components/Dialog/Dialog';
import AddTodo, { Todo } from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState<boolean>(false);

  function appendTodo(todo: Todo, isEditFlag: boolean) {
    const existingTodos = [...todos];
    if (!isEditFlag) {
      existingTodos.push(todo);
    } else {
      const index = existingTodos.findIndex((t) => t.id === todo.id)
      existingTodos[index] = todo
    }
    setTodos(existingTodos);
    setIsAddTodoDialogOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo APP</h1>
        {
        todos.length > 0 ? 
          todos.map((todo, index) => <Card key={index} title={todo?.title} description={todo?.description} />) 
          : 
          <p>No todos added</p>
        }
        <button className='btn btn-primary' onClick={() => setIsAddTodoDialogOpen(true)}>Add Todo</button>
        {
          isAddTodoDialogOpen ? (
            <Dialog
             isClickOutsideToClose={false}
             isOpen={isAddTodoDialogOpen}
             onClose={() => setIsAddTodoDialogOpen(false)}
            >
              <AddTodo
                onSubmit={(todo, isEditFlag) => appendTodo(todo, isEditFlag)}
                isEdit={false}
              ></AddTodo>
            </Dialog>
          ) : (<></>)
        }
      </header>
    </div>
  );
}

export default App;
