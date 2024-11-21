import React, { useRef, useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  const [text, setText] = useState(task.text);
  const [isEditable, setIsEditable] = useState(false);
  const refInput = useRef();

  function handleCompleted() {
    toggleCompleted(task.id);
  }

  return (
    <div className="todoItem">
      <input className='checkBoxInput'
        type="checkbox"
        checked={task.completed}
        onChange={handleCompleted}
      />

      {isEditable ? <input
        ref={refInput}
        className='editableInput'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsEditable(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsEditable(false)
          }
        }} /> :
        <p id={task.id}
          className={task.completed ? 'completed' : ''}
          onBlur={() => setIsEditable(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditable(false)
            }
          }}>{text}</p>
      }

      <button onClick={() => deleteTask(task.id)} className='xButton'>X</button>
      <button onClick={() => {
        setIsEditable(!isEditable)
        setTimeout(() => {
          refInput.current.focus()
        }, "10");
      }} className='editButton'>Edit</button>
    </div>

  );
}

export default TodoItem;
