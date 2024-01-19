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
      
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      
      //preload of object which are scene specific
      this.load.spritesheet('backgroundForestLevel', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
      
      this.defaultPreload();
    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");
      this.loadGame();

      //controls the Background
      this.backround = this.add.tileSprite(0, 100, 10000, 3000, "backgroundForestLevel");
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("map","Tile Set V.0.8","source_map");
    
      //creates player object
      this.setUpPlayer();

      //creates a group of slime objects
      this.slimes = this.physics.add.group();

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();
      this.setUpSlimeCollider();

      //sets up the player camera
      this.setUpPlayerCamera();
      
      //sets the scene this to that so that it can be used in other places that this would be out of scope.
      tutorialBeachThat = this;
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      
      
      this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSigns(1280,554,
        "War has changed. It's no longer about nations, ideologies, or ethnicity. It's an endless series of proxy battles fought by mercenaries and machines. War - and its consumption of life - has become a well-oiled machine. War has changed. ID-tagged soldiers carry ID-tagged weapons, use ID-tagged gear. Nanomachines inside their bodies enhance and regulate their abilities. Genetic control. Information control. Emotion control. Battlefield control. Everything is monitored and kept under control. War has changed. The age of deterrence has become the age of control... All in the name of averting catastrophe from weapons of mass destruction. And he who controls the battlefield... controls history. War has changed. When the battlefield is under total control... War becomes routine.",
        ['randiMad','randiBlush','randiMad','randiSquish','randiShocked','randiShifty','randiSquish','randiMad','randiMad','randiBlush','randiMad','randiSquish','randiShocked']);
      this.initSigns(1380,554,
        " i’ll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.",
        ['randiMad','randiBlush']);
        
      

      this.safeToLoad = false;
      this.safeToSave = false;
      this.grabCoolDown = false;

      // stops user from warping so fast. after a second of being loaded the player can load zones.
      this.loadCoolDown = false;
      this.saveCoolDown = false;
      this.signCoolDown = false;
      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
        setTimeout(function(){
          //generates enemys
          tutorialBeachThat.initSlimes(300, 500, 1,tutorialBeachThat.playerSex);
          tutorialBeachThat.initSlimes(300, 500, 1,tutorialBeachThat.playerSex);
          tutorialBeachThat.initSlimes(2380, 500, 1,tutorialBeachThat.playerSex);
      
          tutorialBeachThat.spawnedEnemys = true;
        },1000);
        
        setTimeout(function(){
          tutorialBeachThat.loadCoolDown = true;
        },1000);
        setTimeout(function(){
          tutorialBeachThat.saveCoolDown = true;
        },1000);
        setTimeout(function(){
          tutorialBeachThat.signCoolDown = true;
        },1000);
        //console.log("warpToX:"+ this.warpToX +" warpToY: "+this.warpToY );
        // this delays grab when loading into the scene.
        setTimeout(function(){
          tutorialBeachThat.grabCoolDown = false;
          console.log("grab cooldown has ended. player can be grabbed agian.");
          },3000);
    }

    update(){
      //console.log("this.backroundTimer: "+this.backroundTimer);
      
      this.animateBackround();
      
      //this.backround.y = this.player1.y;
    //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
    //console.log("grabbed:"+ this.grabbed);
    //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

    if(this.loadCoolDown === true){
      this.checkWarp("Forestlevel1");
    }
    if(this.saveCoolDown === true){
      this.checkSave("Forestlevel1");
    }
    if(this.signCoolDown === true){
      this.checkSign(this);
    }
    //accessTabKey.on(tabKey.isTabDown,(isDown)
    if(this.keyTAB.isDown && this.grabbed === false && this.pausedInTextBox === false){
      //console.log("tabKey Pressed");
      //this.playerInventory.setView(this);
      //inventoryKeyEmitter.on(inventoryKey.activateWindow,()
      inventoryKeyEmitter.emit(inventoryKey.activateWindow,this);
      this.checkBlueSlimePause();
      //this.player1.pausePlayerPhysics(this);
    }else{
      this.checkBlueSlimePause();
    }

    if(this.pausedInTextBox === true){
      this.sceneTextBox.activateTextBox(this,this.keyW,this.isPaused,this.pausedInTextBox);
      this.checkBlueSlimePause();
      this.physics.pause();
      this.player1.anims.pause();

      let isWindowObject = {
        isOpen: null
      };
      
      inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

      if(isWindowObject.isOpen === true){
        inventoryKeyEmitter.emit(inventoryKey.activateWindow,this);
      }
    }else if(this.pausedInTextBox === false && this.isPaused === false){
      this.checkBlueSlimePause();
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
        //applies a function to every slime object by calling the blueSlimeCollisions function.
        this.checkBlueSlimeInteractions(this);
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
        this.checkBlueSlimeGrab();
      }

  }else if(this.isPaused === true){

  }
    //updates the previous y value. used to animate the falling animation of the player.
    this.player1.playerPreviousY = this.player1.y;
    //update the damage cool down if player takes damage.
    
  
  }

}
  

  
