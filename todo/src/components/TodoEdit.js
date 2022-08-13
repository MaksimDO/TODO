import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Создание компонента приложения 
const TodoEdit = function({todo, todos, setTodo, setTodos, select, setSelect, click, setClick}) {
  
  const [calendarValue, onChangeCalendar] = useState(new Date())

    // Реализация создания заметок 
    const addTodo = function() {
      setClick({
        add: false,
        edit: true,
        delete: true,
        started: true,
        completed: true
      })
        if (todo.trim() !== '') {
          const newTodo = {
            id: Date.now(),
            title: todo,
            status: null,
          }
          setTodos((todos) => [...todos, newTodo])
          setTodo('')
        } else {
          alert('Введите задачу')
          setTodo('')
        }
      }

      // Реализация удаления заметок 
      const deleteTodo = function(id) {
        setClick({
          add: true,
          edit: true,
          delete: false,
          started: true,
          completed: true
        })
        if (select) {
          let Todo = [...todos].filter(TODO => TODO.id !== id)
          setTodos(Todo)
          setTodo('')
          setSelect(null)
        } else {
          alert('Выберете задачу')
        }
      }

      // Реализация редактирования заметок
      const editTodo = function(id) {
        setClick({
          add: true,
          edit: false,
          delete: true,
          started: true,
          completed: true
        })
        if (todo.trim() !== '') {
          let Todo = [...todos].map(TODO => {
            if (TODO.id === id) {
              TODO.title = todo
            }
            return TODO
          })
          setTodos(Todo)
          setTodo('')
          setSelect(null)
        } else {
          alert('Выберете задачу')
          setTodo('')
        }
      }

      // Реализация индикации состояния прогресса выполнения заметок (в процессе)
      const startedTodo = function(id) {
        setClick({
          add: true,
          edit: true,
          delete: true,
          started: false,
          completed: true
        })
        if (select) {
          let Todo = [...todos].map(TODO => {
            if (TODO.id === id) {
              TODO.status = true
            }
            return TODO
          })
          setTodos(Todo)
          setTodo('')
          setSelect(null)
        } else {
          alert('Выберете задачу')
        }
      }
      
      // Реализация индикации состояния прогресса выполнения заметок (выполнена)
      const completedTodo = function(id) {
        setClick({
          add: true,
          edit: true,
          delete: true,
          started: true,
          completed: false
        })
        if (select) {
          let Todo = [...todos].map(TODO => {
            if (TODO.id === id) {
              TODO.status = false
            }
            return TODO
          })
          setTodos(Todo)
          setTodo('')
          setSelect(null)
        } else {
          alert('Выберете задачу')
        }
      }

    return (
        <>
            <div className="todo-edit">
                {/* Заголовок */}
                <h1 className="todo-title">EDIT TODO LIST</h1>
                {/* Элемент создания и редактирования заметок */}
                <div className="todo-edit-section-input">
                    <input 
                        type="text" 
                        value={todo} 
                        onChange={e => setTodo(e.target.value)} 
                        className="todo-edit-input" 
                        placeholder="Задача..."></input>
                    <div style={{display: "flex"}}>
                    <button 
                        onClick={addTodo} 
                        className={click.add === true ? "todo-edit-add btn" : "todo-edit-add btn-click"}
                    >Создать</button>
                    <button 
                        onClick={() => editTodo(select, todo)} 
                        className={click.edit === true ? "todo-edit-edit btn" : "todo-edit-edit btn-click"}
                    >Редактировать</button>
                    </div>
                </div>
                {/* Элемент редактирования заметок */}
                <div className="todo-edit-section-edit">
                    <button 
                        onClick={() => deleteTodo(select)} 
                        className={click.delete === true ? "todo-edit-delete btn" : "todo-edit-delete btn-click"}
                    >Удалить</button>
                    <button 
                        onClick={() => startedTodo(select)} 
                        className={click.started === true ? "todo-edit-started btn" : "todo-edit-started btn-click"}
                    >В процессе</button>
                    <button 
                        onClick={() => completedTodo(select)} 
                        className={click.completed === true ? "todo-edit-completed btn" : "todo-edit-completed btn-click"}
                    >Выполнена</button>
                </div>
                {/* Календарь */}
                <div className="todo-edit-section-calendar">
                    <Calendar 
                        onChange={onChangeCalendar} 
                        value={calendarValue} 
                        className="calendar"
                    ></Calendar>
                </div>
            </div>
        </>
    )
}

export default TodoEdit
