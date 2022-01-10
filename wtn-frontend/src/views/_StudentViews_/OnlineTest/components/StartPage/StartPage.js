import React from "react";

import { Badge, Button, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import parseDate from "utils/parseDate";
import { useTestDetailsContext } from "../../hooks/online-test-context";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    overflow: "hidden",
  },
}));

const StyledBadge = withStyles((theme) => ({
  colorPrimary: { backgroundColor: "#388e3c" },
  colorSecondary: { backgroundColor: "#f57c00" },
  badge: {
    padding: "0 0.5rem",
  },
  root: {
    marginLeft: theme.spacing(4),
  },
}))(Badge);

const StartPage = (props) => {
  const classes = useStyles();

  const {
    testDetails,
    attempt,
    createAttempt,
    result,
  } = useTestDetailsContext();

  if (!testDetails) {
    return null;
  }

  const now = Date.now();
  const ended = parseDate(testDetails.end_time) < now;
  const started = parseDate(testDetails.start_time) < now;

  const startAble = started && !ended && !attempt;
  const continueAble = !ended && attempt && !attempt.submitted;

  return (
    <Card className={classes.root}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography gutterBottom variant="h3">
            Tên bài kiểm tra:
          </Typography>
          <Typography variant="h1">{testDetails.name}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="textSecondary" variant="h4">
            Bắt đầu: {parseDate(testDetails.start_time).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="textSecondary" variant="h4">
            Kết thúc: {parseDate(testDetails.end_time).toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography color="textSecondary" variant="h4">
            Thời gian làm bài: {testDetails.duration} phút
          </Typography>
        </Grid>

        <Grid justifyContent="flex-start" item xs={6}>
          {started && !ended && (
            <StyledBadge badgeContent={"Started"} color="secondary" />
          )}
          {started && ended && (
            <StyledBadge badgeContent={"Ended"} color="error" />
          )}
          {!started && !ended && (
            <StyledBadge badgeContent={"Upcoming"} color="primary" />
          )}
        </Grid>
        <Grid item xs={6}>
          {startAble && (
            <Button onClick={createAttempt} variant="outlined" color="primary">
              Bắt đầu
            </Button>
          )}

          {continueAble && (
            <Button variant="outlined" color="primary">
              Tiếp tục
            </Button>
          )}

          {result && (
            <Typography color="textSecondary" variant="h6">
              Điểm: {result.correctAnswers}/{result.totalQuestions}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default StartPage;
