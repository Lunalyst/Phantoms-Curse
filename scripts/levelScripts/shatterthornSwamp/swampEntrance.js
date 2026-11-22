

class swampEntrance extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'swampEntrance',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "swampEntrance";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //variables used for scrolling
    this.playerPreviousX = 0;
    this.playerPreviousY = 0;
    
    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.defaultPreload();

      //define an array of enemys we are using
      this.enemyGroupArray = ["genericDefeats"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);
      
      
      this.load.image("swamp_source_map" , "assets/tiledMap/ShatterThorn/Swamp/Marsh_Tileset.png");
      this.load.tilemapTiledJSON("Swamp_Enterance" , "assets/tiledMap/ShatterThorn/Swamp/Swamp_Enterance.json");

      this.backgroundSwampW = 1164;
      this.backgroundSwampH = 690;
      this.load.spritesheet('backgroundSwampLevel',  'assets/backgrounds/Swamp_Background1.png',{frameWidth: this.backgroundSwampW , frameHeight: this.backgroundSwampH});

      //this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      //this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      //this.load.spritesheet('toBeContinued', 'assets/gameObjects/toBeContinued.png',{frameWidth: 933 , frameHeight: 216});

      ///this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);


      this.load.spritesheet('foragingPoint',  'assets/gameObjects/foragingPoint.png',{frameWidth: 192 , frameHeight: 192});

      this.load.audioSprite('halloweenMuffledSFX','audio/used-audio/halloween-muffled-sounds/halloween-muffled-sounds.json',[
        "audio/used-audio/halloween-muffled-sounds/halloween-muffled-sounds.mp3"
      ]);

    }

    create(){
      
      //sets up gameover location
      this.setupGameoverLocation("forestGameover");

      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //sets up ambient lighting
      this.setupLightingSystem(0x999999);


      //creates tileset
      this.setUpTileSet("Swamp_Enterance","Marsh_Tileset","swamp_source_map");
    
      this.processMap.layer2.setTint(0x909090);
      this.processMap.layer3.setTint(0x909090);

      this.processMap.layer0.setDepth(9);

      //creates player object
      this.setUpPlayer();

      //this.initLoopingSound('forestThemeSFX','bertsz',0.01,"music");

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

      this.initLoopingSound('halloweenMuffledSFX','theme', 0.6,"music");
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //this.initSigns(813,1757+12,"generic","tutorialCabin");

      this.initSavePoints(802,536-9);

      this.initEnemy(0,0,this.playerSex,'genericDefeat',false);   
       
      
        this.spawnedEnemys = true;
     
        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;

        this.backroundXOrigin = -500;
        this.backroundYOrigin = 430;
        this.backround = this.add.tileSprite(0, this.backroundYOrigin, 6*this.backgroundSwampW, this.backgroundSwampH, "backgroundSwampLevel");
        this.backround.setDepth(-50);
        this.backround.setScale(1.2);
        //original pos - player pos * scrol factor
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

      this.checkPlayerLeftWarp(619,"BridgeToLibertalia",2060,408);
      
       //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        //this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        //this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,900,0.5);
        this.backgroundRangeRight(this.backround,this.backroundXOrigin,900,0.7);
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        //this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        //this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,900,0.5);
        this.backgroundRangeLeft(this.backround,this.backroundXOrigin,900,0.7);
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
       //this.backgroundRangeUp(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        //this.backgroundRangeUp(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeUp(this.backround,this.backroundYOrigin,90,0.3);
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        //this.backgroundRangeDown(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        //this.backgroundRangeDown(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeDown(this.backround,this.backroundYOrigin,30,0.3);
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
