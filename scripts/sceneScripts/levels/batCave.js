
class batCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'batCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "batCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("bat_cave_map" , "assets/tiledMap/LockWood/Bat_Cave.json");

      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
     
      this.load.spritesheet('woodBarrier', 'assets/gameObjects/woodBarrier.png',{frameWidth: 126, frameHeight: 288 });
      this.load.spritesheet('rockPile', 'assets/gameObjects/rockPile.png',{frameWidth: 126, frameHeight: 96 });

      this.load.spritesheet('batMale', 'assets/enemys/batMaleAll.png',{frameWidth: 273, frameHeight: 435 });
      this.load.spritesheet('batFemale', 'assets/enemys/batFemaleAll.png',{frameWidth: 273, frameHeight: 435  });

      this.defaultPreload();


      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
      ]);

      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.load.audioSprite('rubbleSFX','audio/used-audio/rubble-sounds/rubble-sounds.json',[
        "audio/used-audio/rubble-sounds/rubble-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX3','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
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

      //creates tileset
      this.setUpTileSet("bat_cave_map","Forest_Tileset","forest_source_map");
    
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
      this.initLoopingSound('caveSFX','cave', 0.05);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSavePoints(2196,1117-14);

      this.initPortals(4001,541-13,5601-4160,893,"warpCaveInside","sunFlowerCave");

      this.initPortals(2088,1117-13,1753,573,"warpCaveOutside","blueSlimeCave");


      this.fakeWarp1 = new fakeWarp(this,4069,1181-13,'warpCaveOutsideRubble');

      this.fakeWarp3 = new fakeWarp(this,510,797-13,'warpCaveOutsideRubble');

      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["bats"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //set up wooden barriers in the scene
      this.setUpWoodenBarriers();

      this.setUpWoodBarriersCollider();

      this.initWoodenBarrier(3025,1245-13);

      this.initWoodenBarrier(1618,829-13);

      //sets up rubble pile
      this.setUpRockPile();

      this.initRockPile(3442,1245+20);

      //this.initRockPile(3183,1245+20);
      this.initRockPile(3233,1245+20);

      //this.initRockPile(2420,1245+20);
      this.initRockPile(2470,1245+20);
      //this.initRockPile(2520,1245+20);

      this.initRockPile(2629,1245+20);
      //this.initRockPile(2679,1245+20);

      this.initRockPile(925,829+20);
      //this.initRockPile(975,829+20);

      this.initRockPile(1025,829+20);
      //this.initRockPile(1100,829+20);
      this.initRockPile(1150,829+20);
      //this.initRockPile(1200,829+20);
      this.initRockPile(1250,829+20);
      //this.initRockPile(1300,829+20);

      this.initRockPile(1400,829+20);

      
     
      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.initBarrier(3632,1149-30,30,140);
      this.initBarrier(3024,1245-30,34,540);
      this.initBarrier(2385,1149-40,30,160);

      this.initBarrier(1618,829-30,34,540);
      this.initBarrier(880,730-40,30,160);
                                                      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
        thisScene.initEnemy(2620,962,thisScene.playerSex,'bat',false,'wingFlapSFX1');

        thisScene.initEnemy(3333,962,thisScene.playerSex,'bat',false,'wingFlapSFX2');

        thisScene.initEnemy(1137,546,thisScene.playerSex,'bat',false,'wingFlapSFX3');

          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

    

}
  

  
