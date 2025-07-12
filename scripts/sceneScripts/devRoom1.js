

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

      this.load.spritesheet('bedWarp', 'assets/gameObjects/bedTeleport.png',{frameWidth: 249, frameHeight: 117 });
      this.load.spritesheet('storageLocker', 'assets/gameObjects/storageLocker.png',{frameWidth: 195, frameHeight: 291 });
      this.load.spritesheet('craftingBench', 'assets/gameObjects/craftingBench.png',{frameWidth: 291, frameHeight: 291 });
      
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
      

      this.initPortalsWithTransparency(637,605-13,1470 ,1725,"devDoor","ForestRavineHome",0.75);
      
      this.initBedPortals(364, 592+29);

      this.initPortals(864,605-13,1127,600,"door2","DevRoom2");

      this.setUpPlayerStorage();
      this.initStorage(721, 592);

      this.setUpPlayerCraftingBench();
      this.initPlayerCraftingBench(790, 592);

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

        //check to see if flag already exists
        let lunaDevDialogue1 = {
          flagToFind: "lunaDevDialogue1",
          foundFlag: false,
        };

        let lunaDevDialogue2 = {
          flagToFind: "lunaDevDialogue2",
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue1);

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue2);

        console.log("lunaDevDialogue1.foundFlag: ",lunaDevDialogue1.foundFlag," lunaDevDialogue2: ",lunaDevDialogue2.foundFlag);


        if(lunaDevDialogue2.foundFlag === true){

          //spawn luna with his dialogue
          this.initLunalyst(469,605,'devRoom2');
        }else{
          //spawn luna with his dialogue
          this.initLunalyst(469,605,'devRoom1');
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
  

  
