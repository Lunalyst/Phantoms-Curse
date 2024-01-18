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
    //contains inventory data
    this.inventoryDataArray;
    this.weaponDes;
    this.ringDes;
    this.isPaused = false;
    this.sceneTextBox;
    this.pausedInTextBox = false;
    this.playerBestiaryData;
    this.playerSkillsData;
    this.playerSaveSlotData;
    this.flagValues;
    this.skipIndicator;
      }

      preload(){
           
       //hud specific 
       this.load.spritesheet('inventory', 'assets/inventoryScreen.png',{frameWidth: 969 , frameHeight: 669 });
       this.load.spritesheet('inventoryBorder', 'assets/inventoryBorder.png',{frameWidth: 969 , frameHeight: 669 });

       this.load.spritesheet('inventorySlots', 'assets/InventorySlots.png',{frameWidth: 96 , frameHeight: 96 });
       this.load.spritesheet('slotDiscriptions', 'InventorySlotDiscriptions.png',{frameWidth: 32 , frameHeight: 32 });
       this.load.spritesheet('healthBar', 'assets/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
       this.load.spritesheet('hpBarAmount', 'assets/hpBarAmount.png',{frameWidth: 291, frameHeight: 57 });
       this.load.spritesheet('bestiary', 'assets/bestiary.png',{frameWidth: 462, frameHeight: 630 });
       this.load.spritesheet('UIControls', 'assets/UIControls.png',{frameWidth: 32, frameHeight: 32 });
       this.load.spritesheet('inventoryLabels', 'assets/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
       this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });

       //level containers for hud.
       this.load.spritesheet('containerScreen', 'assets/containerScreen.png',{frameWidth: 525 , frameHeight: 519 });

    
      }

      create(){
        
        console.log("create function in hud activated-------------------------------------------------------")

        //when launched always ensures the scene is at the top layer.
        this.scene.bringToTop();

        hudDepthEmitter.on(hudDepth.toTop,() =>{
          this.scene.bringToTop();
        });

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
          this.playerInventory = new inventory(this,130,150,"inventory");
          
          //makes a tween for the inventory object so the interior is see through
          this.inventoryTween = this.tweens.add({
              targets:this.playerInventory.inventoryInterior,
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

          inventoryKeyEmitter.on(inventoryKey.activateWindowWithContainer,(scene) =>{
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

            playerDataObject.currentHp = this.healthDisplay.playerHealth;
            playerDataObject.playerMaxHp = this.healthDisplay.playerHealthMax;
            playerDataObject.inventoryArray = this.inventoryDataArray;
            playerDataObject.playerBestiaryData = this.playerBestiaryData;
            playerDataObject.playerSkillsData = this.playerSkillsData;
            playerDataObject.playerSaveSlotData = this.playerSaveSlotData;
            playerDataObject.flagValues = this.flagValues;

          });

          //emitter so itemdrops can be added to the inventory.
          inventoryKeyEmitter.on(inventoryKey.addItem,(item,addedToInventory) => {
              /*
              let item = {
                      itemID: 0,
                      itemStackable: 1,
                      itemAmount: 0 
                  };
              */
            console.log("this.inventoryDataArray: ",this.inventoryDataArray)
            let itemAdded = false;
            //loop through inventory item array to see if the item added already been picked up.
              for(let counter = 0; counter < 25 ;counter++){

                  console.log("this.inventoryDataArray[counter].itemID ",this.inventoryDataArray[counter].itemID," === item.ItemID: ",item.ItemID);
                  console.log("this.inventoryDataArray[counter].itemStackable ",this.inventoryDataArray[counter].itemStackable,",=== 1");
                  console.log("this.inventoryDataArray[counter].itemAmount ",this.inventoryDataArray[counter].itemAmount," + item.itemAmount: ",item.itemAmount);

                  //if the item id matches, and the item is stackable, and the total amount does not go above 64 and the item has not already been added then add the item recieved to the item allready in the inventory.
                  if(this.inventoryDataArray[counter].itemID === item.itemID && this.inventoryDataArray[counter].itemStackable === 1 && this.inventoryDataArray[counter].itemAmount + item.itemAmount < 65){
                    
                    console.log("item stack adds to less than 65")
                    
                    //adds the item to the item in the inventory.
                    this.inventoryDataArray[counter].itemAmount = this.inventoryDataArray[counter].itemAmount + item.itemAmount;
                    //lets the check function know if it sucessfully put a item in the inventory.
                    itemAdded = true;
                    //item added so break out of the loop.
                    break;
                  
                  //alternatively, if the item amount plus the inventory object would create a stack larger than 64  we increase the stack to 64 and make a new stack.
                  }else if(this.inventoryDataArray[counter].itemID === item.itemID && this.inventoryDataArray[counter].itemStackable === 1 && this.inventoryDataArray[counter].itemAmount + item.itemAmount > 64 && this.inventoryDataArray[counter].itemAmount !== 64){
                    
                    console.log("item stack adds to more than 64")
                    //set the value in the item to be added to the difference.
                    item.itemAmount = (this.inventoryDataArray[counter].itemAmount + item.itemAmount) - 64;
                    //then set the initial value  of the item in the inventory to 64
                    this.inventoryDataArray[counter].itemAmount = 64;
                    //break out of loop not setting item added as there is still a item that needs to be added. goes to the next loop.
                    break;
                  
                  //edge case, if the player some how recieves a item larger than 64. dont know how a player would achieve this. something to keep in mind but shouldnt be possible.
                  }
              }
              //if the item doesnt exist in the players inventory or that item slot is full, then add it to the nearest item slot that is empty.
              if(itemAdded === false){
                //loop through inventory item array
                for(let counter = 0; counter < 25;counter++){

                  //if the item id is empty then add the new item to that id.
                  if(this.inventoryDataArray[counter].itemID === 0 ){
                    //adds the item to the item in the inventory.
                    this.inventoryDataArray[counter] = item;

                    itemAdded = true;

                    //item added so break out of the loop.
                    break;
                  }
                }
              }

              addedToInventory.added = itemAdded;
              console.log("addedToInventory.added: ",addedToInventory.added)
              console.log("this.inventoryDataArray: ",this.inventoryDataArray)

          });

          //emitter that adds a container flag so that we can define a container give it a flag, and set that flag all from the init of that container object.
          inventoryKeyEmitter.on(inventoryKey.addContainerFlag,(containerString) =>{

            //pushes a value to the containerflags array in the flags object apart of player data.
            console.log("containerString: ",containerString);
            this.flagValues.containerFlags.push(containerString);

            console.log("adding flag to players flag data: ",this.flagValues);

          });

          //emitter to check if the value within this.flagValues.containerFlags exists. if it set object to true. otherwise, set it to false.
          inventoryKeyEmitter.on(inventoryKey.checkContainerFlag,(object) =>{
            console.log("checking if flag exists. : ",object);

            /*let object = {
              flagToFind: "",
              foundFlag: false,
            };*/

            //search for the string value in this.flagValues.containerFlags
            for(let counter = 0; counter < this.flagValues.containerFlags.length; counter++){
              //if we find a flag that matches, set the value to true in our object passed by refrence.
              if(this.flagValues.containerFlags[counter] === object.flagToFind){
                object.foundFlag = true;
              }
            }

            console.log("search for flag complete: ",object);

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
           console.log("playerBestiaryData: ", file.pbd);
           console.log("playerSkillsData: ", file.psd);
           console.log("playerSaveSlotData: ", file.pssd);
           console.log("gameFlags: " + file.flags);
           
           this.healthDisplay.playerHealth = file.playerHpValue;
           this.inventoryDataArray = file.inventoryData;
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

          console.log("playerSaveSlot current listeners: ",playerSaveSlot.listenerCount(playerSaveSlot.getSaveSlot));

          console.log("hudDepthEmitter current listeners: ",hudDepthEmitter.listenerCount(hudDepth.toTop));

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
          hudDepthEmitter.removeAllListeners(hudDepth.toTop);

        printActiveEmitter(); 
      }

    }