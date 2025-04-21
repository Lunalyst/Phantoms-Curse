

//implementation for the blue enemy.
class curseShadow extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, sex, id, 40, 'curseShadowMale');

        // sets gravity 
        this.body.setGravityY(600); 
        this.enemySize = 1;

        //randomizes variables

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(55,30,true);
        this.hitboxActive = false;

        this.attemptingGrab = false;
        this.grabTimer = false;
        this.isPlayingMissedAnims = false;

        this.defeatedActivated = false;

        this.enemyDefaultSpeed = 300;

        this.randomInput = Math.floor((Math.random() * 3));
        this.randomInputCooldown = false;
          
        //defines Enemy animations based on the players sex.
        this.anims.create({ key: 'shadowIdle', frames: this.anims.generateFrameNames('curseShadowMale', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'shadowMove', frames: this.anims.generateFrameNames('curseShadowMale', { start: 4, end: 8 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'shadowGrabStart', frames: this.anims.generateFrameNames('curseShadowMale', { start: 9, end: 11 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'shadowGrabMiss', frames: this.anims.generateFrameNames('curseShadowMale', { start: 12, end: 14 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'shadowDefeated', frames: this.anims.generateFrameNames('curseShadowMale', { start: 15, end: 22 }), frameRate: 7, repeat: 0 });
        if (sex === 0) {
            this.anims.create({ key: 'playerSuckedIn', frames: this.anims.generateFrameNames('curseShadowMale', { start: 23, end: 28 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerStruggleIdle', frames: this.anims.generateFrameNames('curseShadowMale', { start: 28, end: 31 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'playerStruggle', frames: this.anims.generateFrameNames('curseShadowMale', { start: 28, end: 31 }), frameRate: 9, repeat: 0 });
            this.anims.create({ key: 'playerStruggle1', frames: this.anims.generateFrameNames('curseShadowMale', { start: 32, end: 35 }), frameRate: 9, repeat: 0 });
            this.anims.create({ key: 'playerSuckedDown', frames: this.anims.generateFrameNames('curseShadowMale', { start: 36, end: 46 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerConsumed', frames: this.anims.generateFrameNames('curseShadowMale', { start: 47, end: 50 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'playerPumpGrab', frames: this.anims.generateFrameNames('curseShadowMale', { start: 51, end: 52 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerPump', frames: this.anims.generateFrameNames('curseShadowMale', { start: 53, end: 56 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'playerGettingPumped', frames: this.anims.generateFrameNames('curseShadowMale', { start: 57, end: 78 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerMostlyTransformed', frames: this.anims.generateFrameNames('curseShadowMale', { start: 79, end: 82 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'playerFinishTransformation', frames: this.anims.generateFrameNames('curseShadowMale', { start: 84, end: 86 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerShadowUnderground', frames: this.anims.generateFrameNames('curseShadowMale', { start: 87, end: 90 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerShadowRise', frames: this.anims.generateFrameNames('curseShadowMale', { start: 91, end: 97 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerShadowIdle', frames: this.anims.generateFrameNames('curseShadowMale', { start: 98, end: 101 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'playerShadowPleasureStart', frames: this.anims.generateFrameNames('curseShadowMale', { start: 102, end: 102 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'playerShadowPleasure', frames: this.anims.generateFrameNames('curseShadowMale', { start: 103, end: 106 }), frameRate: 7, repeat: -1 });

            this.anims.create({ key: 'shadowGameover1', frames: this.anims.generateFrameNames('curseShadowMale', { start: 107, end: 110 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'shadowGameover2', frames: this.anims.generateFrameNames('curseShadowMale', { start: 107, end: 110 }), frameRate: 9, repeat: -1 });
            this.anims.create({ key: 'shadowGameover3', frames: this.anims.generateFrameNames('curseShadowMale', { start: 111, end: 114 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'shadowGameover4', frames: this.anims.generateFrameNames('curseShadowMale', { start: 115, end: 131 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'shadowGameover5', frames: this.anims.generateFrameNames('curseShadowMale', { start: 132, end: 135 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'shadowGameover6', frames: this.anims.generateFrameNames('curseShadowMale', { start: 136, end: 138 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'shadowGameover7', frames: this.anims.generateFrameNames('curseShadowMale', { start: 138, end: 141 }), frameRate: 7, repeat: -1 });
        }else{
            
        }

        this.inSafeMode = inSafeMode;

        this.anims.play("shadowIdle",true);


        //applys lighting to the enemy. cursed light is reused as a way for the player to see whats going on when grabbed.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 100, 0x666666);
            this.curseLight.visible = false;
          }
    }

    //functions that move enemy objects.
    move() {

        this.setSize(270, 100, true);
        this.setOffset(15, 125);
        this.body.setGravityY(600);

        //determine shadows speed based on lanturn use
        if(this.scene.player1.lanturnFlicker !== null){
            this.enemyDefaultSpeed = 250;
        }else{
            this.enemyDefaultSpeed = 310;
        }
        if(this.enemyDefeated === false){
            
            //if the player is within range
            //console.log("this.scene.player1.lanturnFlicker; ",this.scene.player1.lanturnFlicker," this.grabTimer: ",this.grabTimer," this.attemptingGrab: ",this.attemptingGrab)
            if(this.checkXRangeFromPlayer(400, 400) && this.checkYRangeFromPlayer(200,60)){  

                //special check, to manage the velocity of the shadow while its trying to grab the player
                if(this.grabTimer === true && this.attemptingGrab === false){
                    if(this.scene.player1.mainHitbox.body.velocity.x === 0){ 
                        this.setVelocityX(0); 
                    }
                }
                
                //if the player is close enough to grab, and there lanturn is not on,
                if((this.checkXRangeFromPlayer(50, 50)&& this.checkYRangeFromPlayer(40,40) && this.grabTimer === false && this.scene.player1.lanturnFlicker === null)){
                            
                    //play animation
                    this.grabTimer = true;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);
                    this.anims.play('shadowGrabStart').once('animationcomplete', () => {
                        
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                        //controls the x velocity when the bee ischarging to grab the player
                        
                    });

                }else if(this.attemptingGrab === true){
                    console.log("grab missed!");
                    this.setVelocityX(0); 
                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.anims.play('shadowGrabMiss').once('animationcomplete', () => {
                            this.setDepth(5);
                            this.hitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;    
                        });
                    }
                //move right when the players lanturn is not active
                }else if(this.scene.player1.x > this.x  && this.attemptingGrab === false && this.grabTimer === false && this.scene.player1.lanturnFlicker === null) {
                    //console.log("moving shadow right");            
                    this.direction = "right";
                    
                    this.flipX = false;

                    this.anims.play('shadowMove', true);
                    this.setVelocityX(this.enemyDefaultSpeed); 
                    
            
                //move left if the players lanturn is not active
                }else if(this.scene.player1.x < this.x  && this.attemptingGrab === false && this.grabTimer === false && this.scene.player1.lanturnFlicker === null) {
                    //console.log("moving shadow left");   
                    this.direction = "left";
                    this.flipX = true;
                    //if we can throw cat
                    
                    this.anims.play('shadowMove', true);
                    this.setVelocityX(-this.enemyDefaultSpeed); 
                
                //if the player is far away, but has the light on then move closer 
                }else if((this.x < this.scene.player1.x || this.x > this.scene.player1.x) && this.attemptingGrab === false && this.grabTimer === false ) {
                    
                    //if player in range, then  move closer
                    if(!this.checkXRangeFromPlayer(110, 110)){
                        if(this.x < this.scene.player1.x ){
                            //console.log("moving shadow right");            
                            this.direction = "right";
                            this.flipX = false;
                            this.anims.play('shadowMove', true);
                            this.setVelocityX(this.enemyDefaultSpeed); 
                        }else if(this.x > this.scene.player1.x ){
                            //console.log("moving shadow left");          
                            this.direction = "left";
                            this.flipX = true;
                            //if we can throw cat
                            this.anims.play('shadowMove', true);
                            this.setVelocityX(-this.enemyDefaultSpeed); 
                        }
                    //but if the player is too close, then move away
                    }else if(this.checkXRangeFromPlayer(35, 35) && this.checkYRangeFromPlayer(60, 60)){
                        //console.log("shadow should be dying")
                        this.enemyDefeated = true;
                    }else if(this.checkXRangeFromPlayer(100, 100)){

                        if(this.x > this.scene.player1.x ){
                            //console.log("moving shadow right");            
                            this.direction = "right";
                            this.flipX = false;
                            this.anims.play('shadowMove', true);
                            this.setVelocityX(this.enemyDefaultSpeed); 
                        }else if(this.x < this.scene.player1.x ){
                            //console.log("moving shadow left");          
                            this.direction = "left";
                            this.flipX = true;
                            //if we can throw cat
                            this.anims.play('shadowMove', true);
                            this.setVelocityX(-this.enemyDefaultSpeed); 
                        }
                    //otherwise idle on the edge of the light.
                    }else{
                        //console.log("idling");
                        this.anims.play('shadowIdle', true);
                        this.setVelocityX(0);
                    }
                    
                
                }
            //otherwise if the player is out of range, then.
            }else if(this.attemptingGrab === false){
                console.log("idle last case")
                //player is not in range of enemy so enemy is in idle animation.
                this.anims.play('shadowIdle', true);

                this.grabTimer =false;
                this.hitboxActive = false;
                this.attemptingGrab = false;
                this.grabTimer = false;
                this.isPlayingMissedAnims = false; 
                this.grabHitBox.body.enable = false; 

                this.setVelocityX(0);

                
            }
        }else{
            if(this.defeatedActivated === false){

                this.defeatedActivated = true;
                //the enemy has been defeated, and is being destroyed
                this.calcDamage(
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    9999
                );
                //play defeated sound here

                //activated defeated animation and item drops?
                //if the enemys hp is at zero
                if (this.enemyHP <= 0) {
                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.setVelocityX(0);

                    //calculate item drtop chance
                    let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                    //decides amount of enemy drops based on size
                        if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        }

                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.

                        this.anims.play('shadowDefeated').once('animationcomplete', () => {
                            //then destroy enemy.
                            this.destroy();
                            this.grabHitBox.destroy();
                        });
                    
                    //play animation of enemy defeated based on size.

                    
                }
            }
            
        }
    
        

        //handles hit box positioning
            if(this.hitboxActive === true){

                //hitbox should be to left if player is to the left
            if(this.flipX === true){
                console.log("moving shadow hitbox to the left");
                this.grabHitBox.x = this.x-15;
        
            //otherwise put it to the right.
            }else{
                console.log("moving shadow hitbox to the right");
                this.grabHitBox.x = this.x+15;
            }
            this.grabHitBox.y = this.y-50;
        
        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

        this.anims.play('shadowIdle', true);
        this.body.setGravityY(600);
        this.setVelocityX(0);
        this.setDepth(4);

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    gameOver() {
        //sets the size and gravity of the enemy
        this.setSize(270, 100, true);
        this.setOffset(15, 125);
        this.body.setGravityY(600);
        //play gameover 1 animation
        this.anims.play('shadowGameover1', true);
        this.gameoverLoopingSounds = 0;
        let currentEnemy = this;
        setTimeout(function () {
            currentEnemy.anims.play('shadowGameover2', true);   

            currentEnemy.gameoverLoopingSounds++;

            setTimeout(function () {
                currentEnemy.anims.play('shadowGameover3', true);  

                currentEnemy.gameoverLoopingSounds++;

                setTimeout(function () {
                    //interupt dialogue by reseting objects, and hiding buttons
                    currentEnemy.scene.dialogueInterupt = true;
                    currentEnemy.scene.resetGameoverText();
                    currentEnemy.scene.mobileW.visible = false;
                    currentEnemy.scene.gameOverSign.visible = false;
                    currentEnemy.scene.tryAgian.visible = false;
                    //start earie sound loop

                    currentEnemy.scene.initSoundEffect('curseSFX','curse',0.3);

                    currentEnemy.scene.initLoopingSound('earieSFX','earieCave', 0.5);

                    currentEnemy.gameoverLoopingSounds++;
                    if(currentEnemy.scene.sound.get("plapSFX") !== null && currentEnemy.scene.sound.get("plapSFX") !== undefined){
                        currentEnemy.scene.sound.get("plapSFX").stop();
                    }


                    currentEnemy.anims.play('shadowGameover4').once('animationcomplete', () => {
                        //set camera to the enemy
                        currentEnemy.scene.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                        //let the update loop know to move the enemy.
                        currentEnemy.gameoverMove = true;
                        currentEnemy.scene.mycamera.startFollow(currentEnemy );
                        currentEnemy.scene.mycamera.setFollowOffset(0,93); 
                        //currentEnemy.scene.mycamera.setLerp(.05, .05);

                        currentEnemy.anims.play('shadowGameover5', true); 

                        setTimeout(function () {
                            currentEnemy.scene.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                            setTimeout(function () {
                                currentEnemy.scene.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
                                setTimeout(function () {
                                    currentEnemy.scene.npcGameover.nodeHandler("gameover","cursed","curseShadowSecret1");
        
                                },8000);
                            },5000);
                        },2000);
                    });
                }, 15000);
               
            }, 45000);

        }, 60000);
    }

    //the grab function. is called when player has overlaped with an enemy enemy.
    grab(){ 
        let currentEnemy = this;
        //first checks if enemy object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.
        this.setVelocityX(0);

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
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

            //logic for if the player escapes the grab
            }else if(playerHealthObject.playerHealth >= 1 && this.struggleCounter >= 100 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
                
                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax || playerHealthObject.playerHealth < 1){

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
    enemyGrabFalse(){
        //hides player object during grab.
        this.scene.player1.visible = false;
        
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

        //set the player grabbed in this enemy to true
        this.playerGrabbed = true;

        //show light so the player can see the animation
        if(this.scene.lightingSystemActive === true){ 
            this.curseLight.x = this.x;
            this.curseLight.y = this.y-20;
            this.curseLight.visible = true;
        }
    }

    //function handles the player struggle buttons
    playerIsNotDefeatedInputs(playerHealthObject){

        if(this.animationPlayed === false){

            //show struggle button, and bar
            this.scene.KeyDisplay.visible = true;
            console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage," this.struggleAnimationInterupt: ",this.struggleAnimationInterupt);
            /*if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }*/

            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);

                //handle random inputs
                if (this.randomInput === 0) {
                    //if W is the key to be pressed then play animation and increase the struggle bar
                    if (this.scene.checkWPressed() === true) {
                        
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax ) {
                            this.increaseStruggleBar(20);
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){
                            
                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.anims.play('playerStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = false;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkAPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = true;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }
                }else if (this.randomInput === 1) {
                    // important anims.play block so that the animation can player properly.
                    if (this.scene.checkWPressed() === true) {
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){
                            
                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.anims.play('playerStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax ) {
                            this.increaseStruggleBar(20);
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = false;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkAPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = true;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }
                }else if (this.randomInput === 2) {
                    // important anims.play block so that the animation can player properly.
                    if (this.scene.checkWPressed() === true) {
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){
                            
                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.anims.play('playerStruggle').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){

                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = false;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkAPressed() === true){
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax ) {
                            this.increaseStruggleBar(20);
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.playPlapSound('plap10',1000);
                            this.flipX = true;
                            this.anims.play('playerStruggle1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }
                }

                // randomizing input
                if (this.randomInputCooldown === false) {
        
                    this.randomInputCooldown = true;
                    this.randomInput = Math.floor((Math.random() * 3));
                    console.log("randomizing the key prompt " + this.randomInput);
                    // important anims.play block so that the animation can player properly.
                    if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                        console.log(" setting keyW display");
                        this.scene.KeyDisplay.playWKey();
                        this.keyAnimationPlayed = true;
                    } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                        console.log(" setting keyD display");
                        this.scene.KeyDisplay.playDKey();
                        this.keyAnimationPlayed = true;
                    }else if (this.keyAnimationPlayed === false && this.randomInput === 2) {
                        console.log(" setting keyA display");
                        this.scene.KeyDisplay.playAKey();
                        this.keyAnimationPlayed = true;
                    }
        
                    let currentShadow = this;
                    setTimeout(function () {
                        currentShadow.randomInputCooldown = false;
                        // resets the animation block.
                        currentShadow.keyAnimationPlayed = false;
                    }, 2000);
                } 

            

            // reduces the struggle counter over time.
            if (this.struggleCounter > 0 && this.struggleCounter < 200 && this.struggleCounterTick !== true) {
                // this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                this.struggleCounterTick = true;
                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
                let currentShadow =this;
                setTimeout(function () {
                    currentShadow.struggleCounterTick = false;
                }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
            }
        //otherwise we are in a phase transition so hide the keyprompts.
        }else{

            //hide struggle bar and button
            this.scene.KeyDisplay.visible = false;
            struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            //reset struggle progress between phases.
            this.struggleCounter = 0;
        }
    }

    //function to handle player health loss.
    playerIsStrugglingLogic(){

        let currentEnemy = this;

        //case to stop the damage function from being applied if the 
        if(this.animationPlayed === false && this.playerDamageTimer === false){
            healthEmitter.emit(healthEvent.loseHealth,2);
            healthEmitter.emit(healthEvent.curseBuildUp,3);
            this.playerDamageTimer = true;

            setTimeout(function () {
                currentEnemy.playerDamageTimer = false;
            }, 700);
        }

  
            //if the player isnt defeated.
            if(this.playerDefeated === false ){

                if(this.playerDefeatedAnimationStage === 0 && this.animationPlayed === false){
                    this.animationPlayed = true;
                    this.scene.initSoundEffect('swallowSFX','2',0.6);
                    this.anims.play("playerSuckedIn", true).once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                    });

                }else if(this.playerDefeatedAnimationStage === 1 && this.struggleAnimationInterupt === false){
                    this.anims.play("playerStruggleIdle", true);
                    this.playPlapSound('plap10',1000);
                    
                }

                //case to progress defeated stage, soo that we can have different struggle animations.
                //in this case, if the player health is less than half there max health and the stage is 0
                /*if(playerHealthObject.playerHealth < playerHealthObject.playerMaxHealth/2 && this.playerDefeatedAnimationStage === 0){
                    //increment the stage so behavior changes.
                    this.playerDefeatedAnimationStage++;
                }*/
            }
               
    }

    playerIsDefeatedLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

            this.scene.enemyThatDefeatedPlayer = "curseShadowMale";

            // if we start the player defeated animation then we need to set a few things.
            ///HERE! NEEDS TO CHECK FI PALYER DEFEATED, TO START THE DEFEATED PROGRESSION AND SETTING OF KEYPROMPTS, LOCKS OUT SO IT ONLY HAPPENS ONCE. 
            //CANT USE STAGE TO CHECK BECAUSE IF WE PROGRESS THEN IT WILL BREAK THINGS IF THIS ACTIVATES CONSTANTLY. LIKE WHAT HAPPENED WHEN I TRYED.
            if (this.inStartDefeatedLogic === false) {

                this.scene.KeyDisplay.playDKey();
                let currentEnemy = this; // important, sets currentEnemy to the current object so that we can use variables attached to this current enemy object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentEnemy.scene.KeyDisplay.visible = true;
                    currentEnemy.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentEnemy.playerDefeatedAnimationStage: " + currentEnemy.playerDefeatedAnimationStage);
                }, 1000);

                if(this.playerDefeatedAnimationStage === 1 && this.inSafeMode === false){
                    this.playerDefeatedAnimationStage++;
                }
                this.inStartDefeatedLogic = true;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 2 &&
                     this.playerDefeatedAnimationStage !== 4 &&
                     this.playerDefeatedAnimationStage !== 6 &&
                     this.playerDefeatedAnimationStage !== 8 &&
                     this.playerDefeatedAnimationStage !== 10) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentEnemy = this;
                console.log("currentEnemy.playerDefeatedAnimationStage: " + currentEnemy.playerDefeatedAnimationStage);

                this.currentEnemy = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentEnemy.scene.KeyDisplay.visible = true;
                    currentEnemy.scene.KeyDisplay.playDKey();
                    currentEnemy.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }
            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            console.log()
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 11 && this.scene.checkDIsDown())) {

                this.scene.enemyThatDefeatedPlayer = "curseShadow";
                
                this.scene.gameoverLocation = "shadowGameover";

                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                if(this.scene.sound.get("plapSFX") !== null && this.scene.sound.get("plapSFX") !== undefined){
                    this.scene.sound.get("plapSFX").stop();
                }
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.enemyDefeatedPlayerAnimation();

        // same code but for the large enemy if it beats the player.


    }

    playerEscaped(playerHealthObject){

        let currentEnemy = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
 
                this.animationPlayed = false;
                currentEnemy.struggleFree = true;

            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.anims.play("shadowIdle", true);
                

                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.playerDefeatedAnimationStage = 0;

                //hide light if the player gets away
                if(this.scene.lightingSystemActive === true){ 
                    this.curseLight.x = this.x;
                    this.curseLight.y = this.y;
                    this.curseLight.visible = false;
                }

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
                currentEnemy = this;
                setTimeout(function () {

                    currentEnemy.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    // controls the damage resistance of the enemy.
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
                
                //if the enemys hp is at zero
                if (this.enemyHP <= 0) {
                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drtop chance
                    let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                    //decides amount of enemy drops based on size
                        if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,13,1,dropAmount,"BLUE SLIME GLOB","CHUNK OF SLIME. FEELS WARM...","drop",5);
                        }

                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,12,1,1,"BLUE SLIME CORE","PULSES AND THROBS IN YOUR HAND.","drop",10);
                        //play defeated animation.

                        this.anims.play('smallEnemyDefeated').once('animationcomplete', () => {
                            //then destroy enemy.
                            this.destroy();
                            this.grabHitBox.destroy();
                        });
                    
                    //play animation of enemy defeated based on size.

                    
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

    //handles damage types for blue enemy. get these damage types from the attack that hits the enemy
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

    // plays the enemy defeated player animations.
    enemyDefeatedPlayerAnimation() {
        let currentEnemy = this;

        switch(this.playerDefeatedAnimationStage) {
            case 1:
                
                this.playerDefeatedAnimationStageMax = 12;

                this.playPlapSound('plap10',1000);

                if (!this.animationPlayed) {
                    this.animationPlayed = true;
                    
                    let random = Math.floor((Math.random() * 3)+1);
                    console.log(random);
                    if(random === 3){
                        this.anims.play("playerStruggle", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        });  
                    }else if(random === 2){
                        this.flipX = false;
                        this.anims.play("playerStruggle1", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        }); 
                    }else{
                        this.flipX = true;
                        this.anims.play("playerStruggle1", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        });
                    
                    }
                }
              break;
            case 2:
                if (!this.animationPlayed) {

                    this.scene.sound.get('plapSFX').stop();  

                    this.animationPlayed = true;
                    this.scene.initSoundEffect('swallowSFX','2',0.6);

                    this.curseLight.y = this.curseLight.y+30;

                    this.anims.play('playerSuckedDown').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        this.scene.initSoundEffect('swallowSFX','3',0.6);
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
                        this.curseLight.y = this.curseLight.y+30;
                    });
                }
              break;
            case 3:
                this.anims.play("playerConsumed", true);
                this.playStomachSound('3',800); 
                break;
            case 4:
                this.playStomachSound('3',800); 
                if (!this.animationPlayed) {

                    
                    this.animationPlayed = true;
                    this.playPlapSound('plap2',1000);

                    this.anims.play('playerPumpGrab').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
        
                    });
                }
                break;
            case 5:
                this.anims.play("playerPump", true);

                this.playPlapSound('plap1',1000);
                this.playStomachSound('4',800); 
                break;
            case 6:
                this.playStomachSound('4',800); 
                if (!this.animationPlayed) {

                    this.animationPlayed = true;
                    
                    this.playPumpSound("pumpingShort",3000);
                    //this.scene.initSoundEffect('pumpingSFX','pumpingFull',1);

                    this.anims.play('playerGettingPumped').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
        
                    });
                }
                break;
            case 7:
                this.playStomachSound('10',800); 
                this.anims.play("playerMostlyTransformed", true);
                break;
            case 8:
                
                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.scene.initSoundEffect('stomachSFX','8',0.3);
                    
                    this.anims.play('playerFinishTransformation').once('animationcomplete', () => {

                        this.anims.play('playerShadowUnderground').once('animationcomplete', () => {
                            this.curseLight.y = this.curseLight.y-30;
                            this.anims.play('playerShadowRise').once('animationcomplete', () => {
                                this.curseLight.y = this.curseLight.y-30;
                                this.animationPlayed = false;
                                this.playerDefeatedAnimationStage++;
                                this.inStartDefeatedLogic = false;
                                console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            
                            });
                        });
                    });
                }
                break;
            case 9:
                this.anims.play("playerShadowIdle", true);
                break;
            case 10:
                if (!this.animationPlayed) {

                    this.animationPlayed = true;
                    
                    this.anims.play('playerShadowPleasureStart').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
        
                    });
                }
                break;
            case 11:
                this.playPlapSound('plap5',1000);
                this.anims.play("playerShadowPleasure", true);
                break;
                
            default:
              // code block
          }

        


    }

    //function to show off animation 
    animationGrab(){
        console.log(' activating enemy view grab logic');
        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.enemyGrabFalse();
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
               
                //play struggle animation and sounds.
                this.anims.play("enemyGrab",true);  

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
