

//implementation for the blue slime enemy.
class blueSlimeHS extends blueSlimeHSAbsorb {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 20, 'blueSlimeHS');

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        this.randomInput = Math.floor((Math.random() * 2));

        this.largeSlimeDamageCounter = false;
        //this.body.bounce.x = 1;
        this.jumpAnimationPlayed = false;

        this.slimeSoundCoolDown = false;

        this.slimeSoundsArray = ['1','2','3','4','5'];
        this.randomSlimeSound = Math.floor((Math.random() * 4));

        //defines Slime animations based on the players sex.
        if (sex === 0) {
            this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeJumpUp', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 4, end: 6 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeJumpUpInAir', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 6, end: 6 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 7, end: 11 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeStruggle', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 12, end: 16 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 16, end: 20 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 21, end: 24 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 24, end: 28 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 28, end: 31 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 32, end: 38 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 39, end: 42 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 43, end: 60 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 61, end: 64 }), frameRate: 8, repeat: -1 });
            
            } else {
            this.anims.create({ key: 'slimeIdle', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeJumpUp', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 4, end: 6 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeJumpUpInAir', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 6, end: 6 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrab', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 7, end: 11 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeStruggle', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 12, end: 15 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeDefeatedPlayer', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 16, end: 20 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated1', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 21, end: 24 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated2', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 24, end: 35 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated3', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 36, end: 39 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated4', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGrabDefeated5', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 44, end: 47 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'slimeGrabDefeated6', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 48, end: 56 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'slimeGameOver', frames: this.anims.generateFrameNames('blue-slime-HNF', { start: 57, end: 60 }), frameRate: 8, repeat: -1 });
            
            }
        this.anims.create({ key: 'slimeWasDefeated', frames: this.anims.generateFrameNames('blue-slime-HNM', { start: 71, end: 80 }), frameRate: 8, repeat: 0 });
            
        this.inSafeMode = inSafeMode;

        this.anims.play("slimeIdle",true);

        //if the slime is of size 1 then set its hit box to the correct size
        this.setSize(90, 90, true);
        this.setOffset(80, 203);

        this.body.setGravityY(600);

         //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitboxActive = false;

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
        this.setSize(90, 90, true);
        this.setOffset(80, 203);
        this.body.setGravityY(600);

        if(this.enemyHP > 0){

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
            this.grabHitBox.setSize(30,10,true);
            
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
                    this.anims.play('slimeJumpUp', true);
                    
                    //otherwise it plays falling down animation
                } else if (this.enemyPreviousY <= this.y) {
                    //console.log("slime in right down animation");
                    this.anims.play('slimeJumpUpInAir', true);
                    
                } 

                //handles sound effect when slime jumps
                this.playSlimeSound("3",200);
                
                // jumps the slime to the right
                this.setVelocityX(this.randomXVelocity);
                this.setVelocityY(this.randomYVelocity * -1);
                
                this.flipX = false;

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
                    this.anims.play('slimeJumpUp', true);
                    
                } else if (this.enemyPreviousY <= this.y) {
                    //console.log("slime in left down animation");
                    this.anims.play('slimeJumpUpInAir', true);
                
                }
                
                //handles slime when slime jumps
                this.playSlimeSound('3',200);

                // jumps the slime to the left
                this.setVelocityX(this.randomXVelocity * -1);
                this.setVelocityY(this.randomYVelocity * -1);
                 
                this.flipX = true;
                // this creates a random x and y velocity for the slimes next jump
                let currentSlime = this;
                setTimeout(function () {
                    currentSlime.moveCycleTimer = true;
                    currentSlime.randomXVelocity = Math.floor((Math.random() * 50) + 150);
                    currentSlime.randomYVelocity = Math.floor((Math.random() * 100) + 150);
                }, 200);

            }else if(this.checkXRangeFromPlayer(30, 30) || this.moveCycleTimer === true && this.activatedCycleTimer === true && this.body.blocked.down) {

                this.anims.play('slimeIdle', true);
                if(this.scene.player1.x < this.x){
                    this.setVelocityX(10 * -1);
                }else{
                    this.setVelocityX(10 * 1);
                }
   
            }
            
            let currentSlime = this;
        } else if(this.enemyDefeated === false) {
            //player is not in range of slime so slime is in idle animation.
            this.anims.play('slimeIdle', true);
            
            this.setVelocityX(0);

        }
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
        this.setDepth(4);

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

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.slimeGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
             //makes the struggle bar visible
            /*struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);*/
            
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
            this.playerIsStrugglingLogic(playerHealthObject);

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

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }
            
        }

    }

    slimeGrabFalse(){
        
        //hides player sprite
        this.scene.player1.visible = false;
       
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

            // check to make sure animations dont conflict with eachother.
           /* if (this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed) {
                this.anims.play("slimeStruggle", true);
            }*/
            // when entering grabs sets offset correctly so play isn't clipping through the ground. or clips through the ground falling nito the void
            //this.setOffset(40,129);
        
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    slimeGrabTrue(playerHealthObject){

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

        this.playerIsNotDefeatedInputsAbsorb(playerHealthObject);

    }

    playerIsStrugglingLogic(playerHealthObject){

        this.playerIsStrugglingLogicAbsorb(playerHealthObject);
    }

    playerIsDefeatedLogic(playerHealthObject){

        this.playerIsDefeatedLogicAbsorb();
    
    }

    playerEscaped(playerHealthObject){

        this.playerEscapedAbsorb(playerHealthObject);

        
    }
   
    // controls the damage resistance of the slime.
    damage(refrence) {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.enemyHP > 0) {
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.calcDamage(
                    refrence.sliceDamage,
                    refrence.bluntDamage,
                    refrence.pierceDamage,
                    refrence.heatDamage,
                    refrence.lightningDamage,
                    refrence.coldDamage,
                    refrence.curseDamage
                );

                this.playSlimeSound('5',200);
                
                if (this.enemyHP <= 0) {

                    console.log("HERE! HMS!88888888888888888888888888888888888888888888888888888888888888888888888888888")

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    let dropChance = Math.round((Math.random() * ((50) - (60 * this.scene.player1.dropChance)) + (60 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((7 * this.scene.player1.dropAmount)) + 5));

                    //decides amount of slime drops based on size
                        if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        }

                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.

                        this.anims.play('slimeWasDefeated').once('animationcomplete', () => {
                            //then destroy slime.
                            this.destroy();
                            this.grabHitBox.destroy();
                        });
                    
                   
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

    animationGrab(){
        this.animationGrabAbsorb();
    }
        
}
