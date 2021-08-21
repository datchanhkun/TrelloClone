import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'ultilities/sort'
import { applyDrag } from 'ultilities/dragDrop'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

  const newColumnInputRef = useRef(null)
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

  useEffect(() => {
    //Khi ref có tồn tại thì focus vào input và khi state toggle thay đổi mới cho chạy useEffect
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select() // bôi đen lại value trong input
    }
  }, [openNewColumnForm])

  //Check empty state "board"
  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: '10px', color: 'white' }}>
        Board not found
      </div>
    )
  }
  //Xử lý kéo thả column và set state
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
  //Xử lý kéo thả card và xử lý state => truyền xuống component con
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
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = () => {
    //Nếu input rỗng thì focus vào lại input
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), //random id 5 kí tự
      boardId: board.id,
      title: newColumnTitle.trim(), //cắt khoảng cách dư thừa trong input
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    //update columnOrder in board
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    setNewColumnTitle('') //set lại input rỗng
    toggleOpenNewColumnForm() //set lại toggle
  }

  const onUpdateColumn = (newColumnToUpdate) => {
    //Lấy ra cái id column cần update
    const columnIdToUpdate = newColumnToUpdate.id
    //clone lại mảng column
    let newColumns = [...columns]
    //tìm index columnUpdate trong array column
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)
    //Kiểm tra đang xóa column hay update column
    if (newColumnToUpdate._destroy) {
      //Xóa 1 phần tử từ 1 vị trí index trong mảng newColumn
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      //update column infor bằng cách xóa phần tử tại index đó rồi thêm 1 phần tử mới vào ngay vị trí index đó
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    //update lại state
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
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
            <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-bootstrap-container">
        {!openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"/> Add Another Column
            </Col>
          </Row>
        }
        {openNewColumnForm &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column tittle..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn() }
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>Add column</Button>
              <span className="cancel-new-column" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon"></i>
              </span>
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
