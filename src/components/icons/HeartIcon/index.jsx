import { HeartOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export const HeartIcon = ({filled, ...props}) => {
  return (
    <HeartOutlined {...props} className={styles.icon}/>
  )
}


HeartIcon.propTypes = {
    filled: PropTypes.bool,
};
  