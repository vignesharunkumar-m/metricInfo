export const getSubStringText = (text = '', txtLength = 15) => {
  if (text) {
    return text.length > txtLength
      ? text.substring(0, txtLength) + '...'
      : text;
  }
  return '';
};

export const getWorkedHoursLabel = (
  intime: string,
  outtime: string,
  isTimeFormat = true,
) => {
  const convertToMinutes = (time: string) => {
    const [timePart, modifier] = time.split(' ');

    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }

    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const inMinutes = convertToMinutes(intime);
  const outMinutes = convertToMinutes(outtime);

  const totalMinutes = outMinutes - inMinutes;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return isTimeFormat
    ? `${hours}h ${minutes}mins`
    : `${paddedHours}:${paddedMinutes}`;
};
