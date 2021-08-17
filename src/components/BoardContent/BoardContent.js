import React, {useState, useEffect} from "react";

import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initialData } from 'actions/initialData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'ultilities/sort';
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromData = initialData.boards.find(board => board.id === 'board-1');
    //Check data có tồn tại thì gán vào state
    if(boardFromData) { 
      setBoard(boardFromData);

      //sort array column order
      setColumns(mapOrder(boardFromData.columns,boardFromData.columnOrder,'id'));  
    } 
  },[]);

  //Check empty state "board"
  if(isEmpty(board)) {
    return <div className="not-found" style={{'padding': '10px', 'color': 'white'}}>Board not found</div>
  }
  return (
    <div className="board-content"> 
      {columns.map((column,index) => <Column key={index} column={column}/>)}
    </div> 
  );
}

export default BoardContent;

