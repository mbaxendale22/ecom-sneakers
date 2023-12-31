import {
    handleLighthouseClickBackwards,
    handleLighthouseClickForward,
    handleOpenLighthouse,
    handleLighthouseThumbnailClick,
} from './lighthouse.js'

import { handleCardToggle } from './cart.js'

const mobileNav = document.getElementById('mobile-nav')
const burgerMenu = document.getElementById('open-mobile-nav')
const closeMobileNav = document.getElementById('close-mobile-nav')
const fsOverlay = document.querySelector('.full-screen-overlay')
const thumbnailContainer = document.querySelector('.thumbnail-container')
const mainProductContainer = document.querySelector('.main-product-container')
const forwardArrow = document.querySelector('.gallery-button-right')
const backArrow = document.querySelector('.gallery-button-left')
const lighthouseContainer = document.querySelector('.lighthouse-container')
const lighthouseForwardArrow = document.querySelector(
    '.lighthouse-gallery-button-right'
)
const lighthouseBackArrow = document.querySelector(
    '.lighthouse-gallery-button-left'
)
const closeLightHouse = document.querySelector('.close-lighthouse')
const lighthouseThumbnailContainer = document.querySelector(
    '.lighthouse-thumbnail-container'
)
const thumbnailImages = Array.from(thumbnailContainer.childNodes).filter(
    (_, idx) => idx % 2 === 1
)

const productContainerArr = Array.from(mainProductContainer.children).filter(
    (el) => el.tagName === 'IMG'
)

const cartIcon = document.querySelector('.cart-icon')

function handleOpenMobileNav(e) {
    mobileNav.style.width = '66vw'
    const navContent = mobileNav.childNodes
    const elementsToBringIn = navContent[1].childNodes
    elementsToBringIn[1].style.display = 'block'
    elementsToBringIn[3].style.display = 'block'

    fsOverlay.style.display = 'block'
}

function handleCloseMobileNav() {
    const navContent = mobileNav.childNodes
    const elementsToBringIn = navContent[1].childNodes
    mobileNav.style.width = '0vw'

    setTimeout(() => {
        elementsToBringIn[1].style.display = 'none'
        elementsToBringIn[3].style.display = 'none'
    }, 300)
    fsOverlay.style.display = 'none'
}

// grab the images from the nodelist (odd numbered indexes)

function handleThumbnailClick(e) {
    thumbnailImages.forEach((thumb) => {
        if (thumb.classList.contains('thumbnail-active')) {
            thumb.classList.remove('thumbnail-active')
        }
        if (thumb === e.target) {
            thumb.classList.add('thumbnail-active')
            // also add it as the main image
            const id = thumb.id.at(-1)
            replaceMainImage(id)
        }
    })
}

function replaceMainImage(id) {
    const targetId = `main-img-${id}`
    productContainerArr.forEach((image) => {
        if (image.classList.contains('main-product-active')) {
            image.classList.remove('main-product-active')
        }

        if (image.id === targetId) {
            image.classList.add('main-product-active')
        }
    })
}

function handleGalleryClickForward(e) {
    const [curActiveImage] = productContainerArr.filter((image) =>
        image.classList.contains('main-product-active')
    )

    curActiveImage.classList.remove('main-product-active')

    const nextImage = parseInt(curActiveImage.id.at(-1)) + 1

    if (nextImage !== 5) {
        productContainerArr.forEach((image) => {
            if (image.id === `main-img-${nextImage.toString()}`) {
                image.classList.add('main-product-active')
                return
            }
        })
    } else {
        document
            .getElementById('main-img-1')
            .classList.add('main-product-active')
    }
}
function handleGalleryClickBackwards(e) {
    const [curActiveImage] = productContainerArr.filter((image) =>
        image.classList.contains('main-product-active')
    )

    curActiveImage.classList.remove('main-product-active')

    const nextImage = parseInt(curActiveImage.id.at(-1)) - 1

    if (nextImage !== 0) {
        productContainerArr.forEach((image) => {
            if (image.id === `main-img-${nextImage.toString()}`) {
                image.classList.add('main-product-active')
                return
            }
        })
    } else {
        document
            .getElementById('main-img-4')
            .classList.add('main-product-active')
    }
}

// NAVBAR

burgerMenu.addEventListener('click', handleOpenMobileNav)
closeMobileNav.addEventListener('click', handleCloseMobileNav)

// LIGHTHOUSE GALLERY
forwardArrow.addEventListener('click', handleGalleryClickForward)
backArrow.addEventListener('click', handleGalleryClickBackwards)
lighthouseForwardArrow.addEventListener('click', handleLighthouseClickForward)
lighthouseBackArrow.addEventListener('click', handleLighthouseClickBackwards)
closeLightHouse.addEventListener('click', () => {
    fsOverlay.style.display = 'none'
    lighthouseContainer.style.display = 'none'
})
lighthouseThumbnailContainer.addEventListener(
    'click',
    handleLighthouseThumbnailClick
)

// MAIN IMAGE GALLERY
thumbnailContainer.addEventListener('click', handleThumbnailClick)
mainProductContainer.addEventListener('click', handleOpenLighthouse)

// CART
cartIcon.addEventListener('click', handleCardToggle)

// INCREASE / DECREASE PRODUCT

const quantityDisplay = document.getElementById('quantity-display')
const cartTextBlock = document.querySelector('.text-block')
const cartProductContainer = document.querySelector('.cart-product-container')
const emptyCartMsg = document.getElementById('empty-cart-msg')
const buttonContainer = document.querySelector('.button-container')
const deleteProduct = document.querySelector('.delete-icon')
const productIndicator = document.querySelector('.product-indicator')

function handleCart(e) {
    let currAmount = parseInt(quantityDisplay.innerText)

    switch (e.target.id) {
        case 'increase-quantity':
            currAmount++
            quantityDisplay.innerText = currAmount
            return
        case 'decrease-quantity':
            if (currAmount === 0) {
                return
            }
            currAmount--
            quantityDisplay.innerText = currAmount
            return
        case 'add-to-cart':
            if (currAmount === 0) {
                return
            }
            cartProductContainer.style.display = 'flex'
            emptyCartMsg.style.display = 'none'

            cartTextBlock.innerHTML = `
            <p>Fall Limited Edition Sneakers</p>
            <p>$125 x ${currAmount} <span>$${
                currAmount * 125
            }</span></p>        
            `
            console.log(productIndicator)
            productIndicator.style.display = 'flex'
            productIndicator.innerHTML = `
                <p>${currAmount}</p>
                `

            return

        default:
            break
    }
}

buttonContainer.addEventListener('click', handleCart)
deleteProduct.addEventListener('click', () => {
    cartProductContainer.style.display = 'none'
    emptyCartMsg.style.display = 'block'
    productIndicator.style.display = 'none'
})
