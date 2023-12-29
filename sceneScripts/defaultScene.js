class defaultScene extends Phaser.Scene {

    constructStockSceneVariables(){
        //variables that all scenes should have
        this.keyA;
        this.keyW;
        this.keyD;
        this.keyS;
        this.keyTAB;
        this.space;
        this.shift;
        this.player1;
        this.grabbed = false;
        this.mycamera;
        this.spawnedEnemys = false;
        this.KeyDisplay;
        this.skipIndicator;
        this.processMap;
        this.backround;
        this.myMap;
        this.activateFunctions;
        this.warp1;
        this.loadCoolDown = false;
        this.saveCoolDown = false;
        this.signCoolDown = false;
        this.portals;
        this.portalId = 0;
        this.saveStoneId = 0;
        this.signId = 0;
        this.activatedPortalId = 0;
        this.activatedSavePointId = 0;
        this.activatedSignId = 0;
        this.grabCoolDown = false;
        this.attackHitBox;
        this.playerLocation = "forestHome";
        this.signPoints;
        this.saveStonePoints;
        this.isPaused = false;
        this.sceneTextBox;
        this.pausedInTextBox = false;
        this.enemyThatDefeatedPlayer ="";
        this.warpToX = 450;
        this.warpToY = 600;
        this.playerSex;
        this.tabObject = {
            tabIsDown: false
        };
    
    }

    createStockSceneVariables(){

        // allows detection of key inputs for movement and player attacks
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
        //controls for the hud.
        this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //creates a functions object to call the generalized functions i dont want to copy paste on each gameplay scene
        this.activateFunctions = new allSceneFunctions;

        //calls a function to load all the bariables to the hud and this scene
        this.activateFunctions.loadGame(this);
        
        //makes player and puts them in the correct x,y with the correct sex
        this.player1 = new player(this,this.warpToX,this.warpToY,this.playerSex);
        //makes the player visible
        this.player1.visible = true;
            
        //creates hitbox so the player can damage enemies
        this.attackHitBox = new hitBoxes(this,this.player1.x,this.player1.y);

        //sets up key prompts for when the player is grabbed
        this.KeyDisplay = new keyPrompts(this, 450, 500,'keyPrompts');
        this.KeyDisplay.visible = false;
        this.skipIndicator = this.add.sprite(520, 533,'TABToSkip');
        this.skipIndicator.setScale(.2);
        this.skipIndicator.visible = false;
        this.skipIndicator.setScrollFactor(0);

        //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
        this.myMap = this.make.tilemap({ key: "map" });
        //creates a new level object which is used to display map. sends scene and mapdata
        this.processMap = new level(this,this.myMap);
        //defines the tile set to be used when generating level
        this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
        //calls function that loads the tiles from the json
        console.log("this.processMap",this.processMap)
        this.processMap.setTiles("source_map");

        //adds colliders to player as well as slimes to the tiled level
        console.log("setting physics for tileset")
        this.physics.add.collider(this.player1,this.processMap.layer1);
        this.physics.add.collider(this.player1,this.processMap.layer0);
        console.log("physics now set")

        //sets up camera to follow player.
        this.mycamera = this.cameras.main;
        this.mycamera.startFollow(this.player1 ,false,0,0,10000,10000);
        this.mycamera.setBounds( 0, 0, this.myMap.widthInPixels, this.myMap.HeightInPixels); 
        this.cameras.main.followOffset.set(0,-1500);

        //creates a warp sprite and gives it a tag to tell it where to send the player.
        this.portals = this.physics.add.group();
        
        //same as we generate save stones the same way.
        this.saveStonePoints = this.physics.add.group();
        
        //create signs group
        this.signPoints = this.physics.add.group();

        this.safeToLoad = false;
        this.safeToSave = false;

        this.loadCoolDown = false;
        this.saveCoolDown = false;
        this.signCoolDown = false;

        setTimeout(function(){
            forestHomeThat.loadCoolDown = true;
        },1000);

        setTimeout(function(){
            forestHomeThat.saveCoolDown = true;
        },1000);

        setTimeout(function(){
            forestHomeThat.signCoolDown = true;
        },1000);
            
        setTimeout(function(){
            forestHomeThat.grabCoolDown = false;
            console.log("grab cooldown has ended. player can be grabbed agian.");
        },3000);
     
    }

    loadTileMap(scene,mapKey,tilesetNameInTiled,sourceMap){
        console.log('calling function apart of default scene to load tileset')
        //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
        scene.myMap = scene.make.tilemap({ key: mapKey });
        //creates a new level object which is used to display map. sends scene and mapdata
        scene.processMap = new level(scene,scene.myMap);
        //defines the tile set to be used when generating level
        scene.processMap.tilesetNameInTiled = tilesetNameInTiled;
        //calls function that loads the tiles from the json
        scene.processMap.setTiles(sourceMap);

    }
  
      // function which destroys this scene and starts the gameover scene.
      changeToGameover(){
        this.myMap.destroy();
        this.processMap.destroy();
  
        let playerSaveSlotDataObject = {
          playerSaveSlotData: null
        };
      
        playerSaveSlot.emit(playerSaveSlot.getSaveSlot,playerSaveSlotDataObject)
  
        console.log("this.playerSaveSlotData sent to gameover: ",playerSaveSlotDataObject.playerSaveSlotData);
  
        this.activateFunctions.saveGameoverFile(this.playerSex,this.enemyThatDefeatedPlayer,playerSaveSlotDataObject.playerSaveSlotData);
  
        this.scene.start('gameOverForest');
      }
      
  }