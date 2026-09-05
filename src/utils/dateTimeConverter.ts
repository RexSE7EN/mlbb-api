const dateToString= (date: Date) => {
  return date.toISOString().split('T')[0];
};

const stringToDate = (dateString: string) => {
  return new Date(dateString);
}

// parse 1s, 1m, 1h, 1d, 1w, 1M, 1y
const parseDuration = (duration: string): number => {
  const regex = /^(\d+)([smhdwMy])$/;
  const match = duration.match(regex);

  if (!match) {
    throw new Error('Invalid duration format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000; // seconds to milliseconds
    case 'm':
      return value * 60 * 1000; // minutes to milliseconds
    case 'h':
      return value * 60 * 60 * 1000; // hours to milliseconds
    case 'd':
      return value * 24 * 60 * 60 * 1000; // days to milliseconds
    case 'w':
      return value * 7 * 24 * 60 * 60 * 1000; // weeks to milliseconds
    case 'M':
      return value * 30 * 24 * 60 * 60 * 1000; // months to milliseconds (approximate)
    case 'y':
      return value * 365 * 24 * 60 * 60 * 1000; // years to milliseconds (approximate)
    default:
      throw new Error('Invalid duration unit');
  }
};

export { dateToString, stringToDate, parseDuration };
