
class storage extends Phaser.GameObjects.Container{
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
      this.storageArray = [];

      //when adding new pages, we need this variable to tell what page we are on.
      this.itemPage = 0;

      //defines the inventory border and background
      this.storageInterior = scene.add.sprite(-220, 0, 'storage');
      this.storageInterior.setScale(1/2);
      this.add(this.storageInterior);
      this.inventoryBorder = new storageBorder(scene,-220,0);
      this.inventoryBorder.setScale(1/2);
      this.add(this.inventoryBorder);

      //makes the label for the inventory
      this.inventoryLabel = new makeText(scene,-405,-112,'charBubble',"INVENTORY");
      this.inventoryLabel.setScale(2/3);
      this.add(this.inventoryLabel);

      // defines the storage background and border.
      this.playerInventoryInterior = scene.add.sprite(220, 0, 'storage');
      this.playerInventoryInterior.setScale(1/2);
      this.playerInventoryInterior.flipX = true;
      this.add(this.playerInventoryInterior);
      this.playerInventoryBorder = new storageBorder(scene,220,0);
      this.playerInventoryBorder.setScale(1/2);
      this.playerInventoryBorder.flipX = true;
      this.add(this.playerInventoryBorder);

      //defines the storage label text
      this.storageLabel = new makeText(scene,330,-112,'charBubble',"STORAGE");
      this.storageLabel.setScale(2/3);
      this.add(this.storageLabel);

      this.scene = scene;

      //object for turning of and on the visiblity of our inventory.
      this.inventoryElements = new Phaser.GameObjects.Group(scene); 

      //this.inventoryElements.add(this); 
      console.log('created the inevntory in the for the player');
      
      this.visible = false;

      //creates the buttons on the left and right of the storage so we can navigate the pages
      this.storageLeft;
      this.storageRight;

      this.storageLeft = new UIControls(scene, 45,  170, "UIControls").setInteractive();
      this.storageLeft.anims.play("pointLeft");
      this.storageLeft.visible = false;
      this.add(this.storageLeft);

      this.storageRight = new UIControls(scene,45 + 350, 170, "UIControls").setInteractive();
      this.storageRight.anims.play("pointRight");
      this.storageRight.visible = false;
      this.add(this.storageRight);

      this.pageNumber = 0;
      this.maxPageNumber = ((scene.inventoryDataArray.length - 4) / 24) - 1;
      
      this.storageStartPosition = 47;

