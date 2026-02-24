

class LockwoodShopDistrict extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'LockwoodShopDistrict',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "LockwoodShopDistrict";

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
      this.enemyGroupArray = [];

      //call built in function to preload enemys assets.
      this.setUpEnemyPreload(this.enemyGroupArray);
      
      
      this.load.image("lockwood_shop_district_source_map" , "assets/tiledMap/LockWood/Lockwood_Shop_District_Tileset/Lockwood_Shop_District_Tileset.png");
      this.load.tilemapTiledJSON("lockwood_shop_district_map" , "assets/tiledMap/LockWood/Lockwood_Shop_District_Tileset/Lockwood_Shop_District.json");

      this.load.spritesheet('backgroundForestRavineLevel',  'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth:1920 ,frameHeight: 1920});
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
      this.setUpTileSet("lockwood_shop_district_map","Lockwood_Shop_District_Tileset","lockwood_shop_district_source_map");
      //this.processMap.layer0.setDepth(9);
      //this.processMap.layer1.setDepth(0);
      //this.processMap.layer2.setDepth(0);
      //this.processMap.layer3.setDepth(0);
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      //this.initLoopingSound('forestSFX','forest',1,"ambience");

      //this.initLoopingSound('forestThemeSFX','bertsz',0.01,"music");

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
      
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene 
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();


      this.initPortals(3566,728-8,785,1083,"warpCaveInside","LockwoodEntrance",false);

      //this.initSigns(819,728+18,"generic","lockwoodEntranceSign",false);

      //this.initPortals(3566,728-8,785,1083,"warpCaveInside","LockwoodEntrance",false);
     /* this.initPortalsWithTransparency(1122,728-5,961 ,728,"lockwoodIronGate","LockwoodBridges",0.0);
      this.transGate = this.add.sprite(1122,728-21, "warpGate");
      this.transGate.setScale(1/3);
      this.transGate.setAlpha(.75);
      this.transGate.setDepth(10);*/

      //this.initSigns(1297,728+18,"generic","lockwoodEntranceSign",false);
      
      //this.initSavePoints(1099,728-10);

      //this.initSavePoints(1805,728-10);

     

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;

        this.backroundXOrigin = 860;
        this.backroundYOrigin = 190;
         
        this.backround = this.add.tileSprite(this.backroundXOrigin, this.backroundYOrigin, 6*1600, 1090, "backgroundForestRavineLevel");
        this.backround.setDepth(-50);
        this.backround.setScale(1.2);
        //original pos - player pos * scrol factor

        this.parrallax1XOrigin = 3000-1290;
        this.parrallax1YOrigin = 530 ;
        this.parrallax1 = this.add.tileSprite(this.parrallax1XOrigin, this.parrallax1YOrigin, 1920*8 ,1920, "tree_parrallax");
        this.parrallax1.setScale(1/3);
        this.parrallax1.setDepth(-50);
        this.parrallax1.setTint(0x303030);

        this.parrallax2XOrigin = 3000-1290;
        this.parrallax2YOrigin = 530+600;
        this.parrallax2 = this.add.tileSprite(this.parrallax2XOrigin, this.parrallax2YOrigin, 1920*8 ,1920, "ground_parrallax");
        this.parrallax2.setScale(1/3);
        this.parrallax2.setDepth(-50);
        this.parrallax2.setTint(0x303030);

    }

    update(){
      
      //calls the built in update function

      if(this.player2Active === true){
        this.player2Update();
      }else{
        this.defaultUpdate();
      }
      
        //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      
       //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,2000,0.5);
        this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,2000,0.5);
        this.backgroundRangeRight(this.backround,this.backroundXOrigin,2000,0.7);
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,2000,0.5);
        this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,2000,0.5);
        this.backgroundRangeLeft(this.backround,this.backroundXOrigin,2000,0.7);
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
  

  
