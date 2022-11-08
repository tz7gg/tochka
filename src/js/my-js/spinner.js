function spinner(active) {
    const spinner = document.querySelector('.spinner-conteiner')
    if (active) {
        spinner.classList.add('active')
    } else {
        spinner.classList.remove('active')
    }
}