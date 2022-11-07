const instructionBtn = document.querySelector('.exchanger__options__instruction-btn')
const instructionWrap = document.querySelector('.instruction')
const instructionClose = document.querySelector('.instruction__wrap__close')

instructionBtn.onclick = () => {
    instructionWrap.classList.add('active')
}

instructionClose.onclick = () => {
    instructionWrap.classList.remove('active')
}