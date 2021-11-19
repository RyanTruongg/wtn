import { Router } from "express";

import * as examQuestionController from "../controllers/examQuestion.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const examQuestionRouter = Router();

examQuestionRouter
  .route("/")
  .get(asyncHandler(examQuestionController._getAll))
  .post(asyncHandler(examQuestionController._createOne));

examQuestionRouter.route("/exam/:exam_id").get(asyncHandler(examQuestionController._getAll));

examQuestionRouter
  .route("/:exam_id/:question_id")
  .delete(asyncHandler(examQuestionController._deleteOne));

examQuestionRouter
  .route("/:examQuestionId")
  .get(asyncHandler(examQuestionController._getOne))
  .put(asyncHandler(examQuestionController._updateOne))
  .delete(asyncHandler(examQuestionController._deleteOne));

export default examQuestionRouter;
