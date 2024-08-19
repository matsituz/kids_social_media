export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setDate(date.getDate() + (days || 1)); // If days is not provided, default to 1 day

  const encodedValue = encodeURIComponent(value); // Encode the value
  document.cookie = `${name}=${encodedValue}; expires=${date.toUTCString()}; path=/`; // Set the cookie
};
