//forest dream zone which shows off lockwood forests enemys.
class dreamHiveCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DreamHiveCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DreamHiveCave";

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
      this.enemyGroupArray = ["blueSlimes","blueSlimeHSs","blueSlimeHMs"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.image("hive_source_map" , "assets/tiledMap/LockWood/Hive_Tileset/Hive_Tileset.png");
      this.load.tilemapTiledJSON("Dream_Hive_map" , "assets/tiledMap/Dream/Dream_Hive.json");

      this.defaultPreload();

      this.load.spritesheet('dreamBackground', 'assets/backgrounds/dream_background.png',{frameWidth: 1400 , frameHeight: 664});

      /*this.load.audioSprite('slimeCaveSFX','audio/used-audio/slime-cave-sounds/slime-cave-sounds.json',[
        "audio/used-audio/slime-cave-sounds/slime-cave-sounds.mp3"
      ]);*/

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("hiveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      this.setupLightingSystem(0x777777);

      //creates tileset
      this.setUpTileSet("Dream_Hive_map","Hive_Tileset","hive_source_map");
    
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

      //adds looping sound effect.
      //this.initLoopingSound('slimeCaveSFX','slimeCave', 0.02,"music");
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //
      this.initPortals(433,1048-8,393,920,"warpCaveOutside","DreamForest");

      //this.initSavePoints(801,925-15);
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //note when checking bestiary entry data to see if enemy view should spawn, need to push that to this array if its true.
      //sets up enemy colliders and groups
      this.enemyGroupArray = ["beeGrubs","beeDrones"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
        
        let object1 = {
          flagToFind: bestiaryKey.beeDroneMaleTF,
          foundFlag: false,
        };

        let object2 = {
          flagToFind: bestiaryKey.beeDroneFemaleTF,
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);

        if((object1.foundFlag === true || object2.foundFlag === true)){
          thisScene.initEnemy(1300,1038,thisScene.playerSex,'beeDrone',true,'wingFlapSFX2');
        }

        object1 = {
          flagToFind: bestiaryKey.beeDroneMaleSecret,
          foundFlag: false,
        };

        object2 = {
          flagToFind: bestiaryKey.beeDroneFemaleSecret,
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);

        if((object1.foundFlag === true || object2.foundFlag === true)){
          thisScene.initEnemy(1150,1057,thisScene.playerSex,'beeDroneSecret',true,'wingFlapSFX2');
        }

        object1 = {
          flagToFind: bestiaryKey.beeGrubTF,
          foundFlag: false,
        };

        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);

        if((object1.foundFlag === true )){
          //thisScene.initEnemy(1123,1057,thisScene.playerSex,'beeDroneSecret',true,'wingFlapSFX2');
          thisScene.initEnemy(1000, 1057,thisScene.playerSex,'beeGrub',true);
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

       /*//updates the x value of the scrolling backround.
       if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x -= 0.7;
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y += 0.3;
      }*/
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
    
    }

    

}
  

  
