class textBoxProfile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'textBoxProfile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.36);
      
      this.anims.create({key: 'signLoop',frames: this.anims.generateFrameNames('textBoxProfile', { start: 0, end: 3 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'randiMad',frames: this.anims.generateFrameNames('textBoxProfile', { start: 4, end: 4 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'randiBlush',frames: this.anims.generateFrameNames('textBoxProfile', { start: 5, end: 5 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'randiSquish',frames: this.anims.generateFrameNames('textBoxProfile', { start: 6, end: 6 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'randiShocked',frames: this.anims.generateFrameNames('textBoxProfile', { start: 7, end: 7 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'randiShifty',frames: this.anims.generateFrameNames('textBoxProfile', { start: 8, end: 9 }),frameRate: 7,repeat: -1});
      this.anims.create({key: 'lunalyst',frames: this.anims.generateFrameNames('textBoxProfile', { start: 10, end: 13 }),frameRate: 4,repeat: -1});
      this.anims.play("signLoop",true);
      

      
    }
}