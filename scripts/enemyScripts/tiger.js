
//implementation for the tiger enemy.
class tiger extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 100, 'tiger');
        
        this.body.setGravityY(600); // sets gravity 
       
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        //value used to tell if the player can escape.

        this.randomInput = Math.floor((Math.random() * 2));

        this.taunting = false;
        this.jumped = false;
        this.randomInputCooldown = false;
        this.struggleCounterTick = false;
        this.TigerDamageCounter = false;
        this.isHidding = true;
        this.noticedPlayer = false;
        this.peakActivated = false;
        this.noticeRangeOuter = 240;
        this.noticeRangeInner = 225;
        this.noticedAndHiddenOuter = 224;
        this.playerInOuterRange = false;

        this.activateTigerRange = 150;
        this.playerEnteredActivationRange = false;
        this.activatedSuprise = false;

        this.jumpAnimationPlayed = false;
        this.playerEnteredHidingSpace = false;

        this.tigerIsEating = false;
        this.tigerHasEatenRabbit = false;
        
    
        //defines tiger animations based on the players sex.
        this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('tigerFemale', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingPeak', frames: this.anims.generateFrameNames('tigerFemale', { start: 1, end: 3 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'hidingCheckLeft', frames: this.anims.generateFrameNames('tigerFemale', { start: 4, end: 4 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingCheckMiddle', frames: this.anims.generateFrameNames('tigerFemale', { start: 3, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingCheckRight', frames: this.anims.generateFrameNames('tigerFemale', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hide', frames: this.anims.generateFrameNames('tigerFemale', { start: 6, end: 9 }), frameRate: 20, repeat: 0 });
        this.anims.create({ key: 'suprise', frames: this.anims.generateFrameNames('tigerFemale', { start: 9, end: 19 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'tigerIdle', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 20 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'tigerWalk', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 29 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRun', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 29 }), frameRate: 13, repeat: -1 });
        this.anims.create({ key: 'tigerJumpStart', frames: this.anims.generateFrameNames('tigerFemale', { start: 30, end: 32 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerInAir', frames: this.anims.generateFrameNames('tigerFemale', { start: 33, end: 33 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tigerFemale', { start: 34, end: 45 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTauntLoop', frames: this.anims.generateFrameNames('tigerFemale', { start: 34, end: 45 }), frameRate: 7, repeat: -1 });
        //adding enemy sprite extension to prevent loading issues.
        this.anims.create({ key: 'tigerWalkBigBooba', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 0, end: 9 }), frameRate: 9, repeat: -1 });
        this.anims.create({ key: 'tigerSwallowMaleRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 10, end: 16 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'tigerSwallowFemaleRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 61, end: 67 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'tigerSwallowRabbitMiddle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 17, end: 26 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'tigerDigestRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 102, end: 116 }), frameRate: 7, repeat: 0 });
        //male animations
        if (sex === 0) {
            this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerFemale', { start: 46, end: 59 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerFemale', { start: 60, end: 63 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerFemale', { start: 65, end: 71 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'tigerBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 27, end: 30 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaLayDown', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 31, end: 39 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerBoobaSnuggle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 40, end: 43 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaHump1', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 44, end: 47 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaHump2', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 44, end: 47 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaCurse', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 48, end: 56 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 57, end: 60 }), frameRate: 7, repeat: -1 });
        //female animations    
        } else if(sex === 1) {
            this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerFemale', { start: 72, end: 85 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerFemale', { start: 86, end: 89 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerFemale', { start: 90, end: 97 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'tigerBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 68, end: 71 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaLayDown', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 72, end: 80 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerBoobaSnuggle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 81, end: 84 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaHump1', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 85, end: 88 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaHump2', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 85, end: 88 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'tigerBoobaCurse', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 89, end: 97 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 98, end: 101 }), frameRate: 7, repeat: -1 });
        
        }
        //this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tigerFemale', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerSwallow2', frames: this.anims.generateFrameNames('tigerFemale', { start: 98, end: 102 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 103-103, end: 106-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 107-103, end: 110-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 111-103, end: 114-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 115-103, end: 118-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 119-103, end: 129-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 130-103, end: 136-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 137-103, end: 151-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 152-103, end: 154-103 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 155-103, end: 166-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 167-103, end: 171-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyRestArms', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 172-103, end: 173-103 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax3', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 174-103, end: 178-103 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummybreastSquish', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 179-103, end: 186-103 }), frameRate: 5, repeat: -1 });

        this.inSafeMode = inSafeMode;

       
        if(this.inSafeMode === true){
            this.anims.play("tigerTauntLoop",true); 
        }else{
            this.anims.play("tigerTaunt",true);
        }
        
    }

    //functions that move tiger objects.
    move(){
                
        //sets the gravity for tiger
        this.body.setGravityY(600);
        //possitions her sprite box correctly along with her hitbox
        this.setSize(100, 253, true);
        this.setOffset(120, 25);

        //if the tiger is hungry then
        if(this.tigerHasEatenRabbit === false){
            if(this.tigerIsEating === true){
                this.setVelocityX(0);
    
            }else if(this.isHidding === false && this.tigerIsEating === false){
    
                //console.log("this.body.blocked.down: ",this.body.blocked.down,"this.jumped: ",this.jumped,"this.jumpAnimationPlayed: ",this.jumpAnimationPlayed,);
    
                //checks to see if enemy is in range of player
                if (this.scene.player1.x > this.x - 600 && this.scene.player1.x < this.x + 600) {
                    
        
                    //if the player is out of range of the player in the y axis, then taunt player.
                    if(this.body.blocked.down && this.y-100 > this.scene.player1.y && this.taunting === false){
                        //set taunting to true
                        this.taunting = true;
                        //stop velocity
                        this.setVelocityX(0);
                        //play animation then
                        this.anims.play('tigerTaunt').once('animationcomplete', () => { 
                            this.taunting = false; 
                        });
    
                    //if the player is to the right and above tiger then jump towards the player
                    }else if(this.body.blocked.down && this.y > this.scene.player1.y && this.x < this.scene.player1.x && this.jumped === false && this.taunting === false) {
                        //console.log("jumping right")
                        
                        this.jumped = true;
                          
                        if (!this.jumpAnimationPlayed) {
                            this.jumpAnimationPlayed = true;
                            this.setVelocityX(0);
    
                            //animation getting interupted causing things to break.
                            this.flipX = false;
                            this.anims.play('tigerJumpStart').once('animationcomplete', () => {
                                this.jumpAnimationPlayed = false;
                                if(this.tigerIsEating === false){
                                this.setVelocityY(250*-1);
                                }
                            
                                let currentTiger = this;
                                setTimeout(function () {
                                    currentTiger.jumped = false;
                                    currentTiger.setVelocityX(310);
                                }, 160);
    
                                this.anims.play('tigerInAir');
                            
                            });
                        
                        }
    
                    //if the player is to the right and above tiger then jump towards the player
                    }else if(this.body.blocked.down && this.y > this.scene.player1.y  && this.x > this.scene.player1.x && this.jumped === false && this.taunting === false) {
                        //console.log("jumping left")
                        
                        this.jumped = true;
                           
                        if (!this.jumpAnimationPlayed) {
                            this.jumpAnimationPlayed = true;
                            this.setVelocityX(0);
    
                            this.flipX = true;
                            this.anims.play('tigerJumpStart').once('animationcomplete', () => {
                                this.jumpAnimationPlayed = false;
                                if(this.tigerIsEating === false){
                                    this.setVelocityY(250*-1);
                                }
                            
                                let currentTiger = this;
                                setTimeout(function () {
                                    currentTiger.jumped = false;
                                    currentTiger.setVelocityX(310*-1);
                                }, 160);
    
                                this.anims.play('tigerInAir');
                            
                            });
                        
                        }
    
                    //if the player is to the right then move enemy to the right
                    }else if(this.body.blocked.down && this.scene.player1.x > this.x+10 && this.taunting === false) {
                            
                        this.direction = "right";
                        this.jumpAnimationPlayed = false; 
                        
                        this.flipX = false;
                        this.anims.play('tigerRun', true);
                        this.setVelocityX(310); 
                
                    //if the player is to the right then move enemy to the left
                    } else if (this.body.blocked.down && this.scene.player1.x < this.x-10 && this.taunting === false) {
                            
                        this.direction = "left";
                        this.jumpAnimationPlayed = false;
                        this.flipX = true;
                        this.anims.play('tigerRun', true);
                        this.setVelocityX(310*-1); 
                        
                    //otherwise if the enemy is on the ground then
                    } else if (this.body.blocked.down && this.taunting === false) {
    
                        //player idle animation in the correct direction
                        if(this.direction === "left"){
                            this.flipX = true;
                            this.anims.play('tigerIdle', true);
                        }else if(this.direction === "right") {
                            this.flipX = false;
                            this.anims.play('tigerIdle', true);
                        }
    
                        //sets velocity to zero since the enemy should not be moving.
                        this.setVelocityX(0);
                    }
    
                    if(this.body.blocked.down){
                        this.jumped = false;
                    }
                   
                }else{
                    this.setVelocityX(0);
        
                }
    
            //if the tiger has not been activated, stay in hiding logic
            }else if(this.isHidding === true){
    
                //if the player enters the activation range
                if (this.playerEnteredActivationRange === false && this.checkRangeFromPlayer(this.activateTigerRange, this.activateTigerRange, this.activateTigerRange, this.activateTigerRange)){
                    //set value to true
                    this.playerEnteredActivationRange = true;
    
                //so when thep player leaves the range
                }else if(this.playerEnteredActivationRange === true && !this.checkRangeFromPlayer(this.activateTigerRange, this.activateTigerRange, this.activateTigerRange, this.activateTigerRange)){
                    
                    //play animation of tiger emerging from bush
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.anims.play('suprise').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            //start logic for tiger chasing player.
                            this.isHidding = false;
                        });
                    }
    
                //player hasnt been noticed but is within tigers range
                }else if(this.noticedPlayer === false && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.peakActivated = true;
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.anims.play('hidingPeak').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.noticedPlayer =true;
                        });
                    }
                    
                //if the player hasn't been noticed and isnt in range
                }else if(this.noticedPlayer === false && this.peakActivated === false){
    
                    //keep tiger hidden
                    this.flipX = false;
                    this.anims.play('hiding', true);
    
                //if the player has been noticed and is to the right, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x + this.noticeRangeInner && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.flipX = false;
                    this.anims.play('hidingCheckRight', true);
                    this.playerInOuterRange = false;
    
                //if the player has been noticed and is to the left, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x - this.noticeRangeInner)){
    
                    this.flipX = false;
                    this.anims.play('hidingCheckLeft', true);
                    this.playerInOuterRange = false;
    
                //once the player is spotted, hide agian
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x  - this.noticedAndHiddenOuter && this.scene.player1.x < this.x + this.noticedAndHiddenOuter)){
                    //plays the hiding animation
                    this.activatedSuprise = true;
                    if (!this.animationPlayed && this.playerInOuterRange === false) {
                        this.animationPlayed = true;
                        this.flipX = false;
                        this.anims.play('hide').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.playerInOuterRange = true;
                        });
                    //if hiding animation has been played, play hide animation
                    }else if (this.playerInOuterRange === true && this.activatedSuprise === false){
                        //console.log('this.playerInOuterRange === true');
                        this.flipX = false;
                        this.anims.play('hiding', true);
                    }
                }  
            }
        //else the tiger has eaten so do different logic
        }else{

            if(this.body.blocked.down && this.scene.player1.x > this.x && this.taunting === false) {
                            
                this.direction = "right";
                this.jumpAnimationPlayed = false; 
                
                this.flipX = false;
                this.anims.play('tigerWalkBigBooba', true);
                this.setVelocityX(70); 
        
            //if the player is to the right then move enemy to the left
            } else if (this.body.blocked.down && this.scene.player1.x < this.x && this.taunting === false) {
                    
                this.direction = "left";
                this.jumpAnimationPlayed = false;
                this.flipX = true;
                this.anims.play('tigerWalkBigBooba', true);
                this.setVelocityX(70*-1); 
                
            //otherwise if the enemy is on the ground then
            } else if (this.body.blocked.down && this.taunting === false) {

                //player idle animation in the correct direction
                if(this.direction === "left"){
                    this.flipX = true;
                    this.anims.play('tigerIdle', true);
                }else if(this.direction === "right") {
                    this.flipX = false;
                    this.anims.play('tigerIdle', true);
                }

                //sets velocity to zero since the enemy should not be moving.
                this.setVelocityX(0);
            }
        }
        
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.tigerPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {
        this.setVelocityX(0);
        if(this.isHidding === false){
            //player idle animation in the correct direction 
            if(this.tigerHasEatenRabbit === false){
                this.anims.play('tigerTaunt', true);
            }else{
                this.anims.play('tigerTummybreastSquish', true);
            }
            
            //sets velocity to zero since the enemy should not be moving.
            this.body.setGravityY(600);
        }

        //object is on view layer 4 so idling enemys dont overlap current one.
        this.setDepth(4);
    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    gameOver(version) {
        
        //puts the sprite and hitbox in the correct locations.
        this.setSize(100, 253, true);
        this.setOffset(120, 25);
        //plays game over animation

        if(version === 1){
            this.anims.play('tigerCubGameover',true);
        }else{
            this.anims.play('tigerTummybreastSquish',true);
        }
        
    }

    //function called to play tiger eating animations.
    tigerEatsRabbit(rabbitSex){
       // console.log("");

        // decides if the male or female rabbit is being eaten.
        this.tigerIsEating = true;
        let rabbitSexFlag = 'tigerSwallowMaleRabbit';
        if(rabbitSex === 1){
            rabbitSexFlag = 'tigerSwallowFemaleRabbit';
        }
        
        //plays long string of animations to show the tiger eating the rabbit and digesting her meal.
        this.scene.initSoundEffect('swallowSFX','2',0.6);
        this.anims.play(rabbitSexFlag).once('animationcomplete', () => {
            this.scene.initSoundEffect('swallowSFX','3',0.6);
            this.anims.play('tigerSwallowRabbitMiddle').once('animationcomplete', () => {
                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble1').once('animationcomplete', () => {
                        this.scene.initSoundEffect('stomachSFX','6',0.1);
                        this.anims.play('tigerTummyWobble2').once('animationcomplete', () => {
                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                                this.scene.initSoundEffect('stomachSFX','1',0.03);
                                this.anims.play('tigerDigestRabbit').once('animationcomplete', () => {
                                    this.scene.initSoundEffect('stomachSFX','2',0.03);
                                    this.anims.play('tigerTummyDigestion2').once('animationcomplete', () => {

                                        this.anims.play('tigerTummyrelax2').once('animationcomplete', () => {
                                            this.tigerIsEating = false;
                                            this.tigerHasEatenRabbit = true;
                                            this.enemyHP = 120;
            
                                        });
                                    });
                                
                                }); 
                            });
                        }); 
                    }); 
                
            }); 
        });
    }
    
    //the grab function. is called when player has overlaped with an enemy.
    grab() {
        let currentTiger = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.

        this.clearTint();
        //console.log("this.playerGrabbed: ",this.playerGrabbed);
        // moves player attackhitbox out of the way.
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {
           
            this.tigerGrabFalse();

        } else if (this.playerGrabbed === true) {

             //object is on view layer 5 so enemy is infront of others.
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

            this.tigerGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            if (this.playerDefeated === false) {

                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                this.tabToGiveUp();
            }

            // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            if (playerHealthObject.playerHealth >= 1 && this.TigerDamageCounter === false && this.struggleCounter <= 100) {
                
                this.playerIsStrugglingLogic();

            } 
            
            //if player escapes then do escape logic.
            if (this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1) {

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                
                this.playerEscaped(playerHealthObject);

            }else if (playerHealthObject.playerHealth === 0 && this.tigerHasEatenRabbit === false) {

                // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "eaten"){
                    this.scene.defeatedTitle = "eaten";
                }

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                
                //defeated animation logic.
                this.playerIsDefeatedLogic(playerHealthObject);
            }else if (playerHealthObject.playerHealth === 0 && this.tigerHasEatenRabbit === true) {

                // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "cursed"){
                    this.scene.defeatedTitle = "cursed";
                }

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                
                //defeated animation logic.
                this. playerplayerIsDefeatedLogicBooba(playerHealthObject);
            }
            // if the player breaks free then do the following
            
        }

    }

    tigerGrabFalse(){
         // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
            //console.log("this tiger did grab the player this.tigerId: " + this.tigerId);
            //console.log("this.playerGrabbed",this.playerGrabbed);
            this.scene.player1.visible = false;
            // makes the key prompts visible.
            this.scene.KeyDisplay.visible = true;

            // if its a small slime then play the small slime grab animation.
            if (this.direction === "left") {
                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {

                    this.flipX = true;

                    if(this.tigerHasEatenRabbit === false){
                        this.scene.initSoundEffect('lickSFX','3',0.01);

                        this.scene.onomat = new makeText(this.scene,this.x-11,this.y-30,'charBubble',"LICK!");
                        this.scene.onomat.visible = this.scene.onomatopoeia;
                        this.scene.onomat.setScale(1/4);
                        this.scene.onomat.textWave();
                        this.scene.onomat.textFadeOutAndDestroy(1000);

                        this.anims.play('tigerGrab').once('animationcomplete', () => {
                            this.anims.play("tigerStruggle", true);
                            this.scene.onomat.destroy();
                        });
                    }else{

                        this.scene.onomat = new makeText(this.scene,this.x-11,this.y+15,'charBubble',"BOUNCE!");
                        this.scene.onomat.visible = this.scene.onomatopoeia;
                        this.scene.onomat.setScale(1/4);
                        this.scene.onomat.textWave();
                        this.scene.onomat.textFadeOutAndDestroy(1000);

                        if (this.onomatPlayed === false) {
                            this.onomatPlayed = true;
                            let randX = Math.floor((Math.random() * 15));
                            let randY = Math.floor((Math.random() * 15));
                            this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY,'charBubble',"@heart@");
                            this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                            this.scene.heartOnomat1.setScale(1/4);
                            this.scene.heartOnomat1.textFadeOutAndDestroy(600);
            
                            let thisTiger = this;
                            setTimeout(function () {
                                thisTiger.onomatPlayed = false;
                            }, 600);
                        }

                        this.anims.play('tigerBoobaGrab');
                    }
                }
                
            } else if (this.direction === "right") {
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {

                    this.flipX = false;

                    if(this.tigerHasEatenRabbit === false){
                        this.anims.play('tigerGrab').once('animationcomplete', () => {
                            this.anims.play("tigerStruggle", true);
                        });
                    }else{
                        this.anims.play('tigerBoobaGrab');
                    }
                    
                }
            }
            this.playerGrabbed = true;
            //if the player is grabbed then do the following.

    }

    tigerGrabTrue(playerHealthObject){

        // stopps velocity once player is grabbed
        this.setVelocityX(0);
        
        //plays bouncy sound during the struggle animation if the tiger has eaten.
        if(this.tigerHasEatenRabbit === true && playerHealthObject.playerHealth > 0 ){
            let randomInt = Math.ceil(Math.random() * (10 - 6) + 6);
            let sound = ''+randomInt;
            console.log("randomInt: ", randomInt);
            console.log("sound: ", sound);
            this.playJumpySound(sound,700);
        }
        

        //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;
        //this.scene.player1.body.setGravityY(0);
        //this.body.setGravityY(0);
        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;
        //console.log("this.scene.KeyDisplay: ",this.scene.KeyDisplay);

       
        // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
        //console.log("this.playerDamaged: ",this.playerDamaged,"playerHealthObject.playerHealth: ",playerHealthObject.playerHealth)
        if (this.playerDamaged === false && playerHealthObject.playerHealth > 0 && this.tigerHasEatenRabbit === false) {
            //hpBar.calcDamage(1);
            healthEmitter.emit(healthEvent.loseHealth,1)
            console.log('return value of health emitter: ', playerHealthObject.playerHealth);
            this.playerDamaged = true;


            
        }else if (this.playerDamaged === false && playerHealthObject.playerHealth > 0 && this.tigerHasEatenRabbit === true) {
            //hpBar.calcDamage(1);
            healthEmitter.emit(healthEvent.loseHealth,4)
            console.log('return value of health emitter: ', playerHealthObject.playerHealth);
            this.playerDamaged = true;
            
        }

       

    }

    playerIsNotDefeatedInputs(playerHealthObject){
        if (this.randomInput === 0) {
            if (this.scene.checkSPressed() === true) {
               
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 20;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    console.log('strugglecounter: ' + this.struggleCounter);
                }
            }
        } else if (this.randomInput === 1) {
            // important anims.play block so that the animation can player properly.
            if (this.scene.checkWPressed() === true) {
                
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 20;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    console.log('strugglecounter: ' + this.struggleCounter);
                }
            }
        }
        // randomizing input
        if (this.randomInputCooldown === false) {

            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 2));
            console.log("randomizing the key prompt " + this.randomInput);
            // important anims.play block so that the animation can player properly.
            if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                console.log(" setting keyS display");
                this.scene.KeyDisplay.playSKey();
                this.keyAnimationPlayed = true;
            } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                console.log(" setting keyW display");
                this.scene.KeyDisplay.playWKey();
                this.keyAnimationPlayed = true;
            }

            let currentTiger = this;
            setTimeout(function () {
                currentTiger.randomInputCooldown = false;
                // resets the animation block.
                currentTiger.keyAnimationPlayed = false;
            }, 2000);
        } 

        // reduces the struggle counter over time.
        if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            this.struggleCounterTick = true;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            let currentTiger =this;
            setTimeout(function () {
                currentTiger.struggleCounterTick = false;
            }, 10);
            //console.log('strugglecounter: '+this.struggleCounter);
        }
    }

    playerIsStrugglingLogic(){
        this.TigerDamageCounter = true;
                //hpBar.calcDamage(4);
                healthEmitter.emit(healthEvent.loseHealth,4)
                let currentTiger = this;
                setTimeout(function () {
                    currentTiger.TigerDamageCounter = false;
                }, 1500);
    }

    playerIsDefeatedLogic(playerHealthObject){
        this.playerDefeated = true;
        
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
        this.scene.enemyThatDefeatedPlayer = "femaleTiger";

        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playWKey();
                let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentTiger.scene.KeyDisplay.visible = true;
                    currentTiger.scene.KeyDisplay.playWKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                     console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
         }


                if (this.scene.checkWIsDown() && 
                    this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationCooldown === false &&
                    this.inStartDefeatedLogic === false &&
                     this.playerDefeatedAnimationStage !== 1 &&
                      this.playerDefeatedAnimationStage !== 3 &&
                       this.playerDefeatedAnimationStage !== 5 &&
                       this.playerDefeatedAnimationStage !== 6 &&
                       this.playerDefeatedAnimationStage !== 7) {

                    this.scene.KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    let currentTiger = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        currentTiger.scene.KeyDisplay.visible = true;
                        currentTiger.scene.KeyDisplay.playWKey();
                        currentTiger.playerDefeatedAnimationCooldown = false
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkWIsDown())) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimation();
    }

    //players defeated animation for when the a rabbit has been eaten.
    playerplayerIsDefeatedLogicBooba(playerHealthObject){
        this.playerDefeated = true;
        
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
        this.scene.enemyThatDefeatedPlayer = "femaleTigerBooba";

        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playWKey();
                let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentTiger.scene.KeyDisplay.visible = true;
                    currentTiger.scene.KeyDisplay.playWKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                     console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
         }


                if (this.scene.checkWIsDown() && 
                    this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationCooldown === false &&
                    this.inStartDefeatedLogic === false &&
                     this.playerDefeatedAnimationStage !== 1 &&
                       this.playerDefeatedAnimationStage !== 5) {

                    this.scene.KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    let currentTiger = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        currentTiger.scene.KeyDisplay.visible = true;
                        currentTiger.scene.KeyDisplay.playWKey();
                        currentTiger.playerDefeatedAnimationCooldown = false
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 6 && this.scene.checkWIsDown())) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimationBooba();

    }

    playerEscaped(playerHealthObject){
        this.scene.KeyDisplay.visible = false;
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                    let currentTiger = this;
                    setTimeout(function () {
                        currentTiger.struggleFree = true;
                    }, 100);

                    // if the player if freed do the following to reset the player.
                } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                    this.flipX = false;
                    this.anims.play("tigerIdle");
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    //this.anims.play("tigerStruggleBreakRight", true);
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    this.keyAnimationPlayed = false;
                    this.scene.player1.visible = true;
                    //player1.setSize(23, 68, true);
                    struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                    //hides the mobile controls in the way of the tab/skip indicator.
                    controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                    //this.scene.player1.body.setGravityY(600);
                    this.body.setGravityY(600);
                    this.scene.player1.x = this.x;
                    this.scene.player1.y = this.y;
                    this.scene.grabbed = false;
                    this.scene.KeyDisplay.visible = false;
                    // creates a window of time where the player cant be grabbed after being released.
                    // creates a cooldown window so the player does not get grabbed as they escape.
                    let currentTiger = this;
                    setTimeout(function () {
                        currentTiger.grabCoolDown = false;
                        currentTiger.scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 1500);
                }
    }

    damage() {
        this.setVelocityX(0);
        console.log("this.damageCoolDown:" + this.damageCoolDown,"this.isHidding:" + this.isHidding);
        if (this.damageCoolDown === false && this.isHidding === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            console.log("activating damage function");
            if (this.enemyHP > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.calcDamage(
                    this.scene.player1.sliceDamage,
                    this.scene.player1.bluntDamage,
                    this.scene.player1.pierceDamage,
                    this.scene.player1.heatDamage,
                    this.scene.player1.lightningDamage,
                    this.scene.player1.coldDamage,
                    this.scene.player1.curseDamage
                );

                this.playJumpySound('2',700);

                if (this.enemyHP <= 0) {
                    this.destroy();
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
   
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt / 2);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 2);
        }
        if (heat > 0) {
            this.enemyHP -= (heat * 2);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning * 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 2);
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    // plays the tiger defeated player animations.
    defeatedPlayerAnimation() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;

            this.playerDefeatedAnimationStageMax = 9;

            if (!this.animationPlayed) {
                console.log("the animation has not been played");
                this.animationPlayed = true;
                this.scene.initSoundEffect('swallowSFX','2',0.6);
                
                //this.scene.onomat.destroy();
                this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(600);
                this.scene.onomat.textFadeOutAndDestroy(600);

                console.log("this.scene.onomat: ",this.scene.onomat);
                
                this.anims.play('tigerSwallow1').once('animationcomplete', () => {
                    console.log("animation finished");
                    this.scene.initSoundEffect('swallowSFX','3',0.6);

                    //onomat.textWob();

                    this.anims.play('tigerSwallow2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);

                    });
                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            //make a random number from 0-5
            //console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            let randomInt = Math.floor(Math.random() * 6);
            //console.log("randomInt", randomInt)
            if (!this.animationPlayed) {
               
                this.animationPlayed = true;
                if(randomInt === 0){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','3',0.1);
                    this.anims.play('tigerTummyPush1').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;

                    });
                }else if(randomInt === 1){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+35,'charBubble',"GURGLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','5',0.1);
                    this.anims.play('tigerTummyPush2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });

                }else if(randomInt === 2){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+18,'charBubble',"WOBBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textSquishLeft(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 3){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+18,'charBubble',"WOBBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textSquishRight(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 4){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                    this.scene.onomat.visible = true;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('tigerTummySquish1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 5){

                    this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','8',0.5);
                    this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                        
                    });
                    
                }
                
            }

        } else if (this.playerDefeatedAnimationStage === 3) {
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"CHURN!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.scene.initSoundEffect('stomachSFX','1',0.03);
                this.animationPlayed = true;
                this.anims.play('tigerTummyDigestion1').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
               
                    this.anims.play('tigerTummyrelax1',true);
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
            
                
        }else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"SHRINK...");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.animationPlayed = true;
                this.scene.initSoundEffect('stomachSFX','2',0.03);
                this.anims.play('tigerTummyDigestion2').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 6) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyrelax2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
            
        }else if (this.playerDefeatedAnimationStage === 7) {
    
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyRestArms').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
               
            }
        }else if (this.playerDefeatedAnimationStage === 8) {
               
            this.anims.play('tigerTummyrelax3',true);
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
    
        
        }
    }


    defeatedPlayerAnimationBooba() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;

            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
                console.log("the animation has not been played");
                this.animationPlayed = true;
                
                console.log("this.scene.onomat: ",this.scene.onomat);
                
                this.anims.play('tigerBoobaLayDown').once('animationcomplete', () => {

                    console.log("animation finished");
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    if(this.scene.playerSex === 0 && this.flipX === true){
                        this.scene.internalView = new internalView(this.scene,this.x+10,this.y+60,'tiger')
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation((3.14)+(3.14)/3);
                    }else if(this.scene.playerSex === 0){
                        this.scene.internalView = new internalView(this.scene,this.x-10,this.y+60,'tiger')
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation(-(3.14)/3);
                    }

                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                let thisTiger = this;
                setTimeout(function () {
                    thisTiger.onomatPlayed = false;
                }, 600);
            }

            this.playJumpySound('2',700);

            this.anims.play('tigerBoobaSnuggle',true);
            
        } else if (this.playerDefeatedAnimationStage === 3) {

            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)

            this.playPlapSound('plap3',700);

            this.playJumpySound('3',700);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen2",true);
            }
             
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisTiger = this;
                setTimeout(function () {
                    thisTiger.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('tigerBoobaHump1',true);

        }else if (this.playerDefeatedAnimationStage === 4) {
               
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

            this.playPlapSound('plap9',500);

            this.playJumpySound('4',500);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen3",true);
            }

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                let tempTiger = this;
                setTimeout(function () {
                    tempTiger.onomatPlayed = false;
                }, 300);
            }

            this.anims.play('tigerBoobaHump2',true);
                 
        }else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {

                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInTiger");
                 }

                this.scene.initSoundEffect('curseSFX','curse',0.3);
               
                this.animationPlayed = true;
                //this.scene.initSoundEffect('stomachSFX','2',0.03);
                this.anims.play('tigerBoobaCurse').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

                    
                });
            }
        }
    }

    //function to show off animation 
    animationGrab(){

        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.tigerGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;

        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
        
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            //puts the key display in the correct location.
            this.scene.KeyDisplay.visible = true;
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

            // handles input for progressing animation
            if (this.scene.checkDPressed() === true) {
                this.playerProgressingAnimation = true;
                }

                // displays inputs while in the first stage of the animation viewing.
                if (this.keyAnimationPlayed === false) {
                    //console.log(" setting keyW display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }      
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                    if(this.tigerHasEatenRabbit === true){
                        this.playerplayerIsDefeatedLogicBooba(playerHealthObject);
                    } else{
                        this.playerIsDefeatedLogic(playerHealthObject);
                    }
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }
}
