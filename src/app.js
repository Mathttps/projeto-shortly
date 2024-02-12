import cors from "cors"
import dotenv from "dotenv"
import express from "express";
import router from "./routers/router.index.js";


const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

app.use(router)
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})

