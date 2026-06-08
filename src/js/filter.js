export function filterByCategory(courses, category) {
  if (category === 'all') return courses;
  return courses.filter(c => c.category === category);
}

export function updateFilterCounts(allCourses, buttons) {
  buttons.forEach(btn => {
    const category = btn.dataset.category;
    const count = category === 'all'
      ? allCourses.length
      : allCourses.filter(c => c.category === category).length;
    btn.querySelector('.filters__count').textContent = count;
  });
}
