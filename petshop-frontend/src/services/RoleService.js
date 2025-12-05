import axiosInstance from "./AxiosConfig";

//baseURL: 'http://localhost:8080'
const REST_API_BASE_URL_GET_ROLE_SMALLER_EQUAL_ID = '/role/getRoleHasIdSmallerOrEqual';
const REST_API_BASE_URL_GET_ROLE_BY_NAME = '/role/getRoleByName';


export const gettedRoleList = (id) => axiosInstance.get(REST_API_BASE_URL_GET_ROLE_SMALLER_EQUAL_ID + '/' + id);
export const gettedRole = (name) => axiosInstance.get(REST_API_BASE_URL_GET_ROLE_BY_NAME + '/' + name);
