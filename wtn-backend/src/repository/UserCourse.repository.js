import pool from "../configs/pg.js";
import PostgresHelper from "../utils/PostgresHelper.js";

class UserCourseRepository {
  static async _getOne(id) {
    const queryString = `
      SELECT * FROM public.user_course 
      WHERE id = $1
    `;
    const result = await pool.query(queryString, [id]);

    return result.rows[0] ?? null;
  }

  static async _getAll() {
    const queryString = `
      SELECT * FROM public.user_course 
      ORDER BY id ASC
    `;
    const result = await pool.query(queryString);

    return result.rows ?? null;
  }

  static async _createOne(data) {
    const { queryString, values } = PostgresHelper.createInsert("public.user_course", data);

    const result = await pool.query(queryString, values);

    return result.rows[0];
  }

  static async _updateOne(id, data) {
    const { queryString, values } = PostgresHelper.createUpdate("public.user_course", id, data);

    const result = await pool.query(queryString, values);
    return result.rows[0];
  }

  static async _deleteOne(studentId, courseId) {
    const queryString = `
      DELETE FROM public.user_course 
      WHERE user_id = $1 AND course_id = $2
    `;
    await pool.query(queryString, [studentId, courseId]);

    return null;
  }
}

export default UserCourseRepository;
