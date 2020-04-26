import React, { useState } from 'react';

import {
    HeaderDashboard,
    SiderDashboard
} from '../dashboard/container';
import {
    ManageSellers,
    ManageUsers,
    WalletVerif
} from '../dashboard/pages';

import { Layout } from 'antd';

const { Content } = Layout;

const App = () => {

    const components = {
        1: <ManageUsers />,
        2: <ManageSellers />,
        3: <WalletVerif />
    };

    const [render, updateRender] = useState(1);

    const handleMenuClick = menu => {
        updateRender(menu.key);
    };

    return (
        <div className="App">
            <Layout>
                <HeaderDashboard />
                <Layout style={{ minHeight: "100vh" }}>
                    <SiderDashboard handleClick={handleMenuClick} />
                    <Layout>
                        <Content>{components[render]}</Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default App;