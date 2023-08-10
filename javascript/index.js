const mobileNav = document.getElementById('mobile-nav')
const burgerMenu = document.getElementById('open-mobile-nav')
const closeMobileNav = document.getElementById('close-mobile-nav')
const fsOverlay = document.querySelector('.full-screen-overlay')
const mobileNavList = document.getElementById('mobile-nav-list')
const thumbnailContainer = document.querySelector('.thumbnail-container')
const mainProductContainer = document.querySelector('.main-product-container')
const forwardArrow = document.querySelector('.gallery-button-right')
const backArrow = document.querySelector('.gallery-button-left')
const thumbnailImages = Array.from(thumbnailContainer.childNodes).filter(
    (_, idx) => idx % 2 === 1
)
const productContainerArr = Array.from(mainProductContainer.children).filter(
    (el) => el.tagName === 'IMG'
)

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
    elementsToBringIn[1].style.display = 'block'
    elementsToBringIn[3].style.display = 'block'
    fsOverlay.style.display = 'none'
    mobileNav.style.width = '0vw'
}
burgerMenu.addEventListener('click', handleOpenMobileNav)
closeMobileNav.addEventListener('click', handleCloseMobileNav)

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
            console.log('hello')
            image.classList.add('main-product-active')
        }
    })
}

// make this the same for small screen and lighthouse galleries
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

forwardArrow.addEventListener('click', handleGalleryClickForward)
backArrow.addEventListener('click', handleGalleryClickBackwards)
thumbnailContainer.addEventListener('click', handleThumbnailClick)
