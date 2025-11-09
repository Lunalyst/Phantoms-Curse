

//implementation for the blue enemy enemy.
class mushroom extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
       

         if(scene.preferance === 0){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 0){
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-male-tf');
                this.enemySex = 0;
            }else{
                super(scene, xPos, yPos+22, sex, id, 20, 'mushroom-female-tf');
                this.enemySex = 1;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.collision = 170;
        //make a hitbox so the cat can grab the player.
        //this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        //this.grabHitBox.setSize(30,10,true);
        //this.hitboxActive = false;
        this.isHiding = true;
        this.inEmergingAnimation = false;
        this.movingToNewNode = false;
        this.curNode = null;
        this.myceliumTimer = false;
         this.setDepth(4);
         this.body.enable = false;
         this.sporeCloudDirection = 30;
         this.sporeDanceLock = false;
         this.direction = "right";
         this.transferSpeed = 300;
          
         this.enemyHP = 1;
        //defines Enemy animations based on the players sex.
        if (this.enemySex === 0) {
            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'popOut', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 3, end: 8 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'mushIdle', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 9, end: 12 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'becomeHidden', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 13, end: 18 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceEnd', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 27, end: 31 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceIdle', frames: this.anims.generateFrameNames('mushroom-male-tf', { start: 19, end: 31 }), frameRate: 15, repeat: -1 });
        }else{
            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'popOut', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 3, end: 8 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'mushIdle', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 9, end: 12 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'becomeHidden', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 13, end: 18 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceEnd', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 27, end: 31 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceStart', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 27 }), frameRate: 15, repeat: 0 });
            this.anims.create({ key: 'shroomDanceIdle', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 31 }), frameRate: 15, repeat: -1 });
            //this.anims.create({ key: 'shroomDance', frames: this.anims.generateFrameNames('mushroom-female-tf', { start: 19, end: 42 }), frameRate: 12, repeat: -1 });
        }

         //this.setSize(this.collision, this.collision, true);
       
            //if we are using dark lighting
            if(this.scene.lightingSystemActive === true){ 

                this.lightSource = this.scene.lights.addLight(this.x,this.y, 90, 0xb317ff,0.6);
                
                
    
            }

        
        this.inSafeMode = inSafeMode;

        this.anims.play("hiding",true);

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 90, 0xb317ff);
            this.curseLight1 = this.scene.lights.addLight(this.x,this.y-30, 90, 0xb317ff);
            this.curseLight.visible = false;

            //adds a tween to yoyo the radius of the light giving it a flicker effect.
                this.scene.tweens.add({
                    targets: this.curseLight,
                    props : {
                        radius: {value : '+=' +10},
                    }, 
                    ease: 'linear',
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
          }
        

    }

    //functions that move enemy objects.
    move() {
        this.setSize(70, 180, true);
        this.setOffset(115, 59);

        //console.log("this.curNode.x: ",this.curNode.x, "this.x: ",this.x);
                
    
        let currentEnemy = this;
        if(this.enemyDefeated === false) {

            if(this.movingToNewNode === false){
                //if the enemy is hiding
                if(this.isHiding === true && this.inEmergingAnimation === false){
                    this.y = this.curNode.y+22;
                    this.x = this.curNode.x;
                    if(this.checkXRangeFromPlayer(60, 60) && this.checkYRangeFromPlayer(80,80)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;

                        this.scene.initSoundEffect('growSFX','2',0.05);

                        //play animation and go into not hiding logic
                        this.anims.play('popOut').once('animationcomplete', () => {

                            this.isHiding = false;
                            this.inEmergingAnimation = false;
                            this.anims.play('mushIdle',true);
                            this.lightSource.radius = 110
                            this.lightSource.intensity = 0.9;
                                
                        });
                    }else if(!this.checkXRangeFromPlayer(220, 220) || !this.checkYRangeFromPlayer(55, 100)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;
                        //then play animation and go back to the hiding state.
                        
                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.moveMushroomFollow();
                                
                    }
                //if the enemy is active
                }else if(this.isHiding === false && this.inEmergingAnimation === false){
                     
                    if(this.checkXRangeFromPlayer(80, 80) && this.checkYRangeFromPlayer(80,80)){

                        if(this.sporeDanceLock === false){

                            this.sporeDanceLock = true;

                            this.anims.play("shroomDanceStart",true).once('animationcomplete', () =>{

                                if(this.scene.player1.x > this.x){
                                    this.scene.initSporeCloud(this.x,this.y,"left");
                                }else{
                                    this.scene.initSporeCloud(this.x,this.y,"right");
                                }

                                this.scene.initSporeCloud(this.x,this.y,this.direction);

                                //this.anims.play("shroomDanceEnd",true).once('animationcomplete', () =>{
                                    this.sporeDanceLock = false;

                                    if(this.flipX === false){
                                        this.direction = "right";
                                         this.flipX = true;
                                    }else{
                                        this.direction = "left";
                                        this.flipX = false;
                                    }

                                   

                                //},);

                                
                            },);
                        }
                        
                        
                    }else if(!this.checkXRangeFromPlayer(220, 220)){
                        //console.log("player is in range");
                        this.inEmergingAnimation = true;
                        this.sporeDanceLock = false;
                        //then play animation and go back to the hiding state.
                        this.scene.initSoundEffect('growSFX','3',0.05);
                        this.anims.play('becomeHidden').once('animationcomplete', () => {

                            this.scene.initSporeCloud(this.x,this.y,"left");

                            this.scene.initSporeCloud(this.x,this.y,"right");

                            this.isHiding = true;
                            this.inEmergingAnimation = false;
                            this.anims.play('hiding',true);
                            this.lightSource.radius = 90;
                            this.lightSource.intensity = 0.7;

                            this.moveMushroomFollow();
                                
                        });
                    }else{
                        this.sporeDanceLock = false; 
                        this.anims.play("mushIdle",true);
                        
                     }
                }
                this.setVelocityX(0);
                this.setVelocityY(0);
            }else if(this.movingToNewNode === true){

                this.lightSource.x = this.x;
                this.lightSource.y = this.y+35;

                if(this.curNode.x !== this.x || this.curNode.y+22 !== this.y ){

                    //make mycelium effect
                    if(this.myceliumTimer === false){

                        this.myceliumTimer = true;
                        let effect = new mycelium(this.scene, this.x, this.y+33);


                        let mush = this;
                        setTimeout(function () {
                            mush.myceliumTimer = false;
                        }, 30);

                    }
                    
                    if(this.curNode.x+7 < this.x){
                        this.setVelocityX(-this.transferSpeed);  
                    }else if(this.curNode.x-7 > this.x){
                        this.setVelocityX(this.transferSpeed);
                    }else{
                        this.setVelocityX(0);
                        this.x = this.curNode.x;
                    }

                    if(this.curNode.y+22+7 < this.y){
                        this.setVelocityY(-this.transferSpeed);  
                    }else if(this.curNode.y+22-7 > this.y){
                        this.setVelocityY(this.transferSpeed);
                    }else{
                        this.setVelocityY(0);
                        this.y = this.curNode.y+22;
                    }
                        
                }else{
                    this.movingToNewNode = false;
                    this.curNode.visible = false;
                    this.y = this.curNode.y+22;
                    this.x = this.curNode.x;
                    this.visible = true;
                    this.lightSource.y = this.y;
                    this.lightSource.radius = 130;
                    this.lightSource.intensity = 0.9;
                    this.scene.initSoundEffect('growSFX','1',0.05);
                    this.scene.initSporeCloud(this.x,this.y,"still");

                }
 
                
            }

        //else if the enemy is defeated and is hidden
        }else if(this.movingToNewNode === true){

            this.lightSource.x = this.x;
            this.lightSource.y = this.y+35;

            if(this.curNode.root.x !== this.x || this.curNode.root.y+22 !== this.y ){

                //make mycelium effect
                if(this.myceliumTimer === false){

                    this.myceliumTimer = true;
                    let effect = new mycelium(this.scene, this.x, this.y+33);


                    let mush = this;
                    setTimeout(function () {
                        mush.myceliumTimer = false;
                    }, 30);

                }
                        
            if(this.curNode.root.x+7 < this.x){
                this.setVelocityX(-this.transferSpeed);  
            }else if(this.curNode.root.x-7 > this.x){
                this.setVelocityX(this.transferSpeed);
            }else{
                this.setVelocityX(0);
                this.x = this.curNode.root.x;
            }

            if(this.curNode.root.y+22+7 < this.y){
                this.setVelocityY(-this.transferSpeed);  
            }else if(this.curNode.root.y+22-7 > this.y){
                this.setVelocityY(this.transferSpeed);
            }else{
                this.setVelocityY(0);
                this.y = this.curNode.root.y+22;
            }
                    
            //after mushroom has move to root, disable it/ destory it.
            }else{
                        
                //this.lightSource.destroy();
                this.scene.initSoundEffect('growSFX','1',0.05);

                this.curNode.root.growRoot();
                this.lightSource.visible = false;
                this.destroy();

            }
        }
        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //function to randomly move the mushroom from one location if the graph to another.
    moveMushroomRandom(){

        //generate a random number that represents a location in the outgoing node array.
        let randloc = Math.floor(Math.random() * (this.curNode.nodeArray.length ));
        console.log("randloc: ",randloc);

        //make node sprite visible
        this.curNode.visible = true;

        //change mushroom into transfer sprite system

        //store the new node in this object
        this.curNode = this.curNode.nodeArray[randloc];
        console.log("this.curNode: ",this.curNode);

        //move the mushroom to the new location
        this.movingToNewNode = true;
        this.lightSource.radius = 90;
        this.lightSource.intensity = 0.7;

        this.visible = false;
    }

    moveMushroomFollow(){

        //generate length on line from player and current node
        let shortestLineSegment = this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,this.x,this.y);
        let sameNode = true;
        let tempNodeRef = this.curNode;

        //check each adjacent node
        this.curNode.nodeArray.forEach(node =>{

            //if the line segment is closer  from one node and the player
            if(this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,node.x,node.y) < shortestLineSegment){
                //set the current closest length to the new one
                shortestLineSegment = this.calcLineSegment(this.scene.player1.x,this.scene.player1.y,node.x,node.y);
                //set the location node to the closer node.
                this.curNode = node;
                sameNode = false;
            }
  

        });

        //if we happen to be moving node then
        if(sameNode === false){
            //make previous node not visible
            tempNodeRef.visible = true;

            //move the mushroom to the new location by setting variable to triggler move logic in our move function. 
            this.movingToNewNode = true;
            this.lightSource.radius = 90;
            this.lightSource.intensity = 0.7;

            this.visible = false;

        }

        
        //console.log("this.curNode: ",this.curNode);

       
    }

    calcLineSegment(x1,y1,x2,y2){
       return Math.sqrt(Math.pow(x1 - x2 , 2) + Math.pow(y1 - y2 , 2));
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

        if(this.isHiding === false && this.inEmergingAnimation === false){

            //then play animation and go back to the hiding state.

            this.inEmergingAnimation = true;
            this.anims.play('becomeHidden').once('animationcomplete', () => {

                this.isHiding = true;
                this.inEmergingAnimation = false;
                this.anims.play('hiding',true);
                this.lightSource.radius = 90;
                this.lightSource.intensity = 0.7;
                    
            });
            this.setDepth(4);
        }
        

    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    enemyGameOver() {
        this.setSize(100, 150, true);
        this.setOffset(90, 150);
        this.anims.play('enemyGameOver', true);
    }

    //the grab function. is called when player has overlaped with an enemy enemy.
    grab(){ 
        let currentEnemy = this;
        //first checks if enemy object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

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
            if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
                
                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
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
    }

    //function handles the player struggle buttons
    playerIsNotDefeatedInputs(playerHealthObject){

        let currentEnemy = this;

            // important anims.play block so that the animation can player properly.

            if (this.scene.checkAPressed() === true) {
                console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                if (this.enemySize === 1 && playerHealthObject.playerHealth >= 1) {
                    this.struggleCounter += 25;
                    struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                    //console.log('strugglecounter: ' + this.struggleCounter);
                }
            }else if(this.scene.checkDPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
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

        // randomizing input
            if (this.keyAnimationPlayed === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }
        

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            setTimeout(function () {
                currentEnemy.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }

    }

    //function to handle player health loss.
    playerIsStrugglingLogic(playerHealthObject){

        let currentEnemy = this;

            this.playerDamageTimer = true;

            //if the players health is above half, then deal hp damage.
            if(playerHealthObject.playerHealth >= playerHealthObject.playerMaxHealth/2){

                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 2000);

            }else if(playerHealthObject.playerCurse <= (playerHealthObject.playerCurseMax)/2){
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 1500);
            }else{
                //case to stop the damage function from being applied if the 
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.curseBuildUp,2);
                }
    
                setTimeout(function () {
                    currentEnemy.playerDamageTimer = false;
                }, 1000);
            }
            
            // if the player has been defeated the do the following steps.

        // if its a small enemy then play the small enemy grab animation.
        

            //if the player isnt defeated.
            if(this.playerDefeated === false ){

                // check to make sure animations dont conflict with eachother.
                if (this.playerDefeatedAnimationStage === 0  ) {
                    this.anims.play("enemyGrab", true);
                    //handles sound effect diring grab struggle
                    this.playEnemySound('3',800);

                //if the defeated stage is incremented, then play the animation of the player falling. need to pause damage, as well as the player ability to struggle.
                }else if(this.playerDefeatedAnimationStage === 1 && this.animationPlayed === false){
                    this.animationPlayed = true;
                    this.anims.play("enemyGrabFallingDefeated", true).once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.playerDefeatedAnimationStage++;
                    });
                }else if(this.playerDefeatedAnimationStage === 3){
                    this.anims.play("enemyGrabDefeated2", true);
                    this.playPlapSound('plap10',2000);
                    
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisEnemy = this;
                        setTimeout(function () {
                            thisEnemy.onomatPlayed = false;
                            
                        }, 600);
                    }
                    
                }else if(this.playerDefeatedAnimationStage === 4){
                    this.anims.play('enemyGrabDefeated3', true);
                    this.playEnemySound('3',600);
                    this.playPlapSound('plap9',1000);
        
                    if (this.onomatPlayed === false) {
                        this.onomatPlayed = true;
                        let randX = Math.floor((Math.random() * 15));
                        let randY = Math.floor((Math.random() * 15));
        
                        this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+10,this.y-randY+30,'charBubble',"@heart@");
                        this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                        this.scene.heartOnomat1.setScale(1/4);
                        this.scene.heartOnomat1.textFadeOutAndDestroy(600);
        
                        let thisEnemy = this;
                        setTimeout(function () {
                            thisEnemy.onomatPlayed = false;
                            
                        }, 600);
                    }
                }

                //case to progress defeated stage, soo that we can have different struggle animations.
                //in this case, if the player health is less than half there max health and the stage is 0
                if(playerHealthObject.playerHealth < playerHealthObject.playerMaxHealth/2 && this.playerDefeatedAnimationStage === 0){
                    //increment the stage so behavior changes.
                    this.playerDefeatedAnimationStage++;
                }else if(playerHealthObject.playerCurse > (playerHealthObject.playerCurseMax)/2 && this.playerDefeatedAnimationStage === 3){
                    this.playerDefeatedAnimationStage++;
                }
            }
               
    }

    playerIsDefeatedLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the enemy.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

            this.scene.enemyThatDefeatedPlayer = "mushroom";

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
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 5 &&
                     this.playerDefeatedAnimationStage !== 6 &&
                      this.playerDefeatedAnimationStage !== 8) {

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
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {
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
                this.anims.play("enemyIdle", true);
                

                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(90, 65, true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.playerDefeatedAnimationStage = 0;

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
  
        if (this.damageCoolDown === false && this.isHiding === false) {
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

                    //hide mushroom and move it
                    this.anims.play('becomeHidden').once('animationcomplete', () => {

                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);

                        //make node sprite visible
                        this.curNode.visible = true;

                        this.movingToNewNode = true;
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.visible = false;
                 
                    });
                    
                }else if(this.isHiding === false && this.inEmergingAnimation === false){
                    
                    console.log("player is in range");
                    this.inEmergingAnimation = true;
                    //then play animation and go back to the hiding state.
                    this.anims.play('becomeHidden').once('animationcomplete', () => {

                        this.isHiding = true;
                        this.inEmergingAnimation = false;
                        this.anims.play('hiding',true);
                        this.lightSource.radius = 90;
                        this.lightSource.intensity = 0.7;

                        this.moveMushroomRandom();
                                
                    });
                    
                }

            //else if the mushroom has been defeated
            }

            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;

            setTimeout(function () {
                that.damageCoolDown = false;
                console.log("damage cool down:" + that.damageCoolDown);
                that.clearTint();
            }, 3000);
        }
    }

    //handles damage types for blue enemy. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice * 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt * 2);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 4);
        }
        if (heat > 0) {
            this.enemyHP -= (heat);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning / 4);
        }
        if (cold > 0) {
            this.enemyHP -= (cold );
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    // plays the enemy defeated player animations.
    enemyDefeatedPlayerAnimation() {
        let currentEnemy = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 2;

            if (!this.animationPlayed) {
                this.playEnemySound('2',800);
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('enemyGrabFallingDefeated').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('enemyGrabDefeated1', true);
            this.playEnemySound('2',800);

            let thisEnemy = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"BLORP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                setTimeout(function () {
                    thisEnemy.onomatPlayed = false;
                }, 800);
            }
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
                
                //handles sound effect diring grab struggle
                this.playEnemySound('3',800);
                

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
