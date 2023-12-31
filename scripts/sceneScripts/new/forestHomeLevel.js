/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
contains info about saving.
https://phaser.discourse.group/t/tiled-tilemap-partially-invisible-but-no-console-errors/4079
*/
//for jumping through tiles 
//https://www.html5gamedevs.com/topic/40484-jump-through-a-tile-from-underneath/
//tiles set variables

//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-textbox/
// text boxes for dialogue and uielements

// note to self. when passing variables into my classes as parameters it may be benificial to give them different names in the function deffinition
// that might be causing the issue where KeyA, KeyD and key Display are not working half the dam time

//import { Scene } from '@phaser-plus/core'
//import { Debugger } from '@phaser-plus/debugger'

let forestHomeThat;
class forestHomeLevel extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'forestHome',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    this.slimes;
    this.slimeId = 0;

    

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");

      //preload of object which are scene specific
      this.load.spritesheet('backgroundForestLevel', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

    }

    create(){

    this.createStockSceneVariables();
    

   
    this.backround = this.add.tileSprite(0, 100, 10000, 3000, "backgroundForestLevel");
    
    
    //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
    this.myMap = this.make.tilemap({ key: "map" });
    //creates a new level object which is used to display map. sends scene and mapdata
    this.processMap = new level(this,this.myMap);
    //defines the tile set to be used when generating level
    this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
    //calls function that loads the tiles from the json
    this.processMap.setTiles("source_map");
    //creates a new player object calling the player class and sending it the scene, xpos, and y pos.
    

    //creates a group of slime objects
    this.slimes = this.physics.add.group();

    //java script being java script an allowing for the acess of a global variable in the player class to be acessed in foresthomelevel.
    //adds colliders to player as well as slimes to the tiled level
    this.physics.add.collider(this.player1,this.processMap.layer1);
    this.physics.add.collider(this.player1,this.processMap.layer0);
    this.physics.add.collider(this.processMap.layer1, this.slimes);
    this.physics.add.collider( this.slimes, this.slimes);

    
    //sets up camera to follow player.
    this.mycamera = this.cameras.main;
    this.mycamera.startFollow(this.player1 ,false,0,0,10000,10000);
    this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
    this.cameras.main.followOffset.set(0,-1500);
    console.log("this.mycamera: ", this.mycamera)
    //this.cameras.main.zoom = 1;*/
    
    
    
    //sets the scene this to that so that it can be used in other places that this would be out of scope.
    forestHomeThat = this;

    //creates a warp sprite and gives it a tag to tell it where to send the player.
    this.portals = this.physics.add.group();
    //this.activateFunctions.initPortals(2813,517,this,420,1540,0);
    //this.activateFunctions.initPortals(396,580,this,4373,1253,0);
    //sets safetoload false by default.
    //same as we generate save stones the same way.
    //this.saveStonePoints = this.physics.add.group();
    this.activateFunctions.initSavePoints(2050,558,this);
      // as well as signs.
    //this.signPoints = this.physics.add.group();
    this.activateFunctions.initSigns(1280,554,this,
      "War has changed. It's no longer about nations, ideologies, or ethnicity. It's an endless series of proxy battles fought by mercenaries and machines. War - and its consumption of life - has become a well-oiled machine. War has changed. ID-tagged soldiers carry ID-tagged weapons, use ID-tagged gear. Nanomachines inside their bodies enhance and regulate their abilities. Genetic control. Information control. Emotion control. Battlefield control. Everything is monitored and kept under control. War has changed. The age of deterrence has become the age of control... All in the name of averting catastrophe from weapons of mass destruction. And he who controls the battlefield... controls history. War has changed. When the battlefield is under total control... War becomes routine.",
      ['randiMad','randiBlush','randiMad','randiSquish','randiShocked','randiShifty','randiSquish','randiMad','randiMad','randiBlush','randiMad','randiSquish','randiShocked']);
    this.activateFunctions.initSigns(1380,554,this,
      " i’ll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.",
      ['randiMad','randiBlush']);
    this.sceneTextBox = new textBox(this,450,620,'textBox');
    

    //this.safeToLoad = false;
    //this.safeToSave = false;
    //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
        //generates enemys
        forestHomeThat.activateFunctions.initSlimes(300, 500, 1,forestHomeThat,forestHomeThat.playerSex);
        //forestHomeThat.activateFunctions.initSlimes(300, 500, 1,forestHomeThat,forestHomeThat.playerSex);
        //forestHomeThat.activateFunctions.initSlimes(2380, 500, 1,forestHomeThat,forestHomeThat.playerSex);

        forestHomeThat.spawnedEnemys = true;
      },1000);

      setTimeout(function(){
        forestHomeThat.loadCoolDown = true;
      },1000);
      setTimeout(function(){
        forestHomeThat.saveCoolDown = true;
      },1000);
      setTimeout(function(){
        forestHomeThat.signCoolDown = true;
      },1000);
      
      setTimeout(function(){
        forestHomeThat.grabCoolDown = false;
        console.log("grab cooldown has ended. player can be grabbed agian.");
        },3000);

    }

    update(){
      //console.log("this.backroundTimer: "+this.backroundTimer);
      
      this.activateFunctions.animateBackround(this);
      
      //this.backround.y = this.player1.y;
    //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
    //console.log("grabbed:"+ this.grabbed);
    //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

    if(this.loadCoolDown === true){
      this.activateFunctions.checkWarp(this,"Forestlevel1");
    }
    if(this.saveCoolDown === true){
      this.activateFunctions.checkSave(this,"Forestlevel1");
    }
    if(this.signCoolDown === true){
      this.activateFunctions.checkSign(this,"Forestlevel1");
    }
    //accessTabKey.on(tabKey.isTabDown,(isDown)
    if(this.keyTAB.isDown && this.grabbed === false && this.pausedInTextBox === false){
      //console.log("tabKey Pressed");
      //this.playerInventory.setView(this);
      //inventoryKeyEmitter.on(inventoryKey.activateWindow,()
      inventoryKeyEmitter.emit(inventoryKey.activateWindow,this);
      this.activateFunctions.checkBlueSlimePause(this);
      //this.player1.pausePlayerPhysics(this);
    }else{
      this.activateFunctions.checkBlueSlimePause(this);
    }

    if(this.pausedInTextBox === true){
      this.sceneTextBox.activateTextBox(this,this.keyW,this.isPaused,this.pausedInTextBox);
      this.activateFunctions.checkBlueSlimePause(this);
      this.physics.pause();
      this.player1.anims.pause();
      if(this.playerInventory.isOpen === true){
         this.playerInventory.setView(this);
      }
    }else if(this.pausedInTextBox === false && this.isPaused === false){
      this.activateFunctions.checkBlueSlimePause(this);
      this.physics.resume();
      this.player1.anims.resume();
    }


    if(this.isPaused === false){
      if(this.grabbed === false){ 
        //calls built in move player function to handle how the player moves and is animated while moving  
        if(!this.shift.isDown){
        this.player1.movePlayer(this.keyA,this.keyD,this.space, this.player1.playerPreviousY,this);
        }
        //changes the scale and location of the health bar for zoomed out camera
        //this.healthDisplay.zoomedOut();
        //makes a function applied to all slime entities
        //this.portals.hidePrompt
        //this.activateFunctions.checkWarpPrompts(forestHomeThat);
        //this.activateFunctions.checkSavePrompts(forestHomeThat);
        //applies a function to every slime object by calling the blueSlimeCollisions function.
        this.activateFunctions.checkBlueSlimeInteractions(forestHomeThat);
        ///this.blueSlimeCollisions();//HERE
        //sets the camera to follow the player and changes the scale as well
        this.mycamera.startFollow(this.player1);
        this.cameras.main.zoom = 2;
        this.cameras.main.followOffset.set(0,70);
        //checks if player is over a warp point and sends them to the correct location
        //console.log("this.loadCoolDown: "+ this.loadCoolDown);
        
        //if play hits tab and not grabbed open inventory.
        
          this.player1.attackPlayer(this.shift,this);

      }else if(this.grabbed === true){
        //if the player is grabbed then zoom camera in and edit ui elements to fit the screen
        //applies a function to each slime that calls the grab function. only works 
        //before activating grab, closes inventory if its open.
        //this.healthDisplay.zoomIn();
        let isWindowObject = {
          isOpen: null
        };
        
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

        if(isWindowObject.isOpen === true){
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
        }
        this.activateFunctions.checkBlueSlimeGrab(forestHomeThat);
      }

  }else if(this.isPaused === true){

  }
    //updates the previous y value. used to animate the falling animation of the player.
    this.player1.playerPreviousY = this.player1.y;
    //update the damage cool down if player takes damage.
    
  
  }

}
  

  
