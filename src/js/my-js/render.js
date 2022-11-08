function render(data) {
    const coins = document.querySelector('.exchanger__balance__count__text')
    const productsWrap = document.querySelector('.exchanger__options__items')
    let content = ''

    coins.innerText = data.coins

    productsWrap.innerHTML = ''

    data.products.forEach(element => {
        console.log(data);
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
				<div class="exchanger__options__items__item__btn">
					<div class="exchanger__options__items__item__btn__text">Использовать скидку</div>
				</div>
			</div>
		`
    });
    productsWrap.innerHTML = content
    isOrder(data)

    function isOrder(data) {
        data.orders.forEach((el) => {
            let item = document.querySelector(`[data-id='${el.product_id}']`)
            item.querySelector('.exchanger__options__items__item__btn').classList.add('active')
        })
    }

}