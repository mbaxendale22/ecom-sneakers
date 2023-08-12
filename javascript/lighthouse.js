const fsOverlay = document.querySelector('.full-screen-overlay')
const lighthouseContainer = document.querySelector('.lighthouse-container')

const lighthouseMainProductContainer = document.querySelector(
    '.lighthouse-main-product-container'
)
const lighthouseContainerArr = Array.from(
    lighthouseMainProductContainer.children
).filter((el) => el.tagName === 'IMG')

const lighthouseThumbnailContainer = document.querySelector(
    '.lighthouse-thumbnail-container'
)
const lighthouseThumbnailImages = Array.from(
    lighthouseThumbnailContainer.childNodes
).filter((_, idx) => idx % 2 === 1)

export function handleLighthouseClickForward(e) {
    const [curActiveImage] = lighthouseContainerArr.filter((image) =>
        image.classList.contains('main-product-active')
    )
    curActiveImage.classList.remove('main-product-active')

    const nextImage = parseInt(curActiveImage.id.at(-1)) + 1

    if (nextImage !== 5) {
        lighthouseContainerArr.forEach((image) => {
            if (image.id === `main-img-${nextImage.toString()}`) {
                image.classList.add('main-product-active')
                return
            }
        })
    } else {
        lighthouseContainerArr.at(0).classList.add('main-product-active')
    }
}
export function handleLighthouseClickBackwards(e) {
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
export function handleOpenLighthouse() {
    if (window.innerWidth < 405) {
        return
    }
    fsOverlay.style.display = 'block'
    lighthouseContainer.style.display = 'flex'
}
export function handleLighthouseThumbnailClick(e) {
    lighthouseThumbnailImages.forEach((thumb) => {
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
export function replaceLighthouseMainImage(id) {
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
