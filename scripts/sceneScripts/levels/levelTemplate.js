

let ForestRavineHomeThat;
class level extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'ForestRavineHome',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "ForestRavineHome";

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
      this.load.tilemapTiledJSON("home_map" , "assets/tiledMap/LockWood/Player_Home.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");

      //preload of object which are scene specific
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet('backgroundForestRavineLevel', 'assets/forest_ravine_background.png',{frameWidth: 1000 , frameHeight: 1000});

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
      this.setUpTileSet("home_map","Forest_Large_Tiles","source_map");
    
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

      
      this.backround = this.add.tileSprite(0, 1370, 10000, 664, "backgroundForestRavineLevel");
      this.backround.setDepth(-50);

      

      this.initPortals(390,1906,1777,529,"warpCaveOutside","tutorialCaveLevel");

      this.initPortals(1504,1264,500,600,"door1","HomeInterior1");

      

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

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();
    }

    update(){

      //makes backround follow player.
      this.backround.y = this.player1.y;

      //calls the built in update function
      this.defaultUpdate();

    }

}
  

  
