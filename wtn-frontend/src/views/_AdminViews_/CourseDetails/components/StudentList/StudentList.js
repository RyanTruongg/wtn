import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, Dialog, Modal } from "@material-ui/core";
import { Results, Header, AddStudentForm } from "./components";
import useModal from "hooks/use-modal";
import { DeleteDialogContent } from "components";
import { StudentInCoursesProvider } from "./hooks/student-list-context";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "grid",
    placeItems: "center",
  },
  files: {
    marginTop: theme.spacing(3),
  },
}));

const StudentList = (props) => {
  const { students, className, ...rest } = props;
  const { open, handleOpen, handleClose } = useModal();
  const [deletingStudent, setDeletingStudent] = useState(null);

  const handleDeleteOne = (id) => {
    return () => {
      setDeletingStudent(students.find((user) => user.id === id));
      handleOpenDialog();
    };
  };

  const {
    open: openDialog,
    handleClose: handleCloseDialog,
    handleOpen: handleOpenDialog,
  } = useModal(false);

  const classes = useStyles();

  return (
    <StudentInCoursesProvider>
      <Box {...rest} className={clsx(classes.root, className)}>
        <Header openAddStudentModal={handleOpen} />
        <Results students={[]} handleDeleteOne={handleDeleteOne} />
        <Modal className={classes.modal} open={open} onClose={handleClose}>
          <AddStudentForm
            handleSubmit={(e) => e.preventDefault()}
            open={open}
            handleClose={handleClose}
          />
        </Modal>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DeleteDialogContent
            name={deletingStudent && deletingStudent.name}
            handleCloseDialog={handleCloseDialog}
          />
        </Dialog>
      </Box>
    </StudentInCoursesProvider>
  );
};

StudentList.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
};

export default StudentList;
