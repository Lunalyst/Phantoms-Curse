
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

    setView(scene){
        if(this.isOpen === false && this.openDelay === false){
            this.isOpen = true;
            this.anims.play("open");
            this.openDelay = true;
            this.isOnScreen = true;
            this.setSlotView(scene);
            this.setSlots(scene);
            //this.swapItems(scene);
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
  
    generateSlots(scene){ 
      let index = 0;
      for(let col = 0; col < 5; col++){
        for(let row = 0; row < 8; row++){
          console.log("generating inventory slot: "+index+" 450 + (row*10): "+row * 10+" (col*10): "+(col * 10) );
          scene.inventoryArray[index] = new inventorySlots(scene,230 + (row*40), 300+(col*40),'inventorySlots').setInteractive();
          console.log("this.inventoryArray: "+scene.inventoryArray[index]);
          index++;
          
        }
      }
    }

    setSlotView(scene){
      let index = 0;
      for(let col = 0; col < 5; col++){
        for(let row = 0; row < 8; row++){
          scene.inventoryArray[index].visible = this.isOnScreen;
          index++;
        }
      }
    }

    setSlots(scene){
      let index = 0;
      for(let col = 0; col < 5; col++){
        for(let row = 0; row < 8; row++){
          scene.inventoryArray[index].anims.play(""+scene.inventoryDataArray[index]);
          index++;
        }
      }
    }

    swapItems(scene){
      let index = 0;
      let that = scene;
      for(let col = 0; col < 4; col++){
        for(let row = 0; row < 4; row++){
          scene.inventoryArray[index].on('pointerdown', function (pointer) {
            console.log("detecting click on inventory slot.");
            scene.inventoryArray[index].anims.play(index+1);
            /*that.newGame.anims.play("newActive");
            that.allFunctions.saveGame(1650,542,6);
            that.scene.start('forestHome');*/
    
        });  
          index++;
        }
      }

    }

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
     
    }

    lightUpSlot(scene,activeSlot){
          if(scene.inventoryArray[activeSlot].isLitUp === false && this.activeSlot1 === -1 || this.activeSlot2 === -2){
            console.log("potentially activating slot");
            scene.inventoryArray[activeSlot].isLitUp = true;
              scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot]+1;
            if(this.activeSlot1 === -1 && this.activeSlot1 != activeSlot && activeSlot != this.activeSlot2){
              console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
              console.log("activating slot 1");
              this.activeSlot1 = activeSlot;
            }else if(this.activeSlot2 === -2 && this.activeSlot2 != activeSlot && activeSlot != this.activeSlot1){
              console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
              console.log("activating slot 2");
              this.activeSlot2 = activeSlot;
            }else if(activeSlot === this.activeSlot1){
              console.log("clearing lockup");
              scene.inventoryArray[activeSlot].isLitUp = false;
              scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot];
              this.activeSlot1 = -1;
            }
            
          }else if(scene.inventoryArray[activeSlot].isLitUp === true && this.activeSlot1 != -1 || this.activeSlot2 != -2){
            console.log("potentially deactivating slot");
            scene.inventoryArray[activeSlot].isLitUp = false;
            scene.inventoryArray[activeSlot].animsNumber = scene.inventoryDataArray[activeSlot];
            if(this.activeSlot1 != -1 && activeSlot === this.activeSlot1){
              this.activeSlot1 = -1;
              console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
              console.log("deactivating slot 1");
            }else if(this.activeSlot2 != -2 && activeSlot === this.activeSlot2){
              this.activeSlot2 = -2;
              console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
              console.log("deactivating slot 2");
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
            console.log("swapped items");
            console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
          }
          scene.inventoryArray[activeSlot].anims.play(''+scene.inventoryArray[activeSlot].animsNumber);
          //console.log("detecting click on inventory slot: "+ activeSlot +" this.activeSlot1: "+ this.activeSlot1 +" this.activeSlot2: "+this.activeSlot2);
    }
    
}