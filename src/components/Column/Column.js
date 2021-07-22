import React from 'react'
import './Column.scss';
import Task from 'components/Task/Task';
function Column() {
  return (
    <div className="column">
    <header>Braindstorm</header>
    <ul className="task-list">
      <Task/>
      <li className="task-item">Build web trello clone 1</li>
      <li className="task-item">Build web trello clone 2</li>
      <li className="task-item">Build web trello clone 3</li>
    </ul>
    <footer>Add Another Card</footer>
  </div>
  )
}

export default Column
