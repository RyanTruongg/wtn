import CourseService from "../services/course.service.js";

// [GET] /api/courses/:courseId
export const _getOne = async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseService._getOne(courseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getCourseInstructor = async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseService._getCourseInstructor(courseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/courses
export const _getAll = async (req, res) => {
  const result = await CourseService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getAllByInstructor = async (req, res) => {
  const { instructorId } = req.params;

  const result = await CourseService._getAllByInstructor(instructorId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/courses
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await CourseService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/courses/:courseId
export const _updateOne = async (req, res) => {
  const { courseId } = req.params;
  const data = req.body;

  const result = await CourseService._updateOne(courseId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/courses/:courseId
export const _deleteOne = async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseService._deleteOne(courseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
