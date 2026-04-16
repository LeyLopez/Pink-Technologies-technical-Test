const axios = require("axios");
const { getDataSource } = require("../config/data-source");

function buildExternalUrl() {
  const baseUrl = process.env.EXTERNAL_API_BASE_URL;
  const path = process.env.EXTERNAL_API_PATH;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!baseUrl || !path || !apiKey) {
    throw new Error("Missing required environment variables for external API");
  }

  return `${baseUrl}${path}&apikey=${apiKey}`;
}

function transformExternalPayload(data) {
  const exchangeRate = data["Realtime Currency Exchange Rate"];

  if (!exchangeRate) {
    throw new Error("Unexpected response format from external API");
  }

  return {
    base: exchangeRate["1. From_Currency Code"],
    currency: exchangeRate["3. To_Currency Code"],
    rate: Number(exchangeRate["5. Exchange Rate"]),
    lastUpdate: new Date(exchangeRate["6. Last Refreshed"]),
  };
}

async function fetchAndTransformExternalData() {
  const url = buildExternalUrl();
  const { data } = await axios.get(url);
  const mapped = transformExternalPayload(data);

  const repository = getDataSource().getRepository("ExternalData");
  const saved = await repository.save(repository.create(mapped));

  return [saved];
}

module.exports = {
  fetchAndTransformExternalData,
  transformExternalPayload,
};