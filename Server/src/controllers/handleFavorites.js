let allFavorites = [];
function postFav(req, res) {
  const character = req.body;
  allFavorites.push(character);
  res.status(200).json(allFavorites);
}
function deleteFav(req, res) {
  const { id } = req.params;
  const index = allFavorites.findIndex(
    (favorite) => favorite.id === parseInt(id)
  );
  if (index === -1) {
    res.status(200).json(allFavorites);
  } else {
    allFavorites.splice(index, 1);
    res.status(200).json(allFavorites);
  }
}

module.exports = { postFav, deleteFav };
