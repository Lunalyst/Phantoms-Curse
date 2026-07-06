

class DeaughsRoom extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DeaughsRoom',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DeaughsRoom";

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
      this.load.tilemapTiledJSON("deaughs_room_map" , "assets/tiledMap/LockWood/Castle_Interior_Tileset/Deaughs_Room.json");
      
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });
      
      this.load.spritesheet("wolfEmots" , "assets/hudElements/wolfEmots.png" , {frameWidth: 105 , frameHeight: 96 });
      this.load.spritesheet("deaugh" , "assets/npcs/deaugh.png" , {frameWidth: 273 , frameHeight: 363 });
      this.load.spritesheet("deaughAndLuna" , "assets/npcs/deaughAndLuna.png" , {frameWidth: 363 , frameHeight: 363 });
      
      this.load.spritesheet("wolfProps" , "assets/gameObjects/wolfProps.png" , {frameWidth: 96 , frameHeight: 96 });


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
      this.setUpTileSet("deaughs_room_map","Castle_Interior_Tileset","castle_source_map");
    
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

      this.initPortalsWithTransparency(774,728+25,487,760,"door2","WaitingRoom",0.75);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      this.initSigns(865,760+16,"question","Fundamentals of Cursed Energy",false);

      this.storageRoomDoor = this.initPortals(1024,728+25,578,760,"door2","StorageRoom");

      this.initSavePoints(669,760-10);

      let lab1 = {
        flagToFind: "labEncounter1Flag1",
        foundFlag: false,
      };

      let lab3 = {
        flagToFind: "labEncounter1Flag3",
        foundFlag: false,
      };

      let lab4 = {
        flagToFind: "labEncounter1Flag4",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lab1);

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lab3);

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lab4);
      if(lab4.foundFlag === true){

      }else if(lab3.foundFlag === true){

        //spawn wolfs cloths on the ground.
        this.headBand = this.add.sprite(1050,760+37, "wolfProps");
        this.headBand.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.headBand.anims.play("idle", true);
        this.headBand.setScale(1/3);
        this.headBand.setDepth(1);

        this.LabCoat = this.add.sprite(985,760+37, "wolfProps");
        this.LabCoat.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 1, end: 1 }), frameRate: 7, repeat: -1 });
        this.LabCoat.anims.play("idle", true);
        this.LabCoat.setScale(1/3);
        this.LabCoat.setDepth(1);

        this.pants = this.add.sprite(940,760+37, "wolfProps");
        this.pants.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 2, end: 2 }), frameRate: 7, repeat: -1 });
        this.pants.anims.play("idle", true);
        this.pants.setScale(1/3);
        this.pants.setDepth(1);

        inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,"labEncounter1Flag4");

        this.fakeWarp1 = new fakeWarp(this,this.storageRoomDoor.x,this.storageRoomDoor.y,'door2');
        this.storageRoomDoor.destroy();

       }else if(lab1.foundFlag === true){
        //spawn wofls cloths on the ground

        //spawn wolfs cloths on the ground.
        this.headBand = this.add.sprite(1050,760+37, "wolfProps");
        this.headBand.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
        this.headBand.anims.play("idle", true);
        this.headBand.setScale(1/3);
        this.headBand.setDepth(1);

        this.LabCoat = this.add.sprite(985,760+37, "wolfProps");
        this.LabCoat.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 1, end: 1 }), frameRate: 7, repeat: -1 });
        this.LabCoat.anims.play("idle", true);
        this.LabCoat.setScale(1/3);
        this.LabCoat.setDepth(1);

        this.pants = this.add.sprite(940,760+37, "wolfProps");
        this.pants.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('wolfProps', { start: 2, end: 2 }), frameRate: 7, repeat: -1 });
        this.pants.anims.play("idle", true);
        this.pants.setScale(1/3);
        this.pants.setDepth(1);

        //init npc for the next part of the quest.
        //remove interactable door, place false one, and spawn wolf npc for door.
        console.log("this.scene.storageRoomDoor: ",this.storageRoomDoor);
        this.fakeWarp1 = new fakeWarp(this,this.storageRoomDoor.x,this.storageRoomDoor.y,'door2');
        this.initWolf(this.storageRoomDoor.x, this.storageRoomDoor.y-10, "storageRoomDoor");
        this.storageRoomDoor.destroy();

       }else{
        this.initWolf(461, 728+16, "labEncounter1");
        this.initLunalyst(773,600,'wolfQuest');
       }

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
  

  
