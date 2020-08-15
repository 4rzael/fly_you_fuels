import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868
const HALF = FULL / 2

export default class LostScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LostScene' })
  }

  create () {
    this.text = this.add.text(HALF - 300, HALF, `BOOM ! YOU CRASHED THE PLANE`, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: '#000000',
      fontSize: 64});
  }

  update () {
  }
}
