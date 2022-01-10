import { useState } from "react";

const useToggle = (initialState) => {
  const [is_open, setOpen] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    is_open,
    handleClose,
    handleOpen,
  };
};

export default useToggle;
