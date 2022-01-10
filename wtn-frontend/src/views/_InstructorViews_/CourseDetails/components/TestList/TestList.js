import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, Modal } from "@material-ui/core";
import { Results, Header, AddTestForm } from "./components";
import useModal from "hooks/use-modal";
import { TestsProvider } from "./hooks/test-list-context";

const useStyles = makeStyles((theme) => ({
  filter: {
    marginBottom: "1rem",
  },
  modal: {
    display: "grid",
    placeItems: "center",
  },
  files: {
    marginTop: theme.spacing(3),
  },
}));

const StudentList = (props) => {
  const { className, ...rest } = props;
  const { open, handleClose, handleOpen } = useModal(false);

  const classes = useStyles();

  return (
    <TestsProvider>
      <Box {...rest} className={clsx(classes.root, className)}>
        <Header openAddTestModal={handleOpen} />

        <Results />
        <Modal className={classes.modal} open={open} onClose={handleClose}>
          <AddTestForm
            handleSubmit={(e) => e.preventDefault()}
            open={open}
            handleClose={handleClose}
          />
        </Modal>
      </Box>
    </TestsProvider>
  );
};

StudentList.propTypes = {
  className: PropTypes.string,
  tests: PropTypes.array.isRequired,
};

export default StudentList;
