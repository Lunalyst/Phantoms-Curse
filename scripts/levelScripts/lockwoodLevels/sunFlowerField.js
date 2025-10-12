

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

      //define an array of enemys we are using
      this.enemyGroupArray = ["beeDrones"];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);

      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("Sun_Flower_Fields" , "assets/tiledMap/LockWood/Forest_Tileset/Sun_Flower_Fields.json");
      
      this.load.spritesheet('backgroundSunflowerLevel', 'assets/backgrounds/flowerfield backdrop.png',{frameWidth: 1600 , frameHeight: 1315});
      this.load.spritesheet('backgroundTreeLevel', 'assets/backgrounds/tree backdrop.png',{frameWidth: 1600 , frameHeight: 1090});
      this.load.spritesheet('Sun_Flower_Parrallax', 'assets/parrallax/Sun_Flower_Parrallax.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

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

      //creates tileset
      this.setUpTileSet("Sun_Flower_Fields","Forest_Tileset","forest_source_map");
    
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

      this.parrallax2XOrigin = 3000;
      this.parrallax2YOrigin = -280+70;
      this.parrallax2 = this.add.tileSprite(3000, -280+70, 7*1600, 1090, "backgroundTreeLevel");
      this.parrallax2.flipY = true;
      this.parrallax2.flipX = true;
      this.parrallax2.setDepth(-50);
      this.parrallax2.setTint(0xd3d3d3);

      this.backroundXOrigin = 3000;
      this.backroundYOrigin = 650;
      this.backround = this.add.tileSprite(3000, 650, 7*1600, 1315, "backgroundSunflowerLevel");
      this.backround.setDepth(-49);
      this.backround.setScale(0.7);
      this.backround.setTint(0xd3d3d3);

      this.parrallax1XOrigin = 3000;
      this.parrallax1YOrigin = 1290-450;
      this.parrallax1 = this.add.tileSprite(3000, 1290-450, 1920*10 ,1920, "Sun_Flower_Parrallax");
      this.parrallax1.setScale(1/3);
      this.parrallax1.setDepth(-48);
      this.parrallax1.setTint(0x808080);
      
      //this.initSavePoints(759,1437-14);
      this.initSavePoints(759,1021-14);

      this.initPortals(395,1053-13,661,829,"warpCaveOutside","caveToSunflowers1");
      //2109-1469 = 640
      this.initPortals(5119,1181-13,982,1597,"warpCaveOutside","sunFlowerCave");

      this.initPortals(5601,893-13,4001,541,"warpCaveOutside","batCave");

      //fake warps not implemented yet.
      
      //this.fakeWarp1 = new fakeWarp(this,5601,893-13,'warpCaveOutsideRubble');

      this.fakeWarp2 = new fakeWarp(this,885,1469-416-13,'warpCaveOutsideRubble');
      
      //sets up containers
      this.setUpContainers();

      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      this.initSigns(839,1149-416+13,"generic","ominousOmen3");

      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);
     
      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.initBarrier(1103,1350-416,30,140);
      this.initBarrier(4812,1350-416,30,140);
      this.initBarrier(6665,1400,30,300);

      let thisScene = this;

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
          
          thisScene.initEnemy(1934, 1424-416,thisScene.playerSex,'beeDrone',false,'wingFlapSFX1');

          thisScene.initEnemy(2850, 1424-416,thisScene.playerSex,'beeDrone',false,'wingFlapSFX2');

          //thisScene.initEnemy(3550, 1424-416,thisScene.playerSex,'beeDrone',false,'wingFlapSFX3');

          thisScene.initEnemy(4142, 1424-416,thisScene.playerSex,'beeDrone',false,"wingFlapSFX4");

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
  

  
