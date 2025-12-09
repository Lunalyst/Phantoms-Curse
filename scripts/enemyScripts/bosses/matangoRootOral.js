//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class matangoRootOral extends  matangoRootUnbirth {
    
    randomizeInputOral(){

        // randomizing input
        //console.log("this.randomInputCooldown: ",this.randomInputCooldown);
        /*if (this.randomInputCooldown === false) {
            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 3));
            //console.log("randomizing the key prompt " + this.randomInput);

            if(this.keyAnimationPlayed === false && this.randomInput === 0) {
                //console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                //console.log(" setting keyS display");
                this.scene.KeyDisplay.playSKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 2) {
                //console.log(" setting keyD display");
                this.scene.KeyDisplay.playDKey();
                this.keyAnimationPlayed = true;
            }
            
            let currentEnemy = this;
            setTimeout(function () {
                currentEnemy.randomInputCooldown = false;
                // resets the animation block.
                currentEnemy.keyAnimationPlayed = false;
            }, 2000);
        } */
    }

    playerIsNotDefeatedInputsOral(playerHealthObject){
        // correct keys to escape can be ASD
        if(this.startedGrab === true && this.struggleFree === false && this.spitUp === false){
             //console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {
                this.lastKeyPressed = "A";

                if (this.playerBellyLocation === "upper") {

                    this.struggleIncrease(playerHealthObject);

                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = false;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('upperBellySideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{

                    this.struggleIncrease(playerHealthObject);

                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('lowerBellySideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }
                
               
            }else if(this.scene.checkSPressed() === true) {
                this.lastKeyPressed = "S";

                if (this.playerBellyLocation === "upper") {
                    this.struggleDecrease();
                   if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('upperBellyDownStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                    this.struggleDecrease();
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('lowerBellyMiddleStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                    
                }
                
                
            }else if(this.scene.checkDPressed() === true) {
                this.lastKeyPressed = "D";

                if (this.playerBellyLocation === "upper") {
                    this.struggleDecrease();
                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('upperBellySideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                     this.struggleIncrease(playerHealthObject);
                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = false;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('lowerBellySideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }

               
            }else if(this.scene.checkWPressed() === true) {
                this.lastKeyPressed = "W";

                if (this.playerBellyLocation === "upper") {
                    this.struggleIncrease(playerHealthObject);
                
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('upperBellyUpStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                     this.struggleDecrease();
                
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('lowerBellyMiddleStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }
                
            }
           }
           
        
        this.randomizeInputOral();

        this.reduceStruggleCounter();
    }

    playerIsStrugglingLogicOralASM(){

        //console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.
        if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            this.preventGiveUp = true;
            //this.struggleAnimationInterupt = true;

            //this.scene.initSoundEffect('lickSFX','5',0.5);

            //need to hide the correct hand on the correct side here.
            if(this.flipX === true){
                this.rightHand.visible = false;
            }else{
                this.leftHand.visible = false;
            }
            this.scene.player1.lightSource.visible = false;

            this.anims.play('oralVoreSwallow1').once('animationcomplete', () => {
                this.anims.play('oralVoreSwallow2').once('animationcomplete', () => {
                    //need to hide the correct hand on the correct side here.
                     if(this.flipX === true){
                         this.rightHand.visible = true;
                    }else{
                        this.leftHand.visible = true;
                    }
                    this.anims.play('oralVoreSwallow3').once('animationcomplete', () => {
                        this.anims.play('oralVoreSwallow4').once('animationcomplete', () => {
                                this.startedGrab = true;
                                this.animationPlayed = false;

                                this.playerBellyLocation = "upper";

                                //makes the struggle bar visible
                                struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                                struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                                // makes the key prompts visible.
                                this.scene.KeyDisplay.visible = true;

                                
                                this.preventGiveUp = false;
                            });
                    });
                });
            });
            
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true && this.playerBellyLocation === "upper"){
            this.anims.play("upperBellyIdle", true);
            this.playStomachSound('3',800); 
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true && this.playerBellyLocation === "lower"){
            this.anims.play("lowerBellyIdle", true);
            this.playStomachSound('3',800); 
        }
    }

    playerIsStrugglingLogicOral(playerHealthObject){

        this.playerIsStrugglingLogicOralASM();

        if(this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            //if the player is above 75% health
            if(playerHealthObject.playerHealth >= (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 2 hp damager everys second.
                if(this.animationPlayed === false){
                    //healthEmitter.emit(healthEvent.loseHealth,1);
                }
                let currentEnemy = this;
                setTimeout(function () {
                        currentEnemy.playerDamageTimer = false;
                }, 1000);

            }else if(playerHealthObject.playerHealth < (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 2 hp damager everys .8 seconds.
                if(this.animationPlayed === false){
                    //healthEmitter.emit(healthEvent.loseHealth,1);
                }

                let currentEnemy = this;
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 800);
            }
        }   
    }

    playerEscapedOral(playerHealthObject){

        this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage," this.lastKeyPressed: ",this.lastKeyPressed);
            
            //if the player in in the lower gut and the last key is to the right set them free
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'lower' && this.lastKeyPressed === 'D') {

                //if the palyer is grabbed, and in the tiger stomach
                if(this.playerDefeatedAnimationStage === 0 && this.spitUp === false){

                    this.struggleFree = true;
                    this.spitUp = true;

                    //spit up sound effect.
                    this.scene.initSoundEffect('swallowSFX','4',0.02);

                    //play spitup animation
                    this.anims.play("lowerBellyGrabRelease1").once('animationcomplete', () => {
                        this.leftHand.setDepth(4);
                        this.rightHand.setDepth(4);
                       this.anims.play("lowerBellyGrabRelease2").once('animationcomplete', () => {
                            //then free player.
                            this.resetVariables();

                            this.leftHand.setDepth(5);
                            this.rightHand.setDepth(5);

                            this.scene.player1.mainHitbox.x = this.x + 60;
       
                            let currentEnemy = this;
                            setTimeout(function () {
                                currentEnemy.grabCoolDown = false;
                                currentEnemy.attackCooldown = false;
                                currentEnemy.scene.grabCoolDown = false;
                                console.log("grab cooldown has ended. player can be grabbed agian.");
                            }, 2000);
                            
                        });
                    });

                }

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                    


            }else if(this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'upper' && this.lastKeyPressed === 'W'){
                if(this.spitUp === false){

                    this.spitUp = true;
                    this.anims.play('upperBellySpitUp').once('animationcomplete', () => {
                        this.anims.play('upperBellyReSwallow').once('animationcomplete', () => {
                            this.struggleCounter = 0;
                            //makes the struggle bar visible
                            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                            // makes the key prompts visible.
                            this.scene.KeyDisplay.visible = true;
                            this.spitUp = false;

                        });
                    });
                }
                
            }else if(this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'upper' && this.lastKeyPressed === 'A'){
                if(this.spitUp === false){

                    this.spitUp = true;
                    this.flipX = false;
                    this.anims.play('upperBellyToLowerBelly1').once('animationcomplete', () => {
                        this.anims.play('upperBellyToLowerBelly2').once('animationcomplete', () => {
                            this.struggleCounter = 0;
                            //makes the struggle bar visible
                            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                            // makes the key prompts visible.
                            this.scene.KeyDisplay.visible = true;
                            this.playerBellyLocation = "lower";
                            this.spitUp = false;

                        });
                    });
                }
            }else if(this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'lower' && this.lastKeyPressed === 'A'){
                if(this.spitUp === false){

                    this.spitUp = true;
                    this.flipX = false;
                    this.anims.play('lowerBellyToUpperBelly1').once('animationcomplete', () => {
                        this.anims.play('lowerBellyToUpperBelly2').once('animationcomplete', () => {
                            this.struggleCounter = 0;
                            //makes the struggle bar visible
                            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                            // makes the key prompts visible.
                            this.scene.KeyDisplay.visible = true;
                            this.playerBellyLocation = "upper";
                            this.spitUp = false;

                        });
                    });
                }
            }

            
    }

    playerIsDefeatedLogicOral(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
        this.playerDefeated = true;
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        this.scene.enemyThatDefeatedPlayer = bestiaryKey.matangoRootFemaleOral;

        if(this.inStartDefeatedLogic === false) {

            this.scene.KeyDisplay.playDKey();
            let currentEnemy = this; // important, sets currentEnemy to the current object so that we can use variables attached to this current enemy object in our set timeout functions.
            
            setTimeout(function () {
                currentEnemy.scene.KeyDisplay.visible = true;
                currentEnemy.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentEnemy.playerDefeatedAnimationStage: " + currentEnemy.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;
            this.playerDefeatedAnimationStage++;
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

        //may be able to set a bool to true or false to tell what animations have the key skip
        //that way we dont need tons of if checks for numbers
        if (this.scene.checkDPressed() &&
            this.playerDefeatedAnimationCooldown === false &&
            this.inStartDefeatedLogic === true &&
            this.scene.KeyDisplay.visible === true &&
            this.playerDefeatedAnimationStage !== 1 &&
            this.playerDefeatedAnimationStage !== 3 ) {

            this.scene.KeyDisplay.visible = false;

            this.playerDefeatedAnimationCooldown = true;
            this.playerDefeatedAnimationStage++;
            let currentEnemy = this;
            console.log("currentEnemy.playerDefeatedAnimationStage: " + currentEnemy.playerDefeatedAnimationStage);

            this.currentEnemy = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
            setTimeout(function () {
                console.log("defeated animation delay.");
                currentEnemy.scene.KeyDisplay.visible = true;
                currentEnemy.scene.KeyDisplay.playDKey();
                currentEnemy.playerDefeatedAnimationCooldown = false;
            }, 3000);
        }

        // if tab is pressed or the player finished the defeated animations then we call the game over scene.
        if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 4 && this.scene.checkDIsDown())) {

            this.scene.KeyDisplay.visible = false;
            console.log("changing scene");

            if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                this.scene.sound.get("plapSFX").stop();
            }

            this.scene.changeToGameover();
        }

        //function to play the defeated animation
        this.enemyDefeatedPlayerAnimationOral();

        // same code but for the large enemy if it beats the player.

    }

    enemyDefeatedPlayerAnimationOral(){

        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 4;

            if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('OralGameover1').once('animationcomplete', () => {

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    //this.inStartDefeatedLogic = false;
                });
                
            }

        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('OralGameover2',true);
        }else if (this.playerDefeatedAnimationStage === 3) {

            if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('OralGameover3').once('animationcomplete', () => {

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
                
            }

        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('OralGameover4',true);
        }
    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOverOral() {
        this.setSize(240, 180, true);
        this.setOffset(220, 380);
        this.visible = true;
        this.anims.play('OralGameoverFinish', true);
    }

    //function to show off animation 
    animationGrabOral(){

        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.enemyGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;
            
        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(6);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
        
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            this.scene.player1.y = this.y - 150;

            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                 this.scene.initSoundEffect('lickSFX','5',0.5);

                //needed for the animation viewer
                if(this.animationPlayed === false && this.startAnimationPlayed === false){
                    this.animationPlayed = true;
                    this.anims.play("OralStart").once('animationcomplete', () => {
                        //play struggle animation afterward.
                        this.anims.play("OralIdle", true);
                        this.startAnimationPlayed = true;
                        this.animationPlayed = false;

                        //puts the key display in the correct location.
                        this.scene.KeyDisplay.visible = true;
                        this.scene.KeyDisplay.x = this.x;
                        this.scene.KeyDisplay.y = this.y + 95;
                    });       
                }else if(this.startAnimationPlayed === true){
                    // handles input for progressing animation
                    if (this.scene.checkWPressed() === true) {
                        this.playerProgressingAnimation = true;
                        }

                        // displays inputs while in the first stage of the animation viewing.
                        if (this.keyAnimationPlayed === false) {
                            //console.log(" setting keyW display");
                            this.scene.KeyDisplay.playWKey();
                            this.keyAnimationPlayed = true;

                    }else if(this.scene.checkAPressed() === true) {

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                            this.struggleAnimationInterupt = true;
                            this.flipX = false;
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('OralSideStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }else if(this.scene.checkSPressed() === true) {

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                            this.struggleAnimationInterupt = true;
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('OralDownStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }else if(this.scene.checkDPressed() === true) {

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                            this.struggleAnimationInterupt = true;
                            this.flipX = true;
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('OralSideStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }else if(this.struggleAnimationInterupt === false){
                        this.anims.play("OralIdle", true);
                        this.playStomachSound('3',800); 
                    }   
                }   
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                     this.playerIsDefeatedLogicOral();

                
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }

    


}
