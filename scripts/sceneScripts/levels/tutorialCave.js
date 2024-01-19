

let tutorialCaveThat;
class tutorialCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'tutorialCaveLevel',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "tutorialCaveLevel";

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

      this.load.tilemapTiledJSON("cave_map" , "assets/tiledMap/LockWood/Tutorial_Cave.json");
      
      this.defaultPreload();

    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("cave_map","Forest_Large_Tiles","source_map");
    
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

      this.initSigns(1574,1673,
        "This Island is host to many monsters. tread carefully! ",
         ['signLoop']);

      this.initSavePoints(896,1230);

      this.initPortals(465,1808,3735,528,"warpCaveInside","tutorialBeachLevel");

      this.initPortals(1777,529,390,1917,"warpCaveInside","ForestRavineHome");

      

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
      //calls the built in update function
      this.defaultUpdate();

    }

}
  

  
