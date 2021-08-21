//Event onkeydown
export const saveContentSavePressEnter = (e) => {
  //Khi Enter ra ngoài thì gọi thuộc tính blur => handleColumnTitleBlur
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

//Select all input value when click
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}