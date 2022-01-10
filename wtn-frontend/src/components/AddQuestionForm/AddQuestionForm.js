import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  FormLabel,
  InputAdornment,
  Checkbox,
  Card,
  CardContent,
} from "@material-ui/core";
import { Button } from "@material-ui/core";

import clsx from "clsx";
import useStyles from "./addQuestionForm.style";
import axios from "services/axios";
import { useQuestionsInTestContext } from "views/_InstructorViews_/TestDetails/components/QuestionList/hooks/question-in-test-context";

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

const defaultValue = {
  content: "",
  subject_id: "",
  answers: [
    {
      content: "",
      status: false,
    },
    {
      content: "",
      status: false,
    },
    {
      content: "",
      status: false,
    },
    {
      content: "",
      status: false,
    },
  ],
};

const AddQuestionForm = (props) => {
  const classes = useStyles();
  const { headless, handleClose, ...rest } = props;

  const [subjects, setSubjects] = React.useState([]);

  const { addQuestion } = useQuestionsInTestContext();

  React.useEffect(() => {
    const getSubjects = async () => {
      const res = await (await axios.get(`/subjects`)).data;

      setSubjects(res.data);
    };
    getSubjects();
  }, []);

  const form = useForm({
    defaultValues: defaultValue,
  });

  const onSubmit = async (data) => {
    await addQuestion(data);

    form.reset();
    handleClose();
  };

  return (
    <Card {...rest} className={classes.card}>
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
                <Box key={answer.short_name} className={classes.multiAnswers}>
                  <InputWithStartAdornment
                    register={{
                      ...form.register(`answers.${idx}.content`),
                    }}
                    adornment={idx + "."}
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
  );
};

export default AddQuestionForm;
