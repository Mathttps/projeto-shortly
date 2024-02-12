import { nanoid } from "nanoid";
import {  getUrlShortById, deleteShortUrl, insertShortUrl, getUrlShort, urlGetShortByIdComp,  updateUrl } from "../repositories/repoUrl.js";

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const shortUrl = await getUrlShortById(id);
    if (shortUrl.rowCount === 0) return res.sendStatus(404);
    res.status(200).send(shortUrl.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function shortenUrls(req, res) {
  const { url } = req.body;
  try {
    const shortUrl = nanoid();
    const userId = res.locals.userId;
    await insertShortUrl(url, shortUrl, userId);
    const createdShortUrl = await getUrlShort(shortUrl);
    res.status(201).send(createdShortUrl.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function deleteTsUrl(req, res) {
  const { id } = req.params;
  
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }
  
  try {
    const userId = res.locals.userId;
    const urlInfo = await urlGetShortByIdComp(id);
    
    if (urlInfo.rowCount === 0) return res.sendStatus(404);
    if (urlInfo.rows[0].userId !== Number(userId)) return res.sendStatus(401);
    
    await deleteShortUrl(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const shortUrlInfo = await getUrlShort(shortUrl);
    if (shortUrlInfo.rowCount === 0) return res.sendStatus(404);
    const urlInfo = await getUrlShortById(shortUrlInfo.rows[0].id);
    await updateUrl(urlInfo.rows[0].id);
    res.redirect(urlInfo.rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
