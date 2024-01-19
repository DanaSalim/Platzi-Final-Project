import { ShoppingCartOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export const CartIcon = ({filled, ...props}) => {
  return (
    <ShoppingCartOutlined {...props} className={styles.icon}/>
  )
}


CartIcon.propTypes = {
    filled: PropTypes.bool,
};
  