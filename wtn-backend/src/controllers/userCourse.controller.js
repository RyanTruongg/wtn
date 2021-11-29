import UserCourseService from "../services/userCourse.service.js";

// [GET] /api/user-courses/:userCourseId
export const _getOne = async (req, res) => {
  const { userCourseId } = req.params;

  const result = await UserCourseService._getOne(userCourseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [GET] /api/user-courses
export const _getAll = async (req, res) => {
  const result = await UserCourseService._getAll();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const _getAllByCourseId = async (req, res) => {
  const { courseId } = req.params;
  const result = await UserCourseService._getAllByCourseId(courseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [POST] /api/user-courses
export const _createOne = async (req, res) => {
  const data = req.body;

  const result = await UserCourseService._createOne(data);

  res.status(201).json({
    status: "success",
    data: result,
  });
};

// [PUT] /api/user-courses/:userCourseId
export const _updateOne = async (req, res) => {
  const { userCourseId } = req.params;
  const data = req.body;

  const result = await UserCourseService._updateOne(userCourseId, data);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// [DELETE] /api/user-courses/:userCourseId
export const _deleteOne = async (req, res) => {
  const { studentId, courseId } = req.params;

  const result = await UserCourseService._deleteOne(studentId, courseId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
