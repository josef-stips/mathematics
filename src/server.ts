import express from "express";
import http from "http";
import fibRouter from "../routes/fibRoute";

const App = express();

App.use(express.static("/public"))
App.use("/fib", fibRouter);

const server = http.createServer(App);

App.get("/", (req, res) => {
    res.send("hello world!");
});

server.listen(204, () => {
    console.log("server is listening at port ", 204);
})