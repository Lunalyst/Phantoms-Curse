

class TestForest extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'TestForest',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "TestForest";

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
      this.enemyGroupArray = ["tigers",'rabbits'];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("TestForestMap" , "assets/tiledMap/LockWood/Forest_Tileset/Test_Forest.json");

      this.load.spritesheet('backgroundForestStaticLevel', 'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});
      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/Hare-Raising Harmonies by Gangstalka.mp3"
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
      this.setUpTileSet("TestForestMap","Forest_Tileset","forest_source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1,"ambience");

      this.initLoopingSound('forestThemeSFX','bertsz',0.01,"music");

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


      this.backroundXOrigin = 1500;
      this.backroundYOrigin = 600;
      this.backround = this.add.tileSprite(1500, 600, 10*1600 ,1090, "backgroundForestStaticLevel");
      this.backround.setDepth(-50);
      this.backround.setScale(.9);
      this.backround.setTint(0xd3d3d3);

      this.parrallax1XOrigin = 3000;
      this.parrallax1YOrigin = 780;
      this.parrallax1 = this.add.tileSprite(3000, 780, 1920*10 ,1920, "tree_parrallax");
      this.parrallax1.setScale(1/3);
      this.parrallax1.setDepth(-50);
      this.parrallax1.setTint(0x444444);

      this.parrallax2XOrigin = 3000;
      this.parrallax2YOrigin = 700+600;
      this.parrallax2 = this.add.tileSprite(3000, 700+600, 1920*10 ,1920, "ground_parrallax");
      this.parrallax2.setScale(1/3);
      this.parrallax2.setDepth(-50);
      this.parrallax2.setTint(0x444444);

      this.initSavePoints(761,989-14);
      this.initSavePoints(4230,1085-14);

      console.log("this.test4: ",this.test4 );

      this.initPortals(378,1149-13,1892,829,"warpCaveOutside","TestCave");
//5812,1181 1570,829
      this.initPortals(5812,1181-13,1570,829,"warpCaveOutside","caveToSunflowers2");

      //sets up containers
      this.setUpContainers();

      setTimeout(function(){
       
        let speedRing = oneTimeItemArray.cave_chest_with_speedRing;
    
        //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
        thisScene.initItemContainer(3421,1021-3,speedRing,true,"cave_chest_with_speedRing");
      
      },2000);

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      //setTimeout(function(){
          
        thisScene.initEnemy(3352,1220,thisScene.playerSex,'rabbit',false);
        thisScene.initEnemy(4587,1170,thisScene.playerSex,'rabbit',false);

        //note, have to spawn tiger after rabbits, otherwise collider will not be applied correctly. 
        thisScene.initEnemy(1356,1139,thisScene.playerSex,'tiger',false);

        thisScene.spawnedEnemys = true;
        //},1000);


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

    }

}
  

  
