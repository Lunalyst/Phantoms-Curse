

//implementation for the blue slime enemy.
class blueSlime extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
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
        this.randomInputCooldown = false;

        this.mitosing = false;
        this.mitosisCounter = false;
        this.body.bounce.x = 1;
        

        this.slimeSoundCoolDown = false;

        this.slimeSoundsArray = ['1','2','3','4','5'];
        this.randomSlimeSound = Math.floor((Math.random() * 4));

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitboxActive = false;
          
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
        this.anims.create({ key: 'smallSlimeDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 156, end: 164 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'largeSlimeDefeated', frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 165, end: 172 }), frameRate: 7, repeat: 0 });

        this.inSafeMode = inSafeMode;

        this.anims.play("slimeIdle",true);

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

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
          }
    }

    //functions that move slime objects.
    move() {

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

        //if the slimes body is on the ground and not dying
        if(this.body.blocked.down && this.enemyHP > 0){
            //put hitbox where it needs to be 
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y+30;
            this.grabHitBox.body.enable = true;
            if(this.slimeSize === 1){
                this.grabHitBox.setSize(30,10,true);
            }else{
                this.grabHitBox.setSize(40,10,true);
            }
        //otherwise hide grab hitbox.
        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
            this.grabHitBox.body.enable = false;
        }

        //checks to see if slime should jump to move if the player is in range
        if (this.checkXRangeFromPlayer(250, 250) && this.checkYRangeFromPlayer(200,100) && this.enemyDefeated === false) {
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if (!this.checkXRangeFromPlayer(80, 80) && this.scene.player1.x > this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false && this.body.blocked.down) {
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


            }else if(!this.checkXRangeFromPlayer(80, 80) && this.scene.player1.x < this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false && this.body.blocked.down) {
                //console.log("player is to the left of the slime");
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

            }else if(this.checkXRangeFromPlayer(30, 30) || this.moveCycleTimer === true && this.activatedCycleTimer === true && this.body.blocked.down) {

                if (this.slimeSize === 1) {
                    this.anims.play('slimeIdle', true);
                    if(this.scene.player1.x < this.x){
                        this.setVelocityX(10 * -1);
                    }else{
                        this.setVelocityX(10 * 1);
                    }

                } else if (this.slimeSize === 2 && this.mitosing === false) {
                    this.anims.play('slimeLargeIdle', true);
                    if(this.scene.player1.x < this.x){
                        this.setVelocityX(30 * -1);
                    }else{
                        this.setVelocityX(30 * 1);
                    }
                }
            }
            
            let currentSlime = this;
        } else if(this.enemyDefeated === false) {
            //player is not in range of slime so slime is in idle animation.
            if (this.slimeSize === 1) {
                this.anims.play('slimeIdle', true);
            } else if (this.slimeSize === 2 && this.mitosing === false) {
                this.anims.play('slimeLargeIdle', true);
            }
            this.setVelocityX(0);

        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveIdle() {

        if (this.slimeSize === 1) {
            this.anims.play('slimeIdle', true);

        } else if (this.slimeSize === 2) {
            this.anims.play('slimeLargeIdle', true);

        }
        this.body.setGravityY(600);
        this.setVelocityX(0);
        this.setDepth(4);

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

            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null,
                playerMaxHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            console.log("playerHealthObject: ",playerHealthObject);

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
    slimeGrabFalse(){
        //hides player object during grab.
        this.scene.player1.visible = false;
        
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

        //set the player grabbed in this enemy to true
        this.playerGrabbed = true;
    }

    //function handles the player struggle buttons
    playerIsNotDefeatedInputs(playerHealthObject){

        let currentSlime = this;

        if (this.randomInput === 0 && this.slimeSize === 2) {
            if (this.scene.checkAPressed() === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 20;
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
        } else if (this.randomInput === 1 && this.slimeSize === 2) {
            // important anims.play block so that the animation can player properly.
            if (this.scene.checkDPressed() === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 20;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }else if(this.scene.checkAPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
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
        } else if (this.slimeSize === 1) {
            // important anims.play block so that the animation can player properly.

            if (this.scene.checkAPressed() === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (this.slimeSize === 1 && playerHealthObject.playerHealth >= 1) {
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

        }

        // randomizing input
        if (this.randomInputCooldown === false && this.slimeSize === 2) {

            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 2));
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
            }
            setTimeout(function () {
                currentSlime.randomInputCooldown = false;
                // resets the animation block.
                currentSlime.keyAnimationPlayed = false;
            }, 2000);
        } else if (this.slimeSize === 1) {
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }
        }

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
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

    }

    //function to handle player health loss.
    playerIsStrugglingLogic(playerHealthObject){

        let currentSlime = this;

        //apply damage functions based on slime size
        if (this.slimeSize === 2 && this.playerDamageTimer === false ) {
            //variable to lock out damage
            this.playerDamageTimer = true;

            //if the players health is above half, then deal hp damage.
            if(playerHealthObject.playerHealth >= playerHealthObject.playerMaxHealth/2){
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,4);
                }
                
                //time out for 1.5 seconds
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 1500);
            }else if(playerHealthObject.playerCurse <= (playerHealthObject.playerCurseMax)/2){
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,3);
                }
    
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 1500);
            }else{
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,4);
                }
    
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 1000);
            }

        }else if (this.slimeSize === 1  && this.playerDamageTimer === false ) {

            this.playerDamageTimer = true;

            //if the players health is above half, then deal hp damage.
            if(playerHealthObject.playerHealth >= playerHealthObject.playerMaxHealth/2){

                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,2);
                }
    
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 2000);

            }else if(playerHealthObject.playerCurse <= (playerHealthObject.playerCurseMax)/2){
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 1500);
            }else{
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentSlime.playerDamageTimer = false;
                }, 1000);
            }
            
            // if the player has been defeated the do the following steps.
        }

        // if its a small slime then play the small slime grab animation.
        if (this.slimeSize === 1) {

            //if the player isnt defeated.
            if(this.playerDefeated === false ){

                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeatedAnimationStage === 0  ) {
                    this.anims.play("slimeGrab", true);
                    //handles sound effect diring grab struggle
                    this.playSlimeSound('3',800);

                //if the defeated stage is incremented, then play the animation of the player falling. need to pause damage, as well as the player ability to struggle.
                }else if(this.playerDefeatedAnimationStage === 1 && this.animationPlayed === false){
                    this.animationPlayed = true;
                    this.anims.play("slimeGrabFallingDefeated", true).once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.playerDefeatedAnimationStage++;
                    });
                }else if(this.playerDefeatedAnimationStage === 3){
                    this.anims.play("slimeGrabDefeated2", true);
                    this.playPlapSound('plap10',2000);
                    
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisSlime = this;
                        setTimeout(function () {
                            thisSlime.onomatPlayed = false;
                            
                        }, 600);
                    }
                    
                }else if(this.playerDefeatedAnimationStage === 4){
                    this.anims.play('slimeGrabDefeated3', true);
                    this.playSlimeSound('3',600);
                    this.playPlapSound('plap9',1000);
        
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisSlime = this;
                        setTimeout(function () {
                            thisSlime.onomatPlayed = false;
                            
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
            
        }else if(this.slimeSize === 2) {

            if (this.playerDefeatedAnimationStage === 0  )  {
                this.anims.play("largeSlimeStruggle", true);
                this.playSlimeSound('2',800);
            }else if(this.playerDefeatedAnimationStage === 1 && this.animationPlayed === false){
                this.animationPlayed = true;
                this.anims.play("largeSlimefallingDefeated", true).once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    //this.playerDefeatedAnimationStage++;
                });
            }else if(this.playerDefeatedAnimationStage === 2){
                this.anims.play("largeSlimeGrabDefeated1", true);
                this.playSlimeSound('2',800);
                
            }else if(this.playerDefeatedAnimationStage === 3 && this.animationPlayed === false){
                //handles internal view
                this.scene.internalView = new internalView(this.scene,this.x,this.y+60,'slime')
                this.scene.internalView.anims.play("slimePening");
                this.scene.internalView.setRotation(3.14/2);

                console.log("this.scene.internalView: ",this.scene.internalView)
                this.playSlimeSound('4',800);
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.internalView.anims.play("slimeWiggle1");
                });
            }else if(this.playerDefeatedAnimationStage === 4){
                console.log("this.scene.internalView: ",this.scene.internalView)
                this.playSlimeSound('1',600);
                this.playPlapSound('plap10',1800);
                this.anims.play('largeSlimeGrabDefeated3', true);
    
                if (this.onomatPlayed === false) {
                    this.onomatPlayed = true;
                    let randX = Math.floor((Math.random() * 15));
                    let randY = Math.floor((Math.random() * 15));
    
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+30,'charBubble',"@heart@");
                    this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                    this.scene.heartOnomat1.setScale(1/4);
                    this.scene.heartOnomat1.textFadeOutAndDestroy(600);
    
                    let thisSlime = this;
                    setTimeout(function () {
                        thisSlime.onomatPlayed = false;
                        
                    }, 600);
                }     
            }

            //progression for grab stages
            if(playerHealthObject.playerHealth < playerHealthObject.playerMaxHealth/2 && this.playerDefeatedAnimationStage === 0){
                //increment the stage so behavior changes.
                this.playerDefeatedAnimationStage++;
            }else if(playerHealthObject.playerCurse > (playerHealthObject.playerCurseMax)/2 && this.playerDefeatedAnimationStage === 2){
                //increment the stage so behavior changes.
                this.playerDefeatedAnimationStage++;
            }
        }
        

        
    }

    playerIsDefeatedLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
        if (this.slimeSize === 1) {
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

            this.scene.enemyThatDefeatedPlayer = "blueSlime";

            // if we start the player defeated animation then we need to set a few things.
            ///HERE! NEEDS TO CHECK FI PALYER DEFEATED, TO START THE DEFEATED PROGRESSION AND SETTING OF KEYPROMPTS, LOCKS OUT SO IT ONLY HAPPENS ONCE. 
            //CANT USE STAGE TO CHECK BECAUSE IF WE PROGRESS THEN IT WILL BREAK THINGS IF THIS ACTIVATES CONSTANTLY. LIKE WHAT HAPPENED WHEN I TRYED.
            if (this.inStartDefeatedLogic === false) {

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
            this.smallSlimeDefeatedPlayerAnimation();

            // same code but for the large slime if it beats the player.
        } else if (this.slimeSize === 2) {


            this.playerDefeated = true;
            //console.log(" keyA: "+keyA+" keyD: "+keyD);
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
            this.scene.enemyThatDefeatedPlayer = "largeBlueSlime";
            // if we start the player defeated animation then we need to set a few things.
            if (this.inStartDefeatedLogic === false) {
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

            if (this.scene.checkDPressed() &&
            this.playerDefeatedAnimationCooldown === false &&
            this.inStartDefeatedLogic === true &&
             this.scene.KeyDisplay.visible === true &&
              this.playerDefeatedAnimationStage !== 3 &&
               this.playerDefeatedAnimationStage !== 6) {

                this.scene.KeyDisplay.visible = false;
                this.playerDefeatedAnimationCooldown = true;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationStage++;
                let currentSlime = this;
                console.log("currentSlime.playerDefeatedAnimationStage: " + currentSlime.playerDefeatedAnimationStage);

                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentSlime.scene.KeyDisplay.visible = true;
                    currentSlime.playerDefeatedAnimationCooldown = false;
                    currentSlime.scene.KeyDisplay.playDKey();
                }, 3000);
            }
            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage, " ")
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 7 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                    this.scene.sound.get("plapSFX").stop();
                }
                this.scene.changeToGameover();
            }

            //function to call large slime gameover Animations.
            this.largeSlimeDefeatedPlayerAnimation();
        }

    }

    playerEscaped(playerHealthObject){

        let currentSlime = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.slimeSize === 1 && this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                // handles the breaking free animation.
                //if (!this.animationPlayed) {
                    //this.animationPlayed = true;
                    //this.anims.play('slimeGrabBreak').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        currentSlime.struggleFree = true;
                    //});
                //}
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
                currentSlime = this;
                setTimeout(function () {

                    currentSlime.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
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
                this.setVelocityX(0);
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
                otherSlime.grabHitBox.destroy();
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
                    this.scene.player1.coldDamage,
                    this.scene.player1.curseDamage
                );

                this.playSlimeSound('5',200);
                
                //if the slimes hp is at zero
                if (this.enemyHP <= 0) {
                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drtop chance
                    let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                    //decides amount of slime drops based on size
                    if(this.slimeSize === 1){
                        if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        }

                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.

                        this.anims.play('smallSlimeDefeated').once('animationcomplete', () => {
                            //then destroy slime.
                            this.destroy();
                            this.grabHitBox.destroy();
                        });
                    }else{
                        if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount+3,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        }
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.
                        this.anims.play('largeSlimeDefeated').once('animationcomplete', () => {
                            //then destroy slime.
                            this.destroy();
                            this.grabHitBox.destroy();
                        });
                    }
                    //play animation of slime defeated based on size.

                    
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
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
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
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    // plays the slime defeated player animations.
    smallSlimeDefeatedPlayerAnimation() {
        let currentSlime = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 9;

            if (!this.animationPlayed) {
                this.playSlimeSound('2',800);
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('slimeGrabFallingDefeated').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('slimeGrabDefeated1', true);
            this.playSlimeSound('2',800);

            let thisSlime = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            this.anims.play('slimeGrabDefeated2', true);
            let thisSlime = this;

            this.playPlapSound('plap10',2000);
            
            //plays onomat 
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }
            
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('slimeGrabDefeated3', true);
            this.playSlimeSound('3',600);
            this.playPlapSound('plap9',1000);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }

        } else if (this.playerDefeatedAnimationStage === 5) {
            this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                //this.scene.onomat.destroy();
                this.scene.onomat = new makeText(this.scene,this.x+15,this.y+30,'charBubble',"SPURT!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(900);

                this.anims.play('slimeGrabDefeated4').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.onomat.destroy();
                });
            }
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.playSlimeSound('4',600);
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.scene.onomat.destroy();
                this.scene.onomat = new makeText(this.scene,this.x+15,this.y+30,'charBubble',"SQUEEEZZZEE!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(900);

                this.anims.play('slimeGrabDefeated5').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.onomat.destroy();
                });
            }
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.playSlimeSound('3',600);
            this.anims.play('slimeGrabDefeated6', true);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;

                this.scene.onomat = new makeText(this.scene,this.x-13,this.y+20,'charBubble',"WOBBLE...");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textSlosh();
                this.scene.onomat.textFadeOutAndDestroy(900);
                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 1000);
            }
        } else if (this.playerDefeatedAnimationStage === 8) {
            this.playSlimeSound('5',600);
            if (!this.animationPlayed) {
                //plays curse sound effect
                this.scene.initSoundEffect('curseSFX','curse',0.3);

                if(this.scene.lightingSystemActive === true){
                    this.curseLight.x = this.x-5;
                    this.curseLight.y = this.y+5;
                    this.curseLight.visible = true;
                }

                currentSlime = this;
                setTimeout(function () {
                    //display the curselight when player is cursed.
                    if(currentSlime.scene.lightingSystemActive === true){
                        currentSlime.curseLight.visible = false;
                    }
                }, 1000);

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

            this.playerDefeatedAnimationStageMax = 8;
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.playSlimeSound('5',800);
                this.animationPlayed = true;
                this.anims.play('largeSlimefallingDefeated').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.onomat.destroy();
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('largeSlimeGrabDefeated1', true);
            this.playSlimeSound('2',800);

            
            

        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {

                //handles internal view
                this.scene.internalView = new internalView(this.scene,this.x,this.y+60,'slime')
                this.scene.internalView.anims.play("slimePening");
                this.scene.internalView.setRotation(3.14/2);

                console.log("this.scene.internalView: ",this.scene.internalView)
                this.playSlimeSound('4',800);
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.scene.internalView.anims.play("slimeWiggle1");
                });
            }
        } else if (this.playerDefeatedAnimationStage === 4) {
            console.log("this.scene.internalView: ",this.scene.internalView)
            this.playSlimeSound('1',600);
            this.playPlapSound('plap10',1800);
            this.anims.play('largeSlimeGrabDefeated3', true);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+30,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }

        } else if (this.playerDefeatedAnimationStage === 5) {
            this.playSlimeSound('1',400);
            this.playPlapSound('plap11',500);
            this.anims.play('largeSlimeGrabDefeated4', true);

            this.scene.internalView.anims.play("slimeWiggle2",true);

            if (this.onomatPlayed === false) {
                
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));

                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+30,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                randX = Math.floor((Math.random() * 30));
                randY = Math.floor((Math.random() * 30));

                this.scene.heartOnomat2 = new makeText(this.scene,this.x-randX,this.y-randY+30,'charBubble',"@heart@");
                this.scene.heartOnomat2.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat2.setScale(1/4);
                this.scene.heartOnomat2.textFadeOutAndDestroy(600);

                let thisSlime = this;
                setTimeout(function () {
                    thisSlime.onomatPlayed = false;
                    
                }, 600);
            }
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.playSlimeSound('5',2000);
            if (!this.animationPlayed) {
                //plays curse sound effect

                this.scene.internalView.anims.play("slimeExpanding").once('animationcomplete', () => {
                    this.scene.internalView.anims.play("slimeInflation");
                        let thisSlime = this;
                        setTimeout(function () {
                            thisSlime.scene.internalView.destroy()     
                        }, 1000);

                });
                currentSlime = this;
                setTimeout(function () {
                    if(currentSlime.scene.sound.get("plapSFX") !== null && currentSlime.scene.sound.get("plapSFX") !== undefined){
                        currentSlime.scene.sound.get("plapSFX").stop();
                    }
                    currentSlime.scene.initSoundEffect('curseSFX','curse',0.3);

                    //display the curselight when player is cursed.
                    if(currentSlime.scene.lightingSystemActive === true){
                        currentSlime.curseLight.x = currentSlime.x;
                        currentSlime.curseLight.y = currentSlime.y-20;
                        currentSlime.curseLight.visible = true;
                    }
                }, 2000);

                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SQUIRT!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
               
                this.animationPlayed = true;
                this.anims.play('largeSlimeGrabDefeated5').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;

                    //after cursing is over hide the light.
                    if(this.scene.lightingSystemActive === true){
                        this.curseLight.visible = false;
                      }

                });
            }
        } else if (this.playerDefeatedAnimationStage === 7) {
            this.anims.play('largeSlimeGrabDefeated6', true);

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
                if(this.slimeSize === 1){
                    //play struggle animation and sounds.
                    this.anims.play("slimeGrab",true);
                }else{
                    this.anims.play("largeSlimeStruggle", true);
                }
                //handles sound effect diring grab struggle
                this.playSlimeSound('3',800);
                

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
