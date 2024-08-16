//forest dream zone which shows off lockwood forests enemys.
class dreamForest extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DreamForest',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DreamForest";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("dream_forest_map" , "assets/tiledMap/Dream/Dream_Forest.json");

      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      
      this.defaultPreload();

      this.load.spritesheet('dreamBackground', 'assets/backgrounds/dream_background.png',{frameWidth: 1400 , frameHeight: 664});

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('tigerFemale', 'assets/enemys/tigerFemaleAll.png',{frameWidth: 345, frameHeight: 270 });
      this.load.spritesheet('tigerFemaleExtension', 'assets/enemys/tigerFemaleAllExtension.png',{frameWidth: 345, frameHeight: 270 });
      this.load.spritesheet('rabbitMale', 'assets/enemys/rabbit-male-all.png',{frameWidth: 429, frameHeight: 300 });
      this.load.spritesheet('rabbitFemale', 'assets/enemys/rabbit female-all.png',{frameWidth: 429, frameHeight: 300 });
      this.load.spritesheet('beeDroneMale', 'assets/enemys/beeDroneMale.png',{frameWidth: 789, frameHeight: 252 });
      this.load.spritesheet('beeDroneFemale', 'assets/enemys/beeDroneFemale.png',{frameWidth: 789, frameHeight: 252 });
      this.load.spritesheet('batMale', 'assets/enemys/batMaleAll.png',{frameWidth: 273, frameHeight: 435 });
      this.load.spritesheet('batFemale', 'assets/enemys/batFemaleAll.png',{frameWidth: 273, frameHeight: 435  });

      this.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/Hare-Raising Harmonies by Gangstalka.mp3"
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
      this.setUpTileSet("dream_forest_map","Forest_Tileset","forest_source_map");
    
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
      this.initLoopingSound('forestThemeSFX','bertsz',0.01);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //
      this.initPortals(881,925-13,1388,925,"warpCaveOutside","DreamHub");

      this.initSavePoints(801,925-15);
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //note when checking bestiary entry data to see if enemy view should spawn, need to push that to this array if its true.
      //sets up enemy colliders and groups
      this.enemyGroupArray = ["bats","beeDrones","rabbits","tigers","blueSlimes"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
        
        let object = {
          flagToFind: 'blueSlime',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'blueSlime'){
          thisScene.initEnemy(663,913,thisScene.playerSex,'blueSlime',true);
        }
        
        object = {
          flagToFind: 'largeBlueSlime',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'largeBlueSlime'){
          thisScene.initEnemy(551,913,thisScene.playerSex,'blueSlimeLarge',true);
        }

        object = {
          flagToFind: 'femaleTiger',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'femaleTiger'){
          thisScene.initEnemy(1251,883,thisScene.playerSex,'tiger',true);
        }

        object = {
          flagToFind: 'femaleTigerBooba',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'femaleTigerBooba'){
          thisScene.initEnemy(1384,883,thisScene.playerSex,'tigerBooba',true);
        }

        let object1 = {
          flagToFind: 'maleRabbit',
          foundFlag: false,
        };

        let object2 = {
          flagToFind: 'femaleRabbit',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true) && (object1.flagToFind === 'maleRabbit' || object2.flagToFind === 'femaleRabbit')){
          thisScene.initEnemy(1534,881,thisScene.playerSex,'rabbit',true);
        }

        object1 = {
          flagToFind: 'maleBeeDrone',
          foundFlag: false,
        };

        object2 = {
          flagToFind: 'femaleBeeDrone',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object2);

        if((object1.foundFlag === true || object2.foundFlag === true) && (object1.flagToFind === 'maleBeeDrone' || object2.flagToFind === 'femaleBeeDrone')){
          thisScene.initEnemy(1680,878,thisScene.playerSex,'beeDrone',true,'wingFlapSFX2');
        }

        object1 = {
          flagToFind: 'maleBat',
          foundFlag: false,
        };

        object2 = {
          flagToFind: 'femaleBat',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true) && (object1.flagToFind === 'maleBat' || object2.flagToFind === 'femaleBat')){
          thisScene.initEnemy(445,925,thisScene.playerSex,'bat',true,'wingFlapSFX1');
        }
        
        thisScene.spawnedEnemys = true;
      },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        this.backround = this.add.tileSprite(100, 300, 1400*3, 664*2, "dreamBackground");
        this.backround.setDepth(-50);
        this.backround.setScale(1);
    }

    update(){

      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

       //updates the x value of the scrolling backround.
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
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
    
    }

    

}
  

  
