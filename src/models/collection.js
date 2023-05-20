'use strict';

//define the collections class 
class Collection {
  constructor(model) {
    this.model = model;
  }

  //creates new records 
  async create(data) {
    try {
      let records = await this.model.create(data);
      return records;

    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //retrieves records on givem params (if provided)
  async find(params) {
    try {
      if (params) {
        let record = await this.model.findAll({ where: { id: params } });
        return record;
      } else {
        let records = await this.model.findAll();
        return records;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //update records
  async update(data, params) {
    try {
      let record = await this.model.update(data, { where: { id: params } });
      return record;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //delete records
  async delete(params) {
    try {
      let record = await this.model.destroy({ where: { id: params } });
      return record;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
module.exports = Collection;