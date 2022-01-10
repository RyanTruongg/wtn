import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useTestsDetailsContext } from "../../../../hooks/test-details-context";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "1rem",
  },
}));

const Header = (props) => {
  const { className, openAddStudentModal, ...rest } = props;

  const classes = useStyles();

  const { testDetails } = useTestsDetailsContext();

  const now = Date.now();
  const ended = Date.parse(testDetails.end_time) < now;
  const started = Date.parse(testDetails.start_time) < now;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Câu hỏi trong bài kiểm tra
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={openAddStudentModal}
            color="primary"
            variant="contained"
            disabled={started || ended}
          >
            Thêm câu hỏi
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  openAddStudentModal: PropTypes.func.isRequired,
};

export default Header;
