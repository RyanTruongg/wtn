import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ModalWithTransition, Page, Paginate, Skeleton } from "components";
import {
  Grid,
  Typography,
  Modal,
  Divider,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import { CourseCard } from "components";
import AddCourseCard from "./components/AddCourseCard";
import AddCourseForm from "./components/AddCourseForm";

import useModal from "hooks/use-modal";

import { CourseServices } from "services";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: "0.5rem",
  },
  list: {
    marginBottom: "2rem",
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

const ClassroomCourses = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState({ data: [], status: "pending" });
  const { open, handleOpen, handleClose } = useModal(false);

  const fetchData = () => {
    setCourses({ data: [], status: "pending" });
    const response = CourseServices.getCourseList(0, 8);

    response.then((res) => setCourses({ data: res.data, status: "success" }));

    response.catch(() => setCourses({ data: [], status: "failed" }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCourse = (name) => {
    CourseServices.addCourse(name)
      .then((res) => {
        alert("Them thanh cong");
        setCourses([res.data, ...courses]);
      })
      .catch((e) => alert("Them khong thanh cong"));
  };

  return (
    <Page className={classes.root} title="Courses">
      <Typography className={classes.header} color="primary" variant="h2">
        Courses
      </Typography>
      <Divider className={classes.divider} />
      <Grid className={classes.list} container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AddCourseCard onClick={handleOpen} />
        </Grid>
        {courses.status === "success" ? (
          courses.data.map((course) => (
            <Grid key={course.id} item xs={12} sm={6} md={4}>
              <CourseCard course={course} />
            </Grid>
          ))
        ) : (
          <Skeleton variant="card" height={"210px"} count={8} />
        )}
      </Grid>
      <Paginate
        className={classes.paginate}
        pageCount={10}
        pageRangeDisplayed={3}
      />
      {/* Modal */}
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <AddCourseForm
          handleClose={handleClose}
          handleAddCourse={handleAddCourse}
        />
      </Modal>
      <ModalWithTransition
        className={classes.modal}
        open={open}
        onClose={handleClose}
        timeout={250}
      >
        <AddCourseForm
          handleClose={handleClose}
          handleAddCourse={handleAddCourse}
        />
      </ModalWithTransition>
      {/* Snack bar */}

      <Snackbar open={courses.status === "failed"} autoHideDuration={6000}>
        <Alert
          severity="error"
          action={
            <IconButton
              onClick={() => {
                fetchData();
              }}
              color="inherit"
              size="small"
            >
              <ReplayIcon />
            </IconButton>
          }
        >
          Something wrong
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default ClassroomCourses;
