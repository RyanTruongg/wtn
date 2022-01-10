import axios from "services/axios";

export default class AuthServices {
  static login = async (username, password) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return axios.post("/login/access-token", params, { headers });
  };

  static testToken = async () => {
    // return axios.post("/login/test-token");
    return {
      email: "admin@gmail.com",
      is_active: true,
      is_superuser: true,
      full_name: "string",
      id: 2,
    };
  };
}
