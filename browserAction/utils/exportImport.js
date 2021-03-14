export const exportLocalStorage = () => {
  return JSON.stringify(Object.entries(window.localStorage).reduce((acc, [key, value]) => {
    acc[key] = JSON.parse(value);
    return acc;
  }, {}), null, 2);
}
