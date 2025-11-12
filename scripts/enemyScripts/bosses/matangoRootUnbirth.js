//base for the boss, seperation for all grab struggle logic functions ect so they dont clutter main script
class matangoRootUnbirth extends enemy {
    
    randomizeInputUnbirth(){

        // randomizing input
        console.log("this.randomInputCooldown: ",this.randomInputCooldown);
        if (this.randomInputCooldown === false) {
            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 3));
            console.log("randomizing the key prompt " + this.randomInput);

            if(this.keyAnimationPlayed === false && this.randomInput === 0) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                console.log(" setting keyS display");
                this.scene.KeyDisplay.playSKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 2) {
                console.log(" setting keyD display");
                this.scene.KeyDisplay.playDKey();
                this.keyAnimationPlayed = true;
            }
            
            let currentEnemy = this;
            setTimeout(function () {
                currentEnemy.randomInputCooldown = false;
                // resets the animation block.
                currentEnemy.keyAnimationPlayed = false;
            }, 2000);
        } 
    }

    playerIsNotDefeatedInputsUnbirth(playerHealthObject){
        // correct keys to escape can be ASD
        
            if(this.scene.checkAPressed() === true) {

                if (this.randomInput === 0) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }
                
                if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                    this.struggleAnimationInterupt = true;
                    this.flipX = false;
                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('unbirthSideStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }
            }else if(this.scene.checkSPressed() === true) {

                if (this.randomInput === 1) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }
                
                if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                    this.struggleAnimationInterupt = true;
                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('unbirthDownStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }
            }else if(this.scene.checkDPressed() === true) {

                if (this.randomInput === 2) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }

                if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 0){
                    this.struggleAnimationInterupt = true;
                    this.flipX = true;
                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('unbirthSideStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }
            }
        
        this.randomizeInputUnbirth();

        this.reduceStruggleCounter();
    }

    playerIsStrugglingLogicUnbirthASM(){

        console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.
        if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            //this.struggleAnimationInterupt = true;

            this.scene.initSoundEffect('lickSFX','5',0.5);

            //need to hide the correct hand on the correct side here.
            if(this.flipX === true){
                this.rightHand.visible = false;
            }else{
                this.leftHand.visible = false;
            }

            this.anims.play('unbirthStart').once('animationcomplete', () => {
                this.startedGrab = true;
                this.animationPlayed = false;

                 //makes the struggle bar visible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                // makes the key prompts visible.
                this.scene.KeyDisplay.visible = true;

                //need to hide the correct hand on the correct side here.
                if(this.flipX === true){
                    this.rightHand.visible = true;
                }else{
                    this.leftHand.visible = true;
                }
            });
            
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true){
            this.anims.play("unbirthIdle", true);
            this.playStomachSound('3',800); 
        }
    }

    playerIsStrugglingLogicUnbirth(playerHealthObject){

        this.playerIsStrugglingLogicUnbirthASM();

        if(this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            //if the player is above 75% health
            if(playerHealthObject.playerHealth >= (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 2 hp damager everys second.
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }
                let currentEnemy = this;
                setTimeout(function () {
                        currentEnemy.playerDamageTimer = false;
                }, 1000);

            }else if(playerHealthObject.playerHealth < (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 2 hp damager everys .8 seconds.
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }

                let currentEnemy = this;
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 800);
            }
        }   
    }

    playerEscapedUnbirth(playerHealthObject){

        this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                //if the palyer is grabbed, and in the tiger stomach
                if(this.playerDefeatedAnimationStage === 0 && this.spitUp === false){

                    this.spitUp = true;

                    //spit up sound effect.
                    this.scene.initSoundEffect('swallowSFX','4',0.02);

                    //play spitup animation
                    this.anims.play("unbirthRelease").once('animationcomplete', () => {
                        //then free player.
                        this.struggleFree = true;
                    });

                }

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                    

            // if the player if freed do the following to reset the player.
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {

                this.flipX = false;
                this.anims.play("tigerIdle");
                this.struggleFree = false;
                this.playerBrokeFree = 0;

                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.player1.visible = true;
                this.isPlayingMissedAnims = false;
                this.grabTimer = false;

                this.startedGrab = false;
                this.playerDefeatedAnimationStage = 0;
                this.struggleAnimationInterupt = false;
                this.spitUp = false;

                this.scene.player1.x = this.x;
                this.scene.player1.y = this.y;
                this.scene.grabbed = false;
                this.scene.KeyDisplay.visible = false;

                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                let currentEnemy = this;
                setTimeout(function () {
                    currentEnemy.grabCoolDown = false;
                    currentEnemy.scene.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1000);
            }
    }

    playerIsDefeatedLogicUnbirth(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
        this.playerDefeated = true;
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        this.scene.enemyThatDefeatedPlayer = bestiaryKey.matangoRootFemaleUnbirth;

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
            this.playerDefeatedAnimationStage !== 5 &&
            this.playerDefeatedAnimationStage !== 6 &&
            this.playerDefeatedAnimationStage !== 8) {

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
        if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {

            this.scene.KeyDisplay.visible = false;
            console.log("changing scene");

            if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                this.scene.sound.get("plapSFX").stop();
            }

            this.scene.changeToGameover();
        }

        //function to play the defeated animation
        this.enemyDefeatedPlayerAnimationUnbirth();

        // same code but for the large enemy if it beats the player.

    }

    enemyDefeatedPlayerAnimationUnbirth(){

        if (this.playerDefeatedAnimationStage === 1) {
            
        }
    }

    


}
