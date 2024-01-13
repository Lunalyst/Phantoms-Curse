

let HomeInterior2That;
class HomeInterior2 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'HomeInterior2',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "HomeInterior2";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    //this.slimes;
    //this.slimeId = 0;

    

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("source_map" , "assets/tiledMap/LockWood/Forest_Large_Tiles.png");
      this.load.tilemapTiledJSON("home_interior2_map" , "assets/tiledMap/LockWood/Player_Home_Interior2.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");

      //preload of object which are scene specific
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet("malePlayer" , "assets/evan_master.png" , {frameWidth: 213 , frameHeight: 270 });
       this.load.spritesheet("femalePlayer" , "assets/evelyn_master.png" , {frameWidth: 213 , frameHeight: 270 });
       this.load.image('hitbox', 'assets/hitbox.png');
       this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
       this.load.image('TABToSkip', 'assets/tabToSkip.png');

       this.load.spritesheet('warpSprites', 'assets/warpSprites.png',{frameWidth: 192, frameHeight: 288 });
       
       this.load.spritesheet('savePoint', 'assets/saveStatue.png',{frameWidth: 71, frameHeight: 100 });
       this.load.spritesheet('sign', 'assets/Sign.png',{frameWidth: 99, frameHeight: 135 });
       this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
       this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
       this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
       this.load.spritesheet('doubleJumpEffect', 'assets/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
           
       //loads the plugin to animate the tiles that have animation
       this.load.scenePlugin({
        key: 'AnimatedTiles',
        url: 'lib/vendors/AnimatedTiles.js',
        sceneKey: 'AnimatedTiles'
      });

    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("home_interior2_map","Forest_Large_Tiles","source_map");
    
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
      
      
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      /*this.initSigns(1574,1673,
        "This Island is host to many monsters. tread carefully! ",
         ['signLoop']);

      this.initSavePoints(896,1230);*/

      this.initSavePoints(480,590);

      this.initPortalsWithTransparency(352,592,352,592,"door2","HomeInterior1",0.75);
      

      

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
          //tutorialBeachThat.initSlimes(300, 500, 1,tutorialBeachThat.playerSex);
          //tutorialBeachThat.initSlimes(300, 500, 1,tutorialBeachThat.playerSex);
          //tutorialBeachThat.initSlimes(2380, 500, 1,tutorialBeachThat.playerSex);
      
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
      
      //this.animateBackround();

      console.log()
      
      //this.backround.y = this.player1.y;
      //this.backround.y = this.player1.y-200;
    //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
    //console.log("grabbed:"+ this.grabbed);
    console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

    if(this.loadCoolDown === true){
      this.checkWarp("tutorialBeach");
    }
    if(this.saveCoolDown === true){
      this.checkSave("tutorialBeach");
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
  

  
