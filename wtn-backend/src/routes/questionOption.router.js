import { Router } from "express";

import * as questionOptionController from "../controllers/questionOption.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const questionOptionRouter = Router();

questionOptionRouter
  .route("/")
  .get(asyncHandler(questionOptionController._getAll))
  .post(asyncHandler(questionOptionController._createOne));

questionOptionRouter
  .route("/:questionOptionId")
  .get(asyncHandler(questionOptionController._getOne))
  .put(asyncHandler(questionOptionController._updateOne))
  .delete(asyncHandler(questionOptionController._deleteOne));

export default questionOptionRouter;
