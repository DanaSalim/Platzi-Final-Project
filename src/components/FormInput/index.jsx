import {Flex, Input, Typography} from 'antd';
import PropTypes from 'prop-types';

export const FormInput = ({errorText, ...props}) => {
  return (
    <Flex vertical align='flex-end' gap={3}>
        <Input {...props}/>
        {errorText && <Typography.Text type='danger'>{errorText}</Typography.Text>}
    </Flex>
  )
}

FormInput.propTypes = {
    errorText: PropTypes.string, 
}