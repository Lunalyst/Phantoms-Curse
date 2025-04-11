
class caveToSunflowers2 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'caveToSunflowers2',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "caveToSunflowers2";

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

      this.load.tilemapTiledJSON("cave_connector_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Connecter.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      
      this.defaultPreload();


      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //sets up ambient lighting
      this.setupLightingSystem(0x555555);

      //creates tileset
      this.setUpTileSet("cave_connector_map","Cave_Tileset","cave_source_map");
    
      //creates player object
      this.setUpPlayer();

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();

      //sets up the player camera
      this.setUpPlayerCamera();

      //sets up the loading emitters andscene fadeout transition.
      this.setUpSceneTransition();

      //sets up gameplay emitters
      this.setUpGameplayEmitters();

      //activates sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initPortals(1570,829-13,5812,1181,"warpCaveInside","TestForest");

      this.initPortals(661,829-13,6763-4160,1469,"warpCaveInside","sunFlowerCave");

      this.initPortals(1123,888-8,2815,1368,"warpCaveShadowMenace","ShadowCave");
      
      //sets up containers
      this.setUpContainers();

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
          
          //thisScene.initEnemy(1173,700,thisScene.playerSex,'tiger');
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){

      console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
