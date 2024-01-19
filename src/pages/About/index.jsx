import { Flex, Image, Space, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';

import { StyledCard } from '../../components/StyledCard';
import AvatarImage from '../../assets/img/about_avatar.jpg';
import styles from './index.module.scss';


export const About = () => {
    const {width} = useWindowSize();


    return (
        <Flex vertical gap={20} className={styles.about}>
            <StyledCard >
                <Flex vertical={width < 1024} gap={50} justify='space-between' align='center'>
                    <Image src={AvatarImage} rootClassName={styles.avatar}/>
                    <Flex vertical gap='small' align='flex-start' style={{width: '100%'}}>
                        <Typography.Title style={{fontSize: width < 768 ? 30 : 38}}>Дана Галымжанкызы</Typography.Title>
                        <Flex vertical>
                            <Typography.Text style={{fontSize: 24}}>Навыки:</Typography.Text>
                            <Flex vertical style={{marginLeft: 10}}>
                                <Typography.Text style={{fontSize: 18}}>-Коммуникабельность</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Быстрообучаемость</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Ответственность</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Отзывчивость</Typography.Text>
                            </Flex>
                        </Flex>
                        <Flex vertical>
                            <Typography.Text style={{fontSize: 24}}>Стек используемый в данном проекте:</Typography.Text>
                            <Flex vertical style={{marginLeft: 10}}>
                                <Typography.Text style={{fontSize: 18}}>-React</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Vite</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Ant Design</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-React Formik</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-React Hook Form</Typography.Text>
                                <Typography.Text style={{fontSize: 18}}>-Yup</Typography.Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </StyledCard>
        </Flex>
    );
}
