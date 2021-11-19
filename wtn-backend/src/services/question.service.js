/* eslint-disable camelcase */
import QuestionRepository from "../repository/Question.repository.js";
import QuestionOptionRepository from "../repository/QuestionOption.repository.js";
import ApiError from "../utils/ApiError.js";
import pool from "../configs/pg.js";
import ExamQuestionService from "./examQuestion.service.js";

class QuestionService {
  static async _getOne(id) {
    try {
      const question = await QuestionRepository._getOne(id);
      // query question options
      const answers = await pool.query(
        "SELECT * FROM public.question_option WHERE question_id = $1",
        [id]
      );

      question.answers = answers.rows;

      return question;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const questions = await QuestionRepository._getAll();
      return questions;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const { content, subject_id } = data;
      const question = await QuestionRepository._createOne({ content, subject_id });

      const { id: questionId } = question;

      const { answers } = data;

      answers.forEach((answer) => {
        const { content: aContent, status } = answer;
        QuestionOptionRepository._createOne({ content: aContent, status, question_id: questionId });
      });

      return question;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOneAndAddToExam(examId, data) {
    try {
      const { content, subject_id } = data;
      const question = await QuestionRepository._createOne({ content, subject_id });

      const { id: questionId } = question;

      const { answers } = data;

      answers.forEach((answer) => {
        const { content: aContent, status } = answer;
        QuestionOptionRepository._createOne({ content: aContent, status, question_id: questionId });
      });

      await ExamQuestionService._createOne({ exam_id: examId, question_id: questionId });

      return question;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const { content, subject_id } = data;
      const question = await QuestionRepository._updateOne(id, { content, subject_id });

      const { answers } = data;

      answers.forEach((answer) => {
        const { content: aContent, status } = answer;

        console.log({
          content: aContent,
          status,
          question_id: id,
        });
        QuestionOptionRepository._updateOne(answer.id, {
          content: aContent,
          status,
          question_id: id,
        });
      });
      return question;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    const question = await QuestionRepository._deleteOne(id);
    return question;
  }
}

export default QuestionService;
