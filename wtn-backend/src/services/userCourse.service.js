import UserCourseRepository from "../repository/UserCourse.repository.js";
import ApiError from "../utils/ApiError.js";
import pool from "../configs/pg.js";
import admin from "../configs/firebase.js";

class UserCourseService {
  static async _getOne(id) {
    try {
      const userCourseFound = await UserCourseRepository._getOne(id);

      return userCourseFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const userCoursesFound = await UserCourseRepository._getAll();

      return userCoursesFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAllByCourseId(courseId) {
    try {
      const userCoursesFound = await pool.query(
        "SELECT user_id FROM public.user_course WHERE course_id = $1",
        [courseId]
      );

      const userIds = userCoursesFound.rows.map((userCourse) => userCourse.user_id);

      const users = await admin.auth().listUsers(1000);

      const usersFound = users.users.filter((user) => userIds.includes(user.uid));

      return usersFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const { email } = data;

      const user = await admin.auth().getUserByEmail(email);

      const { uid } = user;

      const userCourseCreated = await UserCourseRepository._createOne({
        user_id: uid,
        course_id: data.course_id,
      });

      return userCourseCreated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const userCourseUpdated = await UserCourseRepository._updateOne(id, data);

      return userCourseUpdated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(studentId, courseId) {
    try {
      const userCourseDeleted = await UserCourseRepository._deleteOne(studentId, courseId);

      return userCourseDeleted;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }
}

export default UserCourseService;
