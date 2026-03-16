
//implementation for the beeGrub enemy.
class beeGrub extends beeGrubAbsorb {
    
    constructor(scene, xPos, yPos, sex, id) {
        
        //on set up, need to decide if beeGrub is make or female, using preference variable in settings.
        super(scene, xPos, yPos, sex, id, 20, 'beeGrub');
       

        // variables for movement
        this.beeGrubSoundCoolDown = false;
        this.beeGrubDamageCounter = false;
        this.randomXVelocity = Math.floor((Math.random() * 250) + 30);
        this.randomizedXVelocity = false;
        this.grabTimer = false;
        this.hitboxActive = false;

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        //this.grabHitBox.visible = false;

        // sets the beeGrubs hp value
        this.enemyHP = 30;

        //defines beeGrub animations based on the players sex.
      
        this.anims.create({ key: 'beeGrubIdle', frames: this.anims.generateFrameNames('beeGrub', { start: 0, end: 4 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'beeGrubFedMale', frames: this.anims.generateFrameNames('beeGrub', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'beeGrubFedFemale', frames: this.anims.generateFrameNames('beeGrub', { start: 12, end: 17 }), frameRate: 8, repeat: -1 });


        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
        }
            

        this.anims.play('beeGrubIdle',true);

    }

    //functions that move beeGrub objects.
    move(){
        
     

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
    }

    // functioned called to play animation when the player is defeated by the beeGrub in gameover.
    gameOver() {
        this.setSize(70, 180, true);
        //this.setOffset(180, 110);
        this.anims.play('beeGrubGameover').once('animationcomplete', () => {

            this.anims.play('beeGrubMove', true);
            
            this.setVelocityX(50);

        });
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

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //logic for when the player is grabbed
            this.beeGrubGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator);
            
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
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else  if(playerHealthObject.playerHealth === 0){

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.deactivateGiveUpIndicator);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            
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
        this.scene.KeyDisplay.visible = true;
 
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
        
    }

    playerIsStrugglingLogic(){
       
        
    }

    playerIsDefeatedLogic(playerHealthObject){

       
     
    }

    playerEscaped(playerHealthObject){

       
        
    }

    // controls the damage resistance of the beeGrub.
    damage() {
       
    }

    //handles damage types for blue beeGrub. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
      
    }

    // plays the beeGrub defeated player animations.
    beeGrubDefeatedPlayerAnimation() {

        
    }
    
}
