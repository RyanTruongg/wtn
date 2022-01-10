import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab } from "@material-ui/core";
import { AddQuestionForm } from "components";
import ClassroomQuestions from "views/ClassroomQuestions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    placeItems: "center",
  },
  box: {
    // minWidth: "768px",
    backgroundColor: "white",
    maxHeight: "90vh",
    borderRadius: "0.5rem",
  },
  content: {
    maxHeight: "calc(90vh - 48px)",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
}));

const AddStudentModal = props => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const { open, handleClose, handleSubmit } = props;

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal className={classes.root} open={open} onClose={handleClose}>
      <Box className={classes.box}>
        <Tabs
          variant="fullWidth"
          centered
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}>
          <Tab value={0} label="Create new question" />
          <Tab value={1} label="Add from Question bank" />
        </Tabs>
        <Box className={classes.content}>
          {tabValue === 0 && <AddQuestionForm headless />}
          {tabValue === 1 && (
            <ClassroomQuestions style={{ maxWidth: "100vw" }} headless />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

AddStudentModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddStudentModal;
