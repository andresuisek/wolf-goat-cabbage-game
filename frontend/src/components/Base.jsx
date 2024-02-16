import React from 'react';
import { Layout, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import UisekLogo from '../images/LOGO-UISEK-web-387x143-1.png';

const { Header, Content, Footer } = Layout;


const Base = ({ children }) => {

    const Logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const items = [
        {
          key: '1',
          label: (
            <Button onClick={() => Logout()}>
              Logout
            </Button>
          ),
        },
      ];

    return (
        <Layout>
            <Header
                style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between"
                }}
            >
                <div className="demo-logo" style={{marginRight: '30px', marginTop: '20px', width: '150px'}}>
                    <img src={UisekLogo} alt='logo' style={{width: '100%'}}></img>
                </div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    arrow
                    >
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Dropdown>
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={[]}
                    style={{
                        flex: 1,
                        minWidth: 0,
                }}
                /> */}
            </Header>
            <Content
                style={{
                  padding: '0 48px',
                }}
            >
                {children}
            </Content>
            {/* <h2 className="title">Río de Decisiones</h2> */}
        </Layout>
    );
};

export default Base;