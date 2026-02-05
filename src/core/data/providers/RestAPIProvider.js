import httpClient from '../../http/HttpClient.js';
import { ErrorHandler } from '../../http/ErrorHandler.js';

class RestAPIProvider {
  constructor(config) {
    this.baseEndpoint = config.endpoint;
    this.http = httpClient;
  }

  async getAll(params = {}) {
    try {
      return await this.http.get(this.baseEndpoint, params);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getById(id) {
    try {
      return await this.http.get(`${this.baseEndpoint}/${id}`);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async create(data) {
    try {
      return await this.http.post(this.baseEndpoint, data);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async update(id, data) {
    try {
      return await this.http.put(`${this.baseEndpoint}/${id}`, data);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async delete(id) {
    try {
      return await this.http.delete(`${this.baseEndpoint}/${id}`);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async query(queryParams) {
    try {
      return await this.http.get(`${this.baseEndpoint}/query`, queryParams);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}

export default RestAPIProvider;