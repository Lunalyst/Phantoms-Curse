
class tutorialBeach extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'tutorialBeachLevel',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene
    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "tutorialBeachLevel";

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
      
      this.load.tilemapTiledJSON("beach_map" , "assets/tiledMap/LockWood/Beach_Tileset/Tutorial_Beach.json");

      //preload of object which are scene specific
      this.load.spritesheet('backgroundBeachLevel', 'assets/backgrounds/beach_background.png',{frameWidth: 1000 , frameHeight: 1000});
      this.load.spritesheet('tutorialSprite', 'assets/hudElements/tutorialSprite.png',{frameWidth: 300 , frameHeight: 300});
      this.load.spritesheet('tutorialBorder', 'assets/hudElements/tutorialBorder.png',{frameWidth: 306 , frameHeight: 306});

      this.load.image("beach_source_map" , "assets/tiledMap/LockWood/Beach_Tileset/Beach_Tileset.png");
      
      this.defaultPreload();

     this.load.audioSprite('oceanSFX','audio/used-audio/ocean-sounds/ocean-sounds.json',[
        "audio/used-audio/ocean-sounds/norwayjohn__ocean-crete.mp3",
        "audio/used-audio/ocean-sounds/norwayjohn__ocean-crete.ogg"
      ]);

      
   
    }

    create(){
    
      //sets up gameover location
      this.setupGameoverLocation("beachGameover");

      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();

      //controls the Background
      this.backround = this.add.tileSprite(0, 400, 10000, 1000, "backgroundBeachLevel");
      this.backround.setScale(1.5);
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("beach_map","Beach_Tileset","beach_source_map");

      //sets up item drops for the scene and som other useful groups.
      this.setUpItemDrops();

      this.setUpItemDropCollider();

      //make a temp object
      let object = {
        flagToFind: "movement_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      if(object.foundFlag === false){
        this.initTutorialPrompt(578,920,"movement");
      }

      //make a temp object
      object = {
        flagToFind: "platforms_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      if(object.foundFlag === false){
        this.initTutorialPrompt(1728,792,"platforms");
      }

      //make a temp object
      object = {
        flagToFind: "worldDrops_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      if(object.foundFlag === false){
        this.initTutorialPrompt(2811,568,"worldDrops");
        this.initItemDrop(2901,568,14,1,1,"COCONUT"," APPLE OF THE SEA. ","drop",1);
      //otherwise, random drop chance for coconut.
      }else{

      }


      //make a temp object
      object = {
        flagToFind: "warps_tutorial",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      if(object.foundFlag === false){
        this.initTutorialPrompt(3569,504,"warps");
      }

      //adds looping sound effect.
      this.initLoopingSound('oceanSFX','ocean',0.1);

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
      
      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initPortals(3735,528,465,1821,"warpCaveOutside","tutorialCaveLevel");

      this.initSigns(877,888+18,
        "to anyone who wash up here, head towards the cave to the right.",
        ['signLoop']);

      
      //make a sprite 
      this.tutorialSprite = new TutorialSprite(this, 600, 380);

      //sets up containers
      this.setUpContainers();
      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
                926,
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      
      
      //calls the built in update function
      this.defaultUpdate();

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
       
        this.backround.y += 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        
        this.backround.y -= 0.3;
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }


}
  

  
