import { Card } from 'antd'
import PropTypes from 'prop-types';

export const StyledCard = ({style = {}, ...props}) => {
  return (
    <Card {...props} style={{...style, borderRadius: 16, boxShadow: 'lightgrey 2px 2px 3px'}}>{props.children}</Card>
  )
}


StyledCard.propTypes = {
    children: PropTypes.object,
    style: PropTypes.object
};
  