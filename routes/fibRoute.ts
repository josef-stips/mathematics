import express from "express";
import path from "path";
import fs,{promises as pfs} from "fs";

const filePathFib = path.join(__dirname, "../math", "fibonacci.json");
const router = express.Router();

router.get("/", async (req, res) => {
    const content = await pfs.readFile(filePathFib, "utf8");

    res.json(JSON.parse(content));
});

router.get("/chart", (req, res) => {
    const file = path.join(__dirname, "../client", "fib.html");

    res.writeHead(200, {"content-type": "js"})
    fs.createReadStream(file).pipe(res);
});

export default router;