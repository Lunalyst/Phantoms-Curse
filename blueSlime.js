/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
class blueSlime extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'blueSlime');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.slimePreviousY = 0;
        this.body.setGravityY(600); // sets gravity 
        this.slimeSize = 1;
        this.moveCycleTimer = 0;
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.struggleFree = 0;
        this.grabCoolDown = 0;
       
        
        
    
        //defines player animations.
        this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('blueSlime', { start: 0, end: 4 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('blueSlime', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('blueSlime', { start: 7, end: 7 }),frameRate: 12,repeat: -1});
        this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('blueSlime', { start: 15, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak1',frames: this.anims.generateFrameNames('blueSlime', { start: 20, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak2',frames: this.anims.generateFrameNames('blueSlime', { start: 21, end: 21 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'slimeGrabBreak3',frames: this.anims.generateFrameNames('blueSlime', { start: 22, end: 22 }),frameRate: 7,repeat: -1});
    }

    moveSlime(player1){
        //console.log("moving slime, player x"+player1.x+" slime x:"+this.x+" move cycle:"+ this.moveCycle+"move cycle timer: "+this.moveCycleTimer);
        //console.log("previous slime y: "+ this.slimePreviousY+" current slime y:"+this.y);
        if(this.slimeSize === 1){
        this.setSize(30,20,true);
        this.body.setGravityY(600);
        }

        if(this.moveCycleTimer === 100){
            this.moveCycleTimer = 0;
        }

        if(player1.x > this.x-400 && player1.x < this.x+400){
            if(player1.x > this.x && this.moveCycleTimer > 80){
                if(this.slimePreviousY > this.y){
                    this.anims.play('slimeJumpUp',true);
                }else if(this.slimePreviousY <= this.y){
                    this.anims.play('slimeJumpDown',true);
                }else{
                    this.anims.play('slimeIdle',true);    
                }
                this.setVelocityX(150);
                this.setVelocityY(-160);
            }else if(player1.x < this.x && this.moveCycleTimer > 80){
                if(this.slimePreviousY > this.y){
                    this.anims.play('slimeJumpUp',true);
                }else if(this.slimePreviousY <= this.y){
                    this.anims.play('slimeJumpDown',true);
                }else{
                    this.anims.play('slimeIdle',true);    
                }
                this.setVelocityX(-150);
                this.setVelocityY(-160);
            }else if(this.moveCycleTimer > 30 && this.moveCycleTimer < 32){
                this.anims.play('slimeIdle',true); 
                this.setVelocityX(0);
                
            }

        }else{
            this.anims.play('slimeIdle',true);
            //console.log("slime idoling");
        }

        if(this.moveCycleTimer <= 100){
            this.moveCycleTimer++;
        }
        this.slimePreviousY = this.y;
    }

    moveSlimeIdle(){
    this.anims.play('slimeIdle',true); 
    this.setSize(30,20,true);
    this.body.setGravityY(600);
    this.setVelocityX(0);
    }

    slimeGrab(player1,hpBar,keyA,scene,KeyDisplay){

        if(this.playerGrabbed === false){
        player1.visible = false;
        KeyDisplay.visible = true;
        KeyDisplay.playSKey();
        //prevents falling through the tile set.
        this.y -= 10;
        player1.x = this.x-25;
        this.anims.play("slimeGrab",true);
        }
        this.playerGrabbed = true;
        this.setSize(20,67,true);
        if(this.playerDamaged === false && hpBar.playerHealth > 1 ){
            hpBar.calcDamage(1);
            this.playerDamaged = true;
        }
         
         if(keyA.isDown && this.struggleCounter < 200){
            this.struggleCounter++;
            player1.x = this.x-10;
         }

         if(this.struggleCounter === 200){

            KeyDisplay.visible = false;
            if(this.struggleFree < 120){
                console.log("Free counter: "+this.struggleFree);
                this.struggleFree++;
                if(this.struggleFree < 30){
                    this.anims.play("slimeGrabBreak1");   
                }else if(this.struggleFree < 60){
                    this.anims.play("slimeGrabBreak2");   
                }else if(this.struggleFree < 90){
                    this.anims.play("slimeGrabBreak3");   
                }
                
            }else if(this.struggleFree === 120){
                this.struggleFree = 0;
                this.anims.play("slimeIdle");
                this.struggleCounter = 0;
                this.setSize(20,20,true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                player1.visible = true;
            }
         }
         console.log("this.struggleCounter: "+this.struggleCounter);
         
    }

    checkOverlap(spriteB) {
        var boundsA = this.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    slimeCombine(otherSlime){

    }


}
