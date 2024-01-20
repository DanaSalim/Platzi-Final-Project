import {Flex, Image, Spin, Typography} from 'antd';
import {useState, useEffect, useContext, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';

import { StyledCard } from '../../components/StyledCard';
import { getProductById } from '../../services/api/endpoints/products';
import styles from './index.module.scss';
import { HeartIcon } from '../../components/icons/HeartIcon';
import { CartIcon } from '../../components/icons/CartIcon';
import { AppContext } from '../../context/AppContext';
import { APP_ROUTES } from '../../helpers/RoutesHelper';
import { createPath } from '../../helpers/URLHelper';

export const ProductDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {width} = useWindowSize();
    const [product, setProduct] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const {isIdInCartProducts, isIdInFavoriteProducts, addIdToCartProducts, addIdToFavoriteProducts} = useContext(AppContext);
  
    const onClickCart = useCallback(() => {
        if(isIdInCartProducts(+id)){
            return navigate(createPath(APP_ROUTES.CART, false))
        }
      addIdToCartProducts(+id);
    }, [id, isIdInCartProducts, addIdToCartProducts, navigate]);
  
    const onClickHeart = useCallback(() => {
        if(isIdInFavoriteProducts(+id)){
            return navigate(createPath(APP_ROUTES.FAVORITE, false))
        }
      addIdToFavoriteProducts(+id);
    }, [id, isIdInFavoriteProducts, addIdToFavoriteProducts, navigate]);

    useEffect(() => {
        if(id === undefined){
            setIsValid(false);
            return;
        }

        getProductById(+id).then((product) => {
            setProduct(product);
        }).catch(e => setIsValid(false));
    }, [id])

  return <StyledCard className={styles.productDetails}>
    {
        !isValid && <Typography.Title level={1}>Произошла ошибка. Вернитесь назад и попробуйте снова.</Typography.Title>
    }
    {
        !!product &&
         (
            <StyledCard>
                <Flex  vertical={width < 1024} gap={70} justify='space-between' align='flex-start'>
                    <Image src={product.images[0]} rootClassName={styles.image}/>
                    <Flex vertical align='flex-start' gap='small' style={{textAlign: 'left'}}>
                        <Typography.Title level={1}>{product.title}</Typography.Title>
                        <Typography.Text>{product.description}</Typography.Text>
                        <Typography.Title level={3}>Категория:
                            <Typography.Text style={{fontSize: 18, marginLeft: 5}}>{product.category.name}</Typography.Text>
                        </Typography.Title>
                        <Typography.Title level={3}>Цена:
                            <Typography.Text style={{fontSize: 18, marginLeft: 5}}>{product.price}$</Typography.Text>
                        </Typography.Title>
                        <Flex justify='space-between' align='center' style={{width: 120, alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                            <HeartIcon onClick={onClickHeart} style={{fontSize: 48, color: isIdInFavoriteProducts(+id) ? '#f2cd00' : 'lightgrey'}}/>
                            <CartIcon onClick={onClickCart} style={{fontSize: 48, color: isIdInCartProducts(+id) ? '#f2cd00' : 'lightgrey'}}/>
                        </Flex>
                    </Flex>
                </Flex>
            </StyledCard>
         )
    }
    {
        !product && isValid && <Spin size='large' style={{margin: 'auto auto', width: '100%'}}/>
    }
  </StyledCard>;
};