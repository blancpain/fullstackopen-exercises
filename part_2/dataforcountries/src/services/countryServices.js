import axios from "axios";
const baseURLAll = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/name";

const get = (country) => {
  const request = axios.get(`${baseURL}/${country}`);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseURLAll);
  return request.then((response) => response.data);
};

export default { get, getAll };
