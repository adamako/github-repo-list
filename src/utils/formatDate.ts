export default function formatDate(date: string) {
  return new Date(date).toISOString().split("T")[0];
}
