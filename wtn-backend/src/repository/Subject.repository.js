import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class SubjectRepository {
  static async _getOne(id) {
    const result = await pool.query("SELECT * FROM public.subject WHERE id = $1", [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const result = await pool.query(
      "SELECT * FROM public.subject WHERE deleted = false ORDER BY id ASC"
    );

    return result.rows;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.subject", data);

    const result = await pool.query(queryString, values);

    return result.rows[0] ?? null;
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.subject", id, data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _deleteOne(id) {
    await pool.query("DELETE FROM public.subject WHERE id = $1", [id]);

    return null;
  }
}

export default SubjectRepository;
