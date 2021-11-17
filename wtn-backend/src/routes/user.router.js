import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(asyncHandler(UserController._getAll))
  .post(asyncHandler(UserController._createOne))
  .put(asyncHandler(UserController._updateOne))
  .delete(asyncHandler(UserController._deleteOne));

userRouter.route("/id").post(asyncHandler(UserController._createOneId));

userRouter
  .route("/:userId")
  .get(asyncHandler(UserController._getOne))
  .put(asyncHandler(UserController._updateOne));

export default userRouter;
