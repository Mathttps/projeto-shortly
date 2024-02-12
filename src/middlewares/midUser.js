export async function userValid(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.sendStatus(422);
    }
    next();
  }
  