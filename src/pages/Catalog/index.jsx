import { Flex, Input, Spin} from 'antd';
import { useEffect, useState, useMemo } from 'react';
import {useSearchParams} from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';

import { getAllCategories } from '../../services/api/endpoints/categories';
import { getAllProducts } from '../../services/api/endpoints/products';
import { StyledCard } from '../../components/StyledCard';
import { ProductCard } from '../../components/ProductCard';
import { CategoryItem } from './CategoryItem';
import styles from './index.module.scss';

const {Search} = Input;

export const Catalog = () => {
    const {width} = useWindowSize();
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const  categoryId = useMemo(() => searchParams.has('categoryId') ? +searchParams.get('categoryId') : categories[0]?.id,[searchParams, categories])
    const flexWrap = useMemo(() => width < 1050 ? 'wrap' : 'nowrap', [width]);
    
    useEffect(() => {
        getAllCategories().then((categories) => {
            setCategories(categories);
        });
    }, [])

    useEffect(() => {
        const productsQuery = {};

        if(Number.isInteger(categoryId)){
           productsQuery.categoryId = categoryId;
        }

        if(search.length){
            productsQuery.title = search;
        }

        getAllProducts(productsQuery).then((products) => {
            setProducts(products);
            setProductsLoaded(true);
        });

    }, [categoryId, search]);

return <Flex vertical gap={20} className={styles.catalog}>
    <StyledCard>
        <Flex justify='space-between' gap='large' wrap={flexWrap}>
            <Flex justify='flex-start' gap={10} wrap={flexWrap}>
                {categories.map(({id, name}) => <CategoryItem key={id} current={id === categoryId} id={id} name={name} onClick={() => {searchParams.append('categoryId', id); setSearchParams(Object.fromEntries(searchParams));}}/>)}
            </Flex>
            <Search placeholder='Поиск' onSearch={setSearch} loading={!productsLoaded}/>
        </Flex>
    </StyledCard>
    <StyledCard>
        <Flex align='stretch' justify='space-around' wrap='wrap' gap={10} style={{minHeight: 500}}>
            {
                !productsLoaded ? <Spin size='large' style={{margin: 'auto auto'}}/>
                    :
                    products.map(({id, name, image}) => products.map(({id, title, price, images}) => <ProductCard key={id} id={id} title={title} price={price} image={images[0]} />))
            }
        </Flex>
    </StyledCard>
  </Flex>;
};
