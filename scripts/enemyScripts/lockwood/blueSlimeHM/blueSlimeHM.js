

//implementation for the blue slime enemy.
class blueSlimeHM extends blueSlimeHMAbsorb {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        //super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
        //on set up, need to decide if bat is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHF');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHF');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
                this.enemySex = 0;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.randomInput = Math.floor((Math.random() * 3));
        this.randomInputCooldown = false;

        this.largeSlimeDamageCounter = false;
        //this.body.bounce.x = 1;

        this.slimeSoundCoolDown = false;

        this.slimeSoundsArray = ['1','2','3','4','5'];
        this.randomSlimeSound = Math.floor((Math.random() * 4));

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(20,10,true);

        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;
        this.grabTimer = false;
        this.hitboxActive = false;
        this.throwSlimeTimer = false;
        this.throwingSlime = false;

        this.enemyHP = 50;

        //console.log("this.enemySex: ",this.enemySex," sex ", sex);

        //defines Slime animations based on the players sex.
        if (this.enemySex === 0) {
                this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeMove', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 4, end: 9 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeThrowSlimeStart', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 10, end: 12 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeThrowSlimeEnd', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 13, end: 16 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeHiding', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 17, end: 17 }), frameRate: 3.5, repeat: 0 });
                this.anims.create({ key: 'slimeMoveHiding', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 17, end: 20 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeHidingAmbushGrab', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 20, end: 31 }), frameRate: 15, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabStart', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 28, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabMiss', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 32, end: 35 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'slimeDefeatedFall', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 135, end: 141 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeDefeatedFallIdle', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 142, end: 142 }), frameRate: 8, repeat: -1 });

            console.log("this.enemySex: ",this.enemySex," sex ", sex);
            if(sex === 0 ){
                this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 36, end: 39 }), frameRate: 8, repeat: -1 }); 
                this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 44, end: 54 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 55, end: 58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 59, end: 66 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 67, end: 70 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 71, end: 73 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 74, end: 77 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 78, end: 82 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated8', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 83, end: 86 }), frameRate: 12, repeat: -1 }); 
                this.anims.create({ key: 'slimeGrabDefeated9', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 86, end:  116}), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated10', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 117, end: 120}), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated11', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 121, end:  124}), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated12', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 125, end: 128}), frameRate: 8, repeat: -1 });
                
            }else{
                //console.log("this.enemySex: ",this.enemySex," sex ", sex);
                this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 36, end: 39 }), frameRate: 8, repeat: -1 }); 
                this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 44, end: 54 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 55, end: 58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 59, end: 66 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 67, end: 70 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 71, end: 73 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 74, end: 77 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 78, end: 82 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated8', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 83, end: 86 }), frameRate: 12, repeat: -1 }); 
                this.anims.create({ key: 'slimeGrabDefeated9', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 86, end:  116}), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated10', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 117, end: 120}), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeGrabDefeated11', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 121, end:  124}), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeGrabDefeated12', frames: this.anims.generateFrameNames('blue-slime-HM-F', { start: 125, end: 128}), frameRate: 8, repeat: -1 });
                
            }
            this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('blue-slime-HM-M', { start: 129, end: 132 }), frameRate: 8, repeat: -1 }); 

            } else {
                //console.log("creating female slime animations");
                this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeMove', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 4, end: 9 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeThrowSlimeStart', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 10, end: 12 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeThrowSlimeEnd', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 13, end: 16 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeHiding', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 17, end: 17 }), frameRate: 3.5, repeat: 0 });
                this.anims.create({ key: 'slimeMoveHiding', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 17, end: 20 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeHidingAmbushGrab', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 20, end: 31 }), frameRate: 15, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabStart', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 28, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabMiss', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 32, end: 35 }), frameRate: 8, repeat: 0 });
                
                this.anims.create({ key: 'slimeDefeatedFall', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 116, end: 122 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeDefeatedFallIdle', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 123, end: 123 }), frameRate: 8, repeat: -1 });

                if(sex === 0 ){
                    this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 36, end: 39 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 44, end: 51 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 52, end: 55 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 56, end: 60 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 61, end: 64 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 65, end: 68 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 69, end: 83 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 84, end: 96 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated8', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 97, end: 100 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeGrabDefeated9', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 101, end: 107 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated10', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 108, end: 111 }), frameRate: 8, repeat: -1 });
                }else{
                    this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 36, end: 39 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 44, end: 51 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 52, end: 55 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 56, end: 60 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 61, end: 64 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 65, end: 68 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 69, end: 83 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 84, end: 96 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated8', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 97, end: 100 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeGrabDefeated9', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 101, end: 107 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated10', frames: this.anims.generateFrameNames('blue-slime-HF-F', { start: 108, end: 111 }), frameRate: 8, repeat: -1 });
                }

                this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('blue-slime-HF-M', { start: 112, end: 115 }), frameRate: 8, repeat: -1 }); 
            }

        this.inSafeMode = inSafeMode;
        
        if(this.inSafeMode === true){
            this.isLurking = false; 
            this.anims.play('slimeIdle',true);
        }else{
            this.isLurking = true;
            this.anims.play('slimeHiding',true);  
        }

        //if the slime is of size 1 then set its hit box to the correct size
        this.setSize(90, 100, true);
        this.setOffset(80, 210);

        this.body.setGravityY(600);

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
          }

    }

    //functions that move slime objects.
    move() {

        this.setSize(90, 100, true);
        this.setOffset(80, 210);

        this.body.setGravityY(600);
        if (this.enemyHP > 0) {
            if(this.checkXRangeFromPlayer(370, 370)){
                //checks to see if enemy is in range of player
                //console.log("player within range");
                if (this.isLurking === true) {

                    //move the 
                    if((this.scene.player1.x + 10 > this.x   && this.scene.player1.x - 10 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false)){
                        
                        //play animation
                        this.setVelocityX(0);
                        this.grabTimer = true;
                        this.anims.play('slimeHidingAmbushGrab').once('animationcomplete', () => {
                            
                            
                            this.hitboxActive = true;
                            this.grabHitBox.body.enable = true;
                            this.attemptingGrab = true;

                            //controls the x velocity when the bee ischarging to grab the player
                            
                        });

                    }else if(this.attemptingGrab === true){

                        if(this.isPlayingMissedAnims === false){
                            this.isPlayingMissedAnims = true;
                            //set value to play missed grabb animation
                            
                            this.isLurking = false;
                            this.anims.play('slimeAttemptingGrabMiss').once('animationcomplete', () => {
                                //set butt slamming to false
                                this.attemptingGrab = false;
                                this.grabTimer = false;
                                this.isPlayingMissedAnims = false; 
                                this.hitboxActive = false;   
                            });
                        }

                    }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false&& this.grabTimer === false) {
                        //console.log("moving slime right");            
                        this.direction = "right";
                        this.jumpAnimationPlayed = false; 
                        
                        this.flipX = false;
                        this.anims.play('slimeMoveHiding', true);
                        this.setVelocityX(200); 
                
                    //if the player is to the right then move enemy to the left
                    } else if (this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false) {
                        //console.log("moving slime left");   
                        this.direction = "left";
                        this.jumpAnimationPlayed = false;
                        this.flipX = true;
                        this.anims.play('slimeMoveHiding', true);
                        this.setVelocityX(200*-1); 
                        
                    //if the medium humanoid slime is within range to grabb the player, then 
                    }

                }else if(this.isLurking === false){
                    //console.log("this.attemptingGrab: ",this.attemptingGrab," this.grabTimer: ",this.grabTimer," this.throwingSlime: ",this.throwingSlime," this.throwSlimeTimer: ",this.throwSlimeTimer); 

                    if((this.scene.player1.x + 10 > this.x   && this.scene.player1.x - 10 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false) && this.throwingSlime === false){
                            
                        //play animation
                        this.setVelocityX(0);
                        this.grabTimer = true;
                        this.throwingSlime = false;
                        this.anims.play('slimeAttemptingGrabStart').once('animationcomplete', () => {
                            
                            
                            this.hitboxActive = true;
                            this.grabHitBox.body.enable = true;
                            this.attemptingGrab = true;

                            //controls the x velocity when the bee ischarging to grab the player
                            
                        });

                    }else if(this.attemptingGrab === true){

                        if(this.isPlayingMissedAnims === false){
                            this.isPlayingMissedAnims = true;
                            //set value to play missed grabb animation
                            
                            this.isLurking = false;
                            this.anims.play('slimeAttemptingGrabMiss').once('animationcomplete', () => {
                            
                                this.hitboxActive = false;
                                this.attemptingGrab = false;
                                this.grabTimer = false;
                                this.isPlayingMissedAnims = false;    
                            });
                        }
                    }else if(this.scene.player1.x > this.x+ 20 && this.attemptingGrab === false && this.grabTimer === false && this.throwingSlime === false) {
                        console.log("moving slime right");            
                        this.direction = "right";
                        this.jumpAnimationPlayed = false; 
                        
                        this.flipX = false;

                        //if we can throw slime
                        if(this.throwSlimeTimer === false && this.throwingSlime === false){
                            this.throwingSlime = true;
                            this.throwSlimeTimer = true;
                            this.setVelocityX(0);
                            //play starting animation
                            this.anims.play('slimeThrowSlimeStart').once('animationcomplete', () => {
                                
                                //spawn projectile
                                this.scene.initSlimeProjectile(this.x,this.y-40,400,200);
                                //play finishing animation
                                this.anims.play('slimeThrowSlimeEnd').once('animationcomplete', () => {

                                    this.throwingSlime = false;
                                    this.throwingSlimeTimer = true;
                                    let tempSlime = this;
                                    setTimeout(function () {
                                        tempSlime.throwSlimeTimer = false;
                                    },Math.floor(Math.random() * (5000-1500) + 1500) );
    
                                });
    
                            });
                    
                        }else{
                            this.anims.play('slimeMove', true);
                            this.setVelocityX(140); 
                        }
                
                    //if the player is to the right then move enemy to the left
                    } else if (this.scene.player1.x < this.x-20 && this.attemptingGrab === false && this.grabTimer === false && this.throwingSlime === false) {
                        console.log("moving slime left");   
                        this.direction = "left";
                        this.jumpAnimationPlayed = false;
                        this.flipX = true;
                        //if we can throw slime
                        if(this.throwSlimeTimer === false && this.throwingSlime === false){
                            this.throwingSlime = true;
                            this.throwSlimeTimer = true;
                            this.setVelocityX(0);
                            //play starting animation
                            this.anims.play('slimeThrowSlimeStart').once('animationcomplete', () => {
                                
                                //spawn projectile
                                this.scene.initSlimeProjectile(this.x,this.y-40,-400,200);
                                //play finishing animation
                                this.anims.play('slimeThrowSlimeEnd').once('animationcomplete', () => {

                                    this.throwingSlime = false;
                                    this.throwingSlimeTimer = true;
                                    let tempSlime = this;
                                    setTimeout(function () {
                                        tempSlime.throwSlimeTimer = false;
                                    },Math.floor(Math.random() * (5000-1500) + 1500) );
    
                                });
    
                            });
                    
                        }else{
                            this.anims.play('slimeMove', true);
                            this.setVelocityX(-140); 
                        }
                        
                    //if the medium humanoid slime is within range to grabb the player, then 
                    }
                    
                }
            }
            

            if(this.hitboxActive === true){
                this.grabHitBox.x = this.x;
                this.grabHitBox.y = this.y;
            }else{
                this.grabHitBox.x = this.x;
                this.grabHitBox.y = this.y + 3000; 
            }
        }

        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }


    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveIdle() {
        //this.setSize(90, 65, true);
        //this.setOffset(105, 233);
        if (this.enemyHP > 0) {
            if(this.isLurking === false){
                this.anims.play('slimeIdle',true);
            }else{
                this.anims.play('slimeHiding',true);  
            }

            //this.setSize(90, 65, true);
            this.body.setGravityY(600);
            this.setVelocityX(0);
            this.attemptingGrab = false;
            this.grabTimer = false;
            this.isPlayingMissedAnims = false; 
            this.hitboxActive = false; 
            this.throwingSlime = false;
            this.throwSlimeTimer = false;
            this.setDepth(4);
        }

    }

    // functioned called to play animation when the player is defeated by the slime in gameover.
    slimeGameOver() {
        //this.playSlimeSound('3',800);
        this.setSize(90, 100, true);
        this.setOffset(80, 210);
        this.lurking = false;
        this.anims.play('slimeGameOver', true);
    }

    //the grab function. is called when player has overlaped with an enemy slime.
    grab(){
        let currentSlime = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.slimeGrabFalse();

        } else if (this.playerGrabbed === true) {

            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.slimeGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //if the player is not defeated
            if (this.playerDefeated === false) {

                //then allow the player to use controls to escape.
                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                this.tabToGiveUp();
                
            }

            //logic for if the player is not defeated and struggling
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else  if(playerHealthObject.playerHealth === 0){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            
        }

    }

    slimeGrabFalse(){
        //hide players actual body
        this.scene.player1.visible = false;
        // display key prompts
        this.scene.KeyDisplay.visible = true;
        
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    slimeGrabTrue(playerHealthObject){

        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
        
    }

    playerIsNotDefeatedInputs(playerHealthObject){
       this.playerIsNotDefeatedInputsAbsorb(playerHealthObject);
    }

    playerIsStrugglingLogic(playerHealthObject){

       this.playerIsStrugglingLogicAbsorb(playerHealthObject);
    }

    playerIsDefeatedLogic(playerHealthObject){

       this.playerIsDefeatedLogicAbsorb();
        
    }

    playerEscaped(playerHealthObject){

       this.playerEscapedAbsorb(playerHealthObject);

    }
   
    // controls the damage resistance of the slime.
    damage(refrence) {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.enemyHP > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                 this.calcDamage(
                    refrence.sliceDamage,
                    refrence.bluntDamage,
                    refrence.pierceDamage,
                    refrence.heatDamage,
                    refrence.lightningDamage,
                    refrence.coldDamage,
                    refrence.curseDamage
                );

                this.playSlimeSound('5',200);

                
                
                if (this.enemyHP <= 0) {

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    //calculate item drtop chance
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                    this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount+9,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        
                        //this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.
                        this.anims.play('slimeDefeatedFall').once('animationcomplete', () => {
                            //then destroy slime.
                            this.anims.play('slimeDefeatedFallIdle',true);
                            this.grabHitBox.destroy();
                        });

                }
            }
            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;

            setTimeout(function () {
                that.damageCoolDown = false;
                console.log("damage cool down:" + that.damageCoolDown);
                that.clearTint();
            }, 100);
        }
    }
    //handles damage types for blue slime. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 4);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 3);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 2);
        }
        if (heat > 0) {
            this.enemyHP -= (heat / 4);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning * 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 4);
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    //plays slime sound based in type input being 1-5 and a time delay
    playSlimeSound(type,delay){
        if(this.slimeSoundCoolDown === false){
            this.scene.initSoundEffect('blueSlimeSFX',type,0.3);
            this.slimeSoundCoolDown = true;
    
            let currentSlime = this;
            setTimeout(function () {
                currentSlime.slimeSoundCoolDown= false;
            }, delay);
        }

    }

    //function to show off animation 
    animationGrab(){
       this.animationGrabAbsorb();
    }
    
    
}
