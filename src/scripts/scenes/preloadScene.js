export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('player', 'assets/img/player.png')
    this.load.image('fond', 'assets/img/fond.png')
    this.load.image('wind', 'assets/img/wind.png')
    this.load.image('top', 'assets/img/top.png')
    this.load.image('bottom', 'assets/img/bottom.png')
    this.load.image('left', 'assets/img/left.png')
    this.load.image('right', 'assets/img/right.png')

    this.load.image('nuclear_01', 'assets/img/Nuclear01.png')
    this.load.image('nuclear_02', 'assets/img/Nuclear02.png')
    this.load.image('cloud_1', 'assets/img/cloud_1.png')
    this.load.image('cloud_2', 'assets/img/cloud_2.png')
    this.load.image('gas', 'assets/img/gas.png')

    this.load.image('WIN', 'assets/img/WIN.png')
    this.load.image('LOOSE', 'assets/img/LOOSE.png')

    this.load.audio('music', 'assets/img/music.wav')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
