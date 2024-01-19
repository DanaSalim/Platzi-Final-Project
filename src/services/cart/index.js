const CART_PRODUCTS_IDS_KEY = 'CART_PRODUCTS_IDS';
const CART_PRODUCTS_QUANTITY_KEY = 'CART_PRODUCTS_QUANTITY';

/**
 * @return {Array<number>}
 */
function getCartProductsIds() {
    const cart = localStorage.getItem(CART_PRODUCTS_IDS_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * @return {Array<number>}
 * @param {number} id
 */
function addToCartProductsIds(id) {
    const cart = getCartProductsIds();
    cart.push(id);
    localStorage.setItem(CART_PRODUCTS_IDS_KEY, JSON.stringify(cart));
    incrementCartProductQuantity(id);
    return cart;
}

/**
 * @return {boolean}
 * @param {number} id
 */
function isProductIdInCart(id) {
    const cart = getCartProductsIds();
    return cart.includes(id);
}

/**
 * @return {Array<number>}
 * @param {number} id
 */
function deleteProductIdFromCart(id) {
    const cart = getCartProductsIds().filter(productId => productId !== id);
    localStorage.setItem(CART_PRODUCTS_IDS_KEY, JSON.stringify(cart));
    deleteCartProductQuantity(id);
    return cart;
}

/**
 * @return {Object<number, number>}
 */
function getCartProductsQuantityMap() {
    const cart = localStorage.getItem(CART_PRODUCTS_QUANTITY_KEY);
    return cart ? JSON.parse(cart) : {};
}

/**
 * @return {number}
 * @param {number} id
 */
function getCartProductQuantity(id) {
    const quantityMap = getCartProductsQuantityMap();
    return quantityMap[id] ?? 0;
}

/**
 * @return {Object<number, number>}
 * @param {number} id
 */
function incrementCartProductQuantity(id) {
    const quantityMap = getCartProductsQuantityMap();

    if(quantityMap[id] !== undefined) {
        quantityMap[id]++;
    }

    if(quantityMap[id] === undefined) {
        quantityMap[id] = 1;
    }
    localStorage.setItem(CART_PRODUCTS_QUANTITY_KEY, JSON.stringify(quantityMap));
    return quantityMap;
}

/**
 * @return {Object<number, number>}
 * @param {number} id
 */
function decrementCartProductQuantity(id) {
    const quantityMap = getCartProductsQuantityMap();

    if(quantityMap[id] === 1){
        deleteProductIdFromCart(id);
        return deleteCartProductQuantity(id);
    }
    if(quantityMap[id] === undefined) {
        return quantityMap;
    }
    quantityMap[id]--;
    localStorage.setItem(CART_PRODUCTS_QUANTITY_KEY, JSON.stringify(quantityMap));
    return quantityMap;
}

/**
 * @return {Object<number, number>}
 * @param {number} id
 */
function deleteCartProductQuantity(id) {
    const quantityMap = getCartProductsQuantityMap();

    if(quantityMap[id] !== undefined){
        delete quantityMap[id];
    }
    localStorage.setItem(CART_PRODUCTS_QUANTITY_KEY, JSON.stringify(quantityMap));
    return quantityMap;
}

export {
    addToCartProductsIds,
    getCartProductsIds,
    isProductIdInCart,
    deleteProductIdFromCart,
    getCartProductsQuantityMap,
    getCartProductQuantity,
    incrementCartProductQuantity,
    decrementCartProductQuantity,
    deleteCartProductQuantity
};