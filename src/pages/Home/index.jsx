import { Card, Carousel, Flex, Spin, Typography } from 'antd';
import { Logo } from '../../components/icons/Logo';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/api/endpoints/categories';
import { StyledCard } from '../../components/StyledCard';
import { CategoryCard } from './CategoryCard';
import { getAllProducts } from '../../services/api/endpoints/products';
import { ProductCard } from '../../components/ProductCard';

const {Meta} = Card;

const  CATEGORY_LIMIT = 10;
const  TOP_PRODUCTS_LIMIT = 20;

export const Home = () => {
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllCategories({limit: CATEGORY_LIMIT}).then((categories) => {
            setCategories(categories);
            setCategoriesLoaded(true);
        });
        getAllProducts({limit: TOP_PRODUCTS_LIMIT}).then((products) => {
            console.log('products: ', products)
            setProducts(products);
            setProductsLoaded(true);
        });
    }, []);

  return <Flex vertical gap={20} className={styles.home}>
    <StyledCard>
        <Logo className={styles.blockLogo} width={260} height={126}/>
        <Meta title="Добро пожаловать в наш магазин!" description="Мы гордимся тем, что предлагаем широкий ассортимент товаров высочайшего качества в различных категориях. Независимо от того, что вы ищете — модную одежду, электронику последнего поколения или предметы интерьера, у нас вы обязательно найдёте то, что вас заинтересует. Разнообразие наших товаров сочетается с безупречным качеством, чтобы удовлетворить самые изысканные вкусы. Добро пожаловать в мир качественных покупок!" style={{width: '100%'}}/>
    </StyledCard>
    <StyledCard>
        <iframe className={styles.video} width="560" height="315" src="https://www.youtube.com/embed/nxSDHBdsWqA?si=yibVRasZ4deModBP" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
        <Meta title="Специальные предложения для вас!" description="Откройте для себя удивительные акции и специальные предложения в нашем магазине-маркетплейсе. Независимо от того, что вы ищете, у нас всегда есть выгодные предложения по широкому ассортименту товаров. Экономьте на покупках и получайте больше за свои деньги — у нас всегда найдется что-то особенное для каждого." style={{width: '100%'}}/>
    </StyledCard>
    <StyledCard>
        <Typography.Title level={2} style={{textAlign: 'center', marginBottom: 32}}>Категории</Typography.Title>
        <Flex align='stretch' justify='space-around' wrap='wrap' gap={10}>
            {
                !categoriesLoaded ? <Spin size='large' style={{margin: '0 auto'}}/>
                    :
                    categories.map(({id, name, image}) => <CategoryCard key={id} id={id} name={name} image={image}/>)
            }
        </Flex>
    </StyledCard>
    <StyledCard>
        <Typography.Title level={6} style={{textAlign: 'center', marginBottom: 32}}>Лучшие товары</Typography.Title>
        <Carousel rootClassName={styles.carousel} responsive={[]} variableWidth swipeToSlide draggable dotPosition='-4px' dots={{className: styles.dots}} style={{paddingBottom: 20}}>
            {
                !productsLoaded ? <Spin size='large' style={{margin: '0 auto', width: '100%', padding: 10}}/>
                    :
                    products.map(({id, title, price, images}) => <ProductCard key={id} id={id} title={title} price={price} image={images[0]} rightSpacing/>)
            }
        </Carousel>
    </StyledCard>
  </Flex>
};
