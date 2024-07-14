

class sunFlowerField extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'sunFlowerField',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "sunFlowerField";

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
      this.load.image("source_map" , "assets/tiledMap/LockWood/Forest_Large_Tiles.png");
      this.load.tilemapTiledJSON("Sun_Flower_Fields" , "assets/tiledMap/LockWood/Sun_Flower_Fields.json");
      

      this.load.spritesheet('backgroundSunflowerLevel', 'assets/flowerfield backdrop.png',{frameWidth: 1152, frameHeight: 765});
      this.load.spritesheet('backgroundSkyLevel', 'assets/sky backdrop.png',{frameWidth: 1024 , frameHeight: 1024});
      this.load.spritesheet('sunflowerParallax', 'assets/flowerfield.png',{frameWidth: 5760 , frameHeight: 4800});
      this.load.spritesheet("secretWall1" , "assets/secretWall1.png" , {frameWidth: 864 , frameHeight: 288 });

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/bertsz__calm.mp3"
      ]);
    }

    create(){
      
      //sets up gameover location
      this.setupGameoverLocation("forestGameover");

      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      this.loadGamePlayData();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("Sun_Flower_Fields","Forest_Large_Tiles","source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1);

      this.initLoopingSound('forestThemeSFX','bertsz',0.05);

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

      this.skybackround = this.add.tileSprite(1500, 1980, 8*1024, 8*1024, "backgroundSkyLevel");
      this.skybackround.setDepth(-51);
      this.skybackround.setTint(0xd3d3d3);

      this.backround = this.add.tileSprite(3000, 2010, 10*1152, 765, "backgroundSunflowerLevel");
      this.backround.setDepth(-50);
      this.backround.setScale(0.6);
      this.backround.setTint(0xd3d3d3);


      this.parrallax1 = this.add.tileSprite(1500, 2130, 5*5000,4800, "sunflowerParallax");
      this.parrallax1.setScale(1/3);
      this.parrallax1.setDepth(-50);
      this.parrallax1.setTint(0x808080);

      
      this.initSavePoints(759,2077-14);

      this.initSavePoints(5490,1533-14);

      this.initPortals(400,2109-13,661,829,"warpCaveOutside","caveToSunflowers1");

      this.initPortals(6763,2109-13,661,829,"warpCaveOutside","caveToSunflowers2");

      //makes secret wall
      this.secretWall1 = this.add.sprite(4943.6, 1712.2, "secretWall1");
      this.secretWall1.setDepth(7);
      this.secretWall1.setScale(0.335);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //creates health upgrade object in level
      this.initHealthUpgrade(4642, 1245, 'healthUpgradeInSunflowerField');

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["beeDrones"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
          
          thisScene.initEnemy(1509, 2000,thisScene.playerSex,'beeDrone');

          thisScene.initEnemy(2009, 2000,thisScene.playerSex,'beeDrone');

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


      //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX){
        this.parrallax1.x += 0.5;
        this.backround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX){
        this.parrallax1.x -= 0.5;
        this.backround.x -= 0.7;
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y -= 0.1;
        this.backround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y += 0.1;
        this.backround.y += 0.3;
      }

      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
