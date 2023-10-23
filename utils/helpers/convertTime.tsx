export const convertTime = (timestamp) => {
  const dateObj = new Date(timestamp);
  const formattedDate = dateObj.toLocaleString('en-US', {
    timeZoneName: 'short',
  });
  return formattedDate;
};

export const dateToTimestamp = (timestamp) => {
  if (
    !timestamp ||
    timestamp === null ||
    Object.prototype.toString.call(new Date(timestamp)) !== '[object Date]'
  ) {
    return '';
  }
  const dateObj = new Date(timestamp);
  const stringDate = dateObj
    .toISOString()
    .replace(/projects/, ' ')
    .replace(/\..+/, '');
  return stringDate;
};

export const checkAfterDate = (timestamp) => {
  if (!timestamp || timestamp === null) {
    return false;
  }
  const newDate = new Date(timestamp);
  if (newDate >= new Date()) {
    return true;
  } else return false;
};
