import {  getDomainUser, insertUser, getUserDomain, getShortById } from "../repositories/repoUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertSession } from "../repositories/repoSession.js";

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserDomain(email);
    if (user.rowCount !== 1 || !bcrypt.compareSync(password, user.rows[0].password))
      return res.sendStatus(401);

    const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY);
    await insertSession(token, user.rows[0].id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await getUserDomain(email);
    if (existingUser.rowCount !== 0) return res.sendStatus(409);

    const hashedPassword = bcrypt.hashSync(password, 10);
    await insertUser(name, email, hashedPassword);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function usersLocal(req, res) {
  try {
    const userId = res.locals.userId;
    
    const user = await getDomainUser(userId);
    
    const short = await getShortById(userId);
    
    const visitCount = short.rows.reduce((acc, curr) => acc + curr.visitCount, 0);
    
    const completeUser = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: visitCount,
      shortenedUrls: short.rows.map(row => ({ 
        id: row.id,
        url: row.url,
        shortUrl: row.shortUrl, 
      }))
    };

    res.status(200).send(completeUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
}