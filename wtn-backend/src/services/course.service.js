import CourseRepository from "../repository/Course.repository.js";
import ApiError from "../utils/ApiError.js";
// import pool from "../configs/pg.js";
import admin from "../configs/firebase.js";

class CourseService {
  static async _getOne(id) {
    try {
      const courseFound = await CourseRepository._getOne(id);

      return courseFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getCourseInstructor(id) {
    try {
      const courseFound = await CourseRepository._getOne(id);
      const instructorId = courseFound.instructor_id;

      const instructor = await admin.auth().getUser(instructorId);

      return instructor;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const coursesFound = await CourseRepository._getAll();

      const coursesWithInstructor = coursesFound.map(async (course) => {
        const instructor = await admin.auth().getUser(course.instructor_id);

        return {
          ...course,
          instructor,
        };
      });

      return await Promise.all(coursesWithInstructor);
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAllByInstructor(instructorId) {
    try {
      const coursesFound = await CourseRepository._getAllByInstructor(instructorId);

      const coursesWithInstructor = coursesFound.map(async (course) => {
        const instructor = await admin.auth().getUser(course.instructor_id);

        return {
          ...course,
          instructor,
        };
      });

      return await Promise.all(coursesWithInstructor);
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const courseCreated = await CourseRepository._createOne(data);

      return courseCreated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const courseUpdated = await CourseRepository._updateOne(id, data);

      return courseUpdated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    try {
      const courseDeleted = await CourseRepository._deleteOne(id);

      return courseDeleted;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }
}

export default CourseService;
