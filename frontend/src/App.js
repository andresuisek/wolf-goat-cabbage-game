import React, { useRef, useEffect, useState } from 'react';
import { Tabs, Tour, Modal, Button, Form, Input, Spin } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import Game from './components/Game';
import { useRegisterUserMutation } from './baseApi';

const { confirm } = Modal;

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTour, setActiveTour] = useState(false);
  // const ref = useRef(null);
  const [open, setOpen] = useState(true);
  
  const [activeTab, setActiveTab] = useState(1);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

    const onChange = (key) => {
      setActiveTab(key);
      localStorage.setItem('currentLevel', JSON.stringify(key));
    };

    useEffect(() => {
      const cachedUserData = localStorage.getItem('userData');

      if (cachedUserData) {
          const user = JSON.parse(cachedUserData);
          setUserData(user);
          setActiveTab(user.level);
          localStorage.setItem('currentLevel', JSON.stringify(user.level));
      } else {
        setModalOpen(true);
          // const newUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
          
          // localStorage.setItem('userData', JSON.stringify(newUser));
          // setUserData(newUser);
      }
    }, []);

    const items = [
        {
          label: 'Level 1',
          key: 1,
          children: activeTab === 1 && <Game level={1} />,
          disabled: false,
          activeKey: activeTab === 1 ? true : false
        },
        {
          label: 'Level 2',
          key: 2,
          children: activeTab === 2 && <Game level={2} />,
          disabled: false,
          icon: <StopOutlined />,
          activeKey: activeTab === 2 ? true : false
        },
        {
          label: 'Level 3',
          key: 3,
          children: activeTab === 3 && <Game level={3} />,
          disabled: false,
          icon: <StopOutlined />
        },
    ]


    const steps = [
      {
        title: '!Bienvenido!',
        description: 'Tu objetivo consiste en trasladar los animales al otro lado del rio!',
        target: null,
      },
      {
        title: 'Movilidad',
        description: 'Utilizas las teclas para mover al granjero.',
        // placement: 'right',
        target: () => null,
      },
      {
        title: 'Agarra los animales',
        description: 'Los animales los puedes agarra con la tecla espacio.',
        // placement: 'top',
        target: () => null,
      },
    ];

    const onFinish = async (values) => {
      try {
        let user = await registerUser({
          username: values.email,
          email: values.email,
          first_name: values.name,
        }).unwrap();

        let newUserData = { ...user };
        newUserData.level = 1
        localStorage.setItem('userData', JSON.stringify(newUserData));

        setModalOpen(false);
        setActiveTour(true);
        // _.dispatch(reducer.setAuthTokens(auth));
        // trigger(auth);
      } catch (error) {
        console.log(error)
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };    

    return (
      <>
        <h2 className="title">Río de Decisiones</h2>

        <Tabs
            activeKey={activeTab}
            className='tabs-game'
            onChange={onChange}
            type="card"
            items={items}
        />

        {activeTour && <Tour open={open} onClose={() => setOpen(false)} steps={steps} />}

        <Spin spinning={isLoading}>
          <Modal
            title="Register"
            centered
            open={modalOpen}
            closeIcon={false}
            footer={[]}
          >
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Name:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='email'
                label="Email:"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Spin>
      </>
    );
};

export default App;