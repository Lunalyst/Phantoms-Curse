

class devRoom1 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DevRoom1',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DevRoom1";

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
      this.load.tilemapTiledJSON("dev_interior1_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/dev_room1.json");
     
      this.load.spritesheet('backgroundSkyLevel', 'assets/backgrounds/sky backdrop.png',{frameWidth: 1024 , frameHeight: 1024});
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

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
      this.setUpTileSet("dev_interior1_map","Home_Interior_Tileset","home_source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','Paws and Rest',0.05);

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

      /*this.initSigns(1574,1673,
        "This Island is host to many monsters. tread carefully! ",
         ['signLoop']);
        */
      

      this.initPortalsWithTransparency(637,605-13,1470,1725,"door1","ForestRavineHome",0.75);
      
      this.initPortals(864,605-13,419,605,"door2","DevRoom2");


      
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

        this.backround = this.add.tileSprite(1500, -1940, 7*1024, 6*1024, "backgroundSkyLevel");
        this.backround.setDepth(-50);
        this.backround.setTint(0xd3d3d3);

        //make a temp object
      let object1 = {
        flagToFind: "lunaProtoDialogue1",
        foundFlag: false,
      };

      let object2 = {
        flagToFind: "lunaProtoDialogue2",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object2);

      if(object1.foundFlag === true && object2.foundFlag === false){
        //let dialogue = 'OH, HELLO AGIAN HUMAN. IM STILL BUSY CLEARING THIS RUBBLE. JUST GIVE ME A LITTLE BIT OK? ';
      this.initLunalyst(380,605,
        dialogue,
        ['lunaNeutral','lunaHappy'],
      'lunaProtoDialogue1'
      );
      }else if(object2.foundFlag === true){
        let line1 = 'QUITE PERSISTANT ARNT YOU?                                             ';
        let line2 = 'THATS KINDA CUTE ^_^ JUST GIVE ME A LITTLE BIT OK?';
        let dialogue = line1 + line2;
        this.initLunalyst(380,605,
        dialogue,
        ['lunaFingerTouch','lunaHappy'],
      'lunaProtoDialogue2'
      );
      }else{
        let line1 = 'OH, A HUMAN!                                                                ';
        let line2 = 'ITS BEEN A LONG TIME SINCE I HAVE SEEN ONE OF YOUR KIND HERE. I AM LUNALYST. ';
        let line3 = 'I BET YOU HAVE ALREADY ENCOUNTERED SOME OF THE CURSED. ';
        let line4 = 'TRY TO STAY SAFE, SINCE THEY WILL TRY AN TURN YOU INTO THEM. ';
        let line5 = 'ANYWAY THE WAY BACK TO LOCKWOODS THROUGH THIS CAVE. ';
        let line6 = 'UNFORTUNATELY THE WAYS A LITTLE BLOCKED RIGHT NOW. ';
        let line7 = 'IM WORKING ON CLEARING ON IT. FOR NOW JUST GIVE ME SOME TIME. ';
        let dialogue = line1 + line2 + line3 + line4 + line5 + line6 + line7;
        this.initLunalyst(380,605,
          dialogue,
          ['lunaStarEyes','lunaHappy','lunaNeutral','lunaHappy','lunaNeutral','lunaFingerTouch'],
        'lunaProtoDialogue'
        );
     }  

    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      
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
      
      //calls the built in update function
      this.defaultUpdate();

    }

}
  

  