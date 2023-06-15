const http = require("http");
const characters = require("./utils/data.js");

const server = http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url.includes("/rickandmorty/character")) {
      const urlId = req.url.split("/").pop();
      let found = characters.find(
        (character) => character.id === Number(urlId)
      );
      if (found) {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(found));
      } else {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(JSON.stringify({}))
      }

    }
  })
  .listen(3001, "localhost");

module.exports = server;
