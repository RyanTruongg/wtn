import admin from "../configs/firebase.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization?.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      req.claims = claims;
      next();
    })
    .catch((e) => {
      res.send(e);
    });
};

export default verifyToken;
