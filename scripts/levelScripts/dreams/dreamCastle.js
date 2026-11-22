

class dreamCastle extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'dreamCastle',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "dreamCastle";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

  

    

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("castle_source_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Castle_Interior_Tileset.png");
      this.load.tilemapTiledJSON("dream_castle_map" , "assets/tiledMap/Dream/Dream_Castle.json");
      
      this.load.spritesheet("wolfEmots" , "assets/hudElements/wolfEmots.png" , {frameWidth: 105 , frameHeight: 96 });
      this.load.spritesheet("deaugh" , "assets/npcs/deaugh.png" , {frameWidth: 121 , frameHeight: 121 });
      this.load.spritesheet("deaughAndLuna" , "assets/npcs/deaughAndLuna.png" , {frameWidth: 121 , frameHeight: 121 });
      this.load.spritesheet("deaughMaleVore" , "assets/npcs/deaughMaleVore.png" , {frameWidth: 121 , frameHeight: 121 });
      this.load.spritesheet("deaughCutscene" , "assets/npcs/deaughCutscene.png" , {frameWidth: 121 , frameHeight: 121 });

      this.load.spritesheet("deaughAndPlayerFemaleUnbirth1" , "assets/npcs/deaughAndPlayerFemaleUnbirth1.png" , {frameWidth: 121 , frameHeight: 121 });
      this.load.spritesheet("deaughAndPlayerFemaleUnbirth2" , "assets/npcs/deaughAndPlayerFemaleUnbirth2.png" , {frameWidth: 121 , frameHeight: 121 });

      this.load.spritesheet("deaughAndPlayerMale" , "assets/npcs/deaughAndPlayerMale.png" , {frameWidth: 121 , frameHeight: 121 });

      this.load.spritesheet("deaughAndPlayerMaleUnbirth1" , "assets/npcs/deaughAndPlayerMaleUnbirth1.png" , {frameWidth: 121 , frameHeight: 121 });
      this.load.spritesheet("deaughAndPlayerMaleUnbirth2" , "assets/npcs/deaughAndPlayerMaleUnbirth2.png" , {frameWidth: 121 , frameHeight: 121 });

      this.load.spritesheet("deaughPlayerFemale" , "assets/npcs/deaughPlayerFemale.png" , {frameWidth: 121 , frameHeight: 121 });

      this.defaultPreload();

      this.enemyGroupArray = [];

      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.audioSprite('wardSFX','audio/used-audio/ward-sounds/wolfs ward.json',[
        "audio/used-audio/ward-sounds/wolfs ward.mp3"
      ]);

      this.load.audioSprite('doorSFX','audio/used-audio/button-sounds/button-sounds.json',[
            "audio/used-audio/button-sounds/button-sounds.mp3"
        ]);

    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("dream_castle_map","Castle_Interior_Tileset","castle_source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('wardSFX','wolfs ward',0.01,"music");

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
      //as well as signs.

      

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initPortalsWithTransparency(700,728+25,1090,728,"door2","dreamLockwoodEntrance",0.75);

     this.initPortals(487,728+25,774,760,"door2","deaughsDreamRoom");

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();
      

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
    }

    update(){
      //calls the built in update function
      this.defaultUpdate();

    }

}
  

  
