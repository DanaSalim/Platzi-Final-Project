import { Flex, Spin, Typography} from 'antd';
import { useEffect, useState, useContext } from 'react';

import { StyledCard } from '../../components/StyledCard';
import { ProductCard } from '../../components/ProductCard';
import { AppContext } from '../../context/AppContext';
import { getProductById } from '../../services/api/endpoints/products';
import styles from './index.module.scss';

export const Cart = () => {
    const {cartProductsIds} = useContext(AppContext);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsPromises = cartProductsIds.map(id => getProductById(id));
        setProductsLoaded(false);
        Promise.all(productsPromises).then(results => {
            setProductsLoaded(true);
            setProducts(results.filter(res => res?.id));
        });
    }, [cartProductsIds]);

return <Flex vertical gap={20} className={styles.favorite}>
    <StyledCard>
        <Flex align='stretch' justify='space-around' wrap='wrap' gap={10} style={{minHeight: 500}}>
            {
                !productsLoaded ? <Spin size='large' style={{margin: 'auto auto'}}/>
                    :
                    products.map(({id, title, price, images}) => <ProductCard key={id} id={id} title={title} price={price} image={images[0]} canRemoveFromCart canRemoveFromFavorites showCartQuantityControls/>)
            }
            {
                productsLoaded && products.length === 0 && <Typography.Title>Корзина пуста</Typography.Title>
            }
        </Flex>
    </StyledCard>
  </Flex>;
};
