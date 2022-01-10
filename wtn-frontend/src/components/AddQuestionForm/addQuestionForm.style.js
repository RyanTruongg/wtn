const { makeStyles } = require("@material-ui/styles");

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "700px",
    maxHeight: "90vh",
    overflowY: "scroll",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  form: {
    position: "relative",
  },
  submitBtn: {
    padding: "0.5rem 3rem",
  },
  multiAnswers: {
    display: "flex",
    marginBottom: "0.5rem",
    padding: "0 1rem",
  },
  label: {
    marginBottom: "0.75rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default useStyles;
