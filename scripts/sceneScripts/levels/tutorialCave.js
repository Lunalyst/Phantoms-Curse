
class tutorialCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'tutorialCaveLevel',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "tutorialCaveLevel";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    //this.slimes;
    //this.slimeId = 0;

    

    }

    preload(){

      this.load.tilemapTiledJSON("cave_map" , "assets/tiledMap/LockWood/Cave_Tileset/Tutorial_Cave.json");

      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      this.defaultPreload();

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet('mimicFemale-evan-TF', 'assets/enemys/mimic_female_male1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evan-vore', 'assets/enemys/mimic_female_male2.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evelyn-TF', 'assets/enemys/mimic_female_female1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicFemale-evelyn-vore', 'assets/enemys/mimic_female_female2.png',{frameWidth: 381, frameHeight: 303 });
      
      this.load.spritesheet('mimicMale-evan-TF', 'assets/enemys/mimic_male_male1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicMale-evan-vore', 'assets/enemys/mimic_male_male2.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicMale-evelyn-TF', 'assets/enemys/mimic_male_female1.png',{frameWidth: 381, frameHeight: 303 });
      this.load.spritesheet('mimicMale-evelyn-vore', 'assets/enemys/mimic_male_female2.png',{frameWidth: 381, frameHeight: 303 });
      
      this.load.spritesheet('mimicTongue', 'assets/internalViews/mimicTongue.png',{frameWidth: 213, frameHeight: 213});
      this.load.spritesheet('mimicPenned', 'assets/internalViews/mimicPenned.png',{frameWidth: 213, frameHeight: 213});
      this.load.spritesheet('mimicPenning', 'assets/internalViews/mimicPenning.png',{frameWidth: 213, frameHeight: 213});
       
      this.load.spritesheet('slimePenning', 'assets/internalViews/slimePenning.png',{frameWidth: 213, frameHeight: 213});
       
      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.load.audioSprite('caveSFX','audio/used-audio/cave-sounds/cave-sounds.json',[
        "audio/used-audio/cave-sounds/szegvari-beach-coast-cave.mp3"
      ]);
      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
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

      //sets up ambient lighting
      this.setupLightingSystem(0x555555);

      //setup lights group.
      this.setUpWallLights();

      //creates tileset
      this.setUpTileSet("cave_map","Cave_Tileset","cave_source_map");

      //plays looping sound
      this.initLoopingSound('caveSFX','cave', 0.1);
      this.initLoopingSound('waterfallSFX','waterfall', 0.03);
    
      //creates player object
      this.setUpPlayer();

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

      this.initSigns(1075,1757+12,
        "you may find things on this island that can help you. when you open a container you may recieve a item. you can check your inventory by pressing tab. to move items around simply click them from there current slot to the slot you want it to be in. you have two special slots. weapon and ring. the weapon slot allows you to change your attack. rings help you more passively. if you have no weapon equipt you will simply flail about.  ",
        ['signLoop']);

      this.initSigns(1077,1257,
        "use these shrines to save your progress. you will find them scattered all over the island. these shrines are special and will restore your strength as well. ",
         ['signLoop']);

      this.initSigns(788,541+12,
        "This Island is host to many monsters. tread carefully! they will try and turn you into one of us....  ",
        ['signLoop']);

      this.initSigns(1642,573+12,
        "monsters might drop items if you defeat them. ",
          ['signLoop']);

      this.initSavePoints(896,1230);

      this.initWallLight(699,469,'ghostMushroom4');

      this.initWallLight(873,439,'ghostMushroom2');

      this.initWallLight(1016,513,'ghostMushroom3');
      this.initWallLight(1020,511,'ghostMushroom1');
      this.initWallLight(1024,513,'ghostMushroom4');

      this.initWallLight(1157,544,'ghostMushroom3');

      this.initWallLight(625,955,'ghostMushroom3');

      this.initWallLight(782+32,1093,'ghostMushroom3');
      this.initWallLight(794+32,1090,'ghostMushroom1');
      this.initWallLight(806+32,1093,'ghostMushroom4');

      this.initWallLight(994+32,1130,'ghostMushroom2');

      this.initWallLight(1104+32,1100,'ghostMushroom3');

      this.initWallLight(1600+32,1086,'ghostMushroom1');
      this.initWallLight(1602+32,1084,'ghostMushroom2');

      this.initWallLight(1902+32,1134,'ghostMushroom2');

      this.initWallLight(1719,1341,'ghostMushroom4');

      this.initWallLight(1710,1540,'ghostMushroom1');

      this.initWallLight(1958,1469,'ghostMushroom2');
      this.initWallLight(1950,1467,'ghostMushroom4');

      this.initPortals(465,1808,3735,541,"warpCaveInside","tutorialBeachLevel");

      this.initPortals(1777,529,390,1917,"warpCaveInside","ForestRavineHome");

      //sets up containers
      this.setUpContainers();

      let thisScene = this;

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","chestMimics"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //make a temp object
      let object = {
        flagToFind: "cave_tutorial_chest_with_oar",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the player has already opened the chest spawm a mimic half the time
      this.randomInput = Math.floor((Math.random() * 3));
      if(object.foundFlag === true && this.randomInput === 1){
      //random number to determine if the mimic is spawned or a empty chest.


      setTimeout(function(){
          
        thisScene.initEnemy(1185,1757-3,thisScene.playerSex,'chestMimic',false);

      },1000);
      
      //otherwise spawn the chest like normal.
      }else{

        setTimeout(function(){
          let oar = {
              itemID: 2,
              itemName: 'OAR',
              itemDescription: 'A WOOD PADDLE WHICH CAN BE USED AS A CLUB.',
              itemStackable: 0,
              itemAmount: 1
          };
          
          //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
          thisScene.initItemContainer(1185,1757-3,oar,true,"cave_tutorial_chest_with_oar");
          
        },2000);

      }
      
      
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
        setTimeout(function(){
          //generates enemys
          thisScene.initEnemy(1309, 605,thisScene.playerSex,'blueSlime',false);
          
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){
      
      console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
