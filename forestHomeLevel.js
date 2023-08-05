/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
contains info about saving.
*/
//tiles set variables

// note to self. when passing variables into my classes as parameters it may be benificial to give them different names in the function deffinition
// that might be causing the issue where KeyA, KeyD and key Display are not working half the dam time

enemyInfo = {
  width: 90,
  height: 90,
  offset: {
    top: 150,
    left: 60
  },
  padding: 0
};

let forestHomeThat;
class forestHomeLevel extends Phaser.Scene {
  
  constructor(){
    // scene settings
    super({key: 'forestHome',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene
    this.keyA;
    this.keyW;
    this.keyD;
    this.keyS;
    this.space;
    this.player1;
    this.slimes;
    this.healthDisplay;
    this.grabbed = false;
    this.mycamera;
    this.spawnedEnemys = false;
    this.KeyDisplay;
    this.skipIndicator;
    this.slimeId = 0;
    this.processMap;
    this.backround;
    this.myMap;
    }

    preload(){
      //loads all sprites and sprite sheets to be used later in game
      //load in the source bitmap file from Tiled
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.7.png");
      //load in the JSON file for the bitmap
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");
      //loads sprites.
      this.load.spritesheet("malePlayer" , "assets/Protag Henry.png" , {frameWidth: 68 , frameHeight: 68 });
      this.load.image('background', 'assets/ForestBackground.png');
      this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 270 , frameHeight: 75 });
      this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
      this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
      this.load.image('TABToSkip', 'assets/tabToSkip.png');
    }

