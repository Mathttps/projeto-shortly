import db from '../database/dbconnection.js';

export async function getRank() {
  const query = `
    SELECT 
      u.id AS user_id, 
      u.name AS user_name, 
      COUNT(url.id) AS links_count, 
      SUM(url.visitCount) AS visit_count 
    FROM 
      users u 
    JOIN 
      urls url ON u.id = url.userId 
    GROUP BY 
      u.id, 
      u.name 
    ORDER BY 
      visit_count DESC 
    LIMIT 10;
  `;

  return db.query(query);
}
