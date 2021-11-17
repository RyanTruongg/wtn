import pool from "../configs/pg.js";

class UserRepository {
  static createOne(params) {
    return pool.query("INSERT INTO BLA BLA");
  }
}

export default UserRepository;
