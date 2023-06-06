import { openCloseSearchBox } from "../open-close-searchbox.js";
import { loadImageFromInput } from './load-image-input.js';
import { dragAndDropImages } from './load-image-dragndrop.js'

openCloseSearchBox()
loadImageFromInput()
dragAndDropImages()

let headerTemplate = {
  'X-Api-Version': '3',
  'Authorization': 'Bearer e16fc5dad5efc05d18c48a26a709ac',
  'Accept': 'application/json',
  'Content-Type': 'application/vnd.api+json'
};
async function getAWSUploadUrl() {
  const productImage = document.querySelector('[data-input-image]')
  const requestAwsUrl = await fetch('https://site-api.datocms.com/upload-requests', {
    method: 'POST',
    headers: headerTemplate,
    body: JSON.stringify({
      data: {
        type: 'upload_request',
        attributes: {
          filename: `${productImage.files[0].name}`
        }
      }
    })
  })
  const requestResponse = await requestAwsUrl.json()
  return requestResponse
}

async function createUpload() {
  const imageUploaded = await getAWSUploadUrl();
  const productImage = document.querySelector('[data-input-image]').files[0];
  let reader = new FileReader();
  let image = '';
  reader.onloadend = () => {
    image = reader.result;
  }
  reader.readAsDataURL(productImage)

  await fetch(`${imageUploaded.data.attributes.url}`, {
    method: 'PUT',
    body: image
  })
  const saveUpload = await fetch('https://site-api.datocms.com/uploads', {
    method: 'POST',
    headers: headerTemplate,
    body: JSON.stringify({
      data: {
        type: 'upload',
        attributes: {
          path: `${imageUploaded.data.id}`
        }
      }
    })
  })
  const saveUploadResponse = await saveUpload.json()
  return saveUploadResponse
}

async function getUploadId() {
  const jobId = await createUpload()
  const uploadID = await fetch(`https://site-api.datocms.com/job-results/${jobId.data.id}`, {
    method: 'GET',
    headers: headerTemplate
  })
  const uploadIDResponse = await uploadID.json()
  console.log(uploadIDResponse.data.attributes.payload.data.id)
  return uploadIDResponse
}

function addNewProduct() {
  const productName = document.querySelector('[data-input-name]')
  const productCategory = document.querySelector('[data-input-category]')
  const productPrice = document.querySelector('[data-input-price]')
  const productDescription = document.querySelector('[data-input-description]')

  fetch('https://site-api.datocms.com/items', {
    method: 'POST',
    headers: headerTemplate,
    body: JSON.stringify({
      data: {
        type: 'item',
        attributes: {
          name: `${productName.value}`,
          category: `${productCategory.value}`,
          price: `${productPrice.value}`,
          description: `${productDescription.value}`
        },
        relationships: {
          item_type: {
            data: {
              type: 'item_type',
              id: '40166'
            }
          }
        }
      }
    })
  })
}

let form = document.querySelector('[data-form]')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  await getUploadId()
})