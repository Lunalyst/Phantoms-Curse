
//implementation for enemy.
class jackOVine extends jackOVineMaleTF {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        
        //on set up, need to decide if eenemy or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'jov-male-male-tf1');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'jackOVineFemale');
            this.enemySex = 1;
        

        //if the pref is either, then we randomly pick a sex for the jackOVine.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'jackOVineFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'jov-male-male-tf1');
                this.enemySex = 0;
            }
        }

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(25,10,true);
        this.grabTimer = false;
        this.hitboxActive = false;
        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;

        this.setTravelDirection = false;
        this.travelDirection = "";

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitboxActive = false;

        this.body.setGravityY(600); 
        this.setSize(27, 70, true);
        this.setOffset(72, 36);

        this.setScale(1);

        this.scene.vineThatGrabbedPlayer = null;

        // sets the jackOVines hp value
        this.enemyHP = 50;

        //extra variables specific to enemy
        if(this.enemySex === 0){
            this.grabType = "maleTF";
        }else{
            this.grabType = "femmaleTF";
        }
        

        //variable to tell if we are in the animation viewer.
        this.inSafeMode = inSafeMode;

        //defines jackOVine animations based on the players sex.
        //if this enemy is male
        if(this.enemySex === 0) {
            this.anims.create({ key: 'jackOVineInActive', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 0, end: 0 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'jackOVineInActiveHide', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 0, end: 0 }), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'jackOVinehidingRight', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 1, end: 1 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'jackOVinehidingRightAngle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 2, end: 2 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'jackOVinehidingMiddle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 3, end: 3 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'jackOVinehidingPeak', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 3, end: 3 }), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'jackOVinehidingLeftAngle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 4, end: 4 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'jackOVinehidingLeft', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 5, end: 5 }), frameRate: 5, repeat: -1 });
            
            this.anims.create({ key: 'jackOVineEmerge', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 6, end: 12 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'jackOVineIdle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 13, end: 16 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'jackOVineWalk', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 17, end: 26 }), frameRate: 16, repeat: -1 });
            this.anims.create({ key: 'jackOVineKickStart', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 27, end: 28 }), frameRate: 10, repeat: 0 });
            this.anims.create({ key: 'jackOVineKickMiddle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 29, end: 31 }), frameRate: 10, repeat: 0 });
            this.anims.create({ key: 'jackOVineKickEnd', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 32, end: 34 }), frameRate: 10, repeat: 0 });

            this.anims.create({ key: 'jackOVineSideIdle', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 35, end: 38 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'jackOVineSummonVineStart', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 39, end: 41 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'jackOVineSummonVineEnd', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 42, end: 42 }), frameRate: 6, repeat: 0 });
            
            this.anims.create({ key: 'jackOVineGrabStart', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 43, end: 50 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'jackOVineGrabEnd', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 51, end: 54 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'jackOVinePlowing1', frames: this.anims.generateFrameNames('jov-male-male-tf1', { start: 55, end: 60 }), frameRate: 9, repeat: 0 });
            
            //and the player is male, so only specific male on male animations
            if(sex === 0 ){

            //and the player is female, so only specific male on female animations
            }else{
                
            }

        //otherwise enemy is female   
        }else{
            
            //and the player is male, so only specific female on male animations
            if(sex === 0){
            
            //and the player is female, so only specific female on female animations
            }else{
               
            }

        }

        this.anims.play("jackOVineInActive",true);

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
        }

        //extra enemy spcific veriables
        this.playerEnteredActivationRange = false;
        this.activateJackOVineRange = 40
        this.animationPlayed = false;
        this.isHidding = true;
        this.peakActivated = false;
        this.noticedPlayer = false;
        this.noticeRangeOuter = 100;
        this.playerInOuterRange = false;
        this.noticeRangeInner = 60;
        this.kickCoolDown = false;
        this.summonVineDelay = false;
        this.summonVineDelayCooldown = false;

    }

    //functions that move jackOVine objects.
    move(){
        //console.log("moving pumpkin");
        if(this.isHidding === false){

            console.log("jack o vine: ",this.summonVineDelay);
            //if rabbit is too close, and grabb attempt is false, then 
                if((this.checkXRangeFromPlayer(40, 40) && this.checkYRangeFromPlayer(20,70) && this.grabTimer === false) && this.scene.playerStuckGrab === false && this.kickCoolDown === false && this.summonVineDelay === false){
                    
                    // IF THE PLAYER ISNT MOVING LEFT OR RIGHT then set velocity to zero so they dont over shoot the player.
                
                    this.setVelocityX(0);
                    
                    // otherwise keep the rabbits current momentum.
                    this.grabTimer = true;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);
                    
                    this.anims.play('jackOVineKickStart').once('animationcomplete', () => {
                        
                       this.anims.play('jackOVineKickMiddle').once('animationcomplete', () => {
                        
                            //this.playJumpySound('3',700);
                            this.setVelocityX(0);
                            this.attackHitboxActive = true;
                            this.attackHitBox.body.enable = true;
                            this.attemptingGrab = true;
                            this.playJumpySound('3',700);
                            
                        });
                        
                    });

                //activate missed animation
                }else if(this.checkXRangeFromPlayer(140, 140) && !this.checkXRangeFromPlayer(40, 40) && this.attemptingGrab === false && this.grabTimer === false && this.summonVineDelay === false){

                     //stop momentum play idle loop
                    this.setVelocityX(0);

                    //if the enemy hasn't sent out a vine and the cool down isnt up
                    if(this.summonVineDelayCooldown === false){

                        this.summonVineDelayCooldown = true;
                        this.summonVineDelay = true;

                        if(this.scene.player1.x > this.x){
                            this.flipX = false;
                        }else{
                            this.flipX = true;
                        }

                        this.anims.play('jackOVineSummonVineStart').once('animationcomplete', () => {
                            //spawn vine 

                            this.scene.initEnemy(this.x,this.y+13,this.scene.playerSex,'vine',this.flipX);
                        
                            this.anims.play('jackOVineSummonVineEnd').once('animationcomplete', () => {

                                this.summonVineDelay = false;
                                //after animation finishes set time out for next vine spawn
                                let currentRabbit = this;
                                setTimeout(function () {
                                    currentRabbit.summonVineDelayCooldown = false;
                                    console.log("kickCoolDown has ended. player can be grabbed agian.");
                                }, 2000);
                                                        
                            });
                         });

                    }else{
                        this.anims.play('jackOVineSideIdle', true);

                        if(this.scene.player1.x > this.x){
                            this.flipX = false;
                        }else{
                            this.flipX = true;
                        }
                    }

                        

                       

                   
                //attempt to grab the player
                }else if(this.attemptingGrab === true && this.scene.playerStuckGrab === false && this.summonVineDelay === false){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation

                        this.setVelocityX(0);
                        
                        this.anims.play('jackOVineKickEnd').once('animationcomplete', () => {

                            this.setDepth(5);
                            this.attackHitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;  
                            //if(!this.checkYRangeFromPlayer(20,70)){
                                this.anims.play('jackOVineSideIdle', true);
                            //}
                            
                            this.kickCoolDown = true;
                            let currentRabbit = this;
                            setTimeout(function () {
                                currentRabbit.kickCoolDown = false;
                                console.log("kickCoolDown has ended. player can be grabbed agian.");
                            }, 2000);
                        });
                    }

                //move the rabbit right if the player isnt knocked down
                }else if(this.scene.player1.x > this.x + 100 && this.checkYRangeFromPlayer(20,70) && this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false && this.summonVineDelay === false) {
                    //console.log("moving cat right"); 
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('jackOVineWalk', true);
                    this.setVelocityX(200); 
                    
            
                //if the player not knocked how move the rabbit left
                }else if(this.scene.player1.x < this.x - 100 && this.checkYRangeFromPlayer(20,70) && this.attemptingGrab === false && this.grabTimer === false  && this.scene.playerStuckGrab === false && this.summonVineDelay === false) {
                    //console.log("moving cat left");
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;  
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('jackOVineWalk', true);
                    this.setVelocityX(-200); 
                    
                }

        }else if(this.isHidding === true){
    
                //if the player enters the activation range
                if (this.playerEnteredActivationRange === false && this.checkRangeFromPlayer(this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange)){
                    //set value to true
                    this.playerEnteredActivationRange = true;
    
                //so when thep player leaves the range
                }else if(this.playerEnteredActivationRange === true && !this.checkRangeFromPlayer(this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange)){
                    
                    //play animation of tiger emerging from bush
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.anims.play('jackOVineEmerge').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.isHidding = false;
                        });
                    }
    
                //player hasnt been noticed but is within tigers range
                }else if(this.noticedPlayer === false && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.peakActivated = true;
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        //this.scene.initSoundEffect('bushSFX','1',1);
                        this.anims.play('jackOVinehidingPeak').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.noticedPlayer =true;
                        });
                    }
                    
                //if the player hasn't been noticed and isnt in range
                }else if(this.noticedPlayer === false && this.peakActivated === false){
    
                    //keep tiger hidden
                    this.flipX = false;
                    //this.scene.initSoundEffect('bushSFX','1',1);
                    this.anims.play('jackOVineInActive', true);
    
                //if the player has been noticed and is to the right, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x + this.noticeRangeInner && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.flipX = false;
                    this.anims.play('jackOVinehidingMiddle', true);
                    //this.scene.initSoundEffect('bushSFX','2',1);
                    this.playerInOuterRange = false;
    
                //if the player has been noticed and is to the left, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x - this.noticeRangeInner)){
    
                    this.flipX = false;
                    this.anims.play('jackOVinehidingMiddle', true);
                    //this.scene.initSoundEffect('bushSFX','2',1);
                    this.playerInOuterRange = false;
    
                //once the player is spotted, hide agian
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x  - this.noticedAndHiddenOuter && this.scene.player1.x < this.x + this.noticedAndHiddenOuter)){
                    //plays the hiding animation
                    this.activatedSuprise = true;
                    if (!this.animationPlayed && this.playerInOuterRange === false) {
                        this.animationPlayed = true;
                        this.flipX = false;
                        //this.scene.initSoundEffect('bushSFX','2',1);
                        this.anims.play('jackOVineInActiveHide').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.playerInOuterRange = true;
                            //this.scene.initSoundEffect('bushSFX','1',1);
                        });
                    //if hiding animation has been played, play hide animation
                    }else if (this.playerInOuterRange === true && this.activatedSuprise === false){
                        //console.log('this.playerInOuterRange === true');
                        this.flipX = false;
                        this.anims.play('jackOVineInActive', true);
                    }
                }else if(this.noticedPlayer === true && !this.checkRangeFromPlayer(this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange, this.activateJackOVineRange) ){
                    this.anims.play('jackOVineInActive', true);
                }  
        }

        //handles attack hit box positioning
        if(this.attackHitboxActive === true){

            this.knockdownDirection = !this.flipX;
            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                console.log("moving cat hitbox to the left");
                this.attackHitBox.x = this.x-15;

            //otherwise put it to the right.
            }else{
                console.log("moving cat hitbox to the right");
                this.attackHitBox.x = this.x+15;
            }
            this.attackHitBox.y = this.y;

        }else{
            this.attackHitBox.x = this.x;
            this.attackHitBox.y = this.y + 3000; 
        }
     
        //updates the previous y value to tell if rabbit is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this jackOVine.
    moveIdle() {

        if(this.enemyHP > 0 && this.inSafeMode === false){

            if(this.isHidding === true){
                this.anims.play('jackOVineInActive', true);

            }else{

                if(this.scene.vineThatGrabbedPlayer === null){
                    
                }else if(this.scene.vineThatGrabbedPlayer.playerDefeatedAnimationStage === 0){

                    //resets travel direction variables. vines always have to start at stage 0 and progress to stage 1
                    this.setTravelDirection = false;
                    this.travelDirection = false;

                    if(this.x < this.scene.player1.x){
                        
                        if(this.checkXRangeFromPlayer(70, 70)){

                            console.log("jackovine in postion")
        
                            this.flipX = true;
                            this.anims.play('jackOVineWalk', true);
                            this.setVelocityX(-200); 

                        }else if(this.checkXRangeFromPlayer(80, 80)){

                            console.log("jackovine in postion")
        
                            this.anims.play('jackOVineSideIdle', true);
                            this.flipX = false;
                            this.setVelocityX(0);

                        }else{
                            this.flipX = false;
                            this.anims.play('jackOVineWalk', true);
                            this.setVelocityX(200); 
                        }

                    }else if(this.x >= this.scene.player1.x){
                         if(this.checkXRangeFromPlayer(70, 70)){

                            console.log("jackovine in postion")
        
                           this.flipX = false;
                            this.anims.play('jackOVineWalk', true);
                            this.setVelocityX(200); 

                        }else if(this.checkXRangeFromPlayer(80, 80)){

                            console.log("jackovine in postion")
        
                            this.anims.play('jackOVineSideIdle', true);
                            this.flipX = true;
                            this.setVelocityX(0);

                        }else{
                            this.flipX = true;
                            this.anims.play('jackOVineWalk', true);
                            this.setVelocityX(-200); 
                        }
                    }
                }else if(this.scene.vineThatGrabbedPlayer.playerDefeatedAnimationStage === 1){

                    //if thep layer is male then, position them behind the player butt
                    if(this.enemySex === 0){

                        //variable to set position of where the jackovine should be 
                        let correctPosition = 0;

                        //if the flipx is fauls then the players ass is to the left. need that jackovine to the left of that.
                        if(this.scene.vineThatGrabbedPlayer.flipX === false){
                            correctPosition = this.scene.vineThatGrabbedPlayer.x - 28;

                        //otherwise the position should be to the right since the players ass is to the right.
                        }else if(this.scene.vineThatGrabbedPlayer.flipX === true){ 
                            correctPosition = this.scene.vineThatGrabbedPlayer.x + 28;

                        }

                        // in order to do that, we need to make a line from where the pumpkin is, to where it needs to go
                        //this variable locks out the travel direction variable.
                        if(this.setTravelDirection === false){

                            this.setTravelDirection = true;

                            //if the pumpkin is to the left of the player butt then 
                            if(this.x <= correctPosition){
                                this.travelDirection = "left";
                            }else{
                                this.travelDirection = "right";
                            }
                        }

                        if(this.travelDirection === "left"){

                            //if the player is to the left of the correct position them move them to 
                            if(this.x < correctPosition){
                                this.flipX = false;
                                this.anims.play('jackOVineWalk', true);
                                this.setVelocityX(200); 

                             }else if(this.x >= correctPosition){
                                this.anims.play('jackOVineSideIdle', true);
                                this.flipX = this.scene.vineThatGrabbedPlayer.flipX;
                                this.setVelocityX(0);
                                this.x = correctPosition;

                                this.scene.vineThatGrabbedPlayer.playerTransferToJackOVine();

                                this.grab();

                            }

                        }else if(this.travelDirection === "right"){

                            //if the player is to the left of the correct position them move them to 
                            if(this.x > correctPosition){
                                this.flipX = true;
                                this.anims.play('jackOVineWalk', true);
                                this.setVelocityX(-200); 

                            }else if(this.x <= correctPosition){
                                this.anims.play('jackOVineSideIdle', true);
                                this.flipX = this.scene.vineThatGrabbedPlayer.flipX;
                                this.setVelocityX(0);
                                this.x = correctPosition;

                                this.scene.vineThatGrabbedPlayer.playerTransferToJackOVine();

                                this.grab();

                            }
                        }

                    }
                    
                }

        }
           
          
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
            this.attackHitBox.x = this.x;
            this.attackHitBox.y = this.y + 3000; 
            this.setDepth(4);

            this.resetMoveVariables();
     
        }
        
    }

   
    //the grab function. is called when player has overlaped with an enemy jackOVine.
    grab(){

        //first checks if jackOVine object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.jackOVineGrabFalse();

        } else if (this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.jackOVineGrabTrue();

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
            if(playerHealthObject.playerHealth >= 1  && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            
            }
            
            //logic for if the player escapes the grab
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter >= 100){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerHealth === 0){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);

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
        }
    }

    jackOVineGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this jackOVine did not grab the player this.jackOVineID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    jackOVineGrabTrue(){

        //if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
      
    }

     playerIsNotDefeatedInputs(playerHealthObject){

        if(this.grabType === "maleTF"){
            this.playerIsNotDefeatedInputsMaleTF(playerHealthObject);
        }

     }

    playerIsStrugglingLogic(playerHealthObject){

        if(this.grabType === "maleTF"){
            this.playerIsStrugglingLogicMaleTF(playerHealthObject);
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        if(this.grabType === "maleTF"){
            this.playerIsDefeatedLogicMaleTF(playerHealthObject);
        }
     
    }

    playerEscaped(){

        if(this.grabType === "maleTF"){resetMoveVariables
            this.playerEscapedMaleTF(playerHealthObject);
        }
    }

    resetVariables(){
        //resets the enemy variables and player variables.
        this.struggleFree = false;
        this.playerBrokeFree = 0;
        this.struggleCounter = 0;
        this.animationPlayed = false;
        //this.setSize(70, 180, true);
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.keyAnimationPlayed = false
        this.playerDamageTimer = false;
        this.startedGrab = false;

        this.scene.grabCoolDown = false;
        

    }

    resetMoveVariables(){

        this.scene.grabCoolDown = false;
        this.playerEnteredActivationRange = false;
        this.animationPlayed = false;
        this.peakActivated = false;
        this.playerInOuterRange = false;;
        this.kickCoolDown = false;
        this.summonVineDelay = false;
        this.summonVineDelayCooldown = false;
        this.attemptingGrab = false;
        this.attackHitboxActive = false;
        this.grabTimer = false;
    }

    // controls the damage resistance of the jackOVine.
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

                
                this.playJumpySound('2',700);
                
                if (this.enemyHP <= 0) {

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    this.grabHitBox.destroy();

                    this.setVelocityX(0);

                    
                    //drop item if applicable
                    //let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    //let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));
                    //this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,17,1,dropAmount,"POLLEN","SUNFLOWER POLLEN.","drop",8);

                    //play defeat animation
                    this.anims.play('jackOVineDefeatedFall').once('animationcomplete', () => {
                     //then destroy slime.
                        this.anims.play('jackOVineDefeated');
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

    //handles damage types for blue jackOVine. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
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
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    //function to show off animation 
    animationGrab(){

        if(this.grabType === "maleTF"){
            this.animationGrabMaleTF();
        }
    }
    
}
