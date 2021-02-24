"use strict";

let monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDate = new Date();
let currentDay = currentDate.getDay();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById("dates");
let month = document.getElementById("month");
let year = document.getElementById("year");

let prevMonthDOM = document.getElementById("prev-month");
let nextMonthDOM = document.getElementById("next-month");

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener("click", () => lastMonth());
nextMonthDOM.addEventListener("click", () => nextMonth());

writeMonth(monthNumber);

function writeMonth(month) {
  for (let i = startDay(); i > 0; i--) {
    dates.innerHTML += ` <div class= "calendar__date calendar__item calendar__las-tdays" >${
      getTotalDays(monthNumber - 1) - (i - 1)
    }</div> `;
  }

  for (let i = 1; i <= getTotalDays(months); i++) {
    if (i === currentDate) {
      dates.innerHTML += ` <div class= "calendar__date calendar__item calendar__today" >${i}</div> `;
    } else {
      dates.innerHTML += ` <div class= "calendar__date calendar__item" >${i}</div> `;
    }
  }

  function getTotalDays(month) {
    if (month === -1) month = 11;

    if (
      month == 0 ||
      month == 2 ||
      month == 4 ||
      month == 6 ||
      month == 7 ||
      month == 11
    ) {
      return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
      return 30;
    } else {
      return isLeap() ? 29 : 28;
    }
  }

  function isLeap() {
    return (
      (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
      currentYear % 400 === 0
    );
  }

  function startDay() {
    let start = new Date(currentYear, monthNumber, 1);
    return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
  }

  function lasMonth() {
    if (monthNumber !== 0) {
      monthNumber--;
    } else {
      monthNumber = 11;
      currentYear--;
    }

    setNewDate();
  }

  function nextMonth() {
    if (monthNumber !== 11) {
      monthNumber++;
    } else {
      monthNumber = 0;
      currentYear++;
    }
    setNewDate();
  }

  function setNewDate() {
    currentDate.setFullYear(currentYear, monthNumber.currentDate);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = "";
    writeMonth(monthNumber);
  }
}
