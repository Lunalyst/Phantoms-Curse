

//implementation for the blue enemy enemy.
class matangoRoot extends matangoRootUnbirth {
    
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
        this.isHiding = true;
        this.inEmergingAnimation = false;
        this.poppedOut = false;
        this.enemyHP = 200;
        this.enemyHPMax = 200;
        this.turning = false;
        this.idleState = 0;
        this.rootNode = null; 
        this.startedFight = false;
        this.attackCooldown = false;
        this.isAttacking = false;
        this.knockdownCheck = false;
        this.visible = false;


        this.grabType = "unbirth";


        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitBoxHide();

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitBoxHide();
        
        //defines Enemy animations based on the players sex.
        if (this.enemySex === 0) {

        }else{
            this.anims.create({ key: 'popout', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 0, end: 6 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'rawr', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 7, end: 15 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'forwardIdleEyesForward', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 16, end: 21 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'forwardIdleEyesDown', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 22, end: 27 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'forwardIdleEyesDownDreamView', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 22, end: 27 }), frameRate:  10, repeat: -1 });

            this.anims.create({ key: 'from0to1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 28, end: 29 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from1to0-1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 29, end: 29 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from1to0-2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 28, end: 28 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'AngleIdle', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 30, end: 35 }), frameRate: 10, repeat: 0 });
            this.anims.create({ key: 'AngleIdleLoop', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 30, end: 35 }), frameRate: 10, repeat: -1 });

            this.anims.create({ key: 'from1to2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 36, end: 37 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from2to1-1', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 37, end: 37 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'from2to1-2', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 36, end: 36 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'sideIdle', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 38, end: 43 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'sideIdleLoop', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 38, end: 43 }), frameRate:  10, repeat: -1 });

            this.anims.create({ key: 'sideThrustStart', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 45, end: 48 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'sideThrustMiddle', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 49, end: 50 }), frameRate:  10, repeat: 0 });
            this.anims.create({ key: 'sideThrustEnd', frames: this.anims.generateFrameNames('Matango-Root-F-1', { start: 51, end: 54 }), frameRate:  10, repeat: 0 });
                
            if (sex === 0) {
                this.anims.create({ key: 'unbirthStart', frames: this.anims.generateFrameNames('Matango-Root-F-2', { start: 0, end: 11 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'absorbStart', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 34, end: 40 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'absorbIdle', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 41, end: 46 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'absorbSideStruggle', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 0, end: 5 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'absorbGameover1', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 6, end: 16 }), frameRate: 10, repeat: 0 });
                this.anims.create({ key: 'absorbGameover2', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 17, end: 22 }), frameRate: 10, repeat: -1 });
                this.anims.create({ key: 'absorbGameover3', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 17, end: 22 }), frameRate: 15, repeat: -1 });
                this.anims.create({ key: 'absorbGameover4', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 23, end: 30 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'absorbGameover5', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 31, end: 36 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'absorbGameover6', frames: this.anims.generateFrameNames('Matango-Root-F-4', { start: 37, end: 42 }), frameRate: 7, repeat: 0 });
                
            }

            this.anims.create({ key: 'unbirthIdle', frames: this.anims.generateFrameNames('Matango-Root-F-2', { start: 13, end: 18 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'unbirthSideStruggle', frames: this.anims.generateFrameNames('Matango-Root-F-2', { start: 19, end: 24 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'unbirthDownStruggle', frames: this.anims.generateFrameNames('Matango-Root-F-2', { start: 25, end: 31 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'unbirthRelease', frames: this.anims.generateFrameNames('Matango-Root-F-2', { start: 32, end: 44 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'unbirthGameover1', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 0, end: 5 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'unbirthGameover2', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 6, end: 11 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'unbirthGameover3', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 12, end: 24 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'unbirthGameover4', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 24, end: 29 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'unbirthGameoverFinish', frames: this.anims.generateFrameNames('Matango-Root-F-3', { start: 30, end: 33 }), frameRate: 5, repeat: -1 });

            this.anims.create({ key: 'absorbGameover7', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 0, end: 5 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'absorbGameoverFinish', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 6, end: 11 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'upperSwipeStart', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 12, end: 15}), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'upperSwipeEnd', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 17, end: 19}), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'downSwipeEnd', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 20, end: 25}), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'flailStart', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 26, end: 26}), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'flailDown', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 27, end: 29}), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'flailUp', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 30, end: 31}), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'flailFull', frames: this.anims.generateFrameNames('Matango-Root-F-5', { start: 26, end: 31}), frameRate: 7, repeat: 1 });

        }
       
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

            this.rightHand = new mushroomHandSingle(this.scene,this.x+70, this.y+48, this.scene.playerSex,this.scene.enemyId, false,this);
            this.scene.enemyId++;
            this.scene.enemys.add(this.rightHand);
            this.scene.matangoRootHands.add(this.rightHand);

            let temp = this;
            let collider1 = this.scene.physics.add.overlap(this.scene.player1.mainHitbox, temp.rightHand.grabHitBox, function () {

              let isWindowObject = {
                isOpen: null
              };
            
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

              if (isWindowObject.isOpen === true) {
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,temp.scene);
                
              }

              if (temp.rightHand.grabCoolDown === false && temp.scene.grabCoolDown === false) {
                //stop the velocity of the player
                temp.scene.player1.mainHitbox.setVelocityX(0);
                //calls the grab function
                temp.rightHand.grab();
                //sets the scene grab value to true since the player has been grabbed
                // tells instance of slime that it has grabbed player
                temp.rightHand.grabCoolDown = true;
                temp.rightHand.playerGrabbed = true;
                temp.scene.grabbed = true;
                temp.scene.grabCoolDown = true;
                console.log('player grabbed by this.rightHand');
              }
          });
          this.rightHand.addColliderRef(collider1);

            this.leftHand = new mushroomHandSingle(this.scene,this.x-70, this.y+48,this.scene.playerSex,this.scene.enemyId, true,this);
            this.scene.enemyId++;
            this.scene.enemys.add(this.leftHand);
            this.scene.matangoRootHands.add(this.leftHand);

            collider1 = this.scene.physics.add.overlap(this.scene.player1.mainHitbox, temp.leftHand.grabHitBox, function () {

              let isWindowObject = {
                isOpen: null
              };
            
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

              if (isWindowObject.isOpen === true) {
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,temp.scene);
                
              }
            console.log('temp.leftHand.grabCoolDown: ', temp.leftHand.grabCoolDown, " temp.scene.grabCoolDown: ",temp.scene.grabCoolDown);
              if (temp.leftHand.grabCoolDown === false && temp.scene.grabCoolDown === false) {
                //stop the velocity of the player
                temp.scene.player1.mainHitbox.setVelocityX(0);
                //calls the grab function
                temp.leftHand.grab();
                //sets the scene grab value to true since the player has been grabbed
                // tells instance of slime that it has grabbed player
                temp.leftHand.grabCoolDown = true;
                temp.leftHand.playerGrabbed = true;
                temp.scene.grabbed = true;
                temp.scene.grabCoolDown = true;
                console.log('player grabbed by this.leftHand');
              }
          });
          this.leftHand.addColliderRef(collider1);

            this.centerHands = new mushroomHandDouble(this.scene,this.x, this.y+48, true);

        }else{
            this.visible = true;
            this.anims.play('forwardIdleEyesDownDreamView',true);
            this.curseLight.visible = true;
        }
        

    }

    //functions that move enemy objects.
    move(){
        //set hitbox to correct size
        this.setSize(240, 180, true);
        this.setOffset(220, 380);
        
        if(this.enemyDefeated === false){
            //if the mushroom has not awoken and the player in in range
            if(this.checkXRangeFromPlayer(100, 100) && this.checkYRangeFromPlayer(100,100) && this.startedFight === false){
                this.startedFight = true;
            //if its time to start the fight, then activate the mushroom
            }else if(this.poppedOut === false && this.inEmergingAnimation === false && this.startedFight === true){

                this.inEmergingAnimation = true;
                this.curseLight.visible = true;
                this.visible = true;

                //hide root node object
                this.rootNode.visible = false;
                this.rootNode.curseLight.visible = false;
                this.rootNode.activateMushroomBarriers();

                this.scene.initSoundEffect('growSFX','2',0.1);
                this.scene.sound.get("slowMyceliumSFX").stop();

                this.rightHand.handRise();
                this.leftHand.handRise();
    
                this.anims.play('popout').once('animationcomplete', () => {
                    
                    this.scene.initSoundEffect('bossRoarSFX','roar',0.1);

                    this.anims.play('rawr').once('animationcomplete', () => {

                        this.anims.play('forwardIdleEyesForward',true);
                        this.scene.initSoundEffect('bossSFX','bossStart',0.1);

                        //after animation of mushroom appearing we need to set up boss healthbar in the hud.
                        //start by setting boss hp name and making it visible.
                        let healthObject = {
                            bossName: "Matango Root",
                            bossHealth: this.enemyHP,
                            bossMaxHealth: this.enemyHP,
                        };

                        healthEmitter.emit(healthEvent.setBossHealth,healthObject);
                        healthEmitter.emit(healthEvent.setBossHealthVisible,true);
                        this.poppedOut = true;

                        //play boss theme after a half second
                        let mush = this;
                        setTimeout(function () {
                            mush.scene.initLoopingSound('battleMyceliumSFX','theme', 0.1,"music");
                        }, 500);

                        this.attackCooldown = true;

                        let temp = this;
                        setTimeout(function () {
                            temp.isAttacking = false;
                            temp.attackCooldown = false;
                        }, 2000);

                    });

                });
            //if the mushroom is poped out then do battle ai  
            }else if(this.poppedOut === true){
                console.log("this.turning: ",this.turning," this.attackCooldown: ",this.attackCooldown," this.isAttacking: ",this.isAttacking," this.knockdownCheck: ",this.knockdownCheck);
                //case where mushroom is not attacking
                if(this.turning === false && this.attackCooldown === true){
                    this.turning = true;

                    if(this.scene.player1.x > this.x){
                        this.flipX = true;
                    
                    }else{
                        this.flipX = false;
                    }
                    //first two checks represent state 0 for idle animation
                    if(this.checkXRangeFromPlayer(50, 50) && this.checkYRangeFromPlayer(50,60) ){

                        this.rightHand.anims.play('grabTell',true);
                        this.leftHand.anims.play('grabTell',true);
            
                        if(this.idleState === 0){
                            
                            this.anims.play('forwardIdleEyesDown',true).once('animationcomplete', () => {
                                this.turning = false;
                            });

                        }else if(this.idleState === 1){

                            this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                    this.idleState = 0;
                                    this.turning = false;
                                });
                            });
                            
                        }else if(this.idleState === 2){

                            this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                                this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                    this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                        this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                            this.idleState = 0;
                                            this.turning = false;
                                        });
                                    });
                                });
                            });
                        }
                    }else if(this.checkXRangeFromPlayer(50, 50) && this.checkYRangeFromPlayer(200,200)){

                        this.rightHand.anims.play('idle');
                        this.leftHand.anims.play('idle');
                        
                        if(this.idleState === 0){

                            this.anims.play('forwardIdleEyesForward',true).once('animationcomplete', () => {
                                this.turning = false;
                            });


                        }else if(this.idleState === 1){

                            this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                    this.idleState = 0;
                                    this.turning = false;
                                });
                            });
                            
                        }else if(this.idleState === 2){

                            this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                                this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                    this.anims.play('from1to0-1',true).once('animationcomplete', () => {
                                        this.anims.play('from1to0-2',true).once('animationcomplete', () => {
                                            this.idleState = 0;
                                            this.turning = false;
                                        });
                                    });
                                });
                            });
                        }

                    //state 1 resembles angled animation but we need to play turn animation first.
                    }else if(this.checkXRangeFromPlayer(120, 120)){

                        if(this.scene.player1.x > this.x){
                            this.rightHand.anims.play('grabTell',true);
                            this.leftHand.anims.play('idle',true);
                        }else{
                            this.leftHand.anims.play('grabTell',true);
                            this.rightHand.anims.play('idle',true);
                            
                        }

                        //if the previous state was zero then
                        if(this.idleState === 0){
                            //do turn animation from center to angle.
                            this.anims.play('from0to1',true).once('animationcomplete', () => {
                                this.idleState = 1;
                                this.turning = false;
                            });

                        }else if(this.idleState === 1){
                            this.anims.play('AngleIdle',true).once('animationcomplete', () => {
                                this.turning = false;
                            });
                        }else if(this.idleState === 2){
                            //do turn animation from center to angle.
                            this.anims.play('from2to1-1',true).once('animationcomplete', () => {
                                this.anims.play('from2to1-2',true).once('animationcomplete', () => {
                                    this.idleState = 1;
                                    this.turning = false;
                                });
                            });
                        }
                    //state 2
                    }else if(this.checkXRangeFromPlayer(400, 400)){

                        this.rightHand.anims.play('idle');
                        this.leftHand.anims.play('idle');

                        //if the previous state was zero then
                        if(this.idleState === 0){
                            //do turn animation from center to angle.
                            this.anims.play('from0to1',true).once('animationcomplete', () => {
                                this.anims.play('from1to2',true).once('animationcomplete', () => {
                                    this.idleState = 2;
                                    this.turning = false;
                                });
                            });

                        }else if(this.idleState === 1){

                            this.anims.play('from1to2',true).once('animationcomplete', () => {
                                this.idleState = 2;
                                this.turning = false;
                            });
                            
                        }else if(this.idleState === 2){
                            this.anims.play('sideIdle',true).once('animationcomplete', () => {
                                this.turning = false;
                            });
                        }
                    }

                //ai to have the mushroom perform attacks.
                }else if(this.turning === false && this.attackCooldown === false && this.isAttacking === false && this.scene.playerStuckGrabbedBy !== "knockdown"){  
                    if(this.checkXRangeFromPlayer(30, 30) && this.checkYRangeFromPlayer(50,60) ){

                        //roll a random number
                        let random = Math.floor((Math.random() * 3));

                        //check if boss is at hp threshold to do attack and random number matches
                        if(this.enemyHP < 200 && random === 2){

                        this.flailAttack();

                        }else{

                            //else do normal attack.
                            this.grabType = "absorb";

                            this.rightHand.visible = false;
                            this.leftHand.visible = false;
                            this.centerHands.visible = true;

                            this.isAttacking = true;
                            
                            this.anims.play('forwardIdleEyesDown',true).once('animationcomplete', () => {

                            });

                            this.centerHands.anims.play('centerHandGrabStart').once('animationcomplete', () => {

                                this.hitBoxPositionActive(this.x,this.y+45);
                                this.grabHitBox.setSize(90, 20, true);

                                this.centerHands.anims.play('centerHandGrabMiddle').once('animationcomplete', () => {

                                    this.hitBoxHide();

                                    this.isAttacking = true;

                                    if(this.playerGrabbed === false){
                                        this.centerHands.anims.play('centerHandGrabEnd').once('animationcomplete', () => {

                                            this.rightHand.visible = true;
                                            this.leftHand.visible = true;
                                            this.centerHands.visible = false;

                                            this.attackCooldown = true;
                                            this.isAttacking = false;

                                            let temp = this;
                                            setTimeout(function () {
                                                temp.attackCooldown = false;
                                            }, 1000);
                                        });
                                    }
                                });
                            });
                        }
                        
                
                    }else if(this.checkXRangeFromPlayer(80, 80) && this.checkYRangeFromPlayer(50,60) ){

                        //roll a random number
                        let random = Math.floor((Math.random() * 3));

                        //check if boss is at hp threshold to do attack and random number matches
                        if(this.enemyHP < 200 && random === 2){

                        this.flailAttack();
                        
                        }else{
                            this.grabType = "unbirth";

                            //if player to the left move the grab hitbox to the left
                            if(this.scene.player1.x > this.x){
                                this.flipX = true;
                                this.rightHand.anims.play('grabStart').once('animationcomplete', () => {
                                    this.rightHand.anims.play('grabEnd').once('animationcomplete', () => {
                                        this.rightHand.anims.play('idle');
                                    });
                                });
                            }else{
                                this.flipX = false;
                                this.leftHand.anims.play('grabStart').once('animationcomplete', () => {
                                    this.leftHand.anims.play('grabEnd').once('animationcomplete', () => {
                                        this.leftHand.anims.play('idle');
                                    });
                                });
                            }

                            this.isAttacking = true;

                            this.anims.play('sideThrustStart').once('animationcomplete', () => {
                                
                                this.playJumpySound('3',700);

                                this.grabHitBox.body.enable = true;

                                if(this.scene.player1.x > this.x){
                            
                                    this.hitBoxPositionActive(this.x+40,this.y+45);
                                    this.grabHitBox.setSize(50, 20, true);

                                }else{
                                    this.hitBoxPositionActive(this.x-40,this.y+45);
                                    this.grabHitBox.setSize(50, 20, true);

                                }

                                this.anims.play('sideThrustMiddle').once('animationcomplete', () => {

                                    this.hitBoxHide();

                                    this.anims.play('sideThrustEnd').once('animationcomplete', () => {

                                    this.attackCooldown = true;
                                    this.isAttacking = false;

                                    let temp = this;
                                    setTimeout(function () {
                                        temp.attackCooldown = false;
                                    }, 1000);

                                    });
                                });
                                
                            });
                        }

                    }else if(this.checkXRangeFromPlayer(150, 150) && this.checkYRangeFromPlayer(50,60) ){

                        this.isAttacking = true;

                        this.anims.play('AngleIdleLoop',true);
                        
                        //if player to the left move the grab hitbox to the left
                        if(this.scene.player1.x > this.x){
                            this.flipX = true;
                            this.rightHand.anims.play('knockdownstart').once('animationcomplete', () => {
                                this.knockdownDirection = true;
                                this.attackHitBoxPositionActive(this.x+105,this.y+45);
                                this.attackHitBox.setSize(70, 10, true);
                                this.rightHand.anims.play('knockdownMiddle').once('animationcomplete', () => {
                                    this.attackHitBoxHide();
                                    this.rightHand.anims.play('knockdownEnd').once('animationcomplete', () => {
                                        this.attackCooldown = true;
                                        this.isAttacking = false;

                                        let temp = this;
                                        setTimeout(function () {
                                            temp.attackCooldown = false;
                                        }, 1000);
                                    });
                                });
                            });
                        }else{
                            this.flipX = false;
                            this.leftHand.anims.play('knockdownstart').once('animationcomplete', () => {
                                this.knockdownDirection = false;
                                this.attackHitBoxPositionActive(this.x-105,this.y+45);
                                this.attackHitBox.setSize(70, 10, true);
                                this.leftHand.anims.play('knockdownMiddle').once('animationcomplete', () => {
                                    this.attackHitBoxHide();
                                    this.leftHand.anims.play('knockdownEnd').once('animationcomplete', () => {
                                        this.attackCooldown = true;
                                        this.isAttacking = false;

                                        let temp = this;
                                        setTimeout(function () {
                                            temp.attackCooldown = false;
                                        }, 1000);
                                    });
                                });
                            });
                        }

                    


                    }else{

                        this.isAttacking = true;

                        let temp = this;

                        if(this.scene.player1.x > this.x){
                            this.flipX = true;
                        }else{
                            this.flipX = false;
                        }

                        if(this.enemyHP > 170 ){
                            this.anims.play('upperSwipeStart').once('animationcomplete', () => {
                                if(this.scene.player1.x > this.x){
                                    this.scene.initSporeCloud(this.x,this.y+30,"left",80,5000);
                                    this.knockdownDirection = true;
                                    this.attackHitBoxPositionActive(this.x+45,this.y-30);
                                    this.attackHitBox.setSize(30, 60, true);
                                }else{
                                    this.scene.initSporeCloud(this.x,this.y+30,"right",80,5000);
                                    this.knockdownDirection = false;
                                    this.attackHitBoxPositionActive(this.x-45,this.y-30);
                                    this.attackHitBox.setSize(30, 60, true);
                                }
                                this.anims.play('upperSwipeEnd').once('animationcomplete', () => {
                                    this.attackHitBoxHide();
                                    this.attackCooldown = true;
                                    setTimeout(function () {
                                        temp.isAttacking = false;
                                        temp.attackCooldown = false;
                                    }, 2000);
                                });
                            });    
                        }else{

                            this.anims.play('upperSwipeStart').once('animationcomplete', () => {

                                if(this.scene.player1.x > this.x){
                                    this.scene.initSporeCloud(this.x,this.y+30,"left",130,5000);
                                    this.knockdownDirection = true;
                                    this.attackHitBoxPositionActive(this.x+45,this.y-30);
                                    this.attackHitBox.setSize(30, 60, true);
                                }else{
                                    this.scene.initSporeCloud(this.x,this.y+30,"right",130,5000);
                                    this.knockdownDirection = false;
                                    this.attackHitBoxPositionActive(this.x-45,this.y-30);
                                    this.attackHitBox.setSize(30, 60, true);
                                }

                                this.anims.play('upperSwipeEnd').once('animationcomplete', () => {

                                    if(this.knockdownDirection === true){
                                        this.scene.initSporeCloud(this.x,this.y-60,"left",80,5000);
                                    }else{
                                        this.scene.initSporeCloud(this.x,this.y-60,"right",80,5000);
                                    }

                                    this.anims.play('downSwipeEnd').once('animationcomplete', () => {

                                        this.attackHitBoxHide();
                                        this.attackCooldown = true;

                                        setTimeout(function () {
                                            temp.isAttacking = false;
                                            temp.attackCooldown = false;
                                        }, 1500);

                                    });    
                                });
                                
                            });    
                        }
                        

                        

                    }
                }else if(this.scene.playerStuckGrabbedBy === "knockdown" && this.knockdownCheck === false){
                    //ok so the plan
                    this.knockdownCheck = true;
                    //set a timeout to see if the player is knocked down.
                    let temp = this;

                    this.turning = false;

                    setTimeout(function(){

                        if(temp.scene.playerStuckGrabbedBy === "knockdown"){

                            //temp.isAttacking = true;
                            if(temp.scene.player1.x > temp.x){
                                temp.rightHand.anims.play('handSink').once('animationcomplete', () => { 
                                    if(temp.scene.playerStuckGrabbedBy === "knockdown"){
                                        temp.rightHand.x = temp.scene.player1.x;
                                        temp.rightHand.hitBoxPositionActive(temp.scene.player1.x,temp.scene.player1.y);
                                        temp.playerGrabbedByThisHand = "right";
                                    }else{
                                        temp.rightHand.handRise();
                                    }
                            });
                                //temp.rightHand.handRise();
                            }else{
                                temp.leftHand.anims.play('handSink').once('animationcomplete', () => { 
                                    if(temp.scene.playerStuckGrabbedBy === "knockdown"){
                                        temp.leftHand.x = temp.scene.player1.x;
                                        temp.leftHand.hitBoxPositionActive(temp.scene.player1.x,temp.scene.player1.y);
                                        temp.playerGrabbedByThisHand = "left";
                                    }else{
                                        temp.leftHand.handRise();
                                    }
                                });
                            //temp.leftHand.handRise();
                            }

                            console.log("player is still knocked down.");
                            //if so then send the correct hand to appear under the player and grab them.
                        }else{
                            console.log("player is not knocked down any more");
                        }
                    },2000);

                    //console.log("player currently in knockdown logic.");
                }else if(this.scene.playerStuckGrabbedBy !== "knockdown" && this.knockdownCheck === true ){

                    this.knockdownCheck = false;

                    if(this.playerGrabbedByThisHand === "right"){
                        this.rightHand.visible = true;
                        this.rightHand.curseLight.visible = true;
                        this.rightHand.anims.play('rise1').once('animationcomplete', () => {
                            this.rightHand.curseLight.intensity = 0.7;
                            this.rightHand.curseLight.radius = 90;
                            this.rightHand.curseLight.y = this.y+30
                            this.rightHand.anims.play('rise2').once('animationcomplete', () => {
                                this.rightHand.curseLight.intensity = 0.7;
                                this.rightHand.curseLight.radius = 120;
                                this.rightHand.curseLight.y = this.y+10
                                this.rightHand.anims.play('rise3').once('animationcomplete', () => {
        
                                    this.turning = false;
                                    this.attackCooldown = true;
                                    this.isAttacking = false;
                                    let temp = this;
                                    setTimeout(function () {
                                        temp.attackCooldown = false;
                                    }, 1000);
                                
                                });
                            });
                        });
                    }else{
                        this.leftHand.visible = true;
                        this.leftHand.curseLight.visible = true;
                        this.leftHand.anims.play('rise1').once('animationcomplete', () => {
                            this.leftHand.curseLight.intensity = 0.7;
                            this.leftHand.curseLight.radius = 90;
                            this.leftHand.curseLight.y = this.y+30
                            this.leftHand.anims.play('rise2').once('animationcomplete', () => {
                                this.leftHand.curseLight.intensity = 0.7;
                                this.leftHand.curseLight.radius = 120;
                                this.leftHand.curseLight.y = this.y+10
                                this.leftHand.anims.play('rise3').once('animationcomplete', () => {
        
                                    this.turning = false;
                                    this.attackCooldown = true;
                                    this.isAttacking = false;
                                    let temp = this;
                                    setTimeout(function () {
                                        temp.attackCooldown = false;
                                    }, 1000);
                                
                                });
                            });
                        });
                    }
                    
                }
                
            }
        }

        //updates the previous y value to tell if enemy is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    flailAttack(){
        this.isAttacking = true;

        this.anims.play('flailStart',true).once('animationcomplete', () => {
            this.anims.play('flailDown',true).once('animationcomplete', () => {
                this.scene.initSporeCloud(this.x,this.y,"still",80,1700);
                    this.anims.play('flailUp',true).once('animationcomplete', () => {
                        this.scene.initSporeCloud(this.x+20,this.y+20,"still",80,1700);
                        this.scene.initSporeCloud(this.x-20,this.y+20,"still",80,1700);

                        this.anims.play('flailFull',true).once('animationcomplete', () => {

                            this.attackCooldown = true;
                            this.isAttacking = false;
                            let temp = this;
                            setTimeout(function () {
                                temp.attackCooldown = false;
                            }, 1000);
                        });
                    });
                });
            });
    }

    

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {

        console.log("matango root idle move function");
        if(this.rightHand.returnedWithPlayerGrabbed === true){
            this.grabType = "unbirth";
            this.rightHand.playerTransferToRoot();
            //this.playerGrabbed = true
            this.grab();

        }else if(this.leftHand.returnedWithPlayerGrabbed === true){

            this.grabType = "unbirth";
            this.leftHand.playerTransferToRoot();
            //this.playerGrabbed = true
            this.grab();
        }

        if(this.checkXRangeFromPlayer(80, 80)){
            this.anims.play('forwardIdleEyesDownDreamView',true);
        }else if(this.checkXRangeFromPlayer(110, 110)){
            this.anims.play('AngleIdleLoop',true);
        }else{
            this.anims.play('sideIdleLoop',true);
        }


    }

    resetVariables(){
        
        //console.log("reseting boss veriables 44444444444444444444444444444444444444444444")
        this.flipX = false;
        this.struggleFree = false;
        this.playerBrokeFree = 0;
        this.turning = false;
        this.knockdownCheck = false;

        this.isAttacking = false;

        this.struggleCounter = 0;
        this.animationPlayed = false;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.keyAnimationPlayed = false;
        this.scene.player1.visible = true;
        this.isPlayingMissedAnims = false;
        this.grabTimer = false;

        this.startedGrab = false;
        this.playerDefeatedAnimationStage = 0;
        this.struggleAnimationInterupt = false;
        this.spitUp = false;

        this.scene.player1.mainHitbox.x = this.x;
        ///this.scene.player1.y = this.y;
        this.scene.grabbed = false;
        this.scene.KeyDisplay.visible = false;

        this.scene.player1.lightSource.visible = true;
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
        }
      
    }

    //function to handle player health loss.
    playerIsStrugglingLogic(playerHealthObject){

        if(this.grabType === "unbirth"){
            this.playerIsStrugglingLogicUnbirth(playerHealthObject);
        }else if(this.grabType === "absorb"){
            this.playerIsStrugglingLogicAbsorb(playerHealthObject);
        }
               
    }

    playerIsDefeatedLogic(){
        if(this.grabType === "unbirth"){
            this.playerIsDefeatedLogicUnbirth();
        }else if(this.grabType === "absorb"){
            this.playerIsDefeatedLogicAbsorb();
        }
    }

    playerEscaped(playerHealthObject){

        if(this.grabType === "unbirth"){
            this.playerEscapedUnbirth(playerHealthObject);
        }else if(this.grabType === "absorb"){
            this.playerEscapedAbsorb(playerHealthObject);
        }
    }

    // controls the damage resistance of the enemy.
    damage() {
  
        if (this.damageCoolDown === false && this.poppedOut === true) {
            this.damageCoolDown = true;
            this.playJumpySound('3',100);
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
                    this.enemyDefeated = true;

                    this.scene.initSoundEffect('bossRoarSFX','roar',0.1);

                    //play boss defeated animation
                    this.anims.play('rawr').once('animationcomplete', () => {

                        this.curseLight.visible = false;
                        this.visible = false;

                        //hide root node object
                        this.rootNode.visible = true;
                        this.rootNode.curseLight.visible = true;

                        healthEmitter.emit(healthEvent.setBossHealthVisible,false);

                        //drop health upgrade
                        //creates health upgrade object in level
                        this.scene.initHealthUpgrade(this.x, this.y, 'healthUpgradeMatangoRoot');
                        //drop new weapon

                        this.rootNode.deactivateMushroomBarriers();


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

        console.log(' activating cat view grab logic');
        if(this.grabType === "unbirth"){
            this.animationGrabUnbirth();
        }else if(this.grabType === "absorb"){
            this.animationGrabAbsorb();
        }
    }
    
    
}
