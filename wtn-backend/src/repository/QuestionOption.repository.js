import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class QuestionOptionRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT * FROM public.question_option 
      WHERE id = $1
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll(id) {
    const queryString = `
      SELECT * FROM public.question_option
      WHERE question_id = $1 
      ORDER BY id ASC
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.question_option", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.question_option", id, data);

    const result = await pool.query(queryString, values);
    return result.rows[0];
  }

  static async _deleteOne(id) {
    const queryString = `
      DELETE FROM public.question_option 
      WHERE id = $1
    `;
    await pool.query(queryString, [id]);

    return null;
  }
}

export default QuestionOptionRepository;
