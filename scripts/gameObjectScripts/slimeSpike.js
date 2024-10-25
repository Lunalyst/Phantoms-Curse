//rockpile entity which falls over when the player walks over it.
class slimeSpike extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'slimeSpike');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(40,40,true);

        this.scene = scene;

        this.isActivated = false;
    
        //warp sprite animations
        this.anims.create({key: 'slimeSpikeStatic',frames: this.anims.generateFrameNames('slimeSpike', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'slimeSpikeDrip1',frames: this.anims.generateFrameNames('slimeSpike', { start: 0, end: 3}),frameRate: 7,repeat: 0});
        this.anims.create({key: 'slimeSpikeDrip2',frames: this.anims.generateFrameNames('slimeSpike', { start: 4, end: 5}),frameRate: 7,repeat: 0});
        
        this.anims.play('slimeSpikeStatic',true);
        
    }

    // function to activate the slime spike when player is within its range.
    activateSlimeSpike(){
      if(this.isActivated === false){
        this.isActivated = true;

        //play slime sound
        this.scene.initSoundEffect('blueSlimeSFX','2',0.3);

        //play spike starting drip
        this.anims.play('slimeSpikeDrip1',false).once('animationcomplete', () => { 

          //once drip finishes spawn slime projectile
          this.scene.initSlimeProjectile(this.x,this.y+20);
          //then play finishing animation to static
          this.anims.play('slimeSpikeDrip2',false).once('animationcomplete', () => { 

            //then play finishing animation to static
            this.anims.play('slimeSpikeStatic',true);
            this.isActivated = false;
          });
        });
      }
      
    }
  
}