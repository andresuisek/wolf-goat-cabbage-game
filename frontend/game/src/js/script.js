class Example extends Phaser.Scene {

    platforms;
    player;
    wolf;

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform 1.png');
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('goat', 'assets/goat.png');
        this.load.image('cabbage', 'assets/cabbage.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    
    create ()
    {
        this.add.image(500, 300, 'sky')
        
        // Platform
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(60, 300, 'ground').setScale(2).refreshBody();
        this.platforms.create(930, 300, 'ground').setScale(2).refreshBody();

        // Player
        this.player = this.physics.add.sprite(200, 300, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);

        // Wolf - Goat - Cabbage
        this.wolf = this.physics.add.group();
        this.goat = this.physics.add.group();
        this.cabbage = this.physics.add.group();
    
        let wolf = this.wolf.create(100, 100, 'wolf');
        wolf.setBounce(0.2);
        wolf.setCollideWorldBounds(true);
        // this.physics.add.collider(wolf, this.platforms);
    
        let goat = this.goat.create(100, 200, 'goat');
        goat.setBounce(0.2);
        goat.setCollideWorldBounds(true);
        this.physics.add.collider(goat, this.platforms);
    
        let cabbage = this.cabbage.create(100, 300, 'cabbage');
        cabbage.setBounce(0.2);
        cabbage.setCollideWorldBounds(true);
        this.physics.add.collider(cabbage, this.platforms);

        this.physics.add.collider(this.player, this.wolf, this.handleOverlap, null, this);
    }
    
    update ()
    {
        if (this.wolfReference) {
            this.wolfReference.body.enable = false;
            this.wolfReference.x = this.player.x; // Ajusta según sea necesario
            this.wolfReference.y = this.player.y; // Ajusta según sea necesario
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-300);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(300);

            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown){
            this.player.setVelocityY(-300);

            this.player.anims.play('turn');
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(300);

            this.player.anims.play('turn');
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            // this.wolf.setVelocityX(0);
            // this.wolf.setVelocityY(0);

            this.player.anims.play('turn');
        }
    }

    handleOverlap(player, wolf) {
        // Deshabilitar la gravedad para ambos objetos
        player.body.setAllowGravity(false);
        wolf.body.setAllowGravity(false);

        // Convertir al lobo en un hijo del jugador
        this.wolfReference = wolf;
    }
}


var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
