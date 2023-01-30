import moment from "moment";
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
export const Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * It returns an array of 14 strings, each string representing a time in the format of "HH:mm" starting
 * from 8:00am
 * @returns An array of strings, each string representing a time in the format HH:mm.
 */
export const getTime = () => {
  const time = moment({ hour: 8 });
  return Array(14)
    .fill(0)
    .map((i, idx) => time.clone().add("hour", idx).format("HH:mm"));
};
/**
 * It takes an array of objects, and returns true if the array contains at least 3 unique values of a
 * specific property
 * @param {SelectedSlot[]} values - SelectedSlot[] - This is the array of selected slots.
 * @returns A function that takes in an array of SelectedSlot objects and returns a boolean.
 */
export const validateSlots = (values) => {
  const numberOfAvailableSlots = values.filter(
    (r) => r.isSelected === false
  ).length;
  if (numberOfAvailableSlots >= 10) {
    let daysSelected = [];
    values.forEach((item) => {
      if (!daysSelected.includes(item.value.day) && !item.isSelected) {
        daysSelected.push(item.value.day);
      }
    });
    return daysSelected.length >= 3;
  }
  return false;
};
export const generateSlots = (week) => {
  //  day: Days[i % 7],                    time: times[Math.floor(i / 7)],
  const times = getTime();
  const arr = Array.from({ length: 98 }, (_, i) => {
    const value = {
      value: {
        day: Days[i % 7],
        time: times[Math.floor(i / 7)],
        date: week[i % 7],
      },
      isSelected: false,
      id: "slot" + i,
    };
    return value;
  });
  return arr;
};
