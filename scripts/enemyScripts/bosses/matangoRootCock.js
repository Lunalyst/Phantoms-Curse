//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class matangoRootCock extends  matangoRootAnal {
    
    randomizeInputCock(){

        if(this.keyAnimationPlayed === false){
            this.keyAnimationPlayed = true;
            this.scene.KeyDisplay.playQuestionKey();

        }
        
    }

    playerIsNotDefeatedInputsCock(playerHealthObject){
        // correct keys to escape can be ASD
        if(this.startedGrab === true && this.struggleFree === false && this.spitUp === false){
             //console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {
                this.lastKeyPressed = "A";

                if (this.playerBellyLocation === "shaft") {

                     this.struggleDecrease();

                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = false;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('shaftSideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{

                     this.struggleDecrease();

                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = false;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('BallsSideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }
                
               
            }else if(this.scene.checkSPressed() === true) {
                this.lastKeyPressed = "S";

                if (this.playerBellyLocation === "shaft") {
                    this.struggleIncrease(playerHealthObject);
                   if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('shaftDownStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                    this.struggleDecrease();
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('BallsDownStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                    
                }
                
                
            }else if(this.scene.checkDPressed() === true) {
                this.lastKeyPressed = "D";

                if (this.playerBellyLocation === "shaft") {
                    this.struggleDecrease();
                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('shaftSideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                     this.struggleDecrease();
                     if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.flipX = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('BallsSideStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }

               
            }else if(this.scene.checkWPressed() === true) {
                this.lastKeyPressed = "W";

                if (this.playerBellyLocation === "shaft") {
                    this.struggleIncrease(playerHealthObject);
                
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('shaftUpStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }else{
                    this.struggleIncrease(playerHealthObject);
                
                    if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                        this.struggleAnimationInterupt = true;
                        this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play('BallsUpStruggle').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.struggleAnimationInterupt = false;
                        });
                    }
                }
                
            }
           }
           
        
        this.randomizeInputCock();

        this.reduceStruggleCounter();
    }

    playerIsStrugglingLogicCockASM(){

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

            this.anims.play('cockVoreSwallow1').once('animationcomplete', () => {
                this.anims.play('cockVoreSwallow2').once('animationcomplete', () => {
                    //need to hide the correct hand on the correct side here.
                     if(this.flipX === true){
                         this.rightHand.visible = true;
                    }else{
                        this.leftHand.visible = true;
                    }
                    this.anims.play('cockVoreSwallow3').once('animationcomplete', () => {
                        this.anims.play('cockVoreSwallow4').once('animationcomplete', () => {
                            this.anims.play('cockVoreSwallow5').once('animationcomplete', () => {
                                this.anims.play('shaftToBalls').once('animationcomplete', () => {
                                    this.startedGrab = true;
                                    this.animationPlayed = false;

                                    this.playerBellyLocation = "balls";

                                    this.keyAnimationPlayed = false;

                                    //makes the struggle bar visible
                                    struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                                    struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                                    //struggleEmitter.emit(struggleEvent.setStruggleBarScreenLoc,this.screenWidth/2, 590);
                                    // makes the key prompts visible.
                                    this.scene.KeyDisplay.visible = true;

                                    this.preventGiveUp = false;
                                });
                            });
                        });
                    });
                });
            });
            
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true && this.playerBellyLocation === "shaft"){
            this.anims.play("shaftIdle", true);
            this.playStomachSound('3',800); 
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true && this.playerBellyLocation === "balls"){
            this.anims.play("BallsIdle", true);
            this.playStomachSound('3',800); 
        }
    }

    playerIsStrugglingLogicCock(playerHealthObject){

        this.playerIsStrugglingLogicCockASM();

        if(this.playerDamageTimer === false && this.startedGrab === true){

           /* this.playerDamageTimer = true;

            //if the player is above 75% health
            if(this.playerBellyLocation === 'shaft'){

                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }
                let currentEnemy = this;
                setTimeout(function () {
                        currentEnemy.playerDamageTimer = false;
                }, 1000);

            }else if(this.playerBellyLocation === 'balls'){

                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,3);
                }

                let currentEnemy = this;
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 1000);
            }*/
        }   
    }

    playerEscapedCock(playerHealthObject){

        this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage," this.lastKeyPressed: ",this.lastKeyPressed);
            
            //if the player in in the lower gut and the last key is to the right set them free
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'shaft' && this.lastKeyPressed === 'W') {

                //if the palyer is grabbed, and in the tiger stomach
                if(this.playerDefeatedAnimationStage === 0 && this.spitUp === false){

                    this.struggleFree = true;
                    this.spitUp = true;
                    this.preventGiveUp = true;

                    this.flipX = false;

                    //spit up sound effect.
                    //this.scene.initSoundEffect('swallowSFX','4',0.02);

                    //play spitup animation
                    this.anims.play("cockVoreGrabRelease1").once('animationcomplete', () => {
                        this.leftHand.setDepth(4);
                        this.rightHand.setDepth(4);
                       this.anims.play("cockVoreGrabRelease2").once('animationcomplete', () => {
                            //then free player.
                            this.resetVariables();

                            this.keyAnimationPlayed = false;

                            this.leftHand.setDepth(5);
                            this.rightHand.setDepth(5);

                            this.scene.player1.mainHitbox.x = this.x - 60;
       
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
                    


            }else if(this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'shaft' && this.lastKeyPressed === 'S'){
                
                if(this.spitUp === false){

                    this.spitUp = true;
                    this.flipX = false;
                    this.preventGiveUp = true;
                    this.anims.play('shaftToBalls').once('animationcomplete', () => {
                       
                        this.struggleCounter = 0;
                        //makes the struggle bar visible
                        struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                        struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                        //struggleEmitter.emit(struggleEvent.setStruggleBarScreenLoc,this.screenWidth/2, 590);
                        // makes the key prompts visible.
                        this.scene.KeyDisplay.visible = true;
                        this.playerBellyLocation = "balls";
                        this.spitUp = false;
                        this.preventGiveUp = false;


                    });
                }
            }else if(this.struggleFree === false && playerHealthObject.playerHealth >= 1 && this.playerBellyLocation === 'balls' && this.lastKeyPressed === 'W'){
                if(this.spitUp === false){

                    this.spitUp = true;
                    this.flipX = false;
                    this.preventGiveUp = true;
                    this.anims.play('BallsToShaft').once('animationcomplete', () => {
                     
                        this.struggleCounter = 0;
                        //makes the struggle bar visible
                        struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                        struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                        //struggleEmitter.emit(struggleEvent.setDefaultStruggleBarLoc);
                        // makes the key prompts visible.
                        this.scene.KeyDisplay.visible = true;
                        this.playerBellyLocation = "shaft";
                        this.spitUp = false;
                        this.preventGiveUp = false;

                    });

                }
            }

            
    }

    playerIsDefeatedLogicCock(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
        this.playerDefeated = true;
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        this.scene.enemyThatDefeatedPlayer = bestiaryKey.matangoRootMaleCock;

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
            this.playerDefeatedAnimationStage !== 3 &&
            this.playerDefeatedAnimationStage !== 6 &&
            this.playerDefeatedAnimationStage !== 7 &&
            this.playerDefeatedAnimationStage !== 8 ) {

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
        if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 9 && this.scene.checkDIsDown())) {

            this.scene.KeyDisplay.visible = false;
            console.log("changing scene");

            if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                this.scene.sound.get("plapSFX").stop();
            }

            this.scene.changeToGameover();
        }

        //function to play the defeated animation
        this.enemyDefeatedPlayerAnimationCock();

        // same code but for the large enemy if it beats the player.

    }

    enemyDefeatedPlayerAnimationCock(){
        //if the player is in the shaft transfer them to the balls before continuing gameover.
        this.flipX = false;
        if(this.playerBellyLocation === 'shaft'){
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('shaftToBalls').once('animationcomplete', () => {
                        
                    this.playerBellyLocation = "balls";
                    this.animationPlayed = false;
    
                });
            }

        }else{

            if (this.playerDefeatedAnimationStage === 1) {

                this.playerDefeatedAnimationStageMax = 9;

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.anims.play('cockVoreGameover1').once('animationcomplete', () => {

                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;

                    });
                    
                    
                    
                }

            }else if (this.playerDefeatedAnimationStage === 2) {
                this.anims.play('cockVoreGameover2',true);
            }else if (this.playerDefeatedAnimationStage === 3) {
                this.leftHand.visible = false;
                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.anims.play('cockVoreGameover3').once('animationcomplete', () => {

                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;

                    });
                    
                }
            }else if (this.playerDefeatedAnimationStage === 4) {
                this.anims.play('cockVoreGameover4',true);
            }else if (this.playerDefeatedAnimationStage === 5) {
                this.anims.play('cockVoreGameover5',true);
            }else if (this.playerDefeatedAnimationStage === 6) {

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.anims.play('cockVoreGameover6').once('animationcomplete', () => {

                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;

                    });
                    
                }
            }else if (this.playerDefeatedAnimationStage === 7) {

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.anims.play('cockVoreGameover7').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;

                    });
                    
                }
            }else if (this.playerDefeatedAnimationStage === 8) {

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.anims.play('cockVoreGameover8').once('animationcomplete', () => {
                        this.leftHand.visible = true;

                        this.anims.play('cockVoreGameover8-fin').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;

                        });

                    });
                    
                }
            }else if (this.playerDefeatedAnimationStage === 9) {
                this.anims.play('cockVoreGameover9',true);
            }
        }
        
    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOverCock() {
        this.setSize(240, 180, true);
        this.setOffset(220, 380);
        this.visible = true;
        this.anims.play('unbirthGameoverFinish', true);
    }

    //function to show off animation 
    animationGrabCock(){

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
                    this.anims.play("CockVoreSwallow1").once('animationcomplete', () => {
                        this.anims.play("CockVoreSwallow2").once('animationcomplete', () => {
                            this.anims.play("CockVoreSwallow3").once('animationcomplete', () => {
                                this.anims.play("CockVoreSwallow4").once('animationcomplete', () => {
                                    //play struggle animation afterward.
                                    this.anims.play("upperBellyIdle", true);
                                    this.startAnimationPlayed = true;
                                    this.animationPlayed = false;

                                    this.playerBellyLocation = "shaft";
                                    //puts the key display in the correct location.
                                    this.scene.KeyDisplay.visible = true;
                                    this.scene.KeyDisplay.x = this.x;
                                    this.scene.KeyDisplay.y = this.y + 95;
                                });     
                            });     
                        });     
                    });       
                }else if(this.startAnimationPlayed === true){

                    // displays inputs while in the first stage of the animation viewing.
                    if (this.keyAnimationPlayed === false) {
                        //console.log(" setting keyW display");
                        this.scene.KeyDisplay.playQuestionKey();
                        //displays the give up option on screen
                        giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
                        this.keyAnimationPlayed = true;
                    }
                    
                    console.log(' this.animationViewTransferValue: ',this.animationViewTransferValue ," this.struggleAnimationInterupt: ",this.struggleAnimationInterupt);
                    if(this.animationViewTransferValue < 5 && this.playerBellyLocation === 'upper'){


                        if(this.playerGaveUp === true){

                            this.playerProgressingAnimation = true;
                    
                        }
                        
                        if (this.playerDefeated === false) {

                            //allows the player to press tab to let the enemy defeat them
                            this.tabToGiveUp();
                                
                        }

                        if(this.scene.checkWPressed() === true) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                this.lastKeyPressed = 'W';
                                if(this.animationViewTransferValue < 5){
                                    this.animationViewTransferValue++;
                                }
                                this.anims.play('upperBellyUpStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkAPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.flipX = false;
                                this.lastKeyPressed = 'A';
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                if(this.animationViewTransferValue < 5){
                                    this.animationViewTransferValue ++;
                                } 
                                this.anims.play('upperBellySideStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkSPressed() === true) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                if(this.animationViewTransferValue > 0){
                                    this.animationViewTransferValue --;
                                } 
                                this.anims.play('upperBellyDownStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkDPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.flipX = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                if(this.animationViewTransferValue > 0){
                                    this.animationViewTransferValue --;
                                } 
                                this.anims.play('upperBellySideStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.struggleAnimationInterupt === false){
                            this.anims.play("upperBellyIdle", true);
                            this.playStomachSound('3',800); 
                        }

                    }else if(this.animationViewTransferValue < 5 && this.playerBellyLocation === 'lower'){

                        if(this.playerGaveUp === true){
                            this.playerProgressingAnimation = true;
                        }
                        
                        if (this.playerDefeated === false) {

                            //allows the player to press tab to let the enemy defeat them
                            this.tabToGiveUp();
                                
                        }

                        if(this.scene.checkWPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                if(this.animationViewTransferValue > 0){
                                    this.animationViewTransferValue --;
                                } 
                                this.anims.play('lowerBellyMiddleStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkAPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.flipX = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                this.lastKeyPressed = 'A';
                                if(this.animationViewTransferValue < 5){
                                    this.animationViewTransferValue ++;
                                }
                                this.anims.play('lowerBellySideStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkSPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                if(this.animationViewTransferValue > 0){
                                    this.animationViewTransferValue --;
                                } 
                                this.anims.play('lowerBellyMiddleStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.scene.checkDPressed() === true ) {

                            if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                                this.struggleAnimationInterupt = true;
                                this.flipX = false;
                                this.scene.initSoundEffect('stomachSFX','4',0.1);
                                this.lastKeyPressed = 'D';
                                if(this.animationViewTransferValue < 5){
                                    this.animationViewTransferValue ++;
                                }
                                this.anims.play('lowerBellySideStruggle').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.struggleAnimationInterupt = false;
                                });
                            }
                        }else if(this.struggleAnimationInterupt === false){
                            this.anims.play("lowerBellyIdle", true);
                            this.playStomachSound('3',800); 
                        }    

                    }else if(this.struggleAnimationInterupt === false){

                        this.struggleAnimationInterupt = true;
                        if(this.playerBellyLocation === 'upper' && this.lastKeyPressed === 'W'){
                             this.flipX = false;
                             this.anims.play('upperBellySpitUp').once('animationcomplete', () => {
                                this.anims.play('upperBellyReSwallow').once('animationcomplete', () => {
                                    this.animationViewTransferValue = 0;
                                    this.struggleAnimationInterupt = false;
                                });
                            });
                        }else if(this.playerBellyLocation === 'upper' && this.lastKeyPressed === 'A'){
                            this.flipX = false;
                            this.anims.play('upperBellyToLowerBelly1').once('animationcomplete', () => {
                                this.anims.play('upperBellyToLowerBelly2').once('animationcomplete', () => {
                                    this.animationViewTransferValue = 0;
                                    this.playerBellyLocation = 'lower';
                                    this.struggleAnimationInterupt = false;
                                });
                            });
                        }else if(this.playerBellyLocation === 'lower' && this.lastKeyPressed === 'A'){
                            this.flipX = false;
                            this.anims.play('lowerBellyToUpperBelly1').once('animationcomplete', () => {
                                this.anims.play('lowerBellyToUpperBelly2').once('animationcomplete', () => {
                                    this.animationViewTransferValue = 0;
                                    this.playerBellyLocation = 'upper';
                                    this.struggleAnimationInterupt = false;
                                });
                            });
                        }else if(this.playerBellyLocation === 'lower' && this.lastKeyPressed === 'D'){

                            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);
                            this.anims.play("lowerBellyGrabRelease1").once('animationcomplete', () => {
                                this.anims.play("lowerBellyGrabRelease2").once('animationcomplete', () => {
                                    this.animationViewTransferValue = 0;
                                    this.struggleAnimationInterupt = false;
                                     //then free player.
                                    this.resetVariables();
                                    this.playerBellyLocation = 'upper';



                                    this.animationPlayed = false ;
                                    this.startAnimationPlayed = false;
                                    this.keyAnimationPlayed = false;
                                    this.playerProgressingAnimation = false;
                                    this.playerGrabbed = false;

                                    this.anims.play('forwardIdleEyesDownDreamView',true);

                                    this.scene.player1.mainHitbox.x = this.x + 60;
                                    //this.playerBellyLocation = 'upper';
                                });
                            });
                        }

                    }
                }   
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                     this.playerIsDefeatedLogicCock();

                
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }

    


}
