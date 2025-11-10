// wood barriers that break when the player does enough damage to them.
class mushroomHandSingle extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,flip){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos , 'mushroom-hands-single');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        this.flipX = flip;

        //barrie danage variables.
        this.scene = scene;

        this.visible = false;
    
        this.anims.create({ key: 'rise1', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 0, end: 1 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'rise2', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 2, end: 2 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'rise3', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 3, end: 3 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 4, end: 7 }), frameRate:  10, repeat: -1 });
  

        //if we are using dark lighting
        if(this.scene.lightingSystemActive === true){ 
          this.setPipeline('Light2D');
          this.curseLight = this.scene.lights.addLight(this.x, this.y, 70, 0xb317ff);
          this.curseLight.visible = false;

        }
        
    }

    handRise(){
      this.visible = true;
      this.curseLight.visible = true;
      this.anims.play('rise1').once('animationcomplete', () => {
          this.curseLight.intensity = 0.7;
          this.curseLight.radius = 90;
          this.curseLight.y = this.y+30
          this.anims.play('rise2').once('animationcomplete', () => {
            this.curseLight.intensity = 0.7;
            this.curseLight.radius = 120;
            this.curseLight.y = this.y+10
            this.anims.play('rise3').once('animationcomplete', () => {
              this.anims.play('idle',true);
            
            });
          });
        });
    }

    barrierDestroy(){
      this.anims.play('rise').once('animationcomplete', () => {
          this.destroy();
      });
    }

    

    
}