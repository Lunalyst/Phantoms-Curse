/*
notes for this object
1) need to make a copy of the players inventory that this object uses instead of the original. that way items left in the sell slots are not deleted.
counter point. what if we do a check to see if the slots for selling are not itemid 0 if thats the case, simply move that item back into the inventorys slots.
//if the inventory is full and that occurs, then add the item ising the add item method. so they end up in the storage locker.

2) need to figure out a way to close the shop. preferably a explicit button that calls the npc to progress dialogue?

3)  need two groups. being buy and sell which become visible when the botton for there groupo is pressed

4) item scrolling. was tihnking of having a set 5 or six item views which have a item view, item name, and a buy button.
when the bottom and up arrows are pressed its scrolls through the item list. hide the arrows if the size is less than the scroll amount.
 otherwise show them like the bestiary book but vertical

 containter, which has 
 1) fake item prop to show visual of item.
 2) text displaying the item name
 3) interactive button which when clicked adds the item, and subtracts the currency value.
 -note. if the player doesnt have enough money, have dialogue for it.
 4) most important, a position to a array of buy objects  letting the container know what the player is buying.

 then. have a array of x of these container objects.

 where we have two buttons that cycle through the objects if there are more than x. if not hide both buttons.


*/
class shop extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.setDepth(20);

      //seting variables 
      this.isOpen = false;
      this.openDelay = false;
      this.index = 0;
      this.isOnScreen = false;
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;
      //value for determining what the slot offset should be, we currently have weapon, and ring slot, so we 
      // should have 2 as the offset.
      this.slotOffset = 4
      this.shopArray = [];

      //when adding new pages, we need this variable to tell what page we are on.
      this.itemPage = 0;

      //defines the inventory border and background
      this.shopInterior = scene.add.sprite(-220, 0, 'storage');
      this.shopInterior.setScale(1/2);
      this.add(this.shopInterior);
      this.inventoryBorder = new storageBorder(scene,-220,0);
      this.inventoryBorder.setScale(1/2);
      //this.add(this.inventoryBorder);

      //makes the label for the inventory
      this.inventoryLabel = new makeText(scene,-405,-112,'charBubble',"INVENTORY");
      this.inventoryLabel.setScale(2/3);
      this.add(this.inventoryLabel);

      // defines the shop background and border.
      this.playerInventoryInterior = scene.add.sprite(220, 0, 'shop');
      this.playerInventoryInterior.setScale(1/2);
      this.add(this.playerInventoryInterior);
      

      this.scene = scene;

      //object for turning of and on the visiblity of our inventory.
      this.inventoryElements = new Phaser.GameObjects.Group(scene); 

      //group for the elements that are in the buy tab
      this.buyElements = new Phaser.GameObjects.Group(scene); 

      //group for the elements that are in the sell tab
      this.sellElements = new Phaser.GameObjects.Group(scene); 

      //this.this.copyDataArray is our location in memory we want to set after we are done 
      this.copyDataArray = [];

      //this.inventoryElements.add(this); 
      console.log('created the inevntory in the for the player');
      
      this.visible = false;

      let pageVal = this.pageNumber+1;

      this.buyArray;
    }

    //function to set up the buy inventory.
    setUpBuyArray(buyArray){

    }
    
    // function opens the shop ui. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){
        //updates max page number on opening or closing.

        console.log("this.isOpen: ",this.isOpen,"this.openDelay: ",this.openDelay);
        console.log("this.npc: ",this.npc);
        // if the player hasnt opened the inventory and the delay is false then
        if(this.isOpen === false && this.openDelay === false){
  
            //set variables to reflect it is now open
            this.isOpen = true;
            this.openDelay = true;
            this.isOnScreen = true;
            scene.isPaused = true;
            this.visible = true;

            hud.isshopOpen = true;
            
            //calls the slots functions so the slots are displaying items correctly
            console.log("setSlotView");
            this.setSlotView(hud);
            console.log("copying dataArray to slots");
            this.copyAndSetSlots(hud);

            //sets physics to stop? this may be redundant or obsolite code
            scene.physics.pause();
            scene.player1.anims.pause();

            //set time out for delay.

            let shopThat = this;
            setTimeout(function(){
                shopThat.openDelay = false; 
              },1000);

        // otherwise if inventory is open then
        }else if(this.isOpen === true && this.openDelay === false){
            //set variables to reflect that
            this.isOpen = false;
            this.openDelay = true;
            this.isOnScreen = false;
            scene.isPaused = false;
            this.visible = false;

            hud.isshopOpen = false;

            //resets active slot values so that activeslot does not linger between inventory opening, and closing.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;

            //sets physics to start? this may be redundant or obsolite code
            scene.physics.resume();
            scene.player1.anims.resume();

            //hides slots.
            this.setSlotView(hud);
            console.log("saving and copying back element in scene inventory from shop ui");
            this.SaveAndClearSlots(hud);

            //
            if(this.scene.itemName !== undefined){
              this.scene.itemName.destroy();
            }

            if(this.scene.itemDescription !== undefined){
              this.scene.itemDescription.destroy();
            }
            
            //set time out for delay.
            let shopThat = this;
            setTimeout(function(){
              console.log("openDelay set to false");
                shopThat.openDelay = false; 
              },1000);
        }

    }

    //sets a refrence to the npc which opened the shop ui.
    setNPCRef(npc){
      this.npc = npc;
    }

    //creates the intem slots displayed in the inventory.
    generateSlots(scene){ 

      //inventory slots and objects==============================================================================================
      let index = 0;
      let col = 0;
      let row = 0;

      //nested for loop that generates rows and columns of the inventory slots.
      for(col = 0; col < 4; col++){
        for(row = 0; row < 6; row++){
          //creates the slots as the loop generats the slots
          this.shopArray.push(new inventorySlots(scene,(-370) + (row*60), (-80) +(col*60),'inventorySlots').setInteractive());
          //adds the object to this container.
          this.add(this.shopArray[index]);
          //adds this to a group to set sprite visibility.
          this.inventoryElements.add(this.shopArray[index]);

          //adds the numbers in each slot to the visibility group
          this.inventoryElements.add(this.shopArray[index].number1);
          this.add(this.shopArray[index].number1);
          this.inventoryElements.add(this.shopArray[index].number2);
          this.add(this.shopArray[index].number2);

          //console.log("this.shopArray[index].number1: ",this.shopArray[index].number1);
          //console.log("this.shopArray ",this.shopArray);

          index++;
        }
      }

      //adds currency counter
      this.shellIcon = new shellMark(scene,-320,160);
      this.shellIcon.setScale(.6);
      this.inventoryElements.add(this.shellIcon);
      this.add(this.shellIcon);
      let startingX = 29;
      let startingY = 22;
      let spacing = 0;

      //sets the currency icon and number in the inventory.
      if (scene.playerSaveSlotData !== undefined) {
        let animationNumber = "";
        animationNumber += scene.playerSaveSlotData.currency;
        console.log("animationNumber for currency: " + animationNumber);
        this.shellLetters = new makeText(scene,this.shellIcon.x + startingX,this.shellIcon.y+startingY,'charBubble',""+ scene.playerSaveSlotData.currency);
        this.shellLetters.visible = false;
        this.inventoryElements.add(this.shellLetters);
        this.add(this.shellLetters);
  
      }

      //create text button which can be used to split a stack
      this.split = new makeText(this.scene,-70,-140,'charBubble',"SPLIT",true);
      this.split.addHitbox();
      this.split.clicked = false;
      this.split.setScrollFactor(0);
      this.split.setScale(.8);
      this.split.visible = false;
      this.inventoryElements.add(this.split);
      this.add(this.split);

     //set up button functionality for split button
     this.split.on('pointerover',function(pointer){
         this.scene.initSoundEffect('buttonSFX1','1',0.05);
         if(this.split.clicked === true){
         this.split.setTextTint(0xff0000);
         }else{
         this.split.setTextTint(0xff7a7a);
         }
      },this);

      this.split.on('pointerout',function(pointer){

       if(this.split.clicked === true){
         this.split.setTextTint(0xff0000);
       }else{
         this.split.clearTextTint();
       }
          
      },this);

      this.split.on('pointerdown', function (pointer) {
       if(this.split.clicked === true){
         this.split.clicked = false;
         this.split.setTextTint(0xff7a7a);
       }else{
         this.split.clicked = true;
         this.split.setTextTint(0xff0000);

       }

       if(this.single.clicked === true){
         this.single.clicked = false;
         this.single.clearTextTint();
       }
      
        this.scene.initSoundEffect('buttonSFX1','2',0.05);

      },this);
      
      //create text button which can be used to split a stack
      this.single = new makeText(this.scene,-175,-140,'charBubble',"SINGLE",true);
      this.single.addHitbox();
      this.single.clicked = false;
      this.single.setScrollFactor(0);
      this.single.setScale(.8);
      this.single.visible = false;
      this.inventoryElements.add(this.single);
      this.add(this.single);

     //set up button functionality for single button
     this.single.on('pointerover',function(pointer){
       this.scene.initSoundEffect('buttonSFX1','1',0.05);
       if(this.single.clicked === true){
       this.single.setTextTint(0xff0000);
       }else{
       this.single.setTextTint(0xff7a7a);
       }
    },this);

    this.single.on('pointerout',function(pointer){

     if(this.single.clicked === true){
       this.single.setTextTint(0xff0000);
     }else{
       this.single.clearTextTint();
     }
        
    },this);

    this.single.on('pointerdown', function (pointer) {
     if(this.single.clicked === true){
       this.single.clicked = false;
       this.single.setTextTint(0xff7a7a);
     }else{
       this.single.clicked = true;
       this.single.setTextTint(0xff0000);

     }

     if(this.split.clicked === true){
       this.split.clicked = false;
       this.split.clearTextTint();
     }
    
      this.scene.initSoundEffect('buttonSFX1','2',0.05);

    },this);

    //sell slots and related objects------------------------------------------------------------------------------------------------------
      
    //nested for loop that generates rows and columns of the sell slots.
    for(col = 0; col < 3; col++){
       for(row = 0; row < 3; row++){
        //creates the slots as the loop generats the slots
        let temp = new inventorySlots(scene,(160) + (row*60), (-60) +(col*60),'inventorySlots').setInteractive();
        this.shopArray.push(temp);
        //adds the object to this container.
        this.add(this.shopArray[index]);
        //adds this to a group to set sprite visibility.
        this.inventoryElements.add(this.shopArray[index]);

        //add the sell slots to the sellelements group.
        this.sellElements.add(temp)

        //adds the numbers in each slot to the visibility group
        this.inventoryElements.add(this.shopArray[index].number1);
        this.sellElements.add(this.shopArray[index].number1);
        this.add(this.shopArray[index].number1);
        this.inventoryElements.add(this.shopArray[index].number2);
        this.sellElements.add(this.shopArray[index].number2);
        this.add(this.shopArray[index].number2);

        index++;
      }
    } 

      //create text button which can be used to split a stack
      this.sellSwitch = new makeText(this.scene,220+65,-170,'charBubble',"SELL",true);
      this.sellSwitch.addHitbox();
      this.sellSwitch.clicked = false;
      this.sellSwitch.setScrollFactor(0);
      this.sellSwitch.visible = false;
      this.inventoryElements.add(this.sellSwitch);
      this.add(this.sellSwitch);

    //set up button functionality for SELL button
    this.sellSwitch.on('pointerover',function(pointer){
      this.scene.initSoundEffect('buttonSFX1','1',0.05);
      
    },this);

    this.sellSwitch.on('pointerdown', function (pointer) {

     //if the button is clicked while it is blank 
      if(this.sellSwitch.clicked === false){
        //set this.clicked to true, then set the tint
        this.sellSwitch.clicked = true;
        this.sellSwitch.setTextTint(0xff0000);
        
        //toggle visibility. this case should have the buy inventory hidden and the sell inventory appear.
        this.buyElements.toggleVisible();
        this.sellElements.toggleVisible();

        //loop through sell slots
        for(let counter = 24; counter < 33;counter++){

          //resets slots in selltab. saftey so things cant be wrongly transfered into the sell slots while in buytab.
          this.shopArray[counter].isLitUp = false;
          this.shopArray[counter].animsNumber = this.copyDataArray[this.getDataLocation(counter)].itemID;
          this.shopArray[counter].anims.play(''+this.shopArray[counter].animsNumber);
          this.shopArray[counter].setSlotNumber(this.copyDataArray[this.getDataLocation(counter)].itemAmount);
          this.shopArray[counter].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;
        }

        //set buyswitch clicked to false
        this.buySwitch.clicked = false;
        this.buySwitch.clearTextTint();
        
      }
  
      this.scene.initSoundEffect('buttonSFX1','2',0.05);

      //call npc to play next in the text box.
      if(this.npc !== undefined && this.npc !== null){
        this.npc.sellSwitch();
      }

    },this);

    //adds currency counter
    this.shellSellIcon = new shellMark(scene,180,-110);
    this.shellSellIcon.setScale(.6);
    this.inventoryElements.add(this.shellSellIcon);
    this.sellElements.add(this.shellSellIcon);
    this.add(this.shellSellIcon);

    //text to display value amount in sell slots.
    this.sellNumber = 0;
    this.sellText = new makeText(this.scene,190,-110,'charBubble',"  = "+this.sellNumber,true);
    this.sellText.setScrollFactor(0);
    this.sellText.visible = false;
    this.inventoryElements.add(this.sellText);
    this.sellElements.add(this.sellText);
    this.add(this.sellText);

    //create text button which can be used to split a stack
    this.sellButton = new makeText(this.scene,150,100,'charBubble',"SELL ITEMS",true);
    this.sellButton.addHitbox();
    this.sellButton.setScrollFactor(0);
    this.sellButton.visible = false;
    this.inventoryElements.add(this.sellButton);
    this.sellElements.add(this.sellButton);
    this.add(this.sellButton);

    //set up button functionality for SELL button
    this.sellButton.on('pointerover',function(pointer){

      this.scene.initSoundEffect('buttonSFX1','1',0.05);
      this.sellButton.setTextTint(0xff0000);

    },this);

    this.sellButton.on('pointerout',function(pointer){

      this.sellButton.clearTextTint();
    
        
    },this);

    this.sellButton.on('pointerdown', function (pointer) {

      this.scene.initSoundEffect('buttonSFX1','2',0.05);

      //add currency to players currency in file
      //sets the currency icon and number in the inventory.
      this.scene.playerSaveSlotData.currency += this.sellNumber;
      let animationNumber = "";
      animationNumber += this.scene.playerSaveSlotData.currency;
      console.log("animationNumber for currency: " + animationNumber);
      this.shellLetters.destroy();
      this.shellLetters = new makeText(this.scene,this.shellIcon.x + startingX,this.shellIcon.y+startingY,'charBubble',""+ this.scene.playerSaveSlotData.currency);
      this.inventoryElements.add(this.shellLetters);
      this.sellElements.add(this.shellLetters);
      this.add(this.shellLetters);

      //call npc to play next in the text box.
      if(this.npc !== undefined && this.npc !== null && this.sellNumber !== 0){
        this.npc.sellButton();
      }
      
      //reset sellprice
      this.sellNumber = 0;

      //loop through the nine slots
      for(let counter = 24; counter < 33; counter++){

        // temp item to clear the slot
        let temp = {
          itemID: 0,
          itemName: ' ',
          itemDescription: ' ',
          itemStackable: 1,
          itemAmount: 0,
          itemType:"",
          sellValue: 0
       };

       this.copyDataArray[this.getDataLocation(counter)] = temp;

       //set animation for activeSlot1
       this.shopArray[counter].isLitUp = false;
       this.shopArray[counter].animsNumber = this.copyDataArray[this.getDataLocation(counter)].itemID;
       this.shopArray[counter].anims.play(''+this.shopArray[counter].animsNumber);
       this.shopArray[counter].setSlotNumber(this.copyDataArray[this.getDataLocation(counter)].itemAmount);
       this.shopArray[counter].clearTint();


      }

      //destroy and reset the sell text.
      this.sellText.destroy();
      this.sellText = new makeText(this.scene,190,-110,'charBubble',"  = "+this.sellNumber,true);
      this.sellText.setScrollFactor(0);
      if(this.sellSwitch.clicked === false){
        this.sellText.visible = false;
      }
      this.inventoryElements.add(this.sellText);
      this.sellElements.add(this.sellText);
      this.add(this.sellText);

    },this);

    //by default the visibility of the sell inventoy should be false
    this.sellElements.toggleVisible();

    //buy, and buy related objects ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //create text button which can be used to buySwitch a stack
    this.buySwitch = new makeText(this.scene,220-95,-170,'charBubble',"BUY",true);
    this.buySwitch.addHitbox();
    this.buySwitch.clicked = true;
    this.buySwitch.setTextTint(0xff0000);
    this.buySwitch.setScrollFactor(0);
    this.buySwitch.visible = false;
    this.inventoryElements.add(this.buySwitch);
    this.add(this.buySwitch);

    //set up button functionality for SELL button
    this.buySwitch.on('pointerover',function(pointer){
      this.scene.initSoundEffect('buttonSFX1','1',0.05);
      
    },this);

    this.buySwitch.on('pointerdown', function (pointer) {

    //if the button is clicked while it is blank 
      if(this.buySwitch.clicked === false){
        //set this.clicked to true, then set the tint
        this.buySwitch.clicked = true;
        this.buySwitch.setTextTint(0xff0000);
        
        //toggle visibility. this case should have the buy inventory hidden and the sell inventory appear.
        this.buyElements.toggleVisible();
        this.sellElements.toggleVisible();

        //loop through sell slots
        for(let counter = 24; counter < 33;counter++){

          //resets slots in selltab. saftey so things cant be wrongly transfered into the sell slots while in buytab.
          this.shopArray[counter].isLitUp = false;
          this.shopArray[counter].animsNumber = this.copyDataArray[this.getDataLocation(counter)].itemID;
          this.shopArray[counter].anims.play(''+this.shopArray[counter].animsNumber);
          this.shopArray[counter].setSlotNumber(this.copyDataArray[this.getDataLocation(counter)].itemAmount);
          this.shopArray[counter].clearTint();

          //making sure to hide the slot numbers while in buy tab
          this.shopArray[counter].number1.visible = false;
          this.shopArray[counter].number2.visible = false;

        }

        //clear both slots.
        this.activeSlot1 = -1;
        this.activeSlot2 = -2;

        //set buyswitch clicked to false
        this.sellSwitch.clicked = false;
        this.sellSwitch.clearTextTint();
        
      }

      this.scene.initSoundEffect('buttonSFX1','2',0.05);

      //call npc to play next in the text box.
      if(this.npc !== undefined && this.npc !== null){
        this.npc.buySwitch();
      }

    },this);
        
  }

    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      //sets the elements of the ivnentory to ve visible
      this.inventoryElements.toggleVisible();
      
    }

    // applies the correct animation to the inventory slot based on the inventory data
    // this version also had a double purpose.
    //when this is called also copys the player inventory to this ui
    copyAndSetSlots(){

      //clears and sets the copy array.
      this.copyDataArray = [];

      //fill the copydataarray with the item object from 3 to 27
      for(let counter = 0; counter < 28;counter++){
        //note its easier to just grab the first 0-27 inventory items. since we call.getDataLocation
        //tagtofix
        this.copyDataArray.push(this.scene.inventoryDataArray[counter]);
      }
      
      //index keeps track of the lost, we skip the first two slots as they are the equipment slots
      let index = 0;
      //nested loop to loop through all the rows and columns of the inventory slots
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          console.log('first loop this.copyDataArray[',this.getDataLocation(index),']: ',this.copyDataArray[this.getDataLocation(index)].itemID)
          this.shopArray[index].anims.play(""+this.copyDataArray[this.getDataLocation(index)].itemID);
          this.shopArray[index].clearTint();
          this.shopArray[index].number1.visible = this.isOnScreen;
          this.shopArray[index].number2.visible = this.isOnScreen;

          this.shopArray[index].setSlotNumber(this.copyDataArray[this.getDataLocation(index)].itemAmount);
          
          index++;
        }
      }
      
      //lets make the sell slots for the sell tab
      for(let col = 0; col < 3; col++){
        for(let row = 0; row < 3; row++){

          //make a blank item  to fill the slots with for the sell.
          let temp = {
            itemID: 0,
            itemName: ' ',
            itemDescription: ' ',
            itemStackable: 1,
            itemAmount: 0,
            itemType:"",
            sellValue: 0
         };

         //push the blank item to the copy array.
         this.copyDataArray.push(temp);

          //set slot apperance of the sell slots.
          this.shopArray[index].anims.play(""+this.copyDataArray[this.getDataLocation(index)].itemID);
          this.shopArray[index].clearTint();
          this.shopArray[index].number1.visible = this.isOnScreen;
          this.shopArray[index].number2.visible = this.isOnScreen;
          this.shopArray[index].setSlotNumber(this.copyDataArray[this.getDataLocation(index)].itemAmount);

          index++;
        }
  
        //destroy and reset the sell text on aditional shop opens.
        this.sellNumber = 0;
        this.sellText.destroy();
        this.sellText = new makeText(this.scene,190,-110,'charBubble',"  = "+this.sellNumber,true);
        if(this.sellSwitch.clicked === false){
          this.sellText.visible = false;
        }
        this.sellText.setScrollFactor(0);
        this.inventoryElements.add(this.sellText);
        this.sellElements.add(this.sellText);
        this.add(this.sellText);

      }

      //ensures that the buy tab is always the open tab anytime you re enter the shop ui.
      if(this.buySwitch.clicked === false){
        //set this.clicked to true, then set the tint
        this.buySwitch.clicked = true;
        this.buySwitch.setTextTint(0xff0000);
        
        //toggle visibility. this case should have the buy inventory hidden and the sell inventory appear.
        this.buyElements.toggleVisible();
        this.sellElements.toggleVisible();

        //loop through sell slots
        for(let counter = 24; counter < 33;counter++){

          //resets slots in selltab. saftey so things cant be wrongly transfered into the sell slots while in buytab.
          this.shopArray[counter].isLitUp = false;
          this.shopArray[counter].animsNumber = this.copyDataArray[this.getDataLocation(counter)].itemID;
          this.shopArray[counter].anims.play(''+this.shopArray[counter].animsNumber);
          this.shopArray[counter].setSlotNumber(this.copyDataArray[this.getDataLocation(counter)].itemAmount);
          this.shopArray[counter].clearTint();

          //making sure to hide the slot numbers while in buy tab
          this.shopArray[counter].number1.visible = false;
          this.shopArray[counter].number2.visible = false;

        }

        //clear both slots.
        this.activeSlot1 = -1;
        this.activeSlot2 = -2;

        //set buyswitch clicked to false
        this.sellSwitch.clicked = false;
        this.sellSwitch.clearTextTint();
        
      }

      console.log("setting copyDataArray");
      console.log("this.copyDataArray: ",this.copyDataArray);
      console.log("this.shopArray: ", this.shopArray);
    }

    //function takes the copyed array for the shop and overwrites the original array with the new data.
    SaveAndClearSlots(){
      
      //overwrite the values from 3-27 in the original storage array with the current copy.
      for(let counter = 0; counter < 28;counter++){
        //overwrite slots in memory with new data
        this.scene.inventoryDataArray[counter] = this.copyDataArray[counter];
      }

      //used to tell if the item was added
      let addedToInventory = {
        added: true
      };

      //afterward check to see if anything is left in the sell slots.
      for(let counter = 28; counter < 37;counter++){
        //if so then add them back to the player inventory using our built in emitter. that way items cant be lost.
        //if the inventory is full as an example, then the items left in the sell slots will end up in the storage locker.
        //emitter to add object to inventory.
        if(this.copyDataArray[counter].itemID !== 0){
          
          inventoryKeyEmitter.emit(inventoryKey.addItem,this.copyDataArray[counter], addedToInventory);
        }
        

      }

     
      
  }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      //console.log("this.shopArray: ", this.shopArray);
      let activeSlot = 0;

      // applys  lightupslot function to slots when clicked.
      for(let counter = 0; counter < 33;counter++){
        console.log("counter: ",counter);
        // code that handles applying interaction on slots
        this.shopArray[counter].on('pointerdown', function (pointer) {
          activeSlot = counter;
          // important calls our function from this class and not inventorys slots function
          scene.playerShop.lightUpSlot(scene,activeSlot);
        });

        // applies logic to slot to display item name and description
        let tempshop = this;
        this.shopArray[counter].on('pointerover',function(pointer){
          //this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
          scene.itemName = new makeText(scene,scene.pointer.x,scene.pointer.y,'charBubble',tempshop.copyDataArray[counter + tempshop.slotOffset].itemName);
          scene.itemName.setScale(0.7);
          scene.itemName.setDepth(21);
          scene.itemDescription = new makeText(scene,scene.itemName.x,scene.itemName.y+15,'charBubble',tempshop.copyDataArray[counter + tempshop.slotOffset].itemDescription);
          scene.itemDescription.setScale(0.7);
          scene.itemDescription.setDepth(21);
          if(tempshop.copyDataArray[counter+ tempshop.slotOffset].itemID !== 0){
            scene.itemValue = new makeText(scene,scene.itemName.x,scene.itemName.y+30,'charBubble',"$"+tempshop.copyDataArray[counter + tempshop.slotOffset].sellValue);
            scene.itemValue.setScale(0.7);
            scene.itemValue.setDepth(21);
          }
        });

        // removes name and discription.
        this.shopArray[counter].on('pointerout',function(pointer){
          tempshop.scene.itemName.destroy();
          tempshop.scene.itemDescription.destroy();

          if(tempshop.scene.itemValue !== null && tempshop.scene.itemValue !== undefined){
            tempshop.scene.itemValue.destroy();
          }
        });
      }

    }

    //uses the activate slot number and the page number to get the position in dataaray which has the item we want to move.
    getDataLocation(activatedSlot){
      
      return activatedSlot + this.slotOffset;
      
    }

    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
      console.log("this.getDataLocation(activeSlot): ",this.getDataLocation(activeSlot), " activeSlot: ",activeSlot);
      console.log("printing this.copyDataArray[activeSlot]: ",this.copyDataArray[this.getDataLocation(activeSlot)]);

          //if the current slot is not highlighted and there is no slots selected for either of the two active slots, then
          if(this.shopArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){

            //light up slot by setting bool to true.
            this.shopArray[activeSlot].isLitUp = true;

            //light up slot animation which is always item id + 1
            this.shopArray[activeSlot].animsNumber = this.copyDataArray[this.getDataLocation(activeSlot)].itemID;
            this.shopArray[activeSlot].setTint(0xd3d3d3);

            //if the player selects a slot and there is no slot in active lost 1, and the slot does not equal the second slot, then
            if(this.activeSlot1 === -1 && this.activeSlot1 !== activeSlot && activeSlot !== this.activeSlot2){

             //activeslot
                this.activeSlot1 = activeSlot;

                

                console.log("this.getDataLocation(activeSlot): ",this.getDataLocation(activeSlot));

            //if the second slot is empty and does not equal the active slot and the active slot does not equal the first switching slot, then
            }else if(this.activeSlot2 === -2 && this.activeSlot2 !== activeSlot && activeSlot !== this.activeSlot1){


                this.activeSlot2 = activeSlot;

                console.log("this.getDataLocation(activeSlot): ",this.getDataLocation(activeSlot));

            //if the active slot matches the activeslot1 then
            }else if(activeSlot === this.activeSlot1){

              //slot is no longer lit up
              this.shopArray[activeSlot].isLitUp = false;
              //play default darken animation.
              //this.shopArray[activeSlot].animsNumber = this.copyDataArray[activeSlot].itemID;
              this.shopArray[activeSlot].clearTint();
              //reset activeslot1
              this.activeSlot1 = -1;
            }
            
          //else if the activeslot is lit up and both activeslots are not empty, then 
          }else if(this.shopArray[activeSlot].isLitUp === true && this.activeSlot1 !== -1 || this.activeSlot2 !== -2){

            //darken active slot
            this.shopArray[activeSlot].isLitUp = false;
            //switch the id of the items by seting the animation number to the inventorydata at that slot in the inventorydataarray.
            this.shopArray[activeSlot].animsNumber = this.copyDataArray[this.getDataLocation(activeSlot)].itemID;

            //resets activeslots1 and activeslots2
            if(this.activeSlot1 !== -1 && activeSlot === this.activeSlot1){
              this.activeSlot1 = -1;
            }else if(this.activeSlot2 !== -2 && activeSlot === this.activeSlot2){
              this.activeSlot2 = -2;
            }

          }

          //handle button functionality for split and single
          if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && // if the slots are selected
            (this.split.clicked || this.single.clicked ) && //and on of the buttons is pressed
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID !== 0 && // and the first slot is a item
            this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID === 0  &&// and the second is a blank slot.
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount > 1 //and the item in question has an amount larger than 1
            ){ 

            //if we are splitting
            if(this.split.clicked){

              // determine the value amount to be split. if the item amount is even
              if(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount % 2 === 0){
                this.splitAmount1 = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2;
                this.splitAmount2 = this.splitAmount1;

              //otherwise use floor function to get proper split amount.
              }else{
                this.splitAmount1 = Math.floor(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2) + 1;
                this.splitAmount2 = Math.floor(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2);
              }

              //make a temp object which represents the split  of the stack
              let temp = {
                itemID: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID,
                itemName: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemName,
                itemDescription: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemDescription,
                itemStackable: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemStackable,
                itemAmount: this.splitAmount2,
                itemType: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemType,
                sellValue: this.copyDataArray[this.getDataLocation(this.activeSlot1)].sellValue
              };

              //update item amount inside the first object.
              this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = this.splitAmount1;

              //set the empty slot to the other half of the stack.
              this.copyDataArray[this.getDataLocation(this.activeSlot2)] = temp;


            }else if(this.single.clicked){

                //split values set.
                this.splitAmount1 = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount - 1;
                this.splitAmount2 = 1;


              //make a temp object which represents the split  of the stack
              let temp = {
                itemID: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID,
                itemName: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemName,
                itemDescription: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemDescription,
                itemStackable: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemStackable,
                itemAmount: this.splitAmount2,
                itemType: this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemType,
                sellValue: this.copyDataArray[this.getDataLocation(this.activeSlot1)].sellValue
              };

              //update item amount inside the first object.
              this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = this.splitAmount1;

              //set the empty slot to the other half of the stack.
              this.copyDataArray[this.getDataLocation(this.activeSlot2)] = temp;
            }

           //set animation for activeSlot1
           this.shopArray[this.activeSlot1].isLitUp = false;
           this.shopArray[this.activeSlot1].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID;
           this.shopArray[this.activeSlot1].anims.play(''+this.shopArray[this.activeSlot1].animsNumber);
           this.shopArray[this.activeSlot1].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
           this.shopArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.shopArray[this.activeSlot2].isLitUp = false;
           this.shopArray[this.activeSlot2].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID;
           this.shopArray[this.activeSlot2].anims.play(''+this.shopArray[this.activeSlot2].animsNumber);
           this.shopArray[this.activeSlot2].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
           this.shopArray[this.activeSlot2].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;

          //if the player some how gets two seperate stacks of the same item then allow them to stack it. first is if the two stacks add up to less than 64
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && 
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemStackable === 1 && this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemStackable === 1 &&
            (this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID === this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID ) &&
            (this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount + this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount < 65)){
            
            console.log("this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID: ",this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount," this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID",this.copyDataArray[this.getDataLocation(this.activeSlot2)]);
            // temp item to clear the slot
            let temp = {
              itemID: 0,
              itemName: ' ',
              itemDescription: ' ',
              itemStackable: 1,
              itemAmount: 0,
              itemType:"",
              sellValue: 0
           };

           //adds the amount to the second object
           this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount = this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount + this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount;
           
           //set activeSlot1 to a empty object.
           this.copyDataArray[this.getDataLocation(this.activeSlot1)] = temp;

           
           //set animation for activeSlot1
           this.shopArray[this.activeSlot1].isLitUp = false;
           this.shopArray[this.activeSlot1].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID;
           this.shopArray[this.activeSlot1].anims.play(''+this.shopArray[this.activeSlot1].animsNumber);
           this.shopArray[this.activeSlot1].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
           this.shopArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.shopArray[this.activeSlot2].isLitUp = false;
           this.shopArray[this.activeSlot2].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID;
           this.shopArray[this.activeSlot2].anims.play(''+this.shopArray[this.activeSlot2].animsNumber);
           this.shopArray[this.activeSlot2].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
           this.shopArray[this.activeSlot2].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;
           
          //if the items amount add to larger than 64, make a full stack and update the first stack with the new amount.
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && 
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemStackable === 1 && 
            this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemStackable === 1 &&
             (this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID === this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID ) && 
             (this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount + this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount > 64) &&
              this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount !== 64 && this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount !== 64){

            console.log("this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID: ",
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID,
            " this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID",
            this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID);
            
            //set activeSlot1 to a empty object.
            this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = (this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount + this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount) - 64 ;

            //adds the amount to the second object
            this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount = 64 ;

            //set animation for activeSlot1
            this.shopArray[this.activeSlot1].isLitUp = false;
            this.shopArray[this.activeSlot1].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID;
            this.shopArray[this.activeSlot1].anims.play(''+this.shopArray[this.activeSlot1].animsNumber);
            this.shopArray[this.activeSlot1].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
            this.shopArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.shopArray[this.activeSlot2].isLitUp = false;
            this.shopArray[this.activeSlot2].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID;
            this.shopArray[this.activeSlot2].anims.play(''+this.shopArray[this.activeSlot2].animsNumber);
            this.shopArray[this.activeSlot2].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
            this.shopArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
           
          //if both slots are defined then switch the two items.
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2){

            console.log("switching items, this.copyDataArray[this.getDataLocation(this.activeSlot1)]: ",this.copyDataArray[this.getDataLocation(this.activeSlot1)],"switching items, this.copyDataArray[this.getDataLocation(this.activeSlot2)]: ",this.copyDataArray[this.getDataLocation(this.activeSlot2)]);
            //set temp to the item id in activeSlot1
            let temp = this.copyDataArray[this.getDataLocation(this.activeSlot1)];
            //set activeSlot1 to activeslot2 
            this.copyDataArray[this.getDataLocation(this.activeSlot1)] = this.copyDataArray[this.getDataLocation(this.activeSlot2)];
            //set activeslot2 to temp
            this.copyDataArray[this.getDataLocation(this.activeSlot2)] = temp;

            //set animation for activeSlot1
            this.shopArray[this.activeSlot1].isLitUp = false;
            this.shopArray[this.activeSlot1].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemID;
            this.shopArray[this.activeSlot1].anims.play(''+this.shopArray[this.activeSlot1].animsNumber);
            this.shopArray[this.activeSlot1].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
            this.shopArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.shopArray[this.activeSlot2].isLitUp = false;
            this.shopArray[this.activeSlot2].animsNumber = this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemID;
            this.shopArray[this.activeSlot2].anims.play(''+this.shopArray[this.activeSlot2].animsNumber);
            this.shopArray[this.activeSlot2].setSlotNumber(this.copyDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
            this.shopArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }


          //reset sellprice
           this.sellNumber = 0;

          //loop through the nine slots
          for(let counter = 24; counter < 33; counter++){

            //add the price of the items in the sell slots to the sellnumber by multiplying the item amount by its sell value.
            this.sellNumber += this.copyDataArray[this.getDataLocation(counter)].itemAmount * this.copyDataArray[this.getDataLocation(counter)].sellValue;

          }

          //destroy and reset the sell text.
          this.sellText.destroy();
          this.sellText = new makeText(this.scene,190,-110,'charBubble',"  = "+this.sellNumber,true);
          if(this.sellSwitch.clicked === false){
            this.sellText.visible = false;
          }
          this.sellText.setScrollFactor(0);
          this.inventoryElements.add(this.sellText);
          this.sellElements.add(this.sellText);
          this.add(this.sellText);

          
          

          this.shopArray[activeSlot].anims.play(''+this.shopArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }

    // applys functionality to the buttons for the shop.
    applyUIControlElements() {

      

    }

    
    
}