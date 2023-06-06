import { showImageOnContainer } from "./show-image-preview.js"

export function loadImageFromInput() {
  let inputFile = document.querySelector('input[type=file]')
  inputFile.addEventListener('change', () => {
    let image = inputFile.files[0]
    showImageOnContainer(image)
  })
}