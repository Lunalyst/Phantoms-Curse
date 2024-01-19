

let tutorialBeachThat;
class tutorialBeach extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'tutorialBeachLevel',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene
    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "tutorialBeachLevel";

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
      
      this.load.tilemapTiledJSON("beach_map" , "assets/tiledMap/LockWood/Tutorial_Beach.json");

      //preload of object which are scene specific
      this.load.spritesheet('backgroundBeachLevel', 'assets/beach_background.png',{frameWidth: 1000 , frameHeight: 1000});
      
      this.defaultPreload();

      
   
    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();

      //controls the Background
      this.backround = this.add.tileSprite(0, 100, 10000, 3000, "backgroundBeachLevel");
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("beach_map","Forest_Large_Tiles","source_map");

      //this.tilesAnimated.init(this.map);

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

      //is 12 units plus player position.
      this.initSigns(606,937,
      "To Any Who Have Washed Up On This cursed beach, you can move with a and d, and jump with space bar. if something is interactable, then a Key prompt will apear below it. Dialogue can also be progressed with w. ",
       ['signLoop']);

      this.initSigns(1928,713,
        "some surfaces can be jumped through but not back down. so be careful. ",
         ['signLoop']);

      this.initSigns(3489,521,
          "some interactables will take you to new places. ",
           ['signLoop']);

      this.initPortals(3735,528,465,1823,"warpCaveOutside","tutorialCaveLevel");

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //adds items that the player can pick up in the scene.
      this.initItemDrop(506,900,12,1,2);
      this.initItemDrop(516,900,12,1,2);
      this.initItemDrop(526,900,12,1,2);
      this.initItemDrop(536,900,12,1,2);
      this.initItemDrop(546,900,12,1,2);
      this.initItemDrop(556,900,12,1,2);
      this.initItemDrop(566,900,12,1,2);

      //sets up containers
      this.setUpContainers();

      //creates an object to be put in the container
      let oar = {
        itemID: 2,
        itemStackable: 0,
        itemAmount: 1
    };
    
    //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
    this.initItemContainer(506,900,oar,true,"beach_tutorial_chest_with_oar");
      
        
      

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
      //makes backround follow player.
      this.backround.y = this.player1.y-200;

      //calls the built in update function
      this.defaultUpdate();

    }


}
  

  
