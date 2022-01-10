import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { Page, Paginate } from "components";

import clsx from "clsx";

const minuteSeconds = 60;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    "& .time": {
      fontSize: "32px",
      textAlign: "center",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
  },
  paginate: {
    padding: 0,
    justifyContent: "center",
  },
  question: {
    padding: "1rem 2rem",
    margin: "2rem 0",
  },
  option: {
    marginTop: "0.5rem",
    marginLeft: 0,
    marginRight: 0,
    borderRadius: "0.5rem",
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    boxSizing: "border-box",
    minHeight: 40,

    "&:hover *": {
      fontWeight: "bold",
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    "& *": {
      color: "white",
      fontWeight: "bold",
    },
  },
}));

const q = {
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
};

let id = 0;
const mockQuestions = [
  {
    id: ++id,
    ...q,
  },
  {
    id: ++id,
    ...q,
  },
  {
    id: ++id,
    ...q,
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

const TakingTest = () => {
  const classes = useStyles();

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const [questions, setQuestions] = useState(mockQuestions);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(
      questions.map(question => ({
        id: question.id + "",
        selected: "",
      }))
    );
  }, [questions]);

  useEffect(() => {
    setQuestions(mockQuestions);
  }, []);

  const handleSelect = e => {
    const tmpValues = values.map(q => {
      if (q.id === e.target.name) return { ...q, selected: e.target.value };
      return { ...q };
    });
    setValues(tmpValues);
  };

  return (
    <Page className={classes.root} title="Demo">
      <Paper className={classes.header}>
        <Box>
          <Typography variant={"h1"} className={"mb-3"}>
            Đề thi Đại học Sư phạm Tp Hồ Chí Minh
          </Typography>
          <Typography variant={"subtitle1"}>Năm học 2020 - 2021</Typography>
          <Typography variant={"subtitle2"}>Giáo viên: Nguyễn Văn B</Typography>
        </Box>
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
      </Paper>
      {questions.map((question, idx) => {
        const value = values.find(q => q.id === question.id + "");
        const selectedValue = value && value.selected;
        return (
          <Paper className={classes.question}>
            <Typography variant="h5">
              Câu {idx + 1}: {question["content"]}
            </Typography>

            <RadioGroup
              name={question.id}
              value={selectedValue}
              onChange={handleSelect}>
              {question["options"].map((option, optionIdx) => (
                <React.Fragment>
                  <FormControlLabel
                    className={clsx(
                      classes.option,
                      selectedValue === option.short_name && classes.selected
                    )}
                    value={option.short_name}
                    control={<Radio />}
                    label={option.short_name + ". " + option.content}
                  />
                  <Divider variant="fullWidth" />
                </React.Fragment>
              ))}
            </RadioGroup>
          </Paper>
        );
      })}
      <Paginate
        className={classes.paginate}
        onPageChange={() => alert(JSON.stringify(values))}
      />
    </Page>
  );
};

export default TakingTest;
