import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Page, Paginate } from "components";
import { Grid, Modal } from "@material-ui/core";
import { CourseCard } from "components";
import AddCourseCard from "./components/AddCourseCard";
import AddCourseForm from "./components/AddCourseForm";
import Header from "./components/Header";

import useModal from "hooks/use-modal";

import { CoursesProvider, useCourseContext } from "./hooks/course-context";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: "0.5rem",
  },
  list: {
    marginBottom: "2rem",
    marginTop: theme.spacing(3),
  },
  paginate: {
    justifyContent: "center ",
    padding: "0",
  },
  modal: {
    display: "grid",
    placeItems: "center",
  },
  divider: {
    backgroundColor: "#bdbdbd",
    marginBottom: "1.5rem",
  },
}));

const CourseList = ({ handleOpen }) => {
  const classes = useStyles();
  const { courses } = useCourseContext();

  return (
    <>
      <Grid className={classes.list} container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AddCourseCard onClick={handleOpen} />
        </Grid>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <Paginate
        className={classes.paginate}
        pageCount={10}
        pageRangeDisplayed={3}
      />
    </>
  );
};

const Courses = () => {
  const classes = useStyles();
  const { open, handleOpen, handleClose } = useModal(false);

  return (
    <CoursesProvider>
      <Page className={classes.root} title="Quản lý khóa học">
        <Header />
        <CourseList handleOpen={handleOpen} />
      </Page>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <AddCourseForm handleClose={handleClose} />
      </Modal>
    </CoursesProvider>
  );
};

export default Courses;
