import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Typography, Grid, colors, Badge, Box } from "@material-ui/core";
import { useTestsDetailsContext } from "../../hooks/test-details-context";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    marginTop: theme.spacing(1),
  },
  shareButton: {
    marginRight: theme.spacing(2),
  },
  shareIcon: {
    marginRight: theme.spacing(1),
  },
  applyButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  colorPrimary: { backgroundColor: "#388e3c" },
  colorSecondary: { backgroundColor: "#f57c00" },
  badge: {
    padding: "0 0.5rem",
  },
}))(Badge);

const Header = (props) => {
  const { course, className, ...rest } = props;

  const classes = useStyles();

  const { testDetails } = useTestsDetailsContext();

  const now = Date.now();
  const ended = Date.parse(testDetails.end_time) < now;
  const started = Date.parse(testDetails.start_time) < now;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Bài kiểm tra
          </Typography>
          <Box marginLeft={4} marginBottom={1}>
            {started && !ended && (
              <StyledBadge badgeContent={"Started"} color="secondary" />
            )}
            {started && ended && (
              <StyledBadge badgeContent={"Ended"} color="error" />
            )}
            {!started && !ended && (
              <StyledBadge badgeContent={"Upcoming"} color="primary" />
            )}
          </Box>
          <Typography component="h1" gutterBottom variant="h3">
            {testDetails.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired,
};

Header.defaultProps = {};

export default Header;
