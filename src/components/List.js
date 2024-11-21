import React from 'react';
import TodoItem from './TodoItem';

function List({ isToggled, tasks, deleteTask, toggleCompleted }) {
    if (!tasks.length) {
        return <p className='noTaskMessage'>No Tasks</p>
    }
    return isToggled ? tasks.filter(task => !task.completed).map(task => <TodoItem
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        toggleCompleted={toggleCompleted}
    />) : tasks.map(task => (
        <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
        />
    ))

}

export default List;