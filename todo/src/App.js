import React, { useEffect, useState } from 'react';
import './App.css';
import TodoEdit from './components/TodoEdit';
import TodoList from './components/TodoList';

function App() {
  // Создание состояния для элемента списка дел (наименование заметок)
  const [todo, setTodo] = useState('')
  // Создание состояния для всего списка дел (получение элементов из localStorage)
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )
  // Создание состояния для выбранного элемента списка дел
  const [select, setSelect] = useState(null)
  // Создание состояния для поиска по имени элемента списка дел
  const [filter, setFilter] = useState('')

  // Занесение всех элементов из списка дел в localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Создание состояния для клика по кнопкам
  const [click, setClick] = useState({
    add: true,
    edit: true,
    delete: true,
    started: true,
    completed: true
  })
  // Возвращение изначального состояния для клика по кнопкам
  useEffect(() => {
    const interval = setInterval(() => {
      setClick({
        add: true,
        edit: true,
        delete: true,
        started: true,
        completed: true
      })
    }, 400);
    return () => clearInterval(interval);
  }, [click]);

  return (
    <div className="app">
      <div className="todo">
        <TodoList 
          todos={todos} 
          filter={filter} 
          setFilter={setFilter} 
          setTodo={setTodo} 
          select={select} 
          setSelect={setSelect}
        ></TodoList>
        <TodoEdit 
          todo={todo} 
          todos={todos} 
          setTodo={setTodo} 
          setTodos={setTodos} 
          select={select} 
          setSelect={setSelect} 
          click={click} 
          setClick={setClick}
        ></TodoEdit>
      </div>
    </div>
  );
}

export default App;
