import db from '../database/dbconnection.js';

export async function getUserDomain(email) {
	const query = `
    SELECT * 
    FROM users 
    WHERE email = $1;
  `;
	return db.query(query, [email]);
}

export async function insertUser(name, email, password) {
	const query = `
	  INSERT INTO users(name, email, password) 
	  VALUES ($1, $2, $3);
	`;
	return db.query(query, [name, email, password]);
}

export async function getDomainUser(id) {
	const query = `
	  SELECT users.id, users.name, SUM(urls.visitCount) AS visitCount 
	  FROM users 
	  JOIN urls ON users.id = urls.userId 
	  WHERE users.id = $1 
	  GROUP BY users.id;
	`;
	return db.query(query, [id]);
}

export async function getShortById(id) {
	const query = `
    SELECT urls.id, urls.shortUrl, urls.url, urls.visitCount 
    FROM urls 
    JOIN users ON users.id = urls.userId 
    WHERE users.id = $1;
  `;
	return db.query(query, [id]);
}



