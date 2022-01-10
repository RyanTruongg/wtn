import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { OCRService } from "services";
import { Page, FilesDropzone } from "components";

import "./OnlineTest.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(3),
    "& .time": {
      fontSize: "32px",
    },
  },
}));

const question = [
  {
    content: "Kim loại nào dưới đây có nhiệt độ nóng chảy cao nhất",
    options: [
      {
        short_name: "A",
        content: "Na",
      },
      {
        short_name: "B",
        content: "K",
      },
      {
        short_name: "C",
        content: "Cu",
      },
      {
        short_name: "D",
        content: "W",
      },
    ],
  },
  {
    content: "Kim loại nào dưới đây có nhiệt độ nóng chảy cao nhất",
    options: [
      {
        short_name: "A",
        content: "Na",
      },
      {
        short_name: "B",
        content: "K",
      },
      {
        short_name: "C",
        content: "Cu",
      },
      {
        short_name: "D",
        content: "W",
      },
    ],
  },
  {
    content: "Kim loại nào dưới đây có nhiệt độ nóng chảy cao nhất",
    options: [
      {
        short_name: "A",
        content: "Na",
      },
      {
        short_name: "B",
        content: "K",
      },
      {
        short_name: "C",
        content: "Cu",
      },
      {
        short_name: "D",
        content: "W",
      },
    ],
  },
];

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = time => (minuteSeconds - time) | 0;

const OnlineTest = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(-1);
  const [questionSelected, setQuestionSelected] = useState(-1);

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;

  return (
    <Page className={classes.root} title="Demo">
      <div className={"d-flex justify-content-between align-items-center"}>
        <div>
          <Typography variant={"h1"} className={"mb-3"}>
            Đề thi Đại học Sư phạm Tp Hồ Chí Minh
          </Typography>
          <Typography variant={"subtitle1"}>Năm học 2020 - 2021</Typography>
          <Typography variant={"subtitle2"}>Giáo viên: Nguyễn Văn B</Typography>
        </div>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#3f51b5"]]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={totalElapsedTime => [
            remainingTime - totalElapsedTime > 0,
          ]}>
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
      {question.map((item, idx) => (
        <Paper className={"px-4 py-3 my-4"}>
          <p>
            Câu {idx + 1}: {item["content"]}
          </p>
          <Grid container>
            {item["options"].map((option, optionIdx) => (
              <Grid lg={6} md={6}>
                <div
                  className={"question-option my-2 d-flex align-items-center"}
                  style={optionIdx % 2 == 0 ? { marginRight: 16 } : null}
                  onClick={() => {
                    setSelected(optionIdx);
                    setQuestionSelected(idx);
                  }}>
                  <div
                    className={
                      selected == optionIdx && questionSelected == idx
                        ? "question-option-short-selected py-2 px-3"
                        : "question-option-short py-2 px-3"
                    }>
                    {option["short_name"]}
                  </div>
                  <div
                    className={
                      selected == optionIdx && questionSelected == idx
                        ? "question-option-content-selected py-2"
                        : "question-option-content py-2"
                    }
                    style={{ flex: 1 }}>
                    {option["content"]}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Page>
  );
};

export default OnlineTest;
