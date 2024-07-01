/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://docs.idew.org/video-game/project-references/phaser-coding/enemy-behavior
// example enemy behaviors
*/

//import { decreaseHealth } from "./uiScripts/events";

//how to use once and a promise for animations completing.
//https://stackoverflow.com/questions/71490140/phaser-3-play-animation-after-previous-animation-finished
//https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#once__anchor

//at higher hrtz rates breaks the slimegrab function. needs to be redone again. fuck.

//implementation for the blue slime enemy.
class tiger extends enemy {
    
    constructor(scene, xPos, yPos, sex, id) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 20, 'tiger');
        
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
        
    
        //defines tiger animations based on the players sex.
        this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('tiger-evan', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingPeak', frames: this.anims.generateFrameNames('tiger-evan', { start: 1, end: 3 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'hidingCheckLeft', frames: this.anims.generateFrameNames('tiger-evan', { start: 4, end: 4 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingCheckMiddle', frames: this.anims.generateFrameNames('tiger-evan', { start: 3, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hidingCheckRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'hide', frames: this.anims.generateFrameNames('tiger-evan', { start: 6, end: 9 }), frameRate: 20, repeat: 0 });
        this.anims.create({ key: 'suprise', frames: this.anims.generateFrameNames('tiger-evan', { start: 9, end: 19 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'tigerLeftIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 20, end: 20 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'tigerLeftWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 20, end: 29 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerLeftRun', frames: this.anims.generateFrameNames('tiger-evan', { start: 20, end: 29 }), frameRate: 13, repeat: -1 });
        this.anims.create({ key: 'tigerLeftJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 30, end: 32 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerLeftInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 33, end: 33 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 34, end: 34 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 34, end: 43 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightRun', frames: this.anims.generateFrameNames('tiger-evan', { start: 34, end: 43 }), frameRate: 13, repeat: -1 });
        this.anims.create({ key: 'tigerRightJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 44, end: 46 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerRightInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 47, end: 47 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tiger-evan', { start: 48, end: 59 }), frameRate: 7, repeat: 0 });

        //male animations
        if (sex === 0) {
            this.anims.create({ key: 'tigerGrabRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 60, end: 74 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggleRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 74, end: 77 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowRight1', frames: this.anims.generateFrameNames('tiger-evan', { start: 78, end: 85 }), frameRate: 7, repeat: 0 });
            
        //female animations    
        } else if(sex === 1) {
            this.anims.create({ key: 'tigerGrabRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 86, end: 100 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggleRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 100, end: 103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowRight1', frames: this.anims.generateFrameNames('tiger-evan', { start: 104, end: 111 }), frameRate: 7, repeat: 0 });
        }
        //this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerSwallowRight2', frames: this.anims.generateFrameNames('tiger-evan', { start: 112, end: 116 }), frameRate: 7, repeat: 0 });

        this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tiger-evan', { start: 116, end: 119 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tiger-evan', { start: 120, end: 123 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 124, end: 127 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tiger-evan', { start: 128, end: 131 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tiger-evan', { start: 132, end: 143 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 143, end: 149 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tiger-evan', { start: 150, end: 167 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tiger-evan', { start: 167, end: 170 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tiger-evan', { start: 171, end: 180 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tiger-evan', { start: 181, end: 184 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyRestArms', frames: this.anims.generateFrameNames('tiger-evan', { start: 185, end: 188 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax3', frames: this.anims.generateFrameNames('tiger-evan', { start: 189, end: 192 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummybreastSquish', frames: this.anims.generateFrameNames('tiger-evan', { start: 193, end: 200 }), frameRate: 5, repeat: -1 });

        this.anims.play("tigerTaunt");
    }

    //functions that move tiger objects.
    move(){
                
        //sets the gravity for tiger
        this.body.setGravityY(600);
        //possitions her sprite box correctly along with her hitbox
        this.setSize(100, 250, true);
        this.setOffset(100, 20);

        //if the tiger is no longer in its hiding logic then 
        if(this.isHidding === false){

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
                        this.anims.play('tigerRightJumpStart').once('animationcomplete', () => {
                            this.jumpAnimationPlayed = false;
                            this.setVelocityY(250*-1);
                        
                            let currentTiger = this;
                            setTimeout(function () {
                                currentTiger.jumped = false;
                                currentTiger.setVelocityX(310);
                            }, 160);

                            this.anims.play('tigerRightInAir');
                        
                        });
                    
                    }

                //if the player is to the right and above tiger then jump towards the player
                }else if(this.body.blocked.down && this.y > this.scene.player1.y  && this.x > this.scene.player1.x && this.jumped === false && this.taunting === false) {
                    //console.log("jumping left")
                    
                    this.jumped = true;
                       
                    if (!this.jumpAnimationPlayed) {
                        this.jumpAnimationPlayed = true;
                        this.setVelocityX(0);

                        this.anims.play('tigerLeftJumpStart').once('animationcomplete', () => {
                            this.jumpAnimationPlayed = false;
                            this.setVelocityY(250*-1);
                        
                            let currentTiger = this;
                            setTimeout(function () {
                                currentTiger.jumped = false;
                                currentTiger.setVelocityX(310*-1);
                            }, 160);

                            this.anims.play('tigerLeftInAir');
                        
                        });
                    
                    }

                //if the player is to the right then move enemy to the right
                }else if(this.body.blocked.down && this.scene.player1.x > this.x && this.taunting === false) {
                        
                    this.direction = "right";
                    this.jumpAnimationPlayed = false;  
                    this.anims.play('tigerRightRun', true);
                    this.setVelocityX(310); 
            
                //if the player is to the right then move enemy to the left
                } else if (this.body.blocked.down && this.scene.player1.x < this.x && this.taunting === false) {
                        
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.anims.play('tigerLeftRun', true);
                    this.setVelocityX(310*-1); 
                    
                //otherwise if the enemy is on the ground then
                } else if (this.body.blocked.down && this.taunting === false) {

                    //player idle animation in the correct direction
                    if(this.direction === "left"){
                        this.anims.play('tigerLeftIdle', true);
                    }else if(this.direction === "right") {
                        this.anims.play('tigerLeftIdle', true);
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
                this.anims.play('hiding', true);

            //if the player has been noticed and is to the right, look at them
            }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x + this.noticeRangeInner && this.scene.player1.x < this.x + this.noticeRangeOuter)){

                this.anims.play('hidingCheckRight', true);
                this.playerInOuterRange = false;

            //if the player has been noticed and is to the left, look at them
            }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x - this.noticeRangeInner)){

                this.anims.play('hidingCheckLeft', true);
                this.playerInOuterRange = false;

            //once the player is spotted, hide agian
            }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x  - this.noticedAndHiddenOuter && this.scene.player1.x < this.x + this.noticedAndHiddenOuter)){
                //plays the hiding animation
                this.activatedSuprise = true;
                if (!this.animationPlayed && this.playerInOuterRange === false) {
                    this.animationPlayed = true;
                    this.anims.play('hide').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerInOuterRange = true;
                    });
                //if hiding animation has been played, play hide animation
                }else if (this.playerInOuterRange === true && this.activatedSuprise === false){
                    //console.log('this.playerInOuterRange === true');
                    this.anims.play('hiding', true);
                }
            }  
        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.tigerPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {
        
        //player idle animation in the correct direction
        if(this.direction === "left"){
            this.anims.play('tigerLeftIdle', true);
        }else if(this.direction === "right") {
            this.anims.play('tigerLeftIdle', true);
        }
        //sets velocity to zero since the enemy should not be moving.
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    gameOver() {
        
        //puts the sprite and hitbox in the correct locations.
        this.setSize(100, 250, true);
        this.setOffset(100, 20);
        //plays game over animation

    
            this.anims.play('tigerTummybreastSquish',true);
        
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

             //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
             let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            this.tigerGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator);
            
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
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                
                this.playerEscaped(playerHealthObject);

            }else if (playerHealthObject.playerHealth === 0) {

                // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "eaten"){
                    this.scene.defeatedTitle = "eaten";
                }

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
                
                //defeated animation logic.
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            // if the player breaks free then do the following
            
        }

    }

    tigerGrabFalse(){
         // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
            //console.log("this tiger did grab the player this.tigerId: " + this.tigerId);
            console.log("this.playerGrabbed",this.playerGrabbed);
            this.scene.player1.visible = false;
            // puts the player hitbox out of the way and locked to a specific location.
            this.scene.player1.y = this.y - 150;
            // makes the key prompts visible.
            this.scene.KeyDisplay.visible = true;

            // if its a small slime then play the small slime grab animation.
            if (this.direction === "left") {
                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                    this.scene.initSoundEffect('lickSFX','3',0.01);

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y-30,'charBubble',"LICK!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textWave();
                    this.scene.onomat.textFadeOutAndDestroy(1000);

                    this.anims.play('tigerGrabRight').once('animationcomplete', () => {
                        this.anims.play("tigerStruggleRight", true);
                        this.scene.onomat.destroy();
                    });
                }
                
            } else if (this.direction === "right") {
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                    this.anims.play('tigerGrabRight').once('animationcomplete', () => {
                        this.anims.play("tigerStruggleRight", true);
                    });
                }
            }
            this.playerGrabbed = true;
            //if the player is grabbed then do the following.

    }

    tigerGrabTrue(playerHealthObject){

        // stopps velocity once player is grabbed
        this.setVelocityX(0);

        //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;
        this.scene.player1.body.setGravityY(0);
        //this.body.setGravityY(0);
        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
        console.log("this.scene.KeyDisplay: ",this.scene.KeyDisplay);

       
        // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
        //console.log("this.playerDamaged: ",this.playerDamaged,"playerHealthObject.playerHealth: ",playerHealthObject.playerHealth)
        if (this.playerDamaged === false && playerHealthObject.playerHealth > 0) {
            //hpBar.calcDamage(1);
            healthEmitter.emit(healthEvent.loseHealth,1)
            console.log('return value of health emitter: ', playerHealthObject.playerHealth);
            this.playerDamaged = true;
            /*setTimeout(function () {
                currentTiger.playerDamaged  = false;
            }, 2000);*/
        }
       

    }

    playerIsNotDefeatedInputs(playerHealthObject){
        if (this.randomInput === 0) {
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyS) === true) {
               
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 20;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    console.log('strugglecounter: ' + this.struggleCounter);
                }
            }
        } else if (this.randomInput === 1) {
            // important anims.play block so that the animation can player properly.
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyW) === true) {
                
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
        
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator);
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


                if (this.scene.keyW.isDown && 
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
                if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 8 && this.scene.keyW.isDown)) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimation();
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
                    this.anims.play("tigerRightIdle");
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

                    this.scene.player1.body.setGravityY(600);
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
                    }, 3000);
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
                    this.scene.player1.coldDamage
                );
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

    
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
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
    }

    // plays the tiger defeated player animations.
    defeatedPlayerAnimation() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;
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
                
                this.anims.play('tigerSwallowRight1').once('animationcomplete', () => {
                    console.log("animation finished");
                    this.scene.initSoundEffect('swallowSFX','3',0.6);

                    //onomat.textWob();

                    this.anims.play('tigerSwallowRight2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);

                    });
                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            //make a random number from 0-5
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            let randomInt = Math.floor(Math.random() * 6);
            console.log("randomInt", randomInt)
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

}
