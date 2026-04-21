//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class nectarClawProjectile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,savedVelocityX,savedGravity,flip){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'nectarClawProjectile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);

      this.anims.create({key: 'clawSwipeIdle',frames: this.anims.generateFrameNames('nectarClawProjectile', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'clawSwipeExpStart',frames: this.anims.generateFrameNames('nectarClawProjectile', { start: 4, end: 6 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'clawSwipeExpMiddle',frames: this.anims.generateFrameNames('nectarClawProjectile', { start: 7, end: 8 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'clawSwipeExpEnd',frames: this.anims.generateFrameNames('nectarClawProjectile', { start: 9, end: 9 }),frameRate: 8,repeat: 0});
      
  
      this.setDepth(50);
      this.setScale(1/3,1/3);
      this.setSize(50,50,true);
      this.savedVelocityX = savedVelocityX;
      this.savedGravity = savedGravity;
      this.hitTheGround = false;
      this.setDepth(7);

      this.flipX = flip;

      this.explosionDamagedPlayer = false;

      this.anims.play('clawSwipeIdle');
      
    }


    //destroys platform after the animation is played.
    destroyNectarProjectile(){
      let temp = this;

      setTimeout(function(){
        temp.anims.play('clawSwipeExpStart').once('animationcomplete' , () =>{
            temp.exploding = true;
            temp.setSize(200,200,true);
            temp.anims.play('clawSwipeExpMiddle').once('animationcomplete' , () =>{
              this.exploding = false;
              temp.anims.play('clawSwipeExpEnd').once('animationcomplete' , () =>{
                temp.collider.destroy();
                temp.destroy();
              }); 
            }); 
        }); 
        
      },2000);
     
      
      
    }
}