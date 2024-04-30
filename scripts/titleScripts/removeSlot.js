class removeSlot extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'removeSlots');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.7);
      this.setInteractive();
      this.scene = scene;
      

      
      
    }

    setupRemoveSlot(number){

      let that = this;

      this.on('pointerdown', function (pointer) {
        that.activateTrashCan(number);
     });

    }

    activateTrashCan(slot){
      this.scene.isInSlotSelectLoad = false;
      this.scene.isInDelete = true;
      this.scene.saveslot1.visible = false;
      this.scene.trashCan1.visible = false;
      this.scene.saveslot1.showSlot();
      this.scene.saveslot2.visible = false;
      this.scene.trashCan2.visible = false;
      this.scene.saveslot2.showSlot();
      this.scene.saveslot3.visible = false;
      this.scene.trashCan3.visible = false;
      this.scene.saveslot3.showSlot();
      this.scene.selectedSlotToBeDeleted = slot;
      this.scene.yes.visible = true;
      this.scene.no.visible = true;
      

          this.scene.sceneTextBox.activateTitleScreenTextbox(
              this.scene,//scene
              this.scene.keyW,//keyW input
              true,// is the text box visible?
              ["lunalyst"],// sets profile array
              "are you sure you want to delete save slot: "+ slot +"?"//text sent to the text box.
              );

      
      
      }
}