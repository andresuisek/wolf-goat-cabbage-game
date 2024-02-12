import Phaser from "phaser";
import store from "../store";
import { setInitGame } from "../reducer/Game";

export class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'mainmenu' });
        window.MENU = this;
    }

    preload ()
    {
        this.load.image('sky', 'images/sky.png');
        this.load.image('ground', 'images/platform 1.png');
        this.load.image('wolf', 'images/wolf.png');
        this.load.image('goat', 'images/goat.png');
        this.load.image('cabbage', 'images/cabbage.png');
        this.load.spritesheet('farmer', 'images/farmer.png', { frameWidth: 134, frameHeight: 100 });

        this.load.image('btn-start', 'images/btn-start.png');
        this.load.image('game-over', 'images/game-over.png');
        this.load.image('game-win', 'images/game-win.png');

        this.load.image('rock1', 'images/rock1.png');
        this.load.image('rock2', 'images/rock2.png');
        this.load.image('rock3', 'images/rock3.png');
        this.load.image('tree1', 'images/tree1.png');
        this.load.image('tree2', 'images/tree2.png');
    }

    create ()
    {
        
        this.add.image(500, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        
        this.platforms.create(60, 300, 'ground').setScale(2).refreshBody();
        this.platforms.create(930, 300, 'ground').setScale(2).refreshBody();
        
        const btnStart = this.add.image(500, 250, 'btn-start');
        btnStart.setScale(0.5);
        
        btnStart.setInteractive();
        
        btnStart.once('pointerup', function ()
        {
            store.dispatch(setInitGame(true))    
            this.scene.start('game');
            
        }, this);

        if (!this.anims.exists('left')) {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('farmer', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('right')){
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('farmer', { start: 1, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
        }
        
    }
}