//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class beeGrubAbsorb extends enemy {
    
    randomizeInputAbduct(){

        if (this.keyAnimationPlayed === false) {
            this.scene.KeyDisplay.playWKey();
            this.keyAnimationPlayed = true;
        }
        
    }

    playerIsNotDefeatedInputsAbduct(playerHealthObject){
        // correct keys to escape can be ASD

        //this.initSoundEffect('plapSFX','plap5',1);
        console.log("this.struggleValue", this.struggleValue);
        this.struggleValue = Math.floor(playerHealthObject.playerHealth/2) + 10;

        if(this.startedGrab === true && this.struggleFree === false){
            console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

                this.struggleDecrease(); 

                if(this.struggleAnimationInterupt === false){

                    this.scene.initSoundEffect('plapSFX','plap5',1);

                    this.struggleAnimationInterupt = true;

                    this.anims.play('beeGrubDownStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }

            }else if(this.scene.checkDPressed() === true) {

                this.struggleDecrease();

                if(this.struggleAnimationInterupt === false){

                    this.scene.initSoundEffect('plapSFX','plap5',1);

                    this.struggleAnimationInterupt = true;

                    this.anims.play('beeGrubDownStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }
            }else if(this.scene.checkSPressed() === true) {
                
                this.struggleDecrease();

                if(this.struggleAnimationInterupt === false){

                    this.scene.initSoundEffect('plapSFX','plap5',1);

                    this.struggleAnimationInterupt = true;

                    this.anims.play('beeGrubDownStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }

            }else if(this.scene.checkWPressed() === true) {
                
                this.struggleIncrease(playerHealthObject);

                if(this.struggleAnimationInterupt === false){

                    this.scene.initSoundEffect('plapSFX','plap5',1);

                    this.struggleAnimationInterupt = true;

                    this.anims.play('beeGrubDownStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }
            }
        }
        
        this.randomizeInputAbduct();

        this.reduceStruggleCounter();
    }

    playerIsStrugglingLogicAbductASM(){
        //this.rightHand.visible = false;
        //this.leftHand.visible = false;
        console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.

        

   if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            //this.struggleAnimationInterupt = true;
            
             //moves bee upward so that when the tween starts it isnt bumping up on the ground if the player is too close
            //tween kills all movement of the direction it is active in.
            

            // plays the gram animation then starts tween and struggle animation
            this.anims.play('beeGrubToungLashGrab').once('animationcomplete', () => {
                this.playPlapSound('plap4',1000);
                this.anims.play('beeGrubHalfInStruggle').once('animationcomplete', () => {
                    this.playPlapSound('plap3',1000);
                   this.anims.play('beeGrubSwallowComplete').once('animationcomplete', () => {

                    this.startedGrab = true;
                    this.animationPlayed = false;

                    //if the player escapes hide the give up indicator.
                    giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);

                    //makes the struggle bar visible
                    struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                    struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);
                    struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                    // makes the key prompts visible.
                    this.scene.KeyDisplay.visible = true;

                    this.setDepth(7);
    
                });
    
                });
            });
                
      
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true){
            this.anims.play('beeGrubIdleStruggle', true);
            this.playPlapSound('plap5',1000);
        }
    }

    playerIsStrugglingLogicAbduct(){

        this.playerIsStrugglingLogicAbductASM();

        console.log(this.playerDamageTimer, this.startedGrab)
        if(this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.loseHealth,2);
            }

            let currentEnemy = this;
            setTimeout(function () {
                currentEnemy.playerDamageTimer = false;
            }, 1000);
            
        }   
    }

    playerEscapedAbduct(playerHealthObject){

    this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                //if the palyer is grabbed, and in the tiger stomach
                if(this.playerDefeatedAnimationStage === 0 && this.spitUp === false){

                    this.struggleFree = true;
                    this.spitUp = true;

                    //spit up sound effect.
                    //this.playPlapSound('squirt1',2000);
                    this.playPlapSound('plap5',500);
                    //this.scene.initSoundEffect('stomachSFX','4',0.1);

                    //hides the mobile controls in the way of the tab/skip indicator.
                    controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

                    //play spitup animation
                    //this.flipX = true;
                    this.anims.play("beeGrubFullSpitUpStart").once('animationcomplete', () => {
                        this.anims.play("beeGrubFullSpitUpEnd").once('animationcomplete', () => {
                            //then free player.
                            //this.resetVariables();
                            this.struggleFree = false;
                            this.playerBrokeFree = 0;
                            this.struggleCounter = 0;
                            this.animationPlayed = false;
                            this.playerDamaged = false;
                            this.playerGrabbed = false;
                            this.keyAnimationPlayed = false;
                            this.scene.grabbed = false;
                            this.playerDamageTimer = false;
                            this.startedGrab = false;
                            this.spitUp = false;

                            this.scene.player1.visible = true;
                            
                            this.scene.player1.mainHitbox.x = this.x - 60;

                            if(this.flipX){
                                this.scene.player1.mainHitbox.x = this.x - 50;
                            }else{
                                this.scene.player1.mainHitbox.x = this.x + 50;
                            }

                            this.setDepth(5);

                            let currentEnemy = this;
                            setTimeout(function () {
                                currentEnemy.grabCoolDown = false;
                                currentEnemy.scene.grabCoolDown = false;
                                console.log("grab cooldown has ended. player can be grabbed agian.");
                             }, 2000);
                        
                        });
                    });

                }
                    


            }

    }

    playerIsDefeatedLogicAbduct(){

           // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the beeDrone.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
       
        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
            this.scene.KeyDisplay.playDKey();
            let currentbeeDrone = this; // important, sets currentbeeDrone to the current object so that we can use variables attached to this current beeDrone object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentbeeDrone.scene.KeyDisplay.visible = true;
                currentbeeDrone.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentbeeDrone.playerDefeatedAnimationStage: " + currentbeeDrone.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;
            this.playerDefeatedAnimationStage++;
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

       
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === false &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 1 &&
                      this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 5) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentbeeDrone = this;
                console.log("currentbeeDrone.playerDefeatedAnimationStage: " + currentbeeDrone.playerDefeatedAnimationStage);

                this.currentbeeDrone = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentbeeDrone.scene.KeyDisplay.visible = true;
                    currentbeeDrone.scene.KeyDisplay.playDKey();
                    currentbeeDrone.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > this.playerDefeatedAnimationStageMax && this.scene.checkDIsDown())) {
                
                this.scene.enemyThatDefeatedPlayer = bestiaryKey.beeGrubTF;

                this.scene.gameoverLocation = "hiveThroneGameover";
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.enemyDefeatedPlayerAnimationAbduct();
     

    }

    enemyDefeatedPlayerAnimationAbduct(){
          let currentbeeDrone = this;

          //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 6;

          if (this.playerDefeatedAnimationStage === 1) {

            if (!this.animationPlayed) {
                this.playPlapSound('plap6',800);
                this.animationPlayed = true;
                this.anims.play('beeGrubAbsorbCurseSquishStart').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false; 

                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('beeGrubAbsorbCurseSquishIdle', true);
            this.playPlapSound('plap5',1000);

        }else if (this.playerDefeatedAnimationStage === 3) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('beeGrubAbsorbCurse1').once('animationcomplete', () => {
                   this.anims.play('beeGrubAbsorbCurse2').once('animationcomplete', () => {
                        this.anims.play('beeGrubAbsorbCurse3').once('animationcomplete', () => {
                            this.anims.play('beeGrubAbsorbCurse4').once('animationcomplete', () => {
                                this.scene.initSoundEffect('curseSFX','curse',0.3);
                                this.anims.play('beeGrubAbsorbCurse5').once('animationcomplete', () => {
                                    //this.scene.onomat.destroy();
                                    this.animationPlayed = false;
                                    this.playerDefeatedAnimationStage++;
                                    this.inStartDefeatedLogic = false;
                                    
                                });
                            });
                        });
                    });
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('beeGrubCacoon', true);
           
        }else if (this.playerDefeatedAnimationStage === 5) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('beeGrubAbsorbMorph1').once('animationcomplete', () => {
                    this.body.setGravityY(0);
                    this.setVelocityY(-100);
                    this.anims.play('beeGrubAbsorbMorph2').once('animationcomplete', () => {
                    
                            //this.scene.onomat.destroy();
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false; 

                           let temp = this;
                            setTimeout(function () {

                               temp.beeHover = temp.scene.tweens.add({
                                    targets: temp,
                                    props : {
                                    y: { value : '+='+10},
                                    }, 
                                    ease: 'linear',
                                    duration: 350,
                                    repeat: -1,
                                    yoyo: true
                                });
                               
                            }, 100);
                            
                                            
                        });
                });
            }
        }else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('beeDroneFloat', true);
            this.playWingFlapSound('1',800);
         
        }
    }

    // functioned called to play animation when the player is defeated by the beeDrone in gameover.
    gameOver(playerSex) {
        this.setSize(70, 180, true);

        this.gameoverAnimationComplete = false;
        //this.setOffset(180, 110);
        this.anims.play('beeDroneGameover').once('animationcomplete', () => {

            this.gameoverAnimationComplete = true;
            let fedGrub = new beeGrub(this.scene, this.x-61, this.y-29,playerSex,1);
            fedGrub.setSize(70, 70, true);
           
            if(playerSex === 0){
                fedGrub.anims.play('beeGrubFedMale');
            }else{
                fedGrub.anims.play('beeGrubFedFemale');
            }
            this.anims.play('beeDroneMove', true);
            
            this.setVelocityX(50);

        });
    }

        //function to show off animation 
    animationGrabAbduct(){
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


                //needed for the animation viewer
                if(this.animationPlayed === false && this.startAnimationPlayed === false){
                    this.animationPlayed = true;
                    this.anims.play('beeGrubToungLashGrab').once('animationcomplete', () => {
                        this.playPlapSound('plap4',1000);
                        this.anims.play('beeGrubHalfInStruggle').once('animationcomplete', () => {
                            this.playPlapSound('plap3',1000);
                            this.anims.play('beeGrubSwallowComplete').once('animationcomplete', () => {

                                    //play struggle animation afterward.
                                    this.anims.play("absorbIdle", true);
                                    this.startAnimationPlayed = true;
                                    this.animationPlayed = false;

                                    //puts the key display in the correct location.
                                    this.scene.KeyDisplay.visible = true;
                                    this.scene.KeyDisplay.x = this.x;
                                    this.scene.KeyDisplay.y = this.y + 65;
                                }); 
                        }); 
                    });       
                }else if(this.startAnimationPlayed === true){

                    // displays inputs while in the first stage of the animation viewing.
                    if (this.keyAnimationPlayed === false) {
                        //console.log(" setting keyW display");
                        this.scene.KeyDisplay.playWKey();
                        this.keyAnimationPlayed = true;
                    }
                    // handles input for progressing animation
                    if (this.scene.checkWPressed() === true) {
                        this.playerProgressingAnimation = true;
                        
                    }else if(this.scene.checkAPressed() === true || this.scene.checkDPressed() === true || this.scene.checkSPressed()) {

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){


                            this.struggleAnimationInterupt = true;
                            this.anims.play('beeGrubDownStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }else if(this.struggleAnimationInterupt === false){
                        this.anims.play('beeGrubIdleStruggle', true);
                        this.playPlapSound('plap5',1000);
                    }   
                }   
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                     this.playerIsDefeatedLogicAbduct();

                
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }

    


}
