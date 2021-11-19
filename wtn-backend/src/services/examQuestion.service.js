/* eslint-disable camelcase */
import ExamQuestionRepository from "../repository/ExamQuestion.repository.js";
import QuestionOptionService from "./questionOption.service.js";
import ApiError from "../utils/ApiError.js";
import pool from "../configs/pg.js";

class ExamQuestionService {
  static async _getOne(id) {
    try {
      const examQuestion = await ExamQuestionRepository._getOne(id);

      return examQuestion;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll(exam_id) {
    try {
      const examQuestions = await ExamQuestionRepository._getAll(exam_id);

      const questionWithOptions = examQuestions.map(async (examQuestion) => {
        const id = examQuestion.question_id;
        const options = await QuestionOptionService._getAll(id);
        return { ...examQuestion, options };
      });

      const examQuestionsWithOptions = await Promise.all(questionWithOptions);

      return examQuestionsWithOptions;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAttemptResult(attemptId) {
    try {
      // select all exam_answer where attempt_id = attemptId
      const examId = (
        await pool.query("SELECT exam_id FROM exam_attempt WHERE id = $1", [attemptId])
      ).rows[0].exam_id;

      const totalQuestions = (
        await pool.query("SELECT COUNT(*) FROM exam_question WHERE exam_id = $1", [examId])
      ).rows[0].count;

      const correctAnswers = (
        await pool.query(
          "SELECT COUNT(*) FROM exam_answer WHERE attempt_id = $1 AND answer in (SELECT id FROM question_option WHERE status = true)",
          [attemptId]
        )
      ).rows[0].count;

      return {
        totalQuestions,
        correctAnswers,
      };
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");

        // throw new ApiError(500, "Internal Server Error");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const examQuestion = await ExamQuestionRepository._createOne(data);

      return examQuestion;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _submit(attempt_id, answers) {
    try {
      // const examQuestion = await ExamQuestionRepository._createOne(data);

      const records = answers.map(async (answer) => {
        const query = await pool.query(
          "INSERT INTO exam_answer (attempt_id, question_id, answer) VALUES ($1, $2, $3) RETURNING *",
          [attempt_id, answer.question_id, answer.answer]
        );

        return query.rows[0];
      });

      const examAnswers = await Promise.all(records);

      await pool.query("UPDATE exam_attempt SET submitted = true WHERE id = $1", [attempt_id]);

      return examAnswers;

      // return examQuestion;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const examQuestion = await ExamQuestionRepository._updateOne(id, data);

      return examQuestion;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(exam_id, question_id) {
    console.log(exam_id, question_id);
    const examQuestion = await ExamQuestionRepository._deleteOne(exam_id, question_id);

    return examQuestion;
  }
}

export default ExamQuestionService;
