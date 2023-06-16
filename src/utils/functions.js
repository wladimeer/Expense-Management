import { fromUnixTime, format } from 'date-fns';

const toTitle = (text) => {
  const words = text.toLowerCase().split(' ');

  const newText = words.map((word) => (
    word.charAt(0).toUpperCase() + word.slice(1)
  ));

  return newText.join(' ');
}

const toChileanPesos = (value) => {
  const locales = { style: 'currency', currency: 'CLP', minumunFractionDigits: 3 }

  return new Intl.NumberFormat('en-US', locales).format(value);
}

const getDateFromUnixTime = (date) => {
  const newDate = fromUnixTime(date);

  return format(newDate, `MMMM dd Y`);
}

const getFormatDateFromUnixTime = (date) => {
  return fromUnixTime(date);
}

const compareUnixTimes = (firstUnixTime, secondUnixTime) => {
  const firstDate = fromUnixTime(firstUnixTime).getDate();
  const secondDate = fromUnixTime(secondUnixTime).getDate();

  return firstDate === secondDate;
}

export {
  toTitle, toChileanPesos, getDateFromUnixTime, compareUnixTimes,
  getFormatDateFromUnixTime
}