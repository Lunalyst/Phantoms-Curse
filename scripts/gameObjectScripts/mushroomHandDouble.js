class mushroomHandDouble extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,flip){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos , 'mushroom-hands-double');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        this.flipX = flip;

        //barrie danage variables.
        this.scene = scene;

        this.visible = false;
      this.setDepth(7);
        this.anims.create({ key: 'centerHandGrabStart', frames: this.anims.generateFrameNames('mushroom-hands-double', { start: 0, end: 5 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'centerHandGrabEnd', frames: this.anims.generateFrameNames('mushroom-hands-double', { start: 6, end: 8 }), frameRate:  10, repeat: 0 });

        //if we are using dark lighting
        if(this.scene.lightingSystemActive === true){ 
          this.setPipeline('Light2D');
    
        }
    }

}