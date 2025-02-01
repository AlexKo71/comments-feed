export function formatTime(date) {
  const optionsDate = { year: "2-digit", month: "numeric", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  return `${date.toLocaleDateString(
    "ru-Ru",
    optionsDate
  )} ${date.toLocaleTimeString("ru-RU", optionsTime)}`;
}
