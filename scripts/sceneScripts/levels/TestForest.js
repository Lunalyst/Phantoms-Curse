

class TestForest extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'TestForest',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "TestForest";

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
      this.defaultPreload();
      this.load.image("source_map" , "assets/tiledMap/LockWood/Forest_Large_Tiles.png");
      this.load.tilemapTiledJSON("TestForestMap" , "assets/tiledMap/LockWood/Test_Forest.json");

      this.load.spritesheet('backgroundForestRavineLevel', 'assets/forest_ravine_background.png',{frameWidth: 1000 , frameHeight: 1000});

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/bertsz__calm.mp3"
      ]);
    }

    create(){
      
      //sets up gameover location
      this.setupGameoverLocation("forestGameover");

      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("TestForestMap","Forest_Large_Tiles","source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1);

      this.initLoopingSound('forestThemeSFX','bertsz',0.05);

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();

      //sets up the player camera
      this.setUpPlayerCamera();
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      
      this.backround = this.add.tileSprite(0, 1370, 1000, 664, "backgroundForestRavineLevel");
      this.backround.setDepth(-50);

      this.initSavePoints(761,989-14);

      this.initPortals(378,1149-13,1892,829,"warpCaveOutside","TestCave");

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","tigers"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
          
          //thisScene.initEnemy(1073, 893,thisScene.playerSex,'blueSlime');
          //thisScene.initEnemy(1173, 893,thisScene.playerSex,'blueSlime');
          
          thisScene.initEnemy(1356,1139,thisScene.playerSex,'tiger');
          thisScene.spawnedEnemys = true;
        },1000);


        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){
      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      //makes backround follow player.
      this.backround.y = this.player1.y;

      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
