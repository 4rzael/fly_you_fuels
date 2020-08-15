import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868
const HALF = FULL / 2

export default class LostScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LostScene' })
  }

  create () {
    this.background = this.physics.add.sprite(FULL,FULL,'LOOSE');
    this.background.setPosition(0,0)
    this.background.setCollideWorldBounds(true)

  }

  update () {
  }
}
