import courseRouter from "./course.router.js";
import examRouter from "./exam.router.js";
import examAnswerRouter from "./examAnswer.router.js";
import examQuestionRouter from "./examQuestion.router.js";
import questionRouter from "./question.router.js";
import questionOptionRouter from "./questionOption.router.js";
import subjectRouter from "./subject.router.js";
import userCourseRouter from "./userCourse.router.js";
import userRouter from "./user.router.js";

import errorHandler from "../middlewares/error.middleware.js";

const route = (app) => {
  app.use("/api/courses", courseRouter);
  app.use("/api/exams", examRouter);
  app.use("/api/exam-answers", examAnswerRouter);
  app.use("/api/exam-questions", examQuestionRouter);
  app.use("/api/questions", questionRouter);
  app.use("/api/question-options", questionOptionRouter);
  app.use("/api/subjects", subjectRouter);
  app.use("/api/user-courses", userCourseRouter);
  app.use("/api/users", userRouter);
  app.use(errorHandler);
};

export default route;
