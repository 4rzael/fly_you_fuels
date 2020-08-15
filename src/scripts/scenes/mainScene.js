import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868 + 217
const FULL_Y = 868
const HALF = FULL / 2

const RIGHT_SIDE = 868
const LEFT_SIDE = 217

const TURBINE_SIZE = 217
const PLAYER_SPEED = 50
const PI = 3.1415

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  add_wind_turbine(x,y,type) {
    const sprite = this.physics.add.sprite(FULL, FULL, type)
    sprite.setPosition(x,y)
    //TODO: Add wind
    this.turbines.push({
      x, y, type, sprite
    })
    for (let i = 0; i < 10; ++i) {
      let full_x = x
      let full_y = y
      if (type == 'top') full_y -= i * 100
      if (type == 'bottom') full_y += i * 100
      if (type == 'left') full_x -= i * 100
      if (type == 'right') full_x += i * 100
      this.physics.add.sprite(FULL, FULL, 'wind').setPosition(full_x, full_y).setRotation((type == 'top' || type == 'bottom') ? 0 : PI / 2)
    }
  }

  add_wind(x,y,type) {
    const sprite = this.physics.add.sprite(FULL, FULL, type)
    sprite.setPosition(x,y)
    //TODO: Add wind
    this.turbines.push({
      x, y, type, sprite
    })
  }


  create () {
    this.turbines = []
    // music.play({loop: true})
    this.background = this.physics.add.sprite(FULL,FULL,'fond');
    this.background.setPosition(0,0)
    this.background.setCollideWorldBounds(true)

    this.player = this.physics.add.sprite(FULL, FULL, 'player')
    this.player.setPosition(LEFT_SIDE + 50, HALF)
    this.player.setCollideWorldBounds(true)

    this.obstacles = [
      {x: 100, y: 100, type: 'nuclear01'},
      {x: 100, y: 100, type: 'nuclear01'},
    ]


    this.holding = undefined

    this.input.on('pointerdown', event => {
      if (event.position.x < LEFT_SIDE) {
        if (event.position.y <= 200) {
        }
        else if (event.position.y < 200 + 150 * 1) {
          this.holding = {sprite: this.physics.add.sprite(FULL, FULL, 'top'), type: 'top'}
        }
        else if (event.position.y < 200 + 150 * 2) {
          this.holding = {sprite: this.physics.add.sprite(FULL, FULL, 'bottom'), type: 'bottom'}
        }
        else if (event.position.y < 200 + 150 * 3) {
          this.holding = {sprite: this.physics.add.sprite(FULL, FULL, 'left'), type: 'left'}
        }
        else if (event.position.y < 200 + 150 * 4) {
          this.holding = {sprite: this.physics.add.sprite(FULL, FULL, 'right'), type: 'right'}
        }
      }
    })

    this.input.on('pointerup', event => {
      if (this.holding) {
        if (event.position.x >= LEFT_SIDE) {
          this.add_wind_turbine(event.x, event.y, this.holding.type)
        }
        this.holding.sprite.destroy(false)
        this.holding = undefined
      }
    })

    this.input.on('pointermove', pointer => {
      if (this.holding) {
        this.holding.sprite.setPosition(pointer.x, pointer.y)
      }
    })
  }

  update () {
    let speed = {x:0, y:0}
    this.turbines.forEach(turbine => {
      if (turbine.type == 'top') {
        if (Math.abs(this.player.x - turbine.x + TURBINE_SIZE / 2) < TURBINE_SIZE && this.player.y < turbine.y) {
          speed.y -= PLAYER_SPEED
         }
      }
      if (turbine.type == 'bottom') {
        if (Math.abs(this.player.x - turbine.x + TURBINE_SIZE / 2) < TURBINE_SIZE && this.player.y > turbine.y) {
          speed.y += PLAYER_SPEED
         }
      }
      if (turbine.type == 'right') {
        if (Math.abs(this.player.y - turbine.y + TURBINE_SIZE / 2) < TURBINE_SIZE && this.player.x > turbine.x) {
          speed.x += PLAYER_SPEED
        }
      }
      if (turbine.type == 'left') {
        if (Math.abs(this.player.y - turbine.y + TURBINE_SIZE / 2) < TURBINE_SIZE && this.player.x < turbine.x) {
          speed.x -= PLAYER_SPEED
        }
      }
    })
    this.player.setVelocity(speed.x, speed.y)
    this.player.setRotation(Math.atan2(speed.y, speed.x))
    
    if (this.player.x < LEFT_SIDE + 10 || this.player.y <= 10 || this.player.y >= FULL_Y - 10) {
      return win()
    }
    if (this.player.x >= FULL - 10) {
      return loose()
    }
  }
}
