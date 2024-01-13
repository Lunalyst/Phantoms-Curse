
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

      this.isOpen = false;
      this.openDelay = false;
      inventoryThat = this;
      this.index = 0;
      this.isOnScreen = false;
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;
      this.weaponLabel;
      this.ringLabel;
      this.bestiaryLabel;
      this.skillLabel;
      this.inventoryBorder;
    

      this.inventoryInterior = scene.add.sprite(this.x, this.y, 'inventory');
      this.inventoryInterior.setScale(1/2);
      this.inventoryInterior.anims.create({key: 'closed',frames: this.inventoryInterior.anims.generateFrameNames('inventory', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.inventoryInterior.anims.create({key: 'open',frames: this.inventoryInterior.anims.generateFrameNames('inventory', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.inventoryInterior.anims.play("closed");
      this.add(this.inventoryInterior);

      this.bestiaryUI;
      this.skillUI;
      this.inventoryElements = new Phaser.GameObjects.Group(scene); 

      this.inventoryArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
      this.InventorySlotsNumbers = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
      //this.inventoryElements.add(this); 
      console.log('created the inevntory in the for the player');
      
      
      
    }
    // function opens the inventory. has a delay so that the player cant quickly open the inventory
    setView(scene,hud){
      //console.log("this.isOpen " + this.isOpen +" this.openDelay " + this.openDelay);
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;
            this.inventoryInterior.anims.play("open");
            this.openDelay = true;
            this.isOnScreen = true;
            console.log("setSlotView");
            this.setSlotView(hud);
            console.log("setSlots");
            this.setSlots(hud);
            console.log("calling delay");
            scene.isPaused = true;
            scene.physics.pause();
            scene.player1.anims.pause();
            setTimeout(function(){
              console.log("open delay set to false");
                inventoryThat.openDelay = false; 
              },1000);

        }else if(this.isOpen === true && this.openDelay === false){
            this.isOpen = false;
            this.inventoryInterior.anims.play("closed");
            this.openDelay = true;
            this.isOnScreen = false;
            scene.isPaused = false;
            scene.physics.resume();
            scene.player1.anims.resume();
            this.setSlotView(hud);
            this.setSlots(hud);
            setTimeout(function(){
              console.log("openDelay set to false");
                inventoryThat.openDelay = false; 
              },1000);

        }
        //scene.bestiaryExit.visible = false;
        this.bestiaryUI.isOpen =true;
        this.bestiaryUI.openDelay = false;
        this.bestiaryUI.openBestiary(scene);

        this.skillUI.isOpen = true;
        this.skillUI.openDelay = false;
        this.skillUI.openSkill(scene);

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
          this.inventoryArray[index] = new inventorySlots(scene,(this.x-200) + (row*60), (this.y-165) +(col*60),'inventorySlots').setInteractive();
          //adds the object to this container.
          this.add(this.inventoryArray[index]);
          //adds this to a group to set sprite visibility.
          this.inventoryElements.add(this.inventoryArray[index]);

          console.log("this.inventoryArray[index].x: ",this.inventoryArray[index].x," this.inventoryArray[index].y: ",this.inventoryArray[index].y);
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
      this.bestiaryUI = new bestiary(scene,this.x-125,this.y+180,'bestiary').setInteractive(scene.input.makePixelPerfect());
      this.inventoryElements.add(this.bestiaryUI);
      this.add(this.bestiaryUI);

      this.bestiaryLabel = new inventoryLabels(scene,this.x-195,this.y+110,'Labels');
      this.inventoryElements.add(this.bestiaryLabel);
      this.add(this.bestiaryLabel);
      this.bestiaryLabel.anims.play('bestiary');
      this.bestiaryUI.visible = this.isOnScreen;
      this.bestiaryUI.applyUIControlElements();

       //sets up skills and its label     
      this.skillUI = new skills(scene,this.x-125,this.y+230,'skill').setInteractive(scene.input.makePixelPerfect());
      this.inventoryElements.add(this.skillUI); 
      this.add(this.skillUI);
      this.skillLabel = new inventoryLabels(scene,65,560,'Labels');
      this.inventoryElements.add(this.skillLabel); 
      this.add(this.skillLabel);
      this.skillLabel.anims.play('skills');     
      this.skillLabel.visible = this.isOnScreen;      
      this.skillUI.visible = this.isOnScreen;
      this.skillUI.applyUIControlElements();

      //weapon slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+180,this.y-160,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.weaponLabel = new inventoryLabels(scene,this.x+180,this.y-115, 'inventoryLabels');
      this.inventoryElements.add(this.weaponLabel);
      this.add(this.weaponLabel);
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);

      //increments index so that the ring slot does not over write the weapon slot in the array.
      index++;

      //ring slot and its label setup
      this.inventoryArray[index] = new inventorySlots(scene,this.x+180,this.y-90,'inventorySlots').setInteractive();
      this.inventoryElements.add(this.inventoryArray[index]);
      this.add(this.inventoryArray[index]);
      this.ringLabel = new inventoryLabels(scene,this.x+180,this.y-45,'Labels');
      this.inventoryElements.add(this.ringLabel);
      this.add(this.ringLabel);
      this.ringLabel.anims.play('ring');
      this.inventoryElements.add(this.inventoryArray[index].number1);
      this.add(this.inventoryArray[index].number1);
      this.inventoryElements.add(this.inventoryArray[index].number2);
      this.add(this.inventoryArray[index].number2);


      //creates boarder which is not translucent
      this.inventoryBorder = new inventoryBorder(scene,this.x,this.y,'inventoryBorder');
      this.inventoryBorder.setScale(1/2);
      this.inventoryElements.add(this.inventoryBorder);
      this.add(this.inventoryBorder);

     
      
      this.shellIcon = new shellMark(scene,this.x-120,this.y+80);
      this.shellIcon.setScale(.6);
      this.inventoryElements.add(this.shellIcon);
      this.add(this.shellIcon);
      let startingX = 25;
      let startingY = 0;
      let spacing = 0;

  
      this.shellLetters = [];
      let shellString = "000";
      for (let counter = 0; counter < shellString.length; counter++) {
        this.shellLetters.push(new textBoxCharacter(scene, this.shellIcon.x + startingX, this.shellIcon.y + startingY));
        this.inventoryElements.add(this.shellLetters[counter]);
        this.add(this.shellLetters[counter]);
        this.shellLetters[counter].setScale(.4);
        this.shellLetters[counter].anims.play(shellString.charAt(counter));
        this.shellLetters[counter].x = this.shellLetters[counter].x + spacing;
        this.shellLetters[counter].y = this.shellLetters[counter].y ;
        spacing = spacing + 13;
  
      }

      //this.testCharacter = new textBoxCharacter(scene,455,200);
      //this.testCharacter.anims.play(shellString.charAt(0));


    }
    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      this.inventoryElements.toggleVisible();

      console.log("scene.inventoryDataArray: ", scene.inventoryDataArray)

      for(let counter = 0; counter < 26 ;counter++){
        this.inventoryArray[counter].number1.visible = this.isOnScreen;
        this.inventoryArray[counter].number2.visible = this.isOnScreen;

        //console.log("counter: ",counter,"scene.inventoryDataArray[counter].itemAmount: ",scene.inventoryDataArray[counter].itemAmount);

       // console.log("this.inventoryElements.visible", this.isOnScreen);
        if(this.isOnScreen === true){
          this.inventoryArray[counter].setSlotNumber(scene.inventoryDataArray[counter].itemAmount);
        }
        

      }
      
        
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
      let index = 0;
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 6; row++){
          this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
          index++;
        }
      }
      this.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index].itemID);
      index++;
      
    }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      let activeSlot = 0;
      this.inventoryArray[0].on('pointerdown', function (pointer) {activeSlot = 0;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[1].on('pointerdown', function (pointer) {activeSlot = 1;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[2].on('pointerdown', function (pointer) {activeSlot = 2;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[3].on('pointerdown', function (pointer) {activeSlot = 3;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[4].on('pointerdown', function (pointer) {activeSlot = 4;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[5].on('pointerdown', function (pointer) {activeSlot = 5;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[6].on('pointerdown', function (pointer) {activeSlot = 6;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[7].on('pointerdown', function (pointer) {activeSlot = 7;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[8].on('pointerdown', function (pointer) {activeSlot = 8;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[9].on('pointerdown', function (pointer) {activeSlot = 9;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[10].on('pointerdown', function (pointer) {activeSlot = 10;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[11].on('pointerdown', function (pointer) {activeSlot = 11;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[12].on('pointerdown', function (pointer) {activeSlot = 12;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[13].on('pointerdown', function (pointer) {activeSlot = 13;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[14].on('pointerdown', function (pointer) {activeSlot = 14;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[15].on('pointerdown', function (pointer) {activeSlot = 15;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[16].on('pointerdown', function (pointer) {activeSlot = 16;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[17].on('pointerdown', function (pointer) {activeSlot = 17;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[18].on('pointerdown', function (pointer) {activeSlot = 18;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[19].on('pointerdown', function (pointer) {activeSlot = 19;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[20].on('pointerdown', function (pointer) {activeSlot = 20;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[21].on('pointerdown', function (pointer) {activeSlot = 21;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[22].on('pointerdown', function (pointer) {activeSlot = 22;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[23].on('pointerdown', function (pointer) {activeSlot = 23;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[24].on('pointerdown', function (pointer) {activeSlot = 24;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      this.inventoryArray[25].on('pointerdown', function (pointer) {activeSlot = 25;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      
      this.bestiaryUI.on('pointerdown', function (pointer) {
        inventoryThat.bestiaryUI.openBestiary(scene);
        console.log("opening bestiary");
      });

      this.skillUI.on('pointerdown', function (pointer) {
        inventoryThat.skillUI.openSkill(scene);
        console.log("opening bestiary");
      });
     
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

          //if both slots are defined then switch the two items.
          if(this.activeSlot1 !== -1 && this.activeSlot2 !== -2){

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