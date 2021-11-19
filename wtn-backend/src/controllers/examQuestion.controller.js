/* eslint-disable camelcase */
import ExamQuestionService from "../services/examQuestion.service.js";

// [GET] /api/exam-questions/:examQuestionId
export const _getOne = async (req, res) => {
  const { examQuestionId } = req.params;

  const result = await ExamQuestionService._getOne(examQuestionId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/exam-questions
export const _getAll = async (req, res) => {
  const { exam_id } = req.params;
  const result = await ExamQuestionService._getAll(exam_id);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/exam-questions
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await ExamQuestionService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/exam-questions/:examQuestionId
export const _updateOne = async (req, res) => {
  const { examQuestionId } = req.params;
  const data = req.body;

  const result = await ExamQuestionService._updateOne(examQuestionId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/exam-questions/:examQuestionId
export const _deleteOne = async (req, res) => {
  const { exam_id, question_id } = req.params;

  const result = await ExamQuestionService._deleteOne(exam_id, question_id);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
