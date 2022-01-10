import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { StartPage, TakingTest } from "./components";

import { useParams } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    // margin: theme.spacing(2),
  },
}));

const CHECKING = "CHECKING";
const STARTED = "STARTED";
const ENDED = "ENDED";
const UPCOMING = "UPCOMING";

const mockTest = {
  id: 1,
  name: "Final Math 2020-2021",
  subject: "Math",
  start: Date.parse(new Date(Date.UTC(2021, 9, 15, 3, 0, 0))),
  end: Date.parse(new Date(Date.UTC(2021, 9, 15, 10, 0, 0))),
};
const ClassroomOnlineTest = props => {
  const classes = useStyles();
  const { id } = useParams();
  const [status, setStatus] = useState(CHECKING);
  const [test, setTest] = useState(mockTest);

  async function check(id) {
    return await new Promise((resolve, reject) =>
      setTimeout(async () => {
        if (id === "1") resolve(UPCOMING);
        if (id === "2") resolve(STARTED);
        if (id === "3") resolve(ENDED);
      }, Math.random() * 1000)
    );
  }

  useEffect(() => {
    check(id).then(status => setStatus(status));
  }, [id]);

  return (
    <Box className={classes.root}>
      {status === CHECKING && <p>Checking</p>}
      {status === UPCOMING && <StartPage test={test} />}
      {status === STARTED && <TakingTest />}
      {status === ENDED && <StartPage test={test} ended />}
    </Box>
  );
};

export default ClassroomOnlineTest;
