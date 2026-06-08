import '../scss/main.scss';
import { courses } from './data.js';
import { renderCatalog } from './render.js';
import { filterByCategory, updateFilterCounts } from './filter.js';
import { filterBySearch } from './search.js';

const PAGE_SIZE = 9;

const grid        = document.getElementById('catalog-grid');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.querySelector('.search__input');
const filterBtns  = document.querySelectorAll('.filters__item');

let activeCategory = 'all';
let searchQuery    = '';
let visibleCount   = PAGE_SIZE;

function getFiltered() {
  return filterBySearch(filterByCategory(courses, activeCategory), searchQuery);
}

function update() {
  const filtered = getFiltered();
  renderCatalog(filtered.slice(0, visibleCount), grid);
  loadMoreBtn.style.display = filtered.length > visibleCount ? 'flex' : 'none';
}

updateFilterCounts(courses, filterBtns);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filters__item--active'));
    btn.classList.add('filters__item--active');
    activeCategory = btn.dataset.category;
    visibleCount = PAGE_SIZE;
    update();
  });
});

searchInput.addEventListener('input', e => {
  searchQuery  = e.target.value;
  visibleCount = PAGE_SIZE;
  update();
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += PAGE_SIZE;
  update();
});

update();
