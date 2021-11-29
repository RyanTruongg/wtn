import { Router } from "express";

import * as subjectController from "../controllers/subject.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const courseRouter = Router();

courseRouter
  .route("/")
  .get(asyncHandler(subjectController._getAll))
  .post(asyncHandler(subjectController._createOne));

courseRouter
  .route("/:subjectId")
  .get(asyncHandler(subjectController._getOne))
  .put(asyncHandler(subjectController._updateOne))
  .delete(asyncHandler(subjectController._deleteOne));

export default courseRouter;
