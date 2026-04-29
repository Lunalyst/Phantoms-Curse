

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

        //leave a refrence to this npc version fo nectar so the enemy version can talk to it.
        this.scene.bossNectar = this;


        //this.grabType = "unbirth";

        this.fightStarted = false;
        this.fightDelay = false;
        
        this.attackTimer = false;
        this.attemptingAttack = false;

        this.attackState = 0;

        //jump attack bools
        this.preJump = false;
        this.nectarIsUp = false;
        this.nectarIsFalling = false;
        this.hasLanded = false;
        
        //have nectar move left or right on the way up of jump attack but then stop x movemento n way down.
    
        this.body.setGravityY(600); 

        this.setSize(350,350,true);
        this.setOffset(280, 390-158);

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
            
            this.anims.create({key: 'PEJumpUpFeather',frames: this.anims.generateFrameNames('nectar5', { start: 0, end: 2 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpDownFeather1',frames: this.anims.generateFrameNames('nectar5', { start: 3, end: 3 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpDownFeather2',frames: this.anims.generateFrameNames('nectar5', { start: 4, end: 23-18 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpLandStartFeather',frames: this.anims.generateFrameNames('nectar5', { start: 24-18, end: 26-18 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'PEJumpLandEndFeather',frames: this.anims.generateFrameNames('nectar5', { start: 27-18, end: 29-18 }),frameRate: 7,repeat: 0});

            /*if(sex === 0) {
                this.anims.create({ key: 'analStart', frames: this.anims.generateFrameNames('Matango-Root-M-2', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });

              
            }else{
                this.anims.create({ key: 'analStart', frames: this.anims.generateFrameNames('Matango-Root-M-10', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });
                
            }*/

        this.inSafeMode = inSafeMode;

        //nectar digestion timer graphic

        //this.digestionTimerValue = 0;
        this.digestionTimerValue = 34;
        this.digestionTimerAnimationPlayed = false;
        this.player1IsDigested = false;

        this.spawnGameoverNpc = false;

        this.digestionTimer = this.scene.add.sprite((this.scene.screenWidth/2) + 60,250, "digestionTimerMale");
        this.digestionTimer.setScrollFactor(0);
        this.digestionTimer.setScale(1/3);
        this.digestionTimer.visible = false;
        this.digestionTimer.setDepth(9);

        if(sex === 0) {
            this.digestionTimer.anims.create({ key: 'stomachOpen', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 0, end: 3 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState1', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 4, end: 7 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState1-2', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 8, end: 8 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState2', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 9, end:12 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState2-3', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 13, end:13 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState3', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 14, end:17 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState3-4', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 18, end:18 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState4', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 19, end:22 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState4-5', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 23, end:23 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState5', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 24, end:27 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState5-6', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 28, end:28 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachState6', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 29, end:32 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachState6-Finish', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 33, end:36 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachStateFinish', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 37, end:40 }), frameRate: 6, repeat:-1 });
            this.digestionTimer.anims.create({ key: 'stomachStateFinishOpen', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 41, end:42 }), frameRate: 6, repeat: 0 });
            this.digestionTimer.anims.create({ key: 'stomachStateFinishOpenIdle', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 43, end:46 }), frameRate: 6, repeat: -1 });
            this.digestionTimer.anims.create({ key: 'stomachStateFinishClose', frames: this.anims.generateFrameNames('digestionTimerMale', { start: 47, end:49 }), frameRate: 6, repeat: 0 });
     
     
        }else{
     
        }
        

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

    move(){

        this.digestionTimer.flipX = this.flipX;

        this.body.setGravityY(600);
        //idea, check to see if play isnt in dialogue. if so then hide npc version show this one and do boss stuff.
        if (this.enemyHP > 0 && this.player1IsDigested === false) {

        //if we havent started the fight and the player is free from dialogue then set up the fight
        if(this.scene.pausedInTextBox === false && this.fightStarted === false && this.fightDelay === false){
            this.fightDelay = true;
            
            let temp = this;
            setTimeout(function(){
                temp.fightStarted = true; 
            },2000);

            //set up player barries for the fight
            this.scene.setUpPlayerBarriers();
            this.leftBarrier = this.scene.initPlayerBarrier(1716,728-30,38,540);
            this.rightBarrier = this.scene.initPlayerBarrier(2600,728-30,38,540);

            this.digestionTimer.visible = true;
            this.digestionTimer.anims.play('stomachOpen').once('animationcomplete', () => {
                this.digestionTimer.anims.play('stomachState1');
            });

            this.anims.play('sideIdle',true);

            this.scene.initSoundEffect('bossSFX','bossStart',0.1);

            this.scene.isPaused = false;

            this.visible = true;

            this.scene.npcNectar.visible = false;

            let healthObject = {
                bossName: "Nectar",
                bossHealth: this.enemyHP-7,
                bossMaxHealth: this.enemyHP,
            };

            this.enemyHP-7

            this.bossMaxHealth = this.enemyHP;

            healthEmitter.emit(healthEvent.setBossHealth,healthObject);
            healthEmitter.emit(healthEvent.setBossHealthVisible,true);

        }else if(this.fightStarted === true){

        //console.log("testing nectar main combat ai.");
        if (this.attackState === 0) {

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

                this.nectarBorderCheck();

            }else if(this.checkXRangeFromPlayer2(132, 132) || this.attackTimer === true || this.attemptingAttack === true) {

                this.setVelocityX(0);
                //console.log("nectar attack logic");

                if(this.attackTimer === false && this.checkYRangeFromPlayer2(132, 132)){

                    this.attackTimer = true;
                   

                    if(this.scene.player2.x > this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    } 

                    this.scene.initSoundEffect('weaponSFX','medium',0.1);
              
                    this.anims.play('PESwipeStart').once('animationcomplete', () => {
                    
                        this.hitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingAttack = true;

                        if(this.flipX === true){
                            this.attackHitBoxPositionActive(this.x+115,this.y+30);
                        }else{
                            this.attackHitBoxPositionActive(this.x-115,this.y+30);
                        } 
                        
                        this.attackHitBox.setSize(70, 120, true);

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        this.setDepth(7);
                        this.anims.play('PESwipeMiddle').once('animationcomplete', () => {

                             this.hitboxActive = false;
                            this.attemptingAttack = false;
                                
                            this.anims.play('PESwipeEnd').once('animationcomplete', () => {
                                this.setDepth(5);

                                this.isPlayingMissedAnims = false;  

                                this.anims.play('sideIdle',true);

                                let tempBoss = this;
                                setTimeout(function () {
                                    tempBoss.attackTimer = false;
                                    tempBoss.nectarStateController();

                                }, 1000);
                               
                            });
                        });
                    }
                }

            }else if(this.checkXRangeFromPlayer2(2000, 2000) && this.attackTimer === false && this.attemptingAttack === false) {

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
        }else if(this.attackState === 1){

            if(this.checkXRangeFromPlayer2(132, 132) || this.preJump === true) {

                //console.log("this.preJump",this.preJump ,"this.nectarIsUp: ",this.nectarIsUp, " this.nectarIsFalling: ",this.nectarIsFalling, " this.hasLanded: ",this.hasLanded);

                if(this.nectarIsUp === true && this.nectarIsFalling === false){
                    if(this.scene.player2.x < this.x){
                        this.setVelocityX(100 * -1);
                    }else{
                        this.setVelocityX(100 * 1);
                    }
                }

                if(this.preJump === false && this.nectarIsUp === false){

                    this.preJump = true;
                    this.setVelocityX(0);

                    //play animation fo her going up
                    this.anims.play('PEJumpUp').once('animationcomplete', () => {
                    // set velocity of y to haver her jump
                    this.setVelocityY(400*-1);
                    this.nectarIsUp = true;

                    });

                //once she begins to fall, play animation where she is falling
                }else if(this.nectarIsFalling === false && this.enemyPreviousY > this.y && this.nectarIsUp === true){
                    this.nectarIsFalling = true;

                    

                    //play animation fo her going up
                    this.anims.play('PEJumpDown').once('animationcomplete', () => {
                    });

                    // after animation finishes let logic know she has landed so do the attack.


                }else if(this.nectarIsFalling === true && this.hasLanded === false){

                    if(this.body.blocked.down){
                        this.hasLanded = true;

                    }

                }else if(this.attackTimer === false && this.hasLanded === true){

                    this.attackTimer = true;
                    //this.setDepth(7);
                    this.setVelocityX(0);
                    this.scene.initSoundEffect('bossSFX','explosion',0.06);

                    this.attackHitBoxPositionActive(this.x-2,this.y+95);
                    this.attackHitBox.setSize(130, 40, true);
                    this.hitboxActive = true;
                    this.attackHitBox.body.enable = true;

                    this.anims.play('PEJumpLandStart').once('animationcomplete', () => {
                    
                        
                        this.attemptingAttack = true;

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation

                        this.hitboxActive = false;
                        this.attemptingAttack = false;
                        this.anims.play('PEJumpLandEnd').once('animationcomplete', () => {

                            //this.setDepth(5);

                            this.isPlayingMissedAnims = false;  

                            this.anims.play('sideIdle',true);

                            if(this.scene.player2.x > this.x){
                                this.flipX = true;
                            }else{
                                this.flipX = false;
                            } 

                            let tempBoss = this;
                            setTimeout(function () {
                                //jump attack bools
                                tempBoss.preJump = false;
                                tempBoss.nectarIsUp = false;
                                tempBoss.nectarIsFalling = false;
                                tempBoss.hasLanded = false;
                                tempBoss.attackTimer = false;

                                tempBoss.nectarStateController();

                            }, 1000);
                               
  
                        });
                    }
                }

            }else if(this.checkXRangeFromPlayer2(2000, 2000) && this.preJump === false) {

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

        }else if(this.attackState === 2){

            //IF THE PLAYER IS TOO CLOSE MOVE NECTAR AWAY FROM THEM.
            if(this.checkXRangeFromPlayer2(212, 212) && this.attackTimer === false && this.attemptingAttack === false ) {
                console.log("nectar is too clsoe moving her in better position");
                
                if(this.scene.player2.x > this.x){
                    this.setVelocityX(200 * -1);
                    this.flipX = false;
                }else{
                    this.setVelocityX(200 * 1);
                    this.flipX = true;
                } 

                this.anims.play('sideWalk',true);

                 this.nectarBorderCheck();
                

            }else if(this.checkXRangeFromPlayer2(232, 232) || this.attackTimer === true || this.attemptingAttack === true) {

                this.setVelocityX(0);
                //console.log("nectar attack logic");

                if(this.attackTimer === false && this.checkYRangeFromPlayer2(132, 132)){

                    this.attackTimer = true;
                   

                    if(this.scene.player2.x > this.x){
                        this.flipX = true;  
                    }else{   
                        this.flipX = false;
                    } 

                    this.scene.initSoundEffect('weaponSFX','medium',0.1);
              
                    this.anims.play('sideFeatherAtkStart').once('animationcomplete', () => {
                    
                        this.hitboxActive = true;
                        this.attemptingAttack = true;

                        if(this.scene.player2.x > this.x){
                            this.scene.initNectarProjectile(this.x+40,this.y+40,300,100,(2*3.14)/3);
                            this.scene.initNectarProjectile(this.x+30,this.y+30,260,150,(3*3.14)/4);
                            this.scene.initNectarProjectile(this.x+20,this.y+20,220,200,(5*3.14)/6);
                           
                        }else{
                            this.scene.initNectarProjectile(this.x-40,this.y+40,-300,100,-(2*3.14)/3);
                            this.scene.initNectarProjectile(this.x-30,this.y+30,-260,150,-(3*3.14)/4);
                            this.scene.initNectarProjectile(this.x-20,this.y+20,-220,200,-(5*3.14)/6);
                        } 

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        this.setDepth(7);
                        this.anims.play('sideFeatherAtkMiddle').once('animationcomplete', () => {

                            this.hitboxActive = false;
                            this.attemptingAttack = false;
                                
                            this.anims.play('sideFeatherAtkEnd').once('animationcomplete', () => {
                                this.setDepth(5);

                                this.isPlayingMissedAnims = false;  

                                this.anims.play('sideIdle',true);

                                let tempBoss = this;
                                setTimeout(function () {
                                    tempBoss.attackTimer = false;
                                    tempBoss.nectarStateController();

                                }, 1000);
                               
                            });
                        });
                    }
                }

            }else if(this.checkXRangeFromPlayer2(2000, 2000) && this.attackTimer === false && this.attemptingAttack === false) {

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
        }else if(this.attackState === 3){

            if(this.checkXRangeFromPlayer2(132, 132) || this.preJump === true) {

                //console.log("this.preJump",this.preJump ,"this.nectarIsUp: ",this.nectarIsUp, " this.nectarIsFalling: ",this.nectarIsFalling, " this.hasLanded: ",this.hasLanded);

                if(this.nectarIsUp === true && this.nectarIsFalling === false){
                    if(this.scene.player2.x < this.x){
                        this.setVelocityX(100 * -1);
                    }else{
                        this.setVelocityX(100 * 1);
                    }
                }

                if(this.preJump === false && this.nectarIsUp === false){

                    this.preJump = true;
                    this.setVelocityX(0);

                    //play animation fo her going up
                    this.anims.play('PEJumpUpFeather').once('animationcomplete', () => {
                    // set velocity of y to haver her jump
                    this.setVelocityY(400*-1);
                    this.nectarIsUp = true;

                    });

                //once she begins to fall, play animation where she is falling
                }else if(this.nectarIsFalling === false && this.enemyPreviousY > this.y && this.nectarIsUp === true){
                    this.nectarIsFalling = true;

                    

                    //play animation fo her going up
                    this.scene.initSoundEffect('weaponSFX','medium',0.1);
                    this.anims.play('PEJumpDownFeather1').once('animationcomplete', () => {

                        this.scene.initNectarProjectile(this.x+60,this.y+0,300,100,(2*3.14)/3);
                        this.scene.initNectarProjectile(this.x+50,this.y+10,260,150,(3*3.14)/4);
                        this.scene.initNectarProjectile(this.x+40,this.y+20,220,200,(5*3.14)/6);
            
                        this.scene.initNectarProjectile(this.x-60,this.y+0,-300,100,-(2*3.14)/3);
                        this.scene.initNectarProjectile(this.x-50,this.y+10,-260,150,-(3*3.14)/4);
                        this.scene.initNectarProjectile(this.x-40,this.y+20,-220,200,-(5*3.14)/6);
                        this.anims.play('PEJumpDownFeather2').once('animationcomplete', () => {

                        });
                    });

                    // after animation finishes let logic know she has landed so do the attack.


                }else if(this.nectarIsFalling === true && this.hasLanded === false){

                    if(this.body.blocked.down){
                        this.hasLanded = true;

                    }

                }else if(this.attackTimer === false && this.hasLanded === true){

                    this.attackTimer = true;
                    //this.setDepth(7);
                    this.setVelocityX(0);
                    this.scene.initSoundEffect('bossSFX','explosion',0.06);

                    this.attackHitBoxPositionActive(this.x-2,this.y+95);
                    this.attackHitBox.setSize(130, 40, true);
                    this.hitboxActive = true;
                    this.attackHitBox.body.enable = true;

                    this.anims.play('PEJumpLandStartFeather').once('animationcomplete', () => {
                    
                        this.hitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingAttack = true;

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation

                        this.hitboxActive = false;
                        this.attemptingAttack = false;
                        this.anims.play('PEJumpLandEndFeather').once('animationcomplete', () => {

                            //this.setDepth(5);

                            this.isPlayingMissedAnims = false;  

                            this.anims.play('sideIdle',true);

                            if(this.scene.player2.x > this.x){
                                this.flipX = true;
                            }else{
                                this.flipX = false;
                            } 

                            let tempBoss = this;
                            setTimeout(function () {
                                //jump attack bools
                                tempBoss.preJump = false;
                                tempBoss.nectarIsUp = false;
                                tempBoss.nectarIsFalling = false;
                                tempBoss.hasLanded = false;
                                tempBoss.attackTimer = false;

                                tempBoss.nectarStateController();

                            }, 1000);
                               
                        });
                    }
                }

            }else if(this.checkXRangeFromPlayer2(2000, 2000) && this.preJump === false) {

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

        }else if(this.attackState === 4){

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

                this.nectarBorderCheck();

            }else if(this.checkXRangeFromPlayer2(132, 132) || this.attackTimer === true || this.attemptingAttack === true) {

                this.setVelocityX(0);
                //console.log("nectar attack logic");

                if(this.attackTimer === false && this.checkYRangeFromPlayer2(132, 132)){

                    this.attackTimer = true;
                   

                    if(this.scene.player2.x > this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    } 

                    this.scene.initSoundEffect('weaponSFX','medium',0.1);

                    this.anims.play('PESwipeStart').once('animationcomplete', () => {

                        if(this.scene.player2.x > this.x){
                            this.scene.initNectarClawProjectile(this.x+150,this.y+35,0,0,true);
                        }else{
                            this.scene.initNectarClawProjectile(this.x-150,this.y+35,0,0,false);
                        } 
                    
                        this.hitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingAttack = true;

                        if(this.flipX === true){
                            this.attackHitBoxPositionActive(this.x+115,this.y+30);
                        }else{
                            this.attackHitBoxPositionActive(this.x-115,this.y+30);
                        } 
                        
                        this.attackHitBox.setSize(70, 120, true);

                    });

                }else if(this.attemptingAttack === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        this.setDepth(7);
                        this.anims.play('PESwipeMiddle').once('animationcomplete', () => {

                             this.hitboxActive = false;
                            this.attemptingAttack = false;
                                
                            this.anims.play('PESwipeEnd').once('animationcomplete', () => {
                                this.setDepth(5);

                                this.isPlayingMissedAnims = false;  

                                this.anims.play('sideIdle',true);

                                let tempBoss = this;
                                setTimeout(function () {
                                    tempBoss.attackTimer = false;
                                    tempBoss.nectarStateController();

                                }, 1000);
                               
                            });
                        });
                    }
                }

            }else if(this.checkXRangeFromPlayer2(2000, 2000) && this.attackTimer === false && this.attemptingAttack === false) {

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

       
        }else if(this.player1IsDigested === true &&  this.spawnGameoverNpc === false && this.body.blocked.down){

            console.log("now setting nectare gameover digested player npc!")
            this.spawnGameoverNpc = true;
            this.scene.npcNectar.npcType = "digestedPlayer";
            this.scene.npcNectar.visible = true;

            this.setVelocityX(0);

            this.scene.npcNectar.triggerNpcFinished = false;
            this.scene.npcNectar.x = this.x;
            this.scene.npcNectar.y = 672.5;
            this.scene.npcNectar.setNectarToDigestPlayer();

            this.visible = false;

            //destroy player barriers
            this.leftBarrier.destroy();
            this.rightBarrier.destroy();

            healthEmitter.emit(healthEvent.setBossHealthVisible,false);
            
        }

     //handles hit box positioning
    if(this.hitboxActive === true){


    }else{
        this.attackHitBox.x = this.x;
        this.attackHitBox.y = this.y + 3000; 
    }
    

    //updates the previous y value to tell if beenectar is falling or going up in its jump.
    this.enemyPreviousY = this.y;

    }

    nectarStateController(){

        //handle digestion timer
        this.digestionTimerValue++;
        console.log("this.digestionTimerValue: ",this.digestionTimerValue);
        console.log("this.attackState: ",this.attackState);

        //random stomach sound every other increment.
        if(this.digestionTimerValue % 2 !== 0){
            this.scene.initSoundEffect('stomachSFX','17',0.1);
        }

        if(this.digestionTimerValue === 12-6){
            this.scene.initSoundEffect('stomachSFX','6',0.1);
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState1-2').once('animationcomplete', () => {
                    this.digestionTimer.anims.play('stomachState2');
                    this.digestionTimerAnimationPlayed = false;
                });
            }
            
        }else if(this.digestionTimerValue === 22-6){
            this.scene.initSoundEffect('stomachSFX','8',0.1);
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState2-3').once('animationcomplete', () => {
                    this.digestionTimer.anims.play('stomachState3');
                    this.digestionTimerAnimationPlayed = false;
                });
            }

        }else if(this.digestionTimerValue === 30-6){
            this.scene.initSoundEffect('stomachSFX','11',0.1);
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState3-4').once('animationcomplete', () => {
                    this.digestionTimer.anims.play('stomachState4');
                    this.digestionTimerAnimationPlayed = false;
                });
            }
        }else if(this.digestionTimerValue === 36-6){
            this.scene.initSoundEffect('stomachSFX','13',0.1);
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState4-5').once('animationcomplete', () => {
                    this.digestionTimer.anims.play('stomachState5');
                    this.digestionTimerAnimationPlayed = false;
                });
            }
        }else if(this.digestionTimerValue === 40-6){
             this.scene.initSoundEffect('stomachSFX','5',0.1);
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState5-6').once('animationcomplete', () => {
                    this.digestionTimer.anims.play('stomachState6');
                    this.digestionTimerAnimationPlayed = false;
                });
            }
        }else if(this.digestionTimerValue === 42-6){
            if(this.digestionTimerAnimationPlayed === false){
                this.digestionTimerAnimationPlayed = true;
                this.digestionTimer.anims.play('stomachState6-Finish').once('animationcomplete', () => {
                    this.scene.initSoundEffect('stomachSFX','1',0.1);
                    this.digestionTimer.anims.play('stomachStateFinish',true)
                        this.scene.initSoundEffect('stomachSFX','18',0.1);
                        this.digestionTimerAnimationPlayed = false;
                        this.player1IsDigested = true;
                        
                
                });
            }
        }

        // handle attack pattern based on hp range
        if(this.digestionTimerValue < 42-6){

            if(this.enemyHP > (this.bossMaxHealth/3) * 2){

            this.attackState = Math.floor(Math.random() * 2);
            this.attackState = 1;

            }else if(this.enemyHP > this.bossMaxHealth/2){

                this.attackState = Math.floor(Math.random() * 3);

            }else{
                this.attackState = Math.floor(Math.random() * 5);

                if(this.attackState === 1){
                    this.attackState = 3;
                }
            }

            //but if the player has bee digested, then stop attack paterning.
        }else{
            this.attackState === null;
        }
        
        
    }

    nectarBorderCheck(){
        // if nectar is to the right and too close to the border of the arena
        if(this.x > 2641-100 || this.x < 1716+100){
            console.log("nectar too close to right border of the arena now fixing")
            this.attackState = 1;
        }
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

        console.log("damaging nectar! ");
  
        if (this.damageCoolDown === false) {
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
                    //this.scene.sound.get("battleMyceliumSFX").stop();
                    //this.scene.initLoopingSound('slowMyceliumSFX','theme', 0.1,"music");
                
                    this.enemyDefeated = true;

                    //this.scene.initSoundEffect('bossRoarSFX','defeat',0.1);

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
            }, 250);
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
