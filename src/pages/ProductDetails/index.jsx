import {Flex, Image, Spin, Typography} from 'antd';
import {useState, useEffect} from 'react';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';

import { StyledCard } from '../../components/StyledCard';
import { getProductById } from '../../services/api/endpoints/products';
import styles from './index.module.scss';

export const ProductDetails = () => {
    const {id} = useParams();
    const {width} = useWindowSize();
    const [product, setProduct] = useState(null);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if(id === undefined){
            setIsValid(false);
            return;
        }

        getProductById(id).then((product) => {
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
                        <Flex justify="space-between" align='center' style={{width: 120, alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                            <HeartOutlined style={{fontSize: 48, color: '#f2cd00'}} className={styles.icon}/>
                            <ShoppingCartOutlined style={{fontSize: 48, color: '#f2cd00'}} className={styles.icon}/>
                        </Flex>
                    </Flex>
                </Flex>
            </StyledCard>
         )
    }
    {
        !product && isValid && <Spin size='large' style={{margin: 'auto auto'}}/>
    }
  </StyledCard>;
};