

class PondForest extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'PondForest',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "PondForest";

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

      this.enemyGroupArray = ["whiteCats","bats"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);
      
      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("ForestPondMap" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Pond.json");
      this.load.tilemapTiledJSON("ForestPondMapViv" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Pond_Viv.json");

      this.load.spritesheet('backgroundForestStaticLevel', 'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});
      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet("secretWall2" , "assets/gameObjects/secretWall2.png" , {frameWidth: 960 , frameHeight: 1248 });
      
      
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });


      this.load.spritesheet('rockPile', 'assets/gameObjects/rockPile.png',{frameWidth: 126, frameHeight: 96 });

      this.load.audioSprite('rubbleSFX','audio/used-audio/rubble-sounds/rubble-sounds.json',[
        "audio/used-audio/rubble-sounds/rubble-sounds.mp3"
      ]);

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('whitecatThemeSFX','audio/used-audio/whitecat-theme-sounds/whitecat-theme-sounds.json',[
        "audio/used-audio/whitecat-theme-sounds/whitecat-theme-sounds.mp3"
      ]);

      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
      ]);

      //weapon sound effects
      this.load.audioSprite('weaponSFX1','audio/used-audio/player-sounds/weapon-swings.json',[
        "audio/used-audio/player-sounds/weapon-swings.mp3"
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

      let vivianDialogue1 = {
        flagToFind: "vivianRummaging",
        foundFlag: false,
      };

      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, vivianDialogue1);

      if(vivianDialogue1.foundFlag === true){
        //creates tileset
        this.setUpTileSet("ForestPondMapViv","Forest_Tileset","forest_source_map");
      }else{
        //creates tileset
        this.setUpTileSet("ForestPondMap","Forest_Tileset","forest_source_map");

      }
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1,"ambience");

      this.initLoopingSound('waterfallSFX','waterfall', 0.01,"ambience");

      this.initLoopingSound('whitecatThemeSFX','theme',0.03,"music");

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

      this.initSigns(2571,1080+17,
        "ALL THAT YOU ARE, AND ALL THAT YOU COULD BE. YOUR HEART BECOMES APART OF ME. FROM YOUR SEED SPROUTED A GREAT TREE. WITH BRANCHES SO WIDE, THAT IN ITS SHADE, OUR NIGHTMARES COULD HIDE.",
        ['signLoop']);

      /*this.skybackround = this.add.tileSprite(1500, 800, 8*1377,918, "backgroundForestStaticLevel");
      this.skybackround.setDepth(-51);
      this.skybackround.setTint(0xd3d3d3);*/

      this.backroundXOrigin = 1500;
      this.backroundYOrigin = 500;
      this.backround = this.add.tileSprite(this.backroundXOrigin, this.backroundYOrigin, 10*1600 ,1090, "backgroundForestStaticLevel");
      this.backround.setDepth(-50);
      this.backround.setScale(.9);
      this.backround.setTint(0xd3d3d3);

      this.parrallax1XOrigin = 3000;
      this.parrallax1YOrigin = 700;
      this.parrallax1 = this.add.tileSprite(3000, 700, 1920*10 ,1920, "tree_parrallax");
      this.parrallax1.setScale(1/3);
      this.parrallax1.setDepth(-50);
      this.parrallax1.setTint(0x444444);

      this.parrallax2XOrigin = 3000;
      this.parrallax2YOrigin = 700+900;
      this.parrallax2 = this.add.tileSprite(3000, 700+900, 1920*10 ,1920*2, "ground_parrallax");
      this.parrallax2.setScale(1/3);
      this.parrallax2.setDepth(-50);
      this.parrallax2.setTint(0x444444);

      this.initSavePoints(2990,824-10);

      //this.initSavePoints(2150,1368-10);

      this.initPortals(381,1661-13,1796,573,"warpCaveOutside","blueSlimeCave1");

      this.initPortals(4780,1053-13,637,605,"door2","DevRoom1");

      this.initPortals(5039,1149-13,368,1080,"warpCaveOutside","ShadowCaveUpper");

      //here is where we can do a flag check to see if the player has interacted with vivian or not.
      this.initPortals(2752,824-8,1005,600,"door1","messyShed");
      
      


      this.secretWall1 = this.add.sprite(2832-16, 1168-32, "secretWall2");
      this.secretWall1.setDepth(7);
      this.secretWall1.setScale(1/3);

      //this.initPortals(5812,1181-13,1570,829,"warpCaveOutside","caveToSunflowers2");

      //sets up containers
      this.setUpContainers();

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //needed to use cursed heart projectiles.
      this.setUpCursedHeartProjectiles();
      this.setUpCursedHeartsProjectilesBarriers()

      //make a temp object
      let object1 = {
        flagToFind: "lunaProtoDialogue1",
        foundFlag: false,
      };

      let object2 = {
        flagToFind: "lunaProtoDialogue2",
        foundFlag: false,
      };

      this.initLunalyst(4966,1147,'clearingTheWay');

      //this.setUpEnemyBarriers();
      //this.initBarrier(650,1400,30,300);
      //this.initBarrier(2256,1400,30,300);
      //this.initBarrier(3221,1000,30,1300);
      //this.initBarrier(4720,950,30,300);

      //sets up rubble pile
      this.setUpRockPile();

      this.initRockPile(4164,1400+24);
      this.initRockPile(1598,1432+24);
      //this.initRockPile(1598,1300+24);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){

          thisScene.initEnemy(1497,1769,thisScene.playerSex,'whiteCat',false); 
          thisScene.initEnemy(4089,1673,thisScene.playerSex,'whiteCat',false); 
          
          //thisScene.initEnemy(2976,1496,thisScene.playerSex,'whiteCat',false); 
          //thisScene.initEnemy(2036,1120,thisScene.playerSex,'bat',false,'wingFlapSFX1');   
          thisScene.initEnemy(1671,1073+30,thisScene.playerSex,'bat',false);
          thisScene.initEnemy(3920,1098,thisScene.playerSex,'bat',false);        
          thisScene.spawnedEnemys = true;
        },1000);


        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;

        //endTimeTest()
    }

    

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
     
      //this.countActiveScenes();
      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);


      //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,900,0.5);
        this.backgroundRangeRight(this.backround,this.backroundXOrigin,900,0.7);
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,900,0.5);
        this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,900,0.5);
        this.backgroundRangeLeft(this.backround,this.backroundXOrigin,900,0.7);
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeUp(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeUp(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeUp(this.backround,this.backroundYOrigin,90,0.3);
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backgroundRangeDown(this.parrallax1,this.parrallax1YOrigin,90,0.1);
        this.backgroundRangeDown(this.parrallax2,this.parrallax2YOrigin,90,0.1);
        this.backgroundRangeDown(this.backround,this.backroundYOrigin,30,0.3);
      }

      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

      //console.log("this.sound.soundGroups: ", this.sound.soundGroups);

    }

    

}
  

  
