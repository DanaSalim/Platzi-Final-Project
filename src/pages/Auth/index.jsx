import {useState, useMemo, useCallback} from 'react';
import { Flex, Button, Typography} from 'antd';
import { Formik, Form } from 'formik'
import * as yup from 'yup';

import { StyledCard } from '../../components/StyledCard';
import styles from './index.module.scss';
import { FormInput } from '../../components/FormInput';
import { login } from '../../services/api/endpoints/auth';
import { setJWTTokenSet } from '../../services/jwt';
import { isEmailAvalable, createUser } from '../../services/api/endpoints/user';

const MOCK_AVATAR_URL = 'https://i.imgur.com/Gw3NkmF.png';

const validationSchemaSignIn = yup.object({
    email: yup.string('Значение должно быть строкой.').email('Значение должны быть адресом электронной почты.').required('Необходимо указать адрес электронной почты'),
    password: yup.string('Значение должно быть строкой.').min(4, 'Пароль должен состоять минимум из 4 символов.').required('Необходимо указать пароль'),
});
const validationSchemaSignUp = yup.object({
    name: yup.string('Значение должно быть строкой.').required('Необходимо указать ФИО'),
    email: yup.string('Значение должно быть строкой.').email('Значение должны быть адресом электронной почты.').required('Необходимо указать адрес электронной почты'),
    password: yup.string('Значение должно быть строкой.').min(4, 'Пароль должен состоять минимум из 4 символов.').required('Необходимо указать пароль'),
});

const getErrorText = (name, errors, touched) => (touched[name] && errors[name]) ? errors[name] : '';
const getInitialValuesSignIn = () => ({
    email: '',
    password: '',
})
const getInitialValuesSignUp = () => ({
    name: '',
    email: '',
    password: ''
})

export const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const initialValues = useMemo(() => isSignIn ? getInitialValuesSignIn() : getInitialValuesSignUp(), [isSignIn]);
    const validationSchema = useMemo(() => isSignIn ? validationSchemaSignIn : validationSchemaSignUp, [isSignIn]);

    const onFormSubmit = useCallback(async (data, {setSubmitting, setErrors, resetForm}) => {
        if(isSignIn) {
            try {
                const tokens = await login(data);
                setJWTTokenSet(tokens);
            } catch (error) {
                setErrors({email: 'Вы неправильно ввели адрес электронной почты или пароль.', password: 'Вы неправильно ввели адрес электронной почты или пароль.'});
                return;
            }
        }
        if(!isSignIn){
            const isAvailableEmail = true || await isEmailAvalable(data.email); // TODO: Fix api

            if(isAvailableEmail) {
                await createUser({...data, avatar: MOCK_AVATAR_URL})
                setIsSignIn(true);
            } else {
                setErrors({email: 'Этот адрес электронной почты уже зарегистрирован.'});
                return;
            }
        }
        resetForm(initialValues);
        setSubmitting(false);
    }, [isSignIn, initialValues])
    return (
        <Flex vertical gap={20} className={styles.buy}>
            <StyledCard>
                <Typography.Title>{isSignIn ? 'Авторизация' : 'Регистрация'}</Typography.Title>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange
                    validateOnBlur
                    onSubmit={onFormSubmit}
                >
                    {
                        ({errors, touched, setFieldValue, values}) => (
                            <Form>
                                <Flex vertical gap='middle' justify='center'>
                                    { !isSignIn && <FormInput addonBefore='ФИО' type='string' name='name' errorText={getErrorText('name', errors, touched)} onChange={e => setFieldValue('name', e.target.value)} value={values['name']}/>}
                                    <FormInput addonBefore='Почта' type='email' name='email' errorText={getErrorText('email', errors, touched)} onChange={e => setFieldValue('email', e.target.value)} value={values['email']}/>
                                    <FormInput addonBefore='Пароль' type='password' name='password' errorText={getErrorText('password', errors, touched)} onChange={e => setFieldValue('password', e.target.value)} value={values['password']}/>
                                    <Button htmlType='submit'>{isSignIn ? 'Войти' : 'Зарегистрироваться'}</Button>
                                    <Button className={styles.submitBtn} onClick={() => setIsSignIn(prev => !prev)}>{isSignIn ? 'Ещё нет аккаунта? Зарегистрироваться.' : 'Уже есть аккаунт? Войти.'}</Button>
                                </Flex>
                            </Form>
                        )
                    }
                </Formik>
            </StyledCard>
        </Flex>
    );
}
