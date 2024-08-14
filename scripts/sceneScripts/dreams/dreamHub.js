
class dreamHub extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DreamHub',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DreamHub";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("dream_hub_map" , "assets/tiledMap/Dream/Dream_Hub.json");

      this.load.image("dream_source_map" , "assets/tiledMap/Dream/Dream_Tileset.png");
      
      this.defaultPreload();

      this.load.spritesheet('dreamBackground', 'assets/backgrounds/dream_background.png',{frameWidth: 1400 , frameHeight: 664});


      this.load.spritesheet('bedWarp', 'assets/gameObjects/bedTeleport.png',{frameWidth: 249, frameHeight: 117 });

      this.load.audioSprite('andrewknSFX','audio/used-audio/dream-sounds/dream-sounds.json',[
        "audio/used-audio/dream-sounds/andrewkn-not-to-notice.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("dream_hub_map","Dream_Tileset","dream_source_map");
    
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
      this.initLoopingSound('andrewknSFX','andrewkn',0.1);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSigns(1281,925+12,
        "WELCOME TO YOUR DREAMS SCAPE. WHILE YOUR HERE YOUR BODY SLEEPS IN THE WAKING WORLD YOU CAN RELIVE MEMORYS OF PAST ENCOUNTERS WITH MONSTERS. ",
        ['signLoop']);

      this.initBedPortals(1031, 925+15);

      this.initSavePoints(863,925-15);
      
      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.enemyGroupArray = [""];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
      
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
      //this.enemyUpdate(this.enemyGroupArray);

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

    

    }

    

}
  

  
