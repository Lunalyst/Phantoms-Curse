
//implementation for enemy.
class enemyTemplate extends enemyTemplateMaleTF {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        
        //on set up, need to decide if eenemy or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'enemyTemplateMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'enemyTemplateFemale');
            this.enemySex = 1;
        

        //if the pref is either, then we randomly pick a sex for the enemyTemplate.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'enemyTemplateFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'enemyTemplateMale');
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

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitboxActive = false;

        // sets the enemyTemplates hp value
        this.enemyHP = 50;

        //gives the enemy gravity and sets the size of there hitbox.
        this.body.setGravityY(600); 
        this.setSize(27, 70, true);
        this.setOffset(72, 37);

        //extra variables specific to enemy
        if(this.enemySex === 0){
            this.grabType = "maleTF";
        }else{
            this.grabType = "femmaleTF";
        }
        

        //variable to tell if we are in the animation viewer.
        this.inSafeMode = inSafeMode;

        //defines enemyTemplate animations based on the players sex.
        //if this enemy is male
        if(this.enemySex === 0) {
            this.anims.create({ key: 'enemyTemplateIdle', frames: this.anims.generateFrameNames('enemyTemplateMale1', { start: 1, end: 5 }), frameRate: 8, repeat: -1 });
          
            //and the player is male, so only specific male on male animations
            if(sex === 0 ){

            //and the player is female, so only specific male on female animations
            }else{
                
            }

        //otherwise enemy is female   
        }else{
            
            //and the player is male, so only specific female on male animations
            if(sex === 0 ){
            
            //and the player is female, so only specific female on female animations
            }else{
               
            }

        }

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
        }

    }

    //functions that move enemyTemplate objects.
    move(){

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

    //simple idle function played when the player is grabbed by something that isnt this enemyTemplate.
    moveIdle() {

        if(this.enemyHP > 0 && this.inSafeMode === false){
            this.anims.play('enemyTemplateIdle', true);
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
            this.attackHitBox.x = this.x;
            this.attackHitBox.y = this.y + 3000; 
            this.setDepth(4);
            this.grabTimer = false;
            this.tiredCounter = 0; 
          
        }
        
    }

   
    //the grab function. is called when player has overlaped with an enemy enemyTemplate.
    grab(){

        //first checks if enemyTemplate object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.enemyTemplateGrabFalse();

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
            this.enemyTemplateGrabTrue();

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
            this.playerIsStrugglingLogic();

            
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

    enemyTemplateGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this enemyTemplate did not grab the player this.enemyTemplateID: " + this.enemyId);
        this.scene.player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.scene.player1.y = this.y - 150;
        // makes the key prompts visible.
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    enemyTemplateGrabTrue(){

        //if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;
      
    }

     playerIsNotDefeatedInputs(playerHealthObject){

        if(this.grabType === "maleTF"){
            this.playerIsNotDefeatedInputsMaleTF(playerHealthObject);
        }

     }

    playerIsStrugglingLogic(){

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

        if(this.grabType === "maleTF"){
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
        this.keyAnimationPlayed = false;
        this.scene.grabbed = false;
        this.playerDamageTimer = false;
        this.startedGrab = false;

        this.scene.player1.x = this.x
        this.scene.player1.y = this.y+20
        this.scene.player1.visible = true;

        this.scene.player1.mainHitbox.x = this.x
        this.scene.player1.mainHitbox.y = this.y+20

        //sets the cooldown to true, then calls the built in function of the scene to 
        //set it to false in 3 seconds. need to do this in scene to be safe
        //if the enemy is destroyed then the timeout function wont have a refrence if done here.
        this.scene.grabCoolDown = true;

    }

    // controls the damage resistance of the enemyTemplate.
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
                    this.anims.play('enemyTemplateDefeatedFall').once('animationcomplete', () => {
                     //then destroy slime.
                        this.anims.play('enemyTemplateDefeated');
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

    //handles damage types for blue enemyTemplate. get these damage types from the attack that hits the enemy
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
