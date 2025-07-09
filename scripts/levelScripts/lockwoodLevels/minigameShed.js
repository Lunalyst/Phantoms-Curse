

class minigameShed extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'minigameShed',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "minigameShed";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){

      this.load.image("home_source_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Home_Interior_Tileset.png");
      this.load.tilemapTiledJSON("Minigame_Shed_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Minigame_Shed.json");

      this.load.spritesheet("vivian" , "assets/npcs/vivian.png" , {frameWidth: 351 , frameHeight: 315 });
      this.load.spritesheet("vivianExtension" , "assets/npcs/vivianExtension.png" , {frameWidth: 351 , frameHeight: 315 });
      this.load.spritesheet("vivianEndings" , "assets/npcs/vivianEndings.png" , {frameWidth: 351 , frameHeight: 315 });
      this.load.spritesheet("vivianEmots" , "assets/hudElements/VivianEmots.png" , {frameWidth: 75 , frameHeight: 66 });
      //storageLocker with a lower case s
      this.defaultPreload();

      this.load.audioSprite('foxSFX','audio/used-audio/fox-scream-sounds/fox-scream-sounds.json',[
        "audio/used-audio/fox-scream-sounds/fox-scream-sounds.mp3"
      ]);

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/Paws and Rest by Gangstalka.mp3"
      ]);

       this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
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

      //do a flag check to see if the player has interacted with vivian.
      let vivianDialogue1 = {
        flagToFind: "obtained_lantern",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue1);

     
      this.setUpTileSet("Minigame_Shed_map","Home_Interior_Tileset","home_source_map");

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

      //let rng decide order
      let positionsX = [445,576,701];
      let positionsY = [694,694,694];

      //make a temp object
      let object = {
        flagToFind: "obtained_lantern",
        foundFlag: false,
      };

      //call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //give player lantern
      this.vivianLogic = "playerWinsShell";
      if(object.foundFlag === false){
        this.vivianLogic = "playerWinsLantern";
      }

      //important array used to tell vivians instances to stop showing tells. is a array of refrences to the three vivians spawned
      this.vivianArray = [];

      let random = Math.floor((Math.random() * 3));
      //console.log(random);
      if(random === 0){
         //tf sequence
         //console.log("tfSequence 0");
        this.initVivian(positionsX[0],positionsY[0],'tfSequence');

        random = Math.floor((Math.random() * 2));
         //console.log(random);

        if(random === 0){
          //console.log("winning 1");
          this.initVivian(positionsX[1],positionsY[1],this.vivianLogic);

          //console.log("vore 2");
          this.initVivian(positionsX[2],positionsY[2],'voreSequence');

        }else{

           //console.log("vore 1");
          this.initVivian(positionsX[1],positionsY[1],'voreSequence');

           //console.log("winning 2");
          this.initVivian(positionsX[2],positionsY[2],this.vivianLogic);

        }

      }else if(random === 1){
         //tf sequence
          //console.log("tfseq 1");
         this.initVivian(positionsX[1],positionsY[1],'tfSequence');

        random = Math.floor((Math.random() * 2));
        //console.log(random);

        if(random === 0){
           //console.log("win 0");
         this.initVivian(positionsX[0],positionsY[0],this.vivianLogic);

          //console.log("vore 2");
         this.initVivian(positionsX[2],positionsY[2],'voreSequence');

        }else{
          //console.log("vore 0");
          this.initVivian(positionsX[0],positionsY[0],'voreSequence');
          ///console.log("win 2");
          this.initVivian(positionsX[2],positionsY[2],this.vivianLogic);

        }

      }else{
        //tf sequence
        this.initVivian(positionsX[2],positionsY[2],'tfSequence');
        //console.log("tf 2");

        random = Math.floor((Math.random() * 2));
         //console.log(random);

        if(random === 0){
          // console.log("win 0");
          this.initVivian(positionsX[0],positionsY[0],this.vivianLogic);
          //console.log("vore 1");
          this.initVivian(positionsX[1],positionsY[1],'voreSequence');

        }else{
          //console.log("vore 0");
          this.initVivian(positionsX[0],positionsY[0],'voreSequence');
          //console.log("win 1");
          this.initVivian(positionsX[1],positionsY[1],this.vivianLogic);

        }

      }
      this.pausedInTextBox = false;
      controlKeyEmitter.emit(controlKeyEvent.toggleForTextBox, true);


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

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

    }

}
  

  
