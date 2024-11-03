//this class is to factor out ui elements that we want to keep inbetween scenes by making a scene that is active and overlayed over the current scene
class gameHud extends allSceneFunctions {
  
    constructor(){
      // scene settings
      super({key: 'gameHud',active: false,physics:{default:'arcade'}});

      //gamehud variables
      this.healthDisplay;
      this.grabbed = false;
      this.KeyDisplay;
      this.skipIndicator;
      this.loadCoolDown = false;
      this.saveCoolDown = false;
      this.signCoolDown = false;
      this.playerInventory;
      this.playerStorage;
      this.inventoryTween;
      this.weaponDes;
      this.ringDes;
      this.isPaused = false;
      this.pausedInTextBox = false;
      // save data within the game hud.
      this.playerSex;
      this.playerLocation;
      this.inventoryDataArray;
      this.playerBestiaryData;
      this.playerSkillsData;
      this.playerSaveSlotData;
      this.flagValues;
      this.settings;
      this.skipIndicator; 
      this.saveGraphicDelay = false; 
      this.isStorageOpen = false;
    }

    //loads gamehud sprites
    preload(){
           
      //hud specific 
      this.load.spritesheet('inventory', 'assets/hudElements/inventoryScreen.png',{frameWidth: 1788 , frameHeight: 1338 });
      this.load.spritesheet('inventoryBorder', 'assets/hudElements/inventoryBorder.png',{frameWidth: 1788 , frameHeight: 1338 });
      this.load.spritesheet('storage', 'assets/hudElements/storageInventory.png',{frameWidth: 825 , frameHeight: 564 });
      this.load.spritesheet('storageBorder', 'assets/hudElements/storageInventoryBorder.png',{frameWidth: 825 , frameHeight: 564 });

      this.load.spritesheet('optionsMenu', 'assets/hudElements/optionsMenu.png',{frameWidth: 1260 , frameHeight: 1500 });

      this.load.spritesheet('inventorySlots', 'assets/hudElements/InventorySlots.png',{frameWidth: 96 , frameHeight: 96 });
      this.load.spritesheet('closingButton', 'assets/hudElements/closingButton.png',{frameWidth: 51, frameHeight: 51 });
      this.load.spritesheet('healthBar', 'assets/hudElements/hpBar.png',{frameWidth: 1179, frameHeight: 99 });
      this.load.spritesheet('struggleBar', 'assets/hudElements/struggleBar.png',{frameWidth: 441, frameHeight: 45 });
      this.load.spritesheet('bestiary', 'assets/hudElements/bestiary.png',{frameWidth: 924, frameHeight: 1260 });
      this.load.spritesheet('UIControls', 'assets/hudElements/UIControls.png',{frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('inventoryLabels', 'assets/hudElements/inventoryLabels.png',{frameWidth: 51, frameHeight: 23 });
      this.load.spritesheet('buttons', 'assets/hudElements/buttons.png',{frameWidth: 75, frameHeight: 75 });
      this.load.spritesheet('mobileButtons', 'assets/hudElements/mobileButtons.png',{frameWidth: 213, frameHeight: 213 });


      //this.load.spritesheet('skill', 'assets/skillsBook.png',{frameWidth: 462, frameHeight: 630 });
      this.load.image('TABToSkip', 'assets/hudElements/tabToSkip.png');
      this.load.image('TABToGiveUp', 'assets/hudElements/tabToGiveUp.png');

      this.load.audioSprite('buttonSFX','audio/used-audio/button-sounds/button-sounds.json',[
        "audio/used-audio/button-sounds/button-sounds.mp3"
      ]);

      //level containers for hud.
      this.load.spritesheet('containerScreen', 'assets/containerScreen.png',{frameWidth: 525 , frameHeight: 519 });

      this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'lib/vendors/rexuiplugin.min.js',
        sceneKey: 'rexUI'
      });
    
    }

