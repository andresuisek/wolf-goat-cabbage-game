import Phaser from "phaser";
import { MainMenu } from '../scenes/mainMenu'

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#282c34',
    width: 1000,
    height: 500,
    transparent: true,
	scale: {
        parent: 'phaser-container',
		// mode: Phaser.Scale.ScaleModes.RESIZE,
		// width: window.innerWidth,
		// height: window.innerHeight,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
	},
	physics: {
		default: 'arcade',
		arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
	},
	scene: [MainMenu],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Phaser.Game(config)