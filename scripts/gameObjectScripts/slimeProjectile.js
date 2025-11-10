//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class slimeProjectile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,savedVelocityX,savedGravity){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'slimeProjectile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);
  
      this.setDepth(50);
      this.anims.create({key: 'slimeProjectileUp',frames: this.anims.generateFrameNames('slimeProjectile', { start: 0, end: 4 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'slimeProjectileDown',frames: this.anims.generateFrameNames('slimeProjectile', { start: 4, end: 6 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'slimeProjectileDestroy',frames: this.anims.generateFrameNames('slimeProjectile', { start: 7, end: 14 }),frameRate: 8,repeat: 0});
      this.setScale(1/3,1/3);
      this.setSize(50,50,true);
      this.anims.play("slimeProjectileDown");
      this.savedVelocityX = savedVelocityX;
      this.savedGravity = savedGravity;
      this.hitTheGround = false;
      
    }


    //destroys platform after the animation is played.
    destroySlimeProjectile(){
      this.anims.play('slimeProjectileDestroy').once('animationcomplete' , () =>{
        this.collider.destroy();
        this.destroy();
      });
    }
}