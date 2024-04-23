import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Icon } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { facebookOauth2LogIn, getUserData } from '../services/userServices';


const UserMenu = () => {

    const [visible, setVisible] = useState(false)
    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "dbaka@mail.com"
    })

    useEffect(() => {
        getUserData(userId).then(res => {
            console.log(res);
            setUser(res);
        }).catch(err => {
            console.log("error")
        })
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const logInToFacebook = () => {
        facebookOauth2LogIn()
    }

    const menuContent = (
        user.needFacebookAuth ?
            <Menu>
                <Menu.Item key="1" onClick={logOut}>Log out</Menu.Item>
                <Menu.Item key="2" onClick={logInToFacebook}>Log in Facebook</Menu.Item>
            </Menu> :
            <Menu>
                <Menu.Item key="1" onClick={logOut}>Log out</Menu.Item>
            </Menu>
    );

    return (
        !user ? <></> :
            <div>
                <Dropdown
                    overlay={menuContent}
                    open={visible}
                    onOpenChange={handleVisibleChange}
                >
                    <div><UserOutlined /> {user.email}</div>
                </Dropdown>
            </div>
    )
}

export default UserMenu;