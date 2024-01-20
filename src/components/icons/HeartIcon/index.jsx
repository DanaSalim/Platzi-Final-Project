import { HeartOutlined} from '@ant-design/icons';

import styles from './index.module.scss';

export const HeartIcon = (props) => {
  return (
    <HeartOutlined {...props} className={styles.icon}/>
  )
}