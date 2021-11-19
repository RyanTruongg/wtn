import ExamAnswerRepository from "../repository/ExamAnswer.repository.js";
import ApiError from "../utils/ApiError.js";

class ExamAnswerService {
  static async _getOne(id) {
    try {
      const examAnswer = await ExamAnswerRepository._getOne(id);

      return examAnswer;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const examAnswers = await ExamAnswerRepository._getAll();

      return examAnswers;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const examAnswer = await ExamAnswerRepository._createOne(data);

      return examAnswer;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const examAnswer = await ExamAnswerRepository._updateOne(id, data);

      return examAnswer;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    const examAnswer = await ExamAnswerRepository._deleteOne(id);

    return examAnswer;
  }
}

export default ExamAnswerService;
