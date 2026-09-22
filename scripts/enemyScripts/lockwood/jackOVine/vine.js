// wood barriers that break when the player does enough damage to them.
class vine extends enemy{

    constructor(scene, xPos, yPos, sex, id,flip){
        //super() calls the constructor() from the parent class we are extending

        super(scene, xPos, yPos , sex,id,10,'vines');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        //this.setScale(1/3,1/3);
        this.flipX = flip;

        //barrie danage variables.
        this.scene = scene;

        //this.visible = false;

        this.setScale(1);

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitBoxHide();
        this.grabCoolDown = false;
        this.isMoving = false;
        this.returnedWithPlayerGrabbed = false;

         this.setDepth(9);

        this.originalX = xPos;
        this.originalY = yPos;

        this.maxMoves = 10;
        this.currentMoves = 0;

        this.animationPlaying = false;
        this.animationPlayed = false;

        this.anims.create({ key: 'travel', frames: this.anims.generateFrameNames('vines', { start: 0, end: 12 }), frameRate:  20, repeat: 0 });
        this.anims.create({ key: 'grabStart', frames: this.anims.generateFrameNames('vines', { start: 14, end: 20 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'grabMiddle', frames: this.anims.generateFrameNames('vines', { start: 21, end: 23 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'grabEnd', frames: this.anims.generateFrameNames('vines', { start: 24, end: 29 }), frameRate:  10, repeat: 0 });
        if(sex === 0 ){
            this.anims.create({ key: 'PlayerGrabbedStart', frames: this.anims.generateFrameNames('vines', { start:30, end: 32 }), frameRate:  7, repeat: 0 });
            this.anims.create({ key: 'PlayerGrabbed', frames: this.anims.generateFrameNames('vines', { start:33, end: 36 }), frameRate:  7, repeat: -1 });
            this.anims.create({ key: 'PlayerGrabbedStruggle', frames: this.anims.generateFrameNames('vines', { start:37, end: 40 }), frameRate:  7, repeat: 0 });
        
        }else{
        
        }

    }
    
    //pauses the animations of the enemys.
    pauseAnimations(scene) {
        if (scene.isPaused === true) {
            this.anims.pause();
        } else if (scene.isPaused === false) {
            this.anims.resume();
        }

    }

    moveIdle() {
        this.damage();
    }

    move(){

        if(this.checkXRangeFromPlayer(20, 20) && this.checkYRangeFromPlayer(120, 120)){

            if(this.animationPlaying === false){
                this.animationPlaying = true;

                 this.x = this.scene.player1.x;

                this.anims.play('grabStart').once('animationcomplete', () => {
                    this.hitboxActive = true;
                    console.log("this.scene.grabCoolDown: ",this.scene.grabCoolDown)
            
                    this.anims.play('grabMiddle').once('animationcomplete', () => {
                        this.hitboxActive = false;

                        //saftey case
                        if(this.playerGrabbed === false){

                            this.anims.play('grabEnd').once('animationcomplete', () => {
                            
                                //if vines missed the player, then destroy them.
                                this.damage();
                                        
                            }); 
                            
                        }
                                    
                    });   
                                    
                });
        }

        }else{
            if(this.animationPlaying === false){
                this.animationPlaying = true;
                this.anims.play('travel').once('animationcomplete', () => {
                    this.currentMoves++; 
                    this.animationPlaying = false; 

                    if(this.flipX === false){
                        this.x = this.x + 40;
                    }else{
                    this.x = this.x - 40;  
                    }


                                
                });
            }
        }

        //handles hit box positioning
        if(this.hitboxActive === true){

            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y-20;

        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
    }

    resetVariables(){
        

        this.struggleFree = false;
        this.playerBrokeFree = 0;
        this.returnedWithPlayerGrabbed = false;

        this.isAttacking = false;

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

        this.scene.player1.mainHitbox.x = this.x;
        ///this.scene.player1.y = this.y;
        this.scene.grabbed = false;
        this.scene.KeyDisplay.visible = false;

    }
    
    randomizeInput(){

        // randomizing input
        //console.log("this.randomInputCooldown: ",this.randomInputCooldown);
        if (this.randomInputCooldown === false) {
            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 2));
            console.log("randomizing the key prompt " + this.randomInput);

            if(this.keyAnimationPlayed === false && this.randomInput === 0) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
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

    playerIsNotDefeatedInputs(playerHealthObject){
        // correct keys to escape can be ASD
       // console.log("testing vine grab?")
        if(this.startedGrab === true && this.struggleFree === false && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && playerHealthObject.playerHealth > 0){
            //console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

                if (this.randomInput === 0) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();

            
                }
                
                if(this.struggleAnimationInterupt === false){

                    this.struggleAnimationInterupt = true;

                    this.anims.play('PlayerGrabbedStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }

 
            }else if(this.scene.checkDPressed() === true) {

                if (this.randomInput === 1) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }


                if(this.struggleAnimationInterupt === false){

                    this.struggleAnimationInterupt = true;

                    this.anims.play('PlayerGrabbedStruggle').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.struggleAnimationInterupt = false;
                    });
                }

                //this.animationPlayed = false;
                //this.struggleAnimationInterupt = false;
            }
        }
        
        this.randomizeInput();

        this.reduceStruggleCounter();
    }


    playerIsStrugglingLogic(){

        this.scene.player1.x = this.x;
        if(this.x < this.originalX-10 &&  this.isMoving === true){
          //this.setVelocityX(40);
        }else if(this.x > this.originalX+10 &&  this.isMoving === true){
          //this.setVelocityX(-40);
        }else if(this.isMoving === true){
          //this.setVelocityX(0);
          //this.isMoving = false;
          //this.returnedWithPlayerGrabbed = true;
        }
      

        //console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed, " this.struggleAnimationInterupt: ",this.struggleAnimationInterupt);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.
        if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            //this.struggleAnimationInterupt = true;

            this.hitBoxHide();

            this.anims.play('PlayerGrabbedStart').once('animationcomplete', () => {
                this.startedGrab = true;
                this.animationPlayed = false;

                //makes the struggle bar visible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
                struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.struggleCap);
                // makes the key prompts visible.
                this.scene.KeyDisplay.visible = true;

                let temp = this;
                setTimeout(function () {
                  temp.isMoving = true;
        
                },1000);
            });
            
        }else if(this.playerDefeatedAnimationStage === 0 && this.struggleAnimationInterupt === false && this.startedGrab === true){
            this.anims.play("PlayerGrabbed", true);
        }
    }

