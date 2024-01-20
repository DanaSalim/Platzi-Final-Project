import { ShoppingCartOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export const CartIcon = (props) => {
  return (
    <ShoppingCartOutlined {...props} className={styles.icon}/>
  )
}
