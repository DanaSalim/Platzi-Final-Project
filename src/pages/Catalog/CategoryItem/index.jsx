import React from 'react'
import { Typography, Button} from 'antd';
import PropTypes from 'prop-types';

export const CategoryItem = ({id, name, onClick, current}) => <Button type={current ? 'dashed' : 'default'} onClick={onClick}><Typography.Title level={5} >{name}</Typography.Title></Button>;

CategoryItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    onClick: PropTypes.func,
    current: PropTypes.bool
}