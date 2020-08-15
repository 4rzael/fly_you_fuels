import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868
const HALF = FULL / 2

export default class WonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WonScene' })
  }

  create () {
    this.text = this.add.text(HALF - 200, HALF, `GOOD DOG !`, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: '#000000',
      fontSize: 64});
  }

  update () {
  }
}
