const URL = "https://rickandmortyapi.com/api/character/";
const axios = require("axios");

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios(URL + id);
    const data = response.data;

    const character = {
      id: data.id,
      name: data.name,
      gender: data.gender,
      species: data.species,
      origin: data.origin?.name,
      image: data.image,
      status: data.status,
    };

    if (character.name) {
      res.status(200).json(character);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCharById };
