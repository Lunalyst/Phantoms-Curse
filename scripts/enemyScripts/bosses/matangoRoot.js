

//implementation for the blue enemy enemy.
class mantangoRoot extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
    
         if(scene.preferance === 0){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 0){
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
                this.enemySex = 0;
            }else{
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
                this.enemySex = 1;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.collision = 170;
        this.isHiding = true;
        this.inEmergingAnimation = false;
        this.poppedOut = false;
        this.enemyHP = 200;
        this.turning = false;
        this.idleState = 0;
        this.rootNode = null; 
        this.startedFight = false;

        this.visible = false;

        //defines Enemy animations based on the players sex.
        if (this.enemySex === 0) {

        }else{
            this.anims.create({ key: 'popout', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 0, end: 6 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'rawr', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 7, end: 15 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'forwardIdleEyesForward', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 16, end: 21 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'forwardIdleEyesDown', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 22, end: 27 }), frameRate:  10, repeat: 0 });

            this.anims.create({ key: 'from0to1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 28, end: 29 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from1to0-1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 29, end: 29 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from1to0-2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 28, end: 28 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'AngleIdle', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 30, end: 35 }), frameRate: 10, repeat: 0 });

            this.anims.create({ key: 'from1to2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 36, end: 37 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from2to1-1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 37, end: 37 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from2to1-2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 36, end: 36 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'sideIdle', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 38, end: 43 }), frameRate:  10, repeat: 0 });
           
           
        }
       
        this.inSafeMode = inSafeMode;

        if(this.inSafeMode === false){
            this.rightHand = new mushroomHandSingle(this.scene,this.x+80, this.y+48, false);
            this.leftHand = new mushroomHandSingle(this.scene,this.x-80, this.y+48, true);

        }

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-20, 150, 0xb317ff);
            this.curseLight.intensity = 1.5;
            this.curseLight.visible = false;
        
          }
        

    }

    //functions that move enemy objects.
    move() {
        //set hitbox to correct size
        this.setSize(240, 180, true);
        this.setOffset(220, 380);

        //if the mushroom has not awoken and the player in in range
        if(this.checkXRangeFromPlayer(100, 100) && this.checkYRangeFromPlayer(100,100) && this.startedFight === false){
            this.startedFight = true;
        }else if(this.poppedOut === false && this.inEmergingAnimation === false && this.startedFight === true){

            this.inEmergingAnimation = true;
            this.curseLight.visible = true;
            this.visible = true;

            //hide root node object
            this.rootNode.visible = false;
            this.rootNode.curseLight.visible = false;
            this.rootNode.activateMushroomBarriers();

            this.scene.initSoundEffect('growSFX','2',0.1);
            this.scene.sound.get("slowMyceliumSFX").stop();

            this.rightHand.handRise();
            this.leftHand.handRise();
  
            this.anims.play('popout').once('animationcomplete', () => {
                
                this.scene.initSoundEffect('bossRoarSFX','roar',0.1);

                this.anims.play('rawr').once('animationcomplete', () => {

                    this.anims.play('forwardIdleEyesForward',true);
                    this.scene.initSoundEffect('bossSFX','bossStart',0.1);

                    //after animation of mushroom appearing we need to set up boss healthbar in the hud.
                    //start by setting boss hp name and making it visible.
                    let healthObject = {
                        bossName: "Matango Root",
                        bossHealth: this.enemyHP,
                        bossMaxHealth: this.enemyHP,
                    };

                    healthEmitter.emit(healthEvent.setBossHealth,healthObject);
                    healthEmitter.emit(healthEvent.setBossHealthVisible,true);
                    this.poppedOut = true;

                    //play boss theme after a half second
                    let mush = this;
                    setTimeout(function () {
                        mush.scene.initLoopingSound('battleMyceliumSFX','theme', 0.1,"music");
                    }, 500);

                });

            });
            
        }else if(this.poppedOut === true){
            
            //console.log("this.turning: ", this.turning," this.idleState: ", this.idleState,);
            if(this.turning === false){
                this.turning = true;

                if(this.scene.player1.x > this.x){
                    this.flipX = true;
                }else{
                    this.flipX = false;
                }
                //first two checks represent state 0 for idle animation
                if(this.checkXRangeFromPlayer(50, 50) && this.checkYRangeFromPlayer(50,60) ){


                    if(this.idleState === 0){
                        
                        this.anims.play('forwardIdleEyesDown',true).once('animationcomplete', () => {
                            this.turning = false;
                        });

                    }else if(this.idleState === 1){

                        this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                            this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                this.idleState = 0;
                                this.turning = false;
                            });
                        });
                        
                    }else if(this.idleState === 2){

                        this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                            this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                    this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                        this.idleState = 0;
                                        this.turning = false;
                                    });
                                });
                            });
                        });
                    }
                }else if(this.checkXRangeFromPlayer(50, 50) && this.checkYRangeFromPlayer(200,200)){

                    if(this.idleState === 0){

                        this.anims.play('forwardIdleEyesForward',true).once('animationcomplete', () => {
                            this.turning = false;
                        });


                    }else if(this.idleState === 1){

                        this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                            this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                this.idleState = 0;
                                this.turning = false;
                            });
                        });
                        
                    }else if(this.idleState === 2){

                        this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                            this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                    this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                        this.idleState = 0;
                                        this.turning = false;
                                    });
                                });
                            });
                        });
                    }

                //state 1 resembles angled animation but we need to play turn animation first.
                }else if(this.checkXRangeFromPlayer(120, 120)){

                    //if the previous state was zero then
                    if(this.idleState === 0){
                        //do turn animation from center to angle.
                        this.anims.play('from0to1',true).once('animationcomplete', () => {
                            this.idleState = 1;
                            this.turning = false;
                        });

                    }else if(this.idleState === 1){
                        this.anims.play('AngleIdle',true).once('animationcomplete', () => {
                            this.turning = false;
                        });
                    }else if(this.idleState === 2){
                        //do turn animation from center to angle.
                        this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                            this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                this.idleState = 1;
                                this.turning = false;
                            });
                        });
                    }
                //state 2
                }else if(this.checkXRangeFromPlayer(400, 400)){

                    //if the previous state was zero then
                    if(this.idleState === 0){
                        //do turn animation from center to angle.
                        this.anims.play('from0to1',true).once('animationcomplete', () => {
                            this.anims.play('from1to2',true).once('animationcomplete', () => {
                                this.idleState = 2;
                                this.turning = false;
                            });
                        });

                    }else if(this.idleState === 1){

                        this.anims.play('from1to2',true).once('animationcomplete', () => {
                            this.idleState = 2;
                            this.turning = false;
                        });
                        
                    }else if(this.idleState === 2){
                        this.anims.play('sideIdle',true).once('animationcomplete', () => {
                            this.turning = false;
                        });
                    }
                }
            }
            
            
            

        }

        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

    
        if(this.isHiding === false && this.inEmergingAnimation === false){

            //then play animation and go back to the hiding state.

            this.inEmergingAnimation = true;
            this.anims.play('becomeHidden').once('animationcomplete', () => {

                this.isHiding = true;
                this.inEmergingAnimation = false;
                this.anims.play('hiding',true);
                this.lightSource.radius = 90;
                this.lightSource.intensity = 0.7;
                    
            });
            this.setDepth(4);
        }
        

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOver() {
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

            //console.log("playerHealthObject: ",playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //puts the key display in the correct location.
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;

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
            if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
                
                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
                
                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            //console.log("playerHealthObject",playerHealthObject);
            
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
    }

    //function handles the player struggle buttons
    playerIsNotDefeatedInputs(playerHealthObject){

        let currentEnemy = this;

            // important anims.play block so that the animation can player properly.

            if (this.scene.checkAPressed() === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (this.enemySize === 1 && playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 25;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }else if(this.scene.checkDPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
                if (playerHealthObject.playerHealth >= 1) {

                    //makes sure the struggle bar does not go into the negitives
                    if(this.struggleCounter - 5 > 0){
                        this.struggleCounter -= 5;
                    }else{
                        this.struggleCounter = 0;
                    }
                    
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }

        }

        // randomizing input
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }
        

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            setTimeout(function () {
                currentEnemy.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }

    }

    //function to handle player health loss.
    playerIsStrugglingLogic(playerHealthObject){

        let currentEnemy = this;

            this.playerDamageTimer = true;

            //if the players health is above half, then deal hp damage.
            if(playerHealthObject.playerHealth >= playerHealthObject.playerMaxHealth/2){

                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 2000);

            }else if(playerHealthObject.playerCurse <= (playerHealthObject.playerCurseMax)/2){
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 1500);
            }else{
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 1000);
            }
            
            // if the player has been defeated the do the following steps.

        // if its a small enemy then play the small enemy grab animation.
        

            //if the player isnt defeated.
            if(this.playerDefeated === false ){

                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeatedAnimationStage === 0  ) {
                    this.anims.play("enemyGrab", true);
                    //handles sound effect diring grab struggle
                    this.playEnemySound('3',800);

                //if the defeated stage is incremented, then play the animation of the player falling. need to pause damage, as well as the player ability to struggle.
                }else if(this.playerDefeatedAnimationStage === 1 && this.animationPlayed === false){
                    this.animationPlayed = true;
                    this.anims.play("enemyGrabFallingDefeated", true).once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.playerDefeatedAnimationStage++;
                    });
                }else if(this.playerDefeatedAnimationStage === 3){
                    this.anims.play("enemyGrabDefeated2", true);
                    this.playPlapSound('plap10',2000);
                    
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisEnemy = this;
                        setTimeout(function () {
                            thisEnemy.onomatPlayed = false;
                            
                        }, 600);
                    }
                    
                }else if(this.playerDefeatedAnimationStage === 4){
                    this.anims.play('enemyGrabDefeated3', true);
                    this.playEnemySound('3',600);
                    this.playPlapSound('plap9',1000);
        
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisEnemy = this;
                        setTimeout(function () {
                            thisEnemy.onomatPlayed = false;
                            
                        }, 600);
                    }
                }

                //case to progress defeated stage, soo that we can have different struggle animations.
                //in this case, if the player health is less than half there max health and the stage is 0
                if(playerHealthObject.playerHealth < playerHealthObject.playerMaxHealth/2 && this.playerDefeatedAnimationStage === 0){
                    //increment the stage so behavior changes.
                    this.playerDefeatedAnimationStage++;
                }else if(playerHealthObject.playerCurse > (playerHealthObject.playerCurseMax)/2 && this.playerDefeatedAnimationStage === 3){
                    this.playerDefeatedAnimationStage++;
                }
            }
               
    }

    playerIsDefeatedLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

            this.scene.enemyThatDefeatedPlayer = "mushroom";

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
                this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 5 &&
                     this.playerDefeatedAnimationStage !== 6 &&
                      this.playerDefeatedAnimationStage !== 8) {

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
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {
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

    playerEscaped(playerHealthObject){

        let currentEnemy = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
 
                this.animationPlayed = false;
                currentEnemy.struggleFree = true;

            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.anims.play("enemyIdle", true);
                

                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(90, 65, true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.playerDefeatedAnimationStage = 0;

                if( this.scene.internalView !== null && this.scene.internalView !== undefined){
                    this.scene.internalView.destroy();
                }

                //stops sound effect if it exists
                if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                    this.scene.sound.get("plapSFX").stop();
                }
                
               
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
                currentEnemy = this;
                setTimeout(function () {

                    currentEnemy.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    // controls the damage resistance of the enemy.
    damage() {
  
        if (this.damageCoolDown === false && this.poppedOut === true) {
            this.damageCoolDown = true;
            this.playJumpySound('3',100);
            this.setTint(0xff7a7a);
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
                
                //if the enemys hp is at zero
                if (this.enemyHP <= 0) {
                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    //this.setVelocityX(0);
                    
                }

            //else if the mushroom has been defeated
            }

            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;

            setTimeout(function () {
                that.damageCoolDown = false;
                console.log("damage cool down:" + that.damageCoolDown);
                that.clearTint();
            }, 500);
        }
    }

    //handles damage types for blue enemy. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        let prevHp = this.enemyHP;
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice * 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 2);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 4);
        }
        if (heat > 0) {
            this.enemyHP -= (heat);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning / 4);
        }
        if (cold > 0) {
            this.enemyHP -= (cold );
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }

        //update the boss hp bar
        healthEmitter.emit(healthEvent.loseBossHealth,prevHp-this.enemyHP);

    }

    // plays the enemy defeated player animations.
    enemyDefeatedPlayerAnimation() {
        let currentEnemy = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 2;

            if (!this.animationPlayed) {
                this.playEnemySound('2',800);
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('enemyGrabFallingDefeated').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('enemyGrabDefeated1', true);
            this.playEnemySound('2',800);

            let thisEnemy = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisEnemy.onomatPlayed = false;
                }, 800);
            }
        } 


    }

    //function to show off animation 
    animationGrab(){
        console.log(' activating enemy view grab logic');
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
            this.setDepth(5);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
        
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 100;
                
                //here is where animation for grab and grab sf should be played for grab animation.
               
                //play struggle animation and sounds.
                this.anims.play("enemyGrab",true);
                
                //handles sound effect diring grab struggle
                this.playEnemySound('3',800);
                

                // handles input for progressing animation
                if (this.scene.checkDPressed() === true) {
                    this.playerProgressingAnimation = true;
                    this.playerDefeatedAnimationStage = 0;
                }

                // displays inputs while in the first stage of the animation viewing.
                if (this.keyAnimationPlayed === false) {
                    //console.log(" setting keyW display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }      
            }

            if(this.playerProgressingAnimation === true){
                
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
