import React, { useState } from 'react';
import List from './List';
import Switch from "react-switch";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  //const [showCompleted, setShowCompleted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isDarkMode, setisDarkMode] = useState(false);


  React.useEffect(() => {
    const storedTodos = localStorage.getItem('tasks');
    if (storedTodos) {
      setTasks(JSON.parse(storedTodos));
    }
  }, []);
  //localStorage.setItem('todos', JSON.stringify([...todos, text]));
  //localStorage.clear()

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
    localStorage.setItem('tasks', JSON.stringify([...tasks, text]));
  }

  function deleteTask(id) {
    const availableTasks = tasks.filter(task => task.id !== id);
    setTasks(availableTasks);
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else { return task; }
    }));
  }

  function darkModeHandler() {
    if (isDarkMode) {
      document.body.className = "darkMode";
    } else {
      document.body.className = "lightMode";
    }
    setisDarkMode(!isDarkMode);
  }

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div className="todoList">
      <h1>Todo List</h1>

      <div className='switcherUncompletedTasks'>
        <Switch onChange={() => setIsToggled(!isToggled)} checked={isToggled} checkedIcon={false} uncheckedIcon={true} />
        <span>Show all uncompleted tasks</span>
      </div>

      <div className='switcherDarkMode'>
        <Switch onChange={darkModeHandler} checked={!isDarkMode} checkedIcon={false} uncheckedIcon={true} />
        <span>Dark mode</span>
      </div>

      <List isToggled={isToggled} tasks={tasks} deleteTask={deleteTask} toggleCompleted={toggleCompleted} setTasks={setTasks} />
      <input id='myInput'
        className='userInput'
        placeholder='Enter a new task'
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(text);
          }
        }} />
      <button onClick={() => addTask(text)} className='addTaskButton' disabled={!text}>Add Task</button>
    </div>
  );
}

export default TodoList;
