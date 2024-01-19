import {createContext} from 'react';

export const AppContext = createContext({
    cartProductsIds: [],
    cartProductsQuantityMap: {},
    favoriteProductsIds: [],
    addIdToCartProducts: () => {},
    isIdInCartProducts: () => {},
    removeIdFromCartProducts: () => {},
    getCartProductsQuantityMap: () => {},
    getCartProductQuantity: () => {},
    incrementCartProductQuantity: () => {},
    decrementCartProductQuantity: () => {},
    deleteCartProductQuantity: () => {},
    addIdToFavoriteProducts: () => {},
    isIdInFavoriteProducts: () => {},
    removeIdFromFavoriteProducts: () => {},
});