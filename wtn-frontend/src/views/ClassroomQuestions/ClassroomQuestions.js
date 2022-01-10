import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Page, AddQuestionForm, ModalWithTransition } from "components";
import { Header, Results, SearchBar } from "./components";
import useModal from "hooks/use-modal";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "grid",
    placeItems: "center",
  },
}));

const ClassroomQuestions = props => {
  const { headless, className, ...rest } = props;
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);
  const [reviewingQuestion, setReviewingQuestion] = useState(null);
  const { open, handleClose, handleOpen } = useModal(false);

  useEffect(() => {
    const mockQuestions = [
      {
        id: "1",
        content: "1 + 1",
        type: "TN",
        subject: "MMH001",
        answers: [
          {
            content: "2",
            short_name: "A",
            status: false,
          },
          {
            content: "3",
            short_name: "B",
            status: false,
          },
          {
            content: "4",
            short_name: "C",
            status: false,
          },
          {
            content: "5",
            short_name: "D",
            status: false,
          },
        ],
      },
    ];

    setQuestions(mockQuestions);

    return () => {};
  }, []);

  useEffect(() => {
    if (open === false) setReviewingQuestion(null);
  }, [open]);

  const handleFilter = () => {};
  const handleSearch = () => {};

  const reviewQuestion = questionID => {
    return () => {
      setReviewingQuestion(
        questions.find(question => question.id === questionID)
      );
      handleOpen();
    };
  };

  return (
    <Page
      {...rest}
      className={clsx(classes.root, className)}
      title="Question Management">
      {!headless && <Header openAddQuestionModal={handleOpen} />}
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {questions && (
        <Results
          className={classes.results}
          questions={questions}
          reviewQuestion={reviewQuestion}
        />
      )}
      <ModalWithTransition
        className={classes.modal}
        open={open}
        onClose={handleClose}
        timeout={250}>
        <AddQuestionForm
          reviewingQuestion={reviewingQuestion}
          handleClose={handleClose}
        />
      </ModalWithTransition>
    </Page>
  );
};

export default ClassroomQuestions;
