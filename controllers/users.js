const mongodb = require("../database/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((user) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['users']
  const userID = new ObjectId(req.params.id);
  console.log(userID)
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userID });
  result.toArray().then((user) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags=['users']

  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_birth: req.body.date_birth,
    role: req.body.role,
    email: req.body.email,
  };

  try {
    // Insertar el usuario en la base de datos
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .insertOne(user);
    if (response.result.ok) {
      res.status(204).send();
    } else {
      res.status(500).json({
        error: "Some error occurred while creating the user."
      });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({
      error: "An error occurred while creating the user.",
      details: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['users']
  const userID = new ObjectId(req.params.id);
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_birth: req.body.date_birth,
    role: req.body.role,
    email: req.body.email,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userID }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user");
  }
};

const deleteUSer = async (req, res) => {
  //#swagger.tags=['users']
  const userID = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userID });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the song.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUSer,
};
