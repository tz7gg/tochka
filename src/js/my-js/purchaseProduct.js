const PURCHASELINK = `${window.location.href}/API/purchase.php`

function purchaseProduct(userId, productId) {
    const url = `${PURCHASELINK}?userid=${userId}&productid=${productId}`
    return fetch(url).then(res => res)
}