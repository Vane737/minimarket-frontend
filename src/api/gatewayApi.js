import axios from "axios";


const api = axios.create({
    baseURL: "........",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const convertToJSONString = (obj) => {
    return JSON.stringify(obj);
  }

  export default api;