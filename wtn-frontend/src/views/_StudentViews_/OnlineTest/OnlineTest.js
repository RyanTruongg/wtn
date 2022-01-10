import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { StartPage, TakingTest } from "./components";

import { useTestDetailsContext } from "./hooks/online-test-context";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
  },
}));

const OnlineTest = (props) => {
  const classes = useStyles();
  const { attempt } = useTestDetailsContext();
  console.log(attempt);
  return (
    <Box className={classes.root}>
      {/* {status === CHECKING && <p>Checking</p>}
      {status === UPCOMING && <StartPage test={test} />}
      {status === STARTED && <TakingTest />}
      {status === ENDED && <StartPage test={test} ended />} */}

      {attempt && !attempt?.submitted && <TakingTest />}
      {(!attempt || attempt?.submitted) && <StartPage />}
    </Box>
  );
};

export default OnlineTest;
