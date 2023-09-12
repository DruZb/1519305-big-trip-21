import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function findDurationPointTime(timeTo, timeFrom) {
  return dayjs.duration(Math.abs(dayjs(timeFrom) - dayjs(timeTo)), 'millisecond');
}
function getFormatedDuration(timeTo, timeFrom, format) {
  return dayjs.duration(Math.abs(dayjs(timeFrom) - dayjs(timeTo)), 'millisecond').format(format);
}

function convertDateTimePoint(date) {
  return date ? dayjs(date).format(DATE_TIME_FORMAT) : '';
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortPointUp(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortTimeUp(pointA, pointB) {
  const diffTimePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const diffTimePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const weight = getWeightForNullDate(diffTimePointA, diffTimePointB);
  return weight ?? dayjs(diffTimePointA).diff(dayjs(diffTimePointB));
}

function sortPriceUp(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.price, pointB.price);
  return weight ?? pointA.price - pointB.price;
}

export {
  getRandomArrayElement,
  getRandomNumber,
  humanizePointDate,
  humanizePointTime,
  findDurationPointTime,
  getFormatedDuration,
  convertDateTimePoint,
  sortPointUp, sortTimeUp, sortPriceUp
};
