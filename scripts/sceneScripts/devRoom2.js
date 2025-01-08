
class devRoom2 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'DevRoom2',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "DevRoom2";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

  

    

    }

    preload(){
      //loads the image with the tiles and the .json file of the tilemap
      this.load.image("home_source_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/Home_Interior_Tileset.png");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      this.load.tilemapTiledJSON("dev_interior2_map" , "assets/tiledMap/LockWood/Home_Interior_Tileset/dev_room2.json");
     
      this.load.spritesheet('backgroundSkyLevel', 'assets/backgrounds/sky backdrop.png',{frameWidth: 1024 , frameHeight: 1024});
      
      this.load.spritesheet('whitecat-male-male-tf', 'assets/enemys/whitecat-male-male-tf.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-male-female-tf', 'assets/enemys/whitecat-male-female-tf.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-female-male-tf', 'assets/enemys/whitecat-female-male-tf.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-female-female-tf', 'assets/enemys/whitecat-female-female-tf.png',{frameWidth: 273, frameHeight: 309 });
      
      this.load.spritesheet('whitecat-female-male-vore', 'assets/enemys/whitecat-female-male-vore.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-female-female-vore', 'assets/enemys/whitecat-female-female-vore.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-male-male-vore', 'assets/enemys/whitecat-male-male-vore.png',{frameWidth: 273, frameHeight: 309 });
      this.load.spritesheet('whitecat-male-female-vore', 'assets/enemys/whitecat-male-female-vore.png',{frameWidth: 273, frameHeight: 309 });

      this.load.spritesheet('whitecatPenning', 'assets/internalViews/whitecatPenning.png',{frameWidth: 213, frameHeight: 213});
      this.load.spritesheet('whitecatPenned', 'assets/internalViews/whitecatPenned.png',{frameWidth: 213, frameHeight: 213});
      

      this.load.spritesheet("malePlayerStucks" , "assets/player/evan_self_grabs.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.spritesheet("femalePlayerStucks" , "assets/player/eveyln_self_grabs.png" , {frameWidth: 273 , frameHeight: 270 });
      
      this.load.spritesheet('cursedHeartProjectile', 'assets/gameObjects/cursedHeart.png',{frameWidth: 99, frameHeight: 99 });

      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.load.audioSprite('whiteCatSFX','audio/used-audio/white-cat-sounds/white-cat-sounds.json',[
        "audio/used-audio/white-cat-sounds/white-cat-sounds.mp3"
      ]);

      //weapon sound effects
      this.load.audioSprite('weaponSFX1','audio/used-audio/player-sounds/weapon-swings.json',[
        "audio/used-audio/player-sounds/weapon-swings.mp3"
      ]);

      //hit sfx for when player gets hit.
      this.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
        "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
      ]);

      this.defaultPreload();

      this.load.audioSprite('calmSFX','audio/used-audio/calm-sounds/calm-sounds.json',[
        "audio/used-audio/calm-sounds/Paws and Rest by Gangstalka.mp3"
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
      this.setUpTileSet("dev_interior2_map","Home_Interior_Tileset","home_source_map");
    
      //creates player object
      this.setUpPlayer();

      
      this.setupCursedHeartStucks();

      this.setupKnockDownStucks();

      //adds looping sound effect.
      this.initLoopingSound('calmSFX','Paws and Rest',0.05);

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

      this.initSigns(525,605+13,
        "I like ya, and I want ya. Now we can do this the easy way, or we can do this the hard way, The choice is yaaawws.",
         ['signLoop']);

      this.initPortalsWithTransparency(419,605-13,864,605,"door2","DevRoom1",0.75);

      this.initPortals(1068,541-13,4702,1053,"door2","PondForest");

      this.initSavePoints(1435,605-14);

      
      //sets up containers
      this.setUpContainers();
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      this.initItemDrop(1028,680,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",5);
      this.initItemDrop(1038,670,13,1,2,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",10);
      this.initItemDrop(1048,660,14,1,3,"COCONUT"," APPLE OF THE SEA. ","drop",3);
      this.initItemDrop(1058,650,15,1,10,"TIGER CLAW","SHARP TIGER CLAW. COULD BE DANGEROUS.","drop",30);
      this.initItemDrop(1068,640,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1078,630,17,1,32,"STINGER","FULL OFF BEE VENOM.","drop",15);
      this.initItemDrop(1068,640,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      
      this.initItemDrop(1078,650,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      
      this.initItemDrop(1088,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1098,650,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      
      this.initItemDrop(1108,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1118,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1218,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1108,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1118,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1218,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1108,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1118,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1218,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1108,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1118,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);
      this.initItemDrop(1218,660,16,1,64,"FUEL ICHOR","FUEL FOR A LANTURN.","ammo",5);

      


       //sets up enemy colliders and groups
       this.enemyGroupArray = ["whiteCats"];
       this.setUpEnemyCollider(this.enemyGroupArray);

       //needed to use cursed heart projectiles.
       this.setUpCursedHeartProjectiles();
       this.setUpCursedHeartsProjectilesBarriers()

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.initBarrier(1355,605-30,20,300);
      this.initBarrier(566,605-30,20,300);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
          //thisScene.initEnemy(1028,701-3,thisScene.playerSex,'whiteCat',false);
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();

        this.backround = this.add.tileSprite(1500, -1940, 7*1024, 6*1024, "backgroundSkyLevel");
        this.backround.setDepth(-50);
        this.backround.setTint(0xd3d3d3);

    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);
      
      //updates the x value of the scrolling backround.
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX){
        this.backround.x -= 0.7;
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.backround.y += 0.3;
      }
      
      //calls the built in update function
      this.defaultUpdate();

      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
