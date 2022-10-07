import axios from "axios";

const request = axios.create();

request.interceptors.response.use((res) => {
  const data = res.data;

  if (data.code !== 200) {
    console.error(data.message);
    return Promise.reject(data);
  }

  return data;
});

export { request };
