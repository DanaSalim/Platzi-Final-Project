import { Flex, Layout } from 'antd';
import { Logo } from '../icons/Logo';

import styles from './index.module.scss';

const { Footer } = Layout;

export const MainFooter = () => {
  return (
    <Footer className={styles.footer}>
      <Flex gap="middle" align="center">
        <Logo />
      </Flex>
    </Footer>
  );
};
