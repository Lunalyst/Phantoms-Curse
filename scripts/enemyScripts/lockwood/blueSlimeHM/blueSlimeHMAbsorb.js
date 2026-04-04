

//implementation for the blue slime enemy.
class blueSlimeHMAbsorb extends enemy {
    
    randomizeInputAbsorb(){

        // randomizing input
        console.log("this.randomInputCooldown: ",this.randomInputCooldown);
        if (this.randomInputCooldown === false) {

            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 3));

            console.log("randomizing the key prompt " + this.randomInput);
            // important anims.play block so that the animation can player properly.
            if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                console.log(" setting keyD display");
                this.scene.KeyDisplay.playDKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 2) {
                console.log(" setting keyW display");
                this.scene.KeyDisplay.playWKey();
                this.keyAnimationPlayed = true;
            }
            let currentSlime = this;
            setTimeout(function () {
                currentSlime.randomInputCooldown = false;
                // resets the animation block.
                currentSlime.keyAnimationPlayed = false;
            }, 2000);
        } 
    }

    playerIsNotDefeatedInputsAbsorb(playerHealthObject){
        // correct keys to escape can be ASD
        if(this.startedGrab === true && this.struggleFree === false){
            console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

                if (this.randomInput === 0) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }
                 
            }else if(this.scene.checkDPressed() === true) {

                if (this.randomInput === 1) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }

            }else if(this.scene.checkWPressed() === true) {

                if (this.randomInput === 2) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }
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
            
                this.startedGrab = true;

                //makes the struggle bar visible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                // makes the key prompts visible.
                this.scene.KeyDisplay.visible = true;

                //need to hide the correct hand on the correct side here
                
        }else if(this.playerDefeatedAnimationStage === 0  && this.startedGrab === true){
            this.anims.play("slimeGrab", true);
            //handles sound effect diring grab struggle
            this.playSlimeSound('3',800);
        }
    }

    playerIsStrugglingLogicAbsorb(playerHealthObject){

        this.playerIsStrugglingLogicAbsorbASM();

        if(this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            //deal 2 hp damager everys .8 seconds.
            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.loseHealth,2);
            }

            let currentEnemy = this;
            setTimeout(function () {
                currentEnemy.playerDamageTimer = false;
            }, 2000);
            
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
                this.struggleFree = true;
                


            }else if(this.struggleFree === true && playerHealthObject.playerHealth >= 1){

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

                this.grabTimer = false;
                this.attemptingGrab = false;
                this.throwingSlime = false;
                this.throwSlimeTimer = false;


                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                this.scene.startGrabCoolDown();

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

               //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
                //unhide the player
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
            if(this.enemySex === 0){
                this.scene.enemyThatDefeatedPlayer = bestiaryKey.blueSlimeMaleHMVore;
            }else{
                this.scene.enemyThatDefeatedPlayer = bestiaryKey.blueSlimeFemaleHMVore;
            }
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

            //based on the enemys sex, play different animations. 
        if(this.enemySex === 0){
            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === false &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 1 &&
                    this.playerDefeatedAnimationStage !== 2 &&
                    this.playerDefeatedAnimationStage !== 4 &&
                    this.playerDefeatedAnimationStage !== 6 &&
                    this.playerDefeatedAnimationStage !== 8 &&
                    this.playerDefeatedAnimationStage !== 10 &&
                    this.playerDefeatedAnimationStage !== 12) {

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
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 13 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.maleSlimeDefeatedPlayerAnimation();
        }else{
            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === false &&
                  this.scene.KeyDisplay.visible === true &&
                   this.playerDefeatedAnimationStage !== 1 &&
                   this.playerDefeatedAnimationStage !== 2 &&
                   this.playerDefeatedAnimationStage !== 4 &&
                   this.playerDefeatedAnimationStage !== 6 &&
                   this.playerDefeatedAnimationStage !== 8 &&
                   this.playerDefeatedAnimationStage !== 10) {

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
           if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 11 && this.scene.checkDIsDown())) {
               this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }

           //function to play the defeated animation
           this.femaleSlimeDefeatedPlayerAnimation();
        }

    }

    // plays the slime defeated player animations.
    maleSlimeDefeatedPlayerAnimation() {
        console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {
            this.playSlimeSound('2',800);

            this.playerDefeatedAnimationStageMax = 13;

            if (!this.animationPlayed) {

                this.animationPlayed = true;
                this.anims.play('slimeDefeatedPlayer').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }

        }else if(this.playerDefeatedAnimationStage === 2) {

            this.playSlimeSound('2',800);
            if (!this.animationPlayed) {
                
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLLORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated1').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 3) {

            this.playSlimeSound('4',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y-20,'charBubble',"SQUISH!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }

            this.anims.play('slimeGrabDefeated2', true);

            
        }else if(this.playerDefeatedAnimationStage === 4) {
            this.playSlimeSound('5',800);

            if (!this.animationPlayed) {
                
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated3').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 5) {

            this.playSlimeSound('3',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+30,'charBubble',"WOBBLE");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }

            this.anims.play('slimeGrabDefeated4', true);
            
        }else if(this.playerDefeatedAnimationStage === 6) {

            this.playSlimeSound('5',800);


            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 7) {

            this.playSlimeSound('3',700);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+30,this.y+30,'charBubble',"WOBBLE");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }

            this.anims.play('slimeGrabDefeated6', true);
            
        }else if(this.playerDefeatedAnimationStage === 8) {

            this.playSlimeSound('3',700);

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated7').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 9) {

            this.playSlimeSound('3',700);

            this.playPlapSound('plap10',700);

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

            this.anims.play('slimeGrabDefeated8', true);
            
        }else if(this.playerDefeatedAnimationStage === 10) {
            

            this.playPlapSound('plap8',1000);
            let thisSlime = this;
                setTimeout(function () {
                    thisSlime.playPlapSound('plap6',1000);
                    
                }, 1000);

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated9').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 11) {
            this.playSlimeSound('3',700);
            this.anims.play('slimeGrabDefeated10', true);
            
        }else if(this.playerDefeatedAnimationStage === 12) {
            this.playSlimeSound('5',700);

   
            if (!this.animationPlayed) {
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y-20,'charBubble',"GROAN....");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated11').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 13) {

            this.playSlimeSound('3',700);

            this.anims.play('slimeGrabDefeated12', true);
            
        }


    }

    femaleSlimeDefeatedPlayerAnimation() {
        console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playSlimeSound('2',800);

            this.playerDefeatedAnimationStageMax = 11;

            if (!this.animationPlayed) {

                this.animationPlayed = true;
                this.anims.play('slimeDefeatedPlayer').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }

        }else if(this.playerDefeatedAnimationStage === 2) {
            this.playSlimeSound('5',800);
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLLORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated1').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 3) {

            this.playSlimeSound('3',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+20,'charBubble',"SQUISH!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }

            this.anims.play('slimeGrabDefeated2', true);
            
        }else if(this.playerDefeatedAnimationStage === 4) {

            this.playSlimeSound('5',800);
 
            if (!this.animationPlayed) {
                
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated3').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 5) {
            this.playSlimeSound('3',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+20,'charBubble',"SQUISH!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }

            this.anims.play('slimeGrabDefeated4', true);
            
        }else if(this.playerDefeatedAnimationStage === 6) {

            this.playSlimeSound('5',800);

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 7) {
            this.playSlimeSound('3',800);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY-10,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }
                
            this.anims.play('slimeGrabDefeated6', true);
            
        }else if(this.playerDefeatedAnimationStage === 8) {
            this.playSlimeSound('5',800);
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x+20,this.y-20,'charBubble',"GLOOORRRPP");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);

                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated7').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 9) {
            this.playSlimeSound('3',800);
            this.anims.play('slimeGrabDefeated8', true);
            
        }else if(this.playerDefeatedAnimationStage === 10) {
            this.playSlimeSound('5',800);
            if (!this.animationPlayed) {
                
                this.scene.onomat = new makeText(this.scene,this.x+20,this.y-10,'charBubble',"GROAN...");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);

                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated9').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 11) {
            this.playSlimeSound('3',800);
            this.anims.play('slimeGrabDefeated10', true);
            
        }
    }
   
    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOverAbsorb(){
        this.setSize(240, 180, true);
        this.setOffset(220, 380);
        this.visible = true;
        this.anims.play('absorbGameoverFinish', true);
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

            this.anims.play("slimeGrab",true);
            
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
            this.scene.player1.y = this.y - 150;
            //this.scene.player1.body.setGravityY(0);
            //this.body.setGravityY(0);
            //puts the key display in the correct location.
            this.scene.KeyDisplay.visible = true;
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {
                
            this.playSlimeSound('3',800);
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
