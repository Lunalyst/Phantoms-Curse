//tiles set variables
var myMap;
var g_grid;
var mylayer1;
var finder;
var player;
var frontLayer;

let title = {
    key: 'title',
    active: true,
    preload: titlePreload,
    create: titleCreate,
    update: titleUpdate
  };
  
  let gamePlayScene = {
    key: 'gamePlayScene',
    active: false,
    preload: gamePreload,
    create: gameCreate,
    update: gameUpdate
  };

let config = {
    //list of property names and there associated values.
    width: 900,
    height: 900, 
    //3200 w by 1920 h for world borders
    type: Phaser.WEBGL,
    physics: {
      default: 'arcade',
      arcade: {
        //gravity:{y:300},
        // debug is excelent for testing velocity and hitboxes.
        debug: false
      }
    },
    scene: [gamePlayScene],//multiple scenes
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    } // scale manager used to scale game up to fit display 
  }
  let Game = new Phaser.Game(config);
  function gamePreload(){
    //loads all sprites and sprite sheets to be used later in game
  //load in the source bitmap file from Tiled
  this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.7.png");
    //load in the JSON file for the bitmap
   this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
   this.load.spritesheet("malePlayer" , "assets/Protag Henry.png" , {frameWidth: 68 , frameHeight: 68 });
   this.load.image('background', 'assets/ForestBackground.png');
  }

  function  gameCreate() {
    console.log("activating scene");
     // allows detection of key inputs for movement and player attacks
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    //controls the Background
  backround = this.add.sprite(450, 0, "background");
  backround.setScale(3,3);

  myMap = this.make.tilemap({ key: "map" });// the key value must match the key given to the json file. 
// takes the file name of the tileset png and the asset name defined in phaser. connects between the two.
  let myTileSet = myMap.addTilesetImage("Tile Set V.0.7", "source_map"); 
  //first argument is tileset name in Tiled
  layer3 = myMap.createStaticLayer("Tile Layer 3", myTileSet, 0, 0);
  layer2 = myMap.createStaticLayer("Tile Layer 2", myTileSet, 0, 0);
  layer1 = myMap.createStaticLayer("Tile Layer 1", myTileSet, 0, 0);
  layer0 = myMap.createStaticLayer("Tile Layer 0", myTileSet, 0, 0);

  let grid = [];

  let tile;
  /* <MICAH> The collision grid was sideways?  I switched the row/col indexes </MICAH> */
  //a nester array of the tile set tile for the tile map.
  for (let outer = 0; outer < myMap.height; outer++) {
    let row = [];
    for (let inner = 0; inner < myMap.width; inner++) {
      tile = layer1.getTileAt(inner, outer);
      //when pushing data to col you need to specify a layer if there are multiple. otherwise the .index call will result in a error null.
      row.push((tile ? tile.index : 0));
    }
    grid.push(row);
  }
  g_grid = grid;

  let tileset = myMap.tilesets[0];
  let tileprops = tileset.tileProperties;
  let acceptabletiles = [];

  //loop through all tiles to see if tiles are collidable or not.
  acceptabletiles.push(0);

  layer1.setCollisionByProperty({ collision: true });
  // defines the player object and gives it propertys.
  player = this.physics.add.sprite(450,600,"malePlayer");
  //player = this.physics.add.sprite(2400,296,"blag");
  player.custom_id = 'player';// creates a custome property to make it easy to track the identity of the player sprite.
  player.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation
  //player.setBounce(.2);
  player.body.setGravityY(600);
  //changes the hitbox
  player.setSize(23, 70);
  //player.setScale(4);
  //player.setDepth(6);
  this.anims.create({key: 'pLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 15, end: 18 }),frameRate: 12,repeat: -1});
  this.anims.create({key: 'pRight',frames: this.anims.generateFrameNames('malePlayer', { start: 9, end: 12 }),frameRate: 12,repeat: -1});
  this.anims.create({key: 'pJumpLeftUp',frames: this.anims.generateFrameNames('malePlayer', { start: 19, end: 19 }),frameRate: 2,repeat: -1});
  this.anims.create({key: 'pJumpLeftDown',frames: this.anims.generateFrameNames('malePlayer', { start: 20, end: 20 }),frameRate: 2,repeat: -1});
  this.anims.create({key: 'pJumpRightUp',frames: this.anims.generateFrameNames('malePlayer', { start: 13, end: 13 }),frameRate: 2 ,repeat: -1});
  this.anims.create({key: 'pJumpRightDown',frames: this.anims.generateFrameNames('malePlayer', { start: 14, end: 14 }),frameRate: 2 ,repeat: -1});
  this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('malePlayer', { start: 0, end: 8 }),frameRate: 3.5,repeat: -1});
  this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('malePlayer', { start: 21, end: 28 }),frameRate: 1.5,repeat: -1});
 

  this.physics.add.collider(player, layer1);
  let mycamera = this.cameras.main;
  mycamera.startFollow( player );
  mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels);    
  }

  let playerPreviousY = 0;
  function gameUpdate(){

    console.log("player y: "+ player.y);
    //player movement 
    if(keyA.isDown && player.body.blocked.down){
        player.idleTimer = 0;
        player.setVelocityX(-300);
        if(player.body.blocked.down){
          player.anims.play('pLeft',true);
          console.log("moving left");
        }
      } else if(keyD.isDown && player.body.blocked.down){
        player.idleTimer = 0;
        player.setVelocityX(300);
        if(player.body.blocked.down){
         player.anims.play('pRight',true);
         console.log("moving Right");
        }
      }else if(player.idleTimer === 2000){
        player.setVelocityX(0);
        player.anims.play('pSleep',true);
      }else{
        player.setVelocityX(0);
        player.anims.play('pIdle',true);
        if(player.idleTimer < 2000){
          console.log("Idle Timer: "+ player.idleTimer);
          player.idleTimer++;
        }
      }
   //checks to see if player space is down and player is on the ground to activate jump 
  if (space.isDown && player.body.blocked.down){
    player.idleTimer = 0;
    player.setVelocityY(-400);
    console.log(" jumping");
    //checks to see if player is moving left and not touching the ground.
    }else if(keyA.isDown && !player.body.blocked.down){
      console.log("IN AIR AND MOVING LEFT");
      player.setVelocityX(-300);
      
      if(playerPreviousY > player.y){
        player.anims.play('pJumpLeftUp',true);
      }else if(playerPreviousY <= player.y){
        player.anims.play('pJumpLeftDown',true);
      }
    //checks to see if player is moving right and not touching the ground.
    }else if(keyD.isDown && !player.body.blocked.down){
      console.log("IN AIR AND MOVING RIGHT");
      player.setVelocityX(300);
      if(playerPreviousY > player.y){
        player.anims.play('pJumpRightUp',true);
      }else if(playerPreviousY <= player.y){
        player.anims.play('pJumpRightDown',true);
      }
      //does default if jumping without other input
    }else if(!player.body.blocked.down){
      player.idleTimer = 0;
      if(playerPreviousY > player.y){
        player.anims.play('pJumpRightUp',true);
      }else if(playerPreviousY <= player.y){
        player.anims.play('pJumpRightDown',true);
      }
      console.log("in the air");
      }
      playerPreviousY = player.y;
      console.log("previous player y"+ playerPreviousY);
  }

  function titlePreload() {
  }
  function titleCreate() {
  }
  function titleUpdate() {
  
}