import '../scss/main.scss';
import { courses } from './data.js';
import { renderCatalog } from './render.js';
import { filterByCategory, updateFilterCounts } from './filter.js';
import { filterBySearch } from './search.js';

const grid = document.getElementById('catalog-grid');
const searchInput = document.querySelector('.search__input');
const filterButtons = document.querySelectorAll('.filters__item');

let activeCategory = 'all';
let searchQuery = '';

function getFiltered() {
  return filterBySearch(filterByCategory(courses, activeCategory), searchQuery);
}

function update() {
  renderCatalog(getFiltered(), grid);
}

updateFilterCounts(courses, filterButtons);

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('filters__item--active'));
    btn.classList.add('filters__item--active');
    activeCategory = btn.dataset.category;
    update();
  });
});

searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  update();
});

update();
