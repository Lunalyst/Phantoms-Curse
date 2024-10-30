

//implementation for the blue slime enemy.
class blueSlimeHM extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        //super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
        //on set up, need to decide if bat is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHF');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHF');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHM');
                this.enemySex = 0;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        this.randomInput = Math.floor((Math.random() * 2));

        this.largeSlimeDamageCounter = false;
        this.body.bounce.x = 1;

        this.slimeSoundCoolDown = false;

        this.slimeSoundsArray = ['1','2','3','4','5'];
        this.randomSlimeSound = Math.floor((Math.random() * 4));

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(20,10,true);

        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;
        this.grabTimer = false;
        this.hitboxActive = false;
        this.throwSlimeTimer = false;
        this.throwingSlime = false;

        console.log("this.enemySex: ",this.enemySex," sex ", sex);

        //defines Slime animations based on the players sex.
        if (this.enemySex === 0) {
            this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeMove', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 4, end: 9 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeThrowSlimeStart', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 10, end: 12 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeThrowSlimeEnd', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 13, end: 16 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeMoveHiding', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 17, end: 20 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeHidingAmbushStart', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 20, end: 31 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeHidingAmbushMiss', frames: this.anims.generateFrameNames('blue-slime-HM', { start: 32, end: 35 }), frameRate: 8, repeat: 0 });
            
            if(sex === 0 ){

            }else{
  
            }

            } else {
                console.log("creating female slime animations");
                this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeMove', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 4, end: 9 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeThrowSlimeStart', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 10, end: 12 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeThrowSlimeEnd', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 13, end: 16 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeHiding', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 17, end: 17 }), frameRate: 3.5, repeat: 0 });
                this.anims.create({ key: 'slimeMoveHiding', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 17, end: 20 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'slimeHidingAmbushGrab', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 20, end: 31 }), frameRate: 15, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabStart', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 28, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'slimeAttemptingGrabMiss', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 32, end: 35 }), frameRate: 8, repeat: 0 });
                if(sex === 0 ){
                    this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 36, end: 39 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 44, end: 51 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 52, end: 55 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 56, end: 60 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 61, end: 64 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 65, end: 68 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 69, end: 83 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 84, end: 96 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated8', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 97, end: 100 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'slimeGrabDefeated9', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 101, end: 107 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'slimeGrabDefeated10', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 108, end: 111 }), frameRate: 8, repeat: -1 });
                }else{
                    
                }

                this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('blue-slime-HF', { start: 112, end: 115 }), frameRate: 8, repeat: -1 }); 
            }

        this.inSafeMode = inSafeMode;
        
        if(this.inSafeMode === true){
            this.isLurking = false; 
            this.anims.play('slimeIdle',true);
        }else{
            this.isLurking = true;
            this.anims.play('slimeHiding',true);  
        }

        //if the slime is of size 1 then set its hit box to the correct size
        this.setSize(90, 100, true);
        this.setOffset(80, 210);

        this.body.setGravityY(600);

    }

    //functions that move slime objects.
    move() {

        this.setSize(90, 100, true);
        this.setOffset(80, 210);

        this.body.setGravityY(600);

        if(this.scene.player1.x > this.x - 600 && this.scene.player1.x < this.x + 600){
            //checks to see if enemy is in range of player
            //console.log("player within range");
            if (this.isLurking === true) {

                //move the 
                if((this.scene.player1.x + 10 > this.x   && this.scene.player1.x - 10 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false)){
                    
                    //play animation
                    this.setVelocityX(0);
                    this.grabTimer = true;
                    this.anims.play('slimeHidingAmbushGrab').once('animationcomplete', () => {
                        
                        
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                        //controls the x velocity when the bee ischarging to grab the player
                           
                    });

                }else if(this.attemptingGrab === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.isLurking = false;
                        this.anims.play('slimeAttemptingGrabMiss').once('animationcomplete', () => {
                            //set butt slamming to false
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false; 
                            this.hitboxActive = false;   
                        });
                    }

                }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false&& this.grabTimer === false) {
                    console.log("moving slime right");            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    
                    this.flipX = false;
                    this.anims.play('slimeMoveHiding', true);
                    this.setVelocityX(200); 
            
                //if the player is to the right then move enemy to the left
                } else if (this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false) {
                    console.log("moving slime left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.anims.play('slimeMoveHiding', true);
                    this.setVelocityX(200*-1); 
                    
                //if the medium humanoid slime is within range to grabb the player, then 
                }

            }else if(this.isLurking === false){
                console.log("this.attemptingGrab: ",this.attemptingGrab," this.grabTimer: ",this.grabTimer," this.throwingSlime: ",this.throwingSlime," this.throwSlimeTimer: ",this.throwSlimeTimer); 

                if((this.scene.player1.x + 10 > this.x   && this.scene.player1.x - 10 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false) && this.throwingSlime === false){
                        
                    //play animation
                    this.setVelocityX(0);
                    this.grabTimer = true;
                    this.throwingSlime = false;
                    this.anims.play('slimeAttemptingGrabStart').once('animationcomplete', () => {
                        
                        
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                        //controls the x velocity when the bee ischarging to grab the player
                        
                    });

                }else if(this.attemptingGrab === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.isLurking = false;
                        this.anims.play('slimeAttemptingGrabMiss').once('animationcomplete', () => {
                        
                            this.hitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;    
                        });
                    }
                }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingSlime === false) {
                    console.log("moving slime right");            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    
                    this.flipX = false;

                    //if we can throw slime
                    if(this.throwSlimeTimer === false && this.throwingSlime === false){
                        this.throwingSlime = true;
                        this.throwSlimeTimer = true;
                        this.setVelocityX(0);
                        //play starting animation
                        this.anims.play('slimeThrowSlimeStart').once('animationcomplete', () => {
                            
                            //spawn projectile
                            this.scene.initSlimeProjectile(this.x,this.y-40,400,200);
                            //play finishing animation
                            this.anims.play('slimeThrowSlimeEnd').once('animationcomplete', () => {

                                this.throwingSlime = false;
                                this.throwingSlimeTimer = true;
                                let tempSlime = this;
                                setTimeout(function () {
                                    tempSlime.throwSlimeTimer = false;
                                },Math.floor(Math.random() * (5000-1500) + 1500) );
 
                            });
   
                        });
                
                    }else{
                        this.anims.play('slimeMove', true);
                        this.setVelocityX(140); 
                    }
            
                //if the player is to the right then move enemy to the left
                } else if (this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingSlime === false) {
                    console.log("moving slime left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    //if we can throw slime
                    if(this.throwSlimeTimer === false && this.throwingSlime === false){
                        this.throwingSlime = true;
                        this.throwSlimeTimer = true;
                        this.setVelocityX(0);
                        //play starting animation
                        this.anims.play('slimeThrowSlimeStart').once('animationcomplete', () => {
                            
                            //spawn projectile
                            this.scene.initSlimeProjectile(this.x,this.y-40,-400,200);
                            //play finishing animation
                            this.anims.play('slimeThrowSlimeEnd').once('animationcomplete', () => {

                                this.throwingSlime = false;
                                this.throwingSlimeTimer = true;
                                let tempSlime = this;
                                setTimeout(function () {
                                    tempSlime.throwSlimeTimer = false;
                                },Math.floor(Math.random() * (5000-1500) + 1500) );
 
                            });
   
                        });
                
                    }else{
                        this.anims.play('slimeMove', true);
                        this.setVelocityX(-140); 
                    }
                    
                //if the medium humanoid slime is within range to grabb the player, then 
                }
                
            }
        }

        if(this.hitboxActive === true){
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y;
        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }

        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }


    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveIdle() {
        //this.setSize(90, 65, true);
        //this.setOffset(105, 233);
        this.anims.play('slimeIdle', true);
        //this.setSize(90, 65, true);
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    // functioned called to play animation when the player is defeated by the slime in gameover.
    slimeGameOver() {
        this.setSize(90, 100, true);
        this.setOffset(80, 210);
        this.lurking = false;
        this.anims.play('slimeGameOver', true);
    }

    //the grab function. is called when player has overlaped with an enemy slime.
    grab(){
        let currentSlime = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.slimeGrabFalse();

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

            //logic for when the player is grabbed
            this.slimeGrabTrue(playerHealthObject);

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
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else  if(playerHealthObject.playerHealth === 0){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            
        }

    }

    slimeGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this slime did not grab the player this.slimeID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

            // check to make sure animations dont conflict with eachother.
            if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                this.anims.play("slimeGrab", true);
            }
            // when entering grabs sets offset correctly so play isn't clipping through the ground. or clips through the ground falling nito the void
            //this.setOffset(40,129);
        
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    slimeGrabTrue(playerHealthObject){

        //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;
        this.scene.player1.body.setGravityY(0);
        //this.body.setGravityY(0);
        this.scene.player1.setSize(10, 10, true);
        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
        // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
        if (this.playerDamaged === false && playerHealthObject.playerHealth > 0) {
            //hpBar.calcDamage(1);
            healthEmitter.emit(healthEvent.loseHealth,1)
            console.log('return value of health emitter: ', playerHealthObject.playerHealth);
            this.playerDamaged = true;
        }
    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.

        let currentSlime = this;

            // important anims.play block so that the animation can player properly.
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyA) === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 25;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }
    
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }
        

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
        if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            setTimeout(function () {
                currentSlime.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }

        //handles sound effect diring grab struggle
        this.playSlimeSound('3',800);
    }

    playerIsStrugglingLogic(){

        let currentSlime = this;

         if ( this.largeSlimeDamageCounter === false ) {
            this.largeSlimeDamageCounter = true;
            //hpBar.calcDamage(2);
            healthEmitter.emit(healthEvent.loseHealth,2)
            setTimeout(function () {
                currentSlime.largeSlimeDamageCounter = false;
            }, 2000);
            // if the player has been defeated the do the following steps.
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
            this.scene.enemyThatDefeatedPlayer = "blueSlimeFemaleHM";
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
            if (this.scene.keyD.isDown &&
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
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 11 && this.scene.keyD.isDown)) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.femaleSlimeDefeatedPlayerAnimation();
        
    }

    playerEscaped(playerHealthObject){

        let currentSlime = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                // handles the breaking free animation.
                if (!this.animationPlayed) {
                    this.animationPlayed = true;
                    //this.anims.play('slimeGrabBreak').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        currentSlime.struggleFree = true;
                    //});
                }
                // if the player if freed do the following to reset the player.
            } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
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

                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                this.scene.startGrabCoolDown();
                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                this.scene.player1.visible = true;
                this.scene.player1.setSize(23, 68, true);
                this.scene.player1.body.setGravityY(600);
                this.body.setGravityY(600);
                this.scene.player1.x = this.x;
                this.scene.player1.y = this.y;
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                currentSlime = this;
                setTimeout(function () {

                    currentSlime.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }
   
    // controls the damage resistance of the slime.
    damage() {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
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

                this.playSlimeSound('5',200);
                
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
    //handles damage types for blue slime. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 4);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 3);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 2);
        }
        if (heat > 0) {
            this.enemyHP -= (heat / 4);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning * 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 4);
        }
    }

    // plays the slime defeated player animations.
    femaleSlimeDefeatedPlayerAnimation() {
        console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {

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
            //this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated1').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 3) {

            this.anims.play('slimeGrabDefeated2', true);
            
        }else if(this.playerDefeatedAnimationStage === 4) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated3').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 5) {

            this.anims.play('slimeGrabDefeated4', true);
            
        }else if(this.playerDefeatedAnimationStage === 6) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 7) {

            this.anims.play('slimeGrabDefeated6', true);
            
        }else if(this.playerDefeatedAnimationStage === 8) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated7').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 9) {

            this.anims.play('slimeGrabDefeated8', true);
            
        }else if(this.playerDefeatedAnimationStage === 10) {

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated9').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 11) {

            this.anims.play('slimeGrabDefeated10', true);
            
        }


    }
    
    //plays slime sound based in type input being 1-5 and a time delay
    playSlimeSound(type,delay){
        if(this.slimeSoundCoolDown === false){
            this.scene.initSoundEffect('blueSlimeSFX',type,0.3);
            this.slimeSoundCoolDown = true;
    
            let currentSlime = this;
            setTimeout(function () {
                currentSlime.slimeSoundCoolDown= false;
            }, delay);
        }

    }

    //function to show off animation 
    animationGrab(){
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
            
        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
        
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            this.scene.player1.y = this.y - 150;
            this.scene.player1.body.setGravityY(0);
            //this.body.setGravityY(0);
            this.scene.player1.setSize(10, 10, true);
            //puts the key display in the correct location.
            this.scene.KeyDisplay.visible = true;
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

            // handles input for progressing animation
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyD) === true) {
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
