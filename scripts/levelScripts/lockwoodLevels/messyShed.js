

class messyShed extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'messyShed',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "messyShed";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){

      this.load.image("home_source_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Home_Interior_Tileset.png");
      this.load.tilemapTiledJSON("Messy_Shed_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Messy_Storage_Shed.json");
     
      //this.load.spritesheet('bedWarp', 'assets/gameObjects/bedTeleport.png',{frameWidth: 249, frameHeight: 117 });
      //this.load.spritesheet('storageLocker', 'assets/gameObjects/storageLocker.png',{frameWidth: 195, frameHeight: 291 });
      //this.load.spritesheet('craftingBench', 'assets/gameObjects/craftingBench.png',{frameWidth: 291, frameHeight: 291 });
      
      //this.load.spritesheet('tutorialSprite', 'assets/hudElements/tutorialSprite.png',{frameWidth: 300 , frameHeight: 300});
      //this.load.spritesheet('tutorialBorder', 'assets/hudElements/tutorialBorder.png',{frameWidth: 306 , frameHeight: 306});

      //storageLocker with a lower case s
      this.defaultPreload();

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/Paws and Rest by Gangstalka.mp3"
      ]);
      
    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("Messy_Shed_map","Home_Interior_Tileset","home_source_map");

      //sets up item drops for the scene and som other useful groups.
      this.setUpItemDrops();

      this.setUpItemDropCollider();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','Paws and Rest',0.05);

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
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      /*this.initSigns(1574,1673,
        "This Island is host to many monsters. tread carefully! ",
         ['signLoop']);

      this.initSavePoints(896,1230);*/

      //this.initSavePoints(450,590);

      this.initPortalsWithTransparency(1005,600-8,2753,824,"door1","PondForest",0.75);

      //sets up containers
      this.setUpContainers();

      let empty = oneTimeItemArray.empty_chest;
      //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
      this.initItemContainer(405,698,empty,true,"empty"); 
      this.initItemContainer(546,698,empty,true,"empty"); 
      this.initItemContainer(671,698,empty,true,"empty"); 

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
          //thisScene.initSlimes(300, 500, 1,thisScene.playerSex);

          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
      
    }

    update(){
      //calls the built in update function
      this.defaultUpdate();

      console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

    }

}
  

  
