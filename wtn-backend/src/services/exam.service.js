import ExamRepository from "../repository/Exam.repository.js";
import ApiError from "../utils/ApiError.js";
import pool from "../configs/pg.js";
import admin from "../configs/firebase.js";

class ExamService {
  static async _getOne(id) {
    try {
      const examFound = await ExamRepository._getOne(id);

      return examFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createAttempt(data) {
    try {
      const examAttempt = pool.query(
        "INSERT INTO exam_attempt (exam_id, user_id, start_time, submitted) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.exam_id, data.user_id, new Date(), false]
      );

      return (await examAttempt).rows[0];
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getExamAttempt(examId, userId) {
    try {
      const examAttempt = (
        await pool.query("SELECT * FROM exam_attempt WHERE exam_id = $1 AND user_id = $2", [
          examId,
          userId,
        ])
      ).rows[0];

      const examDuration = (await pool.query("SELECT duration FROM exam WHERE id = $1", [examId]))
        .rows[0].duration;

      const timeup = new Date(examAttempt.start_time);
      timeup.setMinutes(timeup.getMinutes() + examDuration);

      return { ...examAttempt, timeup } || null;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getResultExam(examId) {
    try {
      const totalQuestion = (
        await pool.query("SELECT COUNT(*) as count FROM exam_question WHERE exam_id = $1", [examId])
      ).rows[0].count;

      const studentResult = (
        await pool.query(
          `Select exam_attempt.user_id, count(answer) from exam_answer
        join exam_attempt on exam_attempt.id = exam_answer.attempt_id
        where attempt_id in (select id from exam_attempt where exam_id = $1)
        group by exam_attempt.user_id, exam_answer.answer
        having answer in (select id from question_option where status = true)`,
          [examId]
        )
      ).rows;

      const results = studentResult.map(async (result) => {
        const studentInfo = await admin.auth().getUser(result.user_id);
        return { ...studentInfo.toJSON(), ...result };
      });

      const result = await Promise.all(results);

      return { result, totalQuestion };
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _getAll() {
    try {
      const examsFound = await ExamRepository._getAll();

      return examsFound;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _createOne(data) {
    try {
      const examCreated = await ExamRepository._createOne(data);

      return examCreated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _updateOne(id, data) {
    try {
      const examUpdated = await ExamRepository._updateOne(id, data);

      return examUpdated;
    } catch (error) {
      if (error.code === 23503) {
        throw new ApiError(400, "...");
      }

      throw new ApiError(500, "Internal Server Error");
    }
  }

  static async _deleteOne(id) {
    const examDeleted = await ExamRepository._deleteOne(id);

    return examDeleted;
  }
}

export default ExamService;
