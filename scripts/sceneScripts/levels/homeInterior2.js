

class HomeInterior2 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'HomeInterior2',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "HomeInterior2";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    //this.slimes;
    //this.slimeId = 0;

    

    }

    preload(){

      this.load.tilemapTiledJSON("home_interior2_map" , "assets/tiledMap/LockWood/Player_Home_Interior2.json");
      
      this.defaultPreload();

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/andrewkn-not-to-notice.mp3"
      ]);
      
    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("home_interior2_map","Forest_Large_Tiles","source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','andrewkn',0.1);

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

      this.initSavePoints(480,590);

      this.initPortalsWithTransparency(352,592,352,605,"door2","HomeInterior1",0.75);

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
  

  
