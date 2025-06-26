class buyContainer extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,shopUI, item,buyOnce,buyOnceFlag){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      console.log("buyOnce: ",buyOnce, " buyOnceFlag: ",buyOnceFlag);
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.setDepth(20);

      //define reference to shop variable
      this.shopUI = shopUI;
      //and add this object to the shopuis group list;
      this.shopUI.add(this);

      //if we make a item object in here, its passed by refrence into our array as a object. causing problems
      //specifically the item amount doubles after each purchase because the item refrence to this objecxt is added to the player array.
      //so we break apart the item refrence into this object. then reconstruct a temp object so we dont have a lingering refrence.
      this.itemAmount = item.itemAmount;
      this.itemDescription = item.itemDescription;
      this.itemID = item.itemID;
      this.itemName = item.itemName;
      this.itemStackable = item.itemStackable;
      this.itemType = item.itemType;
      this.sellValue = item.sellValue;

      this.scene = scene;

      this.buyOnceActivated = false;

      //if buyonce is active the set up button for that logic
      if(buyOnce === true){
        //make a object, and do a flag check to see if the player has that flag.
        let checkFlag = {
          flagToFind: buyOnceFlag,
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, checkFlag);

        //if the player has the flag, grey out buy button, and make it un usable
        if(checkFlag.foundFlag === true){

          this.buySlotBackground = scene.add.sprite(60, 5, 'shopSlot');
          this.buySlotBackground.setScale(.49);
          this.add(this.buySlotBackground);
          this.buySlotBackground.setTint(0x808080);

          //define the buy button
          //create text button which can be used to buyButtonDisplay a stack
          this.buyButtonDisplay = new makeText(scene,-60,-5,'charBubble',"BUY",true);
          this.buyButtonDisplay.addHitbox();
          this.buyButtonDisplay.setScale(1.2);
          this.add(this.buyButtonDisplay);
          this.buyButtonDisplay.setTextTint(0x808080);

          //define fake item drop as a display for the item.
          this.buyDropDisplay = new itemDrop(scene, 10,-10,item.itemID,0,1,"","","",0);
          this.buyDropDisplay.setScale(.7);
          this.add(this.buyDropDisplay);
          this.buyDropDisplay.setTint(0x808080);

          this.buyNameDisplay = new makeText(scene,60,0,'charBubble',""+item.itemName);
          this.buyNameDisplay.setScale(.8);
          this.add(this.buyNameDisplay);
          this.buyNameDisplay.setTextTint(0x808080);

          this.buyAmountDisplay = new makeText(scene,60,20,'charBubble',"AMOUNT: ---");
          this.buyAmountDisplay.setScale(.8);
          this.add(this.buyAmountDisplay);
          this.buyAmountDisplay.setTextTint(0x808080);

          //shell currency icon
          this.shellIcon = new shellMark(scene,60,20);
          this.shellIcon.setScale(.4);
          this.shellIcon.visible = true;
          this.add(this.shellIcon);
          this.shellIcon.setTint(0x808080);
    
          //define make text object with the items name.
          this.buyPriceDisplay = new makeText(scene,80,40,'charBubble'," ---");
          this.buyPriceDisplay.setScale(.8);
          this.add(this.buyPriceDisplay);
          this.buyPriceDisplay.setTextTint(0x808080);

          


        //otherwise if player doesnt have flag. have button work, but only once.
        }else{

          //make sure to give the flag on buy.
          this.buySlotBackground = scene.add.sprite(60, 5, 'shopSlot');
          this.buySlotBackground.setScale(.49);
          this.add(this.buySlotBackground);

          //define the buy button
          //create text button which can be used to buyButtonDisplay a stack
          this.buyButtonDisplay = new makeText(scene,-60,-5,'charBubble',"BUY",true);
          this.buyButtonDisplay.addHitbox();
          this.buyButtonDisplay.setScale(1.2);
          this.add(this.buyButtonDisplay);

          //define fake item drop as a display for the item.
          this.buyDropDisplay = new itemDrop(scene, 10,-10,item.itemID,0,1,"","","",0);
          this.buyDropDisplay.setScale(.7);
          this.add(this.buyDropDisplay);

          
          this.buyNameDisplay = new makeText(scene,60,0,'charBubble',""+item.itemName);
          this.buyNameDisplay.setScale(.8);
          this.add(this.buyNameDisplay);

          this.buyAmountDisplay = new makeText(scene,60,20,'charBubble',"AMOUNT: "+item.itemAmount);
          this.buyAmountDisplay.setScale(.8);
          this.add(this.buyAmountDisplay);

          //shell currency icon
          this.shellIcon = new shellMark(scene,60,20);
          this.shellIcon.setScale(.4);
          this.shellIcon.visible = true;
          this.add(this.shellIcon);
  
          //define make text object with the items name.
          let value = Math.floor(item.sellValue * this.shopUI.multiplier * item.itemAmount);
          this.buyPriceDisplay = new makeText(scene,80,40,'charBubble',""+value);
          this.buyPriceDisplay.setScale(.8);
          this.add(this.buyPriceDisplay);

          //set up button functionality for buyButtonDisplay button
          this.buyButtonDisplay.on('pointerover',function(pointer){
              if(this.buyOnceActivated === false){
                this.scene.initSoundEffect('buttonSFX1','1',0.05);
                this.buyButtonDisplay.setTextTint(0xff0000);
              }

            },this);

          this.buyButtonDisplay.on('pointerout',function(pointer){
            if(this.buyOnceActivated === false){
              this.buyButtonDisplay.clearTextTint();
            }
              
          },this);

            this.buyButtonDisplay.on('pointerdown', function (pointer) {

              if(this.buyOnceActivated === false){

                this.buyOnceActivated = true;
                this.buyButtonDisplay.setTextTint(0xff0000);
                this.scene.initSoundEffect('buttonSFX1','2',0.05);

                //if the player has the money
                if(this.scene.playerSaveSlotData.currency >= Math.floor(this.sellValue * this.shopUI.multiplier)){

                  //subtract the currency from the player.
                  this.scene.playerSaveSlotData.currency = this.scene.playerSaveSlotData.currency - Math.floor(this.sellValue * this.shopUI.multiplier);

                  //update the player currency
                  this.shopUI.updatePlayerCurrency();

                  //used to tell if the item was added
                  let addedToInventory = {
                    added: false
                  };

                  //copy the array back to the main one in the game hud before item is added.
                  this.shopUI.SaveAndClearSlots();

                  //add the item to the main array
                  let item =  {
                    itemAmount: this.itemAmount,
                    itemDescription: this.itemDescription ,
                    itemID: this.itemID ,
                    itemName: this.itemName,
                    itemStackable: this.itemStackable,
                    itemType: this.itemType,
                    sellValue: this.sellValue 
                  };

                  console.log("item: ",item,"-------------------------------------------------------------")
                  inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);

                  //set the copy array in shop
                  this.shopUI.copyAndSetSlots();
                  
                  //update array display in shop ui
                  this.shopUI.updatePlayerInventoryView();

                   //have buy once dialogue play.
                  if(this.shopUI.npc !== undefined && this.shopUI.npc !== null){
                    this.shopUI.npc.buyOnceButton();
                  }

                  //add flag to player
                  inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,buyOnceFlag);

                  //set tint of relivent entitys to be greyed out
                  this.buySlotBackground.setTint(0x808080);
                  this.buyButtonDisplay.setTextTint(0x808080);
                  this.buyDropDisplay.setTint(0x808080);
                  this.buyNameDisplay.setTextTint(0x808080);
                  this.shellIcon.setTint(0x808080);

                  //delete text entitys of price and amount and replace them with ---
                  this.buyAmountDisplay.textFadeOutAndDestroy(0);
                  this.buyAmountDisplay = new makeText(scene,60,20,'charBubble',"AMOUNT: ---");
                  this.buyAmountDisplay.setScale(.8);
                  this.add(this.buyAmountDisplay);
                  this.buyAmountDisplay.setTextTint(0x808080);

                  this.buyPriceDisplay.textFadeOutAndDestroy(0);
                  this.buyPriceDisplay = new makeText(scene,80,40,'charBubble'," ---");
                  this.buyPriceDisplay.setScale(.8);
                  this.add(this.buyPriceDisplay);
                  this.buyPriceDisplay.setTextTint(0x808080);

                }else{
                  //display dialogue 
                  if(this.shopUI.npc !== undefined && this.shopUI.npc !== null){
                    this.shopUI.npc.buyButtonFail();
                  }
                }
            }

            },this);

          }


      //otherwise, just have normal infinent buy slots
      }else{

        this.buySlotBackground = scene.add.sprite(60, 5, 'shopSlot');
        this.buySlotBackground.setScale(.49);
        this.add(this.buySlotBackground);

        //define the buy button
        //create text button which can be used to buyButtonDisplay a stack
        this.buyButtonDisplay = new makeText(scene,-60,-5,'charBubble',"BUY",true);
        this.buyButtonDisplay.addHitbox();
        this.buyButtonDisplay.setScale(1.2);
        this.add(this.buyButtonDisplay);

        //define fake item drop as a display for the item.
        this.buyDropDisplay = new itemDrop(scene, 10,-10,item.itemID,0,1,"","","",0);
        this.buyDropDisplay.setScale(.7);
        this.add(this.buyDropDisplay);

        
        this.buyNameDisplay = new makeText(scene,60,0,'charBubble',""+item.itemName);
        this.buyNameDisplay.setScale(.8);
        this.add(this.buyNameDisplay);

        this.buyAmountDisplay = new makeText(scene,60,20,'charBubble',"AMOUNT: "+item.itemAmount);
        this.buyAmountDisplay.setScale(.8);
        this.add(this.buyAmountDisplay);

        //shell currency icon
        this.shellIcon = new shellMark(scene,60,20);
        this.shellIcon.setScale(.4);
        this.shellIcon.visible = true;
        this.add(this.shellIcon);
 
        //define make text object with the items name.
        let value = Math.floor(item.sellValue * this.shopUI.multiplier * item.itemAmount);
        this.buyPriceDisplay = new makeText(scene,80,40,'charBubble',""+value);
        this.buyPriceDisplay.setScale(.8);
        this.add(this.buyPriceDisplay);

        //set up button functionality for buyButtonDisplay button
        this.buyButtonDisplay.on('pointerover',function(pointer){
            this.scene.initSoundEffect('buttonSFX1','1',0.05);
            this.buyButtonDisplay.setTextTint(0xff0000);

          },this);

          this.buyButtonDisplay.on('pointerout',function(pointer){
            this.buyButtonDisplay.clearTextTint();
            
          },this);

          this.buyButtonDisplay.on('pointerdown', function (pointer) {

            this.buyButtonDisplay.setTextTint(0xff0000);
            this.scene.initSoundEffect('buttonSFX1','2',0.05);

            //if the player has the money
            if(this.scene.playerSaveSlotData.currency >= Math.floor(this.sellValue * this.shopUI.multiplier)){


              //subtract the currency from the player.
              this.scene.playerSaveSlotData.currency = this.scene.playerSaveSlotData.currency - Math.floor(this.sellValue * this.shopUI.multiplier);

              //update the player currency
              this.shopUI.updatePlayerCurrency();

              //used to tell if the item was added
              let addedToInventory = {
                added: false
              };

              //copy the array back to the main one in the game hud before item is added.
              this.shopUI.SaveAndClearSlots();

              //add the item to the main array
              let item =  {
                itemAmount: this.itemAmount,
                itemDescription: this.itemDescription ,
                itemID: this.itemID ,
                itemName: this.itemName,
                itemStackable: this.itemStackable,
                itemType: this.itemType,
                sellValue: this.sellValue 
              };

              console.log("item: ",item,"-------------------------------------------------------------")
              inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);

              //set the copy array in shop
              this.shopUI.copyAndSetSlots();
              
              //update array display in shop ui
              this.shopUI.updatePlayerInventoryView();

              //play dialogue for buying.
              if(this.shopUI.npc !== undefined && this.shopUI.npc !== null){
                this.shopUI.npc.buyButton();
              }

            }else{
              //display dialogue 
              if(this.shopUI.npc !== undefined && this.shopUI.npc !== null){
                this.shopUI.npc.buyButtonFail();
              }
            }

          },this);
      }

      

     
    }
}