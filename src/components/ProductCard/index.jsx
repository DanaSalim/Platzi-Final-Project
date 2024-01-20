import { useMemo, useContext, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Flex, Typography, Button} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { StyledCard } from '../StyledCard';
import { createPath, createPathWithId } from '../../helpers/URLHelper';
import { APP_ROUTES } from '../../helpers/RoutesHelper';
import { CartIcon } from '../icons/CartIcon';
import { HeartIcon } from '../icons/HeartIcon';
import { AppContext } from '../../context/AppContext';



const {Meta} = Card;

export const ProductCard = ({id, title, price, image, rightSpacing = false, canRemoveFromFavorites=false, canRemoveFromCart=false, showCartQuantityControls} = false) => {
  const navigate = useNavigate();
  const {isIdInCartProducts, isIdInFavoriteProducts, addIdToCartProducts, getProductCartQuantity, incrementProductCartQuantity, decrementProductCartQuantity,
     addIdToFavoriteProducts, removeIdFromCartProducts, removeIdFromFavoriteProducts} = useContext(AppContext);
  const paddingRight = useMemo(() => rightSpacing ? 16 : 0, [rightSpacing])
  
  const onClickCart = useCallback((e) => {
    e.preventDefault();

    if(isIdInCartProducts(id) && canRemoveFromCart){
        return removeIdFromCartProducts(id);
    }

    if(isIdInCartProducts(id)){
        return navigate(createPath(APP_ROUTES.CART, false))
    }
    addIdToCartProducts(id);
  }, [id, isIdInCartProducts, addIdToCartProducts, canRemoveFromCart, removeIdFromCartProducts, navigate]);

  const onClickHeart = useCallback((e) => {
    e.preventDefault();

    if(isIdInFavoriteProducts(id) && canRemoveFromFavorites){
        return removeIdFromFavoriteProducts(id);
    }
    
    if(isIdInFavoriteProducts(id)){
        return navigate(createPath(APP_ROUTES.FAVORITE, false))
    }
    addIdToFavoriteProducts(id);
  }, [id, isIdInFavoriteProducts, addIdToFavoriteProducts, canRemoveFromFavorites, removeIdFromFavoriteProducts, navigate]);

  const onClickIncrement = useCallback((e) => {
    e.preventDefault();
    incrementProductCartQuantity(id);
  }, [id, incrementProductCartQuantity]);

  const onClickDecrement = useCallback((e) => {
    e.preventDefault();
    decrementProductCartQuantity(id);
  }, [id, decrementProductCartQuantity]);

  return (
    <Link to={createPathWithId(APP_ROUTES.PRODUCT_DETAILS, id, false)} key={id} style={{display: 'block', width: 165 + paddingRight, paddingRight}}>
        <StyledCard cover={<img src={image} alt={title} style={{width: 165, height: 165}}/>} >
            <Flex vertical gap='middle'>
                <Meta title={title} style={{width: '100%', textAlign: 'center'}}/>
                <Flex justify='space-between' align='center' style={{width: '100%'}}>
                    <Typography.Text style={{width: '50%'}}>{price}$</Typography.Text>
                    <HeartIcon onClick={onClickHeart} style={{fontSize: 24, marginRight: 12, color: isIdInFavoriteProducts(id) ? '#f2cd00' : 'lightgrey'}}/>
                    <CartIcon onClick={onClickCart} style={{fontSize: 24, color: isIdInCartProducts(id) ? '#f2cd00' : 'lightgrey'}}/>
                </Flex>
                {
                    showCartQuantityControls &&
                    <>
                        <Flex justify='space-between' align='center' style={{width: '100%'}}>
                            <PlusOutlined onClick={onClickIncrement} style={{fontSize: 24}}/>
                            <Typography.Text>{getProductCartQuantity(id)}</Typography.Text>
                            <MinusOutlined onClick={onClickDecrement} style={{fontSize: 24}}/>
                        </Flex>
                        <Button onClick={(e) => {e.preventDefault(); navigate(createPath(APP_ROUTES.BUY, false));}}>Купить</Button>
                    </>
                }
            </Flex>
        </StyledCard>
    </Link>
  )
}

ProductCard.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    rightSpacing: PropTypes.bool,
    canRemoveFromCart: PropTypes.bool,
    showCartQuantityControls: PropTypes.bool,
    canRemoveFromFavorites: PropTypes.bool
}