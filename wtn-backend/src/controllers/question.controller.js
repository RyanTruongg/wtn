import QuestionService from "../services/question.service.js";

// [GET] /api/questions/:questionId
export const _getOne = async (req, res) => {
  const { questionId } = req.params;

  const result = await QuestionService._getOne(questionId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/questions
export const _getAll = async (req, res) => {
  const result = await QuestionService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/questions
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await QuestionService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/questions/:questionId
export const _updateOne = async (req, res) => {
  const { questionId } = req.params;
  const data = req.body;

  const result = await QuestionService._updateOne(questionId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/questions/:questionId
export const _deleteOne = async (req, res) => {
  const { questionId } = req.params;

  const result = await QuestionService._deleteOne(questionId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _createOneAndAddToExam = async (req, res) => {
  const { examId } = req.params;

  const data = req.body;

  const result = await QuestionService._createOneAndAddToExam(examId, data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};
