

//implementation for the blue enemy enemy.
class mushroomDefeat extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 20, 'mushroomDefeat');


         this.setDepth(4);
         this.body.enable = false;
         this.direction = "right";

        //defines Enemy animations based on the players sex.
        if (sex === 0) {
           
        }else{

            this.anims.create({ key: 'smallMushOnHead', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'headSwallow', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 4, end: 10 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'headSucking', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 11, end: 14 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'bodySwallow', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 15, end: 21 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'sexDance', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 22, end: 33 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'fullAbsorb', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 34, end: 37 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeMushIdle', frames: this.anims.generateFrameNames('evelyn-mushroom-tf', { start: 38, end: 41 }), frameRate: 7, repeat: -1 });

        }
    
        this.inSafeMode = inSafeMode;

       this.visible = false;

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight1 = this.scene.lights.addLight(this.x,this.y-30, 40, 0xb317ff);
            this.curseLight1.visible = false;

            //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.curseLight1,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });

            //also sets up the curse light for if the player is cursed.
            this.curseLight2 = this.scene.lights.addLight(this.x,this.y-30, 70, 0xb317ff);
            this.curseLight2.visible = false;

            //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.curseLight2,
                    props : {
                        radius: {value : '+=' +20},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
          }

    }

    //no move is needed for passive defeat
    move() {
     
    }

    //functioned called to play animation when the player is defeated by the passive enemy in gameover.
    enemyGameOver() {

        //have player appear as root mushroom with there offshoots being active. 
        this.setSize(100, 150, true);
        this.setOffset(90, 150);
        this.anims.play('enemyGameOver', true);
    }

    //the grab function. is called when player has overlaped with an enemy enemy.
    grab(){ 
        let currentEnemy = this;
        //first checks if enemy object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.enemyGrabFalse();

        } else if (this.playerGrabbed === true) {

            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null,
                playerMaxHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            this.enemyGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //logic for player defeat.
           

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

    //simple function to set a few thing when grab is started
    enemyGrabFalse(){
        //hides player object during grab.
        this.scene.player1.visible = false;
        
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

        //set the player grabbed in this enemy to true
        this.playerGrabbed = true;

        //also set the x and y of this object to the players x y
        this.x = this.scene.player1.x;
        this.y = this.scene.player1.y;

        //turn on the light. 
        this.curseLight1.visible = true;
        this.curseLight1.x = this.x
        this.curseLight1.y = this.y-30;

        this.curseLight2.visible = true;
        this.curseLight2.x = this.x
        this.curseLight2.y = this.y-30;

        this.scene.player1.lightSource.visible = false;
        
        this.visible = true;
    }

    enemyGrabTrue(playerHealthObject){

        this.setVelocityX(0);
        
        //puts the key display in the correct location.
        this.scene.player1.y = this.y - 150;
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;
    
    }

    playerIsDefeatedLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

            this.scene.enemyThatDefeatedPlayer = "mushroomDefeat";

            // if we start the player defeated animation then we need to set a few things.
            ///HERE! NEEDS TO CHECK FI PALYER DEFEATED, TO START THE DEFEATED PROGRESSION AND SETTING OF KEYPROMPTS, LOCKS OUT SO IT ONLY HAPPENS ONCE. 
            //CANT USE STAGE TO CHECK BECAUSE IF WE PROGRESS THEN IT WILL BREAK THINGS IF THIS ACTIVATES CONSTANTLY. LIKE WHAT HAPPENED WHEN I TRYED.
            if (this.inStartDefeatedLogic === false) {

                this.scene.KeyDisplay.playDKey();
                let currentEnemy = this; // important, sets currentEnemy to the current object so that we can use variables attached to this current enemy object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentEnemy.scene.KeyDisplay.visible = true;
                    currentEnemy.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentEnemy.playerDefeatedAnimationStage: " + currentEnemy.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                if(this.playerDefeatedAnimationStage === 0){
                    this.playerDefeatedAnimationStage++;
                }
                //this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 2 &&
                     this.playerDefeatedAnimationStage !== 4 &&
                      this.playerDefeatedAnimationStage !== 6) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
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
            console.log()
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 7 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                    this.scene.sound.get("plapSFX").stop();
                }
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.enemyDefeatedPlayerAnimation();

        // same code but for the large enemy if it beats the player.


    }


    //plays the enemy defeated player animations.
    enemyDefeatedPlayerAnimation() {
        let currentEnemy = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 7;
            this.anims.play("smallMushOnHead",true);

         
        }else if (this.playerDefeatedAnimationStage === 2) {

            if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('headSwallow').once('animationcomplete', () => {

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });

            }
           

         
        }else if (this.playerDefeatedAnimationStage === 3) {

            this.anims.play("headSucking",true);

         
        }else if (this.playerDefeatedAnimationStage === 4) {

            if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('bodySwallow').once('animationcomplete', () => {

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });

            }


         
        }else if (this.playerDefeatedAnimationStage === 5) {

             if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('sexDance').once('animationcomplete', () => {

                    this.flipX = !this.flipX;
                    this.animationPlayed = false;

                });

            }

         
        }else if (this.playerDefeatedAnimationStage === 6) {

            if (!this.animationPlayed) {

                this.animationPlayed = true;

                this.anims.play('fullAbsorb').once('animationcomplete', () => {

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });

            }

         
        }else if (this.playerDefeatedAnimationStage === 7) {

            this.anims.play("largeMushIdle",true);

         
        }

    }

    //function to show off animation 
    animationGrab(){

        let currentRabbit = this;
        //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);

        //
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;

            this.scene.gameoverLocation = "forestGameover";

            

        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //plays jumpy sound during grab.
            if (this.playerProgressingAnimation === false && this.rabbitIsHungry === false) {
                this.playJumpySound('3',700);
            }

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
         
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 100;

                if(this.rabbitIsHungry === true){
                    
                    if (!this.animationPlayed && this.struggleAnimationInterupt === false) {

                    console.log("the animation has not been played");
                    this.animationPlayed = true;
                    this.scene.initSoundEffect('swallowSFX','2',0.6);
                    
                    //this.scene.onomat.destroy();
                    this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.increaseRight(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);
                    
                    this.anims.play('rabbitHungerSwallow1').once('animationcomplete', () => {
                        console.log("animation finished");
                        this.scene.initSoundEffect('swallowSFX','3',0.6);

                        this.anims.play('rabbitHungerSwallow2').once('animationcomplete', () => {

                            this.scene.initSoundEffect('swallowSFX','3',0.6);

                            this.anims.play('rabbitHungerSwallow3').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.playerDefeatedAnimationStage++;
                                this.inStartDefeatedLogic = false;
                                this.playerProgressingAnimation = true;
                                this.playerDefeatedAnimationStageMax = 5;
                                console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
        
                            });
                        });
                    });
                    
                }
                }else{

                    this.anims.play("rabbitGrab",true);
                    //handles sound effect diring grab struggle
                    this.playJumpySound('2',700);
                }
                

            // handles input for progressing animation
            if (this.scene.checkDPressed() === true && this.rabbitIsHungry === false) {
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
                
                //calls animation grab code until the animation is finished                     //additional case since the female has one less animation stage with the male rabbit.
                console.log("this.scene.playerSex: ",this.scene.playerSex,"  this.playerDefeatedAnimationStage: ", this.playerDefeatedAnimationStage, " this.playerDefeatedAnimationStageMax: ",this.playerDefeatedAnimationStageMax);
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax || ( this.enemySex === 0 && this.scene.playerSex === 1 && this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax+1)){
                    //handle the defeated logic that plays defeated animations 
                    if(this.rabbitIsHungry === false){
                        this.playerIsDefeatedLogic(playerHealthObject);
                    }else{
                        this.playerIsDefeatedVoreLogic(playerHealthObject);
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
