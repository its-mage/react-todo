import React, { useState } from 'react';
import './App.css';
import Card, { CardProps } from './components/Card/Card';
import Dialog from './components/Dialog/Dialog';

function App() {
  const [todos] = useState<CardProps[]>([]);
  const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState<boolean>(false);

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
              <div>
                <h1>Add todo</h1>
              </div>
            </Dialog>
          ) : (<></>)
        }
      </header>
    </div>
  );
}

export default App;
