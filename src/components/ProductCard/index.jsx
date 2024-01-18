import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Flex, Space, Typography} from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { StyledCard } from '../StyledCard';
import { createPathWithId } from '../../helpers/URLHelper';
import styles from './index.module.scss';
import { APP_ROUTES } from '../../helpers/RoutesHelper';



const {Meta} = Card;

export const ProductCard = ({id, title, price, image, rightSpacing = false}) => {
    const paddingRight = useMemo(() => rightSpacing ? 16 : 0, [rightSpacing])
  return (
    <Link to={createPathWithId(APP_ROUTES.PRODUCT_DETAILS, id)} key={id} style={{display: 'block', width: 165 + paddingRight, paddingRight}}>
        <StyledCard cover={<img src={image} alt={title} style={{width: 165}}/>} >
            <Flex vertical gap='middle'>
                <Meta title={title} style={{width: '100%', textAlign: 'center'}}/>
                <Flex justify="space-between" align='center' style={{width: '100%'}}>
                    <Typography.Text style={{width: '50%'}}>{price}$</Typography.Text>
                    <HeartOutlined style={{fontSize: 24, color: '#f2cd00'}} className={styles.icon}/>
                    <ShoppingCartOutlined style={{fontSize: 24, color: '#f2cd00'}} className={styles.icon}/>
                </Flex>
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
    rightSpacing: PropTypes.bool
}