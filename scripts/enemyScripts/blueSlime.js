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
class blueSlime extends enemy {
    
    constructor(scene, xPos, yPos, sex, id) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 20, 'blueSlime');

        // sets gravity 
        this.body.setGravityY(600); 
        this.slimeSize = 1;

        //randomizes variables
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        this.randomInput = Math.floor((Math.random() * 2));

        this.mitosing = false;
        this.mitosisCounter = false;
        this.largeSlimeDamageCounter = false;
        this.body.bounce.x = 1;
        this.randomInputCooldown = false;

        this.slimeSoundsArray = ['1','2','3','4','5'];
        this.randomSlimeSound = Math.floor((Math.random() * 4));

        //loads enemy sounds
        scene.load.audioSprite('blueSlimeSFX','../audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
            "../audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
          ]);

          
        
        //defines Slime animations based on the players sex.
        if (sex === 0) {
            this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeJumpUp', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeJumpDown', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 6, end: 6 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 14, end: 19 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabBreak', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 20, end: 22 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'slimeGrabFallingDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 23, end: 30 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 31, end: 34 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 36, end: 37 }), frameRate: 7, repeat: 1 });
            this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 36, end: 39 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 40, end: 45 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 46, end: 52 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 53, end: 55 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 56, end: 66 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 67, end: 71 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mitosis', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 72, end: 78 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeLargeIdle', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 78, end: 81 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeLargeUp', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 82, end: 82 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeLargeDown', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 83, end: 83 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeStruggle', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 85, end: 100 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimefallingDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 101, end: 106 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated1', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 104, end: 107 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated2', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 108, end: 112 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated3', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 113, end: 116 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated4', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 116, end: 119 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated5', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 120, end: 141 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated6', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 141, end: 144 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGameOver1', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 145, end: 148 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGameOver2', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 149, end: 152 }), frameRate: 7, repeat: -0 });
            this.anims.create({ key: 'slimeGameOver3', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 152, end: 155 }), frameRate: 7, repeat: -1 });
        } else {
            this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeJumpUp', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeJumpDown', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 6, end: 6 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 14, end: 19 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabBreak', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 20, end: 22 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'slimeGrabFallingDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 23, end: 30 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 31, end: 34 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 36, end: 37 }), frameRate: 7, repeat: 1 });
            this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 36, end: 39 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 40, end: 45 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 46, end: 52 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 53, end: 55 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated7', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 56, end: 66 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 67, end: 71 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mitosis', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 72, end: 78 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'slimeLargeIdle', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 78, end: 81 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeLargeUp', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 82, end: 82 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeLargeDown', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 83, end: 83 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeStruggle', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 85, end: 100 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimefallingDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 101, end: 107 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated1', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 104, end: 107 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated2', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 108, end: 112 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated3', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 113, end: 116 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated4', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 116, end: 119 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'largeSlimeGrabDefeated5', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 120, end: 141 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'largeSlimeGrabDefeated6', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 141, end: 144 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGameOver1', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 145, end: 148 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'slimeGameOver2', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 149, end: 152 }), frameRate: 7, repeat: -0 });
            this.anims.create({ key: 'slimeGameOver3', frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 152, end: 155 }), frameRate: 7, repeat: -1 });
        }



    }

    //functions that move slime objects.
    move(player1,scene) {

        //if the slime is of size 1 then set its hit box to the correct size
        if (this.slimeSize === 1) {
            this.setSize(90, 65, true);
            this.setOffset(105, 233);

            this.body.setGravityY(600);
            //else if the slime is size 2 then set its hit box to the correct size
        } else if (this.slimeSize === 2) {
            this.setSize(130, 90, true);
            this.setOffset(82, 209);
            this.body.setGravityY(700);
        }
        //this.movecycletimer is used to keep track of the slime movement. its incrimented to 100 and then set to zero so it loops
        if (this.moveCycleTimer === true && this.activatedCycleTimer === false) {
            let currentSlime = this;
            //controls the random delay between the slimes movements.
            setTimeout(function () {
                currentSlime.moveCycleTimer = false;
                currentSlime.activatedCycleTimer = false;
                currentSlime.randomMoveTimer = Math.floor((Math.random() * 3000) + 2000);
            }, this.randomMoveTimer);
            this.activatedCycleTimer = true;
        }
        //checks to see if slime should jump to move if the player is in range
        if (player1.x > this.x - 400 && player1.x < this.x + 400) {
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if (player1.x > this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false) {
                //console.log("player is to the right of the slime");
                //this if statement checks where the slime is in its jump cycle. if its going up then it plays the up animation
                if (this.enemyPreviousY > this.y) {

                    //console.log("slime in right up animation");
                    if (this.slimeSize === 1) {
                        this.anims.play('slimeJumpUp', true);
                    } else if (this.slimeSize === 2 && this.mitosing === false) {
                        this.anims.play('slimeLargeUp', true);
                    }
                    //otherwise it plays falling down animation
                } else if (this.enemyPreviousY <= this.y) {
                    //console.log("slime in right down animation");
                    if (this.slimeSize === 1) {
                        this.anims.play('slimeJumpDown', true);
                    } else if (this.slimeSize === 2 && this.mitosing === false) {
                        this.anims.play('slimeLargeDown', true);
                    }
                } 

                //handles sound effect when slime jumps
                this.playSlimeSound("3",200);
                
                // jumps the slime to the right
                if (this.slimeSize === 1) {
                    this.setVelocityX(this.randomXVelocity);
                    this.setVelocityY(this.randomYVelocity * -1);
                } else if (this.slimeSize === 2) {
                    this.setVelocityX(this.randomXVelocity);
                    this.setVelocityY(this.randomYVelocity * -1);
                }
                let currentSlime = this;
                setTimeout(function () {
                    currentSlime.moveCycleTimer = true;
                    currentSlime.randomXVelocity = Math.floor((Math.random() * 50) + 150);
                    currentSlime.randomYVelocity = Math.floor((Math.random() * 100) + 150);
                }, 200);


            } else if (player1.x < this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false) {
                console.log("player is to the left of the slime");
                if (this.enemyPreviousY < this.y) {
                    //console.log("slime in left up animation");
                    if (this.slimeSize === 1) {
                        this.anims.play('slimeJumpUp', true);
                    } else if (this.slimeSize === 2 && this.mitosing === false) {
                        this.anims.play('slimeLargeUp', true);
                    }
                } else if (this.enemyPreviousY <= this.y) {
                    //console.log("slime in left down animation");
                    if (this.slimeSize === 1) {
                        this.anims.play('slimeJumpDown', true);
                    } else if (this.slimeSize === 2 && this.mitosing === false) {
                        this.anims.play('slimeLargeUp', true);
                    }
                } else {
                  
                }
                
                //handles slime when slime jumps
                this.playSlimeSound('3',200);

                // jumps the slime to the left
                if (this.slimeSize === 1) {
                    this.setVelocityX(this.randomXVelocity * -1);
                    this.setVelocityY(this.randomYVelocity * -1);
                } else if (this.slimeSize === 2) {
                    this.setVelocityX(this.randomXVelocity * -1);
                    this.setVelocityY(this.randomYVelocity * -1);
                }
                // this creates a random x and y velocity for the slimes next jump
                let currentSlime = this;
                setTimeout(function () {
                    currentSlime.moveCycleTimer = true;
                    currentSlime.randomXVelocity = Math.floor((Math.random() * 50) + 150);
                    currentSlime.randomYVelocity = Math.floor((Math.random() * 100) + 150);
                }, 200);

            } else if (this.moveCycleTimer === true && this.activatedCycleTimer === true && this.body.blocked.down) {
                if (this.slimeSize === 1) {
                    this.anims.play('slimeIdle', true);
                } else if (this.slimeSize === 2 && this.mitosing === false) {
                    this.anims.play('slimeLargeIdle', true);
                }
                this.setVelocityX(0);

            }
            let currentSlime = this;
        } else {
            //player is not in range of slime so slime is in idle animation.
            this.anims.play('slimeIdle', true);
            this.setVelocityX(0);

        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }
    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveIdle() {
        //this.setSize(90, 65, true);
        //this.setOffset(105, 233);
        if (this.slimeSize === 1) {
            this.anims.play('slimeIdle', true);
            //this.setSize(90, 65, true);
        } else if (this.slimeSize === 2) {
            this.anims.play('slimeLargeIdle', true);
            //this.setSize(40, 34, true);
        }
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }
    // functioned called to play animation when the player is defeated by the slime in gameover.
    slimeGameOver() {
        this.setSize(100, 150, true);
        this.setOffset(90, 150);
        this.anims.play('slimeGameOver', true);
    }
    // functioned called to play animation when the player is defeated by the large slime in gameover.
    largeSlimeGameOver() {
        this.setSize(130, 90, true);
        this.setOffset(82, 209);
        this.anims.play('slimeGameOver1', true);
        this.y - 500;
        let currentSlime = this;

        this.anims.play('slimeGameOver2').once('animationcomplete', () => {

            this.anims.play('slimeGameOver3', true);
        });

    }

    //the grab function. is called when player has overlaped with an enemy slime.
    grab(scene, player1, KeyDisplay,keyTAB, keyW, keyS,keyA, keyD) {
        let currentSlime = this;
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.


        this.clearTint();
        // moves player attackhitbox out of the way.
        console.log();
        scene.attackHitBox.y = player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {
            // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
            console.log("this slime did not grab the player this.slimeID: " + this.enemyId);
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
            //console.log("this.playerDefeated: ",this.playerDefeated);
            if (this.playerDefeated === false) {

                //logic handles random key imputs display to player and there interactability.
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

                //handles sound effect diring grab struggle
                this.playSlimeSound('3',800);
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
                    this.inStartDefeatedLogic = true;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                }

                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage,
                " this.playerDefeatedAnimationCooldown: ",this.playerDefeatedAnimationCooldown,
                " this.inStartDefeatedLogic: ",this.inStartDefeatedLogic);
                if (keyD.isDown && this.playerDefeatedAnimationCooldown === false && this.inStartDefeatedLogic === false
                && KeyDisplay.visible === true && this.playerDefeatedAnimationStage !== 5 
                && this.playerDefeatedAnimationStage !== 6 && this.playerDefeatedAnimationStage !== 8) {
                    KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    let currentSlime = this;
                    console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                        currentSlime.playerDefeatedAnimationCooldown = false;
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
                    this.inStartDefeatedLogic = true;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                }

                if (Phaser.Input.Keyboard.JustDown(keyD) &&
                 this.playerDefeatedAnimationCooldown === false &&this.inStartDefeatedLogic === false && KeyDisplay.visible === true &&
                  this.playerDefeatedAnimationStage !== 3 && this.playerDefeatedAnimationStage !== 6) {
                    KeyDisplay.visible = false;
                    this.playerDefeatedAnimationCooldown = true;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationStage++;
                    let currentSlime = this;
                    console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        currentSlime.playerDefeatedAnimationCooldown = false;
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

            //console.log("this.struggleFree", this.struggleFree,"playerHealthObject.playerHealth",playerHealthObject.playerHealth);
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
                    console.log("player has broken free" );
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
                    scene.grabbed = false;
                    scene.grabCoolDown = true;
                    

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
    slimeCombine(otherSlime, grabbed,scene) {
        //console.log("combining slime with id: "+this.slimeId+" to the other slime with id: "+ otherSlime.slimeId)
        //console.log("grabbed : "+ grabbed);
        if (grabbed === false) {
            if (this.enemyId === otherSlime.enemyId) {
                //console.log("slime overlap with its self detected;");
                return;
            } else if (this.enemyId < otherSlime.enemyId) {
                console.log("this slime with Id: "+ this.enemyId+" is living")
                this.setSize(130, 90, true);
                this.setOffset(82, 209);
                this.anims.play("mitosis");
                this.slimeSize = 2;
                this.enemyHP = 40;
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

                //plays sound effects when slimes combine
                this.playSlimeSound('5',200);


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
    damage(scene) {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.enemyHP > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.calcDamage(
                    scene.player1.sliceDamage,
                    scene.player1.bluntDamage,
                    scene.player1.pierceDamage,
                    scene.player1.heatDamage,
                    scene.player1.lightningDamage,
                    scene.player1.coldDamage
                );
                if (this.enemyHP <= 0) {
                    this.destroy();
                }
            }
            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;
    
            this.playSlimeSound('5',200);

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
    smallSlimeDefeatedPlayerAnimation() {
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('slimeGrabFallingDefeated').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
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
                this.playSlimeSound('5',800);
                this.animationPlayed = true;
                this.anims.play('largeSlimefallingDefeated').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('largeSlimeGrabDefeated1', true);
            this.playSlimeSound('2',800);
        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {
                this.playSlimeSound('4',800);
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.playSlimeSound('1',600);
            this.anims.play('largeSlimeGrabDefeated3', true);
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.playSlimeSound('1',400);
            this.anims.play('largeSlimeGrabDefeated4', true);
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.playSlimeSound('5',2000);
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.playSlimeSound('2',800);
            this.anims.play('largeSlimeGrabDefeated6', true);
        }


    }
    //plays slime sound based in type input being 1-5 and a time delay
    playSlimeSound(type,delay){
        if(this.soundCoolDown === false){
            this.scene.initSoundEffect('blueSlimeSFX',type,0.3);
            console.log("this.randomSlimeSound: ",this.randomSlimeSound);
            this.randomSlimeSound = Math.floor((Math.random() * 4));
            this.soundCoolDown = true;
    
            let currentSlime = this;
            setTimeout(function () {
                currentSlime.soundCoolDown = false;
            }, delay);
        }

    }
    
    
}
