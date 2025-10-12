

class HomeInterior1 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'HomeInterior1',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "HomeInterior1";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

  

    

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("home_source_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Home_Interior_Tileset.png");
      this.load.tilemapTiledJSON("home_interior1_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Player_Home_Interior1.json");
     

      this.defaultPreload();

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/Paws and Rest by Gangstalka.mp3"
      ]);

    }

    create(){
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("home_interior1_map","Home_Interior_Tileset","home_source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','Paws and Rest',0.05,"music");

      //creates a group of slime objects
      this.slimes = this.physics.add.group();

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

      this.initPortalsWithTransparency(500,592,1501,1277,"door1","ForestRavineHome",0.75);
      
      this.initPortals(352,592,352,605,"door2","HomeInterior2");
      
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
  

  
