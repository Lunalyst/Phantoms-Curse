//is the hitbox the player uses to damage enemies.
class hitBoxes extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'hitbox');
      //then we add new instance into the scene. 
      scene.add.existing(this);
      //then we call this next line to give it collision
      scene.physics.add.existing(this);
      //now we can perform any specalized set ups for this object
      this.setSize(30,80,true);
      this.setPushable(false);
    }
}