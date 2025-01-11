class buyContainer extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,shopUI, item){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      this.setDepth(20);

      this.shopUI = shopUI;

      //define fake item drop as a display for the item.
      this.buyDropDisplay = new itemDrop(this, 0, 0,item.itemID,0,1,"","","",0);
      this.add(this.dropDisplay);

      //define make text object with the items name.
      this.buyNameDisplay = new makeText(scene,30,0,'charBubble',""+item.itemName);

      //define the buy button
      //create text button which can be used to buyButtonDisplay a stack
      this.buyButtonDisplay = new makeText(this.scene,60,0,'charBubble',"BUY",true);
      this.buyButtonDisplay.addHitbox();
      this.buyButtonDisplay.clicked = false;
      this.buyButtonDisplay.setScrollFactor(0);
      this.buyButtonDisplay.setScale(.8);
      this.buyButtonDisplay.visible = false;
      this.add(this.buyButtonDisplay);

     //set up button functionality for buyButtonDisplay button
     this.buyButtonDisplay.on('pointerover',function(pointer){
         this.scene.initSoundEffect('buttonSFX1','1',0.05);
         this.buyButtonDisplay.setTextTint(0xff0000);

      },this);

      this.buyButtonDisplay.on('pointerout',function(pointer){
         this.buyButtonDisplay.clearTextTint();
         
      },this);

      this.buyButtonDisplay.on('pointerdown', function (pointer) {

        this.buyButtonDisplay.setTextTint(0xff0000);
        this.scene.initSoundEffect('buttonSFX1','2',0.05);

      },this);
    }
}