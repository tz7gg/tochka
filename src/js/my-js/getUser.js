const USERLINK = `${window.location.href}/API/getUser.php`

function getUser(userLogin) {
    const url = `${USERLINK}?user=${userLogin}`
    return fetch(url).then(res => res)
}