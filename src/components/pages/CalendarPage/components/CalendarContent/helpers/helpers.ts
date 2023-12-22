type DateWeekMock = {
  date: number;
  dayOfWeek: string;
  isToday: boolean;
};
export function getNextWeekDatesAndDays(): DateWeekMock[] {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // Воскресенье - 0, понедельник - 1, ..., суббота - 6
  const daysUntilNextFriday =
    currentDayOfWeek <= 5 ? 5 - currentDayOfWeek : 5 + (7 - currentDayOfWeek);

  const nextFriday = new Date(currentDate);
  nextFriday.setDate(currentDate.getDate() + daysUntilNextFriday);

  const nextWeekDatesAndDays = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(nextFriday);
    nextDate.setDate(nextFriday.getDate() + i);
    nextWeekDatesAndDays.push({
      date: nextDate.getDate(),
      dayOfWeek: daysOfWeek[nextDate.getDay()],
      isToday: i === 0 && currentDayOfWeek === 5, // Помечаем текущий день недели как сегодня
    });
  }

  return nextWeekDatesAndDays;
}
