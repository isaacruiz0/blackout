import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("dist"));
const indexFilePath = path.join(__dirname, "/dist/index.html");
app.get("/", (req, res) => {
  res.status(200).sendFile(indexFilePath);
});
app.get("/careers", (req, res) => {
  res.status(200).sendFile(indexFilePath);
});
app.get("/quote", (req, res) => {
  res.status(200).sendFile(indexFilePath);
});
app.listen(PORT, () => {
  console.log(`we live on ${PORT}`);
});
