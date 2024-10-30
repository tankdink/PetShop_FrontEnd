import axios from "axios";
import axiosInstance from "./AxiosConfig";

const REST_API_BASE_URL_AUTHENTICATION = 'http://localhost:8080/authen/login';
const REST_API_BASE_URL_GET_LOGGEDIN_INFO = 'http://localhost:8080/authen/loggedIn-data';


export const authentication = (userInfo) => axios.post(REST_API_BASE_URL_AUTHENTICATION,userInfo, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loggedInData = () => axiosInstance.get(REST_API_BASE_URL_GET_LOGGEDIN_INFO);