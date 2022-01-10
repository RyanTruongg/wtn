import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Page, DeleteDialogContent, ModalWithTransition } from "components";
import { Dialog } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Header, Results, SearchBar, AddSomeoneForm } from "./components";
import useModal from "hooks/use-modal";
import { UserServices } from "services";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ClassroomPeople = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const { open, handleClose, handleOpen } = useModal(false);
  const {
    open: openDialog,
    handleClose: handleCloseDialog,
    handleOpen: handleOpenDialog,
  } = useModal(false);

  useEffect(() => {
    UserServices.getUserList().then(res => setUsers(res.data));
  }, []);

  const [deletingUser, setDeletingUser] = useState(null);
  const handleDeleteOne = id => {
    return () => {
      setDeletingUser(users.find(user => user.id === id));
      handleOpenDialog();
    };
  };

  const handleAddUser = values => {
    alert(JSON.stringify(values));
  };

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="People Management">
      <Header openAddSomeoneModal={handleOpen} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />

      {users && (
        <Results
          className={classes.results}
          users={users}
          handleDeleteOne={handleDeleteOne}
        />
      )}

      <ModalWithTransition
        className={classes.modal}
        open={open}
        onClose={handleClose}
        timeout={250}>
        <AddSomeoneForm
          handleClose={handleClose}
          handleAddUser={handleAddUser}
        />
      </ModalWithTransition>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DeleteDialogContent
          name={deletingUser && deletingUser.full_name}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Page>
  );
};

export default ClassroomPeople;
