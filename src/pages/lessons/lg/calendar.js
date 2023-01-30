import moment, { Moment } from "moment";
/* Creating an array of months. */
export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/* Creating an array of days of the week. */
export const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getDate = (date) => {
  var calendar = [];
  const startDate = date.clone().startOf("month").startOf("isoWeek");
  const endDate = date.clone().endOf("month");
  const day = startDate.clone().subtract(1, "day");
  while (day.isBefore(endDate, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone().format("DD-MM-YYYY"))
    );
  }
  return calendar;
};
export const getDateTruncated = (date) => {
  var calendar = [];
  const startDate = date.clone().startOf("month").startOf("isoWeek");
  const endDate = date.clone().endOf("month");
  const day = startDate.clone().subtract(1, "day");
  while (day.isBefore(endDate, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone().format("DD-MM-YYYY"))
    );
  }

  const m = moment();
  if (calendar.length > 5) {
    if (m.date() >= 26) {
      return calendar.slice(1);
    } else {
      calendar.pop();
    }
  }
  return calendar;
};

export const getEvents = () => {
  const eventDates = moment({ hour: 9 });
  const events = [
    {
      report: false,
      date: eventDates.clone(),
    },
  ];
  eventDates.subtract(3, "days");
  eventDates.hour(10);
  events.push({
    date: eventDates.clone(),
    report: true,
  });
  eventDates.add(2, "days");
  eventDates.hour(10);
  events.push({
    date: eventDates.clone(),
    report: false,
  });
  eventDates.subtract(5, "day");
  eventDates.hour(21);
  events.push({
    date: eventDates.clone(),
    report: false,
  });
  return events;
};
