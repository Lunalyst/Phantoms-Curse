class healthMark extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'healthSlotIcon');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.7);
      
      this.anims.create({key: '0',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 2, end: 2 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 3, end: 3 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 4, end: 4 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 5, end: 5 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '6',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 6, end: 6 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '7',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 7, end: 7 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '8',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 8, end: 8 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '9',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 9, end: 9 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '10',frames: this.anims.generateFrameNames('healthSlotIcon', { start: 10, end: 10 }),frameRate: 1,repeat: -1});
      


      //this.anims.play('2');
      
    }
}


// we can create an object that functions like an enum. where we can create a object full of data that is attached to a dataset that is 
const HealthFrameEnum = {
  HEALTH1:"6",


};
