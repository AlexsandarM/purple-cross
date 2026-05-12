export function toDateOrNull(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function compareDateValues(firstValue, secondValue) {
  const firstDate = toDateOrNull(firstValue);
  const secondDate = toDateOrNull(secondValue);

  if (!firstDate && !secondDate) {
    return 0;
  }

  if (!firstDate) {
    return 1;
  }

  if (!secondDate) {
    return -1;
  }

  return firstDate.getTime() - secondDate.getTime();
}

export function formatDate(value) {
  const date = toDateOrNull(value);
  if (!date) {
    return "N/A";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
