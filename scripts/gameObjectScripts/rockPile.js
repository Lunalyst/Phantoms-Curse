
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/

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
        this.setSize(40,96,true);

        this.scene = this;
    
        //warp sprite animations
        this.anims.create({key: 'rockPileStatic',frames: this.anims.generateFrameNames('woodBarrier', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'rockPileCrumble',frames: this.anims.generateFrameNames('woodBarrier', { start: 0, end: 5}),frameRate: 8,repeat: 0});
        this.anims.create({key: 'rockPileStaticBroken',frames: this.anims.generateFrameNames('woodBarrier', { start: 5, end: 5}),frameRate: 3.5,repeat: -1});
        
        this.anims.play('rockPileStatic',true);
        
    }

    activateRockPile(){

      this.anims.play('rockPileStatic',false).once('animationcomplete', () => { 
        this.anims.play('rockPileStaticBroken',true);
      });
    }


    
}