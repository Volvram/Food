export const formatDate = (date: string | Date, locale?: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(locale ?? "ru-RU", options);
};
