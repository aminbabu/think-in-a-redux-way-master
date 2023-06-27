export const formatDate = (dateString) => {
  const DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };

  const date = new Date(dateString)
    .toLocaleDateString("en-US", DateTimeFormatOptions)
    .replace(/\//g, "-");

  return date;
};
