const BADGE_LABELS = {
  marketing:   'Marketing',
  management:  'Management',
  hr:          'HR & Recruiting',
  design:      'Design',
  development: 'Development',
};

function createCard(course) {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <div class="card__preview">
      <img
        class="card__photo"
        src="${course.image}"
        alt="${course.title}"
        loading="lazy"
      />
    </div>
    <div class="card__body">
      <span class="card__badge card__badge--${course.category}">
        ${BADGE_LABELS[course.category]}
      </span>
      <h2 class="card__title">${course.title}</h2>
      <div class="card__meta">
        <span class="card__price">$${course.price}</span>
        <span class="card__divider">|</span>
        <span class="card__author">by ${course.author}</span>
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
