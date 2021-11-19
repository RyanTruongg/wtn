import { Router } from "express";

import * as questionController from "../controllers/question.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const questionRouter = Router();

questionRouter
  .route("/")
  .get(asyncHandler(questionController._getAll))
  .post(asyncHandler(questionController._createOne));

questionRouter.route("/exam/:examId").post(asyncHandler(questionController._createOneAndAddToExam));

questionRouter
  .route("/:questionId")
  .get(asyncHandler(questionController._getOne))
  .put(asyncHandler(questionController._updateOne))
  .delete(asyncHandler(questionController._deleteOne));

export default questionRouter;
