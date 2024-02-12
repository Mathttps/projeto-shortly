import db from '../database/dbconnection.js';

export async function sessionGets(token, userId) {
  const query = `
    SELECT * 
    FROM sessions 
    WHERE token = $1 
      AND userId = $2;
  `;
  return db.query(query, [token, userId]);
}

export async function insertSession(token, userId) {
  const query = `
    INSERT INTO sessions(token, userId) 
    VALUES ($1, $2);
  `;
  return db.query(query, [token, userId]);
}
