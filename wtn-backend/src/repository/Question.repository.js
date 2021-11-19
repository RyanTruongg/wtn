import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class QuestionRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT *, s.id as subject_id, s.name as subject_name FROM public.question q
      JOIN public.subject s ON q.subject_id = s.id
      WHERE q.id = $1
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const queryString = `
      SELECT *, q.id as id, s.id as subject_id, s.name as subject_name FROM public.question q
      JOIN public.subject s ON q.subject_id = s.id
    `;
    const result = await pool.query(queryString);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.question", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.question", id, data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _deleteOne(id) {
    const queryString = `
      DELETE FROM public.question 
      WHERE id = $1
    `;
    await pool.query(queryString, [id]);

    return null;
  }
}

export default QuestionRepository;
