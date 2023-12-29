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

    this.processMap;
    this.myMap;
    //defines scene specific variables
    this.slimes;
    this.slimeId = 0;

    }

    preload(){
      //loads all sprites and sprite sheets to be used later in game
      //load in the source bitmap file from Tiled
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
      //load in the JSON file for the bitmap
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");
      //this might load the save file.json
      //this.load.json("saveFile","saveFile.json");
      //loads sprites.
      // could just define player sprite here.
      this.load.spritesheet("malePlayer" , "assets/evan_master.png" , {frameWidth: 213 , frameHeight: 270 });
      this.load.spritesheet("femalePlayer" , "assets/evelyn_master.png" , {frameWidth: 213 , frameHeight: 270 });
      this.load.spritesheet('backgroundForestLevel', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
      this.load.spritesheet('inventory', 'assets/Inventory.png',{frameWidth: 600 , frameHeight: 425 });
      this.load.spritesheet('inventoryBorder', 'assets/inventoryBorder.png',{frameWidth: 600 , frameHeight: 425 });
      this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 32 , frameHeight: 32 });
      this.load.spritesheet('slotDiscriptions', 'InventorySlotDiscriptions.png',{frameWidth: 32 , frameHeight: 32 });
      this.load.image('hitbox', 'assets/hitbox.png');
      this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
      this.load.spritesheet('hpBarAmount', 'assets/hpBarAmount.png',{frameWidth: 291, frameHeight: 57 });
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
      this.load.image('TABToSkip', 'assets/tabToSkip.png');
      this.load.spritesheet('forestWarp', 'assets/GroundForestWarp.png',{frameWidth: 80 , frameHeight: 80 });
      this.load.spritesheet('bestiary', 'assets/bestiary.png',{frameWidth: 462, frameHeight: 630 });
      this.load.spritesheet('UIControls', 'assets/UIControls.png',{frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('savePoint', 'assets/saveStatue.png',{frameWidth: 71, frameHeight: 100 });
      this.load.spritesheet('inventoryLabels', 'assets/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
      this.load.spritesheet('sign', 'assets/Sign.png',{frameWidth: 99, frameHeight: 135 });
      this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
      this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
      this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
      this.load.spritesheet('doubleJumpEffect', 'assets/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
      this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });
    
    
    }

    create(){


      //function apart of default scene which sets up the variable definitions and other things that all scenes should create on start up
      this.createStockSceneVariables();

      //controls the Background
      this.backround = this.add.tileSprite(0, 100, 10000, 3000, "backgroundForestLevel");
    
      //creates a group of slime objects
      this.slimes = this.physics.add.group();
        
      //adds colliders for the enemies in the level
      this.physics.add.collider(this.processMap.layer1, this.slimes);
      this.physics.add.collider( this.slimes, this.slimes);
        
      //sets the scene this to that so that it can be used in other places that this would be out of scope.
      forestHomeThat = this;
      //this.activateFunctions.initPortals(2813,517,this,420,1540,0);
      //this.activateFunctions.initPortals(396,580,this,4373,1253,0);
      //sets safetoload false by default.
        
      this.activateFunctions.initSavePoints(2050,558,this);
            
      this.activateFunctions.initSigns(1280,554,this,
            "War has changed. It's no longer about nations, ideologies, or ethnicity. It's an endless series of proxy battles fought by mercenaries and machines. War - and its consumption of life - has become a well-oiled machine. War has changed. ID-tagged soldiers carry ID-tagged weapons, use ID-tagged gear. Nanomachines inside their bodies enhance and regulate their abilities. Genetic control. Information control. Emotion control. Battlefield control. Everything is monitored and kept under control. War has changed. The age of deterrence has become the age of control... All in the name of averting catastrophe from weapons of mass destruction. And he who controls the battlefield... controls history. War has changed. When the battlefield is under total control... War becomes routine.",
            ['randiMad','randiBlush','randiMad','randiSquish','randiShocked','randiShifty','randiSquish','randiMad','randiMad','randiBlush','randiMad','randiSquish','randiShocked']);
      this.activateFunctions.initSigns(1380,554,this,
            " i’ll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.",
            ['randiMad','randiBlush']);
      this.sceneTextBox = new textBox(this,450,620,'textBox');
        
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
        setTimeout(function(){
          //generates enemys
          forestHomeThat.activateFunctions.initSlimes(300, 500, 1,forestHomeThat,forestHomeThat.playerSex);
          forestHomeThat.activateFunctions.initSlimes(300, 500, 1,forestHomeThat,forestHomeThat.playerSex);
          forestHomeThat.activateFunctions.initSlimes(2380, 500, 1,forestHomeThat,forestHomeThat.playerSex);
            
            
          forestHomeThat.spawnedEnemys = true;
          },1000);
            // stops user from warping so fast. after a second of being loaded the player can load zones.
    
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
  

  
