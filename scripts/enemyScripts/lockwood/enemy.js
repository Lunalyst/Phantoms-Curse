
class enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, xPos, yPos, sex, id, hp, enemySprite) {
        //super() calls the constructor() from the parent class we are extending
        console.log("enemySprite: ",enemySprite);
        super(scene, xPos, yPos, enemySprite);
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.enemyPreviousY = 0;
        //this.setPushable(false);
        this.moveCycleTimer = false;
        this.activatedCycleTimer = false;
        //value used to tell if the player can escape.
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        
        this.animationPosition;
        this.struggleFree = false;
        this.grabCoolDown = false;
        this.enemyId = id;
        this.enemyDamageCounter = false;
        this.playerDefeated = false;
        this.playerBrokeFree = 0;
        this.playerDefeatedAnimationStage = 0;
        this.stageTimer = 0;
        this.stageNumber = 2;
        this.enemyHP = hp;
        this.damageCoolDown = false;
        this.hitboxOverlaps = false;
        this.animationPlayed = false;
        this.startAnimationPlayed = false;
        this.keyAnimationPlayed = false;
        this.struggleCounterTick = false;
        this.inStartDefeatedLogic = false;
        this.playerDefeatedAnimationCooldown = false;
        this.plapSoundCoolDown = false;
        this.jumpySoundCoolDown = false;
        this.stomachSoundCoolDown = false;
        this.pumpSoundCoolDown = false;
        
        this.playerProgressingAnimation = false;
        this.isViewingAnimation = false;
        this.inSafeMode = false;

        this.safePrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.safePrompts.visible = false;
        this.playedSafePrompts = false;
        this.playerDefeatedAnimationStageMax = 0;

        this.scene = scene;

        this.startedGrab = false;
        this.randomInputCooldown = false;

        //shrinks prite back down to a third of its size since we upscale sprites.
        this.setScale(1 / 3);
       
        //used to tell which way the enemy is facing.
        this.direction = "left";

        //used to stop the giveup key from being pressed too much, causing a imediate skip in defeated animations.
        this.gaveUp = false;

        console.log("sex passed in enemy: " + sex);

        this.onomatPlayed = false;

        this.enemyDefeated = false;

        this.StruggleAnimationStage = 0;

        this.struggleProgressingStage = false;
        this.playerDamageTimer = false;

        this.enemyInDefeatedLogic = false;

        this.struggleAnimationInterupt = false;

        this.colliderRefArray = [];

        this.struggleCap = 100;
        this.struggleValue = 20;

