// wood barriers that break when the player does enough damage to them.
class woodBarrier extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'woodBarrier');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(70,506,true);

        //barrie danage variables.
        this.hp = 50;
        this.hitboxOverlaps = false;
        this.damageCoolDown = false;
        this.soundEffectcooldown = false;
        this.scene = scene;
    

        //warp sprite animations
        this.anims.create({key: 'barrierFull',frames: this.anims.generateFrameNames('woodBarrier', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'barrierDamaged1',frames: this.anims.generateFrameNames('woodBarrier', { start: 1, end: 1}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'barrierDamaged2',frames: this.anims.generateFrameNames('woodBarrier', { start: 2, end: 2}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'barrierDamaged3',frames: this.anims.generateFrameNames('woodBarrier', { start: 3, end: 3}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'barrierBroken',frames: this.anims.generateFrameNames('woodBarrier', { start: 4, end: 4}),frameRate: 3.5,repeat: -1});
        
        this.anims.play('barrierFull',true);
        
    }

    //function for damaging barrier
    damage() {

        //damage cooldown to keep damage from occuring too quickly.
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            
            //if the barriers hp is not zero
            if (this.hp > 0) {
                
                this.calcDamage(
                    this.scene.player1.sliceDamage,
                    this.scene.player1.bluntDamage,
                    this.scene.player1.pierceDamage,
                    this.scene.player1.heatDamage,
                    this.scene.player1.lightningDamage,
                    this.scene.player1.coldDamage
                );

                //sound effect hit cooldown
                if(this.soundEffectcooldown === false){
                    this.soundEffectcooldown = true;
                    let tempBarrier = this;
                    this.scene.initSoundEffect('woodBarrierSFX','woodHit',0.5);
                    setTimeout(function () {
                        tempBarrier.soundEffectcooldown = false;
                    }, 400);
                }
               
                // logic for changing the animation as the barrier gets more damage.
                if (this.hp <= 0) {
                    this.anims.play('barrierBroken',true);
                    this.setSize(10,10,true);
                    this.setOffset(0, 300);
                    this.scene.initSoundEffect('woodBarrierSFX','woodBreak',0.1);

                }else if(this.hp <= 20){
                    this.anims.play('barrierDamaged3',true);
                }else if(this.hp <= 30){
                    this.anims.play('barrierDamaged2',true);
                }else if(this.hp <= 40){
                    this.anims.play('barrierDamaged1',true);
                }
                
            }
            let that = this;
            
            //resets the damage cooldown for this object.
            setTimeout(function () {
                that.damageCoolDown = false;
                that.clearTint();
            }, 600);
        }
    }
    
    //function controling damage weakinesses and resistances for this object.
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
      console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
      if (slice > 0) {
        this.hp -= (slice - 2);
      }
      if (blunt > 0) {
        this.hp -= (blunt/2 - 2);
      }
      if (pierce > 0) {
        this.hp -= (pierce - 3);
      }
      if (heat > 0) {
        this.hp -= (heat * 4);
      }
      if (lightning > 0) {
        this.hp -= (lightning / 2);
      }
      if (cold > 0) {
        this.hp -= (cold / 2);
      }
  }

    
}