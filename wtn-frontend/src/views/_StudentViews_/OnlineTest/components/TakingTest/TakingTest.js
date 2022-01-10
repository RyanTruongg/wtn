import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Button,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTestDetailsContext } from "../../hooks/online-test-context";
import { Page } from "components";
import { useForm, Controller } from "react-hook-form";

import clsx from "clsx";
import { toInteger } from "lodash";

const useStyles = makeStyles((theme) => ({
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

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
    </div>
  );
};

const TakingTest = () => {
  const classes = useStyles();

  const {
    testDetails,
    questions,
    submitAttempt,
    attempt,
  } = useTestDetailsContext();
  const form = useForm();

  const onSubmit = (data) => {
    const answers = Object.keys(data).map((key) => ({
      question_id: key,
      answer: data[key],
    }));
    submitAttempt(answers);
  };
  const startTime = Date.now() / 1000;
  const endTime = new Date(attempt?.timeup) / 1000;

  const startAt = new Date(attempt?.start_time) / 1000;
  // date to seconds

  const duration = endTime - startAt;

  const remainingTime = endTime - startTime;

  return (
    <Page className={classes.root} title="Kiểm tra">
      <Paper className={classes.header}>
        <Box>
          <Typography variant={"h1"} className={"mb-3"}>
            {testDetails?.name}
          </Typography>
        </Box>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#3f51b5"]]}
          duration={duration}
          initialRemainingTime={remainingTime}
          onComplete={(totalElapsedTime) => {
            if (totalElapsedTime >= remainingTime) {
              onSubmit(form.getValues());
              return [false];
            }
            return [true];
          }}
        >
          {({ elapsedTime }) =>
            renderTime(
              "Phút",
              toInteger((duration - elapsedTime) / 60) +
                ":" +
                toInteger((duration - elapsedTime) % 60)
            )
          }
        </CountdownCircleTimer>
      </Paper>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        {questions?.map((question, idx) => {
          const shortName = ["A", "B", "C", "D"];
          return (
            <Paper className={classes.question}>
              <Typography variant="h5">
                Câu {idx + 1}: {question["content"]}
              </Typography>

              <Controller
                control={form.control}
                name={question.id}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {question["options"]?.map((option, optionIdx) => (
                      <React.Fragment>
                        <FormControlLabel
                          className={clsx(
                            classes.option,
                            form.watch(question.id) === option.id &&
                              classes.selected
                          )}
                          value={option.id}
                          control={<Radio />}
                          label={shortName[optionIdx] + ". " + option.content}
                        />
                        <Divider variant="fullWidth" />
                      </React.Fragment>
                    ))}
                  </RadioGroup>
                )}
              />
            </Paper>
          );
        })}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Page>
  );
};

export default TakingTest;
