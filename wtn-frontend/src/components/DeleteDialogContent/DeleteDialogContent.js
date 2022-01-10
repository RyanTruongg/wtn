import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@material-ui/core";
import { ErrorButton } from "components";
import React from "react";
import PropTypes from "prop-types";

const DeleteDialogContent = props => {
  const { name, handleCloseDialog } = props;

  return (
    <React.Fragment>
      <DialogTitle>
        <Typography color="primary" variant="button">
          Delete - {name}?
        </Typography>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Back
        </Button>
        <ErrorButton onClick={handleCloseDialog} variant="outlined" autoFocus>
          Confirm
        </ErrorButton>
      </DialogActions>
    </React.Fragment>
  );
};

DeleteDialogContent.propTypes = {
  name: PropTypes.string.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default DeleteDialogContent;
