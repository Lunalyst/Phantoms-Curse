
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
    
      //sets up gameover location
      this.setupGameoverLocation("beachGameover");

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
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
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

      this.initPortals(3735,528,465,1821,"warpCaveOutside","tutorialCaveLevel");

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //adds items that the player can pick up in the scene.
      /*this.initItemDrop(506,900,12,1,2);
      this.initItemDrop(516,900,12,1,2);
      this.initItemDrop(526,900,12,1,2);
      this.initItemDrop(536,900,12,1,2);
      this.initItemDrop(546,900,12,1,2);
      this.initItemDrop(556,900,12,1,2);
      this.initItemDrop(566,900,12,1,2);*/

      //sets up containers
      this.setUpContainers();
      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
                926,
          //thisScene.initSlimes(606,937, 1,thisScene.playerSex);
          //thisScene.initSlimes(300, 500, 1,thisScene.playerSex);
          //thisScene.initSlimes(2380, 500, 1,thisScene.playerSex);
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){
      
      //makes backround follow player.
      this.backround.y = this.player1.y-200;

      //calls the built in update function
      this.defaultUpdate();

    }


}
  

  
