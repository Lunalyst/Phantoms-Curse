

class ClinicRoom extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'ClinicRoom',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "ClinicRoom";

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
      this.load.tilemapTiledJSON("clinic_room_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Clinic_Room.json");
      
      this.load.spritesheet("wolfEmots" , "assets/hudElements/wolfEmots.png" , {frameWidth: 105 , frameHeight: 96 });
      this.load.spritesheet("deaugh" , "assets/npcs/deaugh.png" , {frameWidth: 273 , frameHeight: 363 });
      
      this.load.spritesheet("playerOnStrecher" , "assets/gameObjects/playerOnStrecher.png" , {frameWidth: 264 , frameHeight: 222 });
      
      this.load.spritesheet("miloUnarmed" , "assets/npcs/miloUnarmed.png" , {frameWidth: 459 , frameHeight: 300 });
      this.load.spritesheet("miloMaskedAndArmed" , "assets/npcs/miloMaskedAndArmed.png" , {frameWidth: 459 , frameHeight: 300 });
      this.load.spritesheet("miloEmots" , "assets/hudElements/miloEmots.png" , {frameWidth: 111 , frameHeight: 117 });

      this.load.spritesheet('miloProps', 'assets/gameObjects/miloProps.png',{frameWidth: 78 , frameHeight: 171});


      this.defaultPreload();

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/Paws and Rest by Gangstalka.mp3"
      ]);

      this.load.audioSprite('healSFX','audio/used-audio/button-sounds/button-sounds.json',[
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
      this.setUpTileSet("clinic_room_map","Castle_Interior_Tileset","castle_source_map");
    
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

      

      this.initPortalsWithTransparency(386,728+25,862,760,"door1","WaitingRoom",0.75);

      
      /*this.deaugh = this.add.sprite(665, 728+16, "deaugh");
      this.deaugh.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('deaugh', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.deaugh.anims.play("idle", true);
      this.deaugh.setScale(1/3);*/

 
      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //for this segment we need three flags
      //riddleAnsweredFullHp
      //RiddleAnsweredHurt
      //miloSavedThePlayer

      let riddleAnswered = {
        flagToFind: "riddleAnswered",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, riddleAnswered);

      let miloSaved = {
        flagToFind: "miloSavedThePlayer",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, miloSaved);

      if(this.player1.x === 752){
        //this.cutSceneActive = true;

        //used to prevent the player from moving while in the scene load in before the trigger npc activates.
        this.grabbed = true;

        this.mycamera.startFollow(this.player1);
        this.cameras.main.zoom = 2;
        this.cameras.main.followOffset.set(0,70);

        this.initMilo(676, 728+25,"test");

        console.log("miloSaved.foundFlag: ",miloSaved.foundFlag);

        if(riddleAnswered.foundFlag === true){
          console.log("riddleAnswered");
          this.initWolf(819, 728+16, "riddleAnswered");
          this.player1.visible = false;

        }else if(miloSaved.foundFlag === true){
          console.log("miloSavedThePlayer");
          this.initWolf(819, 728+16, "miloSavedThePlayer");

          this.player1.visible = false;

        }
      }
      


      

      //this.initSavePoints(502,760-10);

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
  

  
