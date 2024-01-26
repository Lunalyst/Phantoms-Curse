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
    
    constructor(scene, xPos, yPos, sex) {
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
        this.slimePreviousY = 0;
        this.body.setGravityY(600); // sets gravity 
        //this.setPushable(false);
        this.slimeSize = 1;
        this.moveCycleTimer = false;
        this.activatedCycleTimer = false;
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.mitosing = false;
        this.SlimeAnimationPosition;
        this.mitosisCounter = false;
        this.struggleFree = false;
        this.grabCoolDown = false;
        this.slimeId = 0;
        this.largeSlimeDamageCounter = false;
        this.playerDefeated = false;
        this.playerBrokeFree = 0;
        this.playerDefeatedAnimationStage = 0;
        this.stageTimer = 0;
        this.stageNumber = 2;
        this.body.bounce.x = 1;
        this.slimeHp = 20;
        this.damageCoolDown = false;
        this.hitboxOverlaps = false;
        this.animationPlayed = false;
        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;
        this.keyAnimationPlayed = false;
        this.struggleCounterTick = false;
        this.setScale(1 / 3);


        console.log("sex passed in slime: " + sex);
        //defines Slime animations based on the players sex.

        this.anims.create({ key: 'tigerLeftIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'tigerLeftWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 0, end: 9 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerLeftJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 10, end: 12 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerLeftInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 13, end: 13 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightIdle', frames: this.anims.generateFrameNames('tiger-evan', { start: 14, end: 14 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightWalk', frames: this.anims.generateFrameNames('tiger-evan', { start: 14, end: 23 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerRightJumpStart', frames: this.anims.generateFrameNames('tiger-evan', { start: 24, end: 26 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'tigerRightInAir', frames: this.anims.generateFrameNames('tiger-evan', { start: 27, end: 27 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tiger-evan', { start: 28, end: 39 }), frameRate: 7, repeat: -1 });
        if (sex === 0) {
            this.anims.create({ key: 'tigerGrabRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 40, end: 54 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerStruggleRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 54, end: 57 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowRight', frames: this.anims.generateFrameNames('tiger-evan', { start: 63, end: 73 }), frameRate: 7, repeat: -1 });
            
            
        } else {
           
        }
        this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tiger-evan', { start: 74, end: 78 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tiger-evan', { start: 78, end: 82 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 82, end: 86 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tiger-evan', { start: 86, end: 90 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tiger-evan', { start: 90, end: 101 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tiger-evan', { start: 101, end: 108 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tiger-evan', { start: 108, end: 124 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tiger-evan', { start: 124, end: 130 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tiger-evan', { start: 130, end: 139 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tiger-evan', { start: 139, end: 143 }), frameRate: 7, repeat: -1 });



    }

    //functions that move slime objects.
    moveTiger(player1) {

        
            //this.setSize(90, 65, true);
            //this.setOffset(105, 233);

            this.body.setGravityY(600);
            //else if the slime is size 2 then set its hit box to the correct size
        
        //this.movecycletimer is used to keep track of the slime movement. its incrimented to 100 and then set to zero so it loops
        if (this.moveCycleTimer === true && this.activatedCycleTimer === false) {
            let currentTiger = this;
            //controls the random delay between the slimes movements.
            setTimeout(function () {
                currentTiger.moveCycleTimer = false;
                currentTiger.activatedCycleTimer = false;
                currentTiger.randomMoveTimer = Math.floor((Math.random() * 3000) + 2000);
            }, this.randomMoveTimer);
            this.activatedCycleTimer = true;
        }
        //checks to see if slime should jump to move if the player is in range
        if (player1.x > this.x - 400 && player1.x < this.x + 400) {
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if (player1.x > this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false) {
                console.log("player is to the right of the slime");
                //this if statement checks where the slime is in its jump cycle. if its going up then it plays the up animation
            
                    console.log("tiger walking right");
                    
                        this.anims.play('tigerRightWalk', true);
                   
                    //play the walking right animation
                    this.setVelocityX(this.randomXVelocity);
                    
                let currentTiger = this;

                setTimeout(function () {
                    currentTiger.moveCycleTimer = true;
                    currentTiger.randomXVelocity = Math.floor((Math.random() * 50) + 150);
                    //currentSlime.randomYVelocity = Math.floor((Math.random() * 100) + 150);
                }, 200);


            } else if (player1.x < this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false) {
                
                    console.log("tiger walking left");
                    
                        this.anims.play('tigerLeftWalk', true);

                    //moves tiger left
                    this.setVelocityX(this.randomXVelocity * -1);
                    //this.setVelocityY(this.randomYVelocity * -1);
                
                // this creates a random x and y velocity for the slimes next jump
                let currentTiger = this;
                setTimeout(function () {
                    currentTiger.moveCycleTimer = true;
                    currentTiger.randomXVelocity = Math.floor((Math.random() * 50) + 150);
                    currentTiger.randomYVelocity = Math.floor((Math.random() * 100) + 150);
                }, 200);

            } else if (this.moveCycleTimer === true && this.activatedCycleTimer === true && this.body.blocked.down) {
               
                    this.anims.play('slimeIdle', true);
                this.setVelocityX(0);

            }
            let currentSlime = this;
        } else {
            //player is not in range of slime so slime is in idle animation.
            this.anims.play('slimeIdle', true);
            this.setVelocityX(0);

        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.slimePreviousY = this.y;
    }
    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveSlimeIdle() {
        
        this.anims.play('slimeIdle', true);
        this.setSize(90, 65, true);
       
        this.body.setGravityY(600);
        this.setVelocityX(0);
    }
    // functioned called to play animation when the player is defeated by the slime in gameover.
    slimeGameOver() {
        this.setSize(100, 150, true);
        this.setOffset(90, 150);
        this.anims.play('slimeGameOver', true);
    }
    
    //the grab function. is called when player has overlaped with an enemy slime.
    slimeGrab(player1, keyA, KeyDisplay, keyD, scene, keyTAB) {
        let currentSlime = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.

        this.clearTint();
        // moves player attackhitbox out of the way.
        scene.attackHitBox.y = player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {
            // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
            console.log("this slime did not grab the player this.slimeID: " + this.slimeId);
            player1.visible = false;
            // puts the player hitbox out of the way and locked to a specific location.
            player1.y = this.y - 150;
            // makes the key prompts visible.
            KeyDisplay.visible = true;

            // if its a small slime then play the small slime grab animation.
            if (this.slimeSize === 1) {
                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                    this.anims.play("slimeGrab", true);
                }
                // when entering grabs sets offset correctly so play isn't clipping through the ground. or clips through the ground falling nito the void
                //this.setOffset(40,129);
            } else if (this.slimeSize === 2) {
                if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                    this.anims.play("largeSlimeStruggle", true);
                }
            }
            this.playerGrabbed = true;
            //if the player is grabbed then do the following.
        } else if (this.playerGrabbed === true) {

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
            player1.setSize(10, 10, true);
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
                if (this.randomInput === 0 && this.slimeSize === 2) {
                    if (Phaser.Input.Keyboard.JustDown(keyA) === true) {
                        console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                        if (playerHealthObject.playerHealth >= 1) {
                            this.struggleCounter += 20;
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                    }
                } else if (this.randomInput === 1 && this.slimeSize === 2) {
                    // important anims.play block so that the animation can player properly.
                    if (Phaser.Input.Keyboard.JustDown(keyD) === true) {
                        console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                        if (playerHealthObject.playerHealth >= 1) {
                            this.struggleCounter += 20;
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                    }
                } else if (this.slimeSize === 1) {
                    // important anims.play block so that the animation can player properly.

                    if (Phaser.Input.Keyboard.JustDown(keyA) === true) {
                        console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                        if (this.slimeSize === 1 && playerHealthObject.playerHealth >= 1) {
                            this.struggleCounter += 25;
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                    }

                }
                // randomizing input
                if (this.randomInputCooldown === false && this.slimeSize === 2) {

                    this.randomInputCooldown = true;
                    this.randomInput = Math.floor((Math.random() * 2));
                    console.log("randomizing the key prompt " + this.randomInput);
                    // important anims.play block so that the animation can player properly.
                    if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                        console.log(" setting keyA display");
                        KeyDisplay.playAKey();
                        this.keyAnimationPlayed = true;
                    } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                        console.log(" setting keyD display");
                        KeyDisplay.playDKey();
                        this.keyAnimationPlayed = true;
                    }
                    setTimeout(function () {
                        currentSlime.randomInputCooldown = false;
                        // resets the animation block.
                        currentSlime.keyAnimationPlayed = false;
                    }, 2000);
                } else if (this.slimeSize === 1) {
                    if (this.keyAnimationPlayed === false) {
                        console.log(" setting keyA display");
                        KeyDisplay.playAKey();
                        this.keyAnimationPlayed = true;
                    }
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
                    currentSlime.struggleCounterTick = false;
                }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
            }
            // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            if (this.slimeSize === 2 && playerHealthObject.playerHealth >= 1 && this.largeSlimeDamageCounter === false && this.struggleCounter <= 100) {
                this.largeSlimeDamageCounter = true;
                //hpBar.calcDamage(4);
                healthEmitter.emit(healthEvent.loseHealth,4)
                setTimeout(function () {
                    currentSlime.largeSlimeDamageCounter = false;
                }, 1500);
            } else if (this.slimeSize === 1 && playerHealthObject.playerHealth >= 1 && this.largeSlimeDamageCounter === false && this.struggleCounter <= 100) {
                this.largeSlimeDamageCounter = true;
                //hpBar.calcDamage(2);
                healthEmitter.emit(healthEvent.loseHealth,2)
                setTimeout(function () {
                    currentSlime.largeSlimeDamageCounter = false;
                }, 2000);
                // if the player has been defeated the do the following steps.
            } else if (this.slimeSize === 1 && playerHealthObject.playerHealth === 0) {
                this.playerDefeated = true;
                //bug where if the button is pressed too fast, then the player can no longer progress the animations. probably causesed by ispressed or the pressed once thing in one of my cases.
                skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator);
                scene.enemyThatDefeatedPlayer = "blueSlime";
                // if we start the player defeated animation then we need to set a few things.
                if (this.playerDefeatedAnimationStage === 0) {
                    KeyDisplay.playDKey();
                    let currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                    //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                    // delay the button prompt so the animation can play.
                    setTimeout(function () {
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                        //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                        console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);
                    }, 1000);
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                }

                if (keyD.isDown && KeyDisplay.visible === true && this.playerDefeatedAnimationStage !== 5 && this.playerDefeatedAnimationStage !== 6 && this.playerDefeatedAnimationStage !== 8) {
                    KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationStage++;
                    let currentSlime = this;
                    console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (keyTAB.isDown || (this.playerDefeatedAnimationStage > 8 && keyD.isDown)) {
                    KeyDisplay.visible = false;
                    console.log("changing scene");
                    scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.smallSlimeDefeatedPlayerAnimation();
                // same code but for the large slime if it beats the player.
            } else if (this.slimeSize === 2 && playerHealthObject.playerHealth === 0) {
                this.playerDefeated = true;
                //console.log(" keyA: "+keyA+" keyD: "+keyD);
                skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator);
                scene.enemyThatDefeatedPlayer = "largeBlueSlime";
                // if we start the player defeated animation then we need to set a few things.
                if (this.playerDefeatedAnimationStage === 0) {
                    KeyDisplay.playDKey();
                    let currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                    //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                    // delay the button prompt so the animation can play.
                    setTimeout(function () {
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                        //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                        console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);
                    }, 1000);
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                }

                if (keyD.isDown && KeyDisplay.visible === true && this.playerDefeatedAnimationStage !== 3 && this.playerDefeatedAnimationStage !== 6) {
                    KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationStage++;
                    let currentSlime = this;
                    console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (keyTAB.isDown || (this.playerDefeatedAnimationStage > 7 && keyD.isDown)) {
                    KeyDisplay.visible = false;
                    console.log("changing scene");
                    scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.largeSlimeDefeatedPlayerAnimation();
            }
            // if the player breaks free then do the following
            if (this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1) {
                KeyDisplay.visible = false;
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if (this.slimeSize === 1 && this.struggleFree === false) {
                    console.log("Free counter: " + this.struggleFree);
                    // handles the breaking free animation.
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.anims.play('slimeGrabBreak').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            currentSlime.struggleFree = true;
                        });
                    }
                } else if (this.slimeSize === 2 && this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                    setTimeout(function () {
                        currentSlime.struggleFree = true;
                    }, 100);

                    // if the player if freed do the following to reset the player.
                } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    if (this.slimeSize === 1) {
                        this.anims.play("slimeIdle", true);
                    } else if (this.slimeSize === 2) {
                        this.anims.play("slimeLargeIdle", true);
                    }
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.setSize(90, 65, true);
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    this.keyAnimationPlayed = false;
                    player1.visible = true;
                    player1.setSize(23, 68, true);
                    player1.body.setGravityY(600);
                    this.body.setGravityY(600);
                    player1.x = this.x;
                    player1.y = this.y;
                    KeyDisplay.visible = false;
                    // creates a window of time where the player cant be grabbed after being released.
                    // creates a cooldown window so the player does not get grabbed as they escape.
                    setTimeout(function () {
                        currentSlime.grabCoolDown = false;
                        scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 3000);
                }

            }
        }

    }

    // combines two slimes together by distroy one with the smaller id and promoting the one with the high id.
    slimeCombine(otherSlime, grabbed) {
        //console.log("combining slime with id: "+this.slimeId+" to the other slime with id: "+ otherSlime.slimeId)
        //console.log("grabbed : "+ grabbed);
        if (grabbed === false) {
            if (this.slimeId === otherSlime.slimeId) {
                //console.log("slime overlap with its self detected;");
                return;
            } else if (this.slimeId < otherSlime.slimeId) {
                console.log("this slime with Id: "+ this. slimeId+" is living")
                this.setSize(130, 90, true);
                this.setOffset(82, 209);
                this.anims.play("mitosis");
                this.slimeSize = 2;
                this.slimeHp = 40;
                this.mitosing = true;
                //console.log("this.mitosing: "+ this.mitosing);
                this.mitosisCounter = true;
                //console.log("this.mitosisCounter: "+ this.mitosisCounter);
                otherSlime.destroy();
                let currentSlime = this;
                setTimeout(function () {
                    currentSlime.mitosisCounter = false;
                    currentSlime.mitosing = true;

                }, 1000);

            }
        } else if (grabbed === true) {
            this.mitosisCounter = false;
        }
    }
    // checks to see if a slime can combine.
    mitosisDelayCheck() {
        if (this.slimeSize === 2 && this.mitosisCounter === false) {
            this.mitosing = false;
            //console.log("this.mitosing: "+ this.mitosing);
            //console.log("this.mitosisCounter: "+ this.mitosisCounter);
        } else if (this.mitosisCounter === true) {
            //this.mitosisCounter--;
            //this.anims.play("mitosis");
            //console.log("this.mitosisCounter: " + this.mitosisCounter);
        }
    }
    // controls the damage resistance of the slime.
    slimeDamage(scene) {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.slimeHp > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.slimeCalcDamage(
                    scene.player1.sliceDamage,
                    scene.player1.bluntDamage,
                    scene.player1.pierceDamage,
                    scene.player1.heatDamage,
                    scene.player1.lightningDamage,
                    scene.player1.coldDamage
                );
                if (this.slimeHp <= 0) {
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
    slimeCalcDamage(slice, blunt, pierce, heat, lightning, cold) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.slimeHp -= (slice / 4);
        }
        if (blunt > 0) {
            this.slimeHp -= (blunt * 3);
        }
        if (pierce > 0) {
            this.slimeHp -= (pierce / 2);
        }
        if (heat > 0) {
            this.slimeHp -= (heat / 4);
        }
        if (lightning > 0) {
            this.slimeHp -= (lightning * 2);
        }
        if (cold > 0) {
            this.slimeHp -= (cold / 4);
        }
    }
    // plays the slime defeated player animations.
    smallSlimeDefeatedPlayerAnimation() {
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('slimeGrabFallingDefeated').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });

            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('slimeGrabDefeated1', true);
        } else if (this.playerDefeatedAnimationStage === 3) {
            this.anims.play('slimeGrabDefeated2', true);
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('slimeGrabDefeated3', true);
        } else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated4').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 6) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.anims.play('slimeGrabDefeated6', true);
        } else if (this.playerDefeatedAnimationStage === 8) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('slimeGrabDefeated7').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        }


    }
    // plays the large slime defeated player animations.
    largeSlimeDefeatedPlayerAnimation() {
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('largeSlimefallingDefeated').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('largeSlimeGrabDefeated1', true);
        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('largeSlimeGrabDefeated3', true);
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.anims.play('largeSlimeGrabDefeated4', true);
        } else if (this.playerDefeatedAnimationStage === 6) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.anims.play('largeSlimeGrabDefeated6', true);
        }


    }
    //pauses the animations of the slime.
    pauseSlimeAnimations(scene) {
        if (scene.isPaused === true) {
            this.anims.pause();
        } else if (scene.isPaused === false) {
            this.anims.resume();
        }

    }


}
