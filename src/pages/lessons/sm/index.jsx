import { CaChevronDown } from "@components/Icons";
import { useClickOutside } from "@react-hooks-library/core";
import cn from "classnames";
import { debounce, filter } from "lodash";
import moment from "moment";
import { useMemo, useRef } from "react";
import {
  Fragment,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { uuid } from "../../utils/Utils";
import { getDateBetween, getEvents } from "./constants";
import Event from "./event";
import s from "./index.module.css";

// import { Days } from "./index.logic";
const updateCalenderAndHeader = (attribute) => {
  const monthHeader = document.querySelector(`#monthHeader`);
  if (attribute !== null) {
    monthHeader.innerHTML = moment(attribute, "MM-YYYY").format("MMMM YYYY");
  }
};

const scrollToday = () => {
  const todayElement = document.querySelector(`[data-todaytarget="true"]`);
  const todayButton = document.querySelector(`#todayButton`);
  const containerBox = document.querySelector(`#containerBox`);

  if (todayElement != null && todayButton !== null) {
    const attribute = todayElement.getAttribute("data-dateitem");
    todayElement.scrollIntoView();
    // containerBox?.scrollTo(0, todayElement.offsetTop - 200);
    todayButton.setAttribute("data-alt", "true");
    todayButton.setAttribute("disabled", "true");

    updateCalenderAndHeader(attribute);
    // return attribute;
  }

  // return null;
};

function EventGridItem(props) {
  const { events, date, ...rest } = props;
  const navigate = useNavigate();
  const getState = (date) => {
    const eve = events.find((e) => e.date.isSame(date, "day"));
    if (!eve) return "unfilled";
    const reportSubmitted = eve.report;
    const eventDate = eve.date;
    const slotTime = date.clone();
    if (
      eventDate.isSame(slotTime, "hour") &&
      slotTime.isSame(moment(), "day")
    ) {
      return "current";
    }
    if (
      eventDate.isAfter(slotTime, "hour") &&
      slotTime.isAfter(moment(), "day")
    ) {
      return "future";
    }
    if (eventDate.isSame(slotTime, "hour")) {
      if (reportSubmitted) {
        return "reportComplete";
      } else {
        return "noReport";
      }
    }
    return "unfilled";
  };
  return (
    <div {...rest} className={s.gridItem}>
      <div className={"flex flex-col text-white"}>
        <p className="uppercase text-[13px] leading-[100.5%] font-[500] text-center">
          {date.format("ddd")}
        </p>
        <p className="text-base font-[700] text-center">{date.format("DD")}</p>
      </div>
      <div className="w-full h-full grid grid-cols-1 gap-[5px]">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={uuid()}
              title={"Speaking Class"}
              topic={"Food"}
              date={event.date}
              // onClick={() => navigate("event")}
              duration={45}
              state={getState(moment(event.date))}
            />
          ))
        ) : (
          <div className="h-[33px] w-full border-[#D9DAF3] border-solid border-[1px] rounded-[3px] flex flex-row font-[400] items-center pl-4 text-[#D9DAF3] text-[13px] leading-[124%]">
            No event planned
          </div>
        )}
      </div>
    </div>
  );
}

