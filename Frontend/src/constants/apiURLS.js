
const baseURL = "http://localhost:3000/api/v1/";

const loginAPI = baseURL + "users/login";
const registerAPI = baseURL + "users/register"
const isUserLoggedInAPI = baseURL + "users/isUserLoggedIn"
const logoutAPI = baseURL + "users/logout"
const contactAPI = baseURL + "contact/postcontact"
const getServicesAPI = baseURL + "services/getservices"
const getAllUsersAPI = baseURL + "admin/allusers"

const getUserByIdAPI = baseURL + "admin/getuserbyid"
// const getUserByIdAPI = baseURL + "admin/getuserbyid/:userId"
const editUserAPI = baseURL + "admin/edituser"
// const editUserAPI = baseURL + "admin/edituser/:userId"
const deleteUserAPI = baseURL + "admin/deleteuser";
// const deleteUser = baseURL + "admin/deleteuser/:userId";

const getAllContactsAPI = baseURL + "admin/allcontacts"  

const deleteContactAPI = baseURL + "admin/deletecontact"  
// const deleteContactAPI = baseURL + "admin/deletecontact/:contactId"  



export {
    registerAPI,
    loginAPI,
    isUserLoggedInAPI,
    logoutAPI,
    contactAPI,
    getServicesAPI,
    getAllUsersAPI,
    getUserByIdAPI,
    editUserAPI,
    deleteUserAPI,
    getAllContactsAPI,
    deleteContactAPI,
}