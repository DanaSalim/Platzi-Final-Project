import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { MainHeader} from '../components/MainHeader';
import { MainFooter} from '../components/MainFooter';
import styles from './index.module.scss';

const { Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout rootClassName={styles.layout}>
        <MainHeader/>
        <Content className={styles.content}><Outlet/></Content>
        <MainFooter/>
    </Layout>
  )
}
