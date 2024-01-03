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
    this.skipIndicator;
      }

      preload(){
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

      create(){
        
        console.log("create function in hud activated-------------------------------------------------------")

        

        //creates a health bar object, needs to be ahead of loading data so that the warped hp value can be set.
        this.healthDisplay = new hpBar(this,180,20);

        //when player dies the prompt to skip animations need to pop up.
        this.skipIndicator = this.add.sprite(750, 780,'TABToSkip');
        this.skipIndicator.visible = false;
        this.skipIndicator.setScrollFactor(0);
        
        //sets the  scene text book in the hud
        this.sceneTextBox = new textBox(this,450,620,'textBox');
        

        //first we need the data from the json which was updated by the titlescreen or another screen
        this.loadSceneTransitionValues();

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

          //sets the upgrade size of the player hp bar
          console.log("this.playerSaveSlotData.playerHealthUpgrades", this.playerSaveSlotData.playerHealthUpgrades)
          this.healthDisplay.setUpgradeSize(this.playerSaveSlotData.playerHealthUpgrades);

          //updates the health display so the values are shown correctly on the hp bar
          this.healthDisplay.updateDisplay();

          //adds the only direct input the hud needs which is the mouse inputs.
          this.input.mouse.capture = true;

          // create inventory hub object
          this.playerInventory = new inventory(this,320,280,"inventory");
          
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

          //emitter so other classes can acess the players inventory 
          inventoryKeyEmitter.on(inventoryKey.getInventory,(playerDataObject) =>{
            //console.log("player inventory:",this.playerInventory);
            playerDataObject.playerInventoryData = this.inventoryDataArray;
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

          //emitter for returning save slot data
          playerSaveSlot.on(playerSaveSlot.getSaveSlot,(object) =>{
            object.playerSaveSlotData = this.playerSaveSlotData;
          });


          //emitter for returning save slot data
          skipIndicatorEmitter.on(skipIndicator.activateSkipIndicator,() =>{
            this.skipIndicator.visible = true;
          });

          //test to see if the emitters are active
          this.printActiveEmitter();
        

        console.log("create function in hud finished-------------------------------------------------------");
        }

        update(){
          
          
        }

        loadSceneTransitionValues(){
           //on start up we need files from the scene transition. so we grab those.
           var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));

           console.log('==================================================');
           console.log('Setting Values to hud')
           console.log("player HP: " + file.playerHpValue);
           console.log("playerInventoryData: " + file.inventoryData);
           console.log("playerInventoryAmountData: " + file.piad);
           console.log("playerBestiaryData: ", file.pbd);
           console.log("playerSkillsData: ", file.psd);
           console.log("playerSaveSlotData: ", file.pssd);
           console.log("gameFlags: " + file.flags);
           
           this.healthDisplay.playerHealth = file.playerHpValue;
           this.inventoryDataArray = file.inventoryData;
           this.playerInventoryAmountData = file.piad;
           this.playerBestiaryData = file.pbd;
           this.playerSkillsData = file.psd;
           this.playerSaveSlotData = file.pssd;
           this.flagValues = file.flags;
 
        }

        //function that prints listeners
        printActiveEmitter(){
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

        }

        clearAllEmmitters(){

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

        printActiveEmitter(); 
      }

    }