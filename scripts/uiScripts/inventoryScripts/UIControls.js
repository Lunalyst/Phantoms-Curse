class UIControls extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'UIControls');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      this.anims.create({key: 'pointLeft',frames: this.anims.generateFrameNames('UIControls', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'pointRight',frames: this.anims.generateFrameNames('UIControls', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: 'closeBox',frames: this.anims.generateFrameNames('UIControls', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.play("pointLeft");
      this.setDepth(70);
      //this.setScale(.8);
      //connects the sprite to the camera so that it sticks with the player.
      this.setScrollFactor(0);
      //this.openDelay = false;
      this.index = 0;
      
    }

    
}