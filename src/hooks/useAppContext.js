import {useState, useCallback} from 'react';
import {getCartProductsIds, isProductIdInCart, deleteProductIdFromCart, addToCartProductsIds, getCartProductsQuantityMap, deleteCartProductQuantity, incrementCartProductQuantity, decrementCartProductQuantity} from '../services/cart';
import {getFavoriteProductsIds, isProductIdInFavorite, deleteProductIdFromFavorite, addToFavoriteProductsIds} from '../services/favorite';

/**
 * Реактивный слой для сервисов: cart, favorite.
 */
export default function useAppContext() {
    const [cartProductsIds, setCartProductsIds] = useState(getCartProductsIds());
    const [productsCartQuantityMap, setProdactsCartQuantityMap] = useState(getCartProductsQuantityMap());
    const [favoriteProductsIds, setFavoriteProductsIds] = useState(getFavoriteProductsIds());

    const removeIdFromCartProducts = useCallback((id) => {
        deleteCartProductQuantity(id);
        deleteProductIdFromCart(id);
        setCartProductsIds(cart => cart.filter(productId => productId !== id));
    }, []);
    const getProductCartQuantity = useCallback((id) => productsCartQuantityMap[id] ?? 0, [productsCartQuantityMap]);
    const removeCartProductQuantity = useCallback((id) => {
        deleteCartProductQuantity(id);
        removeIdFromCartProducts(id);
        setProdactsCartQuantityMap(quantityMap => {
            const newQuantityMap = {...quantityMap};
            delete newQuantityMap[id];
            return newQuantityMap;
        });
    }, [removeIdFromCartProducts]);
    const incrementProductCartQuantity = useCallback((id) => {
        incrementCartProductQuantity(id);
        setProdactsCartQuantityMap(quantityMap => {
            const newQuantityMap = {...quantityMap};

            if(newQuantityMap[id] !== undefined) {
                newQuantityMap[id]++;
            }
        
            if(newQuantityMap[id] === undefined) {
                newQuantityMap[id] = 1;
            }
            return newQuantityMap;
        });
    }, []);
    const decrementProductCartQuantity = useCallback((id) => {
        if(productsCartQuantityMap[id] === 1){
            return removeCartProductQuantity(id);
        }
        decrementCartProductQuantity(id);
        setProdactsCartQuantityMap(quantityMap => {
            const newQuantityMap = {...quantityMap};

            if(newQuantityMap[id] === undefined) {
                return newQuantityMap;
            }
            newQuantityMap[id]--;
            return newQuantityMap;
        });
    }, [removeCartProductQuantity,  productsCartQuantityMap]);

    const addIdToCartProducts = useCallback((id) => {
        addToCartProductsIds(id);
        incrementProductCartQuantity(id);
        setCartProductsIds(cart => [...cart, id]);
    }, [incrementProductCartQuantity]);
    const isIdInCartProducts = useCallback((id) => isProductIdInCart(id), []);

    const addIdToFavoriteProducts = useCallback((id) => {
        addToFavoriteProductsIds(id);
        setFavoriteProductsIds(favorite => [...favorite, id]);
    }, []);
    const isIdInFavoriteProducts = useCallback((id) => isProductIdInFavorite(id), []);
    const removeIdFromFavoriteProducts = useCallback((id) => {
        deleteProductIdFromFavorite(id);
        setFavoriteProductsIds(favorite => favorite.filter(productId => productId !== id));
    }, []);
    
    return {
        cartProductsIds,
        productsCartQuantityMap,
        favoriteProductsIds,
        addIdToCartProducts,
        isIdInCartProducts,
        removeIdFromCartProducts,
        getProductCartQuantity,
        incrementProductCartQuantity,
        decrementProductCartQuantity,
        removeCartProductQuantity,
        addIdToFavoriteProducts,
        isIdInFavoriteProducts,
        removeIdFromFavoriteProducts,
    }
}