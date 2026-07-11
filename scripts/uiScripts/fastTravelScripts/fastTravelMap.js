/*
//note for fast travel map

ok so idea

1) we have different pannels for different areas

first is lockwood.

2) then we have points that can be cycled through in that pannel

3) need to check for all flags associated with that pannel.
if flag not found, then grey out point of travel.

4) need some data structure to hold that info. probably in emitter.js

5) arrows for switching between pannels.

6) close out button for exiting.

7) store flags inside flag variable place. that way we dont need new data structures.

should display name of place and glow on that point

*/
class fastTravelMap extends Phaser.GameObjects.Container{
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
      this.fastTravelMapArray = [];



      //when adding new pages, we need this variable to tell what page we are on.
      this.itemPage = 0;

      this.fastTravelMap = scene.add.sprite(0, 0, 'KukoNuiMap');
      this.fastTravelMap.anims.create({key: 'fastTravelMap',frames: this.fastTravelMap.anims.generateFrameNames('KukoNuiMap', { start: 0, end: 0 }),frameRate: 0,repeat: -1});
      this.fastTravelMap.anims.play("fastTravelMap",true);
      this.fastTravelMap.setScale();
      this.add(this.fastTravelMap);

      this.buyIndexLeft = new UIControls(scene, -370, 0, "UIControls").setInteractive();
      this.buyIndexLeft.anims.play("pointRight");
      this.buyIndexLeft.setRotation(3.14/2+3.14/2);
      this.add(this.buyIndexLeft);

      this.buyIndexRight = new UIControls(scene, 370, 0, "UIControls").setInteractive();
      this.buyIndexRight.anims.play("pointRight");
      this.add(this.buyIndexRight);

      //makes the label for the inventory
      this.mapLabel = new makeText(scene,-260,-240,'charBlack',"Lockwood");
      this.add(this.mapLabel);

      //this.buyIndexUp.visible = false;
      
      this.closingButton = new closingButton(scene,this,null,260,-260);
      this.closingButton.setupClosingButtonMap(this);
      this.add(this.closingButton);

      this.scene = scene;

      //this.inventoryElements.add(this); 
      console.log('created the fast travel map.');

    }
  
}