//fake warp that doesnt do anything except look pretty.
class fakeWarp extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,animation){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'warpSprites');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(40,50,true);
   

        //warp sprite animations
        this.anims.create({key: 'warpCaveOutside',frames: this.anims.generateFrameNames('warpSprites', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveInside',frames: this.anims.generateFrameNames('warpSprites', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door1',frames: this.anims.generateFrameNames('warpSprites', { start: 2, end: 2}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'door2',frames: this.anims.generateFrameNames('warpSprites', { start: 3, end: 3}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveOutsideRubble',frames: this.anims.generateFrameNames('warpSprites', { start: 4, end: 4}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'warpCaveInsideRubble',frames: this.anims.generateFrameNames('warpSprites', { start: 5, end: 5}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'shadowBars',frames: this.anims.generateFrameNames('warpSprites', { start: 16, end: 19}),frameRate: 7,repeat: -1});

        this.anims.play(animation,true);

        //if we are using dark lighting
        if(scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
  
          }
        
    }


    
}