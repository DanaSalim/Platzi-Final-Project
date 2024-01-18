import { Button, Flex, Layout, Menu, Popover, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { APP_ROUTES } from '../../helpers/RoutesHelper';
import { Logo } from '../icons/Logo';
import styles from './index.module.scss';
import { HeartOutlined, MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';

const { Header } = Layout;

const navItems = [
    {key: APP_ROUTES.HOME, label: <Link to={APP_ROUTES.HOME}>Главная</Link>},
    {key: APP_ROUTES.CATALOG, label: <Link to={APP_ROUTES.CATALOG}>Каталог</Link>},
    {key: APP_ROUTES.ABOUT, label: <Link to={APP_ROUTES.ABOUT}>О нас</Link>},
    {key: APP_ROUTES.CONTACTS, label: <Link to={APP_ROUTES.CONTACTS}>Контакты</Link>},
];

export const MainHeader = () => {
    const {pathname} = useLocation();
    const currentKey = useMemo(() => navItems.map(item => item.key).find(key => {
        if(key === APP_ROUTES.HOME){
            return pathname === '/';
        }
        console.log(key.length, pathname,pathname.slice(1).includes(key))

        return pathname.includes(key);
    }), [pathname]);
    const {width} = useWindowSize();
    const [navOpen, setNavOpen] = useState(false);

    const hideNav = () => {
      setNavOpen(false);
    };
  
    const handleNavOpenChange = (newOpen) => {
      setNavOpen(newOpen);
    };

    return (
    <Header className={styles.header}>
        <Flex gap='large' align='center' justify='space-between' style={{width: '100%'}}>
           <Link to={APP_ROUTES.HOME} style={{height: 72}}> <Flex gap="middle" align="center">
            {
                width < 720 && 
                <Popover
                  content={<Menu mode="vertical" items={navItems} selectedKeys={[currentKey]}  style={{width: 340, marginRight: 'auto'}}/>}
                  trigger="click"
                  open={navOpen}
                  onOpenChange={handleNavOpenChange}
               >
                <Button type="primary"><MenuOutlined  type='primary'/></Button>
             </Popover>
               }
              <Logo className={styles.logoIcon} />
              {
                width > 960
                && <Typography.Title type="primary" level={2} className={styles.logoText}>
                Diverse Market
              </Typography.Title>
              }
            </Flex></Link>
            {
                width > 720 &&
                <Menu mode="horizontal" items={navItems} selectedKeys={[currentKey]}  style={{width: 340, marginRight: 'auto'}}/>
            }
            <Flex gap="large" align="center">
                <Link to={APP_ROUTES.FAVORITES} style={{height: 50}}>
                    <HeartOutlined style={{fontSize: 32, color: '#f2cd00'}} className={styles.icon}/>
                </Link>
                <Link to={APP_ROUTES.CART} style={{height: 50}}>
                    <ShoppingCartOutlined style={{fontSize: 32, color: '#f2cd00'}} className={styles.icon}/>
                </Link>
            </Flex>
        </Flex>
    </Header>
  );
};
