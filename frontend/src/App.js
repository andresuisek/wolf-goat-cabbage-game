import React, { useRef, useEffect, useState } from 'react';
import { Tabs, Tour, Modal, Button, Form, Input, Spin, Tooltip } from 'antd';
import { StopOutlined, SoundOutlined } from '@ant-design/icons';
import Game from './components/Game';
import { useRegisterUserMutation } from './baseApi';
import Step1 from './components/Step1';
import Step2 from './components/Step2';

const { confirm } = Modal;

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTour, setActiveTour] = useState(false);
  const [volumeUp, setVolumeUp] = useState(false);
  // const ref = useRef(null);
  const [open, setOpen] = useState(true);
  
  const [activeTab, setActiveTab] = useState(1);

  const audioRef = React.createRef(null);
  


  const [registerUser, { isLoading }] = useRegisterUserMutation();

    const onChange = (key) => {
      // setActiveTab(key);
      // userData.level = key
      // localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('currentLevel', JSON.stringify(key));
      window.location.reload();
    };

    useEffect(() => {
      const cachedUserData = localStorage.getItem('userData');
      // const currentLevel = localStorage.getItem('currentLevel');

      if (cachedUserData) {
          const user = JSON.parse(cachedUserData);
          setUserData(user);
          const currentLevel =  localStorage.getItem('currentLevel');
          setActiveTab(parseInt(currentLevel));
      } else {
        setModalOpen(true);
          // const newUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
          
          // localStorage.setItem('userData', JSON.stringify(newUser));
          // setUserData(newUser);
      }
      // audioRef.current.play();

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
          disabled: userData?.level >= 2 ? false : true,
          icon: userData?.level < 2 && <StopOutlined />,
          activeKey: activeTab === 2 ? true : false
        },
        {
          label: 'Level 3',
          key: 3,
          children: activeTab === 3 && <Game level={3} />,
          disabled: userData?.level >= 3 ? false : true,
          icon: userData?.level < 3 && <StopOutlined />
        },
    ]


    const steps = [
      {
        title: '!Game rules!',
        description: <Step1 />,
        target: null,
      },
      {
        title: '¡Controls!',
        description: <Step2 />,
        // placement: 'right',
        target: () => null,
      },
      // {
      //   title: 'Are you ready to start?',
      //   // description: 'Los animales los puedes agarra con la tecla espacio.',
      //   // placement: 'top',
      //   target: () => null,
      // },
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
        localStorage.setItem('currentLevel', JSON.stringify(newUserData.level));

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
    
    const togglePlay = (value) => {
      setVolumeUp(value);
    };

    useEffect(() => {
      if (volumeUp) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }, [volumeUp])

    return (
      <>
        <h2 className="title">The Great River Riddle</h2>

        {!modalOpen && <Tabs
            activeKey={activeTab}
            className='tabs-game'
            onChange={onChange}
            type="card"
            items={items}
            tabBarExtraContent={
              <> 
                <Tooltip title="Tour">
                  <Button type="primary" shape="circle" onClick={() => setActiveTour(true)}
                    icon={<span className="material-symbols-outlined">info</span>} />
                </Tooltip>
                {volumeUp && <Tooltip title="Volume Off">
                  <Button type="primary" shape="circle" onClick={() => togglePlay(false)}
                    icon={<span className="material-symbols-outlined">volume_off</span>} />
                </Tooltip>}
                {!volumeUp && <Tooltip title="Volume Up">
                  <Button type="primary" shape="circle" onClick={() => togglePlay(true)}
                    icon={<span className="material-symbols-outlined">volume_up</span>} />
                </Tooltip>}
              </>
            }
        />}

        {activeTour && <Tour open={activeTour} onClose={() => setActiveTour(false)} steps={steps} />}

        {/* <Spin spinning={true}> */}
          <Modal
            className="background-modal"
            // title="Register"
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
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        {/* </Spin> */}
        
        <audio ref={audioRef} src="./sounds/music.wav" type="audio/wav" autoPlay />
      </>
    );
};

export default App;