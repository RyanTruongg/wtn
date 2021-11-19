import QuestionOptionRepository from "../repository/QuestionOption.repository.js";
import ApiError from "../utils/ApiError.js";

class QuestionOptionService {
  static async _getOne(id) {
    try {
      const questionOption = await QuestionOptionRepository._getOne(id);
      return questionOption;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll(id) {
    try {
      const questionOptions = await QuestionOptionRepository._getAll(id);
      return questionOptions;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const questionOption = await QuestionOptionRepository._createOne(data);
      return questionOption;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const questionOption = await QuestionOptionRepository._updateOne(id, data);
      return questionOption;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    const questionOption = await QuestionOptionRepository._deleteOne(id);
    return questionOption;
  }
}

export default QuestionOptionService;
