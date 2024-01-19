const FAVORITE_PRODUCTS_IDS_KEY = 'FAVORITE_PRODUCTS_IDS';

/**
 * @return {Array<number>}
 */
function getFavoriteProductsIds() {
    const favorite = localStorage.getItem(FAVORITE_PRODUCTS_IDS_KEY);
    return favorite ? JSON.parse(favorite) : [];
}

/**
 * @return {Array<number>}
 * @param {number} id
 */
function addToFavoriteProductsIds(id) {
    const favorite = getFavoriteProductsIds();
    favorite.push(id);
    localStorage.setItem(FAVORITE_PRODUCTS_IDS_KEY, JSON.stringify(favorite));
    return favorite;
}

/**
 * @return {boolean}
 * @param {number} id
 */
function isProductIdInFavorite(id) {
    const favorite = getFavoriteProductsIds();
    return favorite.includes(id);
}

/**
 * @return {Array<number>}
 * @param {number} id
 */
function deleteProductIdFromFavorite(id) {
    const favorite = getFavoriteProductsIds().filter(productId => productId !== id);
    localStorage.setItem(FAVORITE_PRODUCTS_IDS_KEY, JSON.stringify(favorite));
    return favorite;
}

export {
    getFavoriteProductsIds,
    addToFavoriteProductsIds,
    isProductIdInFavorite,
    deleteProductIdFromFavorite
};