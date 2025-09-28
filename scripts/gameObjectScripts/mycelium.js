//once the player has the double jump skill, they create this platform under them as a visual effect to show they jumped off something during the double jump.
class mycelium extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'mycelium');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(0);
      this.setScale(1/3);
      this.anims.create({key: 'myceliumDestroy',frames: this.anims.generateFrameNames('mycelium', { start: 0, end: 7 }),frameRate: 15,repeat: 0});
      this.destroyMycelium(); 
       if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
       }
    }

    //destroys platform after the animation is played.
    destroyMycelium(){
      this.anims.play('myceliumDestroy').once('animationcomplete' , () =>{
        this.destroy();
      });
    }
}