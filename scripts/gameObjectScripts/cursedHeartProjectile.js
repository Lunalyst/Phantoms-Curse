//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class cursedHeartProjectile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,savedVelocityX,enemy,direction){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'cursedHeartProjectile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);
  
      this.setDepth(50);
      this.anims.create({key: 'cursedHeartBeat',frames: this.anims.generateFrameNames('cursedHeartProjectile', { start: 0, end: 3 }),frameRate: 8,repeat: -1});
      this.anims.create({key: 'cursedHeartDestroy',frames: this.anims.generateFrameNames('cursedHeartProjectile', { start: 4, end: 6 }),frameRate: 20,repeat: 0});

      this.setScale(1/3,1/3);
      this.setSize(50,50,true);
      this.anims.play("cursedHeartBeat");
      this.savedVelocityX = savedVelocityX;

      //stores enemy refrence so the player knows which enemy to walk towards if they get hit.
      this.enemyThatSpawnedProjectile = enemy;

      //stores the direction the projectile should be floating towards
      this.direction = direction;

      this.followingPlayer = true;

      this.accelerateCoolDown = false;

      this.destroying = false;

      //if the projectile lives for two seconds, then stop following the player.
      let thisCursedHeart = this;
      setTimeout(function(){
          thisCursedHeart.followingPlayer = false;
        },1500);
      
    }


    //destroys platform after the animation is played.
    destroycursedHeartProjectile(){
      this.setVelocityX(0);
      this.setVelocityY(0);

      if(this.destroying === false){
        this.destroying = true;
        this.scene.initSoundEffect('curseSFX','curse',0.3);
        this.anims.play('cursedHeartDestroy').once('animationcomplete' , () =>{
          this.collider1.destroy();
          this.collider2.destroy();
          this.destroy();

          
        });
      }
    }
}