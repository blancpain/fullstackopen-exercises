import axios from "axios";

const get = (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${
    import.meta.env.VITE_APIKEY
  }&units=metric`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { get };
