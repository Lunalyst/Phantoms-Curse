class inventorySlots extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'inventorySlots');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.anims.create({key: '0',frames: this.anims.generateFrameNames('inventorySlots', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('inventorySlots', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('inventorySlots', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames('inventorySlots', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames('inventorySlots', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames('inventorySlots', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '6',frames: this.anims.generateFrameNames('inventorySlots', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '7',frames: this.anims.generateFrameNames('inventorySlots', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '8',frames: this.anims.generateFrameNames('inventorySlots', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '9',frames: this.anims.generateFrameNames('inventorySlots', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '10',frames: this.anims.generateFrameNames('inventorySlots', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '11',frames: this.anims.generateFrameNames('inventorySlots', { start: 11, end: 11 }),frameRate: 10,repeat: -1});
      this.anims.play("empty");
      this.animsNumber = 0;
      this.slotId = 0;
      this.isLitUp = false;
      this.visible = false;
      //this.setScale(.6);
      // add two text numbers that show the amount of item. if you can have multiple of that item.
      

      
    }
}