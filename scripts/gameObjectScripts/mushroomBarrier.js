// wood barriers that break when the player does enough damage to them.
class mushroomBarrier extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,flip,orientation){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos-24, 'mushBarrier');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
      console.log("orientation: ",orientation);
        if(orientation === 'horizontal'){

          //changes collision box size.
          this.setSize(32*11,46,true);
          this.setOffset(-120, 170);
          this.setRotation((3.14/2));
        }else{
          //changes collision box size.
          this.setSize(46,32*11,true);
          this.setOffset(45, 20);
        }
  
        this.flipX = flip;

        //barrie danage variables.
        this.scene = scene;
    

        //warp sprite animations
        this.anims.create({key: 'rise1',frames: this.anims.generateFrameNames('mushroomBarrier', { start: 0, end: 3}),frameRate: 9,repeat: 0});
        this.anims.create({key: 'rise2',frames: this.anims.generateFrameNames('mushroomBarrier', { start: 4, end: 5}),frameRate: 9,repeat: 0});
        this.anims.create({key: 'rise3',frames: this.anims.generateFrameNames('mushroomBarrier', { start: 6, end: 7}),frameRate: 9,repeat: 0});

        this.anims.create({key: 'hold',frames: this.anims.generateFrameNames('mushroomBarrier', { start: 8, end: 8}),frameRate: 9,repeat: -1});
        this.anims.create({key: 'break',frames: this.anims.generateFrameNames('mushroomBarrier', { start: 10, end: 16}),frameRate: 9,repeat: 0});
      


        //if we are using dark lighting
        if(this.scene.lightingSystemActive === true){ 
          this.setPipeline('Light2D');

          //also sets up the curse light for if the player is cursed.
          this.curseLight = this.scene.lights.addLight(this.x,this.y+50, 70, 0xb317ff);
          this.curseLight.intensity = 0.5;
          //this.curseLight.visible = false;

        }

        this.anims.play('rise1').once('animationcomplete', () => {
          this.curseLight.intensity = 0.7;
          this.curseLight.radius = 90;
          this.curseLight.y = this.y+30
          this.anims.play('rise2').once('animationcomplete', () => {
            this.curseLight.intensity = 0.7;
            this.curseLight.radius = 120;
            this.curseLight.y = this.y+10
            this.anims.play('rise3').once('animationcomplete', () => {
              this.anims.play('hold',true);
            
            });
          });
        });
        
    }

    barrierDestroy(){
      this.anims.play('break').once('animationcomplete', () => {
          this.destroy();
      });
    }

    

    
}