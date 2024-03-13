export const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("ru-RU", options);
};
