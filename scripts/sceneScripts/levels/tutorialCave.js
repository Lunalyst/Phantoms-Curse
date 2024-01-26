
class tutorialCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'tutorialCaveLevel',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "tutorialCaveLevel";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    //this.slimes;
    //this.slimeId = 0;

    

    }

    preload(){

      this.load.tilemapTiledJSON("cave_map" , "assets/tiledMap/LockWood/Tutorial_Cave.json");
      
      this.defaultPreload();

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("cave_map","Forest_Large_Tiles","source_map");
    
      //creates player object
      this.setUpPlayer();

      //creates a group of slime objects
      this.slimes = this.physics.add.group();

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();
      this.setUpSlimeCollider();

      //sets up the player camera
      this.setUpPlayerCamera();
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSigns(671,1757+12,
        "you may find things on this island that can help you. when you open a container you may recieve a item. you can check your inventory by pressing tab. to move items around simply click them from there current slot to the slot you want it to be in. you have two special slots. weapon and ring. the weapon slot allows you to change your attack. rings help you more passively. if you have no weapon equipt you will simply flail about.  ",
        ['signLoop']);

      this.initSigns(1077,1257,
        "use these shrines to save your progress. you will find them scattered all over the island. these shrines are special and will restore your strength as well. ",
         ['signLoop']);

      this.initSigns(788,541+12,
        "This Island is host to many monsters. tread carefully! they will try and turn you into one of us....  ",
        ['signLoop']);

      this.initSigns(1642,573+12,
        "monsters might drop items if you defeat them. ",
          ['signLoop']);

      this.initSavePoints(896,1230);

      this.initPortals(465,1808,3735,541,"warpCaveInside","tutorialBeachLevel");

      this.initPortals(1777,529,390,1917,"warpCaveInside","ForestRavineHome");

      //sets up containers
      this.setUpContainers();

      let oar = {
          itemID: 2,
          itemStackable: 0,
          itemAmount: 1
      };
      
      //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
      this.initItemContainer(780,1757-3,oar,true,"cave_tutorial_chest_with_oar");
      //sets up item drops for the scene

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
          thisScene.initSlimes(1309, 605, 1,thisScene.playerSex);
          //thisScene.initSlimes(300, 500, 1,thisScene.playerSex);
          //thisScene.initSlimes(2380, 500, 1,thisScene.playerSex);
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();

      //handles slime interactions
      this.slimeUpdate();

    }

}
  

  
