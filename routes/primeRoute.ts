import express from 'express';
import path from 'path';
import fs, {promises as pfs} from 'fs';	

const filePathPrime = path.join(__dirname, "../math", "primeNumbers.json");
const router = express.Router();

router.get('/', async(req, res) => {
    const content = await pfs.readFile(filePathPrime, "utf8");
    
    res.json(JSON.parse(content))
})

router.get('/chart', (req, res) => {
    const filePath = path.join(__dirname, "../client", "prime.html");

    res.writeHead(200, { "content-type": "js" });
    fs.createReadStream(filePath).pipe(res);
})

export default router;