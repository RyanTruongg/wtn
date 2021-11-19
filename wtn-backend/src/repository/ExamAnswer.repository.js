import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class ExamAnswerRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT * FROM public.exam_answer 
      WHERE id = $1 AND deleted = false
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const queryString = `
      SELECT * FROM public.exam_answer 
      ORDER BY id ASC
      WHERE deleted = false
    `;
    const result = await pool.query(queryString);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.exam_answer", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.exam_answer", id, data);

    const result = await pool.query(queryString, values);
    return result.rows[0];
  }

  static async _deleteOne(id) {
    const queryString = `
      DELETE FROM public.exam_answer 
      WHERE id = $1
    `;
    await pool.query(queryString, [id]);

    return null;
  }
}

export default ExamAnswerRepository;
