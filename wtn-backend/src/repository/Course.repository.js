import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class CourseRepository {
  static async _getOne(id) {
    const result = await pool.query("SELECT * FROM public.course WHERE id = $1", [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const result = await pool.query("SELECT * FROM public.course ORDER BY id ASC");

    return result.rows ?? null;
  }

  static async _getAllByInstructor(instructorId) {
    const result = await pool.query("SELECT * FROM public.course WHERE instructor_id = $1", [
      instructorId,
    ]);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.course", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.course", id, data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _deleteOne(id) {
    await pool.query("DELETE FROM public.course WHERE id = $1", [id]);

    return null;
  }
}

export default CourseRepository;
