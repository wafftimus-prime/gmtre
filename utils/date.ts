// import {DateFormatType,  eCommonDateFormatOptions } from '../../models';
import { DateFormatType, eCommonDateFormatOptions } from '@gmtre-core';
import { isNullOrUndefined } from './object';

export function GetFormattedDate(iDate: Date) {
  let month = (iDate.getMonth() + 1).toString();
  let day = iDate.getDate().toString();
  let year = iDate.getFullYear().toString();
  month = month.length < 2 ? `0${month}` : month;
  day = day.length < 2 ? `0${day}` : day;
  return `${month}/${day}/${year}`;
}

export function convertToUTC(date: Date): Date {
  const now = new Date(date.toString()),
    year = now.getUTCFullYear(),
    month = now.getUTCMonth() + 1,
    day = now.getUTCDate(),
    hour = now.getUTCHours(),
    minute = now.getUTCMinutes(),
    seconds = now.getUTCSeconds();
  return new Date(`${month}/${day}/${year} ${hour}:${minute}:${seconds}`);
}

export function getDateTimeDiff(
  type: 'min' | 'sec' | 'hr' | 'day',
  timeExp: Date,
  isUTC: boolean
): number {
  switch (type) {
    case 'day': {
      return (
        (getEpochTime(timeExp, isUTC) - getEpochTime(new Date(), isUTC)) /
        60 /
        60 /
        24
      );
    }
    case 'hr': {
      return (
        (getEpochTime(timeExp, isUTC) - getEpochTime(new Date(), isUTC)) /
        60 /
        60
      );
    }
    case 'min': {
      return (
        (getEpochTime(timeExp, isUTC) - getEpochTime(new Date(), isUTC)) / 60
      );
    }
    case 'sec': {
      return getEpochTime(timeExp, isUTC) - getEpochTime(new Date(), isUTC);
    }
  }
}

export function get2DateTimeDiff(
  type: 'min' | 'sec' | 'hr' | 'day',
  start: Date,
  end: Date,
  isUTC: boolean
): number {
  switch (type) {
    case 'day': {
      return (
        (getEpochTime(start, isUTC) - getEpochTime(end, isUTC)) / 60 / 60 / 24
      );
    }
    case 'hr': {
      return (getEpochTime(start, isUTC) - getEpochTime(end, isUTC)) / 60 / 60;
    }
    case 'min': {
      return (getEpochTime(start, isUTC) - getEpochTime(end, isUTC)) / 60;
    }
    case 'sec': {
      return getEpochTime(start, isUTC) - getEpochTime(end, isUTC);
    }
  }
}

export function getEpochTime(date: Date, UTC: boolean) {
  const utcDateTime = convertToUTC(date);
  return UTC
    ? Math.floor(utcDateTime.getTime() / 1000)
    : Math.floor(date.getTime() / 1000);
}

export function currentDateTime(UTC: boolean) {
  return UTC
    ? convertToUTC(new Date()).toLocaleString()
    : new Date().toLocaleString();
}

export function isExpired(expiration: Date, isUTC: boolean): boolean {
  const currentTs = getEpochTime(new Date(currentDateTime(isUTC)), isUTC);
  const expTs = getEpochTime(expiration, isUTC);
  return currentTs > expTs;
}

export function getMinutesToExpiration(
  expiration: Date,
  isUTC: boolean
): number {
  return (
    (getEpochTime(expiration, isUTC) - getEpochTime(new Date(), isUTC)) / 60
  );
}

export function getSecondsToExpiration(
  expiration: Date,
  isUTC: boolean
): number {
  return getEpochTime(expiration, isUTC) - getEpochTime(new Date(), isUTC);
}

export function getTimestamp(): number {
  return new Date().getTime();
}

export function getUTCTimeStamp(): number {
  return getDateTimestamp(getUTCDateTime());
}

export function getDateTimestamp(date: Date): number {
  return new Date(date).getTime();
}

export function getDateTime(): Date {
  return new Date();
}

export function nonce(): number {
  return getTimestamp();
}

export function getUTCDateTime(): Date {
  const now = new Date(),
    year = now.getUTCFullYear(),
    month = now.getUTCMonth() + 1,
    day = now.getUTCDate(),
    hour = now.getUTCHours(),
    minute = now.getUTCMinutes(),
    seconds = now.getUTCSeconds();
  return new Date(`${month}/${day}/${year} ${hour}:${minute}:${seconds}`);
}

export function formatHandler(format: DateFormatType, rawDate: number) {
  switch (format) {
    case eCommonDateFormatOptions.full:
      return new Date(rawDate);
    case eCommonDateFormatOptions.timestamp:
      return rawDate;

    default:
      return rawDate

  }
}

export function addYears(date: Date, years: number, format: DateFormatType) {
  const dateVal = date.setFullYear(date.getFullYear() + years);
  return formatHandler(format, dateVal);
}

export function addMonths(date: Date, months: number, format: DateFormatType) {
  const dateVal = date.setMonth(date.getMonth() + months);
  return formatHandler(format, dateVal);
}

export function addDays(date: Date, days: number, format: DateFormatType) {
  const dateVal = date.setDate(date.getDate() + days);
  return formatHandler(format, dateVal);
}

export function addHours(date: Date, hours: number, format: DateFormatType) {
  const dateVal = date.setHours(date.getHours() + hours);
  return formatHandler(format, dateVal);
}

export function addMinutes(
  date: Date,
  minutes: number,
  format: DateFormatType
) {
  const dateVal = date.setMinutes(date.getMinutes() + minutes);
  return formatHandler(format, dateVal);
}

export function getMonth(date: Date): string {
  let month = date.getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
}

export function getDayofMonth(date: Date): string {
  let day = date.getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return `${day}`;
}

type dateFormat = 'yyyyMMdd' | 'yyyy' | 'MM' | 'dd';

export function formatDate(date: Date, format: dateFormat): string |any{
  if (isNullOrUndefined(date)) {
    return '';
  }
  switch (format) {
    case 'dd':
      return `${getDayofMonth(date)}`;
    case 'MM':
      return `${getMonth(date)}`;
    case 'yyyyMMdd':
      return `${date.getFullYear()}${getMonth(date)}${getDayofMonth(date)}`;
    default:
      return null;
  }
}

export function timePast(seconds: number): string {
  let _timePast = '';
  let days = Math.floor(seconds / 86400);
  let hours = Math.floor((seconds - days * 86400) / 3600);
  let minutes = Math.floor((seconds - days * 86400 - hours * 3600) / 60);
  let _seconds = seconds - days * 86400 - hours * 3600 - minutes * 60;
  if (days > 0) _timePast = _timePast + days + (days > 1 ? ' Days ' : ' Day ');
  if (hours > 0)
    _timePast = _timePast + hours + (hours > 1 ? ' Hours ' : ' Hour ');
  if (minutes > 0)
    _timePast = _timePast + minutes + (minutes > 1 ? ' Minutes ' : ' Minute ');
  if (_seconds > 0)
    _timePast =
      _timePast + _seconds + (_seconds > 1 ? ' Seconds ' : ' Second ');
  return _timePast;
}
