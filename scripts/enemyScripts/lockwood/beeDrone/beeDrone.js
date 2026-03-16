
//implementation for the beeDrone enemy.
class beeDrone extends beeDroneAbduct {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode,soundSprite) {
        
        //on set up, need to decide if beeDrone is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'beeDroneMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'beeDroneFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the beeDrone.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'beeDroneFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'beeDroneMale');
                this.enemySex = 0;
            }
        }

        // variables for movement
        this.beeDroneSoundCoolDown = false;
        this.beeDroneDamageCounter = false;
        this.randomXVelocity = Math.floor((Math.random() * 250) + 30);
        this.randomizedXVelocity = false;
        this.grabTimer = false;
        this.hitboxActive = false;

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        //this.grabHitBox.visible = false;

        // sets the beeDrones hp value
        this.enemyHP = 50;

        //defines a string containing telling the enemy which sound channel to use.
        this.beeSFX = soundSprite;
        this.playingSound = false;

        this.inSafeMode = inSafeMode;
        // movesprompts lower than 
        
        this.tiredCounter = 0;
        this.isTired = false;
        

        //defines beeDrone animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'beeDroneIdle', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 1, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneMove', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneGrab', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 12, end: 17 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'beeDroneTailSwallow3', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 45, end: 50 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeDroneTailJiggle', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 52, end: 57 }), frameRate: 8, repeat: -1 });


            if(sex === 0 ){
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 18, end: 20 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 21, end: 26 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 27, end: 33 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 34, end: 39 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneMale1', { start: 40, end: 44 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 58-58, end: 69-58 }), frameRate: 8, repeat: 0 }); 
                
                this.anims.create({ key: 'beeDroneDefeatedWillingTV', frames: this.anims.generateFrameNames('beeDroneMale3', { start: 4, end: 12}), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneDefeatedWillingTVEnd', frames: this.anims.generateFrameNames('beeDroneMale3', { start: 13, end: 16}), frameRate: 6, repeat: -1 });
             
            }else{
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 70-58, end: 72-58 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 73-58, end: 78-58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 79-58, end: 85-58 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 86-58, end: 91-58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 92-58, end: 96-58 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 97-58, end: 108-58 }), frameRate: 8, repeat: 0 }); 
            }

            this.anims.create({ key: 'beeDroneTired', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 51, end: 56}), frameRate: 8, repeat: 3 }); 
            this.anims.create({ key: 'beeDroneDefeatedFall', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 57, end: 63}), frameRate: 8, repeat: 0 }); 
            this.anims.create({ key: 'beeDroneDefeated', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 63, end: 63}), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'beeDroneDefeatedFallLinger', frames: this.anims.generateFrameNames('beeDroneMale2', { start: 57, end: 62}), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeDroneDefeatedLinger', frames: this.anims.generateFrameNames('beeDroneMale3', { start: 0, end: 3}), frameRate: 6, repeat: -1 });
           
        }else{
            this.anims.create({ key: 'beeDroneIdle', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 1, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneMove', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'beeDroneGrab', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 12, end: 17 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'beeDroneTailSwallow3', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 45, end: 50 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'beeDroneTailJiggle', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 52, end: 57 }), frameRate: 8, repeat: -1 });
            if(sex === 0 ){
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 18, end: 20 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 21, end: 26 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 27, end: 33 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 34, end: 39 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneFemale1', { start: 40, end: 43 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 58-58, end: 69-58 }), frameRate: 8, repeat: 0 }); 
               
            }else{
                this.anims.create({ key: 'beeDroneGrabbed', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 70-58, end: 72-58 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'beeDroneStruggle', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 73-58, end: 78-58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow1', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 79-58, end: 85-58 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneTailStruggle', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 86-58, end: 91-58 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'beeDroneTailSwallow2', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 92-58, end: 96-58 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'beeDroneGameover', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 97-58, end: 108-58 }), frameRate: 8, repeat: 0 }); 
            }

            this.anims.create({ key: 'beeDroneTired', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 51, end: 56}), frameRate: 8, repeat: 3 }); 
            this.anims.create({ key: 'beeDroneDefeatedFall', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 57, end: 63}), frameRate: 8, repeat: 0 }); 
            this.anims.create({ key: 'beeDroneDefeated', frames: this.anims.generateFrameNames('beeDroneFemale2', { start: 63, end: 63}), frameRate: 8, repeat: 0 });
            
            
        }

        this.anims.play('beeDroneIdle',true);

    }

    //functions that move beeDrone objects.
    move(){
        //console.log(' this.enemyId: ', this.enemyId,' this.playerGrabbed: ',this.playerGrabbed, ' this.grabTimer: ',this.grabTimer);
         if (this.enemyHP > 0) {

            if(this.tiredCounter > 4 && this.isTired === false){
                //choke
                this.isTired = true;
                //play animation of bee being tired, \

                //have the bee float upwards for the next charge.
                this.setVelocityX(0);
                this.setVelocityY(70);

                 this.anims.play('beeDroneTired').once('animationcomplete', () => {
                    this.isTired = false;
                    this.tiredCounter = 0;
                });

            }else if(this.tiredCounter <= 4){
                //if the enemy is within grab range attempt to grab the player while the grab timer is false
                if((this.scene.player1.x > this.x - 60 && this.scene.player1.x < this.x + 60) && this.grabTimer === false){

                    this.grabTimer = true;
                    this.hitboxActive = true;

                        //controls the x velocity when the bee ischarging to grab the player
                        if (this.scene.player1.x > this.x){
                            
                            this.setVelocityX(255);
                            this.flipX = false;
                                        
                        } else if (this.scene.player1.x < this.x) {

                            this.setVelocityX(255 * -1);
                            this.flipX = true;
                        }

                    //controls the y velocity when the bee is charging to grab the player
                    if ((this.scene.player1.y > this.y  && this.scene.player1.y < this.y )){
                        this.setVelocityY(0);
                    }else{
                        if (this.scene.player1.y > this.y) {
                            this.setVelocityY(100);

                        } else if (this.scene.player1.y < this.y) {
                            this.setVelocityY(100*-1);    
                        }
                    }

                    this.grabHitBox.body.enable = true;

                    //player the bee grab animation and once its complete
                    this.anims.play('beeDroneGrab').once('animationcomplete', () => {

                        this.hitboxActive = false;

                        //play the idle animation
                        this.anims.play('beeDroneIdle', true);

                        this.tiredCounter++;

                        //have the bee float upwards for the next charge.
                        this.setVelocityX(0);
                        this.setVelocityY(-50);

                        //time out to reset the grab timer, giving the bee a little time to float upwards and give the player a break
                        let tempBee = this;
                        setTimeout(function () {
                            tempBee.grabTimer = false;
                        }, 500);
                        
                    });

                //checks to see if beeDrone should move if the player is within range. also has to check y and if the enemy isnt grabbing.
                }else if(this.grabTimer === false){

                    this.grabHitBox.body.enable = false;

                    if ((this.scene.player1.x > this.x - 450 && this.scene.player1.x < this.x + 450) && (this.scene.player1.y > this.y - 450 && this.scene.player1.y < this.y + 450)) {

                        if(this.playingSound === false){
                            this.playWingFlapSound('1',500);
                            this.playingSound = true;
                        }
                        this.setSize(70, 180, true);
                
                        //if bee is within range
                        if ((this.scene.player1.x > this.x - 50 && this.scene.player1.x < this.x + 50)){
                            this.anims.play('beeDroneIdle',true);
                            this.setVelocityX(0);
            
                        }else{
                            //if the beeDrone is left of the player move the beeDrone right twards the player bot not into them yet.
                            if (this.scene.player1.x > this.x){
                                
                                this.setVelocityX(this.randomXVelocity);
                                //play the animation for beeDrone being in the air.
                                this.anims.play('beeDroneMove',true);
                                this.flipX = false;
                                            
                            //if the beeDrone is to the right of the player, then move the beeDrone left
                            } else if (this.scene.player1.x < this.x) {
            
                                this.setVelocityX(this.randomXVelocity * -1);
                                //play the animation for beeDrone being in the air.
                                this.anims.play('beeDroneMove',true);
                                this.flipX = true;
                            }
                        }
                        //keep the bee floating lightly above the players y
                        if ((this.scene.player1.y > this.y  && this.scene.player1.y < this.y + 50)){
                            //this.anims.play('beeDroneIdle',true);
                            this.setVelocityY(0);
            
                        }else{
                            if (this.scene.player1.y > this.y) {
            
                                this.setVelocityY(70);
            
                            } else if (this.scene.player1.y < this.y) {
            
                                this.setVelocityY(70*-1);    
                            }
                        }
            
                    //if the be isnt within range of the player have them idle.  
                    }else{
                        this.anims.play('beeDroneIdle', true);
                        this.setVelocityX(0);
                        this.setVelocityY(0);

                        if(this.scene.sound.get(this.beeSFX) !== null){
                            this.scene.sound.get(this.beeSFX).stop();
                        }

                        this.playingSound = false;
                        
                    }

                }

                if(this.hitboxActive === true){
                    this.grabHitBox.x = this.x;
                    this.grabHitBox.y = this.y;
                }else{
                    this.grabHitBox.x = this.x;
                    this.grabHitBox.y = this.y + 3000; 
                }

                // randomized bee velocity so they can keep up with the player without overlapping into eachother.
                if(this.randomizedXVelocity === false){
                    this.randomizedXVelocity = true;
                    //console.log("this.randomXVelocity: ",this.randomXVelocity);
                    this.randomXVelocity = Math.floor(Math.random() * (255 - 235) + 235);
                    
                    let tempBee = this;
                    setTimeout(function () {
                        tempBee.randomizedXVelocity = false;
                    }, 500);
                }
            }
        }

        //updates the previous y value to tell if beeDrone is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this beeDrone.
    moveIdle() {
        if(this.enemyHP > 0){
            this.anims.play('beeDroneIdle', true);
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
            this.setDepth(4);
            this.grabTimer = false;
        }
        
    }

   
    //the grab function. is called when player has overlaped with an enemy beeDrone.
    grab(){

        let currentbeeDrone = this;
        //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.beeDroneGrabFalse();

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
            this.beeDroneGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //if the player is not defeated
            if (this.playerDefeated === false) {

                //then allow the player to use controls to escape.
                this.playerIsNotDefeatedInputsAbduct(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                this.tabToGiveUp();
                
            }

            //logic for if the player is not defeated and struggling
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogicAbduct();

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscapedAbduct(playerHealthObject);

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
            }
        }
    }

    beeDroneGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this beeDrone did not grab the player this.beeDroneID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    beeDroneGrabTrue(playerHealthObject){

        //plays jumpy sound during grab.
        if(playerHealthObject.playerHealth > 0 ){
            this.playJumpySound('3',700);
        }

        //console.log("this beeDrone did grab the player this.beeDroneID: "+ this.beeDroneId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;

        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
      
    }

    playWingFlapSound(type,delay){

        if(this.beeDroneSoundCoolDown === false){
            this.scene.initSoundEffect(this.beeSFX,type,0.3);
            this.beeDroneSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.beeDroneSoundCoolDown = false;
            }, delay);
        }

    }

    playerIsDefeatedLogic(playerHealthObject){

       this.playerIsDefeatedLogicAbduct();
     
    }

    // controls the damage resistance of the beeDrone.
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

                    this.scene.sound.get(this.beeDroneSFX).stop();
                    this.grabHitBox.destroy();

                    this.body.setGravityY(600);
                    this.setVelocityX(0);

                    if(this.scene.playerLocation === "sunFlowerField"){
                        this.scene.beesDefeated++;
                        console.log("incrementing bee counter for defeated bees! ",this.scene.beesDefeated);
                        if(this.scene.beesDefeated > 0){
                            //let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                            let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                            //if( dropChance > 0){
                                this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,17,1,dropAmount,"POLLEN","SUNFLOWER POLLEN.","drop",8);
                            //}
                            

                            this.anims.play('beeDroneDefeatedFallLinger').once('animationcomplete', () => {
                                //then destroy slime.
                                this.anims.play('beeDroneDefeatedLinger');

                                this.scene.initBeeSecret(this.x,this.y,this);
                            });


                        }else {
                            //let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                            let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                            //if( dropChance > 0){
                                this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,17,1,dropAmount,"POLLEN","SUNFLOWER POLLEN.","drop",8);
                            //}

                            this.anims.play('beeDroneDefeatedFall').once('animationcomplete', () => {
                                //then destroy slime.
                                this.anims.play('beeDroneDefeated');
                            });
                        }
                    }else{
                        //let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                        let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 1));

                        //if( dropChance > 0){
                            this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,17,1,dropAmount,"POLLEN","SUNFLOWER POLLEN.","drop",8);
                        //}

                        this.anims.play('beeDroneDefeatedFall').once('animationcomplete', () => {
                            //then destroy slime.
                            this.anims.play('beeDroneDefeated');
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

    //handles damage types for blue beeDrone. get these damage types from the attack that hits the enemy
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

        this.animationGrabAbduct();
    }
    
}
