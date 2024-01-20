const JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';

/**
* @typedef {Object} TokenSet
* @property {string} access_token
* @property {string} refresh_token
*/

/**
 * @return {TokenSet}
 */
function getJWTTokenSet() {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    return token ? JSON.parse(token) : null;
}

/**
 * @return {string}
 * @param {TokenSet} tokenSEt
 */
function setJWTTokenSet(tokenSet) {
    localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(tokenSet));
    return tokenSet;
}


/**
 * @return {string}
 * @param {string} token
 */
function deleteJWTTokenSet() {
    localStorage.removeItem(JWT_TOKEN_KEY);
}

export {getJWTTokenSet, setJWTTokenSet, deleteJWTTokenSet};
