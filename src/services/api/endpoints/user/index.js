import api, {API_ENDPOINTS} from '../../api';

/**
* @typedef {Object} UserCreate
* @property {string} name
* @property {string} email
* @property {number} password
* @property {?string} avatar
*/

/**
* @typedef {Object} User
* @property {string} name
* @property {string} email
* @property {number} password
* @property {?string} avatar
* @property {string} role
* @property {number} id
*/

/**
 * @param {UserCreate} user
 * @return {Promise<User>}
 */
async function createUser(user) {
    const {data} = await api.post(API_ENDPOINTS.USER, user);
    return data;
}

/**
 * @param {string} email
 * @return {Promise<bool>}
 */
async function isEmailAvalable(email) {
    const {data} = await api.post(API_ENDPOINTS.USER + '/is-available', {email});
    return data?.isAvailable;
}


export {
    createUser,
    isEmailAvalable
};