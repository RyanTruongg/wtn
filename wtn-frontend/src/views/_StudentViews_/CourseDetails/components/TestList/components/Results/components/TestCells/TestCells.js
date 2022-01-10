import React from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Avatar,
  TableCell,
  Button,
  Box,
  Typography,
  Badge,
} from "@material-ui/core";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import { Link as RouterLink } from "react-router-dom";
import Proptypes from "prop-types";

const StyledBadge = withStyles((theme) => ({
  colorPrimary: { backgroundColor: "#388e3c" },
  colorSecondary: { backgroundColor: "#f57c00" },
  badge: {
    padding: "0 0.5rem",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  nameCell: {
    display: "flex",
    alignItems: "center",
    maxWidth: "356px",
  },
  name: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(2),
  },
  date: {
    minWidth: "240px",
  },
  badge: {
    minWidth: "60px",
  },
}));

const TestCells = ({ test }) => {
  const classes = useStyles();

  const now = Date.now();
  const ended = Date.parse(test.end_time) < now;
  const started = Date.parse(test.start_time) < now;

  return (
    <React.Fragment>
      <TableCell>
        <Box className={classes.nameCell}>
          <Avatar className={classes.avatar}>
            <ListAltRoundedIcon />
          </Avatar>
          <Box style={{ overflow: "hidden" }}>
            <Typography className={classes.name} variant="h6">
              {test.name}
            </Typography>

            <Box>{test.subject}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={classes.date}>
        <strong>Start:</strong> {new Date(test.start_time).toUTCString()}
      </TableCell>
      <TableCell className={classes.date}>
        <strong>End:</strong> {new Date(test.end_time).toUTCString()}
      </TableCell>
      <TableCell className={classes.badge}>
        {started && !ended && (
          <StyledBadge badgeContent={"Started"} color="secondary" />
        )}
        {started && ended && (
          <StyledBadge badgeContent={"Ended"} color="error" />
        )}
        {!started && !ended && (
          <StyledBadge badgeContent={"Upcoming"} color="primary" />
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          color="primary"
          component={RouterLink}
          size="small"
          to={"/student/online-test/" + test.id}
          variant="outlined"
        >
          Chi tiết
        </Button>
      </TableCell>
    </React.Fragment>
  );
};

TestCells.propTypes = {
  test: Proptypes.object.isRequired,
};

export default TestCells;
