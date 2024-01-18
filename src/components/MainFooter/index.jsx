import { Flex, Layout } from 'antd';
import { Logo } from '../icons/Logo';

import styles from './index.module.scss';
import { useWindowSize } from '@uidotdev/usehooks';

const { Footer } = Layout;

export const MainFooter = () => {
  const {width} = useWindowSize();
  return (
    <Footer className={styles.footer}>
      <Flex align="center" justify={width < 768 ? 'center' : 'start'}>
        <Logo />
      </Flex>
    </Footer>
  );
};
