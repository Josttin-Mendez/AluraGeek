import { openCloseSearchBox } from "./open-close-searchbox.js";

openCloseSearchBox()

const loginButton = document.querySelector('[data-button-submit]')
loginButton.addEventListener('click', (event) => {
  event.preventDefault()
  window.location.href = '../pages/admin-home.html'
})