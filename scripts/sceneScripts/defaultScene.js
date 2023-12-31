class defaultScene extends Phaser.Scene {

    defaultPreload(){
        //preload of object always needed
        this.load.spritesheet("malePlayer" , "assets/evan_master.png" , {frameWidth: 213 , frameHeight: 270 });
        this.load.spritesheet("femalePlayer" , "assets/evelyn_master.png" , {frameWidth: 213 , frameHeight: 270 });
        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
        this.load.image('TABToSkip', 'assets/tabToSkip.png');
        this.load.spritesheet('forestWarp', 'assets/GroundForestWarp.png',{frameWidth: 80 , frameHeight: 80 });
        this.load.spritesheet('savePoint', 'assets/saveStatue.png',{frameWidth: 71, frameHeight: 100 });
        this.load.spritesheet('sign', 'assets/Sign.png',{frameWidth: 99, frameHeight: 135 });
        this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
        this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
        this.load.spritesheet('doubleJumpEffect', 'assets/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
            
        //hud specific 
        this.load.spritesheet('inventory', 'assets/Inventory.png',{frameWidth: 600 , frameHeight: 425 });
        this.load.spritesheet('inventoryBorder', 'assets/inventoryBorder.png',{frameWidth: 600 , frameHeight: 425 });
        this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 32 , frameHeight: 32 });
        this.load.spritesheet('slotDiscriptions', 'InventorySlotDiscriptions.png',{frameWidth: 32 , frameHeight: 32 });
        this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
        this.load.spritesheet('hpBarAmount', 'assets/hpBarAmount.png',{frameWidth: 291, frameHeight: 57 });
        this.load.spritesheet('bestiary', 'assets/bestiary.png',{frameWidth: 462, frameHeight: 630 });
        this.load.spritesheet('UIControls', 'assets/UIControls.png',{frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('inventoryLabels', 'assets/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
        this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });
      }

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

        this.scene.stop('gameHud');
        this.scene.stop('forestHome');
        this.scene.start('gameOverForest');
      }
      
  }