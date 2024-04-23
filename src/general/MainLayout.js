import { Header } from "antd/es/layout/layout.js";
import "./css/MainLayout.css"
import { Layout } from 'antd';
import UserMenu from "./UserMenu";
import HeaderContent from "./HeaderContent";


const MainLayout = ({ children }) => (
    <Layout>
        <Header className="heared"><HeaderContent /></Header>
        <Layout className="basic-layout" style={{ backgroundColor: 'white' }}>
            {children}
        </Layout>
    </Layout>
);

export default MainLayout;