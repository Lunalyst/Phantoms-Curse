

class AutumnsRoom extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'AutumnsRoom',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "AutumnsRoom";

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
      this.load.tilemapTiledJSON("autumns_room_map" , "assets/tiledMap/LockWood/Lockwood_Village_Interior_Tileset/Autumns_Room.json");
      
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
      this.setUpTileSet("autumns_room_map","Lockwood_House_Interior_Tileset","lockwood_house_interior_map");
      
      //this.processMap.layer1.setDepth(1);
      //this.processMap.layer0.setDepth(2);
      this.processMap.layer2.setTint(0xFFFFFF);
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

      this.initPortals(912,760-7,1420,760,"largeDoor","postOfficeHallway",true);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      if(this.player1.x === 541){
        //console.log("player now endoing!");

        this.player1.visible = false;

        this.grabbed = true;

        //here is where we change autumns landing sequence based on if the player payed.
        this.autumn = this.initAutumn(541+20, 760-26,"endoSequence1");
        //this.autumn.y = this.autumn.y - 300;

        this.mycamera.startFollow(this.autumn,true);
        this.cameras.main.zoom = 2;
        this.cameras.main.followOffset.set(-30,30);
      }else if(this.player1.x === 642){
        //console.log("player now endoing!");

        //this.player1.visible = false;
        this.grabbed = true;
        //here is where we change autumns landing sequence based on if the player payed.
        this.autumn = this.initAutumn(541+20, 760-26,"endoSequence2");
        //this.autumn.y = this.autumn.y - 300;

        this.mycamera.startFollow(this.player1,true,0,0,0,70);
        this.cameras.main.zoom = 2;
        //this.cameras.main.followOffset.set(-70,0);

        this.player1.flipXcontainer(true);
        this.player1.setPlayerOnLoadNPCDialogue();
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
  

  
