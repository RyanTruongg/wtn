/* eslint-disable no-throw-literal */
import UserRepository from "../repository/User.repository.js";

export class AuthService {
  static signUp(params) {
    try {
      // check params
      if (params.password < 6) {
        throw { code: 1 };
      }

      const newUser = UserRepository.createOne(params);

      return newUser;
    } catch (error) {
      if (error.code === 1) {
        throw {
          msg: "Invalid password",
          status: 400, // http code
        };
      }

      if (error.code === 20245) {
        // DB error
        throw {
          msg: "...",
          status: 400,
        };
      }

      throw {
        msg: "Internal error",
        status: 500, // status 500 by default
      };
    }
  }
}
