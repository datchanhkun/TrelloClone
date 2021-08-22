import React, { useState, useEffect, useRef } from 'react'
import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'ultilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import { MODAL_ACTION_CONFIRM } from 'ultilities/constants'
import { saveContentSavePressEnter, selectAllInlineText } from 'ultilities/contentEditable'
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  //sort cards
  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = e => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = e => setNewCardTitle(e.target.value)

  const newCardTextareaRef = useRef(null)
  //Khi column title thay đổi mới chạy UseEffect
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  //UseEffect xử lý việc focus vào input khi click = useRef
  useEffect(() => {
    //Khi ref có tồn tại thì focus vào input và khi state toggle thay đổi mới cho chạy useEffect
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select() // bôi đen lại value trong input
    }
  }, [openNewCardForm])


  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    //Nếu input rỗng thì focus vào lại input
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5), //random string id 5 kí tự
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(), //cắt khoảng cách dư thừa trong input
      cover: null
    }

    //push card vào trong mảng card và cardOrder
    //sử dụng cloneDeep để clone object column và tạo ra 1 value mới không liên quan gì đến value cũ
    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()

  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentSavePressEnter}
            onClick={selectAllInlineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck='false'
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Add Card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column...</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          orientation="vertical" //default
          groupName="group-columns"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard() }
            />
          </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>Add Card</Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        }
        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon"/> Add Another Card
          </div>
        }

      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Are you sure you want to remove <strong>${column.title}</strong>!`}
      />
    </div>
  )
}

export default Column
