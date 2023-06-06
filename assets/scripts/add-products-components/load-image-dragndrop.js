import { showImageOnContainer } from "./show-image-preview.js";

export function dragAndDropImages() {
  let imageContainer = document.getElementById('image-container')
  imageContainer.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  })
  imageContainer.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    showImageOnContainer(fileList[0])
  })
}