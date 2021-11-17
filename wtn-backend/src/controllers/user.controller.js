import UserService from "../services/user.service.js";

export const _getOne = async (req, res) => {
  const { userId } = req.params;

  const result = await UserService._getOne(userId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getAll = async (req, res) => {
  const result = await UserService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await UserService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

export const _createOneId = async (req, res) => {
  const { uid } = req.body;

  const result = await UserService._createOneId(uid);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

export const _updateOne = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const result = await UserService._updateOne(userId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _deleteOne = async (req, res) => {
  const { userId } = req.params;

  const result = await UserService._deleteOne(userId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
