

//implementation for the blue enemy enemy.
class nectarBoss extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
    
        super(scene, xPos, yPos+22, sex, id, 20, 'nectar1');
        this.enemySex = 1;

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.collision = 170;

        this.enemyHP = 200;
        this.enemyHPMax = 200;
        
        this.idleState = 0;

        this.startedFight = false;
        this.attackCooldown = false;

        //controls attacking.
        this.isAttacking = true;

        this.knockdownCheck = false;

        this.lastKeyPressed = "";

        this.stopTemp = false;
        this.progressGameover = false;

        this.isPlayingMissedAnims = false;

        this.animationViewTransferValue = 0;

        //this.grabType = "unbirth";

        this.fightStarted = false;
        
        this.attackTimer = false;
        this.attemptingAttack = false;

        this.body.setGravityY(600); 

        this.setSize(350,350,true);
        this.setOffset(280, 390-152);

        this.visible = false;

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitBoxHide();

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitBoxHide();
              
            this.anims.create({key: 'PESwipeStart',frames: this.anims.generateFrameNames('nectar3', { start: 12, end: 14 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PESwipeMiddle',frames: this.anims.generateFrameNames('nectar3', { start: 15, end: 16 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PESwipeEnd',frames: this.anims.generateFrameNames('nectar3', { start: 17, end: 17 }),frameRate: 7,repeat: 0});

            this.anims.create({key: 'PEJumpUp',frames: this.anims.generateFrameNames('nectar3', { start: 18, end: 20 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpDown',frames: this.anims.generateFrameNames('nectar3', { start: 21, end: 23 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpLandStart',frames: this.anims.generateFrameNames('nectar3', { start: 24, end: 26 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpLandEnd',frames: this.anims.generateFrameNames('nectar3', { start: 27, end: 29 }),frameRate: 7,repeat: 0});

            this.anims.create({key: 'sideWalk',frames: this.anims.generateFrameNames('nectar4', { start: 0, end: 10 }),frameRate: 15,repeat: -1});
            this.anims.create({key: 'sideIdle',frames: this.anims.generateFrameNames('nectar4', { start: 11, end: 14}),frameRate: 7,repeat: -1});
            this.anims.create({key: 'sideFeatherAtkStart',frames: this.anims.generateFrameNames('nectar4', { start: 15, end: 17 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'sideFeatherAtkMiddle',frames: this.anims.generateFrameNames('nectar4', { start: 18, end: 18 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'sideFeatherAtkEnd',frames: this.anims.generateFrameNames('nectar4', { start: 19, end: 20 }),frameRate: 7,repeat: 0});

            this.anims.create({key: 'sideFeatherAtkEnd',frames: this.anims.generateFrameNames('nectar4', { start: 19, end: 20 }),frameRate: 7,repeat: 0});
      
            /*if(sex === 0) {
                this.anims.create({ key: 'analStart', frames: this.anims.generateFrameNames('Matango-Root-M-2', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });

              
            }else{
                this.anims.create({ key: 'analStart', frames: this.anims.generateFrameNames('Matango-Root-M-10', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });
                
            }*/

        this.inSafeMode = inSafeMode;

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is cursed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-20, 150, 0xb317ff);
            this.curseLight.intensity = 1.5;
            this.curseLight.visible = false;
        
        }

        if(this.inSafeMode === false){
            
        }else{
            
        }
        

    }

    //functions that move enemy objects.
     move(){

        //idea, check to see if play isnt in dialogue. if so then hide npc version show this one and do boss stuff.

        if (this.enemyHP > 0) {

        //if we havent started the fight and the player is free from dialogue then set up the fight
        if(this.scene.pausedInTextBox === false && this.fightStarted === false){

            this.fightStarted = true; 

            this.scene.initSoundEffect('bossSFX','bossStart',0.1);

            this.visible = true;

            this.scene.npcNectar.visible = false;

            let healthObject = {
                bossName: "Nectar",
                bossHealth: this.enemyHP,
                bossMaxHealth: this.enemyHP,
            };

            healthEmitter.emit(healthEvent.setBossHealth,healthObject);
            healthEmitter.emit(healthEvent.setBossHealthVisible,true);
        }else{
        //console.log("testing nectar main combat ai.");
        if (this.checkXRangeFromPlayer2(700, 700) && this.checkYRangeFromPlayer2(200,100)) {

            //IF THE PLAYER IS TOO CLOSE MOVE NECTAR AWAY FROM THEM.
            if(this.checkXRangeFromPlayer2(112, 112) && this.attackTimer === false && this.attemptingAttack === false ) {
                console.log("nectar is too clsoe moving her in better position");
                if(this.scene.player2.x > this.x){
                    this.setVelocityX(200 * -1);
                    this.flipX = false;
                }else{
                    this.setVelocityX(200 * 1);
                    this.flipX = true;
                } 

                this.anims.play('sideWalk',true);


            }else if(this.checkXRangeFromPlayer2(132, 132) || this.attackTimer === true || this.attemptingAttack === true) {
                this.nectarMove = false;
                this.setVelocityX(0);
                console.log("nectar attack logic");

                if(this.attackTimer === false && this.checkYRangeFromPlayer2(132, 132)){

                    this.attackTimer = true;
                    this.setDepth(7);

                    if(this.scene.player2.x > this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    } 

                    this.anims.play('PESwipeStart').once('animationcomplete', () => {
                    
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingAttack = true;

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.anims.play('PESwipeMiddle').once('animationcomplete', () => {

                             this.hitboxActive = false;
                            this.attemptingAttack = false;
                                
                            this.anims.play('PESwipeEnd').once('animationcomplete', () => {
                                this.setDepth(5);

                                this.isPlayingMissedAnims = false;  
                                this.attackTimer = false;
                            });
                        });
                    }
                }else if(!this.checkYRangeFromPlayer2(132, 132) && !this.attackTimer === true && !this.attemptingAttack === true){
                    this.anims.play('sideIdle',true);
                    this.setVelocityX(0);

                }

            }else if(this.checkXRangeFromPlayer2(700, 700) && this.attackTimer === false && this.attemptingAttack === false) {

                console.log("nectar too far away. this.scene.player2.x: ",this.scene.player2.x ,"this.x",);
               if(this.scene.player2.x > this.x){
                    this.setVelocityX(200 * 1);
                    this.flipX = true;
                }else{
                    this.setVelocityX(200 * -1);
                    this.flipX = false;
                } 

                this.anims.play('sideWalk',true);
            }

            let currentSlime = this;
        }

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

        

        //updates the previous y value to tell if beenectar is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {
        this.anims.play('sideIdle',true);
        this.setVelocityX(0);
    }

    resetVariables(){
        
        //console.log("reseting boss veriables 44444444444444444444444444444444444444444444")
        this.flipX = false;
        this.struggleFree = false;
        this.playerBrokeFree = 0;
        this.turning = false;
        this.knockdownCheck = false;

        this.handAnimationLockout = false;

        this.isAttacking = false;

        this.struggleCounter = 0;
        this.animationPlayed = false;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.keyAnimationPlayed = false;
        this.scene.player2.visible = true;
        this.isPlayingMissedAnims = false;
        this.attackTimer = false;

        this.startedGrab = false;
        this.playerDefeatedAnimationStage = 0;
        this.struggleAnimationInterupt = false;
        this.spitUp = false;

        this.scene.player2.mainHitbox.x = this.x;
        ///this.scene.player2.y = this.y;
        this.scene.grabbed = false;
        this.scene.KeyDisplay.visible = false;

        this.scene.player2.lightSource.visible = true;
    }

    //the grab function. is called when player has overlaped with an enemy enemy.
    grab(){ 
        let currentEnemy = this;
        //first checks if enemy object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.scene.attackHitBox.y = this.scene.player2.y + 10000;
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

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //puts the key display in the correct location.
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 96;

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
            if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && playerHealthObject.playerHealth > 0 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic(playerHealthObject);

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
                
                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax || playerHealthObject.playerHealth === 0){

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

    //function handles the player struggle buttons
    playerIsNotDefeatedInputs(playerHealthObject){

        if(this.grabType === "unbirth"){
            this.playerIsNotDefeatedInputsUnbirth(playerHealthObject);
        }else if(this.grabType === "absorb"){
            this.playerIsNotDefeatedInputsAbsorb(playerHealthObject);
        }else if(this.grabType === "oral"){
            this.playerIsNotDefeatedInputsOral(playerHealthObject);
        }else if(this.grabType === "anal"){
            this.playerIsNotDefeatedInputsAnal(playerHealthObject);
        }else if(this.grabType === "cock"){
            this.playerIsNotDefeatedInputsCock(playerHealthObject);
        }
      
    }

    //function to handle player health loss.
    playerIsStrugglingLogic(playerHealthObject){

        if(this.grabType === "unbirth"){
            this.playerIsStrugglingLogicUnbirth(playerHealthObject);
        }else if(this.grabType === "absorb"){
            this.playerIsStrugglingLogicAbsorb(playerHealthObject);
        }else if(this.grabType === "oral"){
            this.playerIsStrugglingLogicOral(playerHealthObject);
        }else if(this.grabType === "anal"){
            this.playerIsStrugglingLogicAnal(playerHealthObject);
        }else if(this.grabType === "cock"){
            this.playerIsStrugglingLogicCock(playerHealthObject);
        }
               
    }

    playerIsDefeatedLogic(){
        if(this.grabType === "unbirth"){
            this.playerIsDefeatedLogicUnbirth();
        }else if(this.grabType === "absorb"){
            this.playerIsDefeatedLogicAbsorb();
        }else if(this.grabType === "oral"){
            this.playerIsDefeatedLogicOral();
        }else if(this.grabType === "anal"){
            this.playerIsDefeatedLogicAnal();
        }else if(this.grabType === "cock"){
            this.playerIsDefeatedLogicCock();
        }
    }

    playerEscaped(playerHealthObject){

        if(this.grabType === "unbirth"){
            this.playerEscapedUnbirth(playerHealthObject);
        }else if(this.grabType === "absorb"){
            this.playerEscapedAbsorb(playerHealthObject);
        }else if(this.grabType === "oral"){
            this.playerEscapedOral(playerHealthObject);
        }else if(this.grabType === "anal"){
            this.playerEscapedAnal(playerHealthObject);
        }else if(this.grabType === "cock"){
            this.playerEscapedCock(playerHealthObject);
        }
    }

    // controls the damage resistance of the enemy.
    damage(refrence) {
  
        if (this.damageCoolDown === false && this.poppedOut === true && refrence.type !== 'sporeCloud') {
            this.damageCoolDown = true;
            this.playJumpySound('3',100);
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
                
                //if the enemys hp is at zero
                if (this.enemyHP <= 0) {

                    //STOP MUSIC
                    this.scene.sound.get("battleMyceliumSFX").stop();
                    this.scene.initLoopingSound('slowMyceliumSFX','theme', 0.1,"music");

                    //MAKE HANDS DISSAPEAR
                    this.rightHand.anims.play('handSink').once('animationcomplete', () => {
                        this.rightHand.visible = false;
                        this.rightHand.curseLight.visible = false;
                    });
                    this.leftHand.anims.play('handSink').once('animationcomplete', () => {
                        this.leftHand.visible = false;
                        this.leftHand.curseLight.visible = false;
                    });

                    //play secret text?
                    let temp = this;
                    setTimeout(function(){

                        temp.form1 = new makeEcrus(temp.scene,temp.x-230, temp.y+150,"@00011@ @10101@ @01@ @1011@ @11010@ @100@ @01@ @1011@ @1111@ @00001@ @100@ @01@ @10101@ @1100@ @00000@ @01@ @10100@ @100@ @11100@ @00100@ @1111@ @00010@ @100@ @01@ @00101@ @11010@ @11100@ @1011@ @01@ @1111@ @110110@ @01@ @11101@ @1100@ @1111@ @0011@ @11101@ @01@ @1100@ @0011@ @110111@");
                        temp.form1.setScale(0.4);
                        temp.form1.setAlpha(0.6);
                        temp.form1.textFadeIn(4000);
                        temp.form1.textWave();
                        temp.form1.textWob();

                        setTimeout(function(){
                            temp.form1.textFadeOutAndDestroy(1000);

                            setTimeout(function(){

                                temp.form2 = new makeEcrus(temp.scene,temp.x-110, temp.y+150,"@11110@ @110@ @01@ @11100@ @0011@ @101@ @101@ @01@ @11101@ @100@ @01@ @110@ @000@ @000@ @01@ @101@ @11111@ @110@ @100@ @0010@");
                                temp.form2.setScale(0.4);
                                temp.form2.setAlpha(0.6);
                                temp.form2.textFadeIn(4000);
                                temp.form2.textWave();
                                temp.form2.textWob();

                                setTimeout(function(){
                                    temp.form2.textFadeOutAndDestroy(1000);
                                },6000);

                            },2000);

                        },7000);
        
                    },10000);
                    
     
                    this.enemyDefeated = true;

                    this.scene.initSoundEffect('bossRoarSFX','defeat',0.1);

                    //play boss defeated animation
                    this.anims.play('rawr').once('animationcomplete', () => {

                        healthEmitter.emit(healthEvent.setBossHealthVisible,false);

                        this.anims.play('bossDefeated').once('animationcomplete', () => {

                            this.curseLight.visible = false;
                            this.visible = false;

                            this.rootNode.visible = true;
                            this.rootNode.curseLight.visible = true;
                            this.rootNode.anims.play("root1",true);

                            //drop health upgrade
                            //creates health upgrade object in level
                            this.scene.initHealthUpgrade(this.x, this.y, 'healthUpgradenectarBoss');

                            //drop new weapon
                            let object = {
                                flagToFind: "obtained_conidia_caster",
                                foundFlag: false,
                            };
                
                            // call the emitter to check if the value already was picked up.
                            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

                            if(object.foundFlag === false){
                                //create a temp variable to hold our item that is passed to the player
                            let item = oneTimeItemArray.obtained_conidia_caster;

                            //used to tell if the item was added
                            let addedToInventory = {
                                added: false
                            };

                            //emitter to add object to inventory.
                            inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);
                    
                            //now to add the flag to the player data so the player cant open this container multiple times.
                            inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,object.flagToFind);

                            //show item drop like a chest
                            //spawn a special version on the item drop that floats out of the chest and hovers for a bit.
                            this.scene.initFakeItemDrop(this.x , this.y-15,25); 
                            }

                            this.rootNode.deactivateMushroomBarriers();


                        });


                    });
                

                    //remove colliders since we no longer need them.
                    this.removeColliders();
                    
                }

            //else if the mushroom has been defeated
            }

            console.log("damage cool down:" + this.damageCoolDown);
            let that = this;

            setTimeout(function () {
                that.damageCoolDown = false;
                console.log("damage cool down:" + that.damageCoolDown);
                that.clearTint();
            }, 500);
        }
    }

    //handles damage types for blue enemy. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        let prevHp = this.enemyHP;
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

        //update the boss hp bar
        healthEmitter.emit(healthEvent.loseBossHealth,prevHp-this.enemyHP);

    }

    //function to show off animation 
    animationGrab(){

        //console.log(' activating cat view grab logic');
        if(this.grabType === "unbirth"){
            this.animationGrabUnbirth();
        }else if(this.grabType === "absorb"){
            this.animationGrabAbsorb();
        }else if(this.grabType === "oral"){
            this.animationGrabOral();
        }else if(this.grabType === "anal"){
            this.animationGrabAnal();
        }else if(this.grabType === "cock"){
            this.animationGrabCock();
        }

    }
    
    
}
