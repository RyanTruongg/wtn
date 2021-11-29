import SubjectService from "../services/subject.service.js";

// [GET] /api/subjects/:subjectId
export const _getOne = async (req, res) => {
  const { subjectId } = req.params;

  const result = await SubjectService._getOne(subjectId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/subjects
export const _getAll = async (req, res) => {
  const result = await SubjectService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/subjects
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await SubjectService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/subjects/:subjectId
export const _updateOne = async (req, res) => {
  const { subjectId } = req.params;
  const data = req.body;

  const result = await SubjectService._updateOne(subjectId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/subjects/:subjectId
export const _deleteOne = async (req, res) => {
  const { subjectId } = req.params;

  const result = await SubjectService._deleteOne(subjectId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
