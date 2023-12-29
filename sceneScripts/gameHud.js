//import { healthEmitter } from "./events";
//https://stackoverflow.com/questions/69717406/typeerror-eventemitter-is-not-a-constructor-at-new-mapboxgeocoder

//let activeUI;
// the goal of this class is to factor out ui elements that we want to keep inbetween scenes by making a scene that is active and overlayed over the current scene
//so refactoring out my old code we need to keep all ui elements and player controls in this scene
// leave game object definitions within the scene its self
//https://www.youtube.com/watch?v=5zl74QQjUDI
class gameHud extends Phaser.Scene {
  
    constructor(){
      // scene settings
      super({key: 'gameHud',active: false,physics:{default:'arcade'}});

    this.healthDisplay;
    this.grabbed = false;
    this.KeyDisplay;
    this.skipIndicator;
    this.activateFunctions;
    this.loadCoolDown = false;
    this.saveCoolDown = false;
    this.signCoolDown = false;
    this.playerInventory;
    this.inventoryTween;
    //contains the slot objects
    this.inventoryArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    //contains inventory data
    this.inventoryDataArray;
    this.weaponDes;
    this.ringDes;
    this.isPaused = false;
    this.sceneTextBox;
    this.pausedInTextBox = false;
    this.playerInventoryAmountData;
    this.playerBestiaryData;
    this.playerSkillsData;
    this.playerSaveSlotData;
    this.flagValues;
      }

