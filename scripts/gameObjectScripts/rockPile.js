//rockpile entity which falls over when the player walks over it.
class rockPile extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'rockPile');
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
        this.anims.create({key: 'rockPileStatic',frames: this.anims.generateFrameNames('rockPile', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'rockPileCrumble',frames: this.anims.generateFrameNames('rockPile', { start: 0, end: 5}),frameRate: 14,repeat: 0});
        this.anims.create({key: 'rockPileStaticBroken',frames: this.anims.generateFrameNames('rockPile', { start: 5, end: 5}),frameRate: 3.5,repeat: -1});
        
        this.anims.play('rockPileStatic',true);
        
    }

    // function to activate the rock pile, is called when player steps in the rocks range.
    activateRockPile(){
      if(this.isActivated === false){
        this.isActivated = true;
        this.scene.initSoundEffect('rubbleSFX','1',0.05);
        this.anims.play('rockPileCrumble',false).once('animationcomplete', () => { 
          this.anims.play('rockPileStaticBroken',true);
        });
      }
      
    }
  
}