export function formatDatetime(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace("T", " ");
}
