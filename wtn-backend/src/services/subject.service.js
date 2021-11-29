import SubjectRepository from "../repository/Subject.repository.js";
import ApiError from "../utils/ApiError.js";
import pool from "../configs/pg.js";

class SubjectService {
  static async _getOne(id) {
    try {
      const subjectFound = await SubjectRepository._getOne(id);

      return subjectFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const subjectsFound = await SubjectRepository._getAll();

      return subjectsFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const subjectCreated = await SubjectRepository._createOne(data);

      return subjectCreated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const subjectUpdated = await SubjectRepository._updateOne(id, data);

      return subjectUpdated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    try {
      await pool.query("UPDATE subject SET deleted = true WHERE id = $1", [id]);

      return null;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }
}

export default SubjectService;
