export function filterBySearch(courses, query) {
  const q = query.trim().toLowerCase();
  if (!q) return courses;
  return courses.filter(course => course.title.toLowerCase().includes(q));
}
