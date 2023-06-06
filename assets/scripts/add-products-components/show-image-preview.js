import { readImage } from "./get-blob-from-image.js"

export function showImageOnContainer(image) {
  let imageContainer = document.getElementById('image-container')
  imageContainer.innerHTML = ''
  imageContainer.style.background = `url(${readImage(image)}) no-repeat center/cover`
}