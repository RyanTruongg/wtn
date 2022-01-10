import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import { Results, Header, AddQuestionModal } from "./components";
import useModal from "hooks/use-modal";

import { QuestionsInTestProvider } from "./hooks/question-in-test-context";

const useStyles = makeStyles((theme) => ({
  root: {},
  files: {
    marginTop: theme.spacing(3),
  },
}));

const QuestionList = (props) => {
  const { students, className, ...rest } = props;
  const { open, handleOpen, handleClose } = useModal();

  const classes = useStyles();

  return (
    <QuestionsInTestProvider>
      <Box {...rest} className={clsx(classes.root, className)}>
        <Header openAddStudentModal={handleOpen} />
        <Results students={students} />
        <AddQuestionModal open={open} handleClose={handleClose} />
      </Box>
    </QuestionsInTestProvider>
  );
};

QuestionList.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
};

export default QuestionList;
