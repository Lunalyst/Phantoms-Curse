

class sunFlowerCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'sunFlowerCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "sunFlowerCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //variables used for scrolling
    this.playerPreviousX = 0;
    this.playerPreviousY = 0;
    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.defaultPreload();

      //define an array of enemys we are using
      this.enemyGroupArray = ["blueSlimes","chestMimics"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("Sun_Flower_Cave" , "assets/tiledMap/LockWood/Forest_Tileset/Sun_Flower_Cave.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");

      this.load.spritesheet('backgroundSunflowerLevel', 'assets/backgrounds/flowerfield backdrop.png',{frameWidth: 1600 , frameHeight: 1315});
      this.load.spritesheet('backgroundSkyLevel', 'assets/backgrounds/sky backdrop.png',{frameWidth: 1024 , frameHeight: 1024});
      this.load.spritesheet("secretWall1" , "assets/gameObjects/secretWall1.png" , {frameWidth: 864 , frameHeight: 288 });
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.load.audioSprite('sunflowerThemeSFX','audio/used-audio/sunflower-theme-sounds/sunflower-theme-sounds.json',[
        "audio/used-audio/sunflower-theme-sounds/bertsz__calm.mp3"
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

      //sets up ambient lighting
      //this.setupLightingSystem(0x555555);

      //creates tileset
      this.setUpTileSet("Sun_Flower_Cave","Forest_Tileset","forest_source_map");
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      //this.initLoopingSound('forestSFX','forest',1);

      this.initLoopingSound('sunflowerThemeSFX','bertsz',0.05,"music");

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

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.skybackround = this.add.tileSprite(1500, -1740, 7*1024, 6*1024, "backgroundSkyLevel");
      this.skybackround.setDepth(-50);
      this.skybackround.setTint(0xd3d3d3);

      this.backround = this.add.tileSprite(3000, 1370, 7*1152, 765, "backgroundSunflowerLevel");
      this.backround.setDepth(-51);
      this.backround.setScale(0.7);
      this.backround.setTint(0xd3d3d3);

      this.initSavePoints(5490-4160,893-14);

      this.initPortals(982,1597-13,5119,1181,"warpCaveOutside","sunFlowerField");
      //2109-1469 = 640
      this.initPortals(6763-4160,1469-13,661,829,"warpCaveOutside","caveToSunflowers2");

      this.initPortals(5601-4160,893-13,4001,541,"warpCaveOutside","batCave");

      //fake warps not implemented yet.
      

      //makes secret wall
      this.secretWall1 = this.add.sprite(4943.6-4160, 1072.2, "secretWall1");
      this.secretWall1.setDepth(7);
      this.secretWall1.setScale(0.335);
      //this.secretWall1.setPipeline('Light2D');
      
      //sets up containers
      this.setUpContainers();

      let thisScene = this;

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //make a temp object
      let object = {
        flagToFind: "cave_chest_with_knife",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

      //if the player has already opened the chest spawm a mimic half the time
      this.randomInput = Math.floor((Math.random() * 3));
      if(object.foundFlag === true && this.randomInput === 1){
      //random number to determine if the mimic is spawned or a empty chest.


      setTimeout(function(){
          
        thisScene.initEnemy(5140-4160,1085-3,thisScene.playerSex,'chestMimic',false);

      },1000);
      
      //otherwise spawn the chest like normal.
      }else{

        setTimeout(function(){
           
          let knife = oneTimeItemArray.cave_chest_with_knife;
        
        //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
        thisScene.initItemContainer(5140-4160,1085-3,knife,true,"cave_chest_with_knife");
          
        },1000);

      }

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      this.initSigns(4666-4160,1085+13,"generic", "ominousOmen2");

      // adds lighting effect for level background
      //this.light1 = this.lights.addLight(4642-4160, 605-30, 100);
     
      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.initBarrier(6665-4160,1400,30,300);
      this.initBarrier(1548,1565,30,300);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){

          //creates health upgrade object in level
          thisScene.initHealthUpgrade(4642-4160, 605, 'healthUpgradeInSunflowerField');
          
          thisScene.initEnemy(5580-4160, 1245,thisScene.playerSex,'blueSlime',false);

          thisScene.initEnemy(6194-4160, 1373,thisScene.playerSex,'blueSlime',false);

          thisScene.spawnedEnemys = true;
        },1000);


        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
