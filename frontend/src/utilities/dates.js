function getYear() {
  const d = new Date();
  return d.getFullYear();
}

function formatLongDate(dateStr, dayName) {
  // create a Date object from the date string
  const dateDb = new Date(dateStr);

  // get the timezone offset in minutes
  const timezoneOffset = new Date().getTimezoneOffset();
  const date = new Date(dateDb.getTime() - (timezoneOffset * 60 * 1000));

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
  // Array of weekday names
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Get the weekday name and day of the month
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  
  // Get the ordinal suffix for the day
  const suffix = getOrdinalSuffix(day);
  
  // Array of month names
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Get the month name and year
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  // Construct the formatted date string
  return dayName ? `${weekday} ${day}${suffix} ${month} ${year}` : `${day}${suffix} ${month} ${year}`;
  
}

function formatMonthandYear(dateStr) {
  // create a Date object from the date string
  const date = new Date(dateStr);
  
  // Array of month names
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Get the month name and year
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  // Construct the formatted date string
  return `${month} ${year}`;
  
}

function getMonthName(dateStr) {
  const date = new Date(dateStr);
  
  // Array of month names
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Get the month name and year
  const month = months[date.getMonth()];
  
  // Construct the formatted date string
  return `${month}`;
}
  
export { getYear, formatLongDate, formatMonthandYear, getMonthName };