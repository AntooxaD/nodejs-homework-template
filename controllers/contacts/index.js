const getAll = require("./getAll");
const getByID = require("./getById");
const postContact = require("./postContact");
const removeById = require("./removeByID");
const putById = require("./putById");
const patchByIdFav = require("./patchByIdFav");

module.exports = {
  getAll,
  getByID,
  postContact,
  removeById,
  putById,
  patchByIdFav,
};
