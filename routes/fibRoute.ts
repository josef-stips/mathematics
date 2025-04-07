import express from "express";
import path from "path";
import fs,{promises as pfs} from "fs";
import { filePath } from "../constants";

const router = express.Router();

router.get("/", async (req, res) => {
    const content = await pfs.readFile(filePath, "utf8");

    res.json(JSON.parse(content));
});

router.get("/chart", async (req, res) => {
    const file = path.join(__dirname, "../client", "index.html");

    res.writeHead(200, {"content-type": "js"})
    // res.type('.js');
    fs.createReadStream(file).pipe(res);
    // res.sendFile(file);
});

export default router;