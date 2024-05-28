const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllByStatus = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookState = req.params.state;
    const query = { state: bookState };
    const bookStatus = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .find(query);
    bookStatus.toArray().then((user) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleBook = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .find({ _id: bookID });
    result.toArray().then((book) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(book);
    });
  } catch (error) {
    console.error("Error al buscar el libro:", error);
    // Enviar una respuesta de error con el estado 500
    res.status(500).json({ error: "Ocurrió un error al buscar el libro" });
  }
};

const createBook = async (req, res) => {
  //#swagger.tags=['Books']

  const book = {
    title: req.body.title,
    author: req.body.author,
    publication_date: req.body.publication_date,
    genres: req.body.genres,
    description: req.body.description,
    isbn: req.body.isbn,
    state: req.body.state,
    reviews: req.body.reviews
  };

  try {
    // Insertar el usuario en la base de datos
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .insertOne(book);
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

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookID = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    publication_date: req.body.publication_date,
    genres: req.body.genres,
    description: req.body.description,
    isbn: req.body.isbn,
    state: req.body.state,
    reviews: req.body.reviews
  };


  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .replaceOne({ _id: bookID }, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user");
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookID = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .deleteOne({ _id: bookID });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the song.");
  }
};

module.exports = {
  getAllByStatus,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
