import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, Modal } from "@material-ui/core";
import { Results, Header, AddTestForm, SearchBar } from "./components";
import useModal from "hooks/use-modal";

const useStyles = makeStyles(theme => ({
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

const StudentList = props => {
  const { tests, className, ...rest } = props;
  const { open, handleClose, handleOpen } = useModal(false);

  const classes = useStyles();

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Box {...rest} className={clsx(classes.root, className)}>
      <Header openAddTestModal={handleOpen} />
      <SearchBar
        className={classes.filter}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <Results tests={tests} />
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <AddTestForm
          handleSubmit={e => e.preventDefault()}
          open={open}
          handleClose={handleClose}
        />
      </Modal>
    </Box>
  );
};

StudentList.propTypes = {
  className: PropTypes.string,
  tests: PropTypes.array.isRequired,
};

export default StudentList;
