import moment from "moment";

/**
 * It creates a new moment object, then adds two hours to it, then adds one month to it, then pushes
 * three objects to an array
 * @returns An array of objects with the following properties:
 *   title: string
 *   topic: string
 *   date: moment
 *   duration: number
 */
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

/**
 * It takes two dates, one for the start of the month and one for the end of the month, and returns an
 * array of arrays of strings, where each string is a date in the format DD-MM-YYYY
 * @param {Moment} startDate - Moment - The start date of the calendar
 * @param {Moment} endDate - Moment - The end date of the calendar
 * @returns An array of arrays of strings.
 */
export const getDateBetween = (startDate, endDate) => {
  var calendar = [];
  const _startDate = startDate.clone().startOf("month").startOf("isoWeek");
  const _endDate = endDate.clone().endOf("month");
  const day = _startDate.clone().subtract(1, "day");
  while (day.isBefore(_endDate, "day")) {
    calendar.push(day.add(1, "day").clone().format("DD-MM-YYYY"));
  }
  return calendar;
};
