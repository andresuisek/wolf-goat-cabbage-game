export default class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'mainmenu' });
        window.MENU = this;
    }

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform 1.png');
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('goat', 'assets/goat.png');
        this.load.image('cabbage', 'assets/cabbage.png');
        this.load.spritesheet('farmer', 'assets/farmer.png', { frameWidth: 134, frameHeight: 100 });

        this.load.image('btn-start', 'assets/btn-start.png');
        this.load.image('game-over', 'assets/game-over.png');
        this.load.image('game-win', 'assets/game-win.png');
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