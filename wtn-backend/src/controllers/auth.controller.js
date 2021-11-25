import { AuthService } from "../services/auth.service.js";

export const signUp = (req, res) => {
  try {
    const params = req.body;
    const newUser = AuthService.signUp(params);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(error.status).send(error);
  }
};
