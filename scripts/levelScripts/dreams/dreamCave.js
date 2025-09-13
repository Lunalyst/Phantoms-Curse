//forest dream zone which shows off lockwood forests enemys.
class dreamCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DreamCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DreamCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.defaultPreload();
      
      //define an array of enemys we are using
      this.enemyGroupArray = ["bats","chestMimics"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.tilemapTiledJSON("dream_cave_map" , "assets/tiledMap/Dream/Dream_Cave.json");

      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");

      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });
       
      this.load.spritesheet("istara" , "assets/npcs/istara.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-male-tf" , "assets/npcs/istara-male-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-female-tf" , "assets/npcs/istara-female-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istara-gestate-tf" , "assets/npcs/istara-gestate-tf.png" , {frameWidth: 783 , frameHeight: 432 });
      this.load.spritesheet("istaraEmots" , "assets/hudElements/IstaraEmots.png" , {frameWidth: 105 , frameHeight: 96 });

      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
      ]);
      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("forestGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("dream_cave_map","Cave_Tileset","cave_source_map");
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

      //plays looping sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      this.initLoopingSound('waterfallSFX','waterfall', 0.03);

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initPortals(1166,605-13,581,925,"warpCaveInside","DreamForest");
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //note when checking bestiary entry data to see if enemy view should spawn, need to push that to this array if its true.
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
        
        let object1 = {
          flagToFind: bestiaryKey.batMaleVore,
          foundFlag: false,
        };

        let object2 = {
          flagToFind:  bestiaryKey.batFemaleVore,
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true)){
          thisScene.initEnemy(828,605,thisScene.playerSex,'bat',true,'wingFlapSFX1');
        }

        object1 = {
          flagToFind: bestiaryKey.mimicMaleTF,
          foundFlag: false,
        };

        object2 = {
          flagToFind: bestiaryKey.mimicFemaleTF,
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true) ){
          thisScene.initEnemy(691,605-4,thisScene.playerSex,'chestMimic',true,);
        }

        object1 = {
          flagToFind: bestiaryKey.mimicMaleVore,
          foundFlag: false,
        };

        object2 = {
          flagToFind: bestiaryKey.mimicFemaleVore,
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true)){
          thisScene.initEnemy(581,605-4,thisScene.playerSex,'chestMimicAngry',true);
        }

        object1 = {
          flagToFind: bestiaryKey.istaraUnbirth,
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);

        if(object1.foundFlag === true){
          thisScene.initIstara(451,605,'dreamView');
        }

        
        thisScene.spawnedEnemys = true;
      },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

    }

    update(){

      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
    
    }

}
  

  
