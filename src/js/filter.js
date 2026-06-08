export function filterByCategory(courses, category) {
  if (category === 'all') return courses;
  return courses.filter(course => course.category === category);
}

export function updateFilterCounts(courses, buttons) {
  buttons.forEach(btn => {
    const category = btn.dataset.category;
    const count = category === 'all'
      ? courses.length
      : courses.filter(c => c.category === category).length;
    btn.textContent = `${btn.textContent.replace(/ \(\d+\)$/, '')} (${count})`;
  });
}
