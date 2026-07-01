

class dreamLockwoodEntrance extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'dreamLockwoodEntrance',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "dreamLockwoodEntrance";

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
      this.enemyGroupArray = [];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);
      
      
      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("dream_lockwood_entrance_map" , "assets/tiledMap/Dream/Dream_Lockwood_Entrance.json");

      this.load.tilemapTiledJSON("dream_lockwood_entrance_closed_map" , "assets/tiledMap/Dream/Dream_Lockwood_Entrance_Closed.json");

      this.load.spritesheet('backgroundForestRavineLevel',  'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});

      this.load.spritesheet('dreamBackground', 'assets/backgrounds/dream_background.png',{frameWidth: 1400 , frameHeight: 664});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.spritesheet('toBeContinued', 'assets/gameObjects/toBeContinued.png',{frameWidth: 933 , frameHeight: 216});

      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
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
      this.loadGamePlayData();
      
      this.grabbed = false;

      //use emitter to check nectar riddle boss battle flag.
      let nectarFlag = {
        flagToFind: "nectarAmbushComplete",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, nectarFlag);


      if(nectarFlag.foundFlag === true){
        //creates tileset
        this.setUpTileSet("dream_lockwood_entrance_map","Forest_Tileset","forest_source_map");

      }else{
        //creates tileset
        this.setUpTileSet("dream_lockwood_entrance_closed_map","Forest_Tileset","forest_source_map");

      }

      
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1,"ambience");

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

      this.initSavePoints(1132,728-10);
      
      this.initPortals(1294,728-13,1683,925,"warpCaveOutside","DreamHub",false);

      if(nectarFlag.foundFlag === true){
        
        this.initPortals(782,728-13,3566,728,"warpCaveOutside","dreamLockwoodBridges",false);
        this.initSigns(890,728+18,"generic","nectarMemoryText");
      }

      

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          
          //generates enemys
          //thisScene.initSlimes(300, 500, 1,thisScene.playerSex);
          //thisScene.initSlimes(300, 500, 1,thisScene.playerSex);
          //thisScene.initSlimes(2380, 500, 1,thisScene.playerSex);
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;

        this.backroundXOrigin = 0;
        this.backroundYOrigin = 540;
        this.backround = this.add.tileSprite(1000, 300, 1400*4, 664*2, "dreamBackground");
        this.backround.setDepth(-50);
        this.backround.setScale(1);
        //original pos - player pos * scrol factor

        this.parrallax1XOrigin = 1500;
        this.parrallax1YOrigin = 560;
        this.parrallax1 = this.add.tileSprite(1500, this.parrallax1YOrigin, 1920*4 ,1920, "tree_parrallax");
        this.parrallax1.setScale(1/3);
        this.parrallax1.setDepth(-50);
        this.parrallax1.setTint(0x444444);

        this.parrallax2XOrigin = 1500;
        this.parrallax2YOrigin = 560+600;
        this.parrallax2 = this.add.tileSprite(1500, this.parrallax2YOrigin, 1920*4 ,1920, "ground_parrallax");
        this.parrallax2.setScale(1/3);
        this.parrallax2.setDepth(-50);
        this.parrallax2.setTint(0x444444);
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();
        //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      
       //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,900,0.5);
       
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,900,0.5);
        
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeUp(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeUp(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeDown(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeDown(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        
      }

       //updates the x value of the scrolling backround.
       if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x -= 0.7;
      }

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y += 0.3;
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
