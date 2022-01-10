import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { DeleteDialogContent, Page } from "components";
import { Header, Results, SearchBar, AddSubjectForm } from "./components";
import { Dialog, Modal } from "@material-ui/core";
import useModal from "hooks/use-modal";
import { SubjectServices } from "services";

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

const ClassroomSubjects = () => {
  const classes = useStyles();

  const [subjects, setSubjects] = useState([]);
  const { open, handleClose, handleOpen } = useModal(false);

  const {
    open: openDialog,
    handleClose: handleCloseDialog,
    handleOpen: handleOpenDialog,
  } = useModal(false);

  const [deletingSubject, setDeletingSubject] = useState(null);

  const handleDeleteOne = id => {
    return () => {
      setDeletingSubject(subjects.find(user => user.id === id));
      handleOpenDialog();
    };
  };

  useEffect(() => {
    SubjectServices.getSubjectList()
      .then(res => setSubjects(res.data))
      .catch(e => alert(JSON.stringify(e)));
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="Subject Management">
      <Header openAddSomeoneModal={handleOpen} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {subjects && (
        <Results
          className={classes.results}
          subjects={subjects}
          handleDeleteOne={handleDeleteOne}
        />
      )}
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <AddSubjectForm open={open} handleClose={handleClose} />
      </Modal>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DeleteDialogContent
          name={deletingSubject && deletingSubject.name}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Page>
  );
};

export default ClassroomSubjects;
