
/*https://phaser.io/examples/v3/view/input/mouse/click-sprite*/
let inventoryThat;
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
      inventoryThat = this;
      this.index = 0;
      this.isOnScreen = false;
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;
      this.inventoryArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

      //setting inventory objects
      this.weaponLabel;
      this.ringLabel;
      this.bestiaryLabel;
      this.skillLabel;
      this.inventoryBorder;
      this.bestiaryUI;
      this.skillUI;
      this.inventoryInterior = scene.add.sprite(this.x, this.y, 'inventory');
      this.settingsButton;
      this.settingsUI;

      //sprite for players internal inventory for storage.
      /*this.container = scene.add.sprite(this.x-111, this.y+300, 'containerScreen');
      this.container.setScale((1/3)+((1/3)/2));
      this.add(this.container);*/

      this.ContainerArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

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
    
    // function opens the inventory. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){

        // if the player hasnt opened the inventory and the delay is false then
        if(this.isOpen === false && this.openDelay === false){

            //set variables to reflect it is now open
            this.isOpen = true;
            this.inventoryInterior.anims.play("open");
            this.openDelay = true;
            this.isOnScreen = true;
            scene.isPaused = true;
            this.settingsButton.visible = true;
            

            //calls the slots functions so the slots are displaying items correctly
            console.log("setSlotView");
            this.setSlotView(hud);
            console.log("setSlots");
            this.setSlots(hud);

            //sets physics to stop? this may be redundant or obsolite code
            scene.physics.pause();
            scene.player1.anims.pause();

            //set time out for delay.
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

            //sets physics to start? this may be redundant or obsolite code
            scene.physics.resume();
            scene.player1.anims.resume();

            //hides slots.
            this.setSlotView(hud);
            this.setSlots(hud);

            //set time out for delay.
            setTimeout(function(){
              console.log("openDelay set to false");
                inventoryThat.openDelay = false; 
              },1000);

        }
        
        //sets variables in bestiary to tell it that it can open.
        this.bestiaryUI.isOpen =true;
        this.bestiaryUI.openDelay = false;
        this.bestiaryUI.openBestiary(scene);

        //this.skillUI.isOpen = true;
        //this.skillUI.openDelay = false;
        //this.skillUI.openSkill(scene);

    }

    //creates the intem slots displayed in the inventory.
    generateSlots(scene){ 

      let index = 0;
      let col = 0;
      let row = 0;
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

      //weapon slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+180,this.y-120,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.weaponLabel = new inventoryLabels(scene,this.x+180,this.y-75, 'inventoryLabels');
      this.inventoryElements.add(this.weaponLabel);
      this.add(this.weaponLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);

      //increments index so that the ring slot does not over write the weapon slot in the array.
      index++;

      //ring slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+180,this.y-50,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.ringLabel = new inventoryLabels(scene,this.x+180,this.y-5,'Labels');
      this.inventoryElements.add(this.ringLabel);
      this.add(this.ringLabel);
      this.ringLabel.anims.play('ring');
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);

      index++;
      
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
      this.settingsUI = new optionsMenu(scene,this.x+425,this.y+40);
      //this.add(this.settingsUI);

      //adds settings menu button
      this.settingsButton = new settingsButton(scene,this.x+5,this.y+125,this.settingsUI);
      this.settingsButton.setupSettingsButton();
      this.add(this.settingsButton);

      


    }

    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      //sets the elements of the ivnentory to ve visible
      this.inventoryElements.toggleVisible();

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
      //nested loop to loop through all the rows and columns of the inventory slots
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
          index++;
        }
      }
      //sets the ring and weapon slot to play the correct animation
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      index++;
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);

       //loops through all slots to set the correct number 
       for(let counter = 0; counter < 26 ;counter++){
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
      for(let counter = 0; counter <= 25;counter++){
        //console.log("counter: ", counter);
        this.inventoryArray[counter].on('pointerdown', function (pointer) {activeSlot = counter;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      }
      
      this.bestiaryUI.on('pointerdown', function (pointer) {
        inventoryThat.bestiaryUI.openBestiary(scene);
        console.log("opening bestiary");
      });

      /*this.skillUI.on('pointerdown', function (pointer) {
        inventoryThat.skillUI.openSkill(scene);
        console.log("opening bestiary");
      });*/
     
    }

    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
      console.log("highlighting item, printing scene.inventoryDataArray[activeSlot]: ",scene.inventoryDataArray[activeSlot]);

          //if the current slot is not highlighted and there is no slots selected for either of the two active slots, then
          if(this.inventoryArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){

            //light up slot by setting bool to true.
            this.inventoryArray[activeSlot].isLitUp = true;
            //light up slot animation which is always item id + 1
            this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID+1;

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
              this.inventoryArray[activeSlot].isLitUp = false;
              //play default darken animation.
              this.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot].itemID;
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
              itemStackable: 1,
              itemAmount: 0 
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

           //set animation for activeSlot2
           this.inventoryArray[this.activeSlot2].isLitUp = false;
           this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
           this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
           this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);

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

            //set animation for activeSlot2
            this.inventoryArray[this.activeSlot2].isLitUp = false;
            this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
            this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);

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

            //set animation for activeSlot2
            this.inventoryArray[this.activeSlot2].isLitUp = false;
            this.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2].itemID;
            this.inventoryArray[this.activeSlot2].anims.play(''+this.inventoryArray[this.activeSlot2].animsNumber);
            this.inventoryArray[this.activeSlot2].setSlotNumber(scene.inventoryDataArray[this.activeSlot2].itemAmount);

            //clear both slots.
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }
          this.inventoryArray[activeSlot].anims.play(''+this.inventoryArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }
    
}