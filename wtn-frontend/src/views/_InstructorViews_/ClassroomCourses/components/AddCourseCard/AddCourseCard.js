import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "192px",
    height: "100%",
  },
  cardAction: {
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
}));

const AddCourseCard = props => {
  const classes = useStyles();
  const { onClick, ...rest } = props;

  return (
    <Card {...rest} className={classes.root}>
      <CardActionArea onClick={onClick} className={classes.cardAction}>
        <AddIcon fontSize="large" />
      </CardActionArea>
    </Card>
  );
};

AddCourseCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddCourseCard;
