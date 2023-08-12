const cartContainer = document.querySelector('.cart-container')
const cartTop = document.querySelector('.cart-top')
const cartBottom = document.querySelector('.cart-bottom')

export function handleCardToggle() {
    if (cartContainer.style.height === '') {
        cartContainer.style.height = '25rem'
        cartTop.style.display = 'block'
        cartBottom.style.display = 'flex'
        return
    }
    cartContainer.style.height = ''
    cartTop.style.display = 'none'
    cartBottom.style.display = 'none'
}
