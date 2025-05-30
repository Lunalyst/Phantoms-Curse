
//implementation for the rabbit enemy.
class rabbit extends enemy {

    /*
    rabbit rework road map
    - leaping grab / some sort of grab animation that doesnt cause the hitbox to leave the ground, just astetic.
    - add changes to other enemys, drops, seperate hitbox ect
    - if player is wearing the carrot ring, change rabbits ai have the rabbit pant and drewl at the player when out of range
    - if player is close, have the rabbit run after them,
    - rabbit trys to knock down the player similiar to the white cat, running shove?
    - if the player is grabbed while down, the struggle is the rabbit trying to eat the player
    - struggle progresses to the player struggling in the belly while the rabbit humps them
    - if player breaks free they come out of the back end of the rabbit? fun mix up?
    - if the player gets digested, then the rabbit grows larger. becomes a futa if sex is different to enemy.
    */
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        
        //on set up, need to decide if rabbit is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the rabbit.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
                this.enemySex = 0;
            }
        }
    
        // sets gravity 
        this.body.setGravityY(600); 

        // variables for movement
        this.rabbitSoundCoolDown = false;
        this.jumpAnimationPlayed = false;
        this.rabbitDamageCounter = false;
        this.jumped = false;
        this.startJump = false;
        this.grabTimer = false;
        this.grabAnimationPlayed = false;

        // sets the rabbits hp value
        this.enemyHP = 35;

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(25,10,true);
        this.hitboxActive = false;
        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;

        this.rabbitIsHungry = false;
        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;

        //defines rabbit animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopStart', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopInAir', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabStart', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 11, end: 11 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiddle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 12, end: 14 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 15, end: 16 }), frameRate: 4, repeat: 0 });

            //mod frame end
            this.anims.create({ key: 'rabbitIdleRailed', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 75, end: 78 }), frameRate: 6, repeat: -1 });
            
            this.anims.create({ key: 'rabbitDefeatedFall', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 60, end: 62 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitDefeatedFallIdle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 63, end: 66 }), frameRate: 5, repeat: -1 });
            
            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 21, end: 25 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 25, end: 28 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 29, end: 39 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 42, end: 51 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 56, end: 59 }), frameRate: 6, repeat: -1 });

                //mod frame of player getting railed as a tf rabbit
                this.anims.create({ key: 'rabbitRail4', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 67, end: 70}), frameRate: 8, repeat: -1 });
                //frames of rabbit getting railed by other rabbit. 
                this.anims.create({ key: 'rabbitsRailing', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 71, end: 74}), frameRate: 8, repeat: -1 });

            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 4, end: 8 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 8, end: 11 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 12, end: 22 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 25, end: 40 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 41, end: 44 }), frameRate: 6, repeat: -1 });
            }
            
        }else{

            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopStart', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopInAir', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabStart', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 11, end: 11 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiddle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 12, end: 14 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 15, end: 16 }), frameRate: 4, repeat: 0 });

            this.anims.create({ key: 'rabbitDefeatedFall', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 53, end: 55 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitDefeatedFallIdle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 56, end: 59 }), frameRate: 8, repeat: -1 });

            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 21, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 31, end: 34 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 35, end: 38 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 35, end: 38 }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 39, end: 48 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 49, end: 52}), frameRate: 6, repeat: -1 }); 
            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 17-17, end: 20-17 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 21-17, end: 31-17 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 31-17, end: 34-17 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 35-17, end: 38-17 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 35-17, end: 38-17 }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 39-17, end: 48-17 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 49-17, end: 52-17}), frameRate: 6, repeat: -1 }); 
            }
            
        }

        this.inSafeMode = inSafeMode;
        
        //if(this.inSafeMode === true){ 
            this.anims.play('rabbitIdle',true);
        //}

        this.setSize(70, 180, true);
        this.setOffset(180, 110);
    }

    //functions that move rabbit objects.
    move(){
        
        //sets gravity
        this.body.setGravityY(600);

        //checks to see if rabbit should move if the player is within range.
        if (this.checkXRangeFromPlayer(350, 350)) {
             this.setSize(70, 180, true);
             this.setOffset(180, 110);

             console.log("this.grabTimer: ",this.grabTimer,"this.attemptingGrab : ",this.attemptingGrab ,"this.jumped: ",this.jumped,"this.startJump: ",this.startJump, );
            // if the player is in range, rabbit is on the ground, and grab timer is false.
            if(this.body.blocked.down && (this.checkXRangeFromPlayer(80, 80) && this.checkYRangeFromPlayer(20,120) && this.grabTimer === false && this.startJump === false && this.jumped === false)){
                        
                        console.log("starting grab animation");
                        //play animation
                        
                        this.grabTimer = true;
                        //this.jumped = true;
                        //this.startJump = true;
                        //this.jumpAnimationPlayed = true;
        
                        //if player to the left move the grab hitbox to the left
                        if(this.scene.player1.x < this.x){
                            this.flipX = true;
                        }else{
                            this.flipX = false;
                        }
                        //stop velocity
                        this.setVelocityX(0);

                        this.setDepth(6);
                        if (!this.grabAnimationPlayed) {
                            this.grabAnimationPlayed = true;
                            this.anims.play('rabbitHopGrabStart').once('animationcomplete', () => {

                                 //if player to the left move the grab hitbox to the left
                                if(this.scene.player1.x < this.x){
                                    this.setVelocityX(-130);
                                    this.flipX = true;
                                }else{
                                    this.setVelocityX(130);
                                    this.flipX = false;
                                }

                                this.playJumpySound('3',700);
            
                                this.hitboxActive = true;
                                this.grabHitBox.body.enable = true;
                                this.attemptingGrab = true;

                                this.anims.play('rabbitHopGrabMiddle').once('animationcomplete', () => {
                                    
                                    if(this.scene.player1.x < this.x){
                                    this.setVelocityX(-130);
                                    this.flipX = true;
                                    }else{
                                        this.setVelocityX(130);
                                        this.flipX = false;
                                    }
                                    this.grabAnimationPlayed = false;
                                //controls the x velocity when the bee ischarging to grab the player
                                 });
                                
                            });
                        }
    
            }else if(this.body.blocked.down && this.attemptingGrab === true ){

                        console.log("grab animation missed");
                        this.startJump = false;
                        this.jumped = false;
                        

                        if(this.isPlayingMissedAnims === false){
                            this.isPlayingMissedAnims = true;
                            //set value to play missed grabb animation
                            
                            this.anims.play('rabbitHopGrabMiss').once('animationcomplete', () => {
                                this.setDepth(5);
                                this.hitboxActive = false;
                                this.attemptingGrab = false;
                                this.grabTimer = false;
                                this.isPlayingMissedAnims = false;   
                                this.jumped = false;
                                this.startJump = false;
                                this.jumpAnimationPlayed = false;
                                this.setVelocityX(0);
                            });
                        }
                    
            //if the rabbit is left of the player move the rabbit right twards the player
            }else if (this.body.blocked.down && this.scene.player1.x > this.x && this.startJump === false && this.grabTimer === false && this.attemptingGrab === false && this.playerGrabbed === false) {

                this.startJump = true;

                 console.log("jumping left");
                this.flipX = false;

                //if we havent played jump animation
                    if(!this.jumpAnimationPlayed) {

                        //set it to true
                        this.jumpAnimationPlayed = true;
                        
                        //stop velocity so bending legs animation stays still
                        this.setVelocityX(0);

                        //play the animation then on completion of the animation
                        this.anims.play('rabbitHopStart').once('animationcomplete', () => {

                            //we nolonger played the jumping animation so set it to false
                            this.jumpAnimationPlayed = false;

                            this.scene.initSoundEffect('jumpSFX','1',0.1);

                            //if the player isnt grabbed, then make the rabbit jump by setting its velocity
                            if(this.playerGrabbed === false){
                                let randomXVelocity = Math.floor((Math.random() * 260) + 30);
                                this.setVelocityX(randomXVelocity);
                                this.setVelocityY(240*-1);
                            }
                           
                            //play the animation for rabbit being in the air.
                            this.anims.play('rabbitHopInAir');
                            
                        
                        });
                    }
                
            //if the rabbit is to the right of the player, then move the rabbit left
            }else if (this.body.blocked.down && this.scene.player1.x < this.x && this.startJump === false && this.grabTimer === false && this.attemptingGrab === false && this.playerGrabbed === false) {

                this.startJump = true;
                console.log("jumping right");
                this.flipX = true;

                //if we havent played jump animation
                    if(!this.jumpAnimationPlayed) {

                        //set it to true
                        this.jumpAnimationPlayed = true;
                        
                        //stop velocity so bending legs animation stays still
                        this.setVelocityX(0);

                        //play the animation then on completion of the animation
                        this.anims.play('rabbitHopStart').once('animationcomplete', () => {

                            //we nolonger played the jumping animation so set it to false
                            this.jumpAnimationPlayed = false;

                            this.scene.initSoundEffect('jumpSFX','1',0.1);

                            //if the player isnt grabbed, then make the rabbit jump by setting its velocity
                            if(this.playerGrabbed === false){
                                let randomXVelocity = Math.floor((Math.random() * 260) + 30);
                                this.setVelocityX(randomXVelocity*-1);
                                this.setVelocityY(240*-1);
                            }

                            //play the animation for rabbit being in the air.
                            this.anims.play('rabbitHopInAir');
                            
                        });
                    }
            //if the rabbit is on the ground, and the variables are not set, then reset them for the next jump       
            }else if(this.startJump === true && this.body.blocked.down){

                this.startJump = false;
                this.jumped = false;
            
            }else if(!this.body.blocked.down && this.grabTimer === true ){
                this.grabTimer = false;
                this.hitboxActive = false;
                this.attemptingGrab = false;
                this.grabTimer = false;
                this.isPlayingMissedAnims = false;   
                this.jumped = false;
                this.startJump = false;
                this.jumpAnimationPlayed = false;

                //play the animation for rabbit being in the air.
                this.anims.play('rabbitHopInAir');

            }

        //if the rabit is not in range then stop there velocity and reset the jumping variables.
        }else{
            this.setVelocityX(0);
        }

        //handles hit box positioning
        if(this.hitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                //console.log("moving cat hitbox to the left");
                this.grabHitBox.x = this.x-10;

            //otherwise put it to the right.
            }else{
                //console.log("moving cat hitbox to the right");
                this.grabHitBox.x = this.x+10;
            }
            this.grabHitBox.y = this.y;

        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
        

        //updates the previous y value to tell if rabbit is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this rabbit.
    moveIdle() {
        this.anims.play('rabbitIdle', true);
        this.body.setGravityY(600);
        this.setVelocityX(0);

        //reset the jump variables if the player is grabbed by another enemy
        this.startJump = false;
        this.jumpAnimationPlayed = false;

        //object is on view layer 4 so idling enemys dont overlap current one.
        this.setDepth(4);
    }

    // functioned called to play animation when the player is defeated by the rabbit in gameover.
    gameOver() {
        const femalePreferance = this.scene.preferance !== 0

        this.setSize(70, 180, true);
        this.setOffset(180, 110);
        this.anims.play('rabbitGameover', true);

        const rabbit1 = new rabbit(this.scene, this.x + 150, this.y - 30, 0, 99)
        const rabbit2 = new rabbit(this.scene, this.x - 150, this.y - 30, 0, 101)
        rabbit1.anims.play(femalePreferance ? 'rabbitIdle' : 'rabbitIdleRailed')
        rabbit2.anims.play(femalePreferance ? 'rabbitIdle' : 'rabbitIdleRailed')
        rabbit1.setGravityY(0)
        rabbit2.setGravityY(0)
        
        if (femalePreferance) {
            return
        } 
        
        const railingRabbitsXCoor = this.x + 45
        const railingRabbitsYCoor = this.y + 2
        const railingRabbits = new rabbit(this.scene, railingRabbitsXCoor, railingRabbitsYCoor, 0, 100)
        railingRabbits.anims.play('rabbitsRailing').on('animationrepeat', () => {
            if (!this.onomatPlayed) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,railingRabbitsXCoor-randX+30,railingRabbitsYCoor-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.setScale(.25);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(() => {
                    this.onomatPlayed = false;
                }, 500);
            }
        })
        railingRabbits.setGravityY(0)
    }


    //the grab function. is called when player has overlaped with an enemy rabbit.
    grab(){

        //code could be used to get sprite to the ground faster.
        //this.body.setGravityY(600);

        let currentrabbit = this;
        //first checks if rabbit object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the velocity of the enemy
        this.setVelocityX(0);

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();

        } else if (this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null,
                playerMaxHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.rabbitGrabTrue(playerHealthObject);

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
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

            
            }

            //logic for if the player escapes the grab
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter >= 100){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax && this.rabbitIsHungry === false){

                 // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "cursed"){
                    this.scene.defeatedTitle = "cursed";
                }

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

    rabbitGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this rabbit did not grab the player this.rabbitID: " + this.enemyId);
        this.scene.player1.visible = false;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    rabbitGrabTrue(playerHealthObject){

        this.setVelocityX(0);

        //plays bouncy sound during the struggle animation if the tiger has eaten.
        if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
            this.playJumpySound('4',700);
        }
        
        //puts the key display in the correct location.
         this.scene.player1.y = this.y - 150;
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;

    
    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.
        let currentrabbit = this;

        if(this.animationPlayed === false){

            //show struggle button, and bar
            this.scene.KeyDisplay.visible = true;

             if (this.keyAnimationPlayed === false && this.rabbitIsHungry === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }

            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);

            if(this.rabbitIsHungry === false){

                if (this.scene.checkDPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                    if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
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

                this.keyAnimationPlayed = true;    
            }else if(this.rabbitIsHungry === true){


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
                    currentrabbit.struggleCounterTick = false;
                }, 10);
                    //console.log('strugglecounter: '+this.struggleCounter);
            }

        }else{

            //hide struggle bar and button
            this.scene.KeyDisplay.visible = false;
            struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            //reset struggle progress between phases.
            this.struggleCounter = 0;
        }

    }

    playerIsStrugglingLogic(){

        let currentrabbit = this;

        if(this.rabbitIsHungry === false && this.playerDamageTimer === false){

            this.playerDamageTimer = true;

            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.curseBuildUp,2);
            }

            setTimeout(function () {
                currentrabbit.playerDamageTimer = false;
            }, 1500);


        }else if(this.rabbitIsHungry === true && this.playerDamageTimer === false){

        }

        if(this.rabbitIsHungry === false){

            if(this.startedGrab === false){

                this.anims.play('rabbitGrab',true);

            }
        }else if(this.rabbitIsHungry === true){

        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the rabbit.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        if(this.enemySex === 1){
            this.scene.enemyThatDefeatedPlayer = "femaleRabbit";
        }else{
            this.scene.enemyThatDefeatedPlayer = "maleRabbit";
        }

        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {
            this.scene.KeyDisplay.playDKey();
            let currentrabbit = this; // important, sets currentrabbit to the current object so that we can use variables attached to this current rabbit object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentrabbit.scene.KeyDisplay.visible = true;
                currentrabbit.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;

            //case to make sure defeated stage 2 is not skipped during animation view
            if(this.playerDefeatedAnimationStage !== 1 ||this.playerDefeatedAnimationStage !== 2 || this.inSafeMode === false){
                this.playerDefeatedAnimationStage++;
            }

            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

        //based on the enemys sex, play different animations. 
        if(this.enemySex === 0){
            if(this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 7) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentrabbit = this;
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

                this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentrabbit.scene.KeyDisplay.visible = true;
                    currentrabbit.scene.KeyDisplay.playDKey();
                    currentrabbit.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;

                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.maleRabbitDefeatedPlayerAnimation();

        }else{
            if (this.scene.checkDPressed() &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === true &&
                  this.scene.KeyDisplay.visible === true &&
                  this.playerDefeatedAnimationStage !== 1 &&
                     this.playerDefeatedAnimationStage !== 5) {

               this.scene.KeyDisplay.visible = false;
               //this.stageTimer = 0;
               this.playerDefeatedAnimationCooldown = true;
               this.playerDefeatedAnimationStage++;
               let currentrabbit = this;
               console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

               this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
               setTimeout(function () {
                   console.log("defeated animation delay.");
                   currentrabbit.scene.KeyDisplay.visible = true;
                   currentrabbit.scene.KeyDisplay.playDKey();
                   currentrabbit.playerDefeatedAnimationCooldown = false;
               }, 3000);
           }
           // if tab is pressed or the player finished the defeated animations then we call the game over scene.
           if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkDIsDown())) {
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = "maleRabbit";
                }else{
                    this.scene.enemyThatDefeatedPlayer = "femaleRabbit";
                }
                this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }
            this.femaleRabbitDefeatedPlayerAnimation();
        }
        
    }

    playerEscaped(playerHealthObject){

        let currentrabbit = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                currentrabbit.struggleFree = true;
                    
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                
                this.anims.play("rabbitIdle", true);
                
                //resets the enemy variables and player variables.
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.scene.player1.visible = true;
                this.isPlayingMissedAnims = false;
                this.grabTimer = false;

                this.startedGrab = false;
                this.playerDefeatedAnimationStage = 0;
                this.struggleAnimationInterupt = false;
                this.spitUp = false;

                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                //sets grabb cooldown for the scene
                this.scene.startGrabCoolDown();
                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                this.scene.player1.visible = true;
                
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                currentrabbit = this;

                //reset the jump variables if the player escapes this enemys grab
                this.startJump = false;
                this.jumpAnimationPlayed = false;
                setTimeout(function () {

                    currentrabbit.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    // controls the damage resistance of the rabbit.
    damage() {

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

                this.playJumpySound('2',700);
                
                if (this.enemyHP <= 0) {
                    if (this.enemyHP <= 0) {

                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drop chance
                    let dropChance = Math.round((Math.random() * ((75) - (60 * this.scene.player1.dropChance)) + (60 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 3));

                    this.setDepth(4);

                    //decides amount of slime drops based on size
                    if( dropChance > 0){
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,23,1,dropAmount,"BUNNY FLUFF","SOFT BALLS OF BUNNY FUR","drop",5);
                    }

                    this.anims.play('rabbitDefeatedFall').once('animationcomplete', () => {

                        this.enemyInDefeatedLogic = true;

                        
                        //delete enemy hit box since they have been defeated.
                        this.grabHitBox.destroy();
                    });
                
                }
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

    enemyDefeatedLogic(){
        this.setVelocityX(0);
        this.anims.play('rabbitDefeatedFallIdle', true);
    }

    //handles damage types for blue rabbit. get these damage types from the attack that hits the enemy
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

    // plays the rabbit defeated player animations.
    maleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {

            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 8;

            if (!this.animationPlayed) {

                this.animationPlayed = true;
                //plays cute jumpy sound for shove
                this.jumpySoundCoolDown = false;
                this.playJumpySound('4',700);

                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitGrind', true);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+15,'charBubble',"RUB!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {

                

                this.playPlapSound('plap1',1800);

                this.scene.onomat = new makeText(this.scene,this.x+15,this.y+10,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('rabbitPenetrate').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    if (this.scene.internalView) {
                        this.scene.internalView.destroy();
                    }
                    this.scene.internalView = new internalView(this.scene,this.x,this.y+60,'rabbit')
                    this.scene.internalView.anims.play("rabbitPening1");
                    this.scene.internalView.setRotation(3.14);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitRail1', true);
            this.scene.internalView.anims.play("rabbitPening1",true);
            this.playPlapSound('plap3',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 600);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.anims.play('rabbitRail2', true);
            this.scene.internalView.anims.play("rabbitPening2",true);
            this.playPlapSound('plap9',1000);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(400);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 400);
            }
           
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('rabbitRail3', true);
            this.scene.internalView.anims.play("rabbitPening3",true);
            this.playPlapSound('plap9',500);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 300);
            }
           
        } else if (this.playerDefeatedAnimationStage === 7) {
            if (!this.animationPlayed) {
                //plays curse sound effect
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.scene.internalView.anims.play("rabbitClimax");

                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+12,'charBubble',"SQUIRT");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    
                    if (this.scene.playerSex === 0) {
                        return setTimeout(() => {
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                        }, 2000)
                    }
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage += 2;
                    this.scene.internalView.destroy();
                    
                    //this.scene.internalView.destroy();
                });
            }
        } else if (this.playerDefeatedAnimationStage === 8) {
            this.anims.play('rabbitRail4', true);
            this.scene.internalView.anims.play("rabbitPening4",true);
            this.playPlapSound('plap3', 850);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(.25);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 500);
            }
        }
    }

    // plays the rabbit defeated player animations.
    femaleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {

            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                //plays cute jumpy sound for shove
                this.jumpySoundCoolDown = false;
                this.playJumpySound('4',700);

                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    this.jumpySoundCoolDown = false;
                    this.playJumpySound('3',700);

                    if(this.scene.playerSex === 0){
                        this.scene.internalView = new internalView(this.scene,this.x+35,this.y+60,'rabbit')
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation(3.14/3);
                    }

                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitHump1', true);

            this.playPlapSound('plap3',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 600);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            this.anims.play('rabbitHump2', true);

            this.playPlapSound('plap9',1000);

            if(this.scene.playerSex === 0){
               this.scene.internalView.anims.play("pen2",true);
            }

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(400);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 400);
            }
           
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitHump3', true);

            this.playPlapSound('plap9',500);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen3",true);
            }

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 300);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {
                //plays curse sound effect
                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInRabbit");
                 }
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        }
    }

    //function to show off animation 
    animationGrab(){

        let currentRabbit = this;
        //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;

            this.scene.gameoverLocation = "forestGameover";

        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //plays jumpy sound during grab.
            if (this.playerProgressingAnimation === false) {
                this.playJumpySound('3',700);
            }

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
         
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 100;

                if(this.rabbitIsHungry === true){
                    
                }else{
                    this.anims.play("rabbitGrab",true);
                    //handles sound effect diring grab struggle
                    this.playJumpySound('2',700);
                }
                

            // handles input for progressing animation
            if (this.scene.checkDPressed() === true) {
                this.playerProgressingAnimation = true;
                }

                // displays inputs while in the first stage of the animation viewing.
                if (this.keyAnimationPlayed === false) {
                    //console.log(" setting keyW display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }      
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished                     //additional case since the female has one less animation stage with the male rabbit.
                console.log("this.scene.playerSex: ",this.scene.playerSex,"  this.playerDefeatedAnimationStage: ", this.playerDefeatedAnimationStage, " this.playerDefeatedAnimationStageMax: ",this.playerDefeatedAnimationStageMax);
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax || ( this.enemySex === 0 && this.scene.playerSex === 1 && this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax+1)){
                    //handle the defeated logic that plays defeated animations 
                    if(this.rabbitIsHungry === false){
                        this.playerIsDefeatedLogic(playerHealthObject);
                    }else{

                    }
                    
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }
    
}
