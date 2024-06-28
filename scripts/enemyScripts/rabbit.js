/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://docs.idew.org/video-game/project-references/phaser-coding/enemy-behavior
// example enemy behaviors
*/

//import { decreaseHealth } from "./uiScripts/events";

//how to use once and a promise for animations completing.
//https://stackoverflow.com/questions/71490140/phaser-3-play-animation-after-previous-animation-finished
//https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#once__anchor

//at higher hrtz rates breaks the rabbitgrab function. needs to be redone again. fuck.

//implementation for the blue rabbit enemy.
class rabbit extends enemy {
    
    constructor(scene, xPos, yPos, sex, id) {
        
        //on set up, need to decide if rabbit is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the rabbit.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
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

        this.randomInputCooldown = false;
        this.rabbitSoundCoolDown = false;
        this.jumpAnimationPlayed = false;
        this.rabbitDamageCounter = false;

        //defines rabbit animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbitMale', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopRightStart', frames: this.anims.generateFrameNames('rabbitMale', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopRightInAir', frames: this.anims.generateFrameNames('rabbitMale', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopLeftStart', frames: this.anims.generateFrameNames('rabbitMale', { start: 11, end: 13 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopLeftInAir', frames: this.anims.generateFrameNames('rabbitMale', { start: 14, end: 15 }), frameRate: 8, repeat: 0 });
            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbitMale', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbitMale', { start: 21, end: 25 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbitMale', { start: 25, end: 28 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbitMale', { start: 29, end: 39 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbitMale', { start: 39, end: 42 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbitMale', { start: 39, end: 42 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbitMale', { start: 39, end: 42 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbitMale', { start: 42, end: 55 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbitMale', { start: 56, end: 59 }), frameRate: 6, repeat: -1 }); 
            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbitMale', { start: 60, end: 63 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbitMale', { start: 64, end: 68 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbitMale', { start: 68, end: 71 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbitMale', { start: 72, end: 82 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbitMale', { start: 82, end: 85 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbitMale', { start: 82, end: 85 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbitMale', { start: 82, end: 85 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbitMale', { start: 85, end: 100 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbitMale', { start: 101, end: 104 }), frameRate: 6, repeat: -1 }); 
            }
             
        }else{
            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbitFemale', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopRightStart', frames: this.anims.generateFrameNames('rabbitFemale', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopRightInAir', frames: this.anims.generateFrameNames('rabbitFemale', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopLeftStart', frames: this.anims.generateFrameNames('rabbitFemale', { start: 11, end: 13 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopLeftInAir', frames: this.anims.generateFrameNames('rabbitFemale', { start: 14, end: 15 }), frameRate: 8, repeat: 0 });
            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbitFemale', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbitFemale', { start: 21, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbitFemale', { start: 31, end: 34 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbitFemale', { start: 31, end: 34 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbitFemale', { start: 31, end: 34 }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbitFemale', { start: 35, end: 44 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbitFemale', { start: 45, end: 48}), frameRate: 6, repeat: -1 }); 
            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbitFemale', { start: 49, end: 52 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbitFemale', { start: 53, end: 63 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbitFemale', { start: 64, end: 67 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbitFemale', { start: 64, end: 67 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbitFemale', { start: 64, end: 67  }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbitFemale', { start: 68, end: 76 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbitFemale', { start: 77, end: 80}), frameRate: 6, repeat: -1 }); 
            }
            
        }
    }

    //functions that move rabbit objects.
    move() {
        

        this.body.setGravityY(600);
        //else if the rabbit is size 2 then set its hit box to the correct size

        //checks to see if rabbit should jump to move if the player is in range
        if (this.scene.player1.x > this.x - 300 && this.scene.player1.x < this.x + 300) {
            // sets hitbox and position of hitbox.
            this.setSize(70, 180, true);
            this.setOffset(180, 110);
            //checks to see if rabbit should jump to move if the move cycle is correct for the current instance of rabbit.
            console.log('this.jumpAnimationPlayed: ',this.jumpAnimationPlayed);
            if (this.body.blocked.down && this.scene.player1.x > this.x) {
                
                this.jumped = true;
                      
                    if (!this.jumpAnimationPlayed) {

                        this.jumpAnimationPlayed = true;
                        this.setVelocityX(0);

                        //animation getting interupted causing things to break.
                        this.anims.play('rabbitHopRightStart').once('animationcomplete', () => {
                            this.jumpAnimationPlayed = false;
                            if(this.playerGrabbed === false){
                                this.setVelocityX(270);
                                this.setVelocityY(240*-1);
                            }

                            let currentRabbit = this;
                            setTimeout(function () {
                                currentRabbit.jumped = false;
                                currentRabbit.setVelocityX(currentRabbit.body.velocity.x +(10));
                            }, 160);

                            this.anims.play('rabbitHopRightInAir');
                        
                        });
                    
                    }

            } else if (this.body.blocked.down && this.scene.player1.x < this.x ) {
                //console.log("player is to the left of the rabbit");
                this.jumped = true;
                       
                    if (!this.jumpAnimationPlayed) {
                        this.jumpAnimationPlayed = true;
                        this.setVelocityX(0);

                        this.anims.play('rabbitHopLeftStart').once('animationcomplete', () => {
                            this.jumpAnimationPlayed = false;
                            if(this.playerGrabbed === false){
                                this.setVelocityX(270*-1);
                                this.setVelocityY(240*-1);
                            }
                        
                            let currentRabbit = this;
                            setTimeout(function () {
                                currentRabbit.jumped = false;
                                currentRabbit.setVelocityX(currentRabbit.body.velocity.x +(-1*10));
                            }, 160);

                            this.anims.play('rabbitHopLeftInAir');
                        
                        });
                    
                    }
                
            } 
        } else if(this.body.blocked.down) {
            //player is not in range of rabbit so rabbit is in idle animation.
            this.anims.play('rabbitIdle', true);
            this.setVelocityX(0);
            this.jumpAnimationPlayed = false;

        }
        //updates the previous y value to tell if rabbit is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this rabbit.
    moveIdle() {

        this.anims.play('rabbitIdle', true);
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    // functioned called to play animation when the player is defeated by the rabbit in gameover.
    gameOver() {
        this.setSize(70, 180, true);
        this.setOffset(180, 110);
        this.anims.play('rabbitGameover', true);
    }


    //the grab function. is called when player has overlaped with an enemy rabbit.
    grab() {
        let currentrabbit = this;
        //first checks if rabbit object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.setVelocityX(0);

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();

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
            this.rabbitGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator);
            
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
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else  if(playerHealthObject.playerHealth === 0){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            
        }

    }

    rabbitGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this rabbit did not grab the player this.rabbitID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

        // if its a small rabbit then play the small rabbit grab animation.
        
        // check to make sure animations dont conflict with eachother.
        if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
            this.anims.play("rabbitGrab", true);
        }
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    rabbitGrabTrue(playerHealthObject){

        //console.log("this rabbit did grab the player this.rabbitID: "+ this.rabbitId);
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

        let currentrabbit = this;

            // handles input for escaping.
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyA) === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 25;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }

        
        // randomizing input
       if (this.rabbitSize === 1) {
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }
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
                currentrabbit.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }

        //handles sound effect diring grab struggle
        //this.playrabbitSound('3',800);
    }

    playerIsStrugglingLogic(){

        let currentrabbit = this;

        if (this.rabbitDamageCounter === false ) {
            this.rabbitDamageCounter = true;
            //hpBar.calcDamage(2);
            healthEmitter.emit(healthEvent.loseHealth,2)
            setTimeout(function () {
                currentrabbit.rabbitDamageCounter = false;
            }, 2000);
            // if the player has been defeated the do the following steps.
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the rabbit.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator);
            if(this.enemySex === 0){
                this.scene.enemyThatDefeatedPlayer = "maleRabbit";
            }else{
                this.scene.enemyThatDefeatedPlayer = "femaleRabbit";
            }
            // if we start the player defeated animation then we need to set a few things.
            if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playDKey();
                let currentrabbit = this; // important, sets currentrabbit to the current object so that we can use variables attached to this current rabbit object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentrabbit.scene.KeyDisplay.visible = true;
                    currentrabbit.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);
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
            if(this.enemySex === 0){
            if (this.scene.keyD.isDown &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === false &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 7) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentrabbit = this;
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

                this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentrabbit.scene.KeyDisplay.visible = true;
                    currentrabbit.scene.KeyDisplay.playDKey();
                    currentrabbit.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }
            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 7 && this.scene.keyD.isDown)) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.maleRabbitDefeatedPlayerAnimation();

        }else{

            if (this.scene.keyD.isDown &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === false &&
                  this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 5) {

               this.scene.KeyDisplay.visible = false;
               //this.stageTimer = 0;
               this.playerDefeatedAnimationCooldown = true;
               this.playerDefeatedAnimationStage++;
               let currentrabbit = this;
               console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

               this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
               setTimeout(function () {
                   console.log("defeated animation delay.");
                   currentrabbit.scene.KeyDisplay.visible = true;
                   currentrabbit.scene.KeyDisplay.playDKey();
                   currentrabbit.playerDefeatedAnimationCooldown = false;
               }, 3000);
           }
           // if tab is pressed or the player finished the defeated animations then we call the game over scene.
           if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 5 && this.scene.keyD.isDown)) {
               this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }
            this.femaleRabbitDefeatedPlayerAnimation();
        }

              
    }

    playerEscaped(playerHealthObject){

        let currentrabbit = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                currentrabbit.struggleFree = true;
                    
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                if (this.rabbitSize === 1) {
                    this.anims.play("rabbitIdle", true);
                } else if (this.rabbitSize === 2) {
                    this.anims.play("rabbitLargeIdle", true);
                }
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
                currentrabbit = this;
                setTimeout(function () {

                    currentrabbit.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 3000);
            }

        
    }

    // controls the damage resistance of the rabbit.
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

                this.playrabbitSound('5',200);
                
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
    //handles damage types for blue rabbit. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 2);
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
            this.enemyHP -= (cold / 2);
        }
    }

    // plays the rabbit defeated player animations.
    maleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {
            if (!this.animationPlayed) {

                /*this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);*/
            
                this.animationPlayed = true;
                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitGrind', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"RUB");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {

                /*this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);*/
            
                this.animationPlayed = true;
                this.anims.play('rabbitPenetrate').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitRail1', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.anims.play('rabbitRail2', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('rabbitRail3', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.playrabbitSound('5',600);
            if (!this.animationPlayed) {
                //plays curse sound effect
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        }
    }

    // plays the rabbit defeated player animations.
    femaleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {
            if (!this.animationPlayed) {

                /*this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);*/
            
                this.animationPlayed = true;
                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitHump1', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            this.anims.play('rabbitHump2', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitHump3', true);
            this.playrabbitSound('2',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"PLAP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.playrabbitSound('5',600);
            if (!this.animationPlayed) {
                //plays curse sound effect
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        }
    }
    
    //plays rabbit sound based in type input being 1-5 and a time delay
    playrabbitSound(type,delay){
        if(this.rabbitSoundCoolDown === false){
           // this.scene.initSoundEffect('rabbitSFX',type,0.3);
            this.rabbitSoundCoolDown = true;
    
            let currentrabbit = this;
            setTimeout(function () {
                currentrabbit.rabbitSoundCoolDown= false;
            }, delay);
        }

    }
    
    
}
