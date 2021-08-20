import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'ultilities/sort'
import { applyDrag } from 'ultilities/dragDrop'
function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromData = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    //Check data có tồn tại thì gán vào state
    if (boardFromData) {
      setBoard(boardFromData)

      //sort array column order
      setColumns(
        mapOrder(boardFromData.columns, boardFromData.columnOrder, 'id')
      )
    }
  }, [])

  //Check empty state "board"
  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: '10px', color: 'white' }}>
        Board not found
      </div>
    )
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [ ...columns]
    newColumns = applyDrag(newColumns, dropResult)

    //update columnOrder in board
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    //check removeIndex & addIndex có tồn tại thì check column
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [ ...columns]
      //find column current
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      //update card order
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon"/> Add Another Column
      </div>
    </div>
  )
}

export default BoardContent
