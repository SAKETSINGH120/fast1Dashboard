export const formatDateTime = (date) => {
  const d = new Date(date);

  console.log("d", d);

  const dateStr = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeStr = d
    .toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return `${dateStr} • ${timeStr}`;
};
