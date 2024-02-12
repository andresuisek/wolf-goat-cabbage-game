import Phaser from "phaser";
import store from "../store";
import { setInitGame } from "../reducer/Game";

export class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'gameover' });
        window.OVER = this;
    }

    preload ()
    {
      
    }

    create ()
    {
        this.add.image(500, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(60, 300, 'ground').setScale(2).refreshBody();
        this.platforms.create(930, 300, 'ground').setScale(2).refreshBody();

        const btnStart = this.add.image(500, 350, 'btn-start');
        btnStart.setScale(0.5);        
        btnStart.setInteractive();

        this.add.image(500, 200, 'game-over');
        
        btnStart.once('pointerup', function ()
        {        
            store.dispatch(setInitGame(true))
            this.scene.start('mainmenu');
            
        }, this);
        
    }
}