      preload(){
        //loads all sprites and sprite sheets to be used later in game
      //load in the source bitmap file from Tiled
      this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
      //load in the JSON file for the bitmap
      this.load.tilemapTiledJSON("map" , "assets/tiledMap/ForestHome.json");
      this.load.tilemapTiledJSON("gameovermap" , "assets/tiledMap/gameOverForest.json");
      //this might load the save file.json
      //this.load.json("saveFile","saveFile.json");
      //loads sprites.
      // could just define player sprite here.
      this.load.spritesheet("malePlayer" , "assets/evan_master.png" , {frameWidth: 213 , frameHeight: 270 });
      this.load.spritesheet("femalePlayer" , "assets/evelyn_master.png" , {frameWidth: 213 , frameHeight: 270 });
      this.load.spritesheet('backgroundForestLevel', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
      this.load.spritesheet('inventory', 'assets/Inventory.png',{frameWidth: 600 , frameHeight: 425 });
      this.load.spritesheet('inventoryBorder', 'assets/inventoryBorder.png',{frameWidth: 600 , frameHeight: 425 });
      this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 32 , frameHeight: 32 });
      this.load.spritesheet('slotDiscriptions', 'InventorySlotDiscriptions.png',{frameWidth: 32 , frameHeight: 32 });
      this.load.image('hitbox', 'assets/hitbox.png');
      this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
      this.load.spritesheet('hpBarAmount', 'assets/hpBarAmount.png',{frameWidth: 291, frameHeight: 57 });
      this.load.spritesheet('CommonBlueSlime-evan', 'assets/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('CommonBlueSlime-evelyn', 'assets/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });
      this.load.spritesheet('keyPrompts', 'assets/KeyPrompts.png',{frameWidth: 32, frameHeight: 32 });
      this.load.image('TABToSkip', 'assets/tabToSkip.png');
      this.load.spritesheet('forestWarp', 'assets/GroundForestWarp.png',{frameWidth: 80 , frameHeight: 80 });
      this.load.spritesheet('bestiary', 'assets/bestiary.png',{frameWidth: 462, frameHeight: 630 });
      this.load.spritesheet('UIControls', 'assets/UIControls.png',{frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('savePoint', 'assets/saveStatue.png',{frameWidth: 71, frameHeight: 100 });
      this.load.spritesheet('inventoryLabels', 'assets/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
      this.load.spritesheet('sign', 'assets/Sign.png',{frameWidth: 99, frameHeight: 135 });
      this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
      this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
      this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
      this.load.spritesheet('doubleJumpEffect', 'assets/doubleJumpEffect.png',{frameWidth: 69, frameHeight: 15 });
      this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });
    
        
      }

      create(){
        
        // creates a health bar object, needs to be ahead of loading data so that the warped hp value can be set.
        this.healthDisplay = new hpBar(this,180,20);
        //creates a listener for a emmiter so that when the player takes damage, the class calling the damage function only needs to call the emitter.

        //health object emmitter listeners which allow classes outside this scope to interact with the hud and vice versa
        healthEmitter.on(healthEvent.loseHealth,(damage) =>{
            console.log('emitter activating damage to health: ', damage)
            this.healthDisplay.damageCoolDown = false;
            this.healthDisplay.calcDamage(damage)
            console.log('health is now:  ', this.healthDisplay.playerHealth)            
        });
        
        healthEmitter.on(healthEvent.gainHealth,(healing) =>{
            console.log('emitter activating healing')
            this.healthDisplay.calcHealing(healing)
        });
        
        healthEmitter.on(healthEvent.maxHealth,() =>{
          console.log('emitter activating health to max')
          this.healthDisplay.maxHealth()
        });

        healthEmitter.on(healthEvent.returnHealth,(healthObject) =>{
            //console.log('emitter returning health value')
            healthObject.playerHealth = this.healthDisplay.playerHealth;
        });

        //calls the function which loads the data from the json file to our game scene hud
        this.activateFunctions = new allSceneFunctions;
        
        //loads local save data.
        //this.activateFunctions.loadGame(this);

        //creates a listener that sets the variables we need for our hud
        loadSceneTransitionLoad.on(SceneTransitionLoad.loadValues,(playerHpValue,inventoryData,piad,pbd,psd,pssd,flags) =>{
          console.log('==================================================');
          console.log('Setting Values to hud')
          console.log("player HP: " + playerHpValue);
          console.log("playerInventoryData: " + inventoryData);
          console.log("playerInventoryAmountData: " + piad);
          console.log("playerBestiaryData: ", pbd);
          console.log("playerSkillsData: ", psd);
          console.log("playerSaveSlotData: ", pssd);
          console.log("gameFlags: " + flags);
          


          this.healthDisplay.playerHealth = playerHpValue;
          this.inventoryDataArray = inventoryData;
          this.playerInventoryAmountData = piad;
          this.playerBestiaryData = pbd;
          this.playerSkillsData = psd;
          this.playerSaveSlotData = pssd;
          this.flagValues = flags;

          console.log('testing trouble values for saving =====');
          console.log("player HP: " + this.healthDisplay.playerHealth);
          console.log("playerInventoryData: " + this.inventoryDataArray);
          console.log("gameFlags: " + this.flagValues);
          
          //sets the upgrade size of the player hp bar
          this.healthDisplay.setUpgradeSize(this.playerSaveSlotData.playerHealthUpgrades);

          //updates the health display so the values are shown correctly on the hp bar
          this.healthDisplay.updateDisplay();

          

          //creates a emitter listener snice we need to know if the tabkey is pressed so we know if the hud is open or not.
          //accessTabKey.on(tabKey.isTabDown,(object) =>{
            //object.tabIsDown = this.keyTAB.isDown;
          //});

          this.input.mouse.capture = true;

          // create inventory hub object
          this.playerInventory = new inventory(this,180,70,"inventory");
          
          //makes a tween for the inventory object so the interior is see through
          this.inventoryTween = this.tweens.add({
              targets:this.playerInventory,
              alpha: { from: 1, to: 0.8 },
              ease: 'Sine.InOut',
              duration: 500,
              yoyo: false
          });

          //makes the player inventory slot
          this.playerInventory.generateSlots(this);

          // applys interactions to the object apart of the inventory. 
          this.playerInventory.applyInteractionToSlots(this);

          //emitter to opem and close the inventory when the tab input is recieved from the scene
          inventoryKeyEmitter.on(inventoryKey.activateWindow,(scene) =>{
            this.playerInventory.setView(scene,this);
          });

          //emitter to tell when the inventory is open or no so we can close it if the player gets grabbed ect.
          inventoryKeyEmitter.on(inventoryKey.isWindowOpen,(object) =>{
            object.isOpen =  this.playerInventory.isOpen;
          });
          
          //emitter to grab save data so that the save point can have acess to it.
          inventoryKeyEmitter.on(inventoryKey.getSaveData,(playerDataObject) =>{
            
            playerDataObject.playerMaxHp = this.healthDisplay.playerHealthMax;
            playerDataObject.inventoryArray = this.inventoryDataArray;
            playerDataObject.playerInventoryAmountData = this.playerInventoryAmountData;
            playerDataObject.playerBestiaryData = this.playerBestiaryData;
            playerDataObject.playerSkillsData = this.playerSkillsData;
            playerDataObject.playerSaveSlotData = this.playerSaveSlotData;
            playerDataObject.flagValues = this.flagValues;

          });

          //emitter to get the player skills object so the player class has acess to it for jump skilles ect.
          playerSkillsEmitter.on(playerSkills.getJump,(object) =>{
            object.playerSkills = this.playerSkillsData;
          });
      
        });

        
        }

        update(){
          //console.log("playerInventoryData: " + this.inventoryDataArray);
          
        }

    }