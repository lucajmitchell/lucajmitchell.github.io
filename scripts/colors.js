const root = document.querySelector(':root')

const setAccent = (color) => {
  root.style.setProperty('--accent', `var(--${color})`)

  const allButtons = document.querySelectorAll('.color-button')
  allButtons.forEach((button) => {
    button.classList.remove('selected')
  })

  const clickedButton = document.querySelector(`#${color}`)
  clickedButton.classList.add('selected')
  
}