
class blueSlimeCave1 extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'blueSlimeCave1',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "blueSlimeCave1";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    
    }

    preload(){

      this.load.tilemapTiledJSON("blue_slime_map1" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave1.json");
      this.load.image("blue_slime_cave_source_map" , "assets/tiledMap/LockWood/Blue_Slime_Cave_Tileset/Blue_Slime_Cave_Tileset.png");
      
      this.load.spritesheet('slimeSpike', 'assets/gameObjects/slimeSpike.png',{frameWidth: 93, frameHeight: 162 });
      this.load.spritesheet('slimeProjectile', 'assets/gameObjects/slimeBall.png',{frameWidth: 99, frameHeight: 99 });
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });

      this.load.spritesheet("malePlayerStucks" , "assets/player/evan_self_grabs.png" , {frameWidth: 273 , frameHeight: 270 });
      this.load.spritesheet("femalePlayerStucks" , "assets/player/eveyln_self_grabs.png" , {frameWidth: 273 , frameHeight: 270 });
      
      this.defaultPreload();

      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

      this.load.spritesheet('blue-slime-HNM', 'assets/enemys/blue-slime-humanoid-neutral-male.png',{frameWidth: 243, frameHeight: 363 });
      this.load.spritesheet('blue-slime-HNF', 'assets/enemys/blue-slime-humanoid-neutral-female.png',{frameWidth: 243, frameHeight: 363 });

      this.load.spritesheet('blue-slime-HM-F', 'assets/enemys/blue-slime-humanoid-male-female.png',{frameWidth: 243, frameHeight: 393 });
      this.load.spritesheet('blue-slime-HM-M', 'assets/enemys/blue-slime-humanoid-male-male.png',{frameWidth: 243, frameHeight: 393 });
      this.load.spritesheet('blue-slime-HF-M', 'assets/enemys/blue-slime-humanoid-female-male.png',{frameWidth: 243, frameHeight: 393 });
      this.load.spritesheet('blue-slime-HF-F', 'assets/enemys/blue-slime-humanoid-female-female.png',{frameWidth: 243, frameHeight: 393 });

      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });
      

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

      //creates tileset
      this.setUpTileSet("blue_slime_map1","Blue_Slime_Cave_Tileset","blue_slime_cave_source_map");
    
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

      this.initSigns(406,1341+12,
        "DANGER! beware slime nest ahead, try to stay outside of the slime as the nesting slimes dont like to leave there slime. ",
        ['signLoop']);

      //this.initSavePoints(494,1245-14);

      this.initPortals(388,1789-13,449,669,"warpCaveOutside","blueSlimeCave");

      this.fakeWarp1 = new fakeWarp(this,1250,1565-13,'warpCaveOutsideRubble');

      this.fakeWarp2 = new fakeWarp(this,1779,1149-13,'warpCaveOutsideRubble');

      this.fakeWarp3 = new fakeWarp(this,1796,573-13,'warpCaveOutsideRubble');

      
 

      //sets up containers
      this.setUpContainers();

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["blueSlimes","blueSlimeHSs","blueSlimeHMs"];
      this.setUpEnemyCollider(this.enemyGroupArray);

      //set up slimeSpikes
      this.setUpSlimeSpikes();
      this.setUpSlimeProjectiles();
      this.setUpSlimeProjectilesBarriers();

      //for positioning increment byx32
      this.initSlimeSpike(1232,891);
      this.initSlimeSpike(848,827);
      this.initSlimeSpike(1136,1147);
      //this.initSlimeSpike(976,443);


      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();

      this.initBarrier(533,1245-30,30,180);
      this.initBarrier(1623,1117-30,20,200);
      this.initBarrier(593,893-30,20,300);
      this.initBarrier(644,573-30,20,250);
      this.initBarrier(1676,573-30,30,180);
      this.initBarrier(950,1021-30,20,180);
      this.initBarrier(1195,1021-30,20,180);
      this.initBarrier(776,982-30,20,180);
      //this.initBarrier(661,669-30,30,180);

      //make a temp object
      let object1 = {
        flagToFind: "lunaProtoDialogue1",
        foundFlag: false,
      };

      let object2 = {
        flagToFind: "lunaProtoDialogue2",
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object1);
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object2);

      if(object1.foundFlag === true && object2.foundFlag === false){
        let dialogue = 'OH, HELLO AGIAN HUMAN. IM STILL BUSY CLEARING THIS RUBBLE. JUST GIVE ME A LITTLE BIT OK? ';
      this.initLunalyst(1730,573,
        dialogue,
        ['lunaNeutral','lunaHappy'],
      'lunaProtoDialogue1'
      );
      }else if(object2.foundFlag === true){
        let line1 = 'QUITE PERSISTANT ARNT YOU?                                             ';
        let line2 = 'THATS KINDA CUTE ^_^ JUST GIVE ME A LITTLE BIT OK?';
        let dialogue = line1 + line2;
        this.initLunalyst(1730,573,
        dialogue,
        ['lunaFingerTouch','lunaHappy'],
      'lunaProtoDialogue2'
      );
      }else{
        let line1 = 'OH, A HUMAN!                                                                ';
        let line2 = 'ITS BEEN A LONG TIME SINCE I HAVE SEEN ONE OF YOUR KIND HERE. I AM LUNALYST. ';
        let line3 = 'I BET YOU HAVE ALREADY ENCOUNTERED SOME OF THE CURSED. ';
        let line4 = 'TRY TO STAY SAFE, SINCE THEY WILL TRY AN TURN YOU INTO THEM. ';
        let line5 = 'ANYWAY THE WAY BACK TO LOCKWOODS THROUGH THIS CAVE. ';
        let line6 = 'UNFORTUNATELY THE WAYS A LITTLE BLOCKED RIGHT NOW. ';
        let line7 = 'IM WORKING ON CLEARING ON IT. FOR NOW JUST GIVE ME SOME TIME. ';
        let dialogue = line1 + line2 + line3 + line4 + line5 + line6 + line7;
        this.initLunalyst(1730,573,
          dialogue,
          ['lunaStarEyes','lunaHappy','lunaNeutral','lunaHappy','lunaNeutral','lunaFingerTouch'],
        'lunaProtoDialogue'
        );
     }  

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
      setTimeout(function(){
          thisScene.initEnemy(934, 1341,thisScene.playerSex,'blueSlimeHM',false);
          thisScene.initEnemy(1037, 1331,thisScene.playerSex,'blueSlimeLarge',false);
          thisScene.initEnemy(1037, 1021,thisScene.playerSex,'blueSlimeHM',false);
          thisScene.initEnemy(1377, 1085,thisScene.playerSex,'blueSlimeHS',false);
          
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
  

  