
class blueSlimeCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'blueSlimeCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "blueSlimeCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("blue_slime_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave.json");
      this.load.image("blue_slime_cave_source_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave_Tileset.png");
      
      this.load.spritesheet('slimeSpike', 'assets/gameObjects/slimeSpike.png',{frameWidth: 93, frameHeight: 162 });
      this.load.spritesheet('slimeProjectile', 'assets/gameObjects/slimeBall.png',{frameWidth: 99, frameHeight: 99 });
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.defaultPreload();

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet('blue-slime-HNM', 'assets/enemys/blue-slime-humanoid-neutral-male.png',{frameWidth: 243, frameHeight: 363 });
      this.load.spritesheet('blue-slime-HNF', 'assets/enemys/blue-slime-humanoid-neutral-female.png',{frameWidth: 243, frameHeight: 363 });

      this.load.spritesheet('slimePenning', 'assets/internalViews/slimePenning.png',{frameWidth: 213, frameHeight: 213});
       

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('slimeCaveSFX','audio/used-audio/slime-cave-sounds/slime-cave-sounds.json',[
        "audio/used-audio/slime-cave-sounds/slime-cave-sounds.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("blueSlimeGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //sets up ambient lighting
      this.setupLightingSystem(0x555555);

      //creates tileset
      this.setUpTileSet("blue_slime_map","Blue_Slime_Cave_Tileset","blue_slime_cave_source_map");
    
      //creates player object
      this.setUpPlayer();

      // sets up slime gooed animation.
      this.setupSlimeStucks();

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

      //activates sound
      this.initLoopingSound('slimeCaveSFX','slimeCave', 0.02);
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //this.initSavePoints(1669,573-14);

      this.initPortals(1753,573-13,2088,1117,"warpCaveOutside","batCave");

      this.initPortals(449,669-13,388,1789,"warpCaveOutside","blueSlimeCave1");

      let random = Math.floor((Math.random() * 5)+1);
      console.log(random);
      
      if(random === 5){
        this.initPortals(2849,605-13,482,568,"warpCaveShadowMenace","EarieCave");
      }else{
        this.initPortals(2849,605-13,438,1464,"warpCaveShadow","ShadowCave");
      }

      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","blueSlimeHSs"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //set up slimeSpikes
      this.setUpSlimeSpikes();
      this.setUpSlimeProjectiles();
      this.setUpSlimeProjectilesBarriers();

      //for positioning increment byx32
      this.initSlimeSpike(2703,539);
      this.initSlimeSpike(2000,475);
      this.initSlimeSpike(1328,507);
      this.initSlimeSpike(976,443);


      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      this.initBarrier(2734,605-30,30,180);
      this.initBarrier(2549,637-30,20,180);
      this.initBarrier(2348,573-30,20,300);
      this.initBarrier(1863,573-30,20,250);
      this.initBarrier(1605,573-30,30,180);
      this.initBarrier(661,669-30,30,180);
     
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
          thisScene.initEnemy(1210, 600,thisScene.playerSex,'blueSlime',false);
          thisScene.initEnemy(1110, 600,thisScene.playerSex,'blueSlime',false);

          thisScene.initEnemy(2223, 573,thisScene.playerSex,'blueSlimeHS',false);
          thisScene.initEnemy(2591, 701,thisScene.playerSex,'blueSlimeHS',false);
          thisScene.initEnemy(930, 660,thisScene.playerSex,'blueSlimeHS',false);
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

    

}
  

  
