const toFormattedDateTimeString = (timestamp: number): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }).format(timestamp * 1000);
};

export { toFormattedDateTimeString };
