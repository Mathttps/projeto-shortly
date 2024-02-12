import { getRank } from "../repositories/reposRanking.js";

export async function rankGet(req, res) {
  try {
    const { rows } = await getRank();

    rows.sort((a, b) => b.visitCount - a.visitCount);
    

    const topUsers = rows.slice(0, 10);
    
    
    res.status(200).json(topUsers.map(user => ({
      id: user.id,
      name: user.name,
      linksCount: user.linksCount,
      visitCount: user.visitCount
    })));
  } catch (err) {
    console.error("Erro ao obter links:", err);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
}
