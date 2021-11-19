import ExamService from "../services/exam.service.js";

// [GET] /api/exams/:examId
export const _getOne = async (req, res) => {
  const { examId } = req.params;

  const result = await ExamService._getOne(examId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/exams
export const _getAll = async (req, res) => {
  const result = await ExamService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getExamAttempt = async (req, res) => {
  const { examId, userId } = req.params;

  const result = await ExamService._getExamAttempt(examId, userId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getResultExam = async (req, res) => {
  const { examId } = req.params;

  const result = await ExamService._getResultExam(examId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _createAttempt = async (req, res) => {
  const data = req.body;

  const result = await ExamService._createAttempt(data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/exams
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await ExamService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/exams/:examId
export const _updateOne = async (req, res) => {
  const { examId } = req.params;
  const data = req.body;

  const result = await ExamService._updateOne(examId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/exams/:examId
export const _deleteOne = async (req, res) => {
  const { examId } = req.params;

  const result = await ExamService._deleteOne(examId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
