const { fetchAndTransformExternalData } = require("../services/external-data.service");

async function getExternalData(req, res) {
  try {
    const data = await fetchAndTransformExternalData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving external data",
      detail: error.message,
    });
  }
}

module.exports = {
  getExternalData,
};