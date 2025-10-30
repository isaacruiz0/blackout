import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/pages/home", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/dist/src/pages/home.html"));
});

app.listen(PORT, () => {
  console.log(`we live on ${PORT}`);
});
