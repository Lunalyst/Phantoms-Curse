// wood barriers that break when the player does enough damage to them.
class mushroomHandSingle extends enemy{

    constructor(scene, xPos, yPos, sex, id,flip,matangoRoot){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos , sex,id,10,'mushroom-hands-single');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        this.flipX = flip;

        //barrie danage variables.
        this.scene = scene;
        this.matangoRoot = this;

        this.visible = false;

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitBoxHide();
        this.grabCoolDown = false;
        this.isMoving = false;
        this.returnedWithPlayerGrabbed = false;

        this.originalX = xPos;
        this.originalY = yPos;

        this.anims.create({ key: 'rise1', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 0, end: 1 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'rise2', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 2, end: 2 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'rise3', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 3, end: 3 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 4, end: 7 }), frameRate:  10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 8, end: 11 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'grabTell', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 11, end: 15 }), frameRate:  10, repeat: -1 });
        this.anims.create({ key: 'grabStart', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 15, end: 19 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'grabEnd', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 20, end: 22 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'knockdownstart', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 23, end: 24 }), frameRate:  3, repeat: 0 });
        this.anims.create({ key: 'knockdownMiddle', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 25, end: 28 }), frameRate:  10, repeat: 0 });
        this.anims.create({ key: 'knockdownEnd', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 29, end: 32 }), frameRate:  8, repeat: 0 });
        if(sex === 0 ){
          this.anims.create({ key: 'knockdownGrabStart', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 33, end: 34 }), frameRate:  8, repeat: 0 });
          this.anims.create({ key: 'knockdownGrabCarry', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 35, end: 38 }), frameRate:  8, repeat: -1 });
        }else{

        }
        this.anims.create({ key: 'handSink', frames: this.anims.generateFrameNames('mushroom-hands-single', { start: 39, end: 43 }), frameRate:  8, repeat: 0 });
        
  

        //if we are using dark lighting
        if(this.scene.lightingSystemActive === true){ 
          this.setPipeline('Light2D');
          this.curseLight = this.scene.lights.addLight(this.x, this.y, 70, 0xb317ff);
          this.curseLight.visible = false;

        }
    }

    handRise(){
      this.visible = true;
      this.curseLight.visible = true;
      this.anims.play('rise1').once('animationcomplete', () => {
          this.curseLight.intensity = 0.7;
          this.curseLight.radius = 90;
          this.curseLight.y = this.y+30
          this.anims.play('rise2').once('animationcomplete', () => {
            this.curseLight.intensity = 0.7;
            this.curseLight.radius = 120;
            this.curseLight.y = this.y+10
            this.anims.play('rise3').once('animationcomplete', () => {
              this.anims.play('idle');
            
            });
          });
        });
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

        this.scene.player1.lightSource.visible = true;
    }
    
    randomizeInput(){

        // randomizing input
        console.log("this.randomInputCooldown: ",this.randomInputCooldown);
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
        if(this.startedGrab === true && this.struggleFree === false && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && playerHealthObject.playerHealth > 0){
            console.log("this.scene.player1.x: ",this.scene.player1.x, " this.x: ",this.x);
            if(this.scene.checkAPressed() === true) {

                if (this.randomInput === 0) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }
                
                this.animationPlayed = false;
                this.struggleAnimationInterupt = false;
 
            }else if(this.scene.checkDPressed() === true) {

                if (this.randomInput === 1) {
                    this.struggleIncrease(playerHealthObject);
                }else{
                    this.struggleDecrease();
                }

                this.animationPlayed = false;
                this.struggleAnimationInterupt = false;
            }
        }
        
        this.randomizeInput();

        this.reduceStruggleCounter();
    }


    playerIsStrugglingLogic(){

        this.curseLight.x = this.x;
        this.curseLight.y = this.y;
        this.scene.player1.x = this.x;
        if(this.x < this.originalX-10 &&  this.isMoving === true){
          this.setVelocityX(40);
        }else if(this.x > this.originalX+10 &&  this.isMoving === true){
          this.setVelocityX(-40);
        }else if(this.isMoving === true){
          this.setVelocityX(0);
          this.x = this.originalX;
          this.isMoving = false;
          this.returnedWithPlayerGrabbed = true;
        }
      

        console.log("this.startedGrab: ",this.startedGrab," this.animationPlayed: ",this.animationPlayed);
        //start the grab ainimation where the player is sucked in. but dont damage them yet.
        if(this.startedGrab === false && this.animationPlayed === false){
            
            this.animationPlayed = true;
            //this.struggleAnimationInterupt = true;

            this.scene.player1.lightSource.visible = false;

            this.hitBoxHide();

            //console.log("this.curseLight:", this.curseLight)
            this.curseLight.visible = true;

            this.anims.play('knockdownGrabStart').once('animationcomplete', () => {
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
            this.anims.play("knockdownGrabCarry", true);
        }
    }

    playerEscaped(playerHealthObject){

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
                    this.struggleFree = true;

                    //then free player.
                    this.resetVariables();
                    console.log("this.matangoRoot", this.matangoRoot);
                    
                    this.setVelocityX(0);
                    this.x = this.originalX;
                    this.isMoving = false;

                    this.handRise();

                    let currentEnemy = this;
                    setTimeout(function () {
                        currentEnemy.grabCoolDown = false;
                        currentEnemy.scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 1000);
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
        this.playerGrabbed = false;
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

        this.scene.player1.lightSource.visible = true;
        console.log("this.matangoRoot", this.matangoRoot);
                    
        this.setVelocityX(0);
        this.x = this.originalX;
        this.isMoving = false;

        this.handRise();
        
    }


    grab(){
      this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
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
}