
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
      //array that serves both as the players inventory, as well as the inventory slots.
      //this.storageArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
      this.storageArray = [];
      

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
    }
    
    // function opens the inventory. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){

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

          index++;
        }
      } 
      
      console.log("this.storageArray: ", this.storageArray);

    }

    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      //sets the elements of the ivnentory to ve visible
      this.inventoryElements.toggleVisible();
      
    }

    // applies the correct animation to the inventory slot based on the inventory data
    setSlots(scene){
      
      //index to keep track fo slots
      let index = 0;
      //nested loop to loop through all the rows and columns of the inventory slots
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          this.storageArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
          this.storageArray[index].clearTint();
          index++;
        }
      }
      //sets the ring and weapon slot to play the correct animation
      this.storageArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.storageArray[index].clearTint();
      index++;
      this.storageArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.storageArray[index].clearTint();

       //loops through all slots to set the correct number 
       for(let counter = 0; counter < 24 ;counter++){
        this.storageArray[counter].number1.visible = this.isOnScreen;
        this.storageArray[counter].number2.visible = this.isOnScreen;

        if(this.isOnScreen === true){
          this.storageArray[counter].setSlotNumber(scene.inventoryDataArray[counter].itemAmount);
        }
        

      }
      
    }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      console.log("this.storageArray: ", this.storageArray);
      let activeSlot = 0;
      // applys  lightupslot function to slots when clicked.
      for(let counter = 0; counter <= 47;counter++){

        console.log("this.storageArray[counter]: ", this.storageArray[counter]);
        // code that handles applying interaction on slots
        this.storageArray[counter].on('pointerdown', function (pointer) {
          activeSlot = counter;
          scene.playerInventory.lightUpSlot(scene,activeSlot);
        });

        // applies logic to slot to display item name and description
        let tempInventory = this;
        this.storageArray[counter].on('pointerover',function(pointer){
          //this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
          scene.itemName = new makeText(scene,scene.pointer.x,scene.pointer.y,'charBubble',scene.inventoryDataArray[counter].itemName);
          scene.itemName.setScale(0.7);
          scene.itemName.setDepth(21);
          scene.itemDescription = new makeText(scene,scene.itemName.x,scene.itemName.y+15,'charBubble',scene.inventoryDataArray[counter].itemDescription);
          scene.itemDescription.setScale(0.7);
          scene.itemDescription.setDepth(21);
        });

        // removes name and discription.
        this.storageArray[counter].on('pointerout',function(pointer){
          tempInventory.scene.itemName.destroy();
          tempInventory.scene.itemDescription.destroy();
        });
      }

    }

    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
      console.log("highlighting item, printing scene.inventoryDataArray[activeSlot]: ",scene.inventoryDataArray[activeSlot]);

          //if the current slot is not highlighted and there is no slots selected for either of the two active slots, then
          if(this.storageArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){

            //light up slot by setting bool to true.
            this.storageArray[activeSlot].isLitUp = true;

            //light up slot animation which is always item id + 1
            this.storageArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
            this.storageArray[activeSlot].setTint(0xd3d3d3);

            //if the player selects a slot and there is no slot in active lost 1, and the slot does not equal the second slot, then
            if(this.activeSlot1 === -1 && this.activeSlot1 !== activeSlot && activeSlot !== this.activeSlot2){

              //then set the selected slot equal to the active slot.
              this.activeSlot1 = activeSlot;

            //if the second slot is empty and does not equal the active slot and the active slot does not equal the first switching slot, then
            }else if(this.activeSlot2 === -2 && this.activeSlot2 !== activeSlot && activeSlot !== this.activeSlot1){

              // then set the current activeslot2 to the active slot so that they can be switched with the activeslot1
              this.activeSlot2 = activeSlot;

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
            this.storageArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;

            //resets activeslots1 and activeslots2
            if(this.activeSlot1 !== -1 && activeSlot === this.activeSlot1){
              this.activeSlot1 = -1;
            }else if(this.activeSlot2 !== -2 && activeSlot === this.activeSlot2){
              this.activeSlot2 = -2;
            }

          }
          console.log("this.activeSlot1: ",this.activeSlot1," this.activeSlot2: ",this.activeSlot2);
          //if the player some how gets two seperate stacks of the same item then allow them to stack it. firs is if the two stacks add up to less than 64
          if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && 
            scene.inventoryDataArray[this.activeSlot1].itemStackable === 1 && scene.inventoryDataArray[this.activeSlot2].itemStackable === 1 &&
            (scene.inventoryDataArray[this.activeSlot1].itemID === scene.inventoryDataArray[this.activeSlot2].itemID ) &&
            (scene.inventoryDataArray[this.activeSlot1].itemAmount + scene.inventoryDataArray[this.activeSlot2].itemAmount < 65)){
            
            console.log("scene.inventoryDataArray[this.activeSlot1].itemID: ",scene.inventoryDataArray[this.activeSlot1].itemAmount," scene.inventoryDataArray[this.activeSlot2].itemID",scene.inventoryDataArray[this.activeSlot2].itemAmount);
            // temp item to clear the slot
            let temp = {
              itemID: 0,
              itemName: ' ',
              itemDescription: ' ',
              itemStackable: 1,
              itemAmount: 0 
           };

           //adds the amount to the second object
           scene.inventoryDataArray[this.activeSlot2].itemAmount = scene.inventoryDataArray[this.activeSlot2].itemAmount + scene.inventoryDataArray[this.activeSlot1].itemAmount;
           
           //set activeSlot1 to a empty object.
           scene.inventoryDataArray[this.activeSlot1] = temp;

           
           //set animation for activeSlot1
           this.storageArray[this.activeSlot1].isLitUp = false;
           this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
           this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
           this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
           this.storageArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.storageArray[this.activeSlot2].isLitUp = false;
           this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
           this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
           this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
           this.storageArray[this.activeSlot2].clearTint();

           //clear both slots.
           this.activeSlot1 = -1;
           this.activeSlot2 = -2;
           
          //if the items amount add to larger than 64, make a full stack and update the first stack with the new amount.
          }else if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2 && scene.inventoryDataArray[this.activeSlot1].itemStackable === 1 && scene.inventoryDataArray[this.activeSlot2].itemStackable === 1 && (scene.inventoryDataArray[this.activeSlot1].itemID === scene.inventoryDataArray[this.activeSlot2].itemID ) && (scene.inventoryDataArray[this.activeSlot1].itemAmount + scene.inventoryDataArray[this.activeSlot2].itemAmount > 64) && scene.inventoryDataArray[this.activeSlot1].itemAmount !== 64 && scene.inventoryDataArray[this.activeSlot2].itemAmount !== 64){
            console.log("scene.inventoryDataArray[this.activeSlot1].itemID: ",
            scene.inventoryDataArray[this.activeSlot1].itemID,
            " scene.inventoryDataArray[this.activeSlot2].itemID",
            scene.inventoryDataArray[this.activeSlot2].itemID);
            
            //set activeSlot1 to a empty object.
            scene.inventoryDataArray[this.activeSlot1].itemAmount = (scene.inventoryDataArray[this.activeSlot2].itemAmount + scene.inventoryDataArray[this.activeSlot1].itemAmount) - 64 ;

            //adds the amount to the second object
            scene.inventoryDataArray[this.activeSlot2].itemAmount = 64 ;

            //set animation for activeSlot1
            this.storageArray[this.activeSlot1].isLitUp = false;
            this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
            this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
            this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
            this.storageArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.storageArray[this.activeSlot2].isLitUp = false;
            this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
            this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
            this.storageArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
           
          //if both slots are defined then switch the two items.
          }if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2){

            //set temp to the item id in activeSlot1
            let temp = scene.inventoryDataArray[this.activeSlot1];
            //set activeSlot1 to activeslot2 
            scene.inventoryDataArray[this.activeSlot1] = scene.inventoryDataArray[this.activeSlot2];
            //set activeslot2 to temp
            scene.inventoryDataArray[this.activeSlot2] = temp;

            //set animation for activeSlot1
            this.storageArray[this.activeSlot1].isLitUp = false;
            this.storageArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
            this.storageArray[this.activeSlot1].anims.play(''+this.storageArray[this.activeSlot1].animsNumber);
            this.storageArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
            this.storageArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.storageArray[this.activeSlot2].isLitUp = false;
            this.storageArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.storageArray[this.activeSlot2].anims.play(''+this.storageArray[this.activeSlot2].animsNumber);
            this.storageArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
            this.storageArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }
          this.storageArray[activeSlot].anims.play(''+this.storageArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }
    
}