import { Router } from "express";

import * as courseController from "../controllers/course.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const courseRouter = Router();

courseRouter
  .route("/")
  .get(asyncHandler(courseController._getAll))
  .post(asyncHandler(courseController._createOne));

courseRouter
  .route("/instructor/:instructorId")
  .get(asyncHandler(courseController._getAllByInstructor));

courseRouter
  .route("/:courseId")
  .get(asyncHandler(courseController._getOne))
  .put(asyncHandler(courseController._updateOne))
  .delete(asyncHandler(courseController._deleteOne));

courseRouter
  .route("/:courseId/instructor")
  .get(asyncHandler(courseController._getCourseInstructor));

export default courseRouter;
