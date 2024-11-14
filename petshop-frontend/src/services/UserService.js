import axiosInstance from "./AxiosConfig";

//baseURL: 'http://localhost:8080'
const REST_API_BASE_URL_GETALL = '/user/getAllUser';
const REST_API_BASE_URL_GET_USER_BY_ID = '/user/getUserByID';
const REST_API_BASE_URL_ADD_USER = '/user/addUser';
const REST_API_BASE_URL_UPDATE_USER = '/user/updateUser';
const REST_API_BASE_URL_UPDATE_USER_PASSWORD = '/user/updateUserPassword';
const REST_API_BASE_URL_DELETE_USER = '/user/deleteUser';


export const userList = () => axiosInstance.get(REST_API_BASE_URL_GETALL);
export const addUser = (user) => axiosInstance.post(REST_API_BASE_URL_ADD_USER, user);
export const getUserById = (userId) => axiosInstance.get(REST_API_BASE_URL_GET_USER_BY_ID + '/' + userId);
export const updateUser = (userId, user) => axiosInstance.put(REST_API_BASE_URL_UPDATE_USER + '/' + userId,user);
export const updateUserPassword = (userId, user) => axiosInstance.put(REST_API_BASE_URL_UPDATE_USER_PASSWORD + '/' + userId,user);
export const deleteUserById = (userId) => axiosInstance.delete(REST_API_BASE_URL_DELETE_USER + '/' + userId);