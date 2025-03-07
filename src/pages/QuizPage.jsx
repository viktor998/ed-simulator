import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _questions from "../assets/questions.json";
import questions_existing from "../assets/questions_existing.json";

import ContentView from "./common/ContentView";
import axios from "axios";
const BASE = import.meta.env.VITE_BASE_URL_ADMIN;

document.title = "Edusogno Simulatore";

const QuizPage = ({ existing = false }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [points, setPoints] = useState(0);
  const [leadData, setLeadData] = useState(null);
  const navigate = useNavigate();
  const { token, tracking_id } = useParams();

  const questions = existing && token ? questions_existing : _questions;

  const getLevel = () => {
    const correctAnswers = questions.map((q) => q.correctAnswer);
    let points = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        points++;
      }
    });

    let level = "";

    if (existing && token) {
      if (points <= 20) {
        level = "A1";
      } else if (points <= 35 && points > 20) {
        level = "A1/A2";
      } else if (points <= 60 && points > 35) {
        level = "A2";
      } else if (points <= 85 && points > 60) {
        level = "B1";
      } else if (points <= 100 && points > 85) {
        level = "B2";
      }
    } else {
      // OLD
      // if (points <= 3) {
      //   level = "A1";
      // } else if (points <= 7 && points > 3) {
      //   level = "A2";
      // } else if (points <= 10 && points > 7) {
      //   level = "B1";
      // } else if (points <= 14 && points > 10) {
      //   level = "B2";
      // } else if (points >= 18) {
      //   level = "C1";
      // }

      if (points <= 8) {
        level = "A1";
      } else if (points <= 13 && points > 8) {
        level = "A2";
      } else if (points <= 18 && points > 13) {
        level = "B1";
      } else if (points <= 22 && points > 19) {
        level = "B2";
      } else if (points <= 24 && points > 22) {
        level = "C1";
      } else if (points > 24) {
        level = "C1 +";
      }
    }

    return { points, level };
  };

  const smUp = useMediaQuery("(max-width:1047px)");
  const next = () => {
    if (activeQuestion === questions.length - 1) {
      //calculate points
      const { points, level } = getLevel();
      navigate("/results", { state: { points, level, token, leadData } });
    }
    setActiveQuestion((r) => r + 1);
  };
  const back = () => {
    if (activeQuestion === 0) {
      navigate(-1);
      return;
    }
    setActiveQuestion((r) => r - 1);
  };
  const selectAnswer = (value) => {
    const dpCopyAnswer = [...answers];
    dpCopyAnswer[activeQuestion] = value;
    setAnswers(dpCopyAnswer);
  };

  const getAdsData = async () => {
    const adsData = await axios
      .post(
        BASE + `v1/lead/${tracking_id}`,
        { tracking_id },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => res.data);

    // console.log({ adsData });

    if (adsData?.[0].label !== "") {
      let urlParams =
        "?" +
        adsData
          .map((ad) => {
            if (ad.label !== "complete_url") {
              return `${ad.label}=${ad.value}`;
            }
          })
          .filter((ad) => ad !== undefined)
          .join("&");
      setLeadData(urlParams);
    }
  };

  React.useEffect(() => {
    if (!tracking_id) return;

    getAdsData();
  }, [tracking_id]);

  return (
    <ContentView
      disabled={!Boolean(answers[activeQuestion])}
      onClick={() => {
        next();
      }}
      onBack={() => back()}
      progress={(activeQuestion + 0.01) / (questions.length - 1)}
    >
      <Typography
        color={"primary"}
        sx={{
          fontSize: "calc(22px + 1vw)",
          textAlign: "center",
          ["@media (max-width:763px)"]: {
            minHeight: "80px",
          },
        }}
      >
        {questions[activeQuestion].question}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "90%",
          gap: "1rem",

          "& button": {
            fontWeight: "400",
            maxHeight: "56px",
          },
          ["@media (min-width:763px)"]: {
            gridTemplateColumns: Array.from({ length: questions[activeQuestion].options?.length }, () => "1fr").join(" "),
            marginTop: "10vh",
            "& button": {
              width: "100%",
              minWidth: "174px",
              textTransform: "none",
              fontSize: "24px",
            },
          },
          ["@media (min-width:1047px)"]: {
            "& button": {
              width: "100%",
              minWidth: "calc(200px + 5vw)",
              textTransform: "none",
            },
          },
          ["@media (max-width:763px)"]: {
            "& button": {
              minWidth: "90vw",
              textTransform: "none",
            },
          },
        }}
      >
        {questions[activeQuestion].options.map((r, i) => (
          <Button
            key={i}
            size="large"
            variant="contained"
            disableElevation
            color={r === answers[activeQuestion] ? "primary" : "buttonBack"}
            onClick={() => {
              selectAnswer(r);
            }}
            sx={{
              color: r === answers[activeQuestion] ? "#ffffff" : "#2D224C!important",
            }}
          >
            {r}
          </Button>
        ))}
      </Box>
      {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
            "& button": {
              width: "254px",
            },
            ["@media (max-width:1047px)"]: {
              "& button": {
                aspectRatio: "1/1",
                borderRadius: "50%!important",
                width: "initial",
              },
            },
          }}
        >
          {activeQuestion !== 0 && (
            <Button
              variant="contained"
              color="buttonBack"
              size="large"
              // sx={{ }}
              onClick={() => back()}
            >
              <ArrowBackIosRounded
                fontSize={smUp ? "small" : "medium"}
                className="lg:absolute lg:left-4"
              />
              {!smUp && <span>back</span>}
            </Button>
          )} */}
      {/* <Button
          disabled={!Boolean(answers[activeQuestion])}
          variant="contained"
          color="button"
          size="large"
          onClick={() => next()}
        >
          {!smUp && <span>Next</span>}
          <ArrowForwardIosRounded
            className="lg:absolute lg:right-4"
            fontSize={smUp ? "small" : "medium"}
          />
        </Button> */}
      {/* </Box> */}
    </ContentView>
  );
};

export default QuizPage;
