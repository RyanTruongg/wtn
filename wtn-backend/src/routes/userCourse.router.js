import { Router } from "express";

import * as userCourseController from "../controllers/userCourse.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const userCourseRouter = Router();

userCourseRouter
  .route("/")
  .get(asyncHandler(userCourseController._getAll))
  .post(asyncHandler(userCourseController._createOne));

userCourseRouter
  .route("/course/:courseId")
  .get(asyncHandler(userCourseController._getAllByCourseId));

userCourseRouter
  .route("/:studentId/:courseId")
  .delete(asyncHandler(userCourseController._deleteOne));

userCourseRouter
  .route("/:userCourseId")
  .get(asyncHandler(userCourseController._getOne))
  .put(asyncHandler(userCourseController._updateOne));

export default userCourseRouter;
