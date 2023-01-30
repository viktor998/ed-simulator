import moment, { duration, Moment } from "moment";
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CaChevronLeft, CaPdf, CaVideo } from "../../../../../components/Icons";
import s from "./index.module.css";

// import { Months, renderCalendar } from "./index.logic";
import { useLogic } from "../../../../../layouts/default/index.container";
import cn from "classnames";

function EventDetails(props) {
  const {
    isPast = false,
    title = "Speaking class",
    topic = "Food",
    date = moment({ day: 1, month: 4, year: 2022, h: 9, minutes: 45 }),
    duration = 45,
    requestClose,
    materials = ["Video Listening Introduzione"],
    ...rest
  } = props;
  const navigate = useNavigate();
  //use logic from mobile menu
  const { setBurgerButton } = useLogic();
  useEffect(() => {
    setBurgerButton(
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 10.7931L12 19"
            stroke="#2D224C"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </button>
    );
    return () => {
      setBurgerButton(null);
    };
  }, []);
  return (
    <div data-past={`${isPast}`} className={s.root}>
      {/* <div className="flex flex-col relative py-6"> */}
      <div className={s.header}>
        <div className={s.eventTitle}>
          <h3>{title}</h3>
          <div className="flex flex-col gap-1">
            <h5>Topic</h5>
            <p>{topic}</p>
          </div>
          <div className={"flex flex-col gap-1"}>
            <h5>Date</h5>
            <p className="uppercase">{date.format("ddd DD/MM/YYYY")}</p>
          </div>
        </div>
      </div>
      <div className={cn("flex flex-col  relative z-[3] pt-[2vh]", s.content)}>
        <div className={s.imageDurationRow}>
          <div className={s.image}>
            <img src={"/src/assets/tutor.png"} alt="img" />
            <p>Liam</p>
          </div>
          <div className="flex flex-col mt-auto gap-4">
            <div className={s.detail}>
              <h5>Time</h5>
              <p>
                {date.format("hh:mm")}-
                {date.add(duration, "minutes").format("hh:mm")}
              </p>
            </div>
            <div className={s.detail}>
              <h5>Duration</h5>
              <p>{duration}&nbsp;minutes</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col px-6 w-full relative top-[-16%]">
          <button
            onClick={() => requestClose && requestClose()}
            className={s.button}
          >
            {isPast ? "watch recording" : "Join Class"}
          </button>
          <div className={s.material}>
            <p> Material:</p>
            <ul>
              {/* {materials.map((r) => (
            <li key={uuid()}>
              <a href="/#">{r}</a>
            </li>
          ))} */}
              <li>
                <CaVideo /> <a href="/#">Video Listening Introduzione</a>
              </li>
              <li>
                <CaPdf />
                <a href="/#">Video Listening Introduzione</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.bgWhite} />

      {/* </div> */}
    </div>
  );
}

export default EventDetails;
