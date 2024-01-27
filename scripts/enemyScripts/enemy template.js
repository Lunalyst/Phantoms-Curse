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

//at higher hrtz rates breaks the slimegrab function. needs to be redone again. fuck.

//implementation for the blue slime enemy.
class tiger extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, xPos, yPos, sex, id) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'tiger');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.tigerPreviousY = 0;
        this.body.setGravityY(600); // sets gravity 
        //this.setPushable(false);
        this.moveCycleTimer = false;
        this.activatedCycleTimer = false;
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        //value used to tell if the player can escape.
        this.struggleCounter = 0;

        this.playerDamaged = false;
        this.playerGrabbed = false;
        
        this.SlimeAnimationPosition;
        
        this.struggleFree = false;
        this.grabCoolDown = false;
        this.tigerId = id;
        this.TigerDamageCounter = false;
        this.playerDefeated = false;
        this.playerBrokeFree = 0;
        this.playerDefeatedAnimationStage = 0;
        this.stageTimer = 0;
        this.stageNumber = 2;
        this.tigerHP = 20;
        this.damageCoolDown = false;
        this.hitboxOverlaps = false;
        this.animationPlayed = false;
        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;
        this.keyAnimationPlayed = false;
        this.struggleCounterTick = false;
        //shrinks prite back down to a third of its size since we upscale sprites.
        this.setScale(1 / 3);
        //used to tell which way the tiger is facing.
        this.direction = "left";


        console.log("sex passed in tiger: " + sex);
        //defines tiger animations based on the players sex.
        this.anims.create({ key: 'tigerLeftIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'tigerLeftWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 0, end: 9 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerLeftJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 10, end: 12 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerLeftInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 13, end: 13 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 14, end: 14 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 14, end: 23 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 24, end: 26 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerRightInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 27, end: 27 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tiger-evan', { start: 28, end: 39 }), frameRate: 7, repeat: -1 });

        //male animations
        if (sex === 1) {
            this.anims.create({ key: 'tigerGrabRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 40, end: 54 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggleRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 54, end: 57 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 63, end: 73 }), frameRate: 7, repeat: 0 });
            
        //female animations    
        } else {
           
        }
        this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tiger-evan', { start: 74, end: 78 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tiger-evan', { start: 78, end: 82 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 82, end: 86 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tiger-evan', { start: 86, end: 90 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tiger-evan', { start: 90, end: 101 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 101, end: 108 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tiger-evan', { start: 108, end: 124 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tiger-evan', { start: 124, end: 129 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tiger-evan', { start: 130, end: 139 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tiger-evan', { start: 139, end: 142 }), frameRate: 7, repeat: -1 });



    }

    //functions that move slime objects.
    moveTiger(player1) {
            
            //sets the gravity for tiger
            this.body.setGravityY(600);
            //possitions her sprite box correctly along with her hitbox
            this.setSize(100, 250, true);
            this.setOffset(100, 20);

 
            let currentTiger = this;
            

        //checks to see if tiger should jump to move if the player is in range
        if (player1.x > this.x - 400 && player1.x < this.x + 400) {
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if (player1.x > this.x) {
                //console.log("player is to the right of the tiger");
                //this if statement checks where the slime is in its jump cycle. if its going up then it plays the up animation
            
                    //console.log("tiger walking right");
                    
                        this.anims.play('tigerRightWalk', true);
                        this.direction = "right";
                   
                    //play the walking right animation
                    this.setVelocityX(100);
                    
                let currentTiger = this;

                


            } else if (player1.x < this.x ) {
                
                    //console.log("tiger walking left");
                    
                        this.anims.play('tigerLeftWalk', true);
                        this.direction = "left";

                    //moves tiger left
                    this.setVelocityX(100 * -1);
                    //this.setVelocityY(this.randomYVelocity * -1);
                
                // this creates a random x and y velocity for the slimes next jump
                let currentTiger = this;
                

            } else if (this.body.blocked.down) {
                if(this.direction === "left"){
                    this.anims.play('tigerLeftIdle', true);
               }else if(this.direction === "right") {
                    this.anims.play('tigerLeftIdle', true);
               }
               this.setVelocityX(0);
            }
            let currentSlime = this;
        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.tigerPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this tiger.
    moveTigerIdle() {
        
        if(this.direction === "left"){
            this.anims.play('tigerLeftIdle', true);
        }else if(this.direction === "right") {
            this.anims.play('tigerLeftIdle', true);
        }

        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    // functioned called to play animation when the player is defeated by the slime in gameover.
    tigerGameOver() {
        this.setSize(100, 250, true);
        this.setOffset(100, 20);
        this.anims.play('tigerTummyrelax2', true);
    }
    
    //the grab function. is called when player has overlaped with an enemy slime.
    tigerGrab(player1, keyS, KeyDisplay, keyW, scene, keyTAB) {
        let currentTiger = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.

        this.clearTint();
        //console.log("this.playerGrabbed: ",this.playerGrabbed);
        // moves player attackhitbox out of the way.
        scene.attackHitBox.y = player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {
            // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
            //console.log("this tiger did grab the player this.tigerId: " + this.tigerId);
            console.log("this.playerGrabbed",this.playerGrabbed);
            player1.visible = false;
            // puts the player hitbox out of the way and locked to a specific location.
            player1.y = this.y - 150;
            // makes the key prompts visible.
            KeyDisplay.visible = true;

            // if its a small slime then play the small slime grab animation.
            if (this.direction === "left") {
                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {

                    this.anims.play('tigerGrabRight').once('animationcomplete', () => {
                        this.anims.play("tigerStruggleRight", true);
                    });
                }
                
            } else if (this.direction === "right") {
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                    this.anims.play('tigerGrabRight').once('animationcomplete', () => {
                        this.anims.play("tigerStruggleRight", true);
                    });
                }
            }
            this.playerGrabbed = true;
            //if the player is grabbed then do the following.
        } else if (this.playerGrabbed === true) {

            //console.log(" now activating player grabbed logic")
            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };
    
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            player1.y = this.y - 150;
            player1.body.setGravityY(0);
            //this.body.setGravityY(0);
            //puts the key display in the correct location.
            KeyDisplay.x = this.x;
            KeyDisplay.y = this.y + 70;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            if (this.playerDamaged === false && playerHealthObject.playerHealth > 0) {
                //hpBar.calcDamage(1);
                healthEmitter.emit(healthEvent.loseHealth,1)
                console.log('return value of health emitter: ', playerHealthObject.playerHealth);
                this.playerDamaged = true;
            }
            // something wacky. once the Phaser.Input.Keyboard.JustDown(keyA) is checked for something.
            // it changes back to false. atleast thats what i think is happening. so if we are checking if its true its the only thing we can do during that update loop function call.
            // so we have to structure it like so.
            // this chunk of code checks a random number to tell what button prompt it is. 0 is keyA and 1 is Key D
            // after we decide the correct key we then check of the correct key is down. if so add to the struggle counter
            // if slime is size 2 it has this behavio4r, other wise it has a simple keyA prompt.
            if (this.playerDefeated === false) {
                if (this.randomInput === 0) {
                    if (Phaser.Input.Keyboard.JustDown(keyS) === true) {
                        console.log('Phaser.Input.Keyboard.JustDown(keyS) ');
                        if (playerHealthObject.playerHealth >= 1) {
                            this.struggleCounter += 20;

                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                    }
                } else if (this.randomInput === 1) {
                    // important anims.play block so that the animation can player properly.
                    if (Phaser.Input.Keyboard.JustDown(keyW) === true) {
                        console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                        if (playerHealthObject.playerHealth >= 1) {
                            this.struggleCounter += 20;
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                    }
                }
                // randomizing input
                if (this.randomInputCooldown === false) {

                    this.randomInputCooldown = true;
                    this.randomInput = Math.floor((Math.random() * 2));
                    console.log("randomizing the key prompt " + this.randomInput);
                    // important anims.play block so that the animation can player properly.
                    if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                        console.log(" setting keyS display");
                        KeyDisplay.playSKey();
                        this.keyAnimationPlayed = true;
                    } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                        console.log(" setting keyW display");
                        KeyDisplay.playWKey();
                        this.keyAnimationPlayed = true;
                    }
                    setTimeout(function () {
                        currentTiger.randomInputCooldown = false;
                        // resets the animation block.
                        currentTiger.keyAnimationPlayed = false;
                    }, 2000);
                } 
            }
            // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
            // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
            if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
                // this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                this.struggleCounterTick = true;
                // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
                setTimeout(function () {
                    currentTiger.struggleCounterTick = false;
                }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
            }
            // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            if (playerHealthObject.playerHealth >= 1 && this.TigerDamageCounter === false && this.struggleCounter <= 100) {
                this.TigerDamageCounter = true;
                //hpBar.calcDamage(4);
                healthEmitter.emit(healthEvent.loseHealth,4)
                setTimeout(function () {
                    currentTiger.TigerDamageCounter = false;
                }, 1500);
            }  else if (playerHealthObject.playerHealth === 0) {
                this.playerDefeated = true;
                //console.log(" keyA: "+keyA+" keyD: "+keyD);
                skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator);
                scene.enemyThatDefeatedPlayer = "tiger";
                // if we start the player defeated animation then we need to set a few things.
                if (this.playerDefeatedAnimationStage === 0) {
                    KeyDisplay.playWKey();
                    let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                    //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                    // delay the button prompt so the animation can play.
                    setTimeout(function () {
                        KeyDisplay.visible = true;
                        KeyDisplay.playWKey();
                        //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                        console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                    }, 1000);
                    this.playerDefeatedAnimationStage++;
                    console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                }

                if (keyW.isDown && KeyDisplay.visible === true && this.playerDefeatedAnimationStage !== 1 && this.playerDefeatedAnimationStage !== 3 && this.playerDefeatedAnimationStage !== 5) {
                    KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        KeyDisplay.playWKey();
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (keyTAB.isDown || (this.playerDefeatedAnimationStage > 6 && keyW.isDown)) {
                    KeyDisplay.visible = false;
                    console.log("changing scene");
                    scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.tigerDefeatedPlayerAnimation();
            }
            // if the player breaks free then do the following
            if (this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1) {
                KeyDisplay.visible = false;
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                    setTimeout(function () {
                        currentTiger.struggleFree = true;
                    }, 100);

                    // if the player if freed do the following to reset the player.
                } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    this.anims.play("tigerStruggleBreakRight", true);
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    this.keyAnimationPlayed = false;
                    player1.visible = true;
                    //player1.setSize(23, 68, true);
                    player1.body.setGravityY(600);
                    this.body.setGravityY(600);
                    player1.x = this.x;
                    player1.y = this.y;
                    scene.grabbed = false;
                    KeyDisplay.visible = false;
                    // creates a window of time where the player cant be grabbed after being released.
                    // creates a cooldown window so the player does not get grabbed as they escape.
                    setTimeout(function () {
                        currentTiger.grabCoolDown = false;
                        scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 3000);
                }

            }
        }

    }

    // combines two slimes together by distroy one with the smaller id and promoting the one with the high id.
    
    //handles damage types for blue slime. get these damage types from the attack that hits the enemy
    tigerCalcDamage(slice, blunt, pierce, heat, lightning, cold) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.tigerHP -= (slice / 2);
        }
        if (blunt > 0) {
            this.tigerHP -= (blunt / 2);
        }
        if (pierce > 0) {
            this.tigerHP -= (pierce / 2);
        }
        if (heat > 0) {
            this.tigerHP -= (heat * 2);
        }
        if (lightning > 0) {
            this.tigerHP -= (lightning * 2);
        }
        if (cold > 0) {
            this.tigerHP -= (cold / 2);
        }
    }

    // plays the slime defeated player animations.
    tigerDefeatedPlayerAnimation() {
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;
            if (!this.animationPlayed) {
                console.log("the animation has not been played");
                this.animationPlayed = true;
                this.anims.play('tigerSwallowRight').once('animationcomplete', () => {
                    console.log("animation finished");
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            //make a random number from 0-5
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            let randomInt = Math.floor(Math.random() * 6);
            console.log("randomInt", randomInt)
            if (!this.animationPlayed) {
               
                this.animationPlayed = true;
                if(randomInt === 0){
                    this.anims.play('tigerTummyPush1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });
                }else if(randomInt === 1){
                    this.anims.play('tigerTummyPush2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });

                }else if(randomInt === 2){
                    this.anims.play('tigerTummyWobble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });
                    
                }else if(randomInt === 3){
                    this.anims.play('tigerTummyWobble2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });
                    
                }else if(randomInt === 4){
                    this.anims.play('tigerTummySquish1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });
                    
                }else if(randomInt === 5){
                    this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                    });
                    
                }
                
            }

        } else if (this.playerDefeatedAnimationStage === 3) {
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyDigestion1').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
               
                    this.anims.play('tigerTummyrelax1',true);
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
            
                
        }else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyDigestion2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
                });
            }
        }else if (this.playerDefeatedAnimationStage === 6) {
                this.anims.play('tigerTummyrelax2', true);
        }
    }
    

        


    
    
    //pauses the animations of the slime.
    pauseTigerAnimations(scene) {
        if (scene.isPaused === true) {
            this.anims.pause();
        } else if (scene.isPaused === false) {
            this.anims.resume();
        }

    }


}
