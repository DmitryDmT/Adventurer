const mainNavigation = document.querySelector('.main-navigation');

const searchInput = mainNavigation.querySelector('.main-search__input');
const searchButton = mainNavigation.querySelector('.main-search__btn');

const paragraphs = document.querySelectorAll('p');

let foundElements = [];
let foundCounter = 0;
let currentFoundHTML = '';

const searcherClickHandler = (evt) => {
  evt.stopPropagation();
  searchInput.style.display = 'block';
  searchInput.focus();
};

searchInput.addEventListener('keyup', (evt) => {
  const searchTextRegExp = new RegExp(searchInput.value, 'i');

  if (evt.keyCode === 13) {
    if (foundCounter > 0) {
      foundElements[foundCounter - 1].innerHTML = currentFoundHTML;
    }

    const foundElementPos = foundElements[foundCounter].getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, foundElementPos);

    currentFoundHTML = foundElements[foundCounter].innerHTML;
    foundElements[foundCounter].innerHTML = currentFoundHTML.replace(searchTextRegExp, '<span class="highlight">' + searchInput.value + '</span>');

    foundCounter++;
  } else {
    foundElements = [];

    for (const paragraph of paragraphs) {
      if (searchTextRegExp.test(paragraph.textContent)) {
        foundElements.push(paragraph);
      }
    }
  }
});

searchButton.addEventListener('click', searcherClickHandler);

window.addEventListener('mousedown', (evt) => {
  if (evt.target != searchInput) {
    if (foundCounter > 0) {
      foundElements[foundCounter - 1].innerHTML = currentFoundHTML;
    }
    searchInput.value = '';
    searchInput.style.display = 'none';
    foundElements = [];
    foundCounter = 0;
    currentFoundHTML = '';
  }
});