    //sets up gamehud elements and emitters.
    create(){
        
        console.log("create function in hud activated")

        //creates fadeout when fadeout function is called in the camera object
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          location.reload();
        })

        //set up to display the cursors location. used for debugging
        //this.label = this.add.text(450, 0, '(x, y)', { fontFamily: '"Monospace"'});
        
        // need this to keep track of pointer position
        this.pointer = this.input.activePointer;

        //when launched always ensures the scene is at the top layer.
        this.scene.bringToTop();

        //puts the hud to the top of the scene display order.
        hudDepthEmitter.on(hudDepth.toTop,() =>{
          this.scene.bringToTop();
        });

        //creates a health bar object, needs to be ahead of loading data so that the warped hp value can be set.
        this.healthDisplay = new hpBar(this,170,20);

        /*let that = this;
        setTimeout(function () {
          that.struggleEventBar = new sceneStruggleBar(this, 450, 450);
        }, 1000);*/

        this.struggleEventBar = new sceneStruggleBar(this, 340, 580);
        
        //first we need the data from the json which was updated by the titlescreen or another screen
        this.loadGameHudData();

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

        healthEmitter.on(healthEvent.upgradeHealth,() =>{

          //makes sure upgrades do not go above the limit.
          if(this.playerSaveSlotData.playerHealthUpgrades < 10){

            //increments the upgrade value in the save data
            this.playerSaveSlotData.playerHealthUpgrades += 1;

            //calls the function to upgrade the hp
            this.healthDisplay.setUpgradeSize(this.playerSaveSlotData.playerHealthUpgrades);

          }

          //heals player to full.
          this.healthDisplay.maxHealth();
      });

        struggleEmitter.on(struggleEvent.activateStruggleBar,(visible) =>{
          //console.log("setting this.struggleEventBar.visible: ", visible);
            this.struggleEventBar.visible = visible;  

        });

        struggleEmitter.on(struggleEvent.updateStruggleBar,(struggleAmount) =>{
          
          //console.log("setting struggleAmount: ", struggleAmount);
          this.struggleEventBar.setStruggleAmount(struggleAmount);  

        });

        struggleEmitter.on(struggleEvent.updateStruggleBarCap,(struggleCap) =>{
          //console.log("setting struggleCap: ", struggleCap);
          this.struggleEventBar.setStruggleCap(struggleCap);  

        });

          //sets the upgrade size of the player hp bar
          //console.log("this.playerSaveSlotData.playerHealthUpgrades", this.playerSaveSlotData.playerHealthUpgrades)
          this.healthDisplay.setUpgradeSize(this.playerSaveSlotData.playerHealthUpgrades);

          //updates the health display so the values are shown correctly on the hp bar
          this.healthDisplay.updateDisplay();

          //adds the only direct input the hud needs which is the mouse inputs.
          this.input.mouse.capture = true;

          //sets up the mobile control mobile buttons
          let mobileX = 130;
          let mobileY = 780;

          let gamehudtemp = this;
          
          //define a key and make it interactive
          this.mobileW = new mobileButton(this,mobileX,mobileY-70).setInteractive(this.input.makePixelPerfect());
          this.mobileW.playWKey(0);

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateWKey,(object) =>{
            object.isDown = this.mobileW.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownWKey,(object) =>{

            if(gamehudtemp.mobileW.isJustDown === true){
              
              gamehudtemp.mobileW.isJustDown = false;
              gamehudtemp.mobileW.IsPressed = false;
              gamehudtemp.mobileW.playWKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });

          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileW.on('pointerdown', function (pointer) {
            gamehudtemp.mobileW.IsPressed = true;
            gamehudtemp.mobileW.isJustDown = true;
            gamehudtemp.mobileW.playWKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileW.on('pointerup',function(pointer){
            gamehudtemp.mobileW.IsPressed = false;
            gamehudtemp.mobileW.isJustDown = false;
            gamehudtemp.mobileW.playWKey(0);
          });

          this.mobileW.on('pointerout',function(pointer){
            gamehudtemp.mobileW.IsPressed = false;
            gamehudtemp.mobileW.isJustDown = false;
            gamehudtemp.mobileW.playWKey(0);
          });

          this.mobileA = new mobileButton(this,mobileX-70,mobileY).setInteractive(this.input.makePixelPerfect());
          this.mobileA.playAKey();

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateAKey,(object) =>{
            object.isDown = this.mobileA.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownAKey,(object) =>{

            if(gamehudtemp.mobileA.isJustDown === true){
              
              gamehudtemp.mobileA.isJustDown = false;
              gamehudtemp.mobileA.IsPressed = false;
              gamehudtemp.mobileA.playAKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });

          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileA.on('pointerdown', function (pointer) {
            gamehudtemp.mobileA.IsPressed = true;
            gamehudtemp.mobileA.playAKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileA.on('pointerup',function(pointer){
            gamehudtemp.mobileA.IsPressed = false;
            gamehudtemp.mobileA.playAKey(0);
          });

          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileA.on('pointerout',function(pointer){
            gamehudtemp.mobileA.IsPressed = false;
            gamehudtemp.mobileA.playAKey(0);
          });

          this.mobileS = new mobileButton(this,mobileX,mobileY+70).setInteractive(this.input.makePixelPerfect());
          this.mobileS.playSKey();

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateSKey,(object) =>{
            object.isDown = this.mobileS.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownSKey,(object) =>{

            if(gamehudtemp.mobileS.isJustDown === true){
              
              gamehudtemp.mobileS.isJustDown = false;
              gamehudtemp.mobileS.IsPressed = false;
              gamehudtemp.mobileS.playSKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });

          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileS.on('pointerdown', function (pointer) {
            gamehudtemp.mobileS.IsPressed = true;
            gamehudtemp.mobileS.playSKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileS.on('pointerup',function(pointer){
            gamehudtemp.mobileS.IsPressed = false;
            gamehudtemp.mobileS.playSKey(0);
          });

          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileS.on('pointerout',function(pointer){
            gamehudtemp.mobileS.IsPressed = false;
            gamehudtemp.mobileS.playSKey(0);
          });

          this.mobileD = new mobileButton(this,mobileX+70,mobileY).setInteractive(this.input.makePixelPerfect());
          this.mobileD.playDKey();

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateDKey,(object) =>{
            object.isDown = this.mobileD.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownDKey,(object) =>{

            if(gamehudtemp.mobileD.isJustDown === true){
              
              gamehudtemp.mobileD.isJustDown = false;
              gamehudtemp.mobileD.IsPressed = false;
              gamehudtemp.mobileD.playDKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });

          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileD.on('pointerdown', function (pointer) {
            gamehudtemp.mobileD.IsPressed = true;
            gamehudtemp.mobileD.playDKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileD.on('pointerup',function(pointer){
            gamehudtemp.mobileD.IsPressed = false;
            gamehudtemp.mobileD.playDKey(0);
          });

          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileD.on('pointerout',function(pointer){
            gamehudtemp.mobileD.IsPressed = false;
            gamehudtemp.mobileD.playDKey(0);
          });

          this.mobileJMP = new mobileButton(this,820,mobileY-20).setInteractive(this.input.makePixelPerfect());
          this.mobileJMP.playJMPKey();

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateJMPKey,(object) =>{
            object.isDown = this.mobileJMP.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownSpaceKey,(object) =>{

            if(gamehudtemp.mobileJMP.isJustDown === true){
              
              gamehudtemp.mobileJMP.isJustDown = false;
              gamehudtemp.mobileJMP.IsPressed = false;
              gamehudtemp.mobileJMP.playJMPKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });

          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileJMP.on('pointerdown', function (pointer) {
            gamehudtemp.mobileJMP.IsPressed = true;
            gamehudtemp.mobileJMP.playJMPKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileJMP.on('pointerup',function(pointer){
            gamehudtemp.mobileJMP.IsPressed = false;
            gamehudtemp.mobileJMP.playJMPKey(0);
          });

          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileJMP.on('pointerout',function(pointer){
            gamehudtemp.mobileJMP.IsPressed = false;
            gamehudtemp.mobileJMP.playJMPKey(0);
          });

          this.mobileATK = new mobileButton(this,680,mobileY-20).setInteractive(this.input.makePixelPerfect());
          this.mobileATK.playATKKey();

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateATKKey,(object) =>{
            object.isDown = this.mobileATK.IsPressed;
          });

          //function mimics functionality of justdown, so our button can only be pressed once until it is freed
          controlKeyEmitter.on(controlKeyEvent.justDownATKKey,(object) =>{

            if(gamehudtemp.mobileATK.isJustDown === true){
              
              gamehudtemp.mobileATK.isJustDown = false;
              gamehudtemp.mobileATK.IsPressed = false;
              gamehudtemp.mobileATK.playATKKey(0);

              object.isDown = true;

            }else{

              object.isDown = false;
            }
            
          });
          //pointer events when button is pressed to activate set pressed to true in the key object
          this.mobileATK.on('pointerdown', function (pointer) {
            gamehudtemp.mobileATK.IsPressed = true;
            gamehudtemp.mobileATK.playATKKey(1);
          });
          
          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileATK.on('pointerup',function(pointer){
            gamehudtemp.mobileATK.IsPressed = false;
            gamehudtemp.mobileATK.playATKKey(0);
          });

          //pointer even so that when the button is not being pressed, set value to false.
          this.mobileATK.on('pointerout',function(pointer){
            gamehudtemp.mobileATK.IsPressed = false;
            gamehudtemp.mobileATK.playATKKey(0);
          });

          //when player dies the prompt to skip animations need to pop up.
          this.skipIndicator = this.add.sprite(750, 840,'TABToSkip').setInteractive(this.input.makePixelPerfect());
          this.skipIndicator.visible = false;
          this.skipIndicatorIsPressed = false;
          this.skipIndicator.setScrollFactor(0);

          //if tabtoskip is clicked then 
          this.skipIndicator.on('pointerdown', function (pointer) {
            console.log("pressing skip indicator button")
            gamehudtemp.skipIndicatorIsPressed = true;
          });

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateSkipIndicatorKey,(object) =>{
            console.log("gamehudtemp.skipIndicatorIsPressed: ",gamehudtemp.skipIndicatorIsPressed)
            if(this.skipIndicatorIsPressed === true){
              
              this.skipIndicatorIsPressed = false;
              
              object.isDown = true;

            }else{

              object.isDown = false;
            }
          });

          //when player dies the prompt to skip animations need to pop up.
          this.giveUpIndicator = this.add.sprite(750, 840,'TABToGiveUp').setInteractive(this.input.makePixelPerfect());
          this.giveUpIndicator.setScale(1/3);
          this.giveUpIndicator.visible = false;
          this.giveUpIndicatorIsPressed = false;
          this.giveUpIndicator.setScrollFactor(0);

          //if tabtoskip is clicked then 
          this.giveUpIndicator.on('pointerdown', function (pointer) {
            console.log("pressing skipindicator button")
            gamehudtemp.giveUpIndicatorIsPressed = true;
          });

          //define a emitter so that the gameplay scene can check if the key is being used
          controlKeyEmitter.on(controlKeyEvent.activateGiveUpIndicatorKey,(object) =>{
            if(this.giveUpIndicatorIsPressed === true){
              
              this.giveUpIndicatorIsPressed = false;
              
              object.isDown = true;

            }else{

              object.isDown = false;
            }
          });

          //emitter to return the save slot
          inventoryKeyEmitter.on(inventoryKey.getSaveSlot,(object) =>{
            object.saveSlot = this.playerSaveSlotData.saveSlot;
          });

          //emitter to return the updated data within the gamehud as the game is playing.
          inventoryKeyEmitter.on(inventoryKey.getCurrentData,(object) =>{
            //sets values for saving
            object.playerHpValue = this.healthDisplay.playerHealth;
            object.inventoryArray = this.inventoryDataArray;
            object.playerBestiaryData = this.playerBestiaryData;
            object.playerSkillsData = this.playerSkillsData;
            object.playerSaveSlotData = this.playerSaveSlotData;
            object.flagValues = this.flagValues;
            object.settings = this.settings;
            object.dreamReturnLocation = this.dreamReturnLocation;

            //set for save object so it can set hp to max.
            object.playerMaxHP = this.healthDisplay.playerHealthMax;
          });

          //game saved graphic
          inventoryKeyEmitter.on(inventoryKey.playGameSaved,() =>{
            //game saved text
            if(this.saveGraphicDelay === false){
              this.saveGraphicDelay = true;
              this.savedText = new makeText(this,0,895,'charBubble'," GAME SAVED... ");
              this.savedText.textWave();
              this.savedText.textFadeOutAndDestroy(3000);
              let scene = this;
              setTimeout(function(){
                scene.savedText.destroy();
                scene.saveGraphicDelay = false;
              },3000);
              this.savedText.visible = true;
              this.savedText.setDepth(51);
            }
            
            
          });

          // create inventory hub object
          this.playerInventory = new inventory(this,117,115);
          
          //makes a tween for the inventory object so the interior is see through
          this.inventoryTween = this.tweens.add({
              targets:this.playerInventory.inventoryInterior,
              alpha: { from: 1, to: 0.8 },
              ease: 'Sine.InOut',
              duration: 500,
              yoyo: false
          });
          //add inventory tweens to both the border of the player inventory, and the storage box

          //makes the player inventory slot
          this.playerInventory.generateSlots(this);

          // applys interactions to the object apart of the inventory. 
          this.playerInventory.applyInteractionToSlots(this);

          //adds player storage ui
          this.playerStorage = new storage(this,450,300);

          //makes a tween for the inventory object so the interior is see through
          this.inventoryTween = this.tweens.add({
            targets:this.playerStorage.storageInterior,
            alpha: { from: 1, to: 0.8 },
            ease: 'Sine.InOut',
            duration: 500,
            yoyo: false
          });

        //makes a tween for the inventory object so the interior is see through
        this.inventoryTween = this.tweens.add({
          targets:this.playerStorage.playerInventoryInterior,
          alpha: { from: 1, to: 0.8 },
          ease: 'Sine.InOut',
          duration: 500,
          yoyo: false
        });

        //makes the player inventory slot
        this.playerStorage.generateSlots(this);

        // applys interactions to the object apart of the inventory. 
        this.playerStorage.applyInteractionToSlots(this);

          //emitter to opem and close the inventory when the tab input is recieved from the scene
          inventoryKeyEmitter.on(inventoryKey.activateWindow,(scene) =>{
              //opens inventory so long as the storage locker isnt open.
              if(this.isStorageOpen === false){
            this.playerInventory.setView(scene,this);
              }
          });

          //emitter to opem and close the inventory when the tab input is recieved from the scene
          inventoryKeyEmitter.on(inventoryKey.activateStorage,(scene) =>{
            console.log("activating storage emitter");
            this.playerStorage.setView(scene,this);
          });

          //activates storage locker ui
          inventoryKeyEmitter.on(inventoryKey.activateWindowWithContainer,(scene) =>{
            this.playerInventory.setView(scene,this);

            
          });

          //emitter so other classes can acess the players inventory 
          inventoryKeyEmitter.on(inventoryKey.getInventory,(playerDataObject) =>{
            //console.log("this.inventoryDataArray in inventoryKey.getInventory:" ,this.inventoryDataArray);
            playerDataObject.playerInventoryData = this.inventoryDataArray;
          });

          //important emitter called by warp to set the new location. important for the back to title screen button in settings.
          inventoryKeyEmitter.on(inventoryKey.setLocation,(location) =>{
              this.playerLocation = location;
          });

          //emitter to tell when the inventory is open or no so we can close it if the player gets grabbed ect.
          inventoryKeyEmitter.on(inventoryKey.isWindowOpen,(object) =>{
            object.isOpen =  this.playerInventory.isOpen;
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

                  //console.log("this.inventoryDataArray[counter].itemID ",this.inventoryDataArray[counter].itemID," === item.ItemID: ",item.itemID);
                  //console.log("this.inventoryDataArray[counter].itemStackable ",this.inventoryDataArray[counter].itemStackable,",=== 1");
                  //console.log("this.inventoryDataArray[counter].itemAmount ",this.inventoryDataArray[counter].itemAmount," + item.itemAmount: ",item.itemAmount);

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
            console.log("after emitterchecking if flag exists. : ",object);

            for (let [key, value] of Object.entries(this.flagValues.containerFlags)) {
              //console.log("TESTING EQUAlity,key:",key," object.flagToFind: ",object.flagToFind, " value:", value)
              if (object.flagToFind  === value) {
                  object.foundFlag = true;
              }
              }

            console.log("search for flag complete: ",object);

          });

          inventoryKeyEmitter.on(inventoryKey.checkBestiaryFlag,(object) =>{
            console.log("after emitterchecking if bestiary value exists. : ",object);
            
            console.log("this.playerBestiaryData: ",this.playerBestiaryData)
            //search for the string value in this.flagValues.containerFlags
            for (let [key, value] of Object.entries(this.playerBestiaryData)) {
              //console.log("TESTING EQUAlity,key:",key," object.flagToFind: ",object.flagToFind, " value:", value)
              if (object.flagToFind  === key && value === 1) {
                  object.foundFlag = true;
              }
              }

            console.log("search for flag complete: ",object);

          });

          //emitter to get the player skills object so the player class has acess to it for jump skilles ect.
          playerSkillsEmitter.on(playerSkills.getJump,(object) =>{

            //console.log("this.playerSkillsData when emitter is called",this.playerSkillsData);
            object.playerSkills = this.playerSkillsData;

          });

          //emitter for returning save slot data
          playerSaveSlotEmitter.on(playerSaveSlot.getSaveSlot,(object) =>{
            object.playerSaveSlotData = this.playerSaveSlotData;
          });


          //emitter for displaying tab to skip display
          skipIndicatorEmitter.on(skipIndicator.activateSkipIndicator,(visible) =>{
            this.skipIndicator.visible = visible;
          });

          //emitter for displaying tab to give up display
          giveUpIndicatorEmitter.on(giveUpIndicator.activateGiveUpIndicator,(visible) =>{
            this.giveUpIndicator.visible = visible;
          });


          //test to see if the emitters are active
          this.printActiveEmitter();
        
          

        console.log("create function in hud finished-------------------------------------------------------");
    }

    //update loop.
    update(){
      
      //updates the display showing where the cursor is located.
      //this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');       
    }

}