/* eslint-disable @typescript-eslint/no-explicit-any */
import * as axios from "axios";

const baseURL = "http://192.168.43.41:3050";

const axiosInstance = axios.default?.create({
  baseURL: baseURL+"/bkapi", 
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("x-toks"),
  },
});

axiosInstance.interceptors.request.use(async (req: any) => {
  try {
    const accessToken = localStorage.getItem("x-toks");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  } catch (error) {
    // console.log('request: ', error.response.status)
    return Promise.reject(error);
  }
});


export default axiosInstance;
