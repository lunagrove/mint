import { monthNames, weekDays } from "../utilities/constants";

function getYear() {
  const d = new Date();
  return d.getFullYear();
}

function formatLongDate(dateStr, dayName) {
  const dateDb = new Date(dateStr);
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
  
  const weekday = weekDays[date.getDay()];
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return dayName ? `${weekday} ${day}${suffix} ${month} ${year}` : `${day}${suffix} ${month} ${year}`;
}

function formatMonthandYear(dateStr) {
  const parts = dateStr.split('-');
  const mm = parseInt(parts[1]);
  const month = monthNames[mm-1];
  const year = parts[0];
  return `${month} ${year}`;
}

function getMonthName(dateStr) {
  const date = new Date(dateStr);
  const month = monthNames[date.getMonth()];

  return `${month}`;
}

function formatFirstOfMonthDate(year, month) {
  const monthIndex = monthNames.indexOf(month) + 1;
  const formattedMonth = (monthIndex).toString().padStart(2, '0');
  const formattedDate = `${year}-${formattedMonth}-01`;

  return formattedDate;
}

function formatShortDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
  
export { getYear, formatLongDate, formatMonthandYear, getMonthName, formatFirstOfMonthDate, formatShortDate };