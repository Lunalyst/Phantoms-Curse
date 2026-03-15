

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
      
      this.load.spritesheet('Clearing_Background',  'assets/backgrounds/Clearing_Background.png',{frameWidth: 2700 , frameHeight: 1800});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth:1920 ,frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.spritesheet("autumn" , "assets/npcs/autumn.png" , {frameWidth: 483 , frameHeight: 339 });
      
      this.load.spritesheet("randi" , "assets/npcs/randi.png" , {frameWidth: 273 , frameHeight: 273 });
      
      this.load.spritesheet('craftingBench', 'assets/gameObjects/craftingBench.png',{frameWidth: 291, frameHeight: 291 });
      
      this.load.spritesheet('Overroot_Cafe', 'assets/parrallax/Overroot_Cafe.png',{frameWidth: 1920 , frameHeight: 2880});

      this.load.spritesheet('Lockwood_Buildings1', 'assets/parrallax/Lockwood_Buildings1.png',{frameWidth: 2880 , frameHeight: 1920});

      this.load.spritesheet('Lockwood_Buildings2', 'assets/parrallax/Lockwood_Buildings2.png',{frameWidth: 2880 , frameHeight: 1920});



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
      //this.processMap.layer1
      this.processMap.layer2.setTint(0x909090);
      this.processMap.layer3.setTint(0x909090);

      /*
      this.layer2.setTint(0x808080);
      this.layer3.setTint(0x404040);
      */
      
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

      this.setUpPlayerCraftingBench();
      this.initPlayerCraftingBench(1149, 728-9);

      this.initPortals(1818,728-8,1776,728,"warpCaveInside","LockwoodOverrootCenter",false);

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

      this.initSavePoints(1539,728-10);

      this.autumn = this.add.sprite(2768, 728-8, "autumn");
      this.autumn.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('autumn', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.autumn.anims.play("idle", true);
      this.autumn.setScale(1/3);

      this.randi = this.add.sprite(1038, 728-6, "randi");
      this.randi.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('randi', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
      this.randi.anims.play("idle", true);
      this.randi.setScale(1/3);

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

        this.backroundXOrigin = 2360;
        this.backroundYOrigin = 500;
         
        //this.backround = this.add.tileSprite(this.backroundXOrigin, this.backroundYOrigin, 6*1600, 1090, "backgroundForestRavineLevel");
        this.backround = this.add.tileSprite(this.backroundXOrigin, this.backroundYOrigin, 6*2700,1800 , "Clearing_Background");
        this.backround.setDepth(-50);
        this.backround.setScale(1/3);
        //original pos - player pos * scrol factor

        this.parrallax1XOrigin = 3600;
        this.parrallax1YOrigin = 530 ;
        this.parrallax1 = this.add.tileSprite(this.parrallax1XOrigin, this.parrallax1YOrigin, 1920*2 ,1920, "tree_parrallax");
        this.parrallax1.setScale(1/3);
        this.parrallax1.setDepth(-50);
        this.parrallax1.setTint(0xa0a0a0);

        this.parrallax2XOrigin = 3600;
        this.parrallax2YOrigin = 530+600;
        this.parrallax2 = this.add.tileSprite(this.parrallax2XOrigin, this.parrallax2YOrigin, 1920*2 ,1920, "ground_parrallax");
        this.parrallax2.setScale(1/3);
        this.parrallax2.setDepth(-50);
        this.parrallax2.setTint(0xa0a0a0);

        this.parrallax3XOrigin = 600;
        this.parrallax3YOrigin = 530 ;
        this.parrallax3 = this.add.tileSprite(this.parrallax3XOrigin, this.parrallax3YOrigin, 1920*2 ,1920, "tree_parrallax");
        this.parrallax3.setScale(1/3);
        this.parrallax3.setDepth(-50);
        this.parrallax3.setTint(0xa0a0a0);

        this.parrallax4XOrigin = 600;
        this.parrallax4YOrigin = 530+600;
        this.parrallax4 = this.add.tileSprite(this.parrallax4XOrigin, this.parrallax4YOrigin, 1920*2 ,1920, "ground_parrallax");
        this.parrallax4.setScale(1/3);
        this.parrallax4.setDepth(-50);
        this.parrallax4.setTint(0xa0a0a0);

        this.buildings4 = this.add.tileSprite(1843, 653, 2880 , 1920, "Lockwood_Buildings2");
        this.buildings4.setScale(1/8);
        this.buildings4.setDepth(-50);
        this.buildings4.setTint(0x303030);

        this.overroot = this.add.tileSprite(1818, 563, 1920 , 2880, "Overroot_Cafe");
        this.overroot.setScale(1/7);
        this.overroot.setDepth(-50);
        this.overroot.setTint(0x909090);

        this.buildings1 = this.add.tileSprite(1818, 688 , 2880 , 2880, "Lockwood_Buildings1");
        this.buildings1.flipX = true;
        this.buildings1.setScale(1/6);
        this.buildings1.setDepth(-50);
        this.buildings1.setTint(0x909090);

        this.buildings2 = this.add.tileSprite(1818, 668, 2880 , 2880, "Lockwood_Buildings1");
        this.buildings2.setScale(1/5);
        this.buildings2.setDepth(-50);
        this.buildings2.setTint(0x909090);

        this.buildings3 = this.add.tileSprite(1818, 648, 2880 , 2880, "Lockwood_Buildings1");
        this.buildings3.flipX = true;
        this.buildings3.setScale(1/4);
        this.buildings3.setDepth(-50); 
        this.buildings3.setTint(0x909090);

    }

    update(){
      
      //calls the built in update function

      if(this.player2Active === true){
        this.player2Update();
      }else{
        this.defaultUpdate();
      }

      this.checkPlayerRightWarp(3510,"LockwoodCenter",400,728);
      this.checkPlayerLeftWarp(500,"BunBunRanchFront",3645,728+32);
      
        //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      
       //updates the x value of the scrolling backround.
      if(this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeRight(this.parrallax1,this.parrallax1XOrigin,200,0.5);
        this.backgroundRangeRight(this.parrallax2,this.parrallax2XOrigin,200,0.5);
        this.backgroundRangeRight(this.parrallax3,this.parrallax3XOrigin,200,0.5);
        this.backgroundRangeRight(this.parrallax4,this.parrallax4XOrigin,200,0.5);
        this.backgroundRangeRight(this.backround,this.backroundXOrigin,1000,0.7);
       
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX ){
        this.backgroundRangeLeft(this.parrallax1,this.parrallax1XOrigin,200,0.5);
        this.backgroundRangeLeft(this.parrallax2,this.parrallax2XOrigin,200,0.5);
        this.backgroundRangeLeft(this.parrallax3,this.parrallax3XOrigin,200,0.5);
        this.backgroundRangeLeft(this.parrallax4,this.parrallax4XOrigin,200,0.5);
        this.backgroundRangeLeft(this.backround,this.backroundXOrigin,1000,0.7);
        
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
  

  
