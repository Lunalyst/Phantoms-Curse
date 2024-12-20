
class istarasCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'istarasCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "istarasCave";

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

      this.load.tilemapTiledJSON("istara_cave_map" , "assets/tiledMap/LockWood/Cave_Tileset/Istaras_Cave.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");

      this.load.spritesheet("istara" , "assets/npcs/istara.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-male-tf" , "assets/npcs/istara-male-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-female-tf" , "assets/npcs/istara-female-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-gestate-tf" , "assets/npcs/istara-gestate-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istaraEmots" , "assets/hudElements/IstaraEmots.png" , {frameWidth: 75 , frameHeight: 66 });

      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.defaultPreload();


      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
      ]);

      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
      ]);

      this.load.audioSprite('splashSFX','audio/used-audio/splash-sounds/splash-sounds.json',[
        "audio/used-audio/splash-sounds/splash-sounds.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("istaraGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //sets up ambient lighting
      this.setupLightingSystem(0x555555);

      //setup lights group.
      this.setUpWallLights();

      //creates tileset
      this.setUpTileSet("istara_cave_map","Cave_Tileset","cave_source_map");
    
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
      this.initLoopingSound('waterfallSFX','waterfall', 0.03);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initPortals(462,1245-13,1779,1149,"warpCaveOutside","blueSlimeCave1");

      this.initSavePoints(695,1245-14);

      //this.initPortals(595,1245-13,637,605,"door2","DevRoom1");

      this.initWallLight(712+32,1163,'ghostMushroom3');
      this.initWallLight(700+32,1160,'ghostMushroom1');

      this.initWallLight(812+32,1063,'ghostMushroom3');
      this.initWallLight(824+32,1060,'ghostMushroom1');
      this.initWallLight(836+32,1063,'ghostMushroom4');

      this.initWallLight(904+32,930,'ghostMushroom1');
      this.initWallLight(1024+32,980,'ghostMushroom2');
      
      this.initWallLight(1000,1140,'torch');
      this.initWallLight(1334-32,1140,'torch');
      this.initWallLight(1450+32,1140,'torch');
      //this.initWallLight(1750+32,1140,'torch');
      this.initWallLight(1750+32,1140,'ghostMushroom2');
      this.initWallLight(1760+32,1142,'ghostMushroom3');
      this.initWallLight(1770+32,1138,'ghostMushroom4');

      this.initWallLight(1800+32,1002,'ghostMushroom3');

      this.initWallLight(1650+32,950,'ghostMushroom1');

      this.initWallLight(1450+32,950,'ghostMushroom2');
      this.initWallLight(1440+32,948,'ghostMushroom4');

      this.initWallLight(1290+32,900,'ghostMushroom1');
      this.initWallLight(1300+32,892,'ghostMushroom2');
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      

    //this.light1 = this.lights.addLight(695,1245, 200);

    this.player1.setPipeline('Light2D');

      //sets up enemy colliders and groups
      this.enemyGroupArray = [];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
          
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        this.initIstara(1393,1245,'inCave');
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
