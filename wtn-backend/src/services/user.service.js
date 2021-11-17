import admin from "../configs/firebase.js";
import pool from "../configs/pg.js";

class UserService {
  static async _getOne(userId) {
    const user = await admin.auth().getUser(userId);
    return user;
  }

  static async _createOne(user) {
    try {
      const createdUser = await admin.auth().createUser(user);

      await admin.auth().setCustomUserClaims(createdUser.uid, {
        role: user.role,
      });

      const { uid } = createdUser;
      await pool.query("INSERT INTO public.user (id) VALUES ($1)", [uid]);

      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async _createOneId(uid) {
    try {
      await pool.query("INSERT INTO public.user (id) VALUES ($1)", [uid]);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async _updateOne(userId, data) {
    try {
      const user = await admin.auth().updateUser(userId, data);

      await admin.auth().setCustomUserClaims(userId, {
        role: data.role,
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async _deleteOne(userId) {
    try {
      const res = await admin.auth().updateUser(userId, { disabled: true });

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async _getAll() {
    try {
      const { users } = await admin.auth().listUsers();

      const activeUsers = users.filter((user) => !user.disabled);

      return activeUsers;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
