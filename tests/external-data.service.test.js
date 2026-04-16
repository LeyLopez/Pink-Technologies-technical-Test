const { transformExternalPayload } = require("../src/services/external-data.service");

describe("transformExternalPayload", () => {
  it("should map Alpha Vantage payload to internal format", () => {
    const payload = {
      "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "USD",
        "3. To_Currency Code": "COP",
        "5. Exchange Rate": "3988.120000",
        "6. Last Refreshed": "2026-04-16 14:40:01",
      },
    };

    const result = transformExternalPayload(payload);

    expect(result.base).toBe("USD");
    expect(result.currency).toBe("COP");
    expect(result.rate).toBe(3988.12);
    expect(result.lastUpdate).toBeInstanceOf(Date);
  });

  it("should throw when payload format is invalid", () => {
    expect(() => transformExternalPayload({})).toThrow(
      "Unexpected response format from external API"
    );
  });
});