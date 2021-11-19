/* eslint-disable camelcase */
import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class ExamRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT * FROM public.exam 
      WHERE id = $1
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const queryString = `
      SELECT * FROM public.exam 
      ORDER BY id ASC
    `;
    const result = await pool.query(queryString);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const start_time = new Date(data.start_time);
    const end_time = new Date(data.end_time);

    const { queryString, values } = PostgresHelper.createInsert("public.exam", {
      ...data,
      start_time,
      end_time,
    });

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.exam", id, data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _deleteOne(id) {
    const queryString = `
      DELETE FROM public.exam 
      WHERE id = $1
    `;
    await pool.query(queryString, [id]);

    return null;
  }
}

export default ExamRepository;
