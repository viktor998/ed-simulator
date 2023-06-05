import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoEduBianco from "../assets/img/logoEduBianco.svg";
import Header from "../components/Header";
import ContentLayout from "./common/content-layout";
import ContentView from "./common/ContentView";

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  const questions = [
    {
      question: "I called Tom, ___ he didn't answer.",
      options: ["and", "but", "or", "so"],
      correctAnswer: "but",
    },
    {
      question: "Tommy ___ died.",
      options: ["are", "were", "is", "will"],
      correctAnswer: "but",
    },
    {
      question: "Jason ___ a student.",
      options: ["is", "are", "were", "will be"],
      correctAnswer: "but",
    },
  ];
  const smUp = useMediaQuery("(max-width:1047px)");
  const next = () => {
    if (activeQuestion + 1 === questions.length - 1) {
      navigate("/results");
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
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
        {questions[activeQuestion].options.map((r) => (
          <Button
            size="large"
            variant="contained"
            disableElevation
            color={r === answers[activeQuestion] ? "primary" : "buttonBack"}
            onClick={() => {
              selectAnswer(r);
            }}
            sx={{
              color:
                r === answers[activeQuestion] ? "#ffffff" : "#2D224C!important",
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
