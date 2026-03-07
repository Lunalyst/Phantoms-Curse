

class LockwoodOverrootSewer1 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'LockwoodOverrootSewer1',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "LockwoodOverrootSewer1";

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
      
      
      this.load.image("lockwood_shop_district_source_map" , "assets/tiledMap/LockWood/Lockwood_Shop_District_Tileset/Lockwood_Shop_District_Tileset.png");
      this.load.tilemapTiledJSON("lockwood_overroot_sewers_map" , "assets/tiledMap/LockWood/Lockwood_Shop_District_Tileset/Lockwood_Sewers.json");

      this.load.spritesheet('Clearing_Background',  'assets/backgrounds/Clearing_Background.png',{frameWidth: 2700 , frameHeight: 1800});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth:1920 ,frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.image("home_source_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Home_Interior_Tileset.png");

      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.load.spritesheet("dayns" , "assets/npcs/dayns.png" , {frameWidth: 333 , frameHeight: 333 });

      this.load.spritesheet("roxie" , "assets/npcs/roxie.png" , {frameWidth: 393 , frameHeight: 453 });

      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.load.spritesheet('Lockwood_Buildings2', 'assets/parrallax/Lockwood_Buildings2.png',{frameWidth: 2880 , frameHeight: 1920});

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
      this.setupLightingSystem(0x555555);

      //creates tileset
      this.setUpTileSet("lockwood_overroot_sewers_map","Lockwood_Shop_District_Tileset","lockwood_shop_district_source_map");
      this.processMap.layer0.setDepth(9);
      //this.processMap.layer1.setDepth(1);
      //this.processMap.layer2.setDepth(1);
      this.processMap.layer3.setDepth(0);
      //this.processMap.layer2.setTint(0x808080);
      //this.processMap.layer3.setTint(0x606060);

      /*
      this.layer2.setTint(0x808080);
      this.layer3.setTint(0x404040);
      */

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();
      
      //creates player object
      this.setUpPlayer();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();

      //set up player swim
      this.setUpPlayerSwimCollider();

      //adds looping sound effect.
      //this.initLoopingSound('forestSFX','forest',1,"ambience");

      //this.initLoopingSound('forestThemeSFX','bertsz',0.01,"music");

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      

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

      this.initPortals(1789,440-8,2656,728,"warpCaveOutside","LockwoodOverrootAlley",false);
      

      this.enemyGroupArray = [];
     
      //setup lights group.
      this.setUpWallLights();
      this.initWallLight(1506,420,'torch');
      
      this.lightSource1 = this.lights.addLight(1792,50, 80, 0xffffff);
      this.lightSource1.intensity = 3;

      
      this.dayns = this.add.sprite(1472, 440-15, "dayns");
      this.dayns.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('dayns', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.dayns.anims.play("idle", true);
      this.dayns.setScale(1/3);
      this.dayns.setDepth(2);
      this.dayns.setPipeline('Light2D');

      this.roxie = this.add.sprite(1016, 426, "roxie");
      this.roxie.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('roxie', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.roxie.anims.play("idle", true);
      this.roxie.setScale(1/3);
      this.roxie.setDepth(2);
      this.lightSource2 = this.lights.addLight(1016,426, 90, 0x1ff0ae);
      this.lightSource2.intensity = 3;

      this.initSavePoints(2057,728-10);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;


    }

    update(){
      
      //calls the built in update function

      if(this.player2Active === true){
        this.player2Update();
      }else{
        this.defaultUpdate();
      }
      
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

     
    }

}
  

  
