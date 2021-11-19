import QuestionOptionService from "../services/questionOption.service.js";

// [GET] /api/question-options/:questionOptionId
export const _getOne = async (req, res) => {
  const { questionOptionId } = req.params;

  const result = await QuestionOptionService._getOne(questionOptionId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/question-options
export const _getAll = async (req, res) => {
  const result = await QuestionOptionService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/question-options
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await QuestionOptionService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/question-options/:questionOptionId
export const _updateOne = async (req, res) => {
  const { questionOptionId } = req.params;
  const data = req.body;

  const result = await QuestionOptionService._updateOne(questionOptionId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/question-options/:questionOptionId
export const _deleteOne = async (req, res) => {
  const { questionOptionId } = req.params;

  const result = await QuestionOptionService._deleteOne(questionOptionId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
