

class postOfficeHallway extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'postOfficeHallway',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "postOfficeHallway";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("lockwood_house_interior_map" , "assets/tiledMap/LockWood/Lockwood_Village_Interior_Tileset/Lockwood_House_Interior_Tileset.png");
      this.load.tilemapTiledJSON("post_office_hallway_map" , "assets/tiledMap/LockWood/Lockwood_Village_Interior_Tileset/Post_Office_Hallway.json");
      
      //this.load.spritesheet("autumn" , "assets/npcs/autumn.png" , {frameWidth: 483 , frameHeight: 339 });
      

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
      this.setUpTileSet("post_office_hallway_map","Lockwood_House_Interior_Tileset","lockwood_house_interior_map");
      
      //this.processMap.layer1.setDepth(1);
      //this.processMap.layer0.setDepth(2);
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','Paws and Rest',0.05,"music");


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
      
      this.warp1 = this.initPortals(916,760-7,517,760,"spiralStairTop","postOfficeMain",true);

      this.initPortals(1420,760-7,912,760,"largeDoor","AutumnsRoom",true);

      //this.autumn = this.add.sprite(640, 760-30, "autumnMale");
      /*this.autumn.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('autumnMale', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.autumn.anims.play("idle", true);
      this.autumn.setScale(1/3);
      this.autumn.setDepth(0);*/

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //this.initAutumn(640, 760-30,"postOffice");

      this.initSigns(736,760+23,"question","Devourment on the Island.",false);

      //after flag has been removed, if in dream add the dreamflag.
      let fastTravelEndoWakingUp = {
        flagToFind: "fastTravelEndoWakingUp",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, fastTravelEndoWakingUp);

      if(fastTravelEndoWakingUp.foundFlag === true){
        // remove flag, and
        inventoryKeyEmitter.emit(inventoryKey.removeContainerFlag, fastTravelEndoWakingUp);

      }

      //this.initSigns(579,760+16,"question","The Curse Mark Plague",false);

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
  

  
