

class LockwoodBridges extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'LockwoodBridges',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "LockwoodBridges";

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
      
      
      this.load.image("lockwood_entrance_source_map" , "assets/tiledMap/LockWood/Lockwood_Entrance_Tileset/Lockwood_Entrance_Tileset.png");
      this.load.tilemapTiledJSON("lockwood_bridges_map" , "assets/tiledMap/LockWood/Lockwood_Entrance_Tileset/Lockwood_Bridges.json");

      this.load.spritesheet('backgroundForestRavineLevel',  'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.spritesheet('lockwoodDrawBridge', 'assets/gameObjects/Draw Bridge.png',{frameWidth: 768 , frameHeight: 672});

      this.load.spritesheet("lunalyst" ,  "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      //test sprites
      this.load.spritesheet("milo" , "assets/npcs/milo.png" , {frameWidth: 429 , frameHeight: 300 });
      this.load.spritesheet("miloMaskedAndArmed" , "assets/npcs/miloMaskedAndArmed.png" , {frameWidth: 459 , frameHeight: 300 });
      this.load.spritesheet("miloEmots" , "assets/hudElements/miloEmots.png" , {frameWidth: 111 , frameHeight: 117 });
      this.load.spritesheet("nectarEmots" , "assets/hudElements/nectarEmots.png" , {frameWidth: 171 , frameHeight: 147 });

      this.load.spritesheet("nectar" , "assets/bosses/nectar.png" , {frameWidth: 933 , frameHeight: 591 });
      

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/Hare-Raising Harmonies by Gangstalka.mp3"
      ]);

      this.load.audioSprite('bushSFX','audio/used-audio/bush-sounds/bush-sounds.json',[
          "audio/used-audio/bush-sounds/bush-sounds.mp3"
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

      //creates tileset
      this.setUpTileSet("lockwood_bridges_map","Lockwood_Entrance_Tileset","lockwood_entrance_source_map");
      this.processMap.layer0.setDepth(9);
      this.processMap.layer1.setDepth(0);
      this.processMap.layer2.setDepth(0);
      this.processMap.layer3.setDepth(0);
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      //this.initLoopingSound('forestSFX','forest',1,"ambience");

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
    
      //this.milo = this.add.sprite(1895, 728-7, "milo");
      //this.milo.anims.create({ key: 'idleMasked', frames: this.anims.generateFrameNames('milo', { start: 1, end: 4 }), frameRate: 6, repeat: -1 });
      //this.milo.anims.play("idleMasked", true);
      //this.milo.setScale(1/3);

      /*this.nectar = this.add.sprite(2319, 520, "nectar");
      this.nectar.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('nectar', { start: 0, end: 0 }), frameRate: 6, repeat: -1 });
      this.nectar.anims.play("idle", true);
      this.nectar.flipX = true;
      this.nectar.setScale(1/3);
      this.nectar.setDepth(-1);
      this.nectar.setTint(0x505050);*/
      
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene 
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //this.initMilo(1895, 728-7,"test");

      //use emitter to check nectar riddle boss battle flag.
      let nectarFlag = {
        flagToFind: "nectarRiddle",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, nectarFlag);

      //if the encounter has not happened, then set variables. 
      if(nectarFlag.foundFlag === true){

        this.nectarBossFlag = true;

      }else{
        this.initSigns(1766,728+18,"generic","nectarBridgeUp",false);
        this.nectarBossFlag = false;
        this.triggerEncounter = false;
      }


      

      this.setUpPCMilo(1895, 728);
      this.setUpPlayer2Collider();

      this.setUpLockwoodDrawBridges();
      this.setUpLockwoodDrawBridgesCollider();
      //this.initSavePoints(1406,1112-10);

      this.initSigns(819,728+18,"generic","lockwoodEntranceSign",false);

      this.initPortals(3566,728-8,785,1083,"warpCaveInside","LockwoodEntrance",false);

      //this.initLunalyst(935,1083,'clearingTheWay');
      

      this.initSavePoints(1099,728-10);

      //this.initSavePoints(1805,728-10);

      this.initLockwoodDrawBridge(1632,736-48,'up');

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

        this.backroundXOrigin = 860;
        this.backroundYOrigin = 190;
         
        this.backround = this.add.tileSprite(this.backroundXOrigin, this.backroundYOrigin, 6*1600, 1090, "backgroundForestRavineLevel");
        this.backround.setDepth(-50);
        this.backround.setScale(1.2);
        //original pos - player pos * scrol factor

        this.parrallax1XOrigin = 3000-1290;
        this.parrallax1YOrigin = 530 ;
        this.parrallax1 = this.add.tileSprite(this.parrallax1XOrigin, this.parrallax1YOrigin, 1920*8 ,1920, "tree_parrallax");
        this.parrallax1.setScale(1/3);
        this.parrallax1.setDepth(-50);
        this.parrallax1.setTint(0x444444);

        this.parrallax2XOrigin = 3000-1290;
        this.parrallax2YOrigin = 530+600;
        this.parrallax2 = this.add.tileSprite(this.parrallax2XOrigin, this.parrallax2YOrigin, 1920*8 ,1920, "ground_parrallax");
        this.parrallax2.setScale(1/3);
        this.parrallax2.setDepth(-50);
        this.parrallax2.setTint(0x444444);
    }

    update(){
      
      //calls the built in update function

      if(this.player2Active === true){
        this.player2Update();
      }else{
        this.defaultUpdate();
      }
      
        //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      if(this.nectarBossFlag === false && this.triggerEncounter === false && this.player1.x < 1850){

        this.triggerEncounter = true;
        this.initNectar(2230, 480, 'ambush');

      }
      
       //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,2000,0.5);
        this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,2000,0.5);
        this.backgroundRangeRight(this.backround,this.backroundXOrigin,2000,0.7);
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,2000,0.5);
        this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,2000,0.5);
        this.backgroundRangeLeft(this.backround,this.backroundXOrigin,2000,0.7);
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeUp(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeUp(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeUp(this.backround,this.backroundYOrigin,90,0.3);
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeDown(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeDown(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeDown(this.backround,this.backroundYOrigin,30,0.3);
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
