const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const exchangeError = document.querySelector('.exchanger__error')
const balanceWrap = document.querySelector('.exchanger__balance')
const options = document.querySelector('.exchanger__options')

window.addEventListener('load', () => {
    searchBtn.onclick = async() => {
        if (searchInput.value) {
            spinner(true)
            let data = await getUser(searchInput.value).then(res => res.json())
            if (data.id === 0) {
                exchangeError.innerText = 'Пользователь не найден!'
                exchangeError.classList.remove('dn')
                balanceWrap.classList.add('dn')
                options.classList.add('dn')
            } else {
                exchangeError.classList.add('dn')
                balanceWrap.classList.remove('dn')
                options.classList.remove('dn')
                render(userInfo)
            }
            spinner(false)
        }
    }
})