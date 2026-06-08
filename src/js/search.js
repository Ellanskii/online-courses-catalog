export function filterBySearch(courses, query) {
  const q = query.trim().toLowerCase();
  if (!q) return courses;
  return courses.filter(c => c.title.toLowerCase().includes(q));
}
