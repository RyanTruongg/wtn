import { Router } from "express";

import * as examAnswerController from "../controllers/examAnswer.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const examAnswerRouter = Router();

examAnswerRouter
  .route("/")
  .get(asyncHandler(examAnswerController._getAll))
  .post(asyncHandler(examAnswerController._createOne));

examAnswerRouter.route("/submit").post(asyncHandler(examAnswerController._submit));
examAnswerRouter
  .route("/result/:attemptId")
  .get(asyncHandler(examAnswerController._getAttemptResult));

examAnswerRouter
  .route("/:examAnswerId")
  .get(asyncHandler(examAnswerController._getOne))
  .put(asyncHandler(examAnswerController._updateOne))
  .delete(asyncHandler(examAnswerController._deleteOne));

export default examAnswerRouter;
