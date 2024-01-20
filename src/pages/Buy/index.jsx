import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { Flex, Button, Typography} from 'antd';
import { Formik, Form } from 'formik'
import * as yup from 'yup';

import { StyledCard } from '../../components/StyledCard';
import styles from './index.module.scss';
import { FormInput } from '../../components/FormInput';
import { createPath } from '../../helpers/URLHelper';
import { APP_ROUTES } from '../../helpers/RoutesHelper';

const validationSchema = yup.object({
    name: yup.string('Значение должно быть строкой.').required('Необходимо указать ФИО'),
    email: yup.string('Значение должно быть строкой.').email('Значение должны быть адресом электронной почты.').required('Необходимо указать адрес электронной почты'),
    password: yup.string('Значение должно быть строкой.').min(4, 'Пароль должен состоять минимум из 4 символов.').required('Необходимо указать пароль'),
    address: yup.string('Значение должно быть строкой.').required('Необходимо указать адрес'),
    creditCardNumber: yup.number('Значение должно быть числом.').required('Необходимо указать номер кредитной карты.')
});

const getErrorText = (name, errors, touched) => (touched[name] && errors[name]) ? errors[name] : '';
const getInitialValues = () => ({
    name: '',
    email: '',
    password: '',
    address: '',
    creditCardNumber: null
})

export const Buy = () => {
    const navigate = useNavigate();
    const onFormSubmit = useCallback(async(data, {setSubmitting, resetForm}) => {
        resetForm(getInitialValues());
        setSubmitting(false);
        navigate(createPath(APP_ROUTES.AUTH, false));
    }, [navigate])
    return (
        <Flex vertical gap={20} className={styles.buy}>
            <StyledCard>
                <Typography.Title>Купить товар</Typography.Title>
                <Formik
                    initialValues={getInitialValues()}
                    validationSchema={validationSchema}
                    validateOnChange
                    validateOnBlur
                    onSubmit={onFormSubmit}
                >
                    {
                        ({errors, touched, setFieldValue, values}) => (
                            <Form>
                                <Flex vertical gap='middle' justify='center'>
                                    <FormInput addonBefore='ФИО' type='string' name='name' errorText={getErrorText('name', errors, touched)} onChange={e => setFieldValue('name', e.target.value)} value={values['name']}/>
                                    <FormInput addonBefore='Почта' type='email' name='email' errorText={getErrorText('email', errors, touched)} onChange={e => setFieldValue('email', e.target.value)} value={values['email']}/>
                                    <FormInput addonBefore='Пароль' type='password' name='password' errorText={getErrorText('password', errors, touched)} onChange={e => setFieldValue('password', e.target.value)} value={values['password']}/>
                                    <FormInput addonBefore='Адрес' type='string' name='address' errorText={getErrorText('address', errors, touched)} onChange={e => setFieldValue('address', e.target.value)} value={values['address']}/>
                                    <FormInput addonBefore='Номер кредитной карты' type='number' name='creditCardNumber' errorText={getErrorText('creditCardNumber', errors, touched)} onChange={e => setFieldValue('creditCardNumber', e.target.value)} value={values['creditCardNumber']}/>
                                    <Button htmlType='submit'>Отправить</Button>
                                </Flex>
                            </Form>
                        )
                    }
                </Formik>
            </StyledCard>
        </Flex>
    );
}