const Header = () => {
  const [show, setShowCalendar] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setShowCalendar(false);
  });
  const events = useMemo(() => getEvents(), []);
  return (
    <div ref={ref} className={cn(s.calendar, "header relative z-50")}>
      <div className="flex flex-row items-center">
        <div className={cn(s.dateHeading, "!mt-0")}>
          {/* {currentMoment.format("MMMM")}&nbsp;
          {currentMoment.format("YYYY")} */}
          <p className="flex flex-row" id="monthHeader"></p>
        </div>
        <div className={s.actions}>
          <button
            id="todayButton"
            className={cn(
              s.todayButton,
              "flex ml-1 items-center justify-center"
            )}
            onClick={() => {
              // throttle(() => {
              //   scrollToday();
              // }, 1000)();
              scrollToday();
            }}
          >
            Today
          </button>
          <div className={s.timezone}>GMT+01:00</div>
        </div>
      </div>
    </div>
  );
};
const DateHeading = ({ date, ...rest }) => {
  const id = uuid();

  return (
    <div {...rest} className={s.dateHeading}>
      {date.format("MMMM")}&nbsp;
      {date.format("YYYY")}
    </div>
  );
};
function LessonSm() {
  //Generate length is difference between the day the user signed
  //should also include one month from current d
  let signUpDate = moment();
  signUpDate.subtract(6, "months");
  let endDate = moment();
  endDate.add(2, "month");
  const dates = useMemo(() => getDateBetween(signUpDate, endDate), []);
  const events = useMemo(() => getEvents(), []);

  //ref to remember previous scroll position to check wether scrolling up or donw
  const scrollDirection = useRef(-1);

  ///fix for safari render issue disable today button until scroll end
  const handleEndScroll = useMemo(
    () =>
      debounce(() => {
        const todayButton = document.querySelector(`#todayButton`);
        todayButton.removeAttribute("disabled");
      }, 500),
    []
  );
  //Center the current day  when all dates are loaded
  useEffect(() => {
    scrollToday();
  }, [dates]);

  const handleHeading = async () => {
    //Change color of today button when the list is scrolled away
    const container = document.querySelector(`#containerBox`);
    const todayElement = document.querySelector(`[data-todaytarget="true"]`);
    const todayButton = document.querySelector(`#todayButton`);
    todayButton.setAttribute("disabled", "true");

    let DayDiff = Math.floor(todayElement?.offsetTop - container?.scrollTop);
    if (todayButton !== null) {
      if (DayDiff <= 340 && DayDiff > 50) {
        todayButton.setAttribute("data-alt", "true");
        todayButton.setAttribute("disabled", "true");
      } else {
        if (todayButton.getAttribute("data-alt") !== "false") {
          todayButton.setAttribute("data-alt", "false");
          todayButton.removeAttribute("disabled");
        }
      }
    }
    //Find heading closest to top and update header and min calendar
    const headings = document.querySelectorAll(`[data-heading]`);

    if (headings && container) {
      for (const heading of headings) {
        const diff = Math.floor(heading?.offsetTop - container?.scrollTop);
        let attribute = heading.getAttribute("data-date");
        if (scrollDirection.current > container.scrollTop) {
          if (diff < 100) updateCalenderAndHeader(attribute);
        } else {
          if (diff < 30 && diff > 0) updateCalenderAndHeader(attribute);
        }
      }
      scrollDirection.current = container.scrollTop;
    }

    handleEndScroll();
  };

  return (
    <div className="flex flex-col h-full gap-4 w-full pt-[3vh] px-3 sm:px-6">
      <div id="observerBox" className={s.observerBox}>
        <Header />
      </div>

      <div
        id={"containerBox"}
        onScroll={async () => {
          await handleHeading();
        }}
        className={cn("text-white w-full gap-6 overflow-y-auto", s.content)}
        style={{
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        {dates.map((value) => {
          const _item = moment(value, "DD-MM-YYYY");
          return (
            <Fragment key={uuid()}>
              {_item.date() === 1 && (
                <DateHeading
                  key={uuid()}
                  data-date={`${_item.format("MM-YYYY")}`}
                  data-heading={`${_item.format("MM-YYYY")}`}
                  date={_item}
                />
              )}
              <Fragment key={uuid()}>
                <EventGridItem
                  key={uuid()}
                  data-todaytarget={`${_item.isSame(moment(), "day")}`}
                  data-dateitem={`${_item.format("MM-YYYY")}`}
                  data-first={`${_item.date() === 1}`}
                  date={_item}
                  events={filter(events, (event) => {
                    return event.date.isSame(_item, "day");
                  })}
                />
              </Fragment>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default LessonSm;
