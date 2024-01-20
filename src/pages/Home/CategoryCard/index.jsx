import { Link } from 'react-router-dom'
import { Card} from 'antd';
import PropTypes from 'prop-types';

import { StyledCard } from '../../../components/StyledCard'
import { APP_ROUTES } from '../../../helpers/RoutesHelper';
import { createPathWithParams } from '../../../helpers/URLHelper';


const {Meta} = Card;

export const CategoryCard = ({id, name, image}) => {
    
  return (
    <Link to={createPathWithParams(APP_ROUTES.CATALOG, {categoryId: id})} key={id}>
        <StyledCard cover={<img src={image} alt={name} style={{minWidth: 165, height: 165}}/>} >
            <Meta title={name} style={{width: '100%', textAlign: 'center'}}/>
        </StyledCard>
    </Link>
  )
}

CategoryCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string
}