// parent class of most npc entitys
class npc extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,sprite){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, sprite);

      //then we add new instance into the scene.
      scene.add.existing(this);
      //give this object a physics box.
      scene.physics.add.existing(this);
      //make it unpussable in any way. potentially unnessary.
      this.setPushable(false);
      
     //sets scale of object
     this.setScale(1/3);

  }

}