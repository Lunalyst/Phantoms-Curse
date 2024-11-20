

class ForestRavineHome extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'ForestRavineHome',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "ForestRavineHome";

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
      this.load.image("forest_source_map" , "assets/tiledMap/LockWood/Forest_Tileset/Forest_Tileset.png");
      this.load.tilemapTiledJSON("home_map" , "assets/tiledMap/LockWood/Forest_Tileset/Player_Home.json");

      this.load.spritesheet('backgroundForestRavineLevel', 'assets/backgrounds/forest_ravine_background.png',{frameWidth: 1000 , frameHeight: 1000});

      this.load.spritesheet('tree_parrallax', 'assets/parrallax/Forest_Parrallax_Trees.png',{frameWidth: 1920 , frameHeight: 1920});
      this.load.spritesheet('ground_parrallax', 'assets/parrallax/Forest_Parrallax_Ground.png',{frameWidth: 1920 , frameHeight: 1920});

      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
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
      this.setUpTileSet("home_map","Forest_Tileset","forest_source_map");
    
      //creates player object
      this.setUpPlayer();

      //adds looping sound effect.
      this.initLoopingSound('forestSFX','forest',1);

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

      this.initSigns(813,1757+12,
        "follow the platforms upward. we have a small lodging for those that wash up here. its not much, but its the best we could do for you. you could wait for one of us to come get you, however, its been a long time since anyone wash up here and we dont check this cabin often. ",
        ['signLoop']);

      this.initPortals(390,1904,1777,541,"warpCaveOutside","tutorialCaveLevel");

      this.initPortals(1504,1264,500,605,"door1","HomeInterior1");

      this.initPortals(2566,1373-13,343,829,"warpCaveOutside","TestCave");

      this.initPortals(281,1277-13,1570,829,"warpCaveOutside","caveToSunflowers1");

      //this.initPortals(1470,1725-13,637,605,"door1","DevRoom1");

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

        //sets the previous x for scrolling
        this.playerPreviousX = this.player1.x;
        this.playerPreviousY = this.player1.y;

        this.backround = this.add.tileSprite(0, 1070, 5000, 664, "backgroundForestRavineLevel");
        this.backround.setDepth(-50);
        this.backround.setScale(1.2);
        //original pos - player pos * scrol factor

        this.parrallax1 = this.add.tileSprite(1500, 1100, 1920*4 ,1920, "tree_parrallax");
        this.parrallax1.setScale(1/3);
        this.parrallax1.setDepth(-50);
        this.parrallax1.setTint(0x808080);

        this.parrallax2 = this.add.tileSprite(1500, 1100+600, 1920*4 ,1920, "ground_parrallax");
        this.parrallax2.setScale(1/3);
        this.parrallax2.setDepth(-50);
        this.parrallax2.setTint(0x808080);
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();
        //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      
       //updates the x value of the scrolling backround.
       if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX){
        this.parrallax1.x += 0.5;
        this.parrallax2.x += 0.5;
        this.backround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX){
        this.parrallax1.x -= 0.5;
        this.parrallax2.x -= 0.5;
        this.backround.x -= 0.7;
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y -= 0.1;
        this.parrallax2.y -= 0.1;
        this.backround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y += 0.1;
        this.parrallax2.y += 0.1;
        this.backround.y += 0.3;
      }
      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
