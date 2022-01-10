import axios from "services/axios";

export default class UserServices {
  static _createOne = async (userId) => {
    const response = await axios.post("/users/id", { uid: userId });
    return response.data;
  };
}
