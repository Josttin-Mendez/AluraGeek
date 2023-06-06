export function openCloseSearchBox () {
  const searchIcons = document.querySelectorAll('[data-icon-search]')
  searchIcons.forEach(verifySearchOpenOrClose)
}

function verifySearchOpenOrClose(icon) {
  const header = document.querySelector('.header__upper')
  icon.addEventListener('click', () => {
  header.classList.toggle('search-active')
  })
}