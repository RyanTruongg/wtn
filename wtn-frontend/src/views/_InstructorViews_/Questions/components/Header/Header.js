import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Button,
  Modal,
  Card,
  CardHeader,
  CardContent,
  FormLabel,
  TextField,
  Box,
  InputAdornment,
  Checkbox,
  MenuItem,
} from "@material-ui/core";
import useToggle from "hooks/use-toggle";
import { Controller, useForm } from "react-hook-form";
import axios from "services/axios";
import { useQuestionsContext } from "../../hooks/questions-context";

const useStyles = makeStyles(() => ({
  root: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxHeight: "90vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  form: {
    width: "100%",
    maxWidth: "700px",
    position: "relative",
  },

  submitBtn: {
    padding: "0.5rem 3rem",
  },
  multiAnswers: {
    display: "flex",
    marginBottom: "0.5rem",
    alignItems: "center",
  },
  label: {
    marginBottom: "0.75rem",
  },
}));

const defaultValue = {
  content: "",
  subject: "",
  answers: [
    {
      content: "",
      short_name: "A",
      status: false,
    },
    {
      content: "",
      short_name: "B",
      status: false,
    },
    {
      content: "",
      short_name: "C",
      status: false,
    },
    {
      content: "",
      short_name: "D",
      status: false,
    },
  ],
};

const InputWithStartAdornment = (props) => {
  const { adornment, className, register, ...rest } = props;
  const classes = useStyles();

  return (
    <TextField
      {...register}
      {...rest}
      className={clsx(classes.multiAnswers, className)}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

const Header = (props) => {
  const { className, openAddQuestionModal, ...rest } = props;

  const [subjects, setSubjects] = React.useState([]);

  const classes = useStyles();
  const modal = useToggle(false);
  const form = useForm({
    defaultValues: defaultValue,
  });

  const { addQuestion } = useQuestionsContext();

  const onSubmit = async (data) => {
    await addQuestion(data);
    console.log(data);
    form.reset();
    // modal.handleClose();
  };

  React.useEffect(() => {
    const getSubjects = async () => {
      const res = await (await axios.get(`/subjects`)).data;

      setSubjects(res.data);
    };
    getSubjects();
  }, []);

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <Grid
          alignItems="flex-end"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography component="h2" gutterBottom variant="overline">
              Quản lý
            </Typography>
            <Typography component="h1" variant="h3">
              Câu hỏi trắc nghiệm
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={modal.handleOpen}
              color="primary"
              variant="contained"
            >
              Thêm câu hỏi
            </Button>
          </Grid>
        </Grid>
      </div>

      <Modal
        className={classes.modal}
        open={modal.is_open}
        onClose={modal.handleClose}
      >
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h2">Thêm câu hỏi trắc nghiệm</Typography>
            }
          />
          <CardContent>
            <form
              className={classes.form}
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormLabel className={classes.label} component="legend">
                    Nội dung câu hỏi
                  </FormLabel>
                  <TextField
                    {...form.register("content")}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel className={classes.label} component="legend">
                    Môn học
                  </FormLabel>
                  <Controller
                    name="subject_id"
                    control={form.control}
                    render={({ field }) => (
                      <TextField
                        disabled={subjects.length <= 0}
                        select
                        {...field}
                        variant="outlined"
                        fullWidth
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel className={classes.label} component="legend">
                    Câu trả lời
                  </FormLabel>
                  {form.getValues("answers")?.map((answer, idx) => (
                    <Box
                      key={answer.short_name}
                      className={classes.multiAnswers}
                    >
                      <InputWithStartAdornment
                        register={{
                          ...form.register(`answers.${idx}.content`),
                        }}
                        adornment={answer.short_name + "."}
                      />
                      <Checkbox
                        {...form.register(`answers.${idx}.status`)}
                        color="primary"
                      />
                    </Box>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className={classes.submitBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Thêm câu hỏi
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  openAddQuestionModal: PropTypes.func.isRequired,
};

export default Header;
