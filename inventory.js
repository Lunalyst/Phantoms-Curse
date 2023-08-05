
/*https://phaser.io/examples/v3/view/input/mouse/click-sprite*/
let inventoryThat;
class inventory extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'inventory');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('inventory', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'open',frames: this.anims.generateFrameNames('inventory', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.play("closed");

      this.setDepth(20);
      this.setScale(.8);
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.isOpen = false;
      this.openDelay = false;
      inventoryThat = this;
      this.index = 0;
      this.isOnScreen = false;
      this.activeSlot1 = -1;
      this.activeSlot2 = -2;
      
    }
    // function opens the inventory. has a delay so that the player cant quickly open the inventory
    setView(scene){
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;
            this.anims.play("open");
            this.openDelay = true;
            this.isOnScreen = true;
            this.setSlotView(scene);
            this.setSlots(scene);
            setTimeout(function(){
                inventoryThat.openDelay = false; 
              },1000);

        }else if(this.isOpen === true && this.openDelay === false){
            this.isOpen = false;
            this.anims.play("closed");
            this.openDelay = true;
            this.isOnScreen = false;
            this.setSlotView(scene);
            this.setSlots(scene);
            setTimeout(function(){
                inventoryThat.openDelay = false; 
              },1000);

        }

    }
    //creates the intem slots displayed in the inventory.
    generateSlots(scene){ 
      let index = 0;
      let col = 0;
      let row = 0;
      for(col = 0; col < 5; col++){
        for(row = 0; row < 8; row++){
          console.log("generating inventory slot: "+index+" 450 + (row*10): "+(row * 10)+" (col*10): "+(col * 10) );
          scene.inventoryArray[index] = new inventorySlots(scene,230 + (row*40), 300+(col*40),'inventorySlots').setInteractive();
          console.log("this.inventoryArray: "+scene.inventoryArray[index]);
          index++;
          
        }
      }
      scene.inventoryArray[index] = new inventorySlots(scene,230 + (row+8*40), 300+(4*40),'inventorySlots').setInteractive();
      index++;
      scene.inventoryArray[index] = new inventorySlots(scene,230 + (row+9*40), 300+(4*40),'inventorySlots').setInteractive();
    }
    // controls if the inventory slots are viewable. makes them invisable if inventory is closed.
    setSlotView(scene){
      let index = 0;
      for(let col = 0; col < 5; col++){
        for(let row = 0; row < 8; row++){
          scene.inventoryArray[index].visible = this.isOnScreen;
          index++;
        }
      }
      scene.inventoryArray[index].visible = this.isOnScreen;
          index++;
      scene.inventoryArray[index].visible = this.isOnScreen;

    }
    // applies the correct animation to the inventory slot based on the inventory data
    setSlots(scene){
      let index = 0;
      for(let col = 0; col < 5; col++){
        for(let row = 0; row < 8; row++){
          scene.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index]);
          index++;
        }
      }
      scene.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index]);
          index++;
          scene.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index]);
    }
    
    //applies interactive click events on all inventory slots
    applyInteractionToSlots(scene){
      let activeSlot = 0;
      scene.inventoryArray[0].on('pointerdown', function (pointer) {activeSlot = 0;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[1].on('pointerdown', function (pointer) {activeSlot = 1;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[2].on('pointerdown', function (pointer) {activeSlot = 2;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[3].on('pointerdown', function (pointer) {activeSlot = 3;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[4].on('pointerdown', function (pointer) {activeSlot = 4;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[5].on('pointerdown', function (pointer) {activeSlot = 5;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[6].on('pointerdown', function (pointer) {activeSlot = 6;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[7].on('pointerdown', function (pointer) {activeSlot = 7;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[8].on('pointerdown', function (pointer) {activeSlot = 8;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[9].on('pointerdown', function (pointer) {activeSlot = 9;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[10].on('pointerdown', function (pointer) {activeSlot = 10;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[11].on('pointerdown', function (pointer) {activeSlot = 11;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[12].on('pointerdown', function (pointer) {activeSlot = 12;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[13].on('pointerdown', function (pointer) {activeSlot = 13;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[14].on('pointerdown', function (pointer) {activeSlot = 14;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[15].on('pointerdown', function (pointer) {activeSlot = 15;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[16].on('pointerdown', function (pointer) {activeSlot = 16;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[17].on('pointerdown', function (pointer) {activeSlot = 17;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[18].on('pointerdown', function (pointer) {activeSlot = 18;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[19].on('pointerdown', function (pointer) {activeSlot = 19;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[20].on('pointerdown', function (pointer) {activeSlot = 20;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[21].on('pointerdown', function (pointer) {activeSlot = 21;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[22].on('pointerdown', function (pointer) {activeSlot = 22;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[23].on('pointerdown', function (pointer) {activeSlot = 23;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[24].on('pointerdown', function (pointer) {activeSlot = 24;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[25].on('pointerdown', function (pointer) {activeSlot = 25;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[26].on('pointerdown', function (pointer) {activeSlot = 26;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[27].on('pointerdown', function (pointer) {activeSlot = 27;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[28].on('pointerdown', function (pointer) {activeSlot = 28;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[29].on('pointerdown', function (pointer) {activeSlot = 29;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[30].on('pointerdown', function (pointer) {activeSlot = 30;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[31].on('pointerdown', function (pointer) {activeSlot = 31;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[32].on('pointerdown', function (pointer) {activeSlot = 32;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[33].on('pointerdown', function (pointer) {activeSlot = 33;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[34].on('pointerdown', function (pointer) {activeSlot = 34;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[35].on('pointerdown', function (pointer) {activeSlot = 35;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[36].on('pointerdown', function (pointer) {activeSlot = 36;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[37].on('pointerdown', function (pointer) {activeSlot = 37;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[38].on('pointerdown', function (pointer) {activeSlot = 38;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[39].on('pointerdown', function (pointer) {activeSlot = 39;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[40].on('pointerdown', function (pointer) {activeSlot = 40;scene.playerInventory.lightUpSlot(scene,activeSlot);});
      scene.inventoryArray[41].on('pointerdown', function (pointer) {activeSlot = 41;scene.playerInventory.lightUpSlot(scene,activeSlot);});
     
    }
    //is called when click event on a slot to handle what happens. if one is selected then highlight slot. if two then switch items.
    lightUpSlot(scene,activeSlot){
          if(scene.inventoryArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){
            scene.inventoryArray[activeSlot].isLitUp = true;
              scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot]+1;
            if(this.activeSlot1 === -1 && this.activeSlot1 != activeSlot && activeSlot != this.activeSlot2){
              this.activeSlot1 = activeSlot;
            }else if(this.activeSlot2 === -2 && this.activeSlot2 != activeSlot && activeSlot != this.activeSlot1){
              this.activeSlot2 = activeSlot;
            }else if(activeSlot === this.activeSlot1){
              scene.inventoryArray[activeSlot].isLitUp = false;
              scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot];
              this.activeSlot1 = -1;
            }
            
          }else if(scene.inventoryArray[activeSlot].isLitUp === true && this.activeSlot1 != -1 || this.activeSlot2 != -2){
            scene.inventoryArray[activeSlot].isLitUp = false;
            scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot];
            if(this.activeSlot1 != -1 && activeSlot === this.activeSlot1){
              this.activeSlot1 = -1;
            }else if(this.activeSlot2 != -2 && activeSlot === this.activeSlot2){
              this.activeSlot2 = -2;
            }

          }
          if(this.activeSlot1 != -1 && this.activeSlot2 != -2){
            let temp = 0;
            temp = scene.inventoryDataArray[this.activeSlot1];
            scene.inventoryDataArray[this.activeSlot1] = scene.inventoryDataArray[this.activeSlot2];
            scene.inventoryDataArray[this.activeSlot2] = temp;
            scene.inventoryArray[this.activeSlot1].isLitUp = false;
            scene.inventoryArray[this.activeSlot1].animsNumber = scene.inventoryDataArray[this.activeSlot1];
            scene.inventoryArray[this.activeSlot1].anims.play(''+scene.inventoryArray[this.activeSlot1].animsNumber);
            scene.inventoryArray[this.activeSlot2].isLitUp = false;
            scene.inventoryArray[this.activeSlot2].animsNumber = scene.inventoryDataArray[this.activeSlot2];
            scene.inventoryArray[this.activeSlot2].anims.play(''+scene.inventoryArray[this.activeSlot2].animsNumber);
            this.activeSlot1 = -1;
            this.activeSlot2 = -2;
          }
          scene.inventoryArray[activeSlot].anims.play(''+scene.inventoryArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }
    
}