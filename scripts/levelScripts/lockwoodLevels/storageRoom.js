

class StorageRoom extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'StorageRoom',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "StorageRoom";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //labEncounter1Flag2

    

    }

    preload(){


      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("castle_source_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Castle_Interior_Tileset.png");
      this.load.tilemapTiledJSON("Storage_Room_Prequest_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Storage_Room_Prequest.json");
      this.load.tilemapTiledJSON("Storage_Room_Postquest_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Storage_Room_Postquest.json");
      
      this.load.spritesheet("wolfEmots" , "assets/hudElements/wolfEmots.png" , {frameWidth: 105 , frameHeight: 96 });
      this.load.spritesheet("deaugh" , "assets/npcs/deaugh.png" , {frameWidth: 273 , frameHeight: 363 });
      this.load.spritesheet("deaughAndLuna" , "assets/npcs/deaughAndLuna.png" , {frameWidth: 273 , frameHeight: 363 });

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

      
      let flag1 = {
        flagToFind: "labEncounter1Flag2",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, flag1);

      if(flag1.foundFlag === true){
        //creates tileset
        console.log("found labEncounter1Flag2")
        this.setUpTileSet("Storage_Room_Postquest_map","Castle_Interior_Tileset","castle_source_map");
      }else{
        //creates tileset\
        console.log("missing labEncounter1Flag2")
        this.setUpTileSet("Storage_Room_Prequest_map","Castle_Interior_Tileset","castle_source_map");
      }
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

      this.initPortalsWithTransparency(578,728+25,1024,760,"door1","DeaughsRoom",0.75);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //make cutscene of wolf x luna if player is loaded into this exact spot
      if(this.player1.x === 640){

        this.player1.visible = false;

        //used to prevent the player from moving while in the scene load in before the trigger npc activates.
        this.grabbed = true;

        this.initWolf(636, 728+16, "wolfxLuna");
        this.initLunalyst(827+20,763,'wolfxLuna');
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
  

  
