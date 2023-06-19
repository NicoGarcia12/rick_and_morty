const axios = require("axios");
function getCharById(res, id) {
  axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      return response.data;
    })
    .then(({ name, gender, species, origin, image, status }) => {
      let personaje = {
        id,
        name,
        gender,
        species,
        origin,
        image,
        status,
      };
      return res
        .writeHead(200, { "Content-type": "application/json" })
        .end(JSON.stringify(personaje));
    })
    .catch((error) => {
      return res
        .writeHead(500, { "Content-type": "text/plain" })
        .end(error.message);
    });
  return;
}

module.exports = { getCharById };
