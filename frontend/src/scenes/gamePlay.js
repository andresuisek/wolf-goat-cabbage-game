import Phaser from "phaser";
import store from "../store";
import { setWinGame, setInitGame } from "../reducer/Game";

export class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
        window.GAME = this;
        this.spaceKey = null;
        
        this.touchingLeftPlatform = false;
        this.touchingRightPlatform = false;
        this.isKeydown = false;
        this.handleCaracterExecuted = false;
        this.playerCaracter = false;
        this.caracterReference = null;
        this.platforms = null;
        this.player = null;
        this.wolf = null;

        this.leftWolfPlatForm = true;
        this.leftGoatPlatForm = true;
        this.leftCabaggePlatForm = true;

        this.rigthGoatPlatForm = false;
        this.rigthWolfPlatForm = false;
        this.rigthCabaggePlatForm = false;
    
        this.finishGame = false;
    }


    preload() {
        this.load.image('sky', 'images/sky.png', 'images');
        this.load.image('ground', 'images/platform 1.png');
        this.load.image('wolf', 'images/wolf.png');
        this.load.image('goat', 'images/goat.png');
        this.load.image('cabbage', 'images/cabbage.png');
        this.load.spritesheet('farmer', 'images/farmer.png', { frameWidth: 134, frameHeight: 100 });

        this.load.image('btn-start', 'images/btn-start.png');
        this.load.image('game-over', 'images/game-over.png');
        this.load.image('game-win', 'images/game-win.png');
    }

    create() {
        

        this.add.image(500, 300, 'sky');
        // this.add.image(1000, '100%', 'background');

        this.createPlatforms();
        this.createPlayer();
        this.createCharacters();
        
        this.physics.add.collider(this.player, this.platform_left, () => {
            this.touchingLeftPlatform = true;
        });

        this.physics.add.collider(this.player, this.platform_right, () => {
            this.touchingRightPlatform = true;
        });

        this.physics.add.collider(this.player, this.wolf, this.handleOverlap, null, this);
        this.physics.add.collider(this.player, this.goat, this.handleOverlap, null, this);
        this.physics.add.collider(this.player, this.cabbage, this.handleOverlap, null, this);

        this.platforms.refresh();

        this.physics.add.overlap(this.wolf, this.platform_left, () => {
            this.leftWolfPlatForm = true;
            this.rigthWolfPlatForm = false;
        }, null, this);

        this.physics.add.overlap(this.wolf, this.platform_right, () => {
            this.leftWolfPlatForm = false;
            this.rigthWolfPlatForm = true;
        }, null, this);

        this.physics.add.overlap(this.goat, this.platform_left, () => {
            this.leftGoatPlatForm = true;
            this.rigthGoatPlatForm = false;
        }, null, this);

        this.physics.add.overlap(this.goat, this.platform_right, () => {
            this.leftGoatPlatForm = false;
            this.rigthGoatPlatForm = true;
        }, null, this);

        // this.physics.add.collider(this.cabbage, this.platform_left, () => {
        //     console.log('Left si', "rigth no")
        // }, null, this);

        // this.physics.add.collider(this.cabbage, this.platform_right, () => {
        //     console.log('Left NO', "rigth SI")
        // }, null, this);

        this.physics.add.overlap(this.cabbage, this.platform_left, () => {
            this.leftCabaggePlatForm = true;
            this.rigthCabaggePlatForm = false;
        }, null, this);

        this.physics.add.overlap(this.cabbage, this.platform_right, () => {
            this.leftCabaggePlatForm = false;
            this.rigthCabaggePlatForm = true;
        }, null, this);


        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        const text = this.add.text(10, 460, '', { font: '16px Courier', fill: '#fff' });   
        text.setText([
            'Level: 1'
        ])     
    }

    update() {        

        // if(this.finishGame)
        //     return

        if (this.spaceKey.isDown && !this.handleCaracterExecuted) {
            this.handleCaracterInput();
            this.handleCaracterExecuted = true;
        }
        
        if (this.spaceKey.isUp) {
            this.handleCaracterExecuted = false;
        }

        if(this.playerCaracter){
            this.caracterReference.body.enable = false;
            this.caracterReference.x = this.player.x + 10;
            this.caracterReference.y = this.player.y;

            if(!this.touchingLeftPlatform){
                const key = this.caracterReference.texture.key;
                if(key === 'wolf')
                    this.leftWolfPlatForm = false;
                else if(key === 'goat')
                    this.leftGoatPlatForm = false;
                else if(key === 'cabbage')
                    this.leftCabaggePlatForm = false;
            }
            
            if(!this.touchingRightPlatform){
                const key = this.caracterReference.texture.key;
                if(key === 'wolf')
                    this.rigthWolfPlatForm = false;
                else if(key === 'goat')
                    this.rigthGoatPlatForm = false;
                else if(key === 'cabbage')
                    this.rigthCabaggePlatForm = false;
            }
        }
        
        this.verifyLose();

        this.verifyWin();

        this.handlePlayerInput();
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();

        this.platform_left = this.platforms.create(60, 300, 'ground').setScale(2).refreshBody();
        this.platform_right = this.platforms.create(930, 300, 'ground').setScale(2).refreshBody();
    }

    createPlayer() {
        this.player = this.physics.add.sprite(220, 200, 'farmer');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('farmer', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('farmer', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createCharacters() {
        this.wolf = this.physics.add.group();
        this.goat = this.physics.add.group();
        this.cabbage = this.physics.add.group();
        // this.wolf = this.physics.add.sprite(100, 100, 'wolf');
        // this.goat = this.physics.add.sprite(100, 220, 'goat');
        // this.cabbage = this.physics.add.sprite(100, 350, 'cabbage');

        this.createCharacter(this.wolf, 100, 100, 'wolf');
        this.createCharacter(this.goat, 100, 220, 'goat');
        this.createCharacter(this.cabbage, 100, 350, 'cabbage');
    }

    createCharacter(group, x, y, key) {
        let character = group.create(x, y, key);
        character.setBounce(0.2);
        character.setCollideWorldBounds(true);
        character.body.onOverlap = true;

        
    }

    handlePlayerInput() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.anims.play('left', true);
            if(this.touchingRightPlatform)
                this.touchingRightPlatform = false;

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.anims.play('right', true);
            if(this.touchingLeftPlatform)
                this.touchingLeftPlatform = false;

        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
            // this.player.anims.play('turn');
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
            // this.player.anims.play('turn');
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            this.cabbage.setVelocityX(0);
            this.cabbage.setVelocityY(0);

            this.wolf.setVelocityX(0);
            this.wolf.setVelocityY(0);

            this.goat.setVelocityX(0);
            this.goat.setVelocityY(0);
            // this.player.anims.play('turn');
        }
    }

    handleOverlap(player, caracter) {
        // player.body.setAllowGravity(false);
        // caracter.body.setAllowGravity(false);

        player.setVelocityX(0);
        player.setVelocityY(0);

        caracter.setVelocityX(0);
        caracter.setVelocityY(0);

        player.setGravityY(0);
        caracter.setGravityY(0);

        player.setImmovable(true);
        caracter.setImmovable(true);
        if(!this.playerCaracter || !this.caracterReference)
            this.caracterReference = caracter;
       
    }

    handleCaracterInput() {        

        if(this.caracterReference && this.touchingLeftPlatform && !this.playerCaracter){
            this.playerCaracter = true;
            this.caracterReference.body.enable = false;
            this.caracterReference.x = this.player.x + 10;
            this.caracterReference.y = this.player.y;
        }else if(this.caracterReference && this.touchingRightPlatform && !this.playerCaracter){
            this.playerCaracter = true;
            this.caracterReference.body.enable = false;
            this.caracterReference.x = this.player.x + 10;
            this.caracterReference.y = this.player.y;
        }else if(this.caracterReference && this.touchingLeftPlatform && this.playerCaracter){
            this.caracterReference.body.enable = true;
            this.playerCaracter = false;
            this.caracterReference.x = 100;
            this.caracterReference.y = this.player.y;
            this.caracterReference = null;
        }else if(this.caracterReference && this.touchingRightPlatform && this.playerCaracter){
            this.caracterReference.body.enable = true;
            this.playerCaracter = false;
            this.caracterReference.x = 900;
            this.caracterReference.y = this.player.y;
            this.caracterReference = null;
        }

       
    }

    verifyWin() {
        const wolfOnPlatform = this.physics.overlap(this.wolf, this.platform_right);
        const goatOnPlatform = this.physics.overlap(this.goat, this.platform_right);
        const cabbageOnPlatform = this.physics.overlap(this.cabbage, this.platform_right);

        if(wolfOnPlatform && goatOnPlatform && cabbageOnPlatform){
            // this.finishGame = true
            store.dispatch(setInitGame(false))
            store.dispatch(setWinGame(true))
            this.scene.start('gamewin')
        }
    }

    verifyLose() {

        const playerOnPlatform = this.physics.overlap(this.player, this.platform_left);
        // const cabaggeOnPlatform = this.physics.overlap(this.cabbage, this.platform_left);

        // console.log(this.leftCabaggePlatForm, cabaggeOnPlatform)
        if(this.leftWolfPlatForm && this.leftGoatPlatForm && !this.leftCabaggePlatForm && !playerOnPlatform){
            // this.finishGame = true;
            store.dispatch(setInitGame(false))            
            store.dispatch(setWinGame(false))            
            this.scene.start('gameover')
        }else if(!this.leftWolfPlatForm && this.leftGoatPlatForm && this.leftCabaggePlatForm && !playerOnPlatform){
            // this.finishGame = true;
            store.dispatch(setInitGame(false))            
            store.dispatch(setWinGame(false))
            this.scene.start('gameover')
        }

        const rigthplayerOnPlatform = this.physics.overlap(this.player, this.platform_right);


        if(this.rigthWolfPlatForm && this.rigthGoatPlatForm && !this.rigthCabaggePlatForm && !rigthplayerOnPlatform){
            store.dispatch(setInitGame(false))            
            store.dispatch(setWinGame(false))
            this.scene.start('gameover')
        }else if(!this.rigthWolfPlatForm && this.rigthGoatPlatForm && this.rigthCabaggePlatForm && !rigthplayerOnPlatform){
            store.dispatch(setInitGame(false))            
            store.dispatch(setWinGame(false))
            this.scene.start('gameover')
        }
        
    }
}
