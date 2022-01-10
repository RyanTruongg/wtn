import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const ErrorButton = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  outlined: {
    borderColor: theme.palette.error.light,
  },
  label: {
    color: theme.palette.error.light,
    "&:hover": {
      color: "white",
    },
  },
}))(Button);

export default ErrorButton;
