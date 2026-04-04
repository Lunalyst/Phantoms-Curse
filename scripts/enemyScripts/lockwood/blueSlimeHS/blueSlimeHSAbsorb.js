//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class blueSlimeHSAbsorb extends enemy {
    
    randomizeInputAbsorb(){

        if (this.keyAnimationPlayed === false) {
            console.log(" setting keyA display");
            this.scene.KeyDisplay.playAKey();
            this.keyAnimationPlayed = true;
        }
        
    }

    playerIsNotDefeatedInputsAbsorb(playerHealthObject){
        // correct keys to escape can be ASD
        if(this.startedGrab === true && this.struggleFree === false){
            console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

            this.struggleIncrease(playerHealthObject);
                    
            }else if(this.scene.checkDPressed() === true) {

                this.struggleDecrease();
            }else if(this.scene.checkSPressed() === true) {
                
                this.struggleDecrease();
            }else if(this.scene.checkWPressed() === true) {
                
                this.struggleDecrease();
            }
        }
        
        this.randomizeInputAbsorb();

        this.reduceStruggleCounter();
    }

    playerIsStrugglingLogicAbsorbASM(){
        //this.rightHand.visible = false;
        //this.leftHand.visible = false;
        console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.
        if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            //this.struggleAnimationInterupt = true;
            
            this.startedGrab = true;
            this.animationPlayed = false;

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
            // makes the key prompts visible.
            this.scene.KeyDisplay.visible = true;
                
      
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true){
            this.anims.play("slimeStruggle", true);
            this.playJumpySound('2',800); 
           
        }
    }

    playerIsStrugglingLogicAbsorb(playerHealthObject){

        this.playerIsStrugglingLogicAbsorbASM();

        if(this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            //if the player is above 75% health
            //deal 2 hp damager everys .8 seconds.
            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.loseHealth,2);
            }

            let currentEnemy = this;
            setTimeout(function () {
                currentEnemy.playerDamageTimer = false;
            }, 3000);
            
        }   
    }

    playerEscapedAbsorb(playerHealthObject){

        this.scene.KeyDisplay.visible = false;

        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                console.log("player has broken free" );
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.anims.play("slimeIdle", true);
                
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(90, 65, true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.jumpAnimationPlayed = false;
                this.startedGrab = false;

                this.scene.player1.x = this.x
                this.scene.player1.y = this.y-10;

                this.scene.player1.mainHitbox.x = this.x
                this.scene.player1.mainHitbox.y = this.y-10



                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                this.scene.startGrabCoolDown();
                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                //unhide the player.
                this.scene.player1.visible = true;
                
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                let currentSlime = this;
                setTimeout(function () {

                    currentSlime.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            

            }
    }

    playerIsDefeatedLogicAbsorb(){

            // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
            this.scene.enemyThatDefeatedPlayer = bestiaryKey.blueSlimeHSVore;
            // if we start the player defeated animation then we need to set a few things.
            if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playDKey();
                let currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentSlime.scene.KeyDisplay.visible = true;
                    currentSlime.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            /*console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage,
            " this.playerDefeatedAnimationCooldown: ",this.playerDefeatedAnimationCooldown,
            " this.inStartDefeatedLogic: ",this.inStartDefeatedLogic);*/

            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === false &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 1 &&
                    this.playerDefeatedAnimationStage !==3 &&
                     this.playerDefeatedAnimationStage !== 5 ) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentSlime = this;
                console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentSlime.scene.KeyDisplay.visible = true;
                    currentSlime.scene.KeyDisplay.playDKey();
                    currentSlime.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }
            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 7 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.enemyDefeatedPlayerAnimationAbsorb();

    }

    enemyDefeatedPlayerAnimationAbsorb(){
         let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 9;

            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"GLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('slimeDefeatedPlayer').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('slimeGrabDefeated1', true);
            this.playSlimeSound('2',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }
           
        } else if(this.playerDefeatedAnimationStage === 3) {

            this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('slimeGrabDefeated3', true);
            let thisSlime = this;

            this.playPlapSound('plap10',1000);
            
            //plays onomat 
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }
            
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.anims.play('slimeGrabDefeated4').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('slimeGrabDefeated5', true);
            let thisSlime = this;

            this.playPlapSound('plap9',1200);
            
            //plays onomat 
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }
            
        }else if (this.playerDefeatedAnimationStage === 7) {
            this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.scene.onomat.destroy();
                this.scene.onomat = new makeText(this.scene,this.x+15,this.y+30,'charBubble',"GURRGGGLEEE!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(900);

                this.anims.play('slimeGrabDefeated6').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.onomat.destroy();
                });
            }
        }else if (this.playerDefeatedAnimationStage === 8) {
            this.playSlimeSound('3',700);
            this.anims.play('slimeGameOver', true);
        }
      
    }

   // functioned called to play animation when the player is defeated by the slime in gameover.
    slimeGameOver() {
        this.setSize(90, 60, true);
        this.setOffset(80, 233);
        this.anims.play('slimeGameOver', true);
    }

        //function to show off animation 
    animationGrabAbsorb(){
        console.log(' activating slime view grab logic');
        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.slimeGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;

            this.anims.play("slimeStruggle",true);
            
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
                    this.playerIsDefeatedLogic(playerHealthObject);
                    
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }

    


}
