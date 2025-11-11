//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class sporeCloud extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,direction){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'sporeCloud');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);

      //then we call this next line to give it collision
      scene.physics.add.existing(this);
  
      this.setDepth(50);
      this.anims.create({key: 'SporePoof',frames: this.anims.generateFrameNames('sporeCloud', { start: 0, end: 3 }),frameRate: 8,repeat: 0});
      this.anims.create({key: 'SporeLinger',frames: this.anims.generateFrameNames('sporeCloud', { start: 4, end: 12 }),frameRate: 8,repeat: -1});

      this.setScale(1/2,1/2);
      this.setSize(100,100,true);
      //roll a random number from 1 - 3
      let rand1 = Math.floor(Math.random() * 3) + 1;
      //then a random number from 1 - 7
      //let rand2 = Math.floor(Math.random() * 4) + 3;
      //apply random dust cloud sound to random audio sprite within our range.
      this.scene.initSoundEffect('sporeCloudSFX'+rand1,'4',0.3);

      this.anims.play('SporePoof').once('animationcomplete' , () =>{
        this.anims.play("SporeLinger",true);
      });

      this.destroying = false;

      this.followingPlayer = true;

      this.direction = direction;

      this.accelerateCoolDown = false;
     
     

      //if the projectile lives for two seconds, then stop following the player.
      let tempSporeCloud = this;
      setTimeout(function(){
        tempSporeCloud.followingPlayer = false;
        tempSporeCloud.destroysporeCloud();
      },1500);
      
    }


    //destroys platform after the animation is played.
    destroysporeCloud(){

      if(this.destroying === false){
        this.destroying = true;
        this.colliderRefrence.destroy();
        this.destroy();

      }
    }
}