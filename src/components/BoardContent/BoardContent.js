import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import {
  fetchBoardDetails,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard
} from 'actions/ApiCall'
import { isEmpty, cloneDeep } from 'lodash'
import { mapOrder } from 'ultilities/sort'
import { applyDrag } from 'ultilities/dragDrop'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = e => setNewColumnTitle(e.target.value)

  const newColumnInputRef = useRef(null)
  useEffect(() => {
    const boardId = '613278a9b04ef9f02b8178cd'
    fetchBoardDetails(boardId).then(board => {
      setBoard(board)
      //sort array column order
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
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
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    //update columnOrder in board
    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    //So sánh columnOrder của board khác với newBoard thì mới call API
    if (JSON.stringify(board.columnOrder) !== JSON.stringify(newBoard.columnOrder) ) {
      //Call API Update columnOrder in Board
      updateBoard(newBoard._id, newBoard).catch(() => {
        // Trường hợp gặp lỗi thì set lại state cũ
        setColumns(columns)
        setBoard(board)
      })
    }
  }
  //Xử lý kéo thả card và xử lý state => truyền xuống component con
  const onCardDrop = (columnId, dropResult) => {
    //check removeIndex & addIndex có tồn tại thì check column
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)
      //find column current
      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      //update card order
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

      setColumns(newColumns)
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action: Kéo thả card trong cùng 1 column
         * Call API update cardOrder của column hiện tại
         */
        //So sánh removedIndex khác với addedIndex thì mới call API
        if (dropResult.removedIndex !== dropResult.addedIndex) {
          updateColumn(currentColumn._id, currentColumn).catch(() => {
            setColumns(columns)
          })
        }

      } else {
        /**
         * Action: Kéo thả card giữa 2 column
         * Call API update cardOrder của column hiện tại
         * Call API update columnId của card được kéo
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns)
        })
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          //Call api 2
          updateCard(currentCard._id, currentCard)
        }

      }
    }
  }

  const addNewColumn = () => {
    //Nếu input rỗng thì focus vào lại input
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }
    //Call API
    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      //update columnOrder in board
      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)

      setNewColumnTitle('') //set lại input rỗng
      toggleOpenNewColumnForm() //set lại toggle
    })

  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    //Lấy ra cái id column cần update
    const columnIdToUpdate = newColumnToUpdate._id
    //clone lại mảng column
    let newColumns = [...columns]
    //tìm index columnUpdate trong array column
    const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)
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
    newBoard.columnOrder = newColumns.map(c => c._id)
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
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState} />
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
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
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
