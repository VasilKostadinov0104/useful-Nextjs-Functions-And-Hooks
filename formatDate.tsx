import React from "react";

type options = {
  withTime?: boolean;
  onlyTime?: boolean;
};
export default function formatDate(
  unformattedDate,
  options: options = { withTime: false, onlyTime: false }
) {
  const date = new Date(unformattedDate);
  const day = date.getDate();
  const monthNames = [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let STRING = `${day} ${month} ${year}`;

  if (options.withTime) {
    STRING = `${hour}:${minute}ч. / ` + STRING;
  }

  if (options.onlyTime && !options.withTime) {
    STRING = `${hour}:${minute}ч.`;
  }

  return STRING;
}
export function getDay(unformattedDate) {
  const date = new Date(unformattedDate);
  const day = date.getDate();
  return day;
}
export function getMonth(unformattedDate) {
  const date = new Date(unformattedDate);
  const monthNames = [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ];
  const month = monthNames[date.getMonth()];
  return month;
}
export function getYear(unformattedDate) {
  const date = new Date(unformattedDate);
  const year = date.getFullYear();
  return year;
}
export function getDaysTillNow(unformattedDate) {
  const dateNow = Date.now();
  const date: any = new Date(unformattedDate);
  return Number(((dateNow - date) / 1000 / 60 / 60 / 24).toFixed());
}

export function getDaysTillDate(unformattedDate, tillDate) {
  const dateNow = new Date(tillDate);
  const date: any = new Date(unformattedDate);
  return Math.abs(Number(((tillDate - date) / 1000 / 60 / 60 / 24).toFixed()));
}
