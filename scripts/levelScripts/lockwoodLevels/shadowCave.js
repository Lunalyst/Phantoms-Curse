
class ShadowCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'ShadowCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "ShadowCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){

      //define an array of enemys we are using
      this.defaultPreload();
      
      //define an array of enemys we are using
      this.enemyGroupArray = ["curseShadows"];

       //call built in function to preload enemys assets.
       this.setUpEnemyPreload(this.enemyGroupArray);
      
      this.load.tilemapTiledJSON("shadow_cave_map" , "assets/tiledMap/LockWood/Cave_Tileset/Shadow_Cave.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      
      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.defaultPreload();

       this.load.audioSprite('slowMyceliumSFX','audio/used-audio/mycelium-slow-sounds/mycelium-slow-sounds.json',[
        "audio/used-audio/mycelium-slow-sounds/mycelium-slow-sounds.mp3"
      ]);

      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
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
      this.setupLightingSystem(0x000008);
      //this.setupLightingSystem(0x222227);

      //setup lights group.
      this.setUpWallLights();

      //creates tileset
      this.setUpTileSet("shadow_cave_map","Cave_Tileset","cave_source_map");
    
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
      this.initLoopingSound('slowMyceliumSFX','theme', 0.1,"music");
      this.initLoopingSound('waterfallSFX','waterfall', 0.03,"ambience");
    
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //FLOOR 1 MUSHROOMS FROM LEFT TO RIGHT
      this.initWallLight(395+32,1395,'ghostMushroom1');
      this.initWallLight(397+32,1393,'ghostMushroom2');

      this.initWallLight(642,1381,'ghostMushroom4');

      this.initWallLight(809,1466,'ghostMushroom2');

      this.initWallLight(937+32,1563,'ghostMushroom3');
      this.initWallLight(947+32,1560,'ghostMushroom1');
      this.initWallLight(957+32,1563,'ghostMushroom4');

      this.initWallLight(1124+32,1365,'ghostMushroom2');

      this.initWallLight(1316,1016,'ghostMushroom1');
      this.initWallLight(1318,1016,'ghostMushroom2');

      

      this.initWallLight(1610+32,1385,'ghostMushroom3');
      this.initWallLight(1620+32,1378,'ghostMushroom1');
      this.initWallLight(1630+32,1385,'ghostMushroom4');

      this.initWallLight(1846,1140,'ghostMushroom1');

      this.initWallLight(2060,1248,'ghostMushroom1');
      this.initWallLight(2062,1246,'ghostMushroom2');

      this.initWallLight(2286,1177,'ghostMushroom4');

      this.initWallLight(2343,1339,'ghostMushroom3');
      this.initWallLight(2351,1336,'ghostMushroom1');
      this.initWallLight(2363,1339,'ghostMushroom4');

      this.initWallLight(2572,1201,'ghostMushroom2');

      this.initWallLight(2850,1319,'ghostMushroom2');
      this.initWallLight(2842,1311,'ghostMushroom4');

      //FLOOR 2 MUSHROOMS FROM LEFT TO RIGHT

      //this.initSavePoints(443,1080-10);

      this.initSavePoints(1868,920-10);

      this.initPortals(438,1464-8,2849,605,"warpCaveOutside","blueSlimeCave");

      this.initPortals(2815,1368-8,1123,888,"warpCaveOutside","caveToSunflowers2");

      //creates container objects.
      this.setUpContainers();

      let thisScene = this;
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);
  
      //sets up item drops for the scene

      this.setUpItemDrops();
      this.setUpItemDropCollider();
      
      setTimeout(function(){
                
        thisScene.initEnemy(783,1500,thisScene.playerSex,'curseShadow',false);

        thisScene.initEnemy(1350,1550,thisScene.playerSex,'curseShadow',false);
        thisScene.initEnemy(2197,1444,thisScene.playerSex,'curseShadow',false);
        thisScene.spawnedEnemys = true;

       },1000);

      //special collision function to give the shadows collision with the mushroom lights expanded hitbox. allowing for the illusion that the shadows cant enter light.
      this.setUpShadowLightCollider();

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){


      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
