class ExternalDataEntity {
  constructor({ base, currency, rate, lastUpdate }) {
    this.base = base;
    this.currency = currency;
    this.rate = rate;
    this.lastUpdate = lastUpdate;
  }
}

module.exports = ExternalDataEntity;