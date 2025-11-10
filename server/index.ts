import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { Pages } from "./cross_platform_types/pages.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("dist"));
app.use(express.static("public"));
app.get("/api/all_pages", (req, res: express.Response) => {
  const homePath = path.join(__dirname, "/dist/src/pages/home.html"),
    careerPath = path.join(__dirname, "dist/src/pages/careers.html"),
    quotePath = path.join(__dirname, "dist/src/pages/quote.html");

  try {
    const home = fs.readFileSync(homePath, "utf8"),
      careers = fs.readFileSync(careerPath, "utf8"),
      quote = fs.readFileSync(quotePath, "utf8"),
      pages: Pages = { "/": home, "/careers": careers, "/quote": quote };
    res.status(200).json(pages);
  } catch (err) {
    throw new Error(err);
  }
});
const indexFilePath = path.join(__dirname, "/dist/index.html");
// The index file will init the single page application
app.get("/", (req, res: express.Response) => {
  res.status(200).sendFile(indexFilePath);
});
app.get("/careers", (req, res: express.Response) => {
  res.status(200).sendFile(indexFilePath);
});
app.get("/quote", (req, res: express.Response) => {
  res.status(200).sendFile(indexFilePath);
});
app.listen(PORT, () => {
  console.log(`we live on ${PORT}`);
});
