import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/RemoveCircle";
import { useSubjectDetailsContext } from "../../../../hooks/subject-details-context";

const useStyles = makeStyles((theme) => ({
  root: {},

  deleteButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  enableButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));
const OtherActions = (props) => {
  const { className, ...rest } = props;
  const { subjectDetails, deleteSubject } = useSubjectDetailsContext();
  const classes = useStyles();

  if (!subjectDetails) {
    return null;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Tác vụ khác" />
      <Divider />
      <CardContent>
        <Button onClick={deleteSubject} className={classes.deleteButton}>
          <DeleteIcon className={classes.buttonIcon} />
          Xóa môn học
        </Button>
      </CardContent>
    </Card>
  );
};

OtherActions.propTypes = {
  className: PropTypes.string,
};

export default OtherActions;
