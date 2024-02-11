import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Divider } from 'antd';
import Humidity from './components/Humidity';
import Temperature from './components/Temperature';

import UisekLogo from './images/LOGO-UISEK-web-387x143-1.png';

import { ToastContainer} from 'react-toastify';
const { Header, Content, Footer } = Layout;


const items = [{
  key:  1,
  label: 'Home',
}];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{marginRight: '30px', marginTop: '20px', width: '150px'}}>
          <img src={UisekLogo} alt='logo' style={{width: '100%'}}></img>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 1000,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
           <Row>
            <Col span={11}>
              <Temperature />
            </Col>
            <Col span={1} style={{'textAlign': 'center'}}>
              <Divider type="vertical" style={{'height': '100%'}}/>
            </Col>
            <Col span={11}>
              <Humidity />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {/* Ant Design ©2023 Created by Ant UED */}
      </Footer>      
    </Layout>
  );
};
export default App;