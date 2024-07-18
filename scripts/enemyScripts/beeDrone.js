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

//at higher hrtz rates breaks the beeDronegrab function. needs to be redone again. fuck.

//implementation for the blue beeDrone enemy.
class beeDrone extends enemy {
    
    constructor(scene, xPos, yPos, sex, id) {
        
        //on set up, need to decide if beeDrone is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'beeDroneMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'beeDroneFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the beeDrone.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'beeDroneFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'beeDroneMale');
                this.enemySex = 0;
            }
        }

        // variables for movement
        this.beeDroneSoundCoolDown = false;
        this.beeDroneDamageCounter = false;
        this.randomXVelocity = Math.floor((Math.random() * 250) + 30);
        this.randomizedXVelocity = false;
        this.grabTimer = false;
        this.hitboxActive = false;

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        //this.grabHitBox.visible = false;

        // sets the beeDrones hp value
        this.enemyHP = 50;

        //defines beeDrone animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'beeDroneIdle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 1, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneMove', frames: this.anims.generateFrameNames('beeDroneMale', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneGrab', frames: this.anims.generateFrameNames('beeDroneMale', { start: 12, end: 17 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'beeDroneTailSwallow3', frames: this.anims.generateFrameNames('beeDroneMale', { start: 45, end: 50 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeDroneTailJiggle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 52, end: 57 }), frameRate: 8, repeat: -1 });
            if(sex === 0 ){
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneMale', { start: 18, end: 20 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 21, end: 26 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneMale', { start: 27, end: 33 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 34, end: 39 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneMale', { start: 40, end: 44 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneMale', { start: 58, end: 69 }), frameRate: 8, repeat: 0 }); 
               
            }else{
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneMale', { start: 70, end: 72 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 73, end: 78 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneMale', { start: 79, end: 85 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneMale', { start: 86, end: 91 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneMale', { start: 92, end: 96 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneMale', { start: 97, end: 108 }), frameRate: 8, repeat: 0 }); 
            }
             
        }else{
            this.anims.create({ key: 'beeDroneIdle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 1, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneMove', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneGrab', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 12, end: 17 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'beeDroneTailSwallow3', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 45, end: 50 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeDroneTailJiggle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 52, end: 57 }), frameRate: 8, repeat: -1 });
            if(sex === 0 ){
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 18, end: 20 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 21, end: 26 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 27, end: 33 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 34, end: 39 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 58, end: 69 }), frameRate: 8, repeat: 0 }); 
               
            }else{
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 70, end: 72 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 73, end: 78 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 79, end: 85 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 86, end: 91 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 92, end: 96 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneFemale', { start: 97, end: 108 }), frameRate: 8, repeat: 0 }); 
            }
            
        }

        this.anims.play('beeDroneIdle',true);

    }

    //functions that move beeDrone objects.
    move(){
        console.log(' this.enemyId: ', this.enemyId,' this.playerGrabbed: ',this.playerGrabbed, ' this.grabTimer: ',this.grabTimer);
        
        //if the enemy is within grab range attempt to grab the player while the grab timer is false
        if((this.scene.player1.x > this.x - 60 && this.scene.player1.x < this.x + 60) && this.grabTimer === false){

            this.grabTimer = true;
            this.hitboxActive = true;

                //controls the x velocity when the bee ischarging to grab the player
                if (this.scene.player1.x > this.x){
                    
                    this.setVelocityX(255);
                    this.flipX = false;
                                
                } else if (this.scene.player1.x < this.x) {

                    this.setVelocityX(255 * -1);
                    this.flipX = true;
                }

            //controls the y velocity when the bee is charging to grab the player
            if ((this.scene.player1.y > this.y  && this.scene.player1.y < this.y )){
                this.setVelocityY(0);
            }else{
                if (this.scene.player1.y > this.y) {
                    this.setVelocityY(100);

                } else if (this.scene.player1.y < this.y) {
                    this.setVelocityY(100*-1);    
                }
            }

            this.grabHitBox.body.enable = true;

            //player the bee grab animation and once its complete
            this.anims.play('beeDroneGrab').once('animationcomplete', () => {

                this.hitboxActive = false;

                //play the idle animation
                this.anims.play('beeDroneIdle', true);

                //have the bee float upwards for the next charge.
                this.setVelocityX(0);
                this.setVelocityY(-50);

                //time out to reset the grab timer, giving the bee a little time to float upwards and give the player a break
                let tempBee = this;
                setTimeout(function () {
                    tempBee.grabTimer = false;
                }, 500);
                
            });

        //checks to see if beeDrone should move if the player is within range. also has to check y and if the enemy isnt grabbing.
        }else if(this.grabTimer === false){

            this.grabHitBox.body.enable = false;

            if ((this.scene.player1.x > this.x - 450 && this.scene.player1.x < this.x + 450) && (this.scene.player1.y > this.y - 450 && this.scene.player1.y < this.y + 450)) {

                this.setSize(70, 180, true);
        
                //if bee is within range
                if ((this.scene.player1.x > this.x - 50 && this.scene.player1.x < this.x + 50)){
                    this.anims.play('beeDroneIdle',true);
                    this.setVelocityX(0);
    
                }else{
                     //if the beeDrone is left of the player move the beeDrone right twards the player bot not into them yet.
                    if (this.scene.player1.x > this.x){
                        
                        this.setVelocityX(this.randomXVelocity);
                        //play the animation for beeDrone being in the air.
                        this.anims.play('beeDroneMove',true);
                        this.flipX = false;
                                    
                    //if the beeDrone is to the right of the player, then move the beeDrone left
                    } else if (this.scene.player1.x < this.x) {
    
                        this.setVelocityX(this.randomXVelocity * -1);
                        //play the animation for beeDrone being in the air.
                        this.anims.play('beeDroneMove',true);
                        this.flipX = true;
                    }
                }
                //keep the bee floating lightly above the players y
                if ((this.scene.player1.y > this.y  && this.scene.player1.y < this.y + 50)){
                    //this.anims.play('beeDroneIdle',true);
                    this.setVelocityY(0);
    
                }else{
                    if (this.scene.player1.y > this.y) {
    
                        this.setVelocityY(70);
    
                    } else if (this.scene.player1.y < this.y) {
    
                        this.setVelocityY(70*-1);    
                    }
                }
    
            //if the be isnt within range of the player have them idle.  
            }else{
                this.anims.play('beeDroneIdle', true);
                this.setVelocityX(0);
                this.setVelocityY(0);
            }

        }

        if(this.hitboxActive === true){
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y;
        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }

        // randomized bee velocity so they can keep up with the player without overlapping into eachother.
        if(this.randomizedXVelocity === false){
            this.randomizedXVelocity = true;
            //console.log("this.randomXVelocity: ",this.randomXVelocity);
            this.randomXVelocity = Math.floor(Math.random() * (255 - 235) + 235);
            
            let tempBee = this;
            setTimeout(function () {
                tempBee.randomizedXVelocity = false;
            }, 500);
        }

        //updates the previous y value to tell if beeDrone is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this beeDrone.
    moveIdle() {
        this.anims.play('beeDroneIdle', true);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 
        this.setDepth(4);
        this.grabTimer = false;
    }

    // functioned called to play animation when the player is defeated by the beeDrone in gameover.
    gameOver(playerSex) {
        this.setSize(70, 180, true);
        //this.setOffset(180, 110);
        this.anims.play('beeDroneGameover').once('animationcomplete', () => {
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


    //the grab function. is called when player has overlaped with an enemy beeDrone.
    grab(){

        let currentbeeDrone = this;
        //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.beeDroneGrabFalse();

        } else if (this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

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
            this.beeDroneGrabTrue(playerHealthObject);

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

    beeDroneGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this beeDrone did not grab the player this.beeDroneID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;
        
        // check to make sure animations dont conflict with eachother.
        if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
           
            //moves bee upward so that when the tween starts it isnt bumping up on the ground if the player is too close
            //tween kills all movement of the direction it is active in.
            this.setVelocityY(-100);

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

                this.anims.play('beeDroneStruggle', true);
  
            });
    
        }
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    beeDroneGrabTrue(playerHealthObject){

        //console.log("this beeDrone did grab the player this.beeDroneID: "+ this.beeDroneId);
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
        let currentbeeDrone = this;

            // handles input for escaping.
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyS) === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 25;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }

        // displays inputs while struggling.
        if (this.keyAnimationPlayed === false) {
            console.log(" setting keyS display");
            this.scene.KeyDisplay.playSKey();
            this.keyAnimationPlayed = true;
        }

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
        if (this.struggleCounter > 0 && this.struggleCounter < 200 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            setTimeout(function () {
                currentbeeDrone.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }
    }

    playerIsStrugglingLogic(){
        let currentbeeDrone = this;

        if (this.beeDroneDamageCounter === false ) {
            this.beeDroneDamageCounter = true;
            //hpBar.calcDamage(2);
            healthEmitter.emit(healthEvent.loseHealth,2)
            setTimeout(function () {
                currentbeeDrone.beeDroneDamageCounter = false;
            }, 2000);
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

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

       
            if (this.scene.keyD.isDown &&
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
            if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 4 && this.scene.keyD.isDown)) {
                
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = "maleBeeDrone";
                }else{
                    this.scene.enemyThatDefeatedPlayer = "femaleBeeDrone";
                }

                this.scene.gameoverLocation = "hiveGameover";
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.beeDroneDefeatedPlayerAnimation();
     
    }

    playerEscaped(playerHealthObject){

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

                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                //sets grabb cooldown for the scene
                this.scene.startGrabCoolDown();
                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //stops the hover tween during grab animation
                this.beeHover.stop();

                this.scene.player1.visible = true;
                this.scene.player1.setSize(23, 68, true);
                this.scene.player1.body.setGravityY(600);
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
                }, 3000);
            }

        
    }

    // controls the damage resistance of the beeDrone.
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
                
                if (this.enemyHP <= 0) {
                    this.grabHitBox.destroy();
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

    //handles damage types for blue beeDrone. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce);
        }
        if (heat > 0) {
            this.enemyHP -= (heat * 4);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning * 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 2);
        }
    }

    // plays the beeDrone defeated player animations.
    beeDroneDefeatedPlayerAnimation() {

        let currentbeeDrone = this;
        if (this.playerDefeatedAnimationStage === 1) {
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
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
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
    
}
