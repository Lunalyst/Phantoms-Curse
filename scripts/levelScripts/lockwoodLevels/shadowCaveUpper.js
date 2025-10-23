
class ShadowCaveUpper extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'ShadowCaveUpper',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "ShadowCaveUpper";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    }

    preload(){

      //define an array of enemys we are using
      this.defaultPreload();
      
      //define an array of enemys we are using
      this.enemyGroupArray = ["mushroomDefeats","curseShadows","mushrooms"];

       //call built in function to preload enemys assets.
       this.setUpEnemyPreload(this.enemyGroupArray);
      
      this.load.tilemapTiledJSON("shadow_cave_upper_map" , "assets/tiledMap/LockWood/Cave_Tileset/Shadow_Cave_Upper.json");
      this.load.image("cave_source_map" , "assets/tiledMap/LockWood/Cave_Tileset/Cave_Tileset.png");
      
      this.load.spritesheet("wallLights" , "assets/gameObjects/wallLights.png" , {frameWidth: 159 , frameHeight: 96 });

      this.defaultPreload();

      this.load.audioSprite('slowMyceliumSFX','audio/used-audio/mycelium-slow-sounds/mycelium-slow-sounds.json',[
        "audio/used-audio/mycelium-slow-sounds/mycelium-slow-sounds.mp3"
      ]);

      this.load.audioSprite('waterfallSFX','audio/used-audio/waterfall-sounds/waterfall-sounds.json',[
        "audio/used-audio/waterfall-sounds/waterfall.mp3"
      ]);

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGamePlayData();
      
      this.grabbed = false;

      //sets up ambient lighting
      this.setupLightingSystem(0x000008);
      //this.setupLightingSystem(0x222227);

      //setup lights group.
      this.setUpWallLights();

      this.setUpMushroomNodes();

      //creates tileset
      this.setUpTileSet("shadow_cave_upper_map","Cave_Tileset","cave_source_map");
    
      //creates player object
      this.setUpPlayer();

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
      this.initLoopingSound('slowMyceliumSFX','theme', 0.1,"music");
      this.initLoopingSound('waterfallSFX','waterfall', 0.03,"ambience");
    
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      //FLOOR 2 MUSHROOMS FROM LEFT TO RIGHT

      this.initWallLight(650,1004,'ghostMushroom1');

      this.initWallLight(880,886,'ghostMushroom1');
      //this.initWallLight(882,881,'ghostMushroom2');

      this.initWallLight(1178,886,'ghostMushroom4');

      this.initWallLight(1457,844,'ghostMushroom2');
      //this.initWallLight(1448,842,'ghostMushroom4');

      this.initWallLight(2198,920,'ghostMushroom2');
      //this.initWallLight(2205,923,'ghostMushroom4');

      this.initWallLight(2310,632,'ghostMushroom1');

      this.initWallLight(2810,647,'ghostMushroom1');
      //this.initWallLight(2815,639,'ghostMushroom2');

      //section 3 
      this.initWallLight(1045,641,'ghostMushroom1');
      //this.initWallLight(1055,634,'ghostMushroom2');

      this.initWallLight(526,593,'ghostMushroom3');
      //this.initWallLight(536,603,'ghostMushroom1');
      this.initWallLight(546,610,'ghostMushroom4');

      this.initWallLight(667,408,'ghostMushroom3');

      this.initWallLight(971,367,'ghostMushroom2');
      
      this.initWallLight(1343,495,'ghostMushroom4');

      this.initSavePoints(1492,952-10);

      this.initPortals(368,1080-8,5039,1149,"warpCaveInside","PondForest");

      //this.test = this.add.sprite(1040, 1016-65, "Mycelium Root");
      //this.test.setScale(1/3);
      //creates container objects.
      this.setUpContainers();

      let thisScene = this;
      //sets up enemy colliders and groups
      this.setUpEnemyCollider(this.enemyGroupArray);

      //special collision function to give the shadows collision with the mushroom lights expanded hitbox. allowing for the illusion that the shadows cant enter light.
      this.setUpShadowLightCollider();
  
      //sets up item drops for the scene

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      this.setUpSporeClouds();

      //set up mushroom network
      //start by creating a root node
      this.mushroomRoot = new mushroomNode(this,1040,1016+12,"root",null,false);

      //then we define a a graph structure as a "branch" of the root. 
      //start by making the nodes of the graph
      this.mushroomNode1 = new mushroomNode(this,1933,920+12,"node1",this.mushroomRoot,false);
      this.mushroomNode2 = new mushroomNode(this,2342,824+12,"node2",this.mushroomRoot,false);
      this.mushroomNode3 = new mushroomNode(this,2084,728+12,"node3",this.mushroomRoot,true);
      this.mushroomNode4 = new mushroomNode(this,2534,600+12,"node4",this.mushroomRoot,false);

      //then we define a graph array
      this.mushroomBranch1 = [];
      this.mushroomBranch1.push(this.mushroomNode1);
      this.mushroomBranch1.push(this.mushroomNode2);
      this.mushroomBranch1.push(this.mushroomNode3);
      this.mushroomBranch1.push(this.mushroomNode4);

      //nested for loop to give connections to all the node in a given branch.
      this.mushroomBranch1.forEach(node1 =>{
        this.mushroomBranch1.forEach(node2 =>{
          //if the node is not itself then push the node 2 into node ones connection array. 
          if(node1.nodeName !== node2.nodeName){
            node1.pushNode(node2);
          }

        });

      });

      this.mushroomNode5 = new mushroomNode(this,1181,696+12,"node5",this.mushroomRoot,false);
      this.mushroomNode6 = new mushroomNode(this,594,664+12,"node6",this.mushroomRoot,false);
      this.mushroomNode7 = new mushroomNode(this,1042,408+12,"node7",this.mushroomRoot,true);
      this.mushroomNode12 = new mushroomNode(this,1612,952+12,"node12",this.mushroomRoot,false);

      this.mushroomBranch2 = [];
      this.mushroomBranch2.push(this.mushroomNode5);
      this.mushroomBranch2.push(this.mushroomNode6);
      this.mushroomBranch2.push(this.mushroomNode7);
      this.mushroomBranch2.push(this.mushroomNode12);

      //nested for loop to give connections to all the node in a given branch.
      this.mushroomBranch2.forEach(node1 =>{
        this.mushroomBranch2.forEach(node2 =>{
          //if the node is not itself then push the node 2 into node ones connection array. 
          if(node1.nodeName !== node2.nodeName){
            node1.pushNode(node2);
          }

        });

      });

      this.mushroomNode8 = new mushroomNode(this,1008,664+12,"node8",this.mushroomRoot,false);
      this.mushroomNode9 = new mushroomNode(this,416,568+12,"node9",this.mushroomRoot,false);
      this.mushroomNode10 = new mushroomNode(this,713,440+12,"node10",this.mushroomRoot,true);
      this.mushroomNode11 = new mushroomNode(this,1424,504+12,"node11",this.mushroomRoot,false);

      this.mushroomBranch3 = [];
      this.mushroomBranch3.push(this.mushroomNode8);
      this.mushroomBranch3.push(this.mushroomNode9);
      this.mushroomBranch3.push(this.mushroomNode10);
      this.mushroomBranch3.push(this.mushroomNode11);

      //nested for loop to give connections to all the node in a given branch.
      this.mushroomBranch3.forEach(node1 =>{
        this.mushroomBranch3.forEach(node2 =>{
          //if the node is not itself then push the node 2 into node ones connection array. 
          if(node1.nodeName !== node2.nodeName){
            node1.pushNode(node2);
          }

        });

      });

      
      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      setTimeout(function(){

          //thisScene.initEnemy(905,1016,thisScene.playerSex,'curseShadow',false);
          //thisScene.initEnemy(800,664,thisScene.playerSex,'curseShadow',false);
          thisScene.initEnemy(905,1016,thisScene.playerSex,'mushroomDefeat',false);

          //thisScene.initEnemy(703,1028,thisScene.playerSex,'mushroom',false);
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){

      //console.log("this.player1.x: "+this.player1.x+" this.player1.y: "+this.player1.y);

      //calls the built in update function
      this.defaultUpdate();

      this.checkPlayerFallWarp(1450,"ShadowCave",1100,480,2650);
      
      //handles enemy interactions
      this.enemyUpdate(this.enemyGroupArray);

    }

}
  

  
