const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const exchangeError = document.querySelector('.exchanger__error')
const balanceWrap = document.querySelector('.exchanger__balance')
const options = document.querySelector('.exchanger__options')

let userInfo

window.addEventListener('load', () => {
    searchBtn.onclick = async() => {
        if (searchInput.value) {
            spinner(true)
            let data = await getUser(searchInput.value).then(res => res.json())
            userInfo = data
            if (data.id === 0) {
                exchangeError.innerText = 'Пользователь не найден!'
                exchangeError.classList.remove('dn')
                balanceWrap.classList.add('dn')
                options.classList.add('dn')
            } else {
                exchangeError.classList.add('dn')
                balanceWrap.classList.remove('dn')
                options.classList.remove('dn')
                render(data)
            }
            spinner(false)
        }
    }
})


setInterval(function() {

    if (character.hp < character.max_hp - 200 && !is_on_cooldown("use_hp")) {
        use_skill('use_hp');
    }
    if (character.mp < character.max_mp - 300 || character.mp < 20) {
        use_skill('use_mp');
    }

    asistName = get_characters()[1].name

    target = get_target_of(parent.entities[asistName])

    attack(target).then(res => {
        console.log('daada')
    })

}, 100); // Loops every 1/4 seconds.