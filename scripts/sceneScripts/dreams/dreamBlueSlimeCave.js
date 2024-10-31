//forest dream zone which shows off lockwood forests enemys.
class dreamBlueSlimeCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'dreamBlueSlimeCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "dreamBlueSlimeCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("dream_blue_slime_map" , "assets/tiledMap/Dream/Dream_Blue_Slime_Cave.json");

      this.load.image("blue_slime_cave_source_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave_Tileset.png");
      
      this.defaultPreload();

      this.load.spritesheet('dreamBackground', 'assets/backgrounds/dream_background.png',{frameWidth: 1400 , frameHeight: 664});

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('blue-slime-HNM', 'assets/enemys/blue-slime-humanoid-neutral-male.png',{frameWidth: 243, frameHeight: 363 });
      this.load.spritesheet('blue-slime-HNF', 'assets/enemys/blue-slime-humanoid-neutral-female.png',{frameWidth: 243, frameHeight: 363 });
      this.load.spritesheet('blue-slime-HM', 'assets/enemys/blue-slime-humanoid-male-all.png',{frameWidth: 243, frameHeight: 393 });
      this.load.spritesheet('blue-slime-HF', 'assets/enemys/blue-slime-humanoid-female-all.png',{frameWidth: 243, frameHeight: 393 });


      this.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('slimeCaveSFX','audio/used-audio/slime-cave-sounds/slime-cave-sounds.json',[
        "audio/used-audio/slime-cave-sounds/slime-cave-sounds.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("blueSlimeGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("dream_blue_slime_map","Blue_Slime_Cave_Tileset","blue_slime_cave_source_map");
    
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
      this.initLoopingSound('slimeCaveSFX','slimeCave', 0.02);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //
      this.initPortals(463,669-13,681,925,"warpCaveOutside","DreamForest");

      this.initSavePoints(801,925-15);
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //note when checking bestiary entry data to see if enemy view should spawn, need to push that to this array if its true.
      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","blueSlimeHSs","blueSlimeHMs"];
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
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'blueSlime'){
          thisScene.initEnemy(825,657,thisScene.playerSex,'blueSlime',true);
        }
        
        object = {
          flagToFind: 'largeBlueSlime',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object);
  
        if(object.foundFlag === true && object.flagToFind === 'largeBlueSlime'){
          thisScene.initEnemy(926,657,thisScene.playerSex,'blueSlimeLarge',true);
        }

        object = {
          flagToFind: 'blueSlimeHS',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object);
  
        if(object.foundFlag === true){
          thisScene.initEnemy(1008,669,thisScene.playerSex,'blueSlimeHS',true);
        }

        let object1 = {
          flagToFind: 'blueSlimeMaleHM',
          foundFlag: false,
        };

        let object2 = {
          flagToFind: 'blueSlimeFemaleHM',
          foundFlag: false,
        };
  
        // call the emitter to check if the value already was picked up.
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object1);
        inventoryKeyEmitter.emit(inventoryKey.checkBestiaryFlag, object2);
  
        if((object1.foundFlag === true || object2.foundFlag === true)){
          thisScene.initEnemy(1108,669,thisScene.playerSex,'blueSlimeHM',true);
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
  

  