    create(){
    console.log("activating scene");
    // allows detection of key inputs for movement and player attacks
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
   //controls the Background
    this.backround = this.add.sprite(450, 0, "background");
    //sets the size of backround image
    this.backround.setScale(3,3);
    //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
    this.myMap = this.make.tilemap({ key: "map" });
    //creates a new level object which is used to display map. sends scene and mapdata
    this.processMap = new level(this,this.myMap);
    //calls function that loads the tiles from the json
    this.processMap.setTiles();
    //creates a new player object calling the player class and sending it the scene, xpos, and y pos.
    this.player1 = new player(this,450,600);
    //creates a group of slime objects
    this.slimes = this.physics.add.group();
    // creates a health bar object
    this.healthDisplay = new hpBar(this,250,180,'healthBar');
    this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
    this.KeyDisplay.visible = false;
    this.skipIndicator = this.add.sprite(450, 550,'TABToSkip');
    this.skipIndicator.visible = false;
    this.skipIndicator.setScrollFactor(0);
    //java script being java script an allowing for the acess of a global variable in the player class to be acessed in foresthomelevel.
    //adds colliders to player as well as slimes to the tiled level
    this.physics.add.collider(this.player1,this.processMap.layer1);
    this.physics.add.collider(this.processMap.layer1, this.slimes);
    //sets up camera to follow player.
    this.mycamera = this.cameras.main;
    this.mycamera.startFollow(this.player1 );
    this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
    this.cameras.main.zoom = 1.5;
    //sets the scene this to that so that it can be used in other places that this would be out of scope.
    forestHomeThat = this;
    //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
        //generates enemys
        forestHomeThat.initSlimes(700, 650, 1);
        forestHomeThat.initSlimes(700, 550, 1);
        forestHomeThat.initSlimes(50, 450, 1);
        forestHomeThat.spawnedEnemys = true;
      },1000);
    }

    update(){
      //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
      if(this.grabbed === false){ 
        //calls built in move player function to handle how the player moves and is animated while moving  
        this.player1.movePlayer(this.keyA,this.keyD,this.space, this.player1.playerPreviousY);
        //changes the scale and location of the health bar for zoomed out camera
        this.healthDisplay.zoomedOut();
        //makes a function applied to all slime entities
        this.KeyDisplay.visible = false;
        //applies a function to every slime object by calling the blueSlimeCollisions function.
        this.blueSlimeCollisions();
        //sets the camera to follow the player and changes the scale as well
        this.mycamera.startFollow(this.player1);
        this.cameras.main.zoom = 1.5;

      }else if(this.grabbed === true){
        //if the player is grabbed then zoom camera in and edit ui elements to fit the screen
       this.healthDisplay.zoomIn();
        //applies a function to each slime that calls the grab function. only works 
       this.slimes.children.each(function (tempSlime){
          if(tempSlime.playerGrabbed === true){
            //remeber this function is called twice. once when grab hamppens and agian when the update loop has this.grabbed set to true.
            tempSlime.slimeGrab(forestHomeThat.player1,forestHomeThat.healthDisplay,forestHomeThat.keyA,forestHomeThat.KeyDisplay,forestHomeThat.keyD,forestHomeThat,forestHomeThat.keyTAB);
            //focuses on slime that grabbed character and zooms ui elements.
            this.mycamera.startFollow(tempSlime);
            this.cameras.main.zoom = 3;
            this.grabbed = tempSlime.playerGrabbed;
          }else{
          //if slime didn't grab player but player was grabbed then play idle animation.
          tempSlime.moveSlimeIdle();  
          }
        },this);
      }
      
      //updates the previous y value. used to animate the falling animation of the player.
      this.player1.playerPreviousY = this.player1.y;
      //update the damage cool down if player takes damage.
      if(this.healthDisplay.damageCoolDown > 0){
        this.healthDisplay.damageCoolDown--;
        }
    
    }

    // function that makes slimes in a row.
    initSlimes(startX, startY, amount) {
      for (let row = 0; row < amount; row++) {
        var enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
        var forestHomeThat = this;
          let slime1 = new blueSlime(forestHomeThat,enemyX,startY);
          //id is important for slime combine function. since when the slimes collide symultaniously it needs a way to tell if
          //slime is destroyed or becomes a large slime. if the id is higher on the slime then that one becomes a larger slime
          slime1.slimeId = this.slimeId;
          this.slimeId++;
          console.log("slime id: "+ this.slimeId);
          this.slimes.add(slime1);
        
      }
    }

    blueSlimeCollisions(){
      //applies functions to all slimes in the group.
      this.slimes.children.each(function (tempSlime){
        //calls to make each instance of a slime move.
        tempSlime.moveSlime(this.player1);
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        this.physics.add.overlap(this.player1, tempSlime,function(){
          //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
          if(tempSlime.grabCoolDown  === 0 && tempSlime.mitosing === false){
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              forestHomeThat.player1.setVelocityX(0);
              //calls the grab function
              tempSlime.slimeGrab(forestHomeThat.player1,forestHomeThat.healthDisplay,forestHomeThat.keyA,forestHomeThat.KeyDisplay,forestHomeThat.keyD,forestHomeThat,forestHomeThat.keyTAB);
              //sets the scene grab value to true since the player has been grabbed
              forestHomeThat.grabbed = true;
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = 300;
              console.log('player grabbed by slime');
            }
        });
        //if the slime is size 1 then it checks for overlap between slimes. then if the collide they fuse together and play combination animation
        if(tempSlime.slimeSize === 1){
          //creates another function applies to the slimes so that there are two instances of a function being applied
          this.slimes.children.each(function (tempSlime1){
              // collider used to detect a collision between two slimes
              this.physics.add.collider(tempSlime1, tempSlime,function(){
                // if both slimes are of size 1 then call combine function
                  if(tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1){
                  tempSlime.slimeCombine(tempSlime1,forestHomeThat.grabbed);
                  }
              });
          },this);
        }
        //deincriments the grabcooldown on any slime that grabbed the player.
        if(tempSlime.grabCoolDown > 0){
          tempSlime.grabCoolDown--;
        }
        tempSlime.mitosisDelayCheck();
      },this);

    }

    changeToGameover(){
      this.myMap.destroy();
      this.processMap.destroy();
      this.scene.start('gameOverForest');
    }
    
}
  

  

  
  
