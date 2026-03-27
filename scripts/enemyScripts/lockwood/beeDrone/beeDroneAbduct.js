//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class beeDroneAbduct extends enemy {
    
    randomizeInputAbduct(){

        if (this.keyAnimationPlayed === false) {
            this.scene.KeyDisplay.playWKey();
            this.keyAnimationPlayed = true;
        }
        
    }

    playerIsNotDefeatedInputsAbduct(playerHealthObject){
        // correct keys to escape can be ASD
        if(this.startedGrab === true && this.struggleFree === false){
            console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

                this.struggleDecrease(); 
            }else if(this.scene.checkDPressed() === true) {

                this.struggleDecrease();
            }else if(this.scene.checkSPressed() === true) {
                
                this.struggleDecrease();
            }else if(this.scene.checkWPressed() === true) {
                
                this.struggleIncrease(playerHealthObject);
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
            this.anims.play('beeDroneGrabbed').once('animationcomplete', () => {

                this.beeHover = this.scene.tweens.add({
                    targets: this,
                    props : {
                      y: { value : '+='+10},
                    }, 
                    ease: 'linear',
                    duration: 350,
                    repeat: -1,
                    yoyo: true
                });

                this.startedGrab = true;
                this.animationPlayed = false;

                //makes the struggle bar visible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                // makes the key prompts visible.
                this.scene.KeyDisplay.visible = true;

                //this.anims.play('beeDroneStruggle', true);
  
            });
                
      
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true){
            this.anims.play('beeDroneStruggle', true);
            this.playJumpySound('2',800); 
           
        }else{
            this.setVelocityY(-100);
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
            }, 2000);
            
        }   
    }

    playerEscapedAbduct(playerHealthObject){

         let currentbeeDrone = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                currentbeeDrone.struggleFree = true;
                    
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                
                this.anims.play("beeDroneIdle", true);
                
                //resets the enemy variables and player variables.
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(70, 180, true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                 this.playerDamageTimer = false;
                this.startedGrab = false;

                this.scene.player1.x = this.x
                this.scene.player1.y = this.y+20

                this.scene.player1.mainHitbox.x = this.x
                this.scene.player1.mainHitbox.y = this.y+20

                this.tiredCounter++;
                this.tiredCounter++;

                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                //sets grabb cooldown for the scene
                this.scene.startGrabCoolDown();
                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                //stops the hover tween during grab animation
                this.beeHover.stop();

                this.scene.player1.visible = true;
                //this.scene.player1.setSize(23, 68, true);
                //this.scene.player1.body.setGravityY(600);
                this.scene.player1.x = this.x;
                this.scene.player1.y = this.y;
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                currentbeeDrone = this;

                //reset the jump variables if the player escapes this enemys grab
                this.startJump = false;
                this.jumpAnimationPlayed = false;
                setTimeout(function () {

                    currentbeeDrone.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
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
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 4) {

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
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 4 && this.scene.checkDIsDown())) {
                
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.beeDroneMaleTF;
                }else{
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.beeDroneFemaleTF;
                }

                this.scene.gameoverLocation = "hiveGameover";
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.enemyDefeatedPlayerAnimationAbduct();
     

    }

    enemyDefeatedPlayerAnimationAbduct(){
          let currentbeeDrone = this;
        if (this.playerDefeatedAnimationStage === 1) {

            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 5;

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('beeDroneTailSwallow1').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('beeDroneTailStruggle', true);

            this.playPlapSound('plap3',800);

            let thisbeeDrone = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 30));
                let randY = Math.floor((Math.random() * 30));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisbeeDrone.onomatPlayed = false;
                }, 600);
            }
           
        }else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('beeDroneTailSwallow2').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('beeDroneTailSwallow3').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.anims.play('beeDroneTailJiggle', true);
           
        }
    }

    // functioned called to play animation when the player is defeated by the beeDrone in gameover.
    gameOver(playerSex) {
        this.setSize(70, 180, true);
        this.setPipeline('Light2D');
        this.gameoverAnimationComplete = false;
        //this.setOffset(180, 110);
        this.anims.play('beeDroneGameover').once('animationcomplete', () => {

            this.gameoverAnimationComplete = true;
            let fedGrub = new beeGrub(this.scene, this.x-90, this.y-29,playerSex,1);
            fedGrub.setSize(70, 70, true);
            fedGrub.body.setGravityY(0); 
            
            fedGrub.setPipeline('Light2D');
            if(playerSex === 0){
                fedGrub.anims.play('beeGrubFedMale');
            }else{
                fedGrub.anims.play('beeGrubFedFemale');
            }
            this.anims.play('beeDroneMove', true);
            
            this.setVelocityX(50);

        });
    }

    //functioned called to play animation when the player is defeated by the beeDrone in gameover.
    gameOverSecret() {
        this.setSize(70, 180, true);
        this.flipX = true;
        this.setPipeline('Light2D');
        this.scene.showTryAgain = false;

        let currentEnemy = this;

        this.anims.play('beeDroneDefeatedWillingTVEndingQ', true).once('animationcomplete', () => {

            this.anims.play('beeDroneDefeatedFallDown', true);
            
            setTimeout(function () {
                currentEnemy.playPlapSound('plap3',800);
                currentEnemy.anims.play('beeDroneDefeatedWillingRelease', true).once('animationcomplete', () => {
                   
                    setTimeout(function () {
                        currentEnemy.anims.play('beeDroneDefeatedWillingReleaseEyeOpen', true).once('animationcomplete', () => {
                           currentEnemy.scene.tryAgianLoad(currentEnemy.scene);

                        });
                    }, 3000);

                
            });

            }, 1000);

        });

    }
    

        //function to show off animation 
    animationGrabAbduct(){

    
            let currentbeeDrone = this;
            //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
            this.clearTint();
            
            //stops the x velocity of the enemy
            this.setVelocityX(0);
        
            this.scene.attackHitBox.y = this.scene.player1.y + 10000;
            // if the grabbed is false but this function is called then do the following.
            if (this.playerGrabbed === false) {

                this.beeDroneGrabFalse();
                this.isViewingAnimation = true;
                this.playerProgressingAnimation = false;

                this.anims.play("beeDroneStruggle",true);

            //if the player is grabbed then.
            } else if(this.playerGrabbed === true) {

                //object is on view layer 5 so enemy is infront of others.
                this.setDepth(5);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

                //plays jumpy sound during grab.
                if (this.playerProgressingAnimation === false) {
                    this.playJumpySound('3',700);
                }

                //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
                let playerHealthObject = {
                    playerHealth: null
                };

                //gets the hp value using a emitter
                healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
            
                // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
                this.scene.player1.y = this.y - 150;
                //this.scene.player1.body.setGravityY(0);
                //this.body.setGravityY(0);
                //this.scene.player1.setSize(10, 10, true);
                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 90;
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

                        this.beeHover = this.scene.tweens.add({
                            targets: this,
                            props : {
                            y: { value : '+='+10},
                            }, 
                            ease: 'linear',
                            duration: 350,
                            repeat: -1,
                            yoyo: true
                        });
                    }      
                }

                if( this.playerProgressingAnimation === true){
                    
                    //calls animation grab code until the animation is finished
                    if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                        //handle the defeated logic that plays defeated animations 
                        this.playerIsDefeatedLogicAbduct(playerHealthObject);
                    }else{
                        //hide the tab indicator and key prompts
                        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                        this.scene.KeyDisplay.visible = false;    
                    }
                }
        }
    }

    


}
