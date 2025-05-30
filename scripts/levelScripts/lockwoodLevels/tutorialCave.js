
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

      this.defaultPreload();
      
      //define an array of enemys we are using
      this.enemyGroupArray = ["blueSlimes","chestMimics"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.tilemapTiledJSON("cave_map" , "assets/tiledMap/LockWood/Cave_Tileset/Tutorial_Cave.json");

      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");

      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.load.spritesheet('tutorialSprite', 'assets/hudElements/tutorialSprite.png',{frameWidth: 300 , frameHeight: 300});
      this.load.spritesheet('tutorialBorder', 'assets/hudElements/tutorialBorder.png',{frameWidth: 306 , frameHeight: 306});


      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
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
      this.setupLightingSystem(0x555555);

      //setup lights group.
      this.setUpWallLights();

      //creates tileset
      this.setUpTileSet("cave_map","Cave_Tileset","cave_source_map");

      //sets up item drops for the scene and som other useful groups.
      this.setUpItemDrops();

      this.setUpItemDropCollider();

      //tutorials
      let object1 = {
        flagToFind: "containers_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);

      if(object1.foundFlag === false){
        this.initTutorialPrompt(1068,1752,"containers");
      }

      //tutorials
      object1 = {
        flagToFind: "saveStones_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);

      if(object1.foundFlag === false){
        this.initTutorialPrompt(997,1240,"saveStones");
      }

      //plays looping sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      this.initLoopingSound('waterfallSFX','waterfall', 0.03);

      //tutorials
      object1 = {
        flagToFind: "combat_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);

      if(object1.foundFlag === false){
        this.initTutorialPrompt(788,536,"combat");
      }

      //plays looping sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      this.initLoopingSound('waterfallSFX','waterfall', 0.03);
    
      //creates player object
      this.setUpPlayer();

      //creates a group of slime objects
      this.slimes = this.physics.add.group();

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
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSavePoints(896,1230);

      this.initWallLight(699,469,'ghostMushroom4');

      this.initWallLight(873,439,'ghostMushroom2');

      this.initWallLight(1016,513,'ghostMushroom3');
      this.initWallLight(1020,511,'ghostMushroom1');
      this.initWallLight(1024,513,'ghostMushroom4');

      this.initWallLight(1157,544,'ghostMushroom3');

      this.initWallLight(625,955,'ghostMushroom3');

      this.initWallLight(782+32,1093,'ghostMushroom3');
      this.initWallLight(794+32,1090,'ghostMushroom1');
      this.initWallLight(806+32,1093,'ghostMushroom4');

      this.initWallLight(994+32,1130,'ghostMushroom2');

      this.initWallLight(1104+32,1100,'ghostMushroom3');

      this.initWallLight(1600+32,1086,'ghostMushroom1');
      this.initWallLight(1602+32,1084,'ghostMushroom2');

      this.initWallLight(1902+32,1134,'ghostMushroom2');

      this.initWallLight(1719,1341,'ghostMushroom4');

      this.initWallLight(1710,1540,'ghostMushroom1');

      this.initWallLight(1958,1469,'ghostMushroom2');
      this.initWallLight(1950,1467,'ghostMushroom4');

      this.initPortals(465,1808,3735,541,"warpCaveInside","tutorialBeachLevel");

      this.initPortals(1777,529,390,1917,"warpCaveInside","ForestRavineHome");

      let random = Math.floor((Math.random() * 100)+1);
      console.log(random);
      if(random === 39){
        this.form = new makeEcrus(this,1300,830,"@0100@ @1100@ @10001@ @0101@ @111@ @1001@ @1101@ @111@ @0011@ @1101@ @0010@ @111@ @0101@ @1100@ @000@ @0111@ @10110@ @111@ @0011@ @1101@ @0010@ @111@ @0100@ @000@ @0110@ @0110@ @111@ @10000@ @000@ @0111@ @1001@ @111@ @1100@ @10111@ @10101@ @10111@ @10100@");
        this.form1 = new makeEcrus(this,1300,842,"@100@ @1111@ @1111@ @01@ @1100@ @00010@ @100@ @1100@ @01@ @00011@ @1011@ @00001@ @01@ @100@ @11010@ @1110@ @01@ @00111@ @00110@ @1111@ @1111@ @01@ @00000@ @1110@ @10101@ @1011@ @0010@ @1110@ @01@ @100@ @01@ @110111@ @100@ @11010@ @1100@ @01@ @1011@ @10100@ @01@ @0010@ @1110@ @110110@");
        this.form.setScale(0.3);
        this.form1.setScale(0.3);
      }
      
      //this.form.visible = false;

      //make a sprite 
      this.tutorialSprite = new TutorialSprite(this, 600, 380);

      //sets up containers
      this.setUpContainers();

      let thisScene = this;

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //make a temp object
      let object = {
        flagToFind: "cave_tutorial_chest_with_oar",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the player has already opened the chest spawm a mimic half the time
      this.randomInput = Math.floor((Math.random() * 3));
      if(object.foundFlag === true && this.randomInput === 1){
      //random number to determine if the mimic is spawned or a empty chest.


      setTimeout(function(){
          
        thisScene.initEnemy(1185,1757-3,thisScene.playerSex,'chestMimic',false);

      },1000);
      
      //otherwise spawn the chest like normal.
      }else{

        setTimeout(function(){
          //new way to handle one time drops. calls const object defined in emitter.
          let oar = oneTimeItemArray.cave_tutorial_chest_with_oar;
          
          //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
          thisScene.initItemContainer(1185,1757-3,oar,true,"cave_tutorial_chest_with_oar");
          
        },2000);

      }

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.initBarrier(828,480,30,300);
      this.initBarrier(1610,510,30,300);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
        setTimeout(function(){
          //generates enemys
          thisScene.initEnemy(1309, 605,thisScene.playerSex,'blueSlime',false);
          
      
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
  

  
