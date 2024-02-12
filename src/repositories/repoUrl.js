import db from '../database/dbconnection.js';

export async function insertShortUrl(url, shortUrl, userId) {
    const query = `
    INSERT INTO urls(url, shortUrl, userId) 
    VALUES ($1, $2, $3);
  `;
    return db.query(query, [url, shortUrl, userId]);
}

export async function getUrlShort(shortUrl) {
    const query = `
    SELECT id, shorturl 
    FROM urls 
    WHERE shorturl = $1; 
  `;
    return db.query(query, [shortUrl]);
}

export async function urlGetShortByIdComp(id) {
    const query = `
      SELECT userId 
      FROM urls 
      WHERE id = $1;
    `;
    return db.query(query, [id]);
}

export async function getUrlShortById(id) {
    const query = `
    SELECT id, shorturl as shortUrl, url 
    FROM urls 
    WHERE id = $1;
  `;
    return db.query(query, [id]);
}


export async function updateUrl(id) {
    const query = `
    UPDATE urls 
    SET visitCount = visitCount + 1 
    WHERE id = $1;
  `;
    return db.query(query, [id]);
}

export async function deleteShortUrl(id) {
    const query = `
    DELETE FROM urls 
    WHERE id = $1;
  `;
    return db.query(query, [id]);
}
