const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllFacilities = async (req, res) => {
  //#swagger.tags=['Facility']
  try {
    const orders = await mongodb
      .getDatabase()
      .db()
      .collection("facility")
      .find();
    orders.toArray().then((facility) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(facility);
    });
  } catch (error) {
    console.error(error);
  }
};

const getFacilitybyStatus = async (req, res) => {
  //#swagger.tags=['Facility']
  try {
    const facilityStatus = req.params.availability;
    const query = { availability: facilityStatus };
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("facility")
      .find(query);
    result.toArray().then((facility) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(facility);
    });
  } catch (error) {
    console.error("Error al buscar el libro:", error);
    // Enviar una respuesta de error con el estado 500
    res.status(500).json({ error: "Ocurrió un error al buscar el libro" });
  }
};

module.exports = {
  getAllFacilities,
  getFacilitybyStatus,
};
