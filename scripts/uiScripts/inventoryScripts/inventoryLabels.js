class inventoryLabels extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'inventoryLabels');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.anims.create({key: 'weapon',frames: this.anims.generateFrameNames('inventoryLabels', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'ring',frames: this.anims.generateFrameNames('inventoryLabels', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'bestiary',frames: this.anims.generateFrameNames('inventoryLabels', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'skills',frames: this.anims.generateFrameNames('inventoryLabels', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.visible = false;
      this.setScale(1.5);
      

      
    }
}