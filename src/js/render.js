const BADGE_LABELS = {
  marketing: 'Marketing',
  management: 'Management',
  hr: 'HR & Recruiting',
  design: 'Design',
  development: 'Development',
};

function createCard(course) {
  const card = document.createElement('article');
  card.className = 'card';

  const imageContent = course.image
    ? `<img class="card__image" src="${course.image}" alt="${course.title}" />`
    : '';

  card.innerHTML = `
    <div class="card__image-wrap">
      ${imageContent}
      <span class="card__badge card__badge--${course.category}">${BADGE_LABELS[course.category]}</span>
    </div>
    <div class="card__body">
      <h2 class="card__title">${course.title}</h2>
      <p class="card__author">${course.author}</p>
      <div class="card__footer">
        <span class="card__price">$${course.price}</span>
      </div>
    </div>
  `;

  return card;
}

export function renderCatalog(courses, container) {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  courses.forEach(course => fragment.appendChild(createCard(course)));
  container.appendChild(fragment);
}
