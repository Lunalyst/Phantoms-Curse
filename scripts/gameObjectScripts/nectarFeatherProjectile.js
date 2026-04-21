//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class nectarProjectile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,savedVelocityX,savedGravity,rotation){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'nectarProjectile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);
  
      this.setDepth(50);
      this.setScale(1/3,1/3);
      this.setSize(50,50,true);
      this.savedVelocityX = savedVelocityX;
      this.savedGravity = savedGravity;
      this.hitTheGround = false;
      this.setRotation(rotation); 
      this.setDepth(7);
      
    }


    //destroys platform after the animation is played.
    destroyNectarProjectile(){
      
      this.collider.destroy();
      let temp = this;
      this.scene.tweens.add({
          targets: this,
          duration: 1000,
          alpha: { from: 1, to: 0 },
          ease: 'Sine.InOut',
          repeat: 0,
          onComplete: function (tween, targets) {
            temp.destroy();
          },
      });
      
      //this.anims.play('nectarProjectileDestroy').once('animationcomplete' , () =>{
      //});
    }
}