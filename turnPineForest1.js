/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
contains info about saving.
*/
//tiles set variables

// note to self. when passing variables into my classes as parameters it may be benificial to give them different names in the function deffinition
// that might be causing the issue where KeyA, KeyD and key Display are not working half the dam time

let forestLevel1That;
class turnPineForest1 extends Phaser.Scene {
  
  constructor(){
    // scene settings
    super({key: 'Forestlevel1',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene
    this.keyA;
    this.keyW;
    this.keyD;
    this.keyS;
    this.space;
    this.shift;
    this.player1;
    this.slimes;
    this.healthDisplay;
    this.grabbed = false;
    this.mycamera;
    this.spawnedEnemys = false;
    this.KeyDisplay;
    this.skipIndicator;
    this.slimeId = 0;
    this.grabCoolDown;
    this.processMap;
    this.backround;
    this.myMap;
    this.activateFunctions;
    this.warp1;
    this.safeToLoad;
    this.loadCoolDown = false;
    this.warpToX = 450;
    this.warpToY = 600;
    this.portals;
    this.portalId = 0;
    this.activatedPortalId = 0;
    this.playerInventory;
    this.inventoryArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.inventoryDataArray;
    this.index = 0;
    this.grabCoolDown = 0;
    this.attackHitBox;
    }

    preload(){
      //loads all sprites and sprite sheets to be used later in game
      //load in the source bitmap file from Tiled
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
      //load in the JSON file for the bitmap
      this.load.tilemapTiledJSON("Forestlevel1Map" , "assets/tiledMap/Forestlevel1.json");
      this.load.image('backgroundForest', 'assets/titleScreenBackground.png');
      //loads sprites.
      this.load.spritesheet("malePlayer" , "assets/Protag Henry.png" , {frameWidth: 80 , frameHeight: 80});
      this.load.image('backgroundForest', 'assets/ForestBackground.png');
      this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 270 , frameHeight: 75 });
      this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
      this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
      this.load.image('TABToSkip', 'assets/tabToSkip.png');
      this.load.spritesheet('forestWarp', 'assets/GroundForestWarp.png',{frameWidth: 80 , frameHeight: 80 });
      this.load.spritesheet('inventory', 'assets/Inventory.png',{frameWidth: 600 , frameHeight: 425 });
      this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 32 , frameHeight: 32 });
      this.load.image('hitbox', 'assets/hitbox.png');
    }

    create(){
    console.log("activating scene turn pine forest1");
    // allows detection of key inputs for movement and player attacks
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
    //creates a functions object to call the generalized functions i dont want to copy paste on each gameplay scene
    this.activateFunctions = new allSceneFunctions;
     // creates a health bar object, needs to be ahead of loading data so that the warped hp value can be set.
    this.healthDisplay = new hpBar(this,250,180,'healthBar');
       //reads save file
    this.activateFunctions.loadGame(this);
   //controls the Background
    this.backround = this.add.tileSprite(450, 520, 10000, 3000, "backgroundForest");
    this.backround.setScale(2,2);
    //sets the size of backround image
    //creates a tilemap to be sent into the level class.the key value must match the key given to the json file.

     //creates a player inventory object
     this.playerInventory = new inventory(this,420,380,"inventory");

     this.playerInventory.generateSlots(this);
      
    this.playerInventory.applyInteractionToSlots(this);
    this.grabbed = false;

    this.myMap = this.make.tilemap({ key: "Forestlevel1Map" });
    //creates a new level object which is used to display map. sends scene and mapdata
    this.processMap = new level(this,this.myMap);
    //defines the tile set to be used when generating level
    this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
    //calls function that loads the tiles from the json
    this.processMap.setTiles();

    this.player1 = new player(this,this.warpToX,this.warpToY);
    this.player1.visable = true;
    this.attackHitBox = new hitBoxes(this,this.player1.x,this.player1.y);
    //creates a group of slime objects
    this.slimes = this.physics.add.group();
    // creates a health bar object
    this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
    this.KeyDisplay.visible = false;
    this.skipIndicator = this.add.sprite(450, 550,'TABToSkip');
    this.skipIndicator.visible = false;
    this.skipIndicator.setScrollFactor(0);
    //java script being java script an allowing for the acess of a global variable in the player class to be acessed in foresthomelevel.
    //adds colliders to player as well as slimes to the tiled level
    this.physics.add.collider(this.player1,this.processMap.layer1);
    this.physics.add.collider(this.player1,this.processMap.layer0);
    this.physics.add.collider(this.processMap.layer1, this.slimes);
    //sets up camera to follow player.
    this.mycamera = this.cameras.main;
    this.mycamera.startFollow(this.player1 );
    this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
    this.cameras.main.zoom = 1.5;
    //sets the scene this to that so that it can be used in other places that this would be out of scope.
    forestLevel1That = this;
    //creates a warp sprite object

    this.portals = this.physics.add.group();
    this.activateFunctions.initPortals(420,1540,this,2813,517,0);
    this.activateFunctions.initPortals(4373,1253,this,396,580,0);
    
    //important for checking if its safe to warp player.
    this.safeToLoad = false;
    //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
        //generates enemys
        forestLevel1That.activateFunctions.initSlimes(3280, 1510, 3,forestLevel1That);
        forestLevel1That.activateFunctions.initSlimes(1895, 1240, 1,forestLevel1That);
        forestLevel1That.spawnedEnemys = true;
      },500);
      this.loadCoolDown = false;
      setTimeout(function(){
        forestLevel1That.loadCoolDown = true;
      },1000);
    }

    update(){
      //this.backround.y = this.player1.y;
      //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
      console.log("grabbed:"+ this.grabbed);
      console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      if(this.grabbed === false){ 
        //calls built in move player function to handle how the player moves and is animated while moving  
        if(!this.shift.isDown){
          this.player1.movePlayer(this.keyA,this.keyD,this.space, this.player1.playerPreviousY);
          }
        //changes the scale and location of the health bar for zoomed out camera
        this.healthDisplay.zoomedOut();
        //makes a function applied to all slime entities
        this.KeyDisplay.visible = false;
        //applies a function to every slime object by calling the blueSlimeCollisions function.
        this.activateFunctions.checkBlueSlimeInteractions(forestLevel1That);
        ///this.blueSlimeCollisions();//HERE
        //sets the camera to follow the player and changes the scale as well
        this.mycamera.startFollow(this.player1);
        this.cameras.main.zoom = 1.5;
        //checks if player is over a warp point and sends them to the correct location
        console.log("this.loadCoolDown: "+ this.loadCoolDown);
        if(this.loadCoolDown === true){
          this.activateFunctions.checkWarp(this,"forestHome");
        }
        if(this.keyTAB.isDown){
          this.playerInventory.setView(this);
        }

        this.player1.attackPlayer(this.shift,this);
      }else if(this.grabbed === true){
        if(this.playerInventory.isOpen === true){
          this.playerInventory.setView(this);
        }
        //if the player is grabbed then zoom camera in and edit ui elements to fit the screen
        //applies a function to each slime that calls the grab function. only works 
        this.activateFunctions.checkBlueSlimeGrab(forestLevel1That);
      }
      //updates the previous y value. used to animate the falling animation of the player.
      this.player1.playerPreviousY = this.player1.y;
      //update the damage cool down if player takes damage.
      if(this.healthDisplay.damageCoolDown > 0){
        this.healthDisplay.damageCoolDown--;
        }
    
    }

    // function that makes slimes in a row.

    changeToGameover(){
      this.myMap.destroy();
      this.processMap.destroy();
      this.scene.start('gameOverForest');
    }
    
}