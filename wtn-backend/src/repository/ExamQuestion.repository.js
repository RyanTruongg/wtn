/* eslint-disable camelcase */
import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class ExamQuestionRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT * FROM public.exam_question 
      WHERE exam_id = $1
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll(exam_id) {
    const queryString = `
      SELECT *, q.id as id, s.id as subject_id, s.name as subject_name FROM public.exam_question eq
      JOIN public.question q ON eq.question_id = q.id 
      JOIN public.subject s ON q.subject_id = s.id
      WHERE eq.exam_id = $1
      ORDER BY exam_id ASC
    `;
    const result = await pool.query(queryString, [exam_id]);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.exam_question", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.exam_question", id, data);

    const result = await pool.query(queryString, values);
    return result.rows[0];
  }

  static async _deleteOne(exam_id, question_id) {
    const queryString = `
      DELETE FROM public.exam_question 
      WHERE exam_id = $1 and question_id = $2
    `;
    await pool.query(queryString, [exam_id, question_id]);

    return null;
  }
}

export default ExamQuestionRepository;
