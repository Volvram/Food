export const shuffle = (array: any) => {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }
  return;
};
