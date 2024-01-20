import api, {API_ENDPOINTS} from '../../api';
import { createPathWithParams } from '../../../../helpers/URLHelper';

/**
* @typedef {Object} Login
* @property {string} email
* @property {number} password
*/

/**
 * @param {Login} credentials
 * @return {Promise<TokenSet>}
 */
async function login(credentials) {
    const {data} = await api.post(API_ENDPOINTS.AUTH + '/login', credentials);
    return data;
}

/**
 * @param {string} refreshToken
 * @return {Promise<TokenSet>}
 */
async function refreshToken(refreshToken) {
    const {data} = await api.post(API_ENDPOINTS.AUTH + '/refresh-token', {refreshToken});
    return data;
}

export {
    login,
    refreshToken
};