class sexMark extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'sexSlotSexIcon');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.7);
      
      this.anims.create({key: '0',frames: this.anims.generateFrameNames('sexSlotSexIcon', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('sexSlotSexIcon', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('sexSlotSexIcon', { start: 2, end: 2 }),frameRate: 1,repeat: -1});
      


      this.anims.play('2');
      
    }
}