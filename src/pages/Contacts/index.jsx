import { Flex, Image, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';

import { StyledCard } from '../../components/StyledCard';
import AvatarImage from '../../assets/img/about_avatar.jpg';
import styles from './index.module.scss';


export const Contacts = () => {
    const {width} = useWindowSize();


    return (
        <Flex vertical gap={20} className={styles.contacts}>
            <StyledCard >
                <Flex vertical={width < 1024} gap={50} justify='center' align='center'>
                    <Image src={AvatarImage} rootClassName={styles.avatar}/>
                    <Flex vertical gap='small'>
                        <Typography.Text style={{fontSize: 24}}><GithubOutlined /> Github: <Typography.Link href='https://github.com/DanaSalim'>https://github.com/DanaSalim</Typography.Link></Typography.Text>
                        <Typography.Text style={{fontSize: 24}}>Telegram: <Typography.Link href='https://t.me/dskklk'>https://t.me/dskklk</Typography.Link></Typography.Text>
                    </Flex>
                </Flex>
            </StyledCard>
        </Flex>
    );
}
