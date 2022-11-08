function render(data) {
    const coins = document.querySelector('.exchanger__balance__count__text')
    const productsWrap = document.querySelector('.exchanger__options__items')
    let content = ''

    coins.innerText = data.coins
    productsWrap.innerHTML = ''

    data.products.forEach(element => {
        let imgSrc

        if (element.description.includes('звонки')) {
            imgSrc = 'images/tel.svg'
        } else if (element.description.includes(' спецкурс')) {
            imgSrc = 'images/book.svg'
        } else if (element.description.includes('курс')) {
            imgSrc = 'images/books.svg'
        }

        content += `
				<div class="exchanger__options__items__item" data-id=${element.id}>
				<div class="exchanger__options__items__item__price">
					<div class="exchanger__options__items__item__price__icon">
						<img src="images/coin.svg" alt="">
					</div>
					<div class="exchanger__options__items__item__price__text">${element.price}</div>
					<div class="exchanger__options__items__item__price__currency">
						<img src="images/currency.svg" alt="">
					</div>
				</div>
				<div class="exchanger__options__items__item__icon">
					<img src=${imgSrc} alt="">
				</div>
				<div class="exchanger__options__items__item__des">
					<div class="exchanger__options__items__item__des__badge">${element.description.slice(0, 3)}</div>
					<div class="exchanger__options__items__item__des__text">${element.description.slice(3)}</div>
				</div>
				<div class="exchanger__options__items__item__btn ${data.coins < element.price ? 'disabled' : ''}">
					<div class="exchanger__options__items__item__btn__text">${data.coins < element.price ? 'Недостаточно средств' : 'Использовать скидку'}</div>
				</div>
			</div>
		`
    });
    productsWrap.innerHTML = content
    isOrder(data)
    addPurchaseHandler()

    function isOrder(data) {
        data.orders.forEach((el) => {
            let item = document.querySelector(`[data-id='${el.product_id}']`)
            item.querySelector('.exchanger__options__items__item__btn').classList.add('active')
            item.querySelector('.exchanger__options__items__item__btn__text').innerText = 'Уже использованно'
        })
    }

    function addPurchaseHandler() {
        const items = document.querySelectorAll('.exchanger__options__items__item__btn')
        items.forEach(function(item) {
            item.onclick = async() => {
                const productId = item.parentNode.dataset.id
                spinner(true)
                let data = await purchaseProduct(userInfo.id, productId).then(res => res.json())
                document.querySelector('.exchanger__balance__count__text').innerText = data.coins
                item.querySelector('.exchanger__options__items__item__btn__text').innerText = "Уже использованно"
                item.classList.add('active')
                spinner(false)
            }
        })
    }
}