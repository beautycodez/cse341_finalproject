const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllOrders = async (req, res) => {
  //#swagger.tags=['Library']
  try {
    const orders = await mongodb
      .getDatabase()
      .db()
      .collection("library")
      .find();
    orders.toArray().then((user) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleOrder = async (req, res) => {
  //#swagger.tags=['Library']
  try {
    const orderID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("library")
      .find({ _id: orderID });
    result.toArray().then((order) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(order);
    });
  } catch (error) {
    console.error("Error al buscar el libro:", error);
    // Enviar una respuesta de error con el estado 500
    res.status(500).json({ error: "Ocurrió un error al buscar el libro" });
  }
};

const createOrder = async (req, res) => {
  //#swagger.tags=['Library']

  const order = {
    bookId: req.body.bookId,
    userId: req.body.userId,
    borrowDate: req.body.borrowDate,
    returnDate: req.body.returnDate,
    status: req.body.status
  };

  try {
    // Insertar el usuario en la base de datos
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("library")
      .insertOne(order);
    if (response.result.ok) {
      res.status(204).send();
    } else {
      res.status(500).json({
        error: "Some error occurred while creating the user.",
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

const updateOrder = async (req, res) => {
  //#swagger.tags=['Library']
  const orderID = new ObjectId(req.params.id);
  const order = {
    bookId: req.body.bookId,
    userId: req.body.userId,
    borrowedDate: req.body.borrowedDate,
    returnDate: req.body.returnDate,
    status: req.body.status
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("library")
    .replaceOne({ _id: orderID }, order);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user");
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['Library']
  const orderID = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("library")
    .deleteOne({ _id: orderID });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the song.");
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