    playerEscaped(playerHealthObject){

        this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);
            
        //console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {

                //if the palyer is grabbed, and in the tiger stomach
                if(this.playerDefeatedAnimationStage === 0 && this.spitUp === false){

                    this.spitUp = true;
                    this.struggleFree = true;

                    //then free player.
                    this.resetVariables();

                    this.scene.grabCoolDown = false;
                    
                    this.setVelocityX(0);

                    this.anims.play('grabEnd').once('animationcomplete', () => {
                            
                        //if vines missed the player, then destroy them.
                        this.damage();
                                        
                     }); 

                    this.hitboxActive = false;
                    this.grabHitBox.x = this.x;
                    this.grabHitBox.y = this.y + 3000; 
                    
                }
                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            }
    }

    playerTransferToRoot(){

        this.scene.KeyDisplay.visible = false;
        struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        //hides the mobile controls in the way of the tab/skip indicator.
        controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

        //then free player.
        this.struggleFree = false;
        this.playerBrokeFree = 0;
        this.returnedWithPlayerGrabbed = false;
        this.grabCoolDown = false;
        this.isAttacking = false;

        this.struggleCounter = 0;
        this.animationPlayed = false;
        this.playerDamaged = false;
        
        this.keyAnimationPlayed = false;
        //this.scene.player1.visible = true;
        this.isPlayingMissedAnims = false;
        this.grabTimer = false;

        this.startedGrab = false;
        this.playerDefeatedAnimationStage = 0;
        this.struggleAnimationInterupt = false;
        this.spitUp = false;

        this.scene.player1.mainHitbox.x = this.x;
        ///this.scene.player1.y = this.y;
        //this.scene.grabbed = false;

        //console.log("this.matangoRoot", this.matangoRoot);
                    
        this.setVelocityX(0);
        this.isMoving = false;

        this.handRise();
        
    }


    grab(){
      this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        //console.log("this.playerGrabbed: ", this.playerGrabbed)
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

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //puts the key display in the correct location.
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 96;

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //if the player is not defeated
            //console.log("is vine defeating the player?")

            if (this.playerDefeated === false) {

                //then allow the player to use controls to escape.
                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                //this.tabToGiveUp();
            }

            //logic for if the player is not defeated and struggling
            if(this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
                
                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }
            //console.log("playerHealthObject",playerHealthObject);
            
        }
    }

    damage() {
        
        //remove colliders since we no longer need them.
        this.removeColliders();

        this.grabHitBox.destroy();
        this.scene.enemyId--;
    
        this.destroy();
    }

        
}