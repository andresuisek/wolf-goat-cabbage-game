import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Phaser from "phaser";
import { MainMenu } from '../scenes/mainMenu'
import { Play } from '../scenes/play'
import { GameOver } from '../scenes/gameOver';
import { GameWin } from '../scenes/gameWin';
import { GamePlay } from '../scenes/gamePlay';
import { Button, Modal, Result, Rate, Form } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useCreateRatingMutation, useCreateGameHistoryMutation } from '../baseApi';

// import GameOverIcon from '../images/game-over.png';

// import './PhaserGame';

const Game = ({ level }) => {
    const [timer, setTimer] = useState(0);
    const [isReady, setReady] = useState(false);
    const [winModal, setWinModal] = useState(false);
    const [loseModal, setLoseModal] = useState(false);
    const { initGame, winGame } = useSelector(({ game }) => game);

    const [createRating] = useCreateRatingMutation();
    const [createGameHistory] = useCreateGameHistoryMutation();

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#282c34',
            width: 1000,
            height: 500,
            parent: `phaser-container-${level}`,
            transparent: true,
            scale: {
                // mode: Phaser.Scale.ScaleModes.RESIZE,
                // width: window.innerWidth,
                // height: window.innerHeight,
                // mode: Phaser.Scale.FIT,
                // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0, x: 0 },
                    debug: false
                }
            },
            // scene: [GamePlay],
            scene: [MainMenu, Play, GameOver, GameWin],
        }

        let game = new Phaser.Game(config);

        return () => {
            setReady(false)
            game.destroy(true)
        }
    }, []);

    useEffect(() => {
        if(initGame !== null){
            let intervalId;
    
            if (initGame) {
                console.log('Juego Iniciado');
                intervalId = setInterval(() => {
                    setTimer((prevTimer) => prevTimer + 1);
                }, 1000); // Aumentar el temporizador cada segundo (1000 milisegundos)
            }else{
                console.log('Juego Finalizado');
                return () => clearInterval(intervalId);    
            }
    
            // Limpiar el temporizador cuando el componente se desmonta o cuando initGame cambia a false
            return () => clearInterval(intervalId);
        }
    }, [initGame]);

    const setGameHistory = async (timer, winGame) => {
        const cachedUserData = localStorage.getItem('userData');
        const user = JSON.parse(cachedUserData)

        try {
            await createGameHistory({
              user: user.id,
              level: user.level,
              game_time: timer,
              won: winGame
            }).unwrap();
            
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        if(winGame !== null){
            if(winGame){
                setWinModal(true)
            }else{
                setLoseModal(true)
            }

            setGameHistory(timer, winGame)

            // createGameHistory
            console.log('Juego terminado', timer)
        }
    }, [winGame, timer])

    const onFinish = async (values) => {
        const cachedUserData = localStorage.getItem('userData');
        const user = JSON.parse(cachedUserData)

        try {
            let rate = await createRating({
              user: user.id,
              level: user.level,
              rate: values.rate,
            }).unwrap();
            
            if(winGame){
                user.level = user.level < 3 && user.level + 1;
                localStorage.setItem('userData', JSON.stringify(user));
                localStorage.setItem('currentLevel', JSON.stringify(user.level));
                window.location.reload();
            }else{
                window.location.reload();
            }

          } catch (error) {
            console.log(error)
          }
        // console.log('Calificacion', values)
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    return (
        <>
            <div id={`phaser-container-${level}`} className='Game'></div>
            <Modal
                className='modal-background'
                // title="Register"
                centered
                open={winModal}
                closeIcon={false}
                footer={[]}
            >
                <Result
                    className='game-win'
                    icon={<SmileOutlined />}
                    title="¡You Win!"
                    subTitle={
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item 
                                name="rate"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please pick an rate!',
                                    },
                                ]}
                            >
                                <Rate style={{'fontSize': '40px'}} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Next Level  
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                />
            </Modal>

            <Modal
                className='modal-background'
                centered
                open={loseModal}
                closeIcon={false}
                footer={[]}
            >
                <Result
                    className='game-over'
                    // icon={null}
                    icon={<FrownOutlined />}
                    title="¡Game Over!"
                    // title={<img src={GameOverIcon} alt='game_over'></img>}
                    subTitle={
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item 
                                name="rate"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please pick an rate!',
                                    },
                                ]}
                            >
                                <Rate style={{'fontSize': '40px'}} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Restart Game
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                />
            </Modal>
        </>
    );
};

export default Game;