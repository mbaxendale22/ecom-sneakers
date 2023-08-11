const mobileNav = document.getElementById('mobile-nav')
const burgerMenu = document.getElementById('open-mobile-nav')
const closeMobileNav = document.getElementById('close-mobile-nav')
const fsOverlay = document.querySelector('.full-screen-overlay')
const mobileNavList = document.getElementById('mobile-nav-list')
const thumbnailContainer = document.querySelector('.thumbnail-container')
const mainProductContainer = document.querySelector('.main-product-container')
const lighthouseMainProductContainer = document.querySelector(
    '.lighthouse-main-product-container'
)
const forwardArrow = document.querySelector('.gallery-button-right')
const backArrow = document.querySelector('.gallery-button-left')
const galleryArrows = document.querySelectorAll('.gallery-button')
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
const lighthouseThumbnailImages = Array.from(
    thumbnailContainer.childNodes
).filter((_, idx) => idx % 2 === 1)
const productContainerArr = Array.from(mainProductContainer.children).filter(
    (el) => el.tagName === 'IMG'
)
const lighthouseContainerArr = Array.from(
    lighthouseMainProductContainer.children
).filter((el) => el.tagName === 'IMG')

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
function handleLighthouseThumbnailClick(e) {
   
    // !TODO active class not being switched between thumbnails but main image is being replace 
    lighthouseThumbnailImages.forEach((thumb) => {
        console.log(thumb.classList)
        if (thumb.classList.contains('thumbnail-active')) {
            thumb.classList.remove('thumbnail-active')
        }
        if (thumb.id === e.target.id) {
            thumb.classList.add('thumbnail-active')
            // also add it as the main image
            const id = thumb.id.at(-1)
            replaceLighthouseMainImage(id)
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
function replaceLighthouseMainImage(id) {
    const targetId = `main-img-${id}`
    lighthouseContainerArr.forEach((image) => {
        if (image.classList.contains('main-product-active')) {
            image.classList.remove('main-product-active')
        }

        if (image.id === targetId) {
            image.classList.add('main-product-active')
        }
    })
}
lighthouseThumbnailContainer.addEventListener(
    'click',
    handleLighthouseThumbnailClick
)

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

function handleLighthouseClickForward(e) {
    const [curActiveImage] = lighthouseContainerArr.filter((image) =>
        image.classList.contains('main-product-active')
    )
    curActiveImage.classList.remove('main-product-active')

    const nextImage = parseInt(curActiveImage.id.at(-1)) + 1

    console.log(curActiveImage)
    console.log(nextImage)

    if (nextImage !== 5) {
        lighthouseContainerArr.forEach((image) => {
            if (image.id === `main-img-${nextImage.toString()}`) {
                console.log('its a match')
                image.classList.add('main-product-active')
                return
            }
        })
    } else {
        lighthouseContainerArr.at(0).classList.add('main-product-active')
    }
}
function handleLighthouseClickBackwards(e) {
    const [curActiveImage] = lighthouseContainerArr.filter((image) =>
        image.classList.contains('main-product-active')
    )

    curActiveImage.classList.remove('main-product-active')

    const nextImage = parseInt(curActiveImage.id.at(-1)) - 1

    if (nextImage !== 0) {
        lighthouseContainerArr.forEach((image) => {
            if (image.id === `main-img-${nextImage.toString()}`) {
                image.classList.add('main-product-active')
                return
            }
        })
    } else {
        console.log(lighthouseContainerArr.at(-1))
        lighthouseContainerArr.at(-2).classList.add('main-product-active')
    }
}

function handleOpenLighthouse() {
    fsOverlay.style.display = 'block'
    lighthouseContainer.style.display = 'flex'
}

forwardArrow.addEventListener('click', handleGalleryClickForward)
backArrow.addEventListener('click', handleGalleryClickBackwards)
lighthouseForwardArrow.addEventListener('click', handleLighthouseClickForward)
lighthouseBackArrow.addEventListener('click', handleLighthouseClickBackwards)

thumbnailContainer.addEventListener('click', handleThumbnailClick)
mainProductContainer.addEventListener('click', handleOpenLighthouse)
closeLightHouse.addEventListener('click', () => {
    fsOverlay.style.display = 'none'
    lighthouseContainer.style.display = 'none'
})
