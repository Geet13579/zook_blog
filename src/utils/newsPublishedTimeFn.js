export default function newsPublishedTime(apiDateString) {
  const apiDate = new Date(apiDateString);

  const timeDifference = new Date() - apiDate;

  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (daysAgo > 10) {
    return apiDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  }
}
