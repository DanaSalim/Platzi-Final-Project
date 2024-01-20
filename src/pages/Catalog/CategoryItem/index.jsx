import { Typography, Button} from 'antd';
import PropTypes from 'prop-types';

export const CategoryItem = ({name, onClick, current}) => <Button type={current ? 'dashed' : 'default'} onClick={onClick}><Typography.Title level={5} >{name}</Typography.Title></Button>;

CategoryItem.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    current: PropTypes.bool
}