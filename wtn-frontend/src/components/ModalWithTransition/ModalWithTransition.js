import React from "react";
import PropTypes from "prop-types";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import clsx from "clsx";

const ModalWithTransition = props => {
  const { children, open, onClose, timeout, className } = props;

  return (
    <Modal
      className={clsx(className)}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: timeout,
      }}>
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
};

ModalWithTransition.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default ModalWithTransition;
