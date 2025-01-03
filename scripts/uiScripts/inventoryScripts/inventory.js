class inventory extends Phaser.GameObjects.Container{
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
      this.inventoryArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

      //setting inventory objects
      this.weaponLabel;
      this.ringLabel;
      this.ammoLabel;
      this.costumeLabel;
      this.bestiaryLabel;
      this.skillLabel;
      this.inventoryBorder;
      this.bestiaryUI;
      this.skillUI;
      this.inventoryInterior = scene.add.sprite(this.x, this.y, 'inventory');
      this.settingsButton;
      this.settingsUI;
      this.settingsOpen = false;
      this.bestiaryOpen = false;

      this.scene = scene;

      this.ContainerArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

      this.numberOfInventorySlots = 28;

      //setting the interior object of the inventory as a back drop for other objects.
      this.inventoryInterior.setScale(0.26);
      this.inventoryInterior.anims.create({key: 'closed',frames: this.inventoryInterior.anims.generateFrameNames('inventory', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.inventoryInterior.anims.create({key: 'open',frames: this.inventoryInterior.anims.generateFrameNames('inventory', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.inventoryInterior.anims.play("closed");
      this.add(this.inventoryInterior);

      //object for turning of and on the visiblity of our inventory.
      this.inventoryElements = new Phaser.GameObjects.Group(scene); 

      //this.inventoryElements.add(this); 
      console.log('created the inevntory in the for the player');
    
    }

    //creates the intem slots displayed in the inventory.
    generateSlots(scene){ 

      let index = 0;
      let col = 0;
      let row = 0;

      //weapon slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+185,this.y-125-3,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.weaponLabel = new makeText(scene,this.x+160,this.y-145,'charBubble',"WEAPON");
      this.weaponLabel.visible = false;
      this.weaponLabel.setScale(2/3);
      this.inventoryElements.add(this.weaponLabel);
      this.add(this.weaponLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);

      //increments index so that the ring slot does not over write the weapon slot in the array.
      index++;

      //ring slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+185,this.y-60-3,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.ringLabel = new makeText(scene,this.x+170,this.y-77-3,'charBubble',"RING");
      this.ringLabel.visible = false;
      this.ringLabel.setScale(2/3);
      this.inventoryElements.add(this.ringLabel);
      this.add(this.ringLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);
      
      index++;

      //ammo slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+185,this.y+5-3,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.ammoLabel = new makeText(scene,this.x+170,this.y-15,'charBubble',"AMMO");
      this.ammoLabel.visible = false;
      this.ammoLabel.setScale(2/3);
      this.inventoryElements.add(this.ammoLabel);
      this.add(this.ammoLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);
      
      index++;

      //ammo slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+185,this.y+65,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.costumeLabel = new makeText(scene,this.x+160,this.y+50-3,'charBubble',"VANITY");
      this.costumeLabel.visible = false;
      this.costumeLabel.setScale(2/3);
      this.inventoryElements.add(this.costumeLabel);
      this.add(this.costumeLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);
      
      index++;
      
      //nested for loop that generates rows and collums of the inventory slots.
      for(col = 0; col < 4; col++){
        for(row = 0; row < 6; row++){
          
          //creates the slots as the loop generats the slots
          this.inventoryArray[index] = new inventorySlots(scene,(this.x-180) + (row*60), (this.y-125) +(col*60),'inventorySlots').setInteractive();
          //adds the object to this container.
          this.add(this.inventoryArray[index]);
          //adds this to a group to set sprite visibility.
          this.inventoryElements.add(this.inventoryArray[index]);

          //console.log("this.inventoryArray[index].x: ",this.inventoryArray[index].x," this.inventoryArray[index].y: ",this.inventoryArray[index].y);
          //adds the numbers in each slot to the visibility group
          this.inventoryElements.add(this.inventoryArray[index].number1);
          this.add(this.inventoryArray[index].number1);
          this.inventoryElements.add(this.inventoryArray[index].number2);
          this.add(this.inventoryArray[index].number2);
  
          index++;
          
        }
      }

    /*
            - | -
              |
      -       |       +
      -----------------
      -       |       +
              |
            + | +
    */
    //when making a container and adding object keep in mind the graph above for where it should be placed when setting up its x and y position.
    

      //sets up bestiary and its label
      console.log("activated bestiary controls");
      this.bestiaryUI = new bestiary(scene,this.x-183,this.y+120,this.x+445,this.y+40).setInteractive(scene.input.makePixelPerfect());
      this.inventoryElements.add(this.bestiaryUI);
      this.add(this.bestiaryUI);

      //fun fact any sprite object thats a sub object like the buttons for the bestiary, need to be added to the list otherwise they will not be aligned properly
      this.add(this.bestiaryUI.bestiaryLeft);
      this.add(this.bestiaryUI.bestiaryRight);

      //need to add the text to this container object.
      for(let counter = 0; counter < this.bestiaryUI.bestiaryTitle.length;counter++){
        this.add(this.bestiaryUI.bestiaryTitle[counter]);
      }

      for(let counter = 0; counter < this.bestiaryUI.bestiarySummary.length;counter++){
        this.add(this.bestiaryUI.bestiarySummary[counter]);
      }


      this.bestiaryLabel = new inventoryLabels(scene,this.x-183,this.y+150,'Labels');
      this.inventoryElements.add(this.bestiaryLabel);
      this.add(this.bestiaryLabel);
      this.bestiaryLabel.anims.play('bestiary');
      this.bestiaryUI.visible = this.isOnScreen;
      this.bestiaryUI.applyUIControlElements();
      
      //creates boarder which is not translucent
      this.inventoryBorder = new inventoryBorder(scene,this.x,this.y,'inventoryBorder');
      this.inventoryBorder.setScale(0.26);
      this.inventoryElements.add(this.inventoryBorder);
      this.add(this.inventoryBorder);

     
      //adds currency counter
      this.shellIcon = new shellMark(scene,this.x-110,this.y+120);
      this.shellIcon.setScale(.6);
      this.inventoryElements.add(this.shellIcon);
      this.add(this.shellIcon);
      let startingX = 25;
      let startingY = 0;
      let spacing = 0;

      //adds currency letters
      this.shellLetters = [];
      let shellString = "000";
      for (let counter = 0; counter < shellString.length; counter++) {
        this.shellLetters.push(new textBoxCharacter(scene, this.shellIcon.x + startingX, this.shellIcon.y + startingY,'charBlack'));
        this.inventoryElements.add(this.shellLetters[counter]);
        this.add(this.shellLetters[counter]);
        this.shellLetters[counter].setScale(1/6);
        this.shellLetters[counter].anims.play(shellString.charAt(counter));
        this.shellLetters[counter].x = this.shellLetters[counter].x + spacing;
        this.shellLetters[counter].y = this.shellLetters[counter].y ;
        spacing = spacing + 13;
  
      }

      //adding settings menu
      this.settingsUI = new optionsMenu(scene,this,this.x+500,this.y-200);
      //this.add(this.settingsUI);

      //adds settings menu button
      this.settingsButton = new settingsButton(scene,this.x+5,this.y+125,this.settingsUI,this);
      this.settingsButton.setupSettingsButton();
      this.add(this.settingsButton);

      


    }
    
    // function opens the inventory. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){

      console.log("this.isOpen: ",this.isOpen,"this.openDelay: ",this.openDelay,);
        // if the player hasnt opened the inventory and the delay is false then
        if(this.isOpen === false && this.openDelay === false){
            //set variables to reflect it is now open
            this.isOpen = true;
            this.inventoryInterior.anims.play("open");
            this.openDelay = true;
            this.isOnScreen = true;
            scene.isPaused = true;
            this.visible = true;
            this.settingsButton.visible = true;
            this.settingsUI.visible = false;
            

            //calls the slots functions so the slots are displaying items correctly
            //sets the elements of the ivnentory to ve visible
            this.inventoryElements.toggleVisible();
            console.log("setSlotView");
            this.setSlotView(hud);
            console.log("setSlots");
            this.setSlots(hud);

            //sets physics to stop? this may be redundant or obsolite code
            scene.physics.pause();
            scene.player1.anims.pause();

            //set time out for delay.
            let inventoryThat = this;
            setTimeout(function(){
                inventoryThat.openDelay = false; 
                },1000);

        // otherwise if inventory is open then
        }else if(this.isOpen === true && this.openDelay === false){
            //set variables to reflect that
            this.isOpen = false;
            this.inventoryInterior.anims.play("closed");
            this.openDelay = true;
            this.isOnScreen = false;
            scene.isPaused = false;
            this.settingsButton.visible = false;
            this.settingsUI.visible = false;
            //if the menu is closed the make sure to reset settings if its prematurely closed.
            this.settingsUI.resetSettings();

            //ensures that if thep layer closes inventory then the bestiary and
            //settings can be re opened.
            this.settingsOpen = false;
            this.bestiaryOpen = false;

            //resets active slot values so that activeslot does not linger between inventory opening, and closing.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;

            //sets physics to start? this may be redundant or obsolite code
            scene.physics.resume();
            scene.player1.anims.resume();

             //sets the elements of the ivnentory to ve visible
             this.inventoryElements.toggleVisible();

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
            let inventoryThat = this;
            setTimeout(function(){
              console.log("openDelay set to false");
                inventoryThat.openDelay = false; 
              },1000);

        }
        
        //sets variables in bestiary to tell it that it can open.
        this.bestiaryUI.isOpen =true;
        this.bestiaryUI.openDelay = false;
        this.bestiaryUI.openBestiary(scene);
        this.bestiaryOpen = false;

    }
    
    //special function to close the hud when the player when they save there new settings from options menu
    closeInventoryForSettings(){
      //console.log("this.isOpen: ",this.isOpen,"this.openDelay: ",this.openDelay,);
  
      //set variables to reflect that
      this.openDelay = false;
      this.isOpen = false;
      this.isOnScreen = false;
      this.scene.isPaused = false;
      this.settingsButton.visible = false;
      this.settingsUI.visible = false;
      this.settingsOpen = false;
      this.bestiaryOpen = false;

      //resets active slot values so that activeslot does not linger between inventory opening, and closing.
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;

      //if the menu is closed the make sure to reset settings if its prematurely closed.
      this.settingsUI.resetSettings();

      //hides the inventory slots, takes a scene object, so we have to pass it the gamehud scene instead of the usual 
      //gameplay scene. also applyes savefile inventory to the slots since we reset to the last save.   
      this.setSlotView(this.scene);
      this.setSlots(this.scene);

      //removes the text if any is displayed.
      if(this.scene.itemName !== undefined){
        this.scene.itemName.destroy();
      }

      if(this.scene.itemDescription !== undefined){
        this.scene.itemDescription.destroy();
      }
      
      //toggles the vilisbility of the inventory elements group
      this.inventoryElements.toggleVisible();

      //after we toggle inventory elements we want to leave some specific elements present, or have to manually hide those elements
      //displays closed inventory icon.
      this.inventoryInterior.anims.play("closed");
      this.inventoryInterior.visible = true;

      //loops through all slots to hide there numbers on closing.
      for(let counter = 0; counter < 26 ;counter++){
        this.inventoryArray[counter].number1.visible = false;
        this.inventoryArray[counter].number2.visible = false;
      }

      //hides the shell currency values.
      for (let counter = 0; counter < this.shellLetters.length; counter++) {
        this.shellLetters[counter].visible = false;
      }      
    }

    

    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){

      console.log("scene.inventoryDataArray: ", scene.inventoryDataArray)
        
      //sets the currency icon and number in the inventory.
       if (scene.playerSaveSlotData !== undefined) {
        let animationNumber = "";
        animationNumber += scene.playerSaveSlotData.currency;
        console.log("animationNumber for currency: " + animationNumber);
        for (let counter = 0; counter < this.shellLetters.length; counter++) {
          if (counter < animationNumber.length) {
            this.shellLetters[counter].anims.play(animationNumber.charAt(counter));
          } else {
            this.shellLetters[counter].visible = false;
          }
        }
  
      }
      
    }

    // applies the correct animation to the inventory slot based on the inventory data
    setSlots(scene){

      //index to keep track fo slots
      let index = 0;

      //sets the ring and weapon slot to play the correct animation
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.inventoryArray[index].clearTint();
      index++;
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.inventoryArray[index].clearTint();
      index++;
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.inventoryArray[index].clearTint();
      index++;
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      this.inventoryArray[index].clearTint();
      index++;
      
      //nested loop to loop through all the rows and columns of the inventory slots
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          console.log("slot: ", )
          this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
          this.inventoryArray[index].clearTint();
          index++;
        }
      }
      

       //loops through all slots to set the correct number 
       for(let counter = 0; counter < this.numberOfInventorySlots ;counter++){
        this.inventoryArray[counter].number1.visible = this.isOnScreen;
        this.inventoryArray[counter].number2.visible = this.isOnScreen;

        if(this.isOnScreen === true){
          this.inventoryArray[counter].setSlotNumber(scene.inventoryDataArray[counter].itemAmount);
        }
        

      }
      
    }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      console.log("this.inventoryArray: ", this.inventoryArray);
      let activeSlot = 0;
      // applys  lightupslot function to slots when clicked.
      for(let counter = 0; counter <= this.numberOfInventorySlots-1;counter++){
        // code that handles applying interaction on slots
        this.inventoryArray[counter].on('pointerdown', function (pointer) {
          activeSlot = counter;
          scene.playerInventory.lightUpSlot(scene,activeSlot);
        });

        // applies logic to slot to display item name and description?
        let tempInventory = this;
        this.inventoryArray[counter].on('pointerover',function(pointer){
          //this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
          scene.itemName = new makeText(scene,scene.pointer.x,scene.pointer.y,'charBubble',scene.inventoryDataArray[counter].itemName);
          scene.itemName.setScale(0.7);
          scene.itemName.setDepth(21);
          scene.itemDescription = new makeText(scene,scene.itemName.x,scene.itemName.y+15,'charBubble',scene.inventoryDataArray[counter].itemDescription);
          scene.itemDescription.setScale(0.7);
          scene.itemDescription.setDepth(21);
        });

        // removes name and discription.
        this.inventoryArray[counter].on('pointerout',function(pointer){
          tempInventory.scene.itemName.destroy();
          tempInventory.scene.itemDescription.destroy();
        });
      }

      let inventoryThat = this;
      this.bestiaryUI.on('pointerdown', function (pointer) {
        //opens bestiary if settings is not open.
        if(inventoryThat.settingsOpen === false){
          inventoryThat.bestiaryUI.openBestiary(scene);
          if(inventoryThat.bestiaryOpen === false){
            inventoryThat.bestiaryOpen = true;
          }else{
            inventoryThat.bestiaryOpen = false;
          }
        }
        
        console.log("opening bestiary: ",inventoryThat.bestiaryOpen);
      });

    }

    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
      console.log("highlighting item, printing scene.inventoryDataArray[activeSlot]: ",scene.inventoryDataArray[activeSlot]);

          //if the current slot is not highlighted and there is no slots selected for either of the two active slots, then
          if(this.inventoryArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){

            

            //if the player selects a slot and there is no slot in active lost 1, and the slot does not equal the second slot, then
            if(this.activeSlot1 === -1 && this.activeSlot1 !== activeSlot && activeSlot !== this.activeSlot2){
              //light up slot by setting bool to true.
              this.inventoryArray[activeSlot].isLitUp = true;

              //light up slot animation which is always item id + 1
              this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
              this.inventoryArray[activeSlot].setTint(0xd3d3d3);
              //here as well, maybe?
              //yese we need the inverse of  the case below.
              //then set the selected slot equal to the active slot.
              this.activeSlot1 = activeSlot;

            //if the second slot is empty and does not equal the active slot and the active slot does not equal the first switching slot, then
            }else if(this.activeSlot2 === -2 && this.activeSlot2 !== activeSlot && activeSlot !== this.activeSlot1){
              //console.log("second slot logic this.activeSlot1: ",this.activeSlot1);
             // console.log("second slot logic this.inventoryArray: ",this.inventoryArray);
              console.log("second slot logic scene.inventoryDataArray[this.activeSlot1].itemType: ",scene.inventoryDataArray[this.activeSlot1].itemType);

              //here is where we need protection logic to stop items going in equip slots that arnt of the equip slot type.
              //this is half the solution, as this only covers when the protected slot is selected second.
              //if the active slot is the weapon slot and the item in this.activeslot1 is a weapon
              if(
                (activeSlot === 0 && scene.inventoryDataArray[this.activeSlot1].itemType === "weapon") || // case where the first slot is a weapon object, and the second slot is the weapon slot.
                (this.activeSlot1 === 0 && scene.inventoryDataArray[activeSlot].itemType === "weapon") || // case where the first slot is the weapon slot, and the second slot is a weapon object
                (this.activeSlot1 === 0 && scene.inventoryDataArray[activeSlot].itemType === "") || // case where first slot is the weapon slot and the second is a blank slot.
                (activeSlot === 0 && scene.inventoryDataArray[this.activeSlot1].itemType === "")    //case where first los is blank and second slot is weapon.
              ){

                //then set active slot 2, and allow for the swap to occur
                //light up slot by setting bool to true.
                this.inventoryArray[activeSlot].isLitUp = true;
                this.inventoryArray[activeSlot].setTint(0xd3d3d3);
                this.activeSlot2 = activeSlot;

              //same logic for ring
              }else if(
                 (activeSlot === 1 && scene.inventoryDataArray[this.activeSlot1].itemType === "ring") ||
                 (this.activeSlot1 === 1 && scene.inventoryDataArray[activeSlot].itemType === "ring") ||
                 (this.activeSlot1 === 1 && scene.inventoryDataArray[activeSlot].itemType === "") || 
                 (activeSlot === 1 && scene.inventoryDataArray[this.activeSlot1].itemType === "")    
                 ){

                this.inventoryArray[activeSlot].isLitUp = true;
                this.inventoryArray[activeSlot].setTint(0xd3d3d3);
                this.activeSlot2 = activeSlot;

              //same logic for ammo
              }else if(
                (activeSlot === 2 && scene.inventoryDataArray[this.activeSlot1].itemType === "ammo") || 
                (this.activeSlot1 === 2 && scene.inventoryDataArray[activeSlot].itemType === "ammo") ||
                (this.activeSlot1 === 2 && scene.inventoryDataArray[activeSlot].itemType === "") || 
                (activeSlot === 2 && scene.inventoryDataArray[this.activeSlot1].itemType === "")  
              ){

                this.inventoryArray[activeSlot].isLitUp = true;
                this.inventoryArray[activeSlot].setTint(0xd3d3d3);
                this.activeSlot2 = activeSlot;

              //same logic for vanity
              }else if(
                (activeSlot === 3 && scene.inventoryDataArray[this.activeSlot1].itemType === "vanity") ||
                (this.activeSlot1 === 3 && scene.inventoryDataArray[activeSlot].itemType === "vanity") ||
                (this.activeSlot1 === 3 && scene.inventoryDataArray[activeSlot].itemType === "") || 
                (activeSlot === 3 && scene.inventoryDataArray[this.activeSlot1].itemType === "")  
              ){

                this.inventoryArray[activeSlot].isLitUp = true;
                this.inventoryArray[activeSlot].setTint(0xd3d3d3);
                this.activeSlot2 = activeSlot;
              
              //if we arnt trying to move a item into the equip slots, then highlight the correct slot.
              //case needs to ensure the active slot is not 0,1,2, or 3
              }else if((activeSlot !== 0 && activeSlot !== 1 && activeSlot !== 2 && activeSlot !== 3) && (this.activeSlot1 !== 0 && this.activeSlot1 !== 1 && this.activeSlot1 !== 2 && this.activeSlot1 !== 3)){

                console.log(" non protected slot swap detected.");
                this.inventoryArray[activeSlot].isLitUp = true;
                this.inventoryArray[activeSlot].setTint(0xd3d3d3);
                this.activeSlot2 = activeSlot;

              //lastly if we fail all cases above, then a invalid item swap was attempted, so do nothing.
              }else{
                console.log(" invalid swap detected! ");
              }

              //light up slot animation which is always item id + 1
              this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
              

            //if the active slot matches the activeslot1 then
            }else if(activeSlot === this.activeSlot1){

              //slot is no longer lit up
              this.inventoryArray[activeSlot].isLitUp = false;
              //play default darken animation.
              //this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
              this.inventoryArray[activeSlot].clearTint();
              //reset activeslot1
              this.activeSlot1 = -1;
            }
            
          //else if the activeslot is lit up and both activeslots are not empty, then 
          }else if(this.inventoryArray[activeSlot].isLitUp === true && this.activeSlot1 !== -1 || this.activeSlot2 !== -2){

            //darken active slot
            this.inventoryArray[activeSlot].isLitUp = false;
            //switch the id of the items by seting the animation number to the inventorydata at that slot in the inventorydataarray.
            this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;

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
              itemAmount: 0,
              itemType:""
           };

           //adds the amount to the second object
           scene.inventoryDataArray[this.activeSlot2].itemAmount = scene.inventoryDataArray[this.activeSlot2].itemAmount + scene.inventoryDataArray[this.activeSlot1].itemAmount;
           
           //set activeSlot1 to a empty object.
           scene.inventoryDataArray[this.activeSlot1] = temp;

           
           //set animation for activeSlot1
           this.inventoryArray[this.activeSlot1].isLitUp = false;
           this.inventoryArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
           this.inventoryArray[this.activeSlot1].anims.play(''+this.inventoryArray[this.activeSlot1].animsNumber);
           this.inventoryArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
           this.inventoryArray[this.activeSlot1].clearTint();

           //set animation for activeSlot2
           this.inventoryArray[this.activeSlot2].isLitUp = false;
           this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
           this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
           this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
           this.inventoryArray[this.activeSlot2].clearTint();

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
            this.inventoryArray[this.activeSlot1].isLitUp = false;
            this.inventoryArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
            this.inventoryArray[this.activeSlot1].anims.play(''+this.inventoryArray[this.activeSlot1].animsNumber);
            this.inventoryArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
            this.inventoryArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.inventoryArray[this.activeSlot2].isLitUp = false;
            this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
            this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
            this.inventoryArray[this.activeSlot2].clearTint();

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
            this.inventoryArray[this.activeSlot1].isLitUp = false;
            this.inventoryArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1].itemID;
            this.inventoryArray[this.activeSlot1].anims.play(''+this.inventoryArray[this.activeSlot1].animsNumber);
            this.inventoryArray[this.activeSlot1].setSlotNumber(scene.inventoryDataArray[this.activeSlot1].itemAmount);
            this.inventoryArray[this.activeSlot1].clearTint();

            //set animation for activeSlot2
            this.inventoryArray[this.activeSlot2].isLitUp = false;
            this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
            this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);
            this.inventoryArray[this.activeSlot2].clearTint();

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }
          this.inventoryArray[activeSlot].anims.play(''+this.inventoryArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }
    
}