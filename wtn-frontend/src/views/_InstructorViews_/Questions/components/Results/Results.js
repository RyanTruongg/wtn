import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Modal,
  Grid,
  FormLabel,
  TextField,
  MenuItem,
  Box,
  InputAdornment,
  Checkbox,
} from "@material-ui/core";

import { ErrorButton, GenericMoreButton } from "components";
import usePaginate from "hooks/use-paginate";
import { useQuestionsContext } from "../../hooks/questions-context";
import useToggle from "hooks/use-toggle";
import { Controller, useForm } from "react-hook-form";
import axios from "services/axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
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

const Results = (props) => {
  const { className, reviewQuestion, ...rest } = props;

  const classes = useStyles();
  const modal = useToggle(false);
  const form = useForm();
  const { questions, updateQuestion, deleteQuestion } = useQuestionsContext();

  const [subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    const getSubjects = async () => {
      const res = await (await axios.get(`/subjects`)).data;

      setSubjects(res.data);
    };
    getSubjects();
  }, []);

  const onSubmit = async (data) => {
    await updateQuestion(data);
  };

  console.log(subjects);

  const getQuestions = async (id) => {
    const res = await (await axios.get(`/questions/${id}`)).data;

    form.setValue("id", id);
    form.setValue("content", res.data.content);
    form.setValue("subject_id", res.data.subject_id);
    form.setValue("answers", res.data.answers);
    modal.handleOpen();
  };

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Tổng {questions.length} Câu hỏi
        </Typography>
        <Card>
          <CardHeader action={<GenericMoreButton />} title="Tất cả câu hỏi" />
          <Divider />

          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nội dung</TableCell>
                      <TableCell>Môn học</TableCell>
                      <TableCell align="right">Tác vụ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.slice(0, rowsPerPage).map((question) => (
                      <TableRow hover key={question.id}>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <div>
                              <Typography color="inherit" variant="h6">
                                {question.content}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{question.subject_name}</TableCell>

                        <TableCell align="right">
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            onClick={() => getQuestions(question.id)}
                          >
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={questions.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardActions>
        </Card>
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
                        disabled={subjects?.length <= 0}
                        select
                        {...field}
                        variant="outlined"
                        fullWidth
                      >
                        {subjects?.map((subject) => (
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
                    <Box key={idx} className={classes.multiAnswers}>
                      <InputWithStartAdornment
                        register={{
                          ...form.register(`answers.${idx}.content`),
                        }}
                        adornment={idx + "."}
                      />

                      <Checkbox
                        defaultChecked={answer.status}
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
                    Cập nhật
                  </Button>

                  <ErrorButton
                    className={classes.submitBtn}
                    variant="contained"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      deleteQuestion(form.getValues("id"));
                      modal.handleClose();
                    }}
                  >
                    Xóa câu hỏi
                  </ErrorButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  questions: PropTypes.array.isRequired,
};

Results.defaultProps = {
  questions: [],
};

export default Results;
