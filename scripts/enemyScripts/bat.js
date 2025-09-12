
//implementation for the bat enemy.
class bat extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode,soundSprite) {
        
        //on set up, need to decide if bat is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'batMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'batFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'batFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'batMale');
                this.enemySex = 0;
            }
        }

        // variables for movement
        this.batSoundCoolDown = false;
        this.batDamageCounter = false;
        this.randomXVelocity = Math.floor((Math.random() * 250) + 30);
        this.randomizedXVelocity = false;
        this.grabTimer = false;
        this.hitboxActive = false;
        this.shoveCoolDown = false;

        //make a hitbox so the bat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(20,10,true);
        this.isSleeping = true;
        this.wakingUp = false;
        this.isButtSlamming = false;
        this.isPlayingMissedAnims = false;

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitboxActive = false;

        this.struggleAnimationInterupt = false;
        this.batHasEatenCat = false;
        this.batIsEating = false;
        this.attemptingGrab = false;

        // sets the bats hp value
        this.enemyHP = 45;

        //defines a string containing telling the enemy which sound channel to use.
        this.batSFX = soundSprite;
        this.playingSound = false;

        this.target = this.scene.player1;
        //important variable used in bat check enemy function so it know what overlap function to apply based on target.
        this.targetString = "player";

        this.unstuckBool = false;

        //defines bat animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'batSleep', frames: this.anims.generateFrameNames('batMale', { start: 0, end: 8 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batWakeUp', frames: this.anims.generateFrameNames('batMale', { start: 8, end: 23 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batIdle', frames: this.anims.generateFrameNames('batMale', { start: 25, end: 34 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batMove', frames: this.anims.generateFrameNames('batMale', { start: 35, end: 39 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'batButtSlam', frames: this.anims.generateFrameNames('batMale', { start: 41, end: 45 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batButtSlamInAir', frames: this.anims.generateFrameNames('batMale', { start: 45, end: 45 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batButtSlamMiss', frames: this.anims.generateFrameNames('batMale', { start: 46, end: 52 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'batButtHump', frames: this.anims.generateFrameNames('batMale', { start: 79, end: 84 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batButtDigest', frames: this.anims.generateFrameNames('batMale', { start: 85, end: 93 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batButtJiggle', frames: this.anims.generateFrameNames('batMale', { start: 94, end: 97 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batGameover', frames: this.anims.generateFrameNames('batMale', { start: 98, end: 101 }), frameRate: 8, repeat: -1 });
            
            if(sex === 0 ){
                this.anims.create({ key: 'batButtGrabbed', frames: this.anims.generateFrameNames('batMale', { start: 53, end: 58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow1', frames: this.anims.generateFrameNames('batMale', { start: 59, end: 62 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'batButtInHead', frames: this.anims.generateFrameNames('batMale', { start: 62, end: 65 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow2', frames: this.anims.generateFrameNames('batMale', { start: 66, end: 78 }), frameRate: 8, repeat: 0 });
                  
            }else{
                this.anims.create({ key: 'batButtGrabbed', frames: this.anims.generateFrameNames('batMale', { start: 102, end: 107 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow1', frames: this.anims.generateFrameNames('batMale', { start: 108, end:111 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'batButtInHead', frames: this.anims.generateFrameNames('batMale', { start: 112, end: 115 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow2', frames: this.anims.generateFrameNames('batMale', { start: 116, end: 126 }), frameRate: 8, repeat: 0 });
                
            }
             
        }else{
            this.anims.create({ key: 'batSleep', frames: this.anims.generateFrameNames('batFemale', { start: 0, end: 8 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batWakeUp', frames: this.anims.generateFrameNames('batFemale', { start: 8, end: 23 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batIdle', frames: this.anims.generateFrameNames('batFemale', { start: 25, end: 34 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batMove', frames: this.anims.generateFrameNames('batFemale', { start: 35, end: 40 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batButtSlam', frames: this.anims.generateFrameNames('batFemale', { start: 41, end: 45 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batButtSlamInAir', frames: this.anims.generateFrameNames('batFemale', { start: 45, end: 45 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batButtSlamMiss', frames: this.anims.generateFrameNames('batFemale', { start: 46, end: 52 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'batButtHump', frames: this.anims.generateFrameNames('batFemale', { start: 79, end: 84 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batButtDigest', frames: this.anims.generateFrameNames('batFemale', { start: 85, end: 93 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batButtJiggle', frames: this.anims.generateFrameNames('batFemale', { start: 94, end: 97 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'batGameover', frames: this.anims.generateFrameNames('batFemale', { start: 98, end: 101 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'batDefeated', frames: this.anims.generateFrameNames('batFemale', { start: 127, end: 130 }), frameRate: 6, repeat: -1 });

            this.anims.create({ key: 'batAVFemaleCatSwallow', frames: this.anims.generateFrameNames('batFemaleExtension', { start: 0, end: 8 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batAVFemaleCatButtOnHead', frames: this.anims.generateFrameNames('batFemaleExtension', { start: 9, end: 18 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batAVCatSwallowFinish', frames: this.anims.generateFrameNames('batFemaleExtension', { start: 19, end: 27 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batCatButtHump', frames: this.anims.generateFrameNames('batFemaleExtension', { start: 28, end: 31 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batCatButtDigest', frames: this.anims.generateFrameNames('batFemaleExtension', { start: 32, end: 46 }), frameRate: 6, repeat: 0 });

            this.anims.create({ key: 'batFatTryFly', frames: this.anims.generateFrameNames('batFemaleExtension', { start:47, end: 52 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'batFatHop', frames: this.anims.generateFrameNames('batFemaleExtension', { start:54, end: 57 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batFatTemptingLook', frames: this.anims.generateFrameNames('batFemaleExtension', { start:58, end: 63 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batFatTemptingLookLoop', frames: this.anims.generateFrameNames('batFemaleExtension', { start:58, end: 63 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'batFatButtAttackStart', frames: this.anims.generateFrameNames('batFemaleExtension', { start:64, end: 67 }), frameRate: 9, repeat: 0 });
            this.anims.create({ key: 'batFatButtAttackEnd', frames: this.anims.generateFrameNames('batFemaleExtension', { start:68, end: 69 }), frameRate: 6, repeat: 0 });

            this.anims.create({ key: 'batFatDefeatedFall', frames: this.anims.generateFrameNames('batFemaleExtension', { start:112, end: 114 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'batFatDefeated', frames: this.anims.generateFrameNames('batFemaleExtension', { start:115, end: 118 }), frameRate: 6, repeat: -1 });

            if(sex === 0 ){
                this.anims.create({ key: 'batButtGrabbed', frames: this.anims.generateFrameNames('batFemale', { start: 53, end: 58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow1', frames: this.anims.generateFrameNames('batFemale', { start: 59, end: 62 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'batButtInHead', frames: this.anims.generateFrameNames('batFemale', { start: 62, end: 65 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow2', frames: this.anims.generateFrameNames('batFemale', { start: 66, end: 78 }), frameRate: 8, repeat: 0 });
                  
            }else{
                this.anims.create({ key: 'batButtGrabbed', frames: this.anims.generateFrameNames('batFemale', { start: 102, end: 107 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow1', frames: this.anims.generateFrameNames('batFemale', { start: 108, end:111 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'batButtInHead', frames: this.anims.generateFrameNames('batFemale', { start: 112, end: 115 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'batButtSwallow2', frames: this.anims.generateFrameNames('batFemale', { start: 116, end: 126 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'batFatFaceSit', frames: this.anims.generateFrameNames('batFemaleExtension', { start:70, end: 75 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'batFatFaceSitTo69', frames: this.anims.generateFrameNames('batFemaleExtension', { start:76, end: 76 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'batFat691', frames: this.anims.generateFrameNames('batFemaleExtension', { start:77, end: 84 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'batFat692', frames: this.anims.generateFrameNames('batFemaleExtension', { start:84, end: 89 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'batFat693', frames: this.anims.generateFrameNames('batFemaleExtension', { start:89, end: 93 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'batFatTF', frames: this.anims.generateFrameNames('batFemaleExtension', { start:94, end: 102 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'batFatTFPant', frames: this.anims.generateFrameNames('batFemaleExtension', { start:103, end: 106 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'batFat693', frames: this.anims.generateFrameNames('batFemaleExtension', { start:107, end: 110 }), frameRate: 6, repeat: -1 });
            }
        }

        this.inSafeMode = inSafeMode;
        
        if(this.inSafeMode === true){ 
            this.anims.play('batIdle',true);
        }else{
            this.anims.play('batSleep',true);  
        }

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
          }
        

    }

    //functions that move bat objects.
    move(){

    
    if(this.isSleeping === false && this.batHasEatenCat === false && this.enemyDefeated === false){

        if(this.batIsEating === true){

            this.setVelocityX(0);

        //if the bat isnt sleeping anymore
        }else if(this.isSleeping === false && this.batIsEating === false){

                //check to see if white cat made sound. 
                if(this.isSoundEffectPlaying('whiteCatSFX')){

                    this.target = this.scene.getSFXRefrence('whiteCatSFX');

                    //check to make sure white cat is not defeated and its in range of the bat
                    console.log("target: ",this.target)
                    if(this.grabTimer === false){
                        if(this.target !== null ){

                            this.targetString = "whitecat";
                            this.setDepth(this.target.depth+1);
                        }else{
                            
                            this.target = this.scene.player1;
                            this.targetString = "player";
                            this.setDepth(this.target.depth+1);
                        }

                    }
                    
                    
                //otherwise set target to player
                }else if(this.isSoundEffectPlaying('weaponSFX') || this.isSoundEffectPlaying('playerJumpSFX') || this.isSoundEffectPlaying('whiteCatSFX')){
                    this.target = this.scene.player1;
                    this.targetString = "player";
                    this.setDepth(this.target.depth+1);
                }

                //if the enemy is within grab range attempt to grab the player while the grab timer is false
                if(this.checkXRangeFromTarget(this.target, 10, 10) && (this.target.y-60 > this.y && this.target.y-80 < this.y ) && this.grabTimer === false){

                    this.grabTimer = true;
                    this.hitboxActive = true;

                    //controls the x velocity when the bat is butt slamming to grab the player
                    this.setVelocityX(0);

                    this.setVelocityY(400);

                    this.grabHitBox.body.enable = true;

                    //player the bat grab animation and once its complete
                    this.grabTimer = true;

                    this.anims.play('batButtSlam').once('animationcomplete', () => {

                        this.isButtSlamming = true;
                            
                    });

                // if the bat is butt slamming we check to see if the bat hits the ground.
                }else if(this.isButtSlamming === true){
                    
                    
                    //check to see if bat collides with ground. if true then
                    if(this.body.blocked.down === true && this.isPlayingMissedAnims === false){
                        
                        //set value to play butt on ground animation
                        this.hitboxActive = false;
                        this.anims.play('batButtSlamMiss').once('animationcomplete', () => {
                            
                            //set butt slamming to false
                            this.isButtSlamming = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;  
                            // if the bat misses destroy collision
                            //this.batCollision.destroy();
                        });

                        //stop velocity of both x and y
                        this.setVelocityX(0);
                        this.setVelocityY(0);

                        this.isPlayingMissedAnims = true;
                    // bat is in air and falling so keep downward velocity 
                    }else if(this.isPlayingMissedAnims === false){
                        this.anims.play('batButtSlamInAir');
                        this.setVelocityY(400);
                    }

                //checks to see if bat should move if the player is within range. also has to check y and if the enemy isnt grabbing.
                }else if(this.grabTimer === false){

                    //console.log('');
                    this.grabHitBox.body.enable = false;

                    if ((this.target.x > this.x - 450 && this.target.x < this.x + 450) && (this.target.y > this.y - 900 && this.target.y < this.y + 900)) {

                        if(this.playingSound === false){
                            this.playWingFlapSound('1',500);
                            this.playingSound = true;
                        }
                        this.setSize(70, 180, true);
                        this.setOffset(100, 59);
                
                        //if bat is within range
                        if (this.checkXRangeFromTarget(this.target, 10, 10)){
                            this.anims.play('batIdle',true);
                            this.setVelocityX(0);
            
                        }else{
                            //if the bat is left of the player move the bat right twards the player bot not into them yet.
                            if (this.target.x > this.x){
                                
                                this.setVelocityX(this.randomXVelocity);
                                //play the animation for bat being in the air.
                                this.anims.play('batMove',true);
                                this.flipX = false;
                                            
                            //if the bat is to the right of the player, then move the bat left
                            } else if (this.target.x < this.x) {
            
                                this.setVelocityX(this.randomXVelocity * -1);
                                //play the animation for bat being in the air.
                                this.anims.play('batMove',true);
                                this.flipX = true;
                            }
                        }
                        //keep the bat floating lightly above the players y
                        if ((this.target.y-70 > this.y  && this.target.y-80 < this.y)){
                            //this.anims.play('batIdle',true);
                            this.setVelocityY(0);
            
                        }else{
                            // moves the bat up to the position where it should be able to get the player.
                            if (this.target.y - 100 > this.y) {
            
                                this.setVelocityY(150);
            
                            } else if (this.target.y - 80 < this.y) {
            
                                this.setVelocityY(150*-1);    
                            }

                            /*//special case, if the bat happens to be lower than the player and stuck or higher than the player and stuck 
                            if(this.target.y+96 < this.y && (this.target.x > this.x - 200 && this.target.x < this.x + 200) ){


                                //lockout
                                if(this.unstuckBool === false){

                                    this.unstuckBool = true;

                                    //generate a number between 1 and 0
                                    this.unstuck = Math.round(Math.random());


                                     let temp = this;
                                     setTimeout(function () {
                                        temp.unstuckBool = false;
                                        console.log("reset unstuck timer");
                                    }, 8000);
                                }

                                //if one move right otherwise move left
                                if(this.unstuck === 1){
                                    this.setVelocityX(this.randomXVelocity);
                                    //play the animation for bat being in the air.
                                    this.anims.play('batMove',true);
                                    this.flipX = false;
                                }else{
                                    this.setVelocityX(this.randomXVelocity * -1);
                                    //play the animation for bat being in the air.
                                    this.anims.play('batMove',true);
                                    this.flipX = true;
                                }

                                

                            }else{
                                this.setVelocityX(0);
                            }*/


                        }
            
                    //if the be isnt within range of the player have them idle.  
                    }else{
                        this.anims.play('batIdle', true);
                        this.setVelocityX(0);
                        this.setVelocityY(0);

                        if(this.scene.sound.get(this.batSFX) !== null){
                            this.scene.sound.get(this.batSFX).stop();
                        }
                        this.playingSound = false;
                        
                    }

                }

        }
    // if the bat ate, then do that logic
    }if(this.isSleeping === false && this.batHasEatenCat === true && this.enemyDefeated === false){

                //if rabbit is too close, and grabb attempt is false, then 
                if((this.checkXRangeFromPlayer(30, 30) && this.checkYRangeFromPlayer(90,90) && this.grabTimer === false) && this.scene.playerStuckGrab === false && this.shoveCoolDown === false){
                    
                    // IF THE PLAYER ISNT MOVING LEFT OR RIGHT then set velocity to zero so they dont over shoot the player.
                    if(this.scene.checkDIsDown() && this.x < this.scene.player1.x ){
                        this.setVelocityX(300);
                    }else if(this.scene.checkAIsDown() && this.x > this.scene.player1.x){
                        this.setVelocityX(-300);
                    }else{
                        this.setVelocityX(0);
                    }
                    // otherwise keep the rabbits current momentum.
                    this.grabTimer = true;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);
                    
                    this.anims.play('batFatButtAttackStart').once('animationcomplete', () => {
                        
                        //this.playJumpySound('3',700);
                        this.setVelocityX(0);
                        this.attackHitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingGrab = true;
                        this.playJumpySound('3',700);
                        
                    });

                //activate missed animation
                }else if(this.checkXRangeFromPlayer(30, 30) && this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false){

                    //stop momentum play idle loop
                    this.setVelocityX(0);
                    this.anims.play('batFatTemptingLookLoop', true);

                //attempt to grab the player
                }else if(this.attemptingGrab === true && this.scene.playerStuckGrab === false){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation

                        this.setVelocityX(0);
                        
                        this.anims.play('batFatButtAttackEnd').once('animationcomplete', () => {

                            this.setDepth(5);
                            this.attackHitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;  
                            if(!this.checkYRangeFromPlayer(20,70)){
                                this.anims.play('batFatGlide', true);
                            }
                            
                            this.shoveCoolDown = true;
                            let currentRabbit = this;
                            setTimeout(function () {
                                currentRabbit.shoveCoolDown = false;
                                console.log("shoveCoolDown has ended. player can be grabbed agian.");
                            }, 2000);
                        });
                    }

                //move the rabbit right if the player isnt knocked down
                }else if(this.y-110 > this.scene.player1.y && this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false ){
                    //stop momentum play idle loop
                    this.setVelocityX(0);
                    this.anims.play('batFatTryFly', true);
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    //lockout
                    if(this.unstuckBool === false){

                        this.setVelocityY(-130);
                        this.unstuckBool = true;

                        let temp = this;
                        setTimeout(function () {
                            temp.unstuckBool = false;
                            console.log("reset unstuck timer re used as trying to fly timer");
                        }, 500);
                    }

                }else if(this.scene.player1.x > this.x &&  this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat right"); 
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('batFatHop', true);
                    this.setVelocityX(250); 
                    
            
                //if the player not knocked how move the rabbit left
                }else if(this.scene.player1.x < this.x && this.attemptingGrab === false && this.grabTimer === false  && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat left");
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;  
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('batFatHop', true);
                    this.setVelocityX(-250); 
                    

                // if the rabbit is close enough to the player and they are knocked down.
                }else if((this.checkXRangeFromPlayer(80,80) && this.scene.playerStuckGrab === true)){

                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;
                    this.setDepth(7);
                    //have the rabbit move to the correct position with the feet and face the right direction.
                    //if the player is facing left

                    if(!this.checkXRangeFromPlayer(20,20) && this.scene.player1.x < this.x){
                        this.flipX = true;
                        this.setVelocityX(-30);
                        this.anims.play('batFatHop', true);
                        this.swallowDelay  = false;
                    }else if(!this.checkXRangeFromPlayer(20,20) && this.scene.player1.x > this.x){
                        this.flipX = false;
                        this.setVelocityX(30);
                        this.anims.play('batFatHop', true);
                        this.swallowDelay  = false;
                    }else{

                        this.setVelocityX(0);
                        if(this.swallowDelay  === false){

                             this.swallowDelay = true;

                            this.anims.play('batFatTemptingLook').once('animationcomplete', () => {

                                this.swallowDelay = false;

                                this.hitboxActive = true;
                                this.grabHitBox.body.enable = true;
                                this.attemptingGrab = true;

                            });
                        }
                        
                        
                    }

                }else if(this.scene.player1.x > this.x  && this.checkYRangeFromPlayer(70,100)  && this.grabTimer === false && this.swallowDelay === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat right");        
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('batFatHop', true);
                    this.setVelocityX(70); 
                    
            
                //if the player is to the right then move enemy to the left
                }else if(this.scene.player1.x < this.x  && this.checkYRangeFromPlayer(70,100)  && this.grabTimer === false && this.swallowDelay === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('batFatHop', true);
                    this.setVelocityX(-70); 
                
                //if the cat is above the knocked down player, then grab them
                }else if(!this.checkYRangeFromPlayer(70,70) && this.checkXRangeFromPlayer(30, 30) && this.grabCoolDown === false){

                    this.attackHitboxActive = false;
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.isPlayingMissedAnims = false; 

                    this.grabCoolDown = true;
                    let currentRabbit = this;
                    setTimeout(function () {
                        currentRabbit.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 2000);
                    

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setVelocityX(0); 
                    this.anims.play('batFatTryFly', true);

                    console.log("rabbit has lost the plot.")
                }  
            
            
    // behavior for sleeping 
    }else if(this.isSleeping === true){

        // if player is in range, and they make a sound then
        if(this.wakingUp === false && (this.target.x > this.x - 340 && this.target.x < this.x + 340) && (this.target.y > this.y - 340 && this.target.y < this.y + 340) && 
        (this.isSoundEffectPlaying('rubbleSFX') || this.isSoundEffectPlaying('weaponSFX') || this.isSoundEffectPlaying('playerJumpSFX') || this.isSoundEffectPlaying('whiteCatSFX'))){
            // play animation of them dropping down
            this.wakingUp = true;
            this.anims.play('batWakeUp').once('animationcomplete', () => {
                //set values approperiately.
                this.isSleeping = false;
                this.wakingUp = false;
            });

        }else if(this.wakingUp === false){
        // play idle animation
        this.setSize(70, 180, true);
        this.anims.play('batSleep',true);  
        }
    }
         if(this.hitboxActive === true){
                this.grabHitBox.x = this.x;
                this.grabHitBox.y = this.y;
            }else{
                this.grabHitBox.x = this.x;
                this.grabHitBox.y = this.y + 3000; 
            }

        //handles attack hit box positioning
        if(this.attackHitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                console.log("moving cat hitbox to the left");
                this.attackHitBox.x = this.x-15;

            //otherwise put it to the right.
            }else{
                console.log("moving cat hitbox to the right");
                this.attackHitBox.x = this.x+15;
            }
            this.attackHitBox.y = this.y-30;

        }else{
            this.attackHitBox.x = this.x;
            this.attackHitBox.y = this.y + 3000; 
        }

            // randomized bat velocity so they can keep up with the player without overlapping into eachother.
            if(this.randomizedXVelocity === false){
                this.randomizedXVelocity = true;
                //console.log("this.randomXVelocity: ",this.randomXVelocity);
                this.randomXVelocity = Math.floor(Math.random() * (255 - 235) + 235);
                
                let tempbat = this;
                setTimeout(function () {
                    tempbat.randomizedXVelocity = false;
                }, 500);
            }

        //updates the previous y value to tell if bat is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this bat.
    moveIdle() {
        this.anims.play('batIdle', true);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 
        this.setDepth(4);
        this.grabTimer = false;
        this.attemptingGrab = false;
        this.grabTimer = false;
        this.isButtSlamming = false;
        this.grabTimer = false;
        this.isPlayingMissedAnims = false;    
    }

    // functioned called to play animation when the player is defeated by the bat in gameover.
    gameOver(playerSex) {
        this.setSize(70, 180, true);
        this.setOffset(100, 59);
        this.anims.play('batGameover').once('animationcomplete', () => {

        });
    }

    //function called to play tiger eating animations.
    batEatsCat(rabbitSex){
       //sets velocity to zero since the enemy should not be moving.
       this.setVelocityX(0);
       this.setVelocityY(0);

       //get rid of hitbox while cat is being eaten
       this.hitboxActive = false;
       this.grabHitBox.x = this.x;
       this.grabHitBox.y = this.y + 3000; 

       //change the side of the sprite so the tall version is possitioned correctly off the ground( not clipping through the ground in grab animation.)
       this.setSize(70, 411, true);

       this.y = this.target.y-34;


        // decides if the male or female rabbit is being eaten.
        this.batIsEating = true;
        let batSexFlag = 'batAVMaleCatSwallow';
        if(rabbitSex === 1){
            batSexFlag = 'batAVFemaleCatSwallow';
        }
        
        this.playPlapSound('plap4',800);
        this.anims.play(batSexFlag).once('animationcomplete', () => {

            this.scene.initSoundEffect("whiteCatSFX","sad",0.3);
            batSexFlag = 'batAVMaleCatButtOnHead';
            if(rabbitSex === 1){
                batSexFlag = 'batAVFemaleCatButtOnHead';
            }
            this.playPlapSound('plap3',800);
            
            this.anims.play(batSexFlag).once('animationcomplete', () => {

                this.playPlapSound('plap5',800);
                this.anims.play("batAVCatSwallowFinish").once('animationcomplete', () => {
                    
                    this.playJumpySound('3',700);
                    this.anims.play("batCatButtHump").once('animationcomplete', () => {

                        this.scene.initSoundEffect('stomachSFX','1',0.03);
                        this.anims.play("batCatButtDigest").once('animationcomplete', () => {
                            this.batIsEating = false;
                            this.batHasEatenCat = true;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.enemyHP = 60;
                            this.setSize(70, 180, true);
                            this.setOffset(100, 59);
                            this.body.setGravityY(600);
                            this.y = this.y+70

                            //increaste grab hitbox size so it can grab the player while there on the ground.
                            this.grabHitBox.setSize(40,10,true);

                        });
                    });
                });
            });
        });
        
    }


    //the grab function. is called when player has overlaped with an enemy bat.
    grab(){

        let currentbat = this;
        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.batGrabFalse();

        } else if (this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.batGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //if the player is not defeated
            if (this.playerDefeated === false) {

                console.log('activating player damage function');
                //then allow the player to use controls to escape.
                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                this.tabToGiveUp();
                
            }

            //logic for if the player is not defeated and struggling
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);
            }

            //logic for if the player escapes the grab
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter >= 100){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerHealth === 0 && this.batHasEatenCat === false){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);

            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax && this.batHasEatenCat === true){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                //this.playerIsDefeatedTFLogic(playerHealthObject);
            }
        }
    }

    batGrabFalse(){
        // hide player
        this.scene.player1.visible = false;

        //make struggle prompts visible
        this.scene.KeyDisplay.visible = true;

         this.playerGrabbed = true;

        //set up collision for bat on layer 0
        this.batCollision = this.scene.physics.add.collider(this.scene.processMap.layer0, this);
        
        //if the player is not defeated, has not broken free and the animation has not batd played, 
        if (this.playerDefeated === false && this.playerBrokeFree === 0 && !this.animationPlayed && this.batHasEatenCat === false) {
           
            //set downward velocity to get the bat to the ground quicker
            this.setVelocityY(300);

            //change the side of the sprite so the tall version is possitioned correctly off the ground( not clipping through the ground in grab animation.)
            this.setSize(70, 411, true);

            // change enemy y to be positioned based on player. 
            this.y = this.scene.player1.y-40;
  
        }

        this.attackHitBox.x = this.x;
        this.attackHitBox.y = this.y + 3000; 
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000;

    }

    batGrabTrue(playerHealthObject){

        if(this.batHasEatenCat === false){
            //plays jumpy sound during grab.
            if(playerHealthObject.playerHealth > 0 ){
                this.playJumpySound('3',700);
            }
        // otherwise bat is fed so play this sound effect.
        }else{

        }

        //puts the key display in the correct location.
        this.scene.player1.y = this.y - 150;
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;

    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.
        let currentbat = this;

        //function to handle player struggle logic.
        if(this.batHasEatenCat === false){
              if (this.scene.checkWPressed() === true) {
                
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

            // displays inputs while struggling.
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyW display");
                this.scene.KeyDisplay.playWKey();
                this.keyAnimationPlayed = true;
            }

        }else if(this.batHasEatenCat === true){
             if (this.scene.checkWPressed() === true) {
                
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

            // displays inputs while struggling.
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyW display");
                this.scene.KeyDisplay.playWKey();
                this.keyAnimationPlayed = true;
            }
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
                currentbat.struggleCounterTick = false;
            }, 10);

        }
    }

    playerIsStrugglingLogic(playerHealthObject){

        let currentbat = this;

        //handles enemy struggle stages and progressions.
        if(this.batHasEatenCat === false){

            if(this.playerDefeatedAnimationStage === 0){
                    this.anims.play('batButtGrabbed', true);
                    this.playJumpySound('2',700);

            }else if(this.playerDefeatedAnimationStage === 1) {

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    this.playPlapSound('plap4',800);

                    this.anims.play('batButtSwallow1').once('animationcomplete', () => {
                            //this.scene.onomat.destroy();
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false;
                            
                    });
                }
            }else if(this.playerDefeatedAnimationStage === 2){
                this.anims.play('batButtInHead', true);
                this.playPlapSound('plap3',800);

                let thisbat = this;
                if (this.onomatPlayed === false) {
                    this.onomatPlayed = true;
                    let randX = Math.floor((Math.random() * 30));
                    let randY = Math.floor((Math.random() * 30));
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x + 15 -randX,this.y + 15 -randY,'charBubble',"@heart@");
                    this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                    this.scene.heartOnomat1.setScale(1/4);
                    this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                    setTimeout(function () {
                        thisbat.onomatPlayed = false;
                    }, 600);
                }
            }

            if(playerHealthObject.playerHealth < (playerHealthObject.playerMaxHealth/4) * 3 && this.playerDefeatedAnimationStage === 0){
                //increment the stage so behavior changes.
                this.playerDefeatedAnimationStage++;
            }

        }else if(this.batHasEatenCat === true){

            if(this.playerDefeatedAnimationStage === 0){
                    this.anims.play('batFatFaceSit', true);
                    this.playJumpySound('2',700);

            }else if(this.playerDefeatedAnimationStage === 1) {

                if (!this.animationPlayed) {

                    this.animationPlayed = true;

                    //this.playPlapSound('plap4',800);

                    this.anims.play('batFatFaceSitTo69').once('animationcomplete', () => {
                            //this.scene.onomat.destroy();
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false;
                            
                    });
                }
            }else if(this.playerDefeatedAnimationStage === 2){

                this.anims.play('batFat691', true);
                this.playPlapSound('plap3',800);

                let thisbat = this;
                if (this.onomatPlayed === false) {
                    this.onomatPlayed = true;
                    let randX = Math.floor((Math.random() * 30));
                    let randY = Math.floor((Math.random() * 30));
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x + 15 -randX,this.y + 15 -randY,'charBubble',"@heart@");
                    this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                    this.scene.heartOnomat1.setScale(1/4);
                    this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                    setTimeout(function () {
                        thisbat.onomatPlayed = false;
                    }, 600);
                }
            }

            if(playerHealthObject.playerCurse > (playerHealthObject.playerCurseMax/2) && this.playerDefeatedAnimationStage === 0){
                //increment the stage so behavior changes.
                this.playerDefeatedAnimationStage++;
            }
        }

        //handles how the damage counters function for the enemy.
        if(this.batDamageCounter === false){
            if(this.batHasEatenCat === false){
                //if the player hp is above 3/4s damage the player 
                if (playerHealthObject.playerHealth >= (playerHealthObject.playerMaxHealth/4) * 3 ) {

                    this.batDamageCounter = true;
                    //hpBar.calcDamage(2);
                    healthEmitter.emit(healthEvent.loseHealth,2)
                    setTimeout(function () {
                        currentbat.batDamageCounter = false;
                    }, 2000);
                // otherwise damage the player more.
                }else{
                    this.batDamageCounter = true;
                    //hpBar.calcDamage(2);
                    healthEmitter.emit(healthEvent.loseHealth,3)
                    setTimeout(function () {
                        currentbat.batDamageCounter = false;
                    }, 1000);
                }
            }else if(this.batHasEatenCat === true){
                //if the player is above half curse bar.
                if (playerHealthObject.playerCurse > (playerHealthObject.playerCurseMax/2)) {

                    this.batDamageCounter = true;
                    //hpBar.calcDamage(2);
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                    setTimeout(function () {
                        currentbat.batDamageCounter = false;
                    }, 2000);
                // otherwise damage the player more.
                }else{
                    this.batDamageCounter = true;
                    //hpBar.calcDamage(2);
                    healthEmitter.emit(healthEvent.curseBuildUp,3);
                    setTimeout(function () {
                        currentbat.batDamageCounter = false;
                    }, 1000);
                }
            }
        }
  
    }

    playWingFlapSound(type,delay){

        if(this.batSoundCoolDown === false){
            this.scene.initSoundEffect(this.batSFX,type,0.3);
            this.batSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.batSoundCoolDown = false;
            }, delay);
        }

    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the bat.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
       
        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {
            this.scene.KeyDisplay.playDKey();
            let currentbat = this; // important, sets currentbat to the current object so that we can use variables attached to this current bat object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentbat.scene.KeyDisplay.visible = true;
                currentbat.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentbat.playerDefeatedAnimationStage: " + currentbat.playerDefeatedAnimationStage);
            }, 1000);

            this.inStartDefeatedLogic = true;

            //case to make sure defeated stage 2 is not skipped during animation view
            if(this.playerDefeatedAnimationStage !== 1 && this.inSafeMode === false && this.lockout === undefined){
                this.playerDefeatedAnimationStage++;
                this.lockout = true;
            }
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

       
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 5) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentbat = this;
                console.log("currentbat.playerDefeatedAnimationStage: " + currentbat.playerDefeatedAnimationStage);

                this.currentbat = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentbat.scene.KeyDisplay.visible = true;
                    currentbat.scene.KeyDisplay.playDKey();
                    currentbat.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            //if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
                console.log("activating game over by hitting tab")
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.batMaleVore;
                }else{
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.batFemaleVore;
                }

                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.batDefeatedPlayerAnimation();
     
    }

    playerIsDefeatedTFLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the bat.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
       
        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {
            this.scene.KeyDisplay.playDKey();
            let currentbat = this; // important, sets currentbat to the current object so that we can use variables attached to this current bat object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentbat.scene.KeyDisplay.visible = true;
                currentbat.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentbat.playerDefeatedAnimationStage: " + currentbat.playerDefeatedAnimationStage);
            }, 1000);

            this.inStartDefeatedLogic = true;

            //case to make sure defeated stage 2 is not skipped during animation view
            if(this.playerDefeatedAnimationStage !== 1 && this.inSafeMode === false && this.lockout === undefined){
                this.playerDefeatedAnimationStage++;
                this.lockout = true;
            }
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

       
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 5) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentbat = this;
                console.log("currentbat.playerDefeatedAnimationStage: " + currentbat.playerDefeatedAnimationStage);

                this.currentbat = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentbat.scene.KeyDisplay.visible = true;
                    currentbat.scene.KeyDisplay.playDKey();
                    currentbat.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            //if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
                console.log("activating game over by hitting tab")
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.batMaleVore;
                }else{
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.batFemaleVore;
                }

                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.batDefeatedPlayerAnimation();
     
    }

    playerEscaped(playerHealthObject){

        let currentbat = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                currentbat.struggleFree = true;
                    
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                
                this.anims.play("batIdle", true);
                
                //resets the enemy variables and player variables.
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(70, 180, true);
                this.setOffset(100, 59);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.playerDefeatedAnimationStage = 0;

                //set butt slamming to false
                this.isButtSlamming = false;
                this.grabTimer = false;
                this.isPlayingMissedAnims = false; 

                //make sure collision is destroyed after player breaks free so bat doesnt get stuck on layer 0 platforms.
                this.batCollision.destroy();

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
                //this.scene.player1.setSize(23, 68, true);
                //this.scene.player1.body.setGravityY(600);
                //this.scene.player1.x = this.x;
                this.scene.player1.y = this.y;
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                currentbat = this;

                //reset the jump variables if the player escapes this enemys grab
                this.startJump = false;
                this.jumpAnimationPlayed = false;
                setTimeout(function () {

                    currentbat.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    // controls the damage resistance of the bat.
    damage() {
        console.log("this.enemyHP:" + this.enemyHP);
        this.setVelocityX(0);
        if (this.damageCoolDown === false && this.batIsEating === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if (this.enemyHP > 0) {

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

                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drop chance
                    let dropChance = Math.round((Math.random() * ((75) - (60 * this.scene.player1.dropChance)) + (60 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * (10 * this.scene.player1.dropAmount)) + 6);

                    // double drop amount if bat has eaten.
                    if(this.batHasEatenCat === true){
                        dropAmount * 3;
                    }

                    this.setDepth(4);

                    //decides amount of slime drops based on size
                    if( dropChance > 0){
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,16,1,dropAmount,"FUEL ICHOR","FUEL FOR A LANTERN.","ammo",5);
                    }

                    if(this.batHasEatenCat === false){
                        this.anims.play('batButtSlam').once('animationcomplete', () => {

                            this.enemyInDefeatedLogic = true;

                            //delete enemy hit box since they have batn defeated.
                            this.attackHitBox.x = this.x;
                            this.attackHitBox.y = this.y + 3000; 
                            this.grabHitBox.x = this.x;
                            this.grabHitBox.y = this.y + 3000; 
                        });
                    }else{
                         this.anims.play('batFatDefeatedFall').once('animationcomplete', () => {

                            this.enemyInDefeatedLogic = true;

                            //delete enemy hit box since they have batn defeated.
                            this.attackHitBox.x = this.x;
                            this.attackHitBox.y = this.y + 3000; 
                            this.grabHitBox.x = this.x;
                            this.grabHitBox.y = this.y + 3000; 
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

        this.scene.sound.get(this.batSFX).stop();
         this.setVelocityX(0);

        if(this.batHasEatenCat === false){
             this.anims.play('batDefeated', true);
        }else{
            if (!this.animationPlayed) {

                this.animationPlayed = true;
           
                this.anims.play('batFatDefeated', true);
                    
            }
        }
       
       
        this.batDefeated = true;
        this.attackHitBox.x = this.x;
        this.attackHitBox.y = this.y + 3000; 
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 
        this.body.setGravityY(600);
        

    }

    //handles damage types for blue bat. get these damage types from the attack that hits the enemy
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

    // plays the bat defeated player animations.
    batDefeatedPlayerAnimation() {

        let currentbat = this;
        if (this.playerDefeatedAnimationStage === 1) {
            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 6;

            this.playPlapSound('plap4',800);

            if (!this.animationPlayed) {
                
                this.scene.onomat = new makeText(this.scene,this.x-9,this.y+20,'charBubble',"SLORP");
                this.scene.onomat.visible = true;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textBuldgeDown(600);
                this.scene.onomat.textFadeOutAndDestroy(600);

                this.animationPlayed = true;
                this.anims.play('batButtSwallow1').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('batButtInHead', true);

            this.playPlapSound('plap3',800);

            let thisbat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 30));
                let randY = Math.floor((Math.random() * 30));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x + 15 -randX,this.y + 15 -randY,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisbat.onomatPlayed = false;
                }, 600);
            }
           
        }else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                this.playPlapSound('plap5',800);
                this.anims.play('batButtSwallow2').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    //stops wing beating sound effect
                    if(this.scene.sound.get(this.batSFX) !== undefined || this.scene.sound.get(this.batSFX) !== null){
                        //this.scene.sound.get(this.batSFX).stop();
                    }     
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('batButtHump', true);

            this.playJumpySound('3',700);

            let thisbat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 30));
                let randY = Math.floor((Math.random() * 30));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+15,this.y-randY+70,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisbat.onomatPlayed = false;
                }, 600);
            }
        } else if (this.playerDefeatedAnimationStage === 5) {

            if (!this.animationPlayed) {
                this.scene.onomat = new makeText(this.scene,this.x-11,this.y+60,'charBubble',"CHURN!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.scene.initSoundEffect('stomachSFX','1',0.03);
                this.animationPlayed = true;
                this.anims.play('batButtDigest').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }
        else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('batButtJiggle', true);
        }
    }

    batDefeatedPlayerTFAnimation() {

    }
    
}
