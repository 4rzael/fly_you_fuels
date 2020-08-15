import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868
const HALF = FULL / 2

export default class WonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WonScene' })
  }

  create () {
    this.background = this.physics.add.sprite(FULL,FULL,'WIN');
    this.background.setPosition(0,0)
    this.background.setCollideWorldBounds(true)

  }

  update () {
  }
}
