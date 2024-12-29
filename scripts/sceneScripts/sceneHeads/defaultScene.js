class defaultScene extends G10UpdateLoops {

    //{preload Functions}===================================================================================================================

    //loads all the sprites for a current default scene. may make more specalized preload function in the future.
    defaultPreload(){
        
       //loads the image with the tiles and the .json file of the tilemap
      this.load.image("source_map" , "assets/tiledMap/LockWood/Forest_Large_Tiles.png");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");
      
      this.load.spritesheet("malePlayer" , "assets/player/evan_master.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.spritesheet("femalePlayer" , "assets/player/evelyn_master.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.image('hitbox', 'assets/gameObjects/hitbox.png');

      this.load.spritesheet('keyPrompts', 'assets/hudElements/KeyPrompts.png',{frameWidth: 96, frameHeight: 96 });
      this.load.spritesheet('healthUpgrade', 'assets/gameObjects/healthUpgrade.png',{frameWidth: 99, frameHeight: 99 });
      this.load.spritesheet('barrier', 'assets/gameObjects/barrier.png',{frameWidth: 96, frameHeight: 96 });

       //weapon sound effects
       this.load.audioSprite('weaponSFX','audio/used-audio/player-sounds/weapon-swings.json',[
        "audio/used-audio/player-sounds/weapon-swings.mp3"
      ]);

      this.load.audioSprite('playerJumpSFX','audio/used-audio/bounce-sounds/bounce-sounds.json',[
        "audio/used-audio/bounce-sounds/bounce-sounds.mp3"
      ]);

      this.load.audioSprite('jumpSFX','audio/used-audio/bounce-sounds/bounce-sounds.json',[
        "audio/used-audio/bounce-sounds/bounce-sounds.mp3"
      ]);

      this.load.audioSprite('jumpySFX','audio/used-audio/jumpy-anime-sounds/jumpy-anime-sounds.json',[
        "audio/used-audio/jumpy-anime-sounds/jumpy-anime-sounds.mp3"
      ]);

      this.load.audioSprite('creakSFX','audio/used-audio/wood-creak-sounds/wood-creak-sounds.json',[
        "audio/used-audio/wood-creak-sounds/wood-creak.mp3"
      ]);

      this.load.audioSprite('plapSFX','audio/used-audio/plap-sounds/plap-sounds.json',[
        "audio/used-audio/plap-sounds/plap.mp3"
      ]);

      this.load.audioSprite('burpSFX','audio/used-audio/burp-sounds/burp-sounds.json',[
        "audio/used-audio/burp-sounds/burp.mp3"
      ]);

      this.load.audioSprite('stomachSFX','audio/used-audio/stomach-sounds/stomach-sounds.json',[
        "audio/used-audio/stomach-sounds/stomach.mp3"
      ]);

      this.load.audioSprite('swallowSFX','audio/used-audio/swallow-sounds/swallow-sounds.json',[
        "audio/used-audio/swallow-sounds/swallow.mp3"
      ]);

      this.load.audioSprite('lickSFX','audio/used-audio/lick-sounds/lick-sounds.json',[
        "audio/used-audio/lick-sounds/lick.mp3"
      ]);

      /*this.load.audioSprite('tigerSFX','audio/used-audio/tiger-sounds/tiger-sounds.json',[
        "audio/used-audio/tiger-sounds/tiger.mp3"
      ]);*/
  
       this.load.spritesheet('warpSprites', 'assets/gameObjects/warpSprites.png',{frameWidth: 192, frameHeight: 288 });
       this.load.spritesheet('savePoint', 'assets/gameObjects/saveStatue.png',{frameWidth: 213, frameHeight: 300 });
       this.load.spritesheet('sign', 'assets/gameObjects/Sign.png',{frameWidth: 99, frameHeight: 135 });
       this.load.spritesheet('itemDrops', 'assets/gameObjects/itemDrops.png',{frameWidth: 96, frameHeight: 96});
       this.load.spritesheet('chest', 'assets/gameObjects/chest.png',{frameWidth: 381, frameHeight: 303});

       this.load.spritesheet('doubleJumpEffect', 'assets/gameObjects/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
         
       this.load.spritesheet('penning', 'assets/internalViews/penning.png',{frameWidth: 213, frameHeight: 213});
    }

    //{scene setup Functions}===================================================================================================================

    //sets up default scene variables that every scene should need. could be factored out into multiple varialbe set ups for different scenes
    constructStockSceneVariables(){

    //G1
    //input variable setup
    this.keyA;
    this.keyW;
    this.keyD;
    this.keyS;
    this.keyTAB;
    this.space;
    this.shift;

    //player definition
    this.player1;

    //key prompts variable
    this.KeyDisplay;

    //attack hitbox for player
    this.attackHitBox;

    //declaration ov variable which will ve overwirten later for the scenes needs.
    this.playerSex;
    this.preferance;
    this.onomatopoeia;

    this.lightingSystemActive = false;

    //default location of gameover, incase one is not declared.
    this.gameoverLocation = "caveGameover";

    this.tabObject = {
      tabIsDown: false
    };
    
    this.loopingMusic = [];

    this.sentToTitle = false;

    this.playerDefeated = false;

    this.gaveoverCalled = false;

    this.PlayerOutOfBounds = false;

    //G2

    //camera object
    this.mycamera;
    //tilemap
    this.processMap
    this.myMap;

    //warp cooldown variables
    this.loadCoolDown = false;
    this.saveCoolDown = false;
    this.signCoolDown = false;

    //cooldown for grabs
    this.grabCoolDown = false;

    //variable to tell if the main scene is paused.
    this.isPaused = false;

    //text box variable 
    this.sceneTextBox;
    this.pausedInTextBox = false;

    //delay for gameplay whenl oading in?
    this.gameStartedDelay = true;

    //G4
    //portals group and there id
  this.portals;
  this.portalId = 0;

  //id to distinguish save stones
  this.saveStoneId = 0;

  //id to distinguish signs
  this.signId = 0;
  
  //distinguish containers
  this.containerId = 0;

  //group for signs
  this.signPoints;

  //group for save stones
  this.saveStonePoints;

  //generic warp location. is overwritten by our load call
  this.warpToX = 450;
  this.warpToY = 600;

  //variable to tell when the dialogue should be interupted
  this.textInterupt = false;

  this.itemDrops;

  //G5
  //id to distinguish npcs if multiple are present.
  this.npcId = 0;

  //G6
  this.grabbed = false;
    this.spawnedEnemys = false;

    //variables for stuckgrab
    this.playerStuckGrab = false;
    this.playerStuckGrabActivated = false;
    this.PlayerStuckSFXTimer = false;
    this.playerStuckGrabbedBy = "";
    this.playerStuckGrabCap = 0;

  //G7
  //activation ids to tell which one of multiple objects in a group where triggered.
  this.activatedPortalId = 0;
  this.activatedSavePointId = 0;
  this.activatedSignId = 0;
  this.activatedNpcId = 0;
  this.activatedContainerId = 0;

  //variable used to keep track of which player the enemy was defeated by.
  this.enemyThatDefeatedPlayer ="";

  //default title incase one is not declared during gameover.
  this.defeatedTitle = "cursed";
        

    }

     
  
  }
