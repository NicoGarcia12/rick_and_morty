const http = require("http");
const {getCharById} = require("./controllers/getCharById")

const server = http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url.includes("/rickandmorty/character/")) {
      const urlId = req.url.split("/").pop();
      getCharById(res, urlId);
    }
  })
  .listen(3001, "localhost");

module.exports = server;
