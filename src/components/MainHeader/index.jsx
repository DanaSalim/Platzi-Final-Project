import { Flex, Layout, Typography } from 'antd';

import { Logo } from '../icons/Logo';
import styles from './index.module.scss';

const { Header } = Layout;

export const MainHeader = () => {
  return (
    <Header>
      <Flex gap="middle" align="center">
        <Logo className={styles.logoIcon} />
        <Typography.Title type="primary" level={2} className={styles.logoText}>
          Diverse Market
        </Typography.Title>
      </Flex>
    </Header>
  );
};
