import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

class Api {
  BASE_URL = "";
  api = null;

  /**
   *
   * @param options
   */
  constructor(options) {
    this.BASE_URL = options.BASE_URL;
    this.api = this.getInstance();
  }

  /**
   *
   * @returns { AxiosInstance }
   */
  getInstance() {
    return axios.create({
      baseURL: this.BASE_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
}

export default new Api({ BASE_URL }).api;
