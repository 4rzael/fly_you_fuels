import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868 + 217
const FULL_Y = 868
const HALF = FULL / 2

const RIGHT_SIDE = 868
const LEFT_SIDE = 217

const TURBINE_SIZE = 100
const PLAYER_SPEED = 50
const PI = 3.1415

const PLAYER_SIZE = {x:70, y:25}

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  add_wind_turbine(x,y,type) {
    const sprite = this.physics.add.sprite(FULL, FULL, type)
    sprite.setPosition(x,y)
    this.turbines.push({
      x, y, type, sprite
    })
    for (let i = 0; i < 10; ++i) {
      let full_x = x
      let full_y = y
      if (type == 'top') full_y -= i * 200
      if (type == 'bottom') full_y += i * 200
      if (type == 'left') full_x -= i * 200
      if (type == 'right') full_x += i * 200
      this.physics.add.sprite(FULL, FULL, 'wind').setPosition(full_x, full_y).setRotation((type == 'top' || type == 'bottom') ? 0 : PI / 2)
    }
  }

  add_wind(x,y,type) {
    const sprite = this.physics.add.sprite(FULL, FULL, type)
    sprite.setPosition(x,y)
    // sprite.setDisplayOrigin(60, 50)
    this.turbines.push({
      x, y, type, sprite
    })
  }

  create_obstacles() {
    this.obstacles.forEach(obstacle => {
      this.physics.add.sprite(LEFT_SIDE + obstacle.x, obstacle.y, obstacle.type).setDisplaySize(obstacle.size.x, obstacle.size.y) // .setDisplayOrigin(obstacle.size.x / 2, obstacle.size.y / 2)
    })
  }


  create () {
    this.turbines = []
    // music.play({loop: true})
    this.background = this.physics.add.sprite(FULL,FULL,'fond');
    this.background.setPosition(0,0)
    this.background.setCollideWorldBounds(true)

    this.player = this.physics.add.sprite(FULL, FULL, 'player')
    this.player.setPosition(LEFT_SIDE + 100, HALF)
    this.player.setCollideWorldBounds(true)
    // this.player.setDisplayOrigin(25,12)

    this.obstacles = [
      {x: 100, y: 100, type: 'nuclear_01',size: {x:225 / 2, y: 377 / 2}},
      {x: 200, y: 200, type: 'nuclear_02',size: {x:295 / 3, y: 387 / 3}},
      {x: 600, y: 300, type: 'cloud_1',size: {x:274, y: 188}},
      {x: 300, y: 700, type: 'gas',size: {x:343 / 1.5, y: 200 / 1.5}},
      {x: 600, y: HALF, type: 'cloud_2',size: {x:412, y: 188}},
      {x: 700, y: FULL_Y - 100, type: 'nuclear_01',size: {x:225 / 2, y: 377 / 2}},
    ]

    this.create_obstacles()

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

  collide (obj1_pos, obj1_size, obj2_pos, obj2_size, care_about_x, care_about_y) {
    const col_x = (o1_p, o1_s, o2_p, o2_s) => (!care_about_x || (o1_p.x <= o2_p.x && o1_p.x + o1_s.x >= o2_p.x))
    const col_y = (o1_p, o1_s, o2_p, o2_s) => (!care_about_y || (o1_p.y <= o2_p.y && o1_p.y + o1_s.y >= o2_p.y))

    return (col_x(obj1_pos, obj1_size, obj2_pos, obj2_size) || col_x(obj2_pos, obj2_size, obj1_pos, obj1_size))
        && (col_y(obj1_pos, obj1_size, obj2_pos, obj2_size) || col_y(obj2_pos, obj2_size, obj1_pos, obj1_size))
  }

  update () {
    let speed = {x:0, y:0}
    this.turbines.forEach(turbine => {
      if (turbine.type == 'top') {
        if (this.collide(this.player, PLAYER_SIZE, turbine, {x:TURBINE_SIZE, y:TURBINE_SIZE}, true, false) && this.player.y < turbine.y) {
          speed.y -= PLAYER_SPEED
        }
      }
      if (turbine.type == 'bottom') {
        if (this.collide(this.player, PLAYER_SIZE, turbine, {x:TURBINE_SIZE, y:TURBINE_SIZE}, true, false) && this.player.y > turbine.y + TURBINE_SIZE) {
          speed.y += PLAYER_SPEED
         }
      }
      if (turbine.type == 'right') {
        if (this.collide(this.player, PLAYER_SIZE, turbine, {x:TURBINE_SIZE, y:TURBINE_SIZE}, false, true) && this.player.x > turbine.x) {
          speed.x += PLAYER_SPEED
        }
      }
      if (turbine.type == 'left') {
        if (this.collide(this.player, PLAYER_SIZE, turbine, {x:TURBINE_SIZE, y:TURBINE_SIZE}, false, true) && this.player.x < turbine.x + TURBINE_SIZE) {
          speed.x -= PLAYER_SPEED
        }
      }
    })
    this.player.setVelocity(speed.x, speed.y)
    this.player.setRotation(Math.atan2(speed.y, speed.x))

    this.obstacles.forEach(obs => {
      if (this.collide(this.player, PLAYER_SIZE, {x: obs.x + LEFT_SIDE, y:obs.y}, obs.size, true, true)) {
        this.scene.start('LostScene')        
      }
    })
    
    if (this.player.x < LEFT_SIDE + 10 || this.player.y <= 50 || this.player.y >= FULL_Y - 50) {
      this.scene.start('LostScene')
    }
    if (this.player.x >= FULL - 50) {
      this.scene.start('WonScene')
    }
  }
}
