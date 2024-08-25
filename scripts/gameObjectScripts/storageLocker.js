//storrage object to let the player store extra items they obtain.
class storageLocker extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'storageLocker');
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
        this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: -1});
        this.anims.create({key: 'opening',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: 0});
        this.anims.create({key: 'closing',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: 0});
    
        this.anims.play('closed',true);
        
    }
}