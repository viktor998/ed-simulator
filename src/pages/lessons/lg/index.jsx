import { CaChevronLeft, CaChevronRight } from "@components/Icons";
import { Box, Stack } from "@mui/material";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import React from "react";
import { useMemo } from "react";

import { uuid } from "../../utils/Utils";
import { getEvents } from "./calendar";
import { Days, generateSlots, getTime } from "./functions";
import Container, { useLogic } from "./index.container";
import s from "./index.module.css";
import PopUp from "./pop-up";
import Slot from "./slot";

export const Progress = {
  START: 0,
  CONFIRM: 1,
  COMPLETE: 2,
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

function LessonsLg() {
  return (
    <Container>
      <Main />
    </Container>
  );
}

export function Main() {
  const [state, setState] = useState(Progress.START);
  const times = getTime();

  useEffect(() => {
    const handler = () => {
      const subText = document.getElementById("not");
      const grid = document.getElementById("slotGrid");
      if (subText !== null && grid !== null) {
        const dimensions = grid.childNodes[0].getBoundingClientRect();
        subText.style.setProperty("--av-b-h", `${dimensions.height}px`);
        subText.style.setProperty("--av-b-w", `${dimensions.width}px`);
      }
    };
    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const events = getEvents();

  const getState = (date, hour) => {
    const eve = events.find((e) => e.date.isSame(date, "day"));
    if (!eve) return "unfilled";
    const reportSubmitted = eve.report;
    const eventDate = eve.date;
    const slotTime = date.clone();
    slotTime.hour(Number(hour.split(":")[0]));

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

  const { week, nextWeek, previousWeek, today, isCurrentWeek } = useLogic();
  const slots = useMemo(() => generateSlots(week), [week]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("week.index", isCurrentWeek);
  return (
    <Box
      sx={{
        gridTemplateRows: "1fr 8fr 5fr",
      }}
      className={cn("w-full", s.root)}
    >
      <div className={cn(s.header, "")}>
        <p className={s.dateHeading}>{`CW ${moment(
          week.at(-1),
          "DD-MM-YYYY"
        ).isoWeek()}: ${moment(week[0], "DD-MM-YYYY").format(
          "DD  MMMM"
        )} - ${moment(week.at(-1), "DD-MM-YYYY").format("DD  MMMM")}`}</p>
        <div className={s.options}>
          <div className={cn(s.actions)}>
            <button
              onClick={() => {
                previousWeek();
              }}
            >
              <CaChevronLeft />
            </button>
            <button
              onClick={() => {
                nextWeek();
              }}
            >
              <CaChevronRight />
            </button>
          </div>
          <button
            disabled={isCurrentWeek}
            className={cn(s.todayButton, "flex items-center justify-center", {
              "!text-[#2D224C]": isCurrentWeek,
              "!bg-[#D9DAF3]": isCurrentWeek,
            })}
            onClick={() => today()}
          >
            Today
          </button>
          <div className={s.timezone}>GMT+01:00</div>
        </div>
      </div>

      <div className={s.availabilityGrid}>
        <Stack
          direction="column"
          className="gap-2 lg:ml-[48px] lg:gap-[min(1vh,13px)] mb-3"
        >
          <div className={cn(s.dayLabels)}>
            {Days.map((day) => (
              <p key={uuid()}>{day}</p>
            ))}
          </div>
          <div className={cn(s.dateLabels)}>
            {week.map((day) => (
              <p
                className={cn({
                  [s.today]: moment(day, "DD-MM-YYYY").isSame(moment(), "day"),
                })}
                key={uuid()}
              >
                <span> {moment(day, "DD-MM-YYYY").format("DD")}</span>
              </p>
            ))}
          </div>
        </Stack>
        <div className="flex flex-row h-full gap-[14px]">
          <div className={cn(s.timeLabels)}>
            {times.map((i) => (
              <p key={uuid()}>{i}</p>
            ))}
          </div>
          <div id={"slotGrid"} className={s.grid}>
            {slots.map((i, idx) => {
              const _s = getState(
                moment(i.value.date, "DD-MM-YYYY"),
                i.value.time
              );
              return (
                <Slot
                  id={i.id}
                  key={i.id}
                  onClick={() =>
                    _s !== "unfilled"
                      ? setSelectedEvent({
                          date: moment(
                            i.value.date + " " + i.value.time,
                            "DD-MM-YYYY hh:mm"
                          ),
                          state: _s,
                        })
                      : setSelectedEvent(null)
                  }
                  state={_s}
                />
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            initial={variants.closed}
            animate={variants.open}
            exit={variants.closed}
            style={{
              maxHeight: "265px",
              display: "grid",
              // flexDirection: "row",
              width: "auto",
            }}
          >
            <PopUp event={selectedEvent} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default LessonsLg;
