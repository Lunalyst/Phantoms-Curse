/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
//tiles set variables
let keyA;
let keyW;
let keyD;
let keyS;
let space;
let player1;
let slimes;
let healthDisplay;
let grabbed = false;
let mycamera;
let spawnedEnemys = false;
let that;
let KeyDisplay;


enemyInfo = {
  width: 90,
  height: 90,
  offset: {
    top: 150,
    left: 60
  },
  padding: 20
};
class forestHomeLevel extends Phaser.Scene {
  
  constructor(){
    // scene settings
    super({key: 'forestHome',active: true,physics:{default:'arcade'}});
    }

    preload(){
      //loads all sprites and sprite sheets to be used later in game
      //load in the source bitmap file from Tiled
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.7.png");
      //load in the JSON file for the bitmap
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      this.load.spritesheet("malePlayer" , "assets/Protag Henry.png" , {frameWidth: 68 , frameHeight: 68 });
      this.load.image('background', 'assets/ForestBackground.png');
      this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 270 , frameHeight: 75 });
      this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
      this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
    }

    create(){
    console.log("activating scene");
    // allows detection of key inputs for movement and player attacks
     keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
     keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
     keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
     keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
     space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
   //controls the Background
    let backround = this.add.sprite(450, 0, "background");
    backround.setScale(3,3);
    //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
    let myMap = this.make.tilemap({ key: "map" });
    //creates a new level object which is used to display map. sends scene and mapdata
    let processMap = new level(this,myMap);
    //calls function that loads the tiles from the json
    processMap.setTiles();
    //creates a new player object calling the player class and sending it the scene, xpos, and y pos.
    player1 = new player(this,450,600);
    slimes = this.physics.add.group();
    // creates a health bar object
    healthDisplay = new hpBar(this,250,180,'healthBar');
    KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts')
    KeyDisplay.visible = false;
    //java script being java script an allowing for the acess of a global variable in the player class to be acessed in foresthomelevel.
    this.physics.add.collider(player1, processMap.layer1);
    this.physics.add.collider(processMap.layer1, slimes);
    //sets up camera to follow player.
    mycamera = this.cameras.main;
    mycamera.startFollow( player1 );
    mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels); 
    this.cameras.main.zoom = 1.5;
    that = this;
      setTimeout(function(){
        that.initSlimes(600, 600, 2);
        spawnedEnemys = true;
      },1000);
    }

    update(){
      //calls built in move player function to handle how the player moves and is animated while moving
      if(grabbed === false){   
      player1.movePlayer(keyA,keyD,space, player1.playerPreviousY);
      healthDisplay.setScale(.6);
        healthDisplay.x = 250;
        healthDisplay.y = 180;
      slimes.children.each(function (tempSlime){
        tempSlime.moveSlime(player1);
        if(that.checkOverlap(player1,tempSlime) && tempSlime.grabCoolDown === 0){
          tempSlime.setVelocityX(0);
          player1.setVelocityX(0);
          tempSlime.slimeGrab(player1,healthDisplay,keyA,this,KeyDisplay);
          grabbed = true;
          tempSlime.grabCoolDown = 300;
          console.log('player grabbed by slime');
        }else if(tempSlime.grabCoolDown > 0){
          tempSlime.grabCoolDown--;
        }
      },this);
      mycamera.startFollow(player1);
      this.cameras.main.zoom = 1.5;
      }else if(grabbed === true){
        healthDisplay.setScale(.3);
        healthDisplay.x = 350;
        healthDisplay.y = 315;
       slimes.children.each(function (tempSlime){
        if(tempSlime.playerGrabbed === true){
          tempSlime.slimeGrab(player1,healthDisplay,keyA,this,KeyDisplay);
          mycamera.startFollow(tempSlime);
          this.cameras.main.zoom = 3;
          grabbed = tempSlime.playerGrabbed;
        }else{
        tempSlime.moveSlimeIdle();  
        }
      },this);
      }
      
      //updates the previous y value. used to animate the falling animation of the player.
      player1.playerPreviousY = player1.y;
      //update the damage cool down if player takes damage.
      if(healthDisplay.damageCoolDown > 0){
        healthDisplay.damageCoolDown--;
        }
    
    }

    initSlimes(startX, startY, amount) {
      for (let row = 0; row < amount; row++) {
        var enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
        var that = this;
          let slime1 = new blueSlime(that,enemyX,startY);
          slimes.add(slime1);
        
      }
    }

    checkOverlap(spriteA, spriteB) {
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();
      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }
    
}
  

  

  
  
