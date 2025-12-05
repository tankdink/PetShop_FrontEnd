import axiosInstance from "./AxiosConfig";

//baseURL: 'http://localhost:8080'
const REST_API_BASE_URL_GETALL = '/user/getAllUserWithCase';
const REST_API_BASE_URL_GET_USER_BY_ID = '/user/getUserByID';
const REST_API_BASE_URL_GET_USER_BY_ID_LIKELY = '/user/getUserByIDLike';
const REST_API_BASE_URL_GET_USER_BY_EMAIL_LIKELY = '/user/getUserByEmailLike';
const REST_API_BASE_URL_GET_USER_BY_ROLE_NAME_LIKELY = '/user/getUserByRoleNameLike';
const REST_API_BASE_URL_REGISTER = '/user/register';
const REST_API_BASE_URL_ADD_USER = '/user/addUser';
const REST_API_BASE_URL_UPDATE_USER = '/user/updateUser';
const REST_API_BASE_URL_UPDATE_USER_PASSWORD = '/user/updateUserPassword';
const REST_API_BASE_URL_UPDATE_USER_ROLE = '/user/updateUserRole';
const REST_API_BASE_URL_DELETE_USER = '/user/deleteUser';
const REST_API_BASE_URL_DISABLE_USER = '/user/disable';


export const userList = (pageRequest) => axiosInstance.get(REST_API_BASE_URL_GETALL, { params: pageRequest});
export const register = (user) => axiosInstance.post(REST_API_BASE_URL_REGISTER, user);
export const addUser = (user) => axiosInstance.post(REST_API_BASE_URL_ADD_USER, user);
export const getUserById = (userId) => axiosInstance.get(REST_API_BASE_URL_GET_USER_BY_ID + '/' + userId);
export const getUserByIdLikely = (userId) => axiosInstance.get(REST_API_BASE_URL_GET_USER_BY_ID_LIKELY + '/' + userId);
export const getUserByEmailLikely = (email) => axiosInstance.get(REST_API_BASE_URL_GET_USER_BY_EMAIL_LIKELY + '/' + email);
export const getUserByRoleNameLikely = (roleName) => axiosInstance.get(REST_API_BASE_URL_GET_USER_BY_ROLE_NAME_LIKELY + '/' + roleName);
export const updateUser = (userId, user) => axiosInstance.put(REST_API_BASE_URL_UPDATE_USER + '/' + userId,user);
export const updateUserPassword = (userId, user) => axiosInstance.put(REST_API_BASE_URL_UPDATE_USER_PASSWORD + '/' + userId,user);
export const updateUserRole = (userId, role) => axiosInstance.put(REST_API_BASE_URL_UPDATE_USER_ROLE + '/' + userId,role);
export const deleteUserById = (userId) => axiosInstance.delete(REST_API_BASE_URL_DELETE_USER + '/' + userId);
export const disableUserById = (userId) => axiosInstance.put(REST_API_BASE_URL_DISABLE_USER + '/' + userId);