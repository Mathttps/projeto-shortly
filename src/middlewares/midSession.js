import jwt from "jsonwebtoken";

export async function tokenValid(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY || "mysecretkey");
    if (!decodedToken.userId) return res.sendStatus(401);

    res.locals.userId = decodedToken.userId;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
}
