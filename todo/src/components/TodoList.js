import React, { useEffect, useMemo, useRef } from "react";

// Создание компонента приложения 
const TodoList = function({todos, filter, setFilter, setTodo, select, setSelect}) {
    // Реализация возможности изменения ширины списка наименований заметок 
    const ref = useRef(null)
    const refRight = useRef(null)
  
    useEffect(() => {
      const resizeableEle = ref.current
      const styles = window.getComputedStyle(resizeableEle)
      let width = parseInt(styles.width, 10)
      let x = 0
      
      // Вычисление ширины элемента при перемещении курсора мыши
      const onMouseMove = (event) => {
        const dx = event.clientX - x
        x = event.clientX
        width = width + dx
        resizeableEle.style.width = `${width}px`
      }
  
      // Удаляет обработчик события при отпускании кнопки мыши 
      const onMouseUp = (event) => {
        document.removeEventListener("mousemove", onMouseMove)
      }

      // Вычисление координаты и добавление обработчиков событий при нажатии кнопки мыши
      const onMouseDown = (event) => {
        x = event.clientX
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
      }
  
      const resizerRight = refRight.current
      resizerRight.addEventListener("mousedown", onMouseDown)
  
      return () => {
        resizerRight.removeEventListener("mousedown", onMouseDown)
      }
    }, [])

    // Реализация поиска заметок 
    const filterTodo = useMemo(() => {
        if (filter.trim() !== '') {
          return [...todos].filter(TODO => TODO.title.toLowerCase().includes(filter))
        }
          return todos
        setFilter('')
      }, [filter, todos])

      // Реализация функции выбора элемента заметок 
      const selectTodo = function(id, title) {
        if (select === id) {
          setSelect(null)
          setTodo('')
        } else {
          setSelect(id)
          setTodo(title)
        }
      }

    return (
        <>
            <div ref={ref} className="todo-list">
                {/* Заголовок */}
                <h1 className="todo-title">TODO&nbsp;LIST</h1>
                {/* Элемент поиска */}
                <div className="todo-list-filter">
                    <input
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="todo-list-input"
                        placeholder="Поиск..."
                    ></input>
                </div>
                {/* Создание всех элементов списка дел */}
                {filterTodo.map(todo =>
                    <div onClick={() => selectTodo(todo.id, todo.title)}
                        className= {select === todo.id ? "todo-list-item-active" : "todo-list-item"}
                        style={{ backgroundColor: 
                          (todo.status === true) ? 
                            "#8595A4" 
                          : 
                          (todo.status === false) ? 
                            "#85A090" 
                          :
                            "#C1CBD4" }}
                        key={todo.id}
                    >{todo.title}</div>
                )}
                {/* Элемент для изменения размера элементов */}
                <div ref={refRight} className="todo-list-resizer">
                    <div className="todo-list-resizer-r"></div>
                </div>
            </div>
        </>
    )
}

export default TodoList
