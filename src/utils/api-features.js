class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.pagination = {};
  }

  select() {
    if (this.queryString.select) {
      const fields = this.queryString.select.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  populate() {
    if (this.queryString.populate) {
      const popOptions = this.queryString.populate.split(",").join(" ");

      this.query = this.query.populate(popOptions);
    }

    return this;
  }
}

module.exports = APIFeatures;
