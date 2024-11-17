
class TestCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'TestCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "TestCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){

      
      this.load.tilemapTiledJSON("test_cave_map" , "assets/tiledMap/LockWood/Cave_Tileset/Test_Cave.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      
      this.defaultPreload();

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet('mimicFemale-evan-TF', 'assets/enemys/mimic_female_male1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evan-vore', 'assets/enemys/mimic_female_male2.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evelyn-TF', 'assets/enemys/mimic_female_female1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evelyn-vore', 'assets/enemys/mimic_female_female2.png',{frameWidth: 381, frameHeight: 303 });
      

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
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
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("test_cave_map","Cave_Tileset","cave_source_map");
    
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

      //activates sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSavePoints(687,765-14);

      this.initPortals(343,829-13,2566,1373,"warpCaveInside","ForestRavineHome");

      this.initPortals(1892,829-12,378,1149,"warpCaveInside","TestForest");

      //creates container objects.
      this.setUpContainers();

      let thisScene = this;
      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","chestMimics"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //check container flag to see if a mimic could spawn.

      //make a temp object
      let object = {
        flagToFind: "cave_chest_with_axe",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the player has already opened the chest spawm a mimic half the time
      this.randomInput = Math.floor((Math.random() * 3));
      if(object.foundFlag === true /*&& this.randomInput === 1*/){
      //random number to determine if the mimic is spawned or a empty chest.


      setTimeout(function(){
          
        thisScene.initEnemy(1383,666,thisScene.playerSex,'chestMimic',false);

      },1000);
      
      //otherwise spawn the chest like normal.
      }else{

        setTimeout(function(){
            
            let axe = {
                itemID: 10,
                itemName: 'AXE',
                itemDescription: 'CAN BE USED TO CUT MONSTERS AND WOOD.',
                itemStackable: 0,
                itemAmount: 1
            };
            
            //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
            thisScene.initItemContainer(1383,666,axe,true,"cave_chest_with_axe");  
          
        },1000);

      }
  
      //sets up item drops for the scene

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
          
          thisScene.initEnemy(1073, 893,thisScene.playerSex,'blueSlime',false);
          thisScene.initEnemy(1173, 893,thisScene.playerSex,'blueSlime',false);
          
          //thisScene.initEnemy(1173,700,thisScene.playerSex,'tiger');
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
