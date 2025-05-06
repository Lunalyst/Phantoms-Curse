
//implementation for the blue enemy.
class EarieShadow extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 40, 'TShadow');


        //randomizes variables
        this.scene = scene;

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(70,20,true);
        this.hitboxActive = false;
        this.grabHitBox.body.enable = false;

        this.body.setGravityY(600); 

        this.attemptingGrab = false;
        this.grabTimer = false;
        this.isPlayingMissedAnims = false;
        this.activatedCycleTimer = false;
        this.randomMoveTimer = Math.floor((Math.random() * 2000) + 1000);

        this.defeatedActivated = false;

        this.movementState = 0;

        this.inSafeMode = inSafeMode;
        this.randomInput = Math.floor((Math.random() * 3));
        this.randomInputCooldown = false;
          
        this.anims.create({ key: 'shadowGrabStart', frames: this.anims.generateFrameNames('TShadow', { start: 0, end: 7 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'shadowGrabmiddle', frames: this.anims.generateFrameNames('TShadow', { start: 8, end: 9 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'shadowGrabMiss', frames: this.anims.generateFrameNames('TShadow', { start: 10, end: 19 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'shadowIdle', frames: this.anims.generateFrameNames('TShadow', { start: 20, end: 23 }), frameRate: 7, repeat: -1 });
        
        if(inSafeMode === true){
            this.anims.play("shadowIdle",true);
        }else{
            this.anims.play("shadowGrabStart",true);
        }
        

        //applys lighting to the enemy. cursed light is reused as a way for the player to see whats going on when grabbed.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 80, 0xb317ff);
            this.curseLight.visible = false;
        }
    }

    //functions that move enemy objects.
    move() {

        this.setSize(10, 50, true);
        
        //if player doesnt have lanturn active
        if(this.scene.player1.lanturnFlicker === null && this.activatedCycleTimer === false){
            this.visible = true;
            this.grabAnimationHandler();
                
            //decide orientation of grab.

        //else stop animation or grab. plays sfx of sigh, reset grab variables.
        }else{
            //reset variables and hide shadow.
            this.visible = false;

            this.setVelocityX(0);
            this.setVelocityY(0);
            //hide light if the player gets away
            if(this.scene.lightingSystemActive === true){ 
                this.curseLight.x = this.x;
                this.curseLight.y = this.y;
                this.curseLight.visible = false;
            }

        }
        //handles hit box positioning
        if(this.hitboxActive === true){

                //hitbox should be to left if player is to the left
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y;
        
        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    grabAnimationHandler(){

        //enemy move handler
        if(this.movementState === 0){
            if(this.randomInput === 0){
                this.x = this.scene.player1.x;
                this.y = this.scene.player1.y-50;
                this.angle = 0;
            }else if(this.randomInput === 1){
                this.x = this.scene.player1.x-50;
                this.y = this.scene.player1.y;
                this.angle  = -90;
            }else if(this.randomInput === 2){     
                this.x = this.scene.player1.x+50;
                this.y = this.scene.player1.y;
                this.angle  = 90;
            }
        }else if(this.movementState === 1){
            if(this.randomInput === 0){
                this.grabHitBox.setSize(20,90,true);
                this.setVelocityY(10);
                //this.y = this.scene.player1.y-50;
                this.angle = 0;
            }else if(this.randomInput === 1){
                this.x = this.scene.player1.x-50;
                this.grabHitBox.setSize(90,20,true);
                this.angle  = -90;
                this.setVelocityX(300);
            }else if(this.randomInput === 2){     
                this.x = this.scene.player1.x+50;
                this.grabHitBox.setSize(90,20,true);
                this.angle  = 90;
                this.setVelocityX(-300);
            }
        }

        this.curseLight.y = this.y;
        this.curseLight.x = this.x;
        

        if(this.grabTimer === false){
                    
            //play animation
            this.grabTimer = true;

            this.movementState = 1;

            this.setDepth(7);

            this.scene.initSoundEffect('buttonSFX',"soulHit",0.5);

            this.curseLight.visible = true;   

            this.anims.play('shadowGrabStart').once('animationcomplete', () => {
                
                this.movementState = 2;
                this.hitboxActive = true;
                this.grabHitBox.body.enable = true;

                this.anims.play('shadowGrabmiddle').once('animationcomplete', () => {
                    this.attemptingGrab = true;
                });
               
            });
        }else if(this.attemptingGrab === true){
            console.log("grab missed!");

            if(this.isPlayingMissedAnims === false){
                this.isPlayingMissedAnims = true;
                this.hitboxActive = false;
                //set value to play missed grabb animation
                
                this.anims.play('shadowGrabMiss').once('animationcomplete', () => {

                    this.curseLight.visible = false;
                    this.movementState = 0;

                    this.setDepth(5);
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.isPlayingMissedAnims = false;    

                    let tempShadow = this;
                    setTimeout(function () {
                        tempShadow.activatedCycleTimer = false;
                        tempShadow.randomMoveTimer = Math.floor((Math.random() * 2000) + 1000);
                        tempShadow.randomInput = Math.floor((Math.random() * 3));
                    }, this.randomMoveTimer);
                    this.activatedCycleTimer = true;
                });

            }
        //move right when the players lanturn is not active
        }
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

        this.anims.play('shadowIdle', true);
        this.body.setGravityY(600);
        this.setVelocityX(0);
        this.setDepth(4);

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    gameOver() {
        
    }

    //the grab function. is called when player has overlaped with an enemy enemy.
    grab(){ 
        let currentEnemy = this;
        //first checks if enemy object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.
        this.setVelocityX(0);

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.enemyGrabFalse();

        } 

    }

    //simple function to set a few thing when grab is started
    enemyGrabFalse(){

        this.playerDefeated = true;
        this.playerGrabbed = true;
        this.scene.player1.visible = false;

        this.scene.enemyThatDefeatedPlayer = "earieShadow";
        this.scene.gameoverLocation = "abyssGameover";
        this.scene.KeyDisplay.visible = false;

        this.scene.changeToGameover();
    }

    animationGrab(){

        if (!this.animationPlayed) {
            this.visible = true;
            this.animationPlayed = true;
            
            this.scene.player1.playerIdleAnimation();
            //this.player1.
            this.scene.initSoundEffect('buttonSFX',"soulHit",0.5);

            this.anims.play('shadowGrabStart').once('animationcomplete', () => {

                this.scene.player1.visible = false;

                this.anims.play('shadowGrabmiddle').once('animationcomplete', () => {
                
                    this.playerDefeated = true;
                    this.playerGrabbed = true;
                    this.scene.player1.visible = false;

                    this.scene.enemyThatDefeatedPlayer = "earieShadow";
                    this.scene.gameoverLocation = "abyssGameover";
                    this.scene.KeyDisplay.visible = false;

                    this.scene.changeToGameover();

                });
            
            });
        }

    }
    
}
