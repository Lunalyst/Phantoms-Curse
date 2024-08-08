

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
      
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('beeDroneMale', 'assets/enemys/beeDroneMale.png',{frameWidth: 789, frameHeight: 252 });
      this.load.spritesheet('beeDroneFemale', 'assets/enemys/beeDroneFemale.png',{frameWidth: 789, frameHeight: 252 });
      this.load.spritesheet('beeGrub', 'assets/enemys/beeGrub.png',{frameWidth: 525, frameHeight: 237 });

      this.load.spritesheet('backgroundSunflowerLevel', 'assets/backgrounds/flowerfield backdrop.png',{frameWidth: 1152, frameHeight: 765});
      this.load.spritesheet('backgroundSkyLevel', 'assets/backgrounds/sky backdrop.png',{frameWidth: 1024 , frameHeight: 1024});
      this.load.spritesheet('sunflowerParallax', 'assets/parrallax/flowerfield.png',{frameWidth: 5760 , frameHeight: 4800});
      this.load.spritesheet("secretWall1" , "assets/gameObjects/secretWall1.png" , {frameWidth: 864 , frameHeight: 288 });
      this.load.spritesheet("lunalyst" , "assets/npcs/lunalyst.png" , {frameWidth: 273 , frameHeight: 228 });
      
      this.load.audioSprite('forestSFX','audio/used-audio/forest-sounds/forest-sounds.json',[
        "audio/used-audio/forest-sounds/birds4.mp3"
      ]);

      this.load.audioSprite('forestThemeSFX','audio/used-audio/forest-theme-sounds/forest-theme-sounds.json',[
        "audio/used-audio/forest-theme-sounds/bertsz__calm.mp3"
      ]);

      this.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
        "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX3','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
      ]);

      this.load.audioSprite('wingFlapSFX4','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
        "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
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

      this.initSigns(4666,1085+13,
        "WHAT DOES IT MEAN TO BE DRIVEN? EVERYDAY I FIND MY SELF CONTINUE TO FIGHTING, BUT A PART OF ME FEARS THAT I WONT LIVE UP TO THE EXPECTATION MY DESIRES HAVE SET.",
        ['signLoop']);

      this.initSigns(839,1149+13,
          "WHAT DOES IT MEAN TO HAVE DESIRES? CAN A HEARTS WANTS BE MEASURED? CAN SOMEONES DESIRES BE OVER WRITTEN?",
          ['signLoop']);

      this.skybackround = this.add.tileSprite(1500, -1940, 8*1024, 6*1024, "backgroundSkyLevel");
      this.skybackround.setDepth(-50);
      this.skybackround.setTint(0xd3d3d3);

      this.backround = this.add.tileSprite(3000, 1370, 10*1152, 765, "backgroundSunflowerLevel");
      this.backround.setDepth(-51);
      this.backround.setScale(0.7);
      this.backround.setTint(0xd3d3d3);


      this.parrallax1 = this.add.tileSprite(1500, 1490, 5*5000,4800, "sunflowerParallax");
      this.parrallax1.setScale(1/3);
      this.parrallax1.setDepth(-50);
      this.parrallax1.setTint(0x808080);

      
      this.initSavePoints(759,1437-14);

      this.initSavePoints(5490,893-14);

      this.initPortals(400,1469-13,661,829,"warpCaveOutside","caveToSunflowers1");
      //2109-1469 = 640
      this.initPortals(6763,1469-13,661,829,"warpCaveOutside","caveToSunflowers2");

      //this.initPortals(5601,893-13,661,0,"warpCaveOutside","batCave");

      //fake warps not implemented yet.
      
      this.fakeWarp1 = new fakeWarp(this,5601,893-13,'warpCaveOutsideRubble');

      this.fakeWarp2 = new fakeWarp(this,885,1469-13,'warpCaveOutsideRubble');

      //makes secret wall
      this.secretWall1 = this.add.sprite(4943.6, 1072.2, "secretWall1");
      this.secretWall1.setDepth(7);
      this.secretWall1.setScale(0.335);
      
      //sets up containers
      this.setUpContainers();

      let thisScene = this;
      setTimeout(function(){
           
        let knife = {
          itemID: 4,
          itemName: 'KNIFE',
          itemDescription: 'GOOD FOR SLASHING MONSTERS.',
          itemStackable: 0,
          itemAmount: 1
        };
      
      //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
      thisScene.initItemContainer(5324,1085-3,knife,true,"cave_chest_with_knife");
        
      },1000);
      //sets up item drops for the scene
      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //creates health upgrade object in level
      this.initHealthUpgrade(4642, 605, 'healthUpgradeInSunflowerField');

      //sets up enemy colliders and groups
      this.enemyGroupArray = ["beeDrones",'blueSlimes'];
      this.setUpEnemyCollider(this.enemyGroupArray);
     
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
      this.initLunalyst(5690,891,
        dialogue,
        ['lunaNeutral','lunaHappy'],
      'lunaProtoDialogue1'
      );
      }else if(object2.foundFlag === true){
        let line1 = 'QUITE PERSISTANT ARNT YOU?                                             ';
        let line2 = 'THATS KINDA CUTE ^_^ JUST GIVE ME A LITTLE BIT OK?';
        let dialogue = line1 + line2;
        this.initLunalyst(5690,891,
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
        this.initLunalyst(5690,891,
          dialogue,
          ['lunaStarEyes','lunaHappy','lunaNeutral','lunaHappy','lunaNeutral','lunaFingerTouch'],
        'lunaProtoDialogue'
        );
     }                                                        
      

      

      //define barriers whee enemys cannot go.
      this.setUpEnemyBarriers();
      this.ititBarrier(1103,1350,30,140);
      this.ititBarrier(4812,1350,30,140);
      this.ititBarrier(6665,1400,30,300);

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){
          
          thisScene.initEnemy(1934, 1424,thisScene.playerSex,'beeDrone','wingFlapSFX1');

          thisScene.initEnemy(2850, 1424,thisScene.playerSex,'beeDrone','wingFlapSFX2');

          thisScene.initEnemy(3550, 1424,thisScene.playerSex,'beeDrone','wingFlapSFX3');

          thisScene.initEnemy(4142, 1424,thisScene.playerSex,'beeDrone',"wingFlapSFX4");

          thisScene.initEnemy(5580, 1245,thisScene.playerSex,'blueSlime');

          thisScene.initEnemy(6194, 1373,thisScene.playerSex,'blueSlime');

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
      if( this.playerPreviousX < this.player1.x && this.player1.x !== this.playerPreviousX && this.playerGrabbed === false){
        this.parrallax1.x += 0.5;
        this.backround.x += 0.7;
        this.skybackround.x += 0.7;
      }else if(this.playerPreviousX > this.player1.x && this.player1.x !== this.playerPreviousX && this.playerGrabbed === false){
        this.parrallax1.x -= 0.5;
        this.backround.x -= 0.7;
        this.skybackround.x -= 0.7;
      }
      //updates the x values stored every tick 
      this.playerPreviousX = this.player1.x;

      //updates the y value of the scrolling backround.
      if( this.playerPreviousY < this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y -= 0.1;
        this.backround.y -= 0.3;
        this.skybackround.y -= 0.3;
      }else if(this.playerPreviousY > this.player1.y && this.player1.y !== this.playerPreviousY){
        this.parrallax1.y += 0.1;
        this.backround.y += 0.3;
        this.skybackround.y += 0.3;
      }

      //updates the y values stored every tick 
      this.playerPreviousY = this.player1.y;

    }

}
  

  