      let pageVal = this.pageNumber+1;
      this.storageLabel = new makeText(this.scene,45 + (350)/2,170+35,'charBubble',""+pageVal);
      this.storageLabel.setScale(1.5);
      this.add(this.storageLabel);
    }
    
    // function opens the storage ui. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){
        //updates max page number on opening or closing.
        this.maxPageNumber = ((this.scene.inventoryDataArray.length - 4) / 24) - 1;
        console.log("this.maxPageNumber: ",this.maxPageNumber)

        console.log("this.isOpen: ",this.isOpen,"this.openDelay: ",this.openDelay);
        // if the player hasnt opened the inventory and the delay is false then
        if(this.isOpen === false && this.openDelay === false){
  
            //set variables to reflect it is now open
            this.isOpen = true;
            this.openDelay = true;
            this.isOnScreen = true;
            scene.isPaused = true;
            this.visible = true;

            hud.isStorageOpen = true;
            
            //calls the slots functions so the slots are displaying items correctly
            console.log("setSlotView");
            this.setSlotView(hud);
            console.log("setSlots");
            this.setSlots(hud);

            //sets physics to stop? this may be redundant or obsolite code
            scene.physics.pause();
            scene.player1.anims.pause();

            //set time out for delay.

            let storageThat = this;
            setTimeout(function(){
                storageThat.openDelay = false; 
              },1000);

              //code to handle storage page button visibility
              if(this.pageNumber === 0) {
                this.storageLeft.visible = false;
                this.storageRight.visible = true;
              }else if(this.pageNumber === this.maxPageNumber-1) {
                this.storageLeft.visible = true;
                this.storageRight.visible = false;
              }else{
                this.storageLeft.visible = true;
                this.storageRight.visible = true;
              }

        // otherwise if inventory is open then
        }else if(this.isOpen === true && this.openDelay === false){
            //set variables to reflect that
            this.isOpen = false;
            this.openDelay = true;
            this.isOnScreen = false;
            scene.isPaused = false;
            this.visible = false;

            hud.isStorageOpen = false;

            //resets active slot values so that activeslot does not linger between inventory opening, and closing.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;

            //sets physics to start? this may be redundant or obsolite code
            scene.physics.resume();
            scene.player1.anims.resume();

            //hides slots.
            this.setSlotView(hud);
            this.setSlots(hud);

            //
            if(this.scene.itemName !== undefined){
              this.scene.itemName.destroy();
            }

            if(this.scene.itemDescription !== undefined){
              this.scene.itemDescription.destroy();
            }
            
            //set time out for delay.
            let storageThat = this;
            setTimeout(function(){
              console.log("openDelay set to false");
                storageThat.openDelay = false; 
              },1000);

              this.storageLeft.visible = false;
              this.storageRight.visible = false;

        }

    }

    //creates the intem slots displayed in the inventory.
    generateSlots(scene){ 

      let index = 0;
      let col = 0;
      let row = 0;

      //nested for loop that generates rows and columns of the inventory slots.
      for(col = 0; col < 4; col++){
        for(row = 0; row < 6; row++){
          //creates the slots as the loop generats the slots
          this.storageArray.push(new inventorySlots(scene,(-370) + (row*60), (-80) +(col*60),'inventorySlots').setInteractive());
          //adds the object to this container.
          this.add(this.storageArray[index]);
          //adds this to a group to set sprite visibility.
          this.inventoryElements.add(this.storageArray[index]);

          //adds the numbers in each slot to the visibility group
          this.inventoryElements.add(this.storageArray[index].number1);
          this.add(this.storageArray[index].number1);
          this.inventoryElements.add(this.storageArray[index].number2);
          this.add(this.storageArray[index].number2);

          //console.log("this.storageArray[index].number1: ",this.storageArray[index].number1);
          //console.log("this.storageArray ",this.storageArray);

          index++;
        }
      }

      //nested for loop that generates rows and columns of the storage slots.
      for(col = 0; col < 4; col++){
        for(row = 0; row < 6; row++){
          //creates the slots as the loop generats the slots
          this.storageArray.push(new inventorySlots(scene,(70) + (row*60), (-80) +(col*60),'inventorySlots').setInteractive());
          //adds the object to this container.
          this.add(this.storageArray[index]);
          //adds this to a group to set sprite visibility.
          this.inventoryElements.add(this.storageArray[index]);

          //adds the numbers in each slot to the visibility group
          this.inventoryElements.add(this.storageArray[index].number1);
          this.add(this.storageArray[index].number1);
          this.inventoryElements.add(this.storageArray[index].number2);
          this.add(this.storageArray[index].number2);

          //console.log("this.storageArray[index].number1: ",this.storageArray[index].number1);
          //console.log("this.storageArray ",this.storageArray);

          index++;
        }
      } 
      
      console.log("this.storageArray: ", this.storageArray);

      //create text button which can be used to split a stack
      this.split = new makeText(this.scene,50,-140,'charBubble',"SPLIT",true);
      this.split.addHitbox();
      this.split.clicked = false;
      this.split.setScrollFactor(0);
      this.split.setScale(.8);
      this.split.visible = false;
      this.inventoryElements.add(this.split);
      this.add(this.split);

     //set up button functionality for split button
     this.split.on('pointerover',function(pointer){
         this.scene.initSoundEffect('buttonSFX','1',0.05);
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
      
        this.scene.initSoundEffect('buttonSFX','2',0.05);

      },this);
      
      //create text button which can be used to split a stack
      this.single = new makeText(this.scene,155,-140,'charBubble',"SINGLE",true);
      this.single.addHitbox();
      this.single.clicked = false;
      this.single.setScrollFactor(0);
      this.single.setScale(.8);
      this.single.visible = false;
      this.inventoryElements.add(this.single);
      this.add(this.single);

     //set up button functionality for single button
     this.single.on('pointerover',function(pointer){
       this.scene.initSoundEffect('buttonSFX','1',0.05);
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
    
      this.scene.initSoundEffect('buttonSFX','2',0.05);

    },this);

  }

    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      //sets the elements of the ivnentory to ve visible
      this.inventoryElements.toggleVisible();
      
    }

    // applies the correct animation to the inventory slot based on the inventory data
    setSlots(){
      console.log("this.maxPageNumber: ",this.maxPageNumber);
      //console.log("this.split: ",this.split);
      //index keeps track of the lost, we skip the first two slots as they are the equipment slots
      let index = 0;
      //nested loop to loop through all the rows and columns of the inventory slots
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          console.log('first loop this.scene.inventoryDataArray[',this.getDataLocation(index),']: ',this.scene.inventoryDataArray[this.getDataLocation(index)].itemID)
          this.storageArray[index].anims.play(""+this.scene.inventoryDataArray[this.getDataLocation(index)].itemID);
          this.storageArray[index].clearTint();
          this.storageArray[index].number1.visible = this.isOnScreen;
          this.storageArray[index].number2.visible = this.isOnScreen;

          this.storageArray[index].setSlotNumber(this.scene.inventoryDataArray[this.getDataLocation(index)].itemAmount);
          
          index++;
        }
      }

      //plays info from storage in player data do the storage slots.
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          console.log('second loop this.scene.inventoryDataArray[',this.getDataLocation(index),']: ',this.scene.inventoryDataArray[this.getDataLocation(index)].itemID);
          this.storageArray[index].anims.play(""+this.scene.inventoryDataArray[this.getDataLocation(index)].itemID);
          this.storageArray[index].clearTint();
          this.storageArray[index].number1.visible = this.isOnScreen;
          this.storageArray[index].number2.visible = this.isOnScreen;

          this.storageArray[index].setSlotNumber(this.scene.inventoryDataArray[this.getDataLocation(index)].itemAmount);

          index++;
        }
      }
      
      
  }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      //console.log("this.storageArray: ", this.storageArray);
      let activeSlot = 0;

      // applys  lightupslot function to slots when clicked.
      for(let counter = 0; counter <= 47;counter++){

        // code that handles applying interaction on slots
        this.storageArray[counter].on('pointerdown', function (pointer) {
          activeSlot = counter;
          // important calls our function from this class and not inventorys slots function
          scene.playerStorage.lightUpSlot(scene,activeSlot);
        });

        // applies logic to slot to display item name and description
        let tempStorage = this;
        this.storageArray[counter].on('pointerover',function(pointer){
          //this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
          scene.itemName = new makeText(scene,scene.pointer.x,scene.pointer.y,'charBubble',scene.inventoryDataArray[counter + this.slotOffset].itemName);
          scene.itemName.setScale(0.7);
          scene.itemName.setDepth(21);
          scene.itemDescription = new makeText(scene,scene.itemName.x,scene.itemName.y+15,'charBubble',scene.inventoryDataArray[counter + this.slotOffset].itemDescription);
          scene.itemDescription.setScale(0.7);
          scene.itemDescription.setDepth(21);
          console.log("tempStorage.storageArray[counter + tempStorage.slotOffset].itemID: ",scene.inventoryDataArray[counter + this.slotOffset].itemID);
          if(scene.inventoryDataArray[counter + this.slotOffset].itemID > 0){
            scene.itemValue = new makeText(scene,scene.itemName.x,scene.itemName.y+30,'charBubble',"$"+scene.inventoryDataArray[counter + this.slotOffset].sellValue);
            scene.itemValue.setScale(0.7);
            scene.itemValue.setDepth(21);
          }
        },this);

        // removes name and discription.
        this.storageArray[counter].on('pointerout',function(pointer){
          this.scene.itemName.destroy();
          this.scene.itemDescription.destroy();

          if(this.scene.itemValue !== null && this.scene.itemValue !== undefined){
            this.scene.itemValue.destroy();
          }
        },this);
      }

    }

    //uses the activate slot number and the page number to get the position in dataaray which has the item we want to move.
    getDataLocation(activatedSlot){
      if(activatedSlot < 24){
        return activatedSlot + this.slotOffset;
      }else{
        return activatedSlot + (this.pageNumber * 24) + this.slotOffset;
      }
      
    }

    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
      console.log("this.getDataLocation(activeSlot): ",this.getDataLocation(activeSlot), " activeSlot: ",activeSlot);
      console.log("printing scene.inventoryDataArray[activeSlot]: ",scene.inventoryDataArray[this.getDataLocation(activeSlot)]);

          //if the current slot is not highlighted and there is no slots selected for either of the two active slots, then
          if(this.storageArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){

            //light up slot by setting bool to true.
            this.storageArray[activeSlot].isLitUp = true;

            //light up slot animation which is always item id + 1
            this.storageArray[activeSlot].animsNumber = scene.inventoryDataArray[this.getDataLocation(activeSlot)].itemID;
            this.storageArray[activeSlot].setTint(0xd3d3d3);

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
              this.storageArray[activeSlot].isLitUp = false;
              //play default darken animation.
              //this.storageArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
              this.storageArray[activeSlot].clearTint();
              //reset activeslot1
              this.activeSlot1 = -1;
            }
            
          //else if the activeslot is lit up and both activeslots are not empty, then 
          }else if(this.storageArray[activeSlot].isLitUp === true && this.activeSlot1 !== -1 || this.activeSlot2 !== -2){

            //darken active slot
            this.storageArray[activeSlot].isLitUp = false;
            //switch the id of the items by seting the animation number to the inventorydata at that slot in the inventorydataarray.
            this.storageArray[activeSlot].animsNumber = scene.inventoryDataArray[this.getDataLocation(activeSlot)].itemID;

            //resets activeslots1 and activeslots2
            if(this.activeSlot1 !== -1 && activeSlot === this.activeSlot1){
              this.activeSlot1 = -1;
            }else if(this.activeSlot2 !== -2 && activeSlot === this.activeSlot2){
              this.activeSlot2 = -2;
            }

          }
          if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2){
            console.log("this.getDataLocation(this.activeSlot1): ",this.getDataLocation(this.activeSlot1)," this.getDataLocation(this.activeSlot2): ",this.getDataLocation(this.activeSlot2));
          console.log("this.split.clicked: ",this.split.clicked," this.single.clicked: ",this.single.clicked);
          console.log("scene.inventoryDataArray: ",scene.inventoryDataArray);
          console.log("this.activeSlot1 !== -1: ",this.activeSlot1 !== -1, " this.activeSlot2 !== -2: ",this.activeSlot2 !== -2," (this.split.clicked || this.single.clicked ): ",(this.split.clicked || this.single.clicked ));
          console.log("scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID !== 0: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID !== 0, " scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID === 0: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID === 0);
          console.log("scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount > 1: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount > 1);
          

          }
          //handle button functionality for split and single
          if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && // if the slots are selected
            (this.split.clicked || this.single.clicked ) && //and on of the buttons is pressed
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID !== 0 && // and the first slot is a item
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID === 0  &&// and the second is a blank slot.
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount > 1 //and the item in question has an amount larger than 1
            ){ 

            //if we are splitting
            if(this.split.clicked){

              // determine the value amount to be split. if the item amount is even
              if(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount % 2 === 0){
                this.splitAmount1 = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2;
                this.splitAmount2 = this.splitAmount1;

              //otherwise use floor function to get proper split amount.
              }else{
                this.splitAmount1 = Math.floor(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2) + 1;
                this.splitAmount2 = Math.floor(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount / 2);
              }

              //make a temp object which represents the split  of the stack
              let temp = {
                itemID: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID,
                itemName: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemName,
                itemDescription: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemDescription,
                itemStackable: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemStackable,
                itemAmount: this.splitAmount2,
                itemType: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemType,
                sellValue: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].sellValue
              };

              //update item amount inside the first object.
              scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = this.splitAmount1;

              //set the empty slot to the other half of the stack.
              scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)] = temp;


            }else if(this.single.clicked){

                //split values set.
                this.splitAmount1 = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount - 1;
                this.splitAmount2 = 1;


              //make a temp object which represents the split  of the stack
              let temp = {
                itemID: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID,
                itemName: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemName,
                itemDescription: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemDescription,
                itemStackable: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemStackable,
                itemAmount: this.splitAmount2,
                itemType: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemType,
                sellValue: scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].sellValue
              };

              //update item amount inside the first object.
              scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = this.splitAmount1;

              //set the empty slot to the other half of the stack.
              scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)] = temp;
            }

           //set animation for activeSlot1
           this.storageArray[this.activeSlot1].isLitUp = false;
           this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID;
           this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
           this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
           this.storageArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.storageArray[this.activeSlot2].isLitUp = false;
           this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID;
           this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
           this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
           this.storageArray[this.activeSlot2].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;

          //if the player some how gets two seperate stacks of the same item then allow them to stack it. first is if the two stacks add up to less than 64
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && 
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemStackable === 1 && scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemStackable === 1 &&
            (scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID === scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID ) &&
            (scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount + scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount < 65)){
            
            console.log("scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount," scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID",scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)]);
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
           scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount + scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount;
           
           //set activeSlot1 to a empty object.
           scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)] = temp;

           
           //set animation for activeSlot1
           this.storageArray[this.activeSlot1].isLitUp = false;
           this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID;
           this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
           this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
           this.storageArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.storageArray[this.activeSlot2].isLitUp = false;
           this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID;
           this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
           this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
           this.storageArray[this.activeSlot2].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;
           
          //if the items amount add to larger than 64, make a full stack and update the first stack with the new amount.
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && 
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemStackable === 1 && 
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemStackable === 1 &&
             (scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID === scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID ) && 
             (scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount + scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount > 64) &&
              scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount !== 64 && scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount !== 64){

            console.log("scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID: ",
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID,
            " scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID",
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID);
            
            //set activeSlot1 to a empty object.
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount = (scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount + scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount) - 64 ;

            //adds the amount to the second object
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount = 64 ;

            //set animation for activeSlot1
            this.storageArray[this.activeSlot1].isLitUp = false;
            this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID;
            this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
            this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
            this.storageArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.storageArray[this.activeSlot2].isLitUp = false;
            this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID;
            this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
            this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
            this.storageArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
           
          //if both slots are defined then switch the two items.
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2){

            console.log("switching items, scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)]: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)],"switching items, scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)]: ",scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)]);
            //set temp to the item id in activeSlot1
            let temp = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)];
            //set activeSlot1 to activeslot2 
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)] = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)];
            //set activeslot2 to temp
            scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)] = temp;

            //set animation for activeSlot1
            this.storageArray[this.activeSlot1].isLitUp = false;
            this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemID;
            this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
            this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot1)].itemAmount);
            this.storageArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.storageArray[this.activeSlot2].isLitUp = false;
            this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemID;
            this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
            this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.getDataLocation(this.activeSlot2)].itemAmount);
            this.storageArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }
          this.storageArray[activeSlot].anims.play(''+this.storageArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }

    // applys functionality to the buttons for the storage.
    applyUIControlElements() {

      //apply interactivity for storage right button.
      this.storageRight.on('pointerdown', function (pointer) {

        console.log(" activating storage right. scene.storageUI.pageNumber" + this.pageNumber);

        //if the pageNumber is at or greater than zero and the page number is less than the max page number.
        if (this.pageNumber >= 0 && this.pageNumber < this.maxPageNumber) {
          this.pageNumber++;

          //replace the page maketext object.
          this.storageLabel.destroy();
          let pageVal = this.pageNumber+1;
          this.storageLabel = new makeText(this.scene,45 + (350)/2,170+35,'charBubble',""+pageVal);
          this.storageLabel.setScale(1.5);
          this.add(this.storageLabel);

          //sets slots on transition
          this.setSlots();


          //then if the page number is the last one hide this button
          if (this.pageNumber === this.maxPageNumber - 1) {
            console.log(" hiding right storage arrow");
            this.storageRight.visible = false;
            this.storageLeft.visible = true;
          //else leave both buttons visible.
          } else {
            this.storageLeft.visible = true;
            this.storageRight.visible = true;
          }
        }



      },this);

      this.storageLeft.on('pointerdown', function (pointer) {
        console.log(" activating storage left. scene.storageUI.pageNumber" + this.pageNumber);

        //if the pageNumber is at or greater than zero and the page number is less than the max page number.
        if (this.pageNumber > 0 && this.pageNumber <= this.maxPageNumber) {
          this.pageNumber--;

          //replace the page maketext object.
          this.storageLabel.destroy();
          let pageVal = this.pageNumber+1;
          this.storageLabel = new makeText(this.scene,45 + (350)/2,170+35,'charBubble',""+pageVal);
          this.storageLabel.setScale(1.5);
          this.add(this.storageLabel);

          //calculate the start index of the next page
          this.storageStartPosition -= 24;
          let index = 24;


          //now we need to update the position both the player data object, and the slot view
          //plays info from storage in player data do the storage slots.

          //sets slots on transition
          this.setSlots();

          //then if the page number is the last one hide this button
          if (this.pageNumber === 0) {
            console.log(" hiding left storage arrow");
            this.storageRight.visible = true;
            this.storageLeft.visible = false;
          //else leave both buttons visible.
          } else {
            this.storageLeft.visible = true;
            this.storageRight.visible = true;
          }
        }


      },this);

    }
    
}