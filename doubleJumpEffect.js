class doubleJumpEffect extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'doubleJumpEffect');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScale(.6);
      
      this.anims.create({key: 'doubleJumpEffectDestroy',frames: this.anims.generateFrameNames('doubleJumpEffect', { start: 0, end: 11 }),frameRate: 15,repeat: 0});
      this.destroyPlatform();
      
      
    }

    destroyPlatform(){
      this.anims.play('doubleJumpEffectDestroy').once('animationcomplete' , () =>{
        this.destroy();
      });
    }
}