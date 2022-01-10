import { useState } from "react";

const useModal = initialState => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleClose,
    handleOpen,
  };
};

export default useModal;
