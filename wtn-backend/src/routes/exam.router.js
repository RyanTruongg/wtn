import { Router } from "express";

import * as examController from "../controllers/exam.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const examRouter = Router();

examRouter
  .route("/")
  .get(asyncHandler(examController._getAll))
  .post(asyncHandler(examController._createOne));

examRouter.route("/attempt").post(asyncHandler(examController._createAttempt));
examRouter.route("/attempt/:examId/:userId").get(asyncHandler(examController._getExamAttempt));
examRouter.route("/result/:examId").get(asyncHandler(examController._getResultExam));

examRouter
  .route("/:examId")
  .get(asyncHandler(examController._getOne))
  .put(asyncHandler(examController._updateOne))
  .delete(asyncHandler(examController._deleteOne));

export default examRouter;