        this.spitUp = false;
        
    }

    //functions that move evemy objects.is to be over written by child class
    Move(player1) {

    }

    //idle function played when the player is grabbed by something that isnt this enemy.
    //is to be over written by child class
    MoveIdle() {
        

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    //is to be over written by child class
    gameOver() {
        
    }

    //the grab function. is called when player has overlaped with an enemy.
    //is to be over written by child class
    grab(player1, keyS, KeyDisplay, keyW, scene, keyTAB) {
    

    }

    damage(scene) {
        
    }

    enemyDefeatedLogic(){
        
    }

    //simple function to set a few thing when grab is started
    enemyGrabFalse(){
        //hides player object during grab.
        this.scene.player1.visible = false;

        //set the player grabbed in this enemy to true
        this.playerGrabbed = true;
    }

    //handles damage damage calculator for the enemy.
    //is to be over written by child class
    calcDamage(slice, blunt, pierce, heat, lightning, cold) {
       
    }

    //plays the default player defeated animation.
    //is to be over written by child class
    defeatedPlayerAnimation() {
        
    }

    increaseStruggleBar(Amount){
        this.struggleCounter += Amount;
        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
        console.log('strugglecounter: ' + this.struggleCounter);
    }

    //pauses the animations of the enemys.
    pauseAnimations(scene) {
        if (scene.isPaused === true) {
            this.anims.pause();
        } else if (scene.isPaused === false) {
            this.anims.resume();
        }

    }

    tabToGiveUp(){
        //console.log("activating give up function from enemy.js")
        
        //if(Phaser.Input.Keyboard.JustDown(this.scene.keyTAB)){
        if(this.scene.checkGiveUpIndicatorIsDown()){
            healthEmitter.emit(healthEvent.loseHealth,9999);
            healthEmitter.emit(healthEvent.curseBuildUp,9999);
        }
    }

    // built in enemy function to check if a sound has been played.
    isSoundEffectPlaying(SFX){

        // return the bool value from the scene function to see if a sound is playing.
        return this.scene.isSoundEffectPlaying(SFX);
    }

    playPlapSound(type,delay){

        if(this.plapSoundCoolDown === false){
            this.scene.initSoundEffect('plapSFX',type,0.3);
            this.plapSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.plapSoundCoolDown = false;
            }, delay);
        }

    }

    playJumpySound(type,delay){

        if(this.jumpySoundCoolDown === false){
            this.scene.initSoundEffect('jumpySFX',type,0.04);
            this.jumpySoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.jumpySoundCoolDown = false;
            }, delay);
        }

    }

    playPumpSound(type,delay){

        if(this.pumpSoundCoolDown === false){
            this.scene.initSoundEffect('pumpingSFX',type,0.05);
            this.pumpSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.pumpSoundCoolDown = false;
            }, delay);
        }

    }

    playStomachSound(type,delay){

        if(this.stomachSoundCoolDown === false){
            this.scene.initSoundEffect('stomachSFX',type,0.1);
            this.stomachSoundCoolDown = true;
    
            let enemy = this;
            setTimeout(function () {
                enemy.stomachSoundCoolDown = false;
            }, delay);
        }

    }

    //maybe enemy needs to check if the player is in range of the current enemy. 
    checkRangeFromPlayer(xLeftThresh, XRightThresh, yLeftThresh, yRightThresh){

        // bounds check defined by x and y parameters
        if((this.scene.player1.x > this.x  - xLeftThresh && this.scene.player1.x < this.x + XRightThresh) &&this.scene.player1.y > this.y  - yLeftThresh && this.scene.player1.y < this.y + yRightThresh){
            return true;
        }else{
            return false;
        }
    }

    checkXRangeFromPlayer(xLeftThresh, XRightThresh){

        // bounds check defined by x  parameters
        if((this.scene.player1.x > this.x  - xLeftThresh && this.scene.player1.x < this.x + XRightThresh)){
            return true;
        }else{
            return false;
        }
    }

    checkYRangeFromPlayer(yTopThresh, yBottomThresh){

        // bounds check defined  y parameters
        if((this.scene.player1.y > this.y  - yTopThresh && this.scene.player1.y < this.y + yBottomThresh)){
            return true;
        }else{
            return false;
        }
    }

    checkXRangeFromTarget(target, xLeftThresh, XRightThresh){

        // bounds check defined by x  parameters
        //if(){
            if((target.x > this.x  - xLeftThresh && target.x < this.x + XRightThresh)){
                return true;
            }else{
                return false;
            }
        //}
    }

    checkYRangeFromTarget(target, yTopThresh, yBottomThresh){

        // bounds check defined  y parameters
        if((target.y > this.y  - yTopThresh && target.y < this.y + yBottomThresh)){
            return true;
        }else{
            return false;
        }
    }

    addColliderRef(collider){
        this.colliderRefArray.push(collider);
    }

    removeColliders(){
        this.colliderRefArray.forEach(collider =>{
            this.scene.physics.world.removeCollider(collider);
          
        });
    }

    hitBoxPositionActive(xValue,yValue){
        this.grabHitBox.x = xValue;
        this.grabHitBox.y = yValue;
    }

    hitBoxHide(){
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 
    }

    //function to handle reduction of struggle counter overtime.
    reduceStruggleCounter(){    

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
        if (this.struggleCounter > 0 && this.struggleCounter < this.struggleCap && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            let tempEnemy = this;
            setTimeout(function () {
                tempEnemy.struggleCounterTick = false;
            }, 10);

        }

    }

    struggleIncrease(playerHealthObject){

        //increase struggle amount my the struggleincrease value
        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
            this.struggleCounter += this.struggleValue;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            console.log('strugglecounter: ' + this.struggleCounter);
        }
    }

    struggleDecrease(){
        //makes sure the struggle bar does not go into the negitives
        if(this.struggleCounter - (this.struggleValue+1) > 0){
            this.struggleCounter -= (this.struggleValue+1);
        }else{
            this.struggleCounter = 0;
        }
        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
    }

    //struggle in the w direction only.
    struggleW(){

        if (this.scene.checkWPressed() === true) {  
                if (playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += this.struggleValue;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }else if(this.scene.checkAPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
                    if (playerHealthObject.playerHealth >= 1) {

                    //makes sure the struggle bar does not go into the negitives
                    if(this.struggleCounter - (this.struggleValue+1) > 0){
                        this.struggleCounter -= (this.struggleValue+1);
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

}

