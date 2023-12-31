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

    setUpPlayerInputs(){
        // allows detection of key inputs for movement and player attacks
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //controls for the hud.
        this.keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    }

    setUpTileSet(map,tilesetImage,sourceMap){
        //creates a tilemap to be sent into the level class.the key value must match the key given to the json file. 
        this.myMap = this.make.tilemap({ key: map });
        //creates a new level object which is used to display map. sends scene and mapdata
        this.processMap = new level(this,this.myMap);
        //defines the tile set to be used when generating level
        this.processMap.tilesetNameInTiled = tilesetImage;
        //calls function that loads the tiles from the json
        this.processMap.setTiles(sourceMap);

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

        console.log("removing listeners");
        healthEmitter.removeAllListeners(healthEvent.loseHealth);
        healthEmitter.removeAllListeners(healthEvent.gainHealth);
        healthEmitter.removeAllListeners(healthEvent.maxHealth);
        healthEmitter.removeAllListeners(healthEvent.returnHealth);
        loadSceneTransitionLoad.removeAllListeners(SceneTransitionLoad.loadValues);
        accessTabKey.removeAllListeners(tabKey.isTabDown);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.activateWindow);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.isWindowOpen);
        inventoryKeyEmitter.removeAllListeners(inventoryKey.getSaveData);
        playerSkillsEmitter.removeAllListeners(playerSkills.getJump);
        playerSaveSlot.removeAllListeners(playerSaveSlot. getSaveSlot);




        console.log("healthEmitter current listeners: ",
           healthEmitter.listenerCount(healthEvent.loseHealth)+
           healthEmitter.listenerCount(healthEvent.gainHealth)+
           healthEmitter.listenerCount(healthEvent.maxHealth)+
           healthEmitter.listenerCount(healthEvent.returnHealth));

          console.log("loadSceneTransitionLoad current listeners: ",loadSceneTransitionLoad.listenerCount(SceneTransitionLoad.loadValues));

          console.log("accessTabKey current listeners: ",accessTabKey.listenerCount(tabKey.isTabDown));

          console.log("inventoryKeyEmitter current listeners: ",
          inventoryKeyEmitter.listenerCount(inventoryKey.activateWindow)+
          inventoryKeyEmitter.listenerCount(inventoryKey.isWindowOpen)+
          inventoryKeyEmitter.listenerCount(inventoryKey. getSaveData));

          console.log("playerSkillsEmitter current listeners: ",playerSkillsEmitter.listenerCount(playerSkills.getJump));

          console.log("playerSaveSlot current listeners: ",playerSaveSlot.listenerCount(playerSaveSlot. getSaveSlot));

        //this.registry.destroy();
        //this.events.off();
        //this.scene.restart();

        this.scene.stop('gameHud');
        this.scene.start('gameOverForest');

        //this.scene.start('titleScreen');
        //this.scene.restart();
        

        /*this.anims.play('largeSlimefallingDefeated').once('animationcomplete', () => {
            this.animationPlayed = false;
            this.playerDefeatedAnimationStage++;
        });
    }*/
        //this.scene.stop('forestHome');
        //this.scene.start('gameOverForest');
      }
      
  }