
//implementation for the beeGrub enemy.
class beeGrub extends beeGrubAbsorb {
    
    constructor(scene, xPos, yPos, sex, id, inSafeMode) {
        
        //on set up, need to decide if beeGrub is make or female, using preference variable in settings.
        super(scene, xPos, yPos, sex, id, 20, 'beeGrub');
       

        // variables for movement
        this.beeGrubSoundCoolDown = false;
        this.beeGrubDamageCounter = false;
        this.randomXVelocity = Math.floor((Math.random() * 250) + 30);
        this.randomizedXVelocity = false;
        this.grabTimer = false;
        this.hitboxActive = false;
        this.grubMove = false;
        this.isPlayingMissedAnims = false;
        this.attemptingGrab = false;

        this.beeDroneSoundCoolDown = false;

        this.beeSFX = "wingFlapSFX0";

        //this.struggleValue = 10;
        this.inSafeMode = inSafeMode;

        this.spitUp = false;
        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitboxActive = false;

        // sets the beeGrubs hp value
        this.enemyHP = 30;

        //defines beeGrub animations based on the players sex.
      
        this.anims.create({ key: 'beeGrubIdle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'beeGrubIdleFast', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'beeGrubWalk', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 4, end: 10 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'beeGrubWalkFast', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 4, end: 10 }), frameRate: 16, repeat: 0 });
        
        this.anims.create({ key: 'beeGrubFedMale', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 11, end: 16 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'beeGrubFedFemale', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 17, end: 22 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'beeGrubToungLashStart', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 23, end: 27 }), frameRate: 8, repeat: 0 });
        this.anims.create({ key: 'beeGrubToungLashMiddle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 28, end: 29 }), frameRate: 8, repeat: 0 });
        this.anims.create({ key: 'beeGrubToungLashEnd', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 30, end: 32 }), frameRate: 8, repeat: 0 });
        
        this.anims.create({ key: 'beeGrubDefeated', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 35, end: 39 }), frameRate: 8, repeat: 0 });
        this.anims.create({ key: 'beeGrubDefeatedIdle', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 39, end: 39 }), frameRate: 8, repeat: -1 });

         if (sex === 0) {
            this.anims.create({ key: 'beeGrubToungLashGrab', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 33, end: 37 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubHalfInStruggle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 38, end: 41 }), frameRate: 8, repeat: 2 });
            this.anims.create({ key: 'beeGrubSwallowComplete', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 42, end: 47 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubIdleStruggle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 48, end: 53 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubDownStruggle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 54, end: 59 }), frameRate: 8, repeat: 0 });
            
            this.anims.create({ key: 'beeGrubAbsorbCurseSquishStart', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 60, end: 66 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurseSquishIdle', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 67, end: 71 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'beeGrubAbsorbCurse1', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 72, end: 73 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse2', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 74, end: 75 }), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse3', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 76, end: 76 }), frameRate: 4, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse4', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 77, end: 77 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse5', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 78, end: 84 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'beeGrubCacoon', frames: this.anims.generateFrameNames('beeGrubMale1', { start: 85, end: 85 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'beeGrubAbsorbMorph1', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 0, end: 14 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbMorph2', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 15, end: 15 }), frameRate: 8, repeat: 0 });
            
            this.anims.create({ key: 'beeDroneFloat', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 16, end: 21 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'beeGrubFullSpitUpStart', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 22, end: 24 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubFullSpitUpEnd', frames: this.anims.generateFrameNames('beeGrubMale2', { start: 25, end: 34 }), frameRate: 8, repeat: 0 });

         }else{
            this.anims.create({ key: 'beeGrubToungLashGrab', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 33, end: 37 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubHalfInStruggle', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 38, end: 41 }), frameRate: 8, repeat: 2 });
            this.anims.create({ key: 'beeGrubSwallowComplete', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 42, end: 47 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubIdleStruggle', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 48, end: 53 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubDownStruggle', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 54, end: 59 }), frameRate: 8, repeat: 0 });
            
            this.anims.create({ key: 'beeGrubAbsorbCurseSquishStart', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 60, end: 66 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurseSquishIdle', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 67, end: 71 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'beeGrubAbsorbCurse1', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 72, end: 73 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse2', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 74, end: 75 }), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse3', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 76, end: 76 }), frameRate: 4, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse4', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 77, end: 77 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbCurse5', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 78, end: 84 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'beeGrubCacoon', frames: this.anims.generateFrameNames('beeGrubFemale1', { start: 85, end: 85 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'beeGrubAbsorbMorph1', frames: this.anims.generateFrameNames('beeGrubFemale2', { start: 0, end: 14 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubAbsorbMorph2', frames: this.anims.generateFrameNames('beeGrubFemale2', { start: 15, end: 15 }), frameRate: 8, repeat: 0 });
            
            this.anims.create({ key: 'beeDroneFloat', frames: this.anims.generateFrameNames('beeGrubFemale2', { start: 16, end: 21 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'beeGrubFullSpitUpStart', frames: this.anims.generateFrameNames('beeGrubFemale2', { start: 22, end: 24 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeGrubFullSpitUpEnd', frames: this.anims.generateFrameNames('beeGrubFemale2', { start: 25, end: 34 }), frameRate: 8, repeat: 0 });

            
         }

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
        }
            

        this.anims.play('beeGrubIdle',true);

         this.setSize(270, 80, true);
         this.setOffset(200, 150-6);

        this.body.setGravityY(600); 

    }

    //functions that move beeGrub objects.
    move(){
        if (this.enemyHP > 0) {
        
        if (this.checkXRangeFromPlayer(400, 400) && this.checkYRangeFromPlayer(200,100) && this.enemyDefeated === false) {
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if(this.checkXRangeFromPlayer(62, 62) && this.grabTimer === false && this.attemptingGrab === false ) {

                if(this.grubMove === false){

                    this.grubMove = true;

                    if(this.scene.player1.x > this.x){
                        this.setVelocityX(40 * -1);
                        this.flipX = true;
                    }else{
                        this.setVelocityX(40 * 1);
                        this.flipX = false;
                    } 

                    this.anims.play('beeGrubWalkFast').once('animationcomplete', () => {
                            
                        this.setVelocityX(0);
                        this.anims.play('beeGrubIdleFast',true);

                            let temp = this;
                            setTimeout(function () {

                               temp.grubMove = false;
                               
                            }, 100);
                            
                        });

                    }

            }else if(this.checkXRangeFromPlayer(65, 65) || this.grabTimer === true || this.attemptingGrab === true) {
                this.grubMove = false;
                this.setVelocityX(0);


                if(this.grabTimer === false && this.checkYRangeFromPlayer(65, 65)){

                    this.grabTimer = true;
                    this.setDepth(7);

                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    } 

                    this.anims.play('beeGrubToungLashStart').once('animationcomplete', () => {
                    
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                    });

                }else if(this.attemptingGrab === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.anims.play('beeGrubToungLashMiddle').once('animationcomplete', () => {

                             this.hitboxActive = false;
                            this.attemptingGrab = false;
                                
                            this.anims.play('beeGrubToungLashEnd').once('animationcomplete', () => {
                                this.setDepth(5);

                                this.isPlayingMissedAnims = false;  
                                this.grabTimer = false;

                                /*let currentEnemy = this;
                                setTimeout(function () {
                                    currentEnemy.grabTimer = false;
                                    currentEnemy.scene.grabCoolDown = false;
                                    console.log("grab cooldown has ended. player can be grabbed agian.");
                                }, 2000);*/
                            });
                        });
                    }
                }else if(!this.checkYRangeFromPlayer(65, 65) && !this.grabTimer === true && !this.attemptingGrab === true){
                    this.anims.play('beeGrubIdle',true);
                }

            }else if(this.checkXRangeFromPlayer(220, 220) && this.grabTimer === false && this.attemptingGrab === false) {

                if(this.grubMove === false){

                    this.grubMove = true;

                    if(this.scene.player1.x < this.x){
                        this.setVelocityX(40 * -1);
                        this.flipX = true;
                        //this.setOffset(200, 150);
                    }else{
                        this.setVelocityX(40 * 1);
                        this.flipX = false;
                        //this.setOffset(0, 150);
                    } 

                    this.anims.play('beeGrubWalkFast').once('animationcomplete', () => {
                            
                        this.setVelocityX(0);
                        this.anims.play('beeGrubIdleFast',true);

                            let temp = this;
                            setTimeout(function () {

                               temp.grubMove = false;
                               
                            }, 300);
                            
                            

                        });
                    }
   
            }else if(this.checkXRangeFromPlayer(350, 350) && this.grabTimer === false && this.attemptingGrab === false) {

                if(this.grubMove === false){

                    this.grubMove = true;

                    if(this.scene.player1.x < this.x){
                        this.setVelocityX(20 * -1);
                        this.flipX = true;
                        //this.setOffset(200, 150);
                    }else{
                        this.setVelocityX(20 * 1);
                        this.flipX = false;
                        //this.setOffset(0, 150);
                    } 

                    this.anims.play('beeGrubWalk').once('animationcomplete', () => {
                            
                        this.setVelocityX(0);
                        this.anims.play('beeGrubIdleFast',true);

                            let temp = this;
                            setTimeout(function () {

                               temp.grubMove = false;
                               
                            }, 400);
                            
                            

                        });
                    }
   
            }else{
                this.grubMove = false;
            }
            
            let currentSlime = this;
        } else if(this.enemyDefeated === false) {
            //player is not in range of slime so slime is in idle animation.
            this.anims.play('beeGrubIdle', true);
            
            this.setVelocityX(0);

        }

        //handles hit box positioning
        if(this.hitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                console.log("moving cat hitbox to the left");
                this.grabHitBox.x = this.x-50;

            //otherwise put it to the right.
            }else{
                console.log("moving cat hitbox to the right");
                this.grabHitBox.x = this.x+50;
            }
            this.grabHitBox.y = this.y+25;

        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
    }

        

        //updates the previous y value to tell if beeGrub is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this beeGrub.
    moveIdle() {
        this.anims.play('beeGrubIdle', true);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 
        this.setDepth(4);

        this.grabTimer = false;
        this.attemptingGrab = false;
        //this.grubMove = false
    }

    // functioned called to play animation when the player is defeated by the beeGrub in gameover.
    gameOver() {
        this.setSize(70, 180, true);
        //this.setOffset(180, 110);
       
        
       
    }
    
    //the grab function. is called when player has overlaped with an enemy beeGrub.
    grab(){

        let currentbeeGrub = this;
        //first checks if beeGrub object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.beeGrubGrabFalse();

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

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);

            //logic for when the player is grabbed
            this.beeGrubGrabTrue(playerHealthObject);

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
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){
            
            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

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

    beeGrubGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this beeGrub did not grab the player this.beeGrubID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        //this.scene.KeyDisplay.visible = true;
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    beeGrubGrabTrue(playerHealthObject){

        //console.log("this beeGrub did grab the player this.beeGrubID: "+ this.beeGrubId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;

        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
      

        
    }

    playerIsNotDefeatedInputs(playerHealthObject){

        this.playerIsNotDefeatedInputsAbduct(playerHealthObject);
    }

    playerIsStrugglingLogic(){
       
        this.playerIsStrugglingLogicAbduct();
    }

    playerIsDefeatedLogic(playerHealthObject){

       this.playerIsDefeatedLogicAbduct();
     
    }

    playerEscaped(playerHealthObject){

       this.playerEscapedAbduct(playerHealthObject);
        
    }

    // controls the damage resistance of the beeGrub.
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

                    //this.scene.sound.get(this.beeDroneSFX).stop();
                    this.grabHitBox.destroy();

                    //this.body.setGravityY(600);
                    this.setVelocityX(0);

                    
                    //let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                    //if( dropChance > 0){
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,26,1,dropAmount,"GRUB GOO","GRUB JUICES. GROSS.","drop",4);
                    //}

                    this.anims.play('beeGrubDefeated').once('animationcomplete', () => {
                    //then destroy slime.
                        this.anims.play('beeGrubDefeatedIdle');
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

    //handles damage types for blue beeGrub. get these damage types from the attack that hits the enemy
    //handles damage types for blue beeDrone. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold, curse) {
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

     playWingFlapSound(type,delay){
        //console.log("playing flap sound")
        if(this.beeDroneSoundCoolDown === false){
            this.scene.initSoundEffect(this.beeSFX,type,0.5);
            this.beeDroneSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.beeDroneSoundCoolDown = false;
            }, delay);
        }

    }

    animationGrab(){
        this.animationGrabAbduct();
    }
    
}
