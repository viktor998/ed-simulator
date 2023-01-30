import moment from "moment";
import { createContext, useContext, useState } from "react";
import { getDate } from "./calendar";
import { useEffect } from "react";

const LogicContext = createContext({
  previousWeek: () => {},
  nextWeek: () => {},
  week: [],
  isCurrentWeek: false,
  today: () => {},
});
export default function Container(props) {
  const getMoment = (value) => {
    let date = moment();
    if (value < 0) {
      date.subtract(Math.abs(value), "month");
    } else {
      date.add(value, "month");
    }
    return date.clone();
  };

  const initialWeeks = getDate(getMoment(0));
  const [weekIndex, setWeekIndex] = useState(0); // create  index
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // create  index
  const [weeks, setWeeks] = useState(initialWeeks); // create  index
  const [index, setIndex] = useState(0); // create  index

  useEffect(() => {
    let date = moment();
    weeks.forEach((week, idx) => {
      if (week.includes(date.format("DD-MM-YYYY"))) {
        setWeekIndex(idx);
        setCurrentWeekIndex(idx);
        return;
      }
    });
  }, []);

  const nextWeek = () => {
    let addEnd = weekIndex + 1;
    if (addEnd >= weeks.length) {
      setWeeks(getDate(getMoment(index + 1)));
      setIndex((r) => r + 1);
      setWeekIndex(0);
    } else {
      setWeekIndex(addEnd);
    }
  };

  const previousWeek = () => {
    let sub = weekIndex - 1;
    if (sub < 0) {
      const _weeks = getDate(getMoment(index - 1));
      setWeeks(_weeks);
      setIndex((r) => r - 1);
      setWeekIndex(_weeks.length - 1);
    } else {
      setWeekIndex(sub);
    }
  };
  const today = () => {
    const _weeks = getDate(getMoment(0));
    let date = moment();
    setWeeks(_weeks);
    setIndex(0);
    _weeks.forEach((week, idx) => {
      if (week.includes(date.format("DD-MM-YYYY"))) {
        setWeekIndex(idx);
        return;
      }
    });
  };

  return (
    <LogicContext.Provider
      value={{
        previousWeek,
        nextWeek,
        week: weeks[weekIndex],
        isCurrentWeek: weekIndex === currentWeekIndex && index === 0,
        today,
      }}
    >
      {props.children}
    </LogicContext.Provider>
  );
}
export function useLogic() {
  return useContext(LogicContext);
}
