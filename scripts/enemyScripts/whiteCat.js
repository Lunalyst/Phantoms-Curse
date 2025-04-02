

//implementation for the white cat enemy.
class whiteCat extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        //super(scene, xPos, yPos, sex, id, 20, 'whiteCat');
        //on set up, need to decide if bat is make or female, using preference variable in settings.

        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'whitecat-male-male-tf');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'whitecat-female-male-tf');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'whitecat-female-male-tf');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'whitecat-male-male-tf');
                this.enemySex = 0;
            }
        }

        // sets gravity 
        this.body.setGravityY(600); 

        //randomizes variables
        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;

        this.largecatDamageCounter = false;
        this.body.bounce.x = 1;

        this.catSoundCoolDown = false;

        this.catSoundsArray = ['1','2','3','4','5'];
        this.randomcatSound = Math.floor((Math.random() * 4));

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(30,10,true);
        this.hitboxActive = false;

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitboxActive = false;

        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;
        this.grabTimer = false;
        this.throwcatTimer = false;
        this.throwingcat = false;

        this.enemyHP = 70;

        this.angry = false;
        this.angryTransition = false;
        this.angerThreshold = 30;


        //console.log("this.enemySex: ",this.enemySex," sex ", sex);

        //defines cat animations based on the players sex.

        if (this.enemySex === 0) {

            //console.log("creating female cat animations");
            this.anims.create({ key: 'catIdle', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 0, end: 8 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'catMove', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 9, end: 18 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'catSideIdle', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 19, end: 22 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'catThrowStart', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 0, end: 4 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catThrowEnd', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 5, end: 8 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'catAttemptingGrabStart', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 19+3, end: 22+3 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catAttemptingGrabMiss', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 23+3, end: 25+3 }), frameRate: 8, repeat: 0 });

            this.anims.create({ key: 'catAngryidle', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 0, end: 8 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catAngryidleViewer', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 0, end: 8 }), frameRate: 8, repeat: -1});
            this.anims.create({ key: 'catAngryMove', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 9, end: 18 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'catAngryMoveSlow', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 9, end: 18 }), frameRate: 5, repeat: -1 });

            this.anims.create({ key: 'catAttackStart', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 20, end: 23 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catAttackEnd', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 24, end: 26 }), frameRate: 8, repeat: 0 });

            if(sex === 0 ){
                this.anims.create({ key: 'catGrabStart', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 26+3, end: 31+3 }), frameRate: 8, repeat: 0 }); 
                this.anims.create({ key: 'catGrab', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 32+3, end: 41+3 }), frameRate: 8, repeat: -1 }); 
                this.anims.create({ key: 'catDefeatedPlayer', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 45, end: 49 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeated1', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 50, end: 53 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeated2', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 53, end: 56 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeated3', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 57, end: 64 }), frameRate: 5, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeated4', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 65, end: 68 }), frameRate: 8, repeat: -1 });
    
                this.anims.create({ key: 'catGameoverTF', frames: this.anims.generateFrameNames('whitecat-male-male-tf', { start: 69, end: 72 }), frameRate: 5, repeat: -1 });

                this.anims.create({ key: 'catBeginFaceSit', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 27, end: 31 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'catFaceSit', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 32, end: 35 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catDefeatedPlayerVore', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 36, end: 41 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeatedVore1', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 42, end: 45 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeatedVore2', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 46, end: 58 }), frameRate: 8, repeat: 0 });
                    

            }else{
                this.anims.create({ key: 'catGrabStart', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 26+3-29, end: 31+3-29 }), frameRate: 8, repeat: 0 }); 
                this.anims.create({ key: 'catGrab', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 32+3-29, end: 41+3-29 }), frameRate: 8, repeat: -1 }); 
                this.anims.create({ key: 'catDefeatedPlayer', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 45-29, end: 49-29 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeated1', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 50-29, end: 53-29 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeated2', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 53-29, end: 56-29 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeated3', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 57-29, end: 64-29 }), frameRate: 5, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeated4', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 65-29, end: 68-29 }), frameRate: 8, repeat: -1 });
    
                this.anims.create({ key: 'catGameoverTF', frames: this.anims.generateFrameNames('whitecat-male-female-tf', { start: 69-29, end: 72-29 }), frameRate: 5, repeat: -1 });

                this.anims.create({ key: 'catBeginFaceSit', frames: this.anims.generateFrameNames('whitecat-male-female-vore', { start: 27-27, end: 31-27 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'catFaceSit', frames: this.anims.generateFrameNames('whitecat-male-female-vore', { start: 32-27, end: 35-27 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catDefeatedPlayerVore', frames: this.anims.generateFrameNames('whitecat-male-female-vore', { start: 36-27, end: 41-27 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeatedVore1', frames: this.anims.generateFrameNames('whitecat-male-female-vore', { start: 42-27, end: 45-27 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeatedVore2', frames: this.anims.generateFrameNames('whitecat-male-female-vore', { start: 46-27, end: 58-27 }), frameRate: 8, repeat: 0 });
                    
            }

            this.anims.create({ key: 'catGrabDefeatedVore3', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 59, end: 62 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'catGrabDefeatedVore4', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 63, end: 75 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catGrabDefeatedVore5', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 75, end: 80 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catGrabDefeatedVore6', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 81, end: 84 }), frameRate: 8, repeat: 1 });
            this.anims.create({ key: 'catGrabDefeatedVore7', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 85, end: 96 }), frameRate: 8, repeat: 0 });  
            this.anims.create({ key: 'catGrabDefeatedVore8', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 97, end: 109 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'catGrabDefeatedVore9', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 110, end: 115 }), frameRate: 8, repeat: -1 }); 

            this.anims.create({ key: 'catGameoverVore', frames: this.anims.generateFrameNames('whitecat-male-male-vore', { start: 116, end: 121 }), frameRate: 7, repeat: -1 });

            
            } else {
                //console.log("creating female cat animations");
                this.anims.create({ key: 'catIdle', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 0, end: 8 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catMove', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 9, end: 18 }), frameRate: 10, repeat: -1 });
                this.anims.create({ key: 'catSideIdle', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 19, end: 22 }), frameRate: 8, repeat: -1 });

                this.anims.create({ key: 'catThrowStart', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 0, end: 4 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catThrowEnd', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 5, end: 8 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'catAttemptingGrabStart', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 19+3, end: 22+3 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catAttemptingGrabMiss', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 23+3, end: 25+3 }), frameRate: 8, repeat: 0 });

                this.anims.create({ key: 'catAngryidle', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 0, end: 8 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catAngryidleViewer', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 0, end: 8 }), frameRate: 8, repeat: -1});
                this.anims.create({ key: 'catAngryMove', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 9, end: 18 }), frameRate: 10, repeat: -1 });
                this.anims.create({ key: 'catAngryMoveSlow', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 9, end: 18 }), frameRate: 5, repeat: -1 });

                this.anims.create({ key: 'catAttackStart', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 20, end: 23 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catAttackEnd', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 24, end: 26 }), frameRate: 8, repeat: 0 });

                if(sex === 0 ){

                    this.anims.create({ key: 'catGrabStart', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 26+3, end: 31+3 }), frameRate: 8, repeat: 0 }); 
                    this.anims.create({ key: 'catGrab', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 32+3, end: 41+3 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'catDefeatedPlayer', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 42+3, end: 48+3 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeated1', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 49+3, end: 52+3 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeated2', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 53+3, end: 56+3 }), frameRate: 12, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeated3', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 57+3, end: 63+3 }), frameRate: 6, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeated4', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 64+3, end: 67+3 }), frameRate: 5, repeat: -1 });

                    this.anims.create({ key: 'catGameoverTF', frames: this.anims.generateFrameNames('whitecat-female-male-tf', { start: 68+3, end: 71+3 }), frameRate: 5, repeat: -1 });

                    this.anims.create({ key: 'catBeginFaceSit', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 27, end: 31 }), frameRate: 8, repeat: 0 });

                    this.anims.create({ key: 'catFaceSit', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 32, end: 35 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catDefeatedPlayerVore', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 36, end: 41 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeatedVore1', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 42, end: 45 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeatedVore2', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 46, end: 58 }), frameRate: 8, repeat: 0 });
                    

                    
                }else{
                    this.anims.create({ key: 'catGrabStart', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 26+3-29, end: 31+3-29 }), frameRate: 8, repeat: 0 }); 
                    this.anims.create({ key: 'catGrab', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 32+3-29, end: 41+3-29 }), frameRate: 8, repeat: -1 }); 
                    this.anims.create({ key: 'catDefeatedPlayer', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 42+3-29, end: 48+3-29 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeated1', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 49+3-29, end: 52+3-29 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeated2', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 53+3-29, end: 56+3-29 }), frameRate: 12, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeated3', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 57+3-29, end: 63+3-29 }), frameRate: 6, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeated4', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 64+3-29, end: 67+3-29 }), frameRate: 5, repeat: -1 });

                    this.anims.create({ key: 'catGameoverTF', frames: this.anims.generateFrameNames('whitecat-female-female-tf', { start: 68+3-29, end: 71+3-29 }), frameRate: 5, repeat: -1 });

                    this.anims.create({ key: 'catBeginFaceSit', frames: this.anims.generateFrameNames('whitecat-female-female-vore', { start: 27-27, end: 31-27 }), frameRate: 8, repeat: 0 });

                    this.anims.create({ key: 'catFaceSit', frames: this.anims.generateFrameNames('whitecat-female-female-vore', { start: 32-27, end: 35-27 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catDefeatedPlayerVore', frames: this.anims.generateFrameNames('whitecat-female-female-vore', { start: 36-27, end: 41-27 }), frameRate: 8, repeat: 0 });
                    this.anims.create({ key: 'catGrabDefeatedVore1', frames: this.anims.generateFrameNames('whitecat-female-female-vore', { start: 42-27, end: 45-27 }), frameRate: 8, repeat: -1 });
                    this.anims.create({ key: 'catGrabDefeatedVore2', frames: this.anims.generateFrameNames('whitecat-female-female-vore', { start: 46-27, end: 58-27 }), frameRate: 8, repeat: 0 });
                    

                }

                this.anims.create({ key: 'catGrabDefeatedVore3', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 59, end: 62 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'catGrabDefeatedVore4', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 63, end: 75 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeatedVore5', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 75, end: 80 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeatedVore6', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 81, end: 84 }), frameRate: 8, repeat: 1 });
                this.anims.create({ key: 'catGrabDefeatedVore7', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 85, end: 96 }), frameRate: 8, repeat: 0 });  
                this.anims.create({ key: 'catGrabDefeatedVore8', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 97, end: 109 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'catGrabDefeatedVore9', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 110, end: 115 }), frameRate: 8, repeat: -1 }); 

                this.anims.create({ key: 'catGameoverVore', frames: this.anims.generateFrameNames('whitecat-female-male-vore', { start: 116, end: 121 }), frameRate: 7, repeat: -1 });

            }

        this.inSafeMode = inSafeMode;

        if(this.inSafeMode === true){
           this.anims.play("catSideIdle",true); 
        }

        this.setSize(90, 100, true);
        this.setOffset(80, 180);

        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
          }


    }

    //functions that move cat objects.
    move() {  
        this.setSize(90, 100, true);
        this.setOffset(80, 180);

        this.body.setGravityY(600);

        //console.log("this.enemyHP: ",this.enemyHP," this.angry: ",this.angry );

        if(this.scene.player1.x > this.x - 400 && this.scene.player1.x < this.x + 400){  
            //checks to see if enemy is in range of player

                //console.log("this.attemptingGrab: ",this.attemptingGrab," this.grabTimer: ",this.grabTimer," this.throwingcat: ",this.throwingcat," this.throwcatTimer: ",this.throwcatTimer); 
            if(this.enemyHP > this.angerThreshold){
                if((this.scene.player1.x + 20 > this.x   && this.scene.player1.x - 20 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false) && this.throwingcat === false){
                        
                    //play animation
                    this.setVelocityX(0);
                    this.grabTimer = true;
                    this.throwingcat = false;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);
                    this.anims.play('catAttemptingGrabStart').once('animationcomplete', () => {
                        
                        this.playJumpySound('3',700);

                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                        //controls the x velocity when the bee ischarging to grab the player
                        
                    });

                }else if(this.attemptingGrab === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.anims.play('catAttemptingGrabMiss').once('animationcomplete', () => {
                            this.setDepth(5);
                            this.hitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;    
                        });
                    }
                }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat right");            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    
                    this.flipX = false;

                    //if we can throw cat
                    if(this.throwcatTimer === false && this.throwingcat === false){
                        this.throwingcat = true;
                        this.throwcatTimer = true;
                        this.setVelocityX(0);

                        let randomInput = Math.floor((Math.random() * 2));
                        randomInput++;
                        let randomHoridMoan = Math.floor((Math.random() * 100)+1);
                        if(randomHoridMoan === 69){
                            this.scene.initSoundEffect("whiteCatSFX","horribleMoan",0.3);
                        }else {
                            this.scene.initSoundEffect("whiteCatSFX",randomInput.toString(),0.1);
                        }
                       

                        console.log("randomInput: ",randomInput, "randomHoridMoan: ",randomHoridMoan);

                        //play starting animation
                        this.anims.play('catThrowStart').once('animationcomplete', () => {
                            
                            //spawn projectile
                            this.scene.initCursedHeartProjectile(this.x,this.y-20,70,this,this.direction);
                            //play finishing animation
                            this.anims.play('catThrowEnd').once('animationcomplete', () => {

                                this.throwingcat = false;
                                this.throwingcatTimer = true;
                                let tempcat = this;
                                setTimeout(function () {
                                    tempcat.throwcatTimer = false;
                                },Math.floor(Math.random() * (5000-1500) + 1500) );
 
                            });
   
                        });
                
                    }else{
                        this.anims.play('catMove', true);
                        this.setVelocityX(140); 
                    }
            
                //if the player is to the right then move enemy to the left
                }else if(this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    //if we can throw cat
                    if(this.throwcatTimer === false && this.throwingcat === false){
                        this.throwingcat = true;
                        this.throwcatTimer = true;
                        this.setVelocityX(0);

                        let randomInput = Math.floor((Math.random() * 2));
                        randomInput++;
                        let randomHoridMoan = Math.floor((Math.random() * 100)+1);
                        if(randomHoridMoan === 69){
                            this.scene.initSoundEffect("whiteCatSFX","horribleMoan",0.3);
                        }else {
                            this.scene.initSoundEffect("whiteCatSFX",randomInput.toString(),0.1);
                        }

                        console.log("randomInput: ",randomInput, "randomHoridMoan: ",randomHoridMoan);

                        //play starting animation
                        this.anims.play('catThrowStart').once('animationcomplete', () => {
                            
                            //spawn projectile
                            this.scene.initCursedHeartProjectile(this.x,this.y-20,70,this,this.direction);
                            //play finishing animation
                            this.anims.play('catThrowEnd').once('animationcomplete', () => {

                                this.throwingcat = false;
                                this.throwingcatTimer = true;
                                let tempcat = this;
                                setTimeout(function () {
                                    tempcat.throwcatTimer = false;
                                },Math.floor(Math.random() * (5000-1500) + 1500) );
 
                            });
   
                        });
                
                    }else{
                        this.anims.play('catMove', true);
                        this.setVelocityX(-140); 
                    }
                    
                //cases for when the player is above the cat on a ledge. pulls the cat away from a ledge so that the infatuated player can walk off the ledge to be grabbed.
                }else if(this.scene.player1.x < this.x  && this.scene.player1.y < this.y-40 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true){
                    console.log("cat below player who is on the left");
                    this.anims.play('catMove', true);
                    this.flipX = false;
                    this.setVelocityX(140); 

                //cases for when the player is above the cat on a ledge. pulls the cat away from a ledge so that the infatuated player can walk off the ledge to be grabbed.
                }else if(this.scene.player1.x > this.x && this.scene.player1.y < this.y-40 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true){
                    console.log("cat below player who is on the right");
                    this.anims.play('catMove', true);
                    this.flipX = true;
                    this.setVelocityX(-140); 

                //cases to have the enemy face the player when they are walking towards the enemy
                }else if(this.scene.player1.x < this.x  && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true){
                    console.log("cat below player who is on the left");
                    this.anims.play('catSideIdle', true);
                    this.flipX = true;
                    this.setVelocityX(0); 

                }else if(this.scene.player1.x > this.x  && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true){
                    console.log("cat below player who is on the right");
                    this.anims.play('catSideIdle', true);
                    this.flipX = false;
                    this.setVelocityX(0); 

                }else{
                    console.log("cat has lost the plot.")
                }
                
            //if the cats hp is below the threshold, then transition to angry ai.
            }else if(this.angry === false && this.enemyHP <= this.angerThreshold){
                this.setDepth(5);
                this.hitboxActive = false;
                this.attemptingGrab = false;
                this.grabTimer = false;
                this.isPlayingMissedAnims = false; 
                this.grabHitBox.x = this.x;
                this.grabHitBox.y = this.y + 3000; 
                this.hitboxActive = false;

                console.log("cat beginning enemy logic");
                if(this.animationPlayed === false){
                    this.animationPlayed = true;
                    this.scene.initSoundEffect("whiteCatSFX","sad",0.3);
                    this.angryTransition = true;

                    this.anims.play('catAngryidle').once('animationcomplete', () => {
                        console.log("cat now angry");
                        this.angryTransition = false;
                        this.angry = true;
                        this.animationPlayed = false;
                        this.hitboxActive = false;
                    });
                }
                
            //now that the animation has played use angry logic on this enemy from now on.
            }else if(this.angry === true){
                

                if((this.scene.player1.x + 30 > this.x   && this.scene.player1.x - 30 < this.x && (this.scene.player1.y > this.y - 30 && this.scene.player1.y < this.y + 30) && this.grabTimer === false) && this.throwingcat === false && this.scene.playerStuckGrab === false){
                    //play animation
                    this.setVelocityX(0);
                    this.grabTimer = true;
                    this.throwingcat = false;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);

                    this.scene.initSoundEffect('weaponSFX1','high1',0.1);
                    
                    this.anims.play('catAttackStart').once('animationcomplete', () => {
                        
                        //this.playJumpySound('3',700);

                        this.attackHitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingGrab = true;
                        
                    });

                }else if(this.attemptingGrab === true){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation
                        
                        this.anims.play('catAttackEnd').once('animationcomplete', () => {
                            this.setDepth(5);
                            this.attackHitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;    
                        });
                    }
                }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat right");            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('catAngryMove', true);
                    this.setVelocityX(140); 
                    
            
                //if the player is to the right then move enemy to the left
                }else if(this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('catAngryMove', true);
                    this.setVelocityX(-140); 
                    
                }else if(this.scene.player1.x > this.x+ 30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat right");            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('catAngryMoveSlow', true);
                    this.setVelocityX(70); 
                    
            
                //if the player is to the right then move enemy to the left
                }else if(this.scene.player1.x < this.x-30 && this.attemptingGrab === false && this.grabTimer === false && this.throwingcat === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('catAngryMoveSlow', true);
                    this.setVelocityX(-70); 
                
                //if the cat is above the knocked down player, then grab them
                }else if((this.scene.player1.x + 3 > this.x   && this.scene.player1.x - 3 < this.x && this.grabTimer === false) && this.throwingcat === false){
                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;

                        //alligns the orientation of the cat to the player.
                        this.flipX = this.scene.player1.flipX;
                }else{
                    console.log("cat has lost the plot.")
                }

            }
        }
        
        //handles hit box positioning
        if(this.hitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                console.log("moving cat hitbox to the left");
                this.grabHitBox.x = this.x-15;

            //otherwise put it to the right.
            }else{
                console.log("moving cat hitbox to the right");
                this.grabHitBox.x = this.x+15;
            }
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
            this.attackHitBox.y = this.y;

        }else{
            this.attackHitBox.x = this.x;
            this.attackHitBox.y = this.y + 3000; 
        }

        //updates the previous y value to tell if cat is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }


    //simple idle function played when the player is grabbed by something that isnt this cat.
    moveIdle() {
        //this.setSize(90, 65, true);
        //this.setOffset(105, 233);
        this.anims.play('catIdle',true);
        //console.log("cat not grabbed player");

        //this.setSize(90, 65, true);
        this.body.setGravityY(600);
        this.setVelocityX(0);
        this.attemptingGrab = false;
        this.grabTimer = false;
        this.isPlayingMissedAnims = false; 
        this.hitboxActive = false; 
        this.throwingcat = false;
        this.throwcatTimer = false;
        this.setDepth(5);

    }

    // functioned called to play animation when the player is defeated by the cat in gameover.
    gameOver(version) {

        this.setSize(90, 100, true);
        this.setOffset(80, 180);

        if(version === 1){
            this.anims.play('catGameoverVore', true);
        }else{
            this.anims.play('catGameoverTF', true);
        }
        
    }

    //the grab function. is called when player has overlaped with an enemy cat.
    grab(){
        let currentcat = this;
        //first checks if cat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;

        //console.log("this.playerGrabbed: ",this.playerGrabbed);

        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.catGrabFalse();

        }else if (this.playerGrabbed === true){
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
            this.catGrabTrue(playerHealthObject);

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
                
                if(this.angry === true){
                    //handle the defeated logic that plays defeated animations for vore
                   this.playerIsDefeatedLogicVore(playerHealthObject);
                }else{
                    //handle the defeated logic that plays defeated animations
                   this.playerIsDefeatedLogic(playerHealthObject);
                }
                
            }
            
        }

    }

    catGrabFalse(){
        //hide players actual body
        this.scene.player1.visible = false;
        // display key prompts
        this.scene.KeyDisplay.visible = true;

        //needed for the animation viewer
        if(this.animationPlayed === false && this.startAnimationPlayed === false){
            this.animationPlayed = true;
            if(this.angry === true){
                this.anims.play("catBeginFaceSit").once('animationcomplete', () => {
                    //play struggle animation afterward.
                    this.anims.play("catFaceSit", true);
                    this.startAnimationPlayed = true;
                    this.animationPlayed = false;
                });   
            }else{
                this.anims.play("catGrabStart").once('animationcomplete', () => {
                    //play struggle animation afterward.
                    this.anims.play("catGrab", true);
                    this.startAnimationPlayed = true;
                    this.animationPlayed = false;
                });   
            }
        }

    }

    catGrabTrue(playerHealthObject){

        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 70;

        //stops the player from moving away during a grab?
        this.scene.player1.mainHitbox.setVelocityX(0);

        //player the intro grab sequence
        if(this.animationPlayed === false && this.startAnimationPlayed === false){
            this.animationPlayed = true;
            if(this.angry === true){
                this.anims.play("catBeginFaceSit").once('animationcomplete', () => {
                    //play struggle animation afterward.
                    this.anims.play("catFaceSit", true);
                    this.startAnimationPlayed = true;
                    this.animationPlayed = false;
                });   
            }else{
                this.anims.play("catGrabStart").once('animationcomplete', () => {
                    //play struggle animation afterward.
                    this.anims.play("catGrab", true);
                    this.startAnimationPlayed = true;
                    this.animationPlayed = false;
                });   
            }
            
        }else if(this.startAnimationPlayed === true && playerHealthObject.playerHealth > 0){
            this.playJumpySound('3',700);
        }
        
        
        // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
        //console.log("playerHealthObject.playerHealth: ",playerHealthObject.playerHealth);
        if (this.playerDamaged === false && playerHealthObject.playerHealth > 0) {
            //hpBar.calcDamage(1);
            healthEmitter.emit(healthEvent.loseHealth,1)
            console.log('return value of health emitter: ', playerHealthObject.playerHealth);
            this.playerDamaged = true;
        }
    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.

        let currentcat = this;

        //randominputs change as the player trys to esacape.
        if(this.angry === true){
            if (this.randomInput === 0) {
                if (this.scene.checkWPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                    if (playerHealthObject.playerHealth >= 1) {
                        this.struggleCounter += 15;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                // if the player spams other keys, then subtract there project toprevent button mashing of other keys that are not the slected one.
                }else if(this.scene.checkDPressed() === true || this.scene.checkAPressed() === true || this.scene.checkSPressed() === true ){
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
            } else if (this.randomInput === 1 ) {
                // important anims.play block so that the animation can player properly.
                if (this.scene.checkSPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                    if (playerHealthObject.playerHealth >= 1) {
                        this.struggleCounter += 15;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                }else if(this.scene.checkAPressed() === true || this.scene.checkWPressed() === true || this.scene.checkDPressed() === true){
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
            }

        }else{
            if (this.randomInput === 0) {
                if (this.scene.checkAPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                    if (playerHealthObject.playerHealth >= 1) {
                        this.struggleCounter += 15;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                // if the player spams other keys, then subtract there project toprevent button mashing of other keys that are not the slected one.
                }else if(this.scene.checkDPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
                    if (playerHealthObject.playerHealth >= 1) {
    
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 2 > 0){
                            this.struggleCounter -= 2;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
    
                }
            } else if (this.randomInput === 1 ) {
                // important anims.play block so that the animation can player properly.
                if (this.scene.checkDPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                    if (playerHealthObject.playerHealth >= 1) {
                        this.struggleCounter += 15;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                }else if(this.scene.checkAPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true){
                    if (playerHealthObject.playerHealth >= 1) {
    
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 2 > 0){
                            this.struggleCounter -= 2;
                        }else{
                            this.struggleCounter = 0;
                        }
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
    
                }
            }

        }
        
        // randomizing input
        if (this.randomInputCooldown === false) {

            this.randomInputCooldown = true;
            this.randomInput = Math.floor((Math.random() * 2));
            console.log("randomizing the key prompt " + this.randomInput);
            // important anims.play block so that the animation can player properly.
            if(this.angry === true){
                if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                    console.log(" setting keyA display");
                    this.scene.KeyDisplay.playWKey();
                    this.keyAnimationPlayed = true;
                } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                    console.log(" setting keyD display");
                    this.scene.KeyDisplay.playSKey();
                    this.keyAnimationPlayed = true;
                }
            }else{
                if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                    console.log(" setting keyA display");
                    this.scene.KeyDisplay.playAKey();
                    this.keyAnimationPlayed = true;
                } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                    console.log(" setting keyD display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }
            }
            
            setTimeout(function () {
                currentcat.randomInputCooldown = false;
                // resets the animation block.
                currentcat.keyAnimationPlayed = false;
            }, 1500);
        } 
        

        // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
        // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
        if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
            // this case subtracts from the struggle free counter if the value is not pressed fast enough.
            this.struggleCounter--;
            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
            this.struggleCounterTick = true;
            // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
            setTimeout(function () {
                currentcat.struggleCounterTick = false;
            }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
        }

        //handles sound effect diring grab struggle
        //this.playcatSound('3',800);
    }

    playerIsStrugglingLogic(){

        let currentcat = this;

         if ( this.largecatDamageCounter === false ) {
            this.largecatDamageCounter = true;
            //hpBar.calcDamage(2);
            healthEmitter.emit(healthEvent.loseHealth,2)
            setTimeout(function () {
                currentcat.largecatDamageCounter = false;
            }, 2000);
            // if the player has been defeated the do the following steps.
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the cat.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
            if(this.enemySex === 0){
                this.scene.enemyThatDefeatedPlayer = "whiteCatMaleTF";
            }else{
                this.scene.enemyThatDefeatedPlayer = "whiteCatFemaleTF";
            }
            // if we start the player defeated animation then we need to set a few things.
            if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playDKey();
                let currentcat = this; // important, sets currentcat to the current object so that we can use variables attached to this current cat object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentcat.scene.KeyDisplay.visible = true;
                    currentcat.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentcat.playerDefeatedAnimationStage: " + currentcat.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

            //based on the enemys sex, play different animations. this one is for male enemys
        if(this.enemySex === 0){
            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === false &&
                   this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationStage !== 1 &&
                    this.playerDefeatedAnimationStage !== 4) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentcat = this;
                console.log("currentcat.playerDefeatedAnimationStage: " + currentcat.playerDefeatedAnimationStage);

                this.currentcat = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentcat.scene.KeyDisplay.visible = true;
                    currentcat.scene.KeyDisplay.playDKey();
                    currentcat.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }
            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            //function to play the defeated animation
            this.malecatDefeatedPlayerAnimation();
        }else{
            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === false &&
                  this.scene.KeyDisplay.visible === true &&
                  this.playerDefeatedAnimationStage !== 1 &&
                   this.playerDefeatedAnimationStage !== 4 ) {

               this.scene.KeyDisplay.visible = false;
               //this.stageTimer = 0;
               this.playerDefeatedAnimationCooldown = true;
               this.playerDefeatedAnimationStage++;
               let currentcat = this;
               console.log("currentcat.playerDefeatedAnimationStage: " + currentcat.playerDefeatedAnimationStage);

               this.currentcat = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
               setTimeout(function () {
                   console.log("defeated animation delay.");
                   currentcat.scene.KeyDisplay.visible = true;
                   currentcat.scene.KeyDisplay.playDKey();
                   currentcat.playerDefeatedAnimationCooldown = false;
               }, 3000);
           }
           // if tab is pressed or the player finished the defeated animations then we call the game over scene.
           if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkDIsDown())) {
               this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }

           //function to play the defeated animation
           this.femalecatDefeatedPlayerAnimation();
        }
        
    }

    playerEscaped(playerHealthObject){

        let currentcat = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                // handles the breaking free animation.
                if (!this.animationPlayed) {
                    this.animationPlayed = true;
                    //this.anims.play('catGrabBreak').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        currentcat.struggleFree = true;
                    //});
                }
                // if the player if freed do the following to reset the player.
            } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.anims.play("catIdle", true);
                
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.setSize(90, 65, true);
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                //resets initial grab animation var
                this.startAnimationPlayed = false;

                this.grabTimer = false;
                this.attemptingGrab = false;
                this.throwingcat = false;
                this.throwcatTimer = false;


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
                currentcat = this;
                setTimeout(function () {

                    currentcat.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    playerIsDefeatedLogicVore(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the cat.
            this.playerDefeated = true;
            skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
            if(this.enemySex === 0){
                this.scene.enemyThatDefeatedPlayer = "whiteCatMaleVore";
            }else{
                this.scene.enemyThatDefeatedPlayer = "whiteCatFemaleVore";
            }

            // if we start the player defeated animation then we need to set a few things.
            if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playDKey();
                let currentcat = this; // important, sets currentcat to the current object so that we can use variables attached to this current cat object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentcat.scene.KeyDisplay.visible = true;
                    currentcat.scene.KeyDisplay.playDKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                    console.log("currentcat.playerDefeatedAnimationStage: " + currentcat.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                this.playerDefeatedAnimationStage++;
                console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            }

        
            //may be able to set a bool to true or false to tell what animations have the key skip
            //that way we dont need tons of if checks for numbers
            if (this.scene.checkDIsDown() &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === false &&
                  this.scene.KeyDisplay.visible === true &&
                  this.playerDefeatedAnimationStage !== 1 &&
                   this.playerDefeatedAnimationStage !== 3 &&
                   this.playerDefeatedAnimationStage !== 6 &&
                   this.playerDefeatedAnimationStage !== 7 ) {

               this.scene.KeyDisplay.visible = false;
               //this.stageTimer = 0;
               this.playerDefeatedAnimationCooldown = true;
               this.playerDefeatedAnimationStage++;
               let currentcat = this;
               console.log("currentcat.playerDefeatedAnimationStage: " + currentcat.playerDefeatedAnimationStage);

               this.currentcat = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
               setTimeout(function () {
                   console.log("defeated animation delay.");
                   currentcat.scene.KeyDisplay.visible = true;
                   currentcat.scene.KeyDisplay.playDKey();
                   currentcat.playerDefeatedAnimationCooldown = false;
               }, 3000);
           }
           // if tab is pressed or the player finished the defeated animations then we call the game over scene.
           if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {
               this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }

           //function to play the defeated animation
           this.catDefeatedPlayerAnimationVore();
        
        
    }

    // controls the damage resistance of the cat.
    damage() {
        this.setVelocityX(0);
        if (this.damageCoolDown === false && this.angryTransition === false) {
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

                //this.playcatSound('5',200);
                
                if (this.enemyHP <= 0) {
                    this.destroy();
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
    //handles damage types for white cat. get these damage types from the attack that hits the enemy
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
            this.enemyHP -= (lightning / 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 4);
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    // plays the cat defeated player animations.
    malecatDefeatedPlayerAnimation() {
        //console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        
        let currentcat = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 5;

            if (!this.animationPlayed) {

                this.playPlapSound('plap4',800);

                this.animationPlayed = true;
                this.anims.play('catDefeatedPlayer').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    if(this.flipX === false){
                        this.scene.internalView = new internalView(this.scene,this.x+30,this.y+20,'whitecat')
                        this.scene.internalView.setRotation(3.14 - 3.14/5 );
                    }else{
                        this.scene.internalView = new internalView(this.scene,this.x-30,this.y+20,'whitecat')
                        this.scene.internalView.setRotation(3.14/5);
                    }
                    this.scene.internalView.anims.play("whitecatPening2",true);


                });
            }

        }else if(this.playerDefeatedAnimationStage === 2) {
            //this.playcatSound('5',800);

            this.playPlapSound('plap5',600);
            this.playJumpySound('3',600);

            let thiscat = this;
            if (this.onomatPlayed === false) {

                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                if(this.flipX === true){
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX-30,this.y-randY+13,'charBubble',"@heart@");
                
                }else{
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                
                }
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thiscat.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('catGrabDefeated1', true);
            
        
        }else if(this.playerDefeatedAnimationStage === 3) {

            this.playPlapSound('plap5',500);
            this.playJumpySound('3',500);

            this.scene.internalView.anims.play("whitecatPening3",true);

            let thiscat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                if(this.flipX === true){
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX-30,this.y-randY+13,'charBubble',"@heart@");
                
                }else{
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                
                }
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thiscat.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('catGrabDefeated2', true);
            
        }else if(this.playerDefeatedAnimationStage === 4) {

            if (!this.animationPlayed) {

                this.scene.initSoundEffect('curseSFX','curse',0.3);

                this.scene.internalView.anims.play("whitecatClimax").once('animationcomplete', () => {
                    this.scene.internalView.destroy();
                });

                this.animationPlayed = true;
                this.anims.play('catGrabDefeated3').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 5) {
            this.playJumpySound('3',700);
            this.anims.play('catGrabDefeated4', true);
        }
        

    }

    femalecatDefeatedPlayerAnimation() {
        //console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        
        let currentcat = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 5;

            if (!this.animationPlayed) {

                this.playPlapSound('plap4',800);

                this.animationPlayed = true;
                this.anims.play('catDefeatedPlayer').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLLORRRP!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.increaseRight(700);
                    this.scene.onomat.textFadeOutAndDestroy(1000);

                    if(this.scene.playerSex === 0){
                        if(this.flipX === false){
                            this.scene.internalView = new internalView(this.scene,this.x+30,this.y+50,'whitecat')
                            this.scene.internalView.setRotation(3.14/4);
                        }else{
                            this.scene.internalView = new internalView(this.scene,this.x-30,this.y+50,'whitecat')
                            this.scene.internalView.setRotation(3.14/4 + 3.14/2);
                        }
                        
                        this.scene.internalView.anims.play("pen1",true);
                        
                    }
                });
            }

        }else if(this.playerDefeatedAnimationStage === 2) {
            //this.playcatSound('5',800);

            this.playPlapSound('plap5',600);
            this.playJumpySound('3',600);

            let thiscat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                if(this.flipX === true){
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX-30,this.y-randY+13,'charBubble',"@heart@");
                
                }else{
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                
                }
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thiscat.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('catGrabDefeated1', true);
            
        
        }else if(this.playerDefeatedAnimationStage === 3) {

            this.playPlapSound('plap5',500);
            this.playJumpySound('3',500);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen2",true);
             }

            let thiscat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                if(this.flipX === true){
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX-30,this.y-randY+13,'charBubble',"@heart@");
                
                }else{
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                
                }
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thiscat.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('catGrabDefeated2', true);
            
        }else if(this.playerDefeatedAnimationStage === 4) {

            if (!this.animationPlayed) {

                this.scene.initSoundEffect('curseSFX','curse',0.3);

                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInWhitecat").once('animationcomplete', () => {
                        this.scene.internalView.destroy();
                    });
                 }

                this.animationPlayed = true;
                this.anims.play('catGrabDefeated3').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                   
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 5) {

            this.playJumpySound('3',700);
            this.anims.play('catGrabDefeated4', true);
        }
    }

    catDefeatedPlayerAnimationVore() {
        //console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        
        let currentcat = this;
        if (this.playerDefeatedAnimationStage === 1) {

            this.playerDefeatedAnimationStageMax = 8;

            if (!this.animationPlayed) {

                this.playPlapSound('plap4',800);

                this.animationPlayed = true;
                this.anims.play('catDefeatedPlayerVore').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    this.scene.onomat = new makeText(this.scene,this.x+10,this.y+20,'charBubble',"SLLORRRP!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.increaseRight(700);
                    this.scene.onomat.textFadeOutAndDestroy(1000);
                });
            }

        }else if(this.playerDefeatedAnimationStage === 2) {
            //this.playcatSound('5',800);

            this.playPlapSound('plap5',600);
            this.playJumpySound('3',600);

            let thiscat = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                if(this.flipX === true){
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX-20,this.y-randY+13,'charBubble',"@heart@");
                
                }else{
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+20,this.y-randY+13,'charBubble',"@heart@");
                
                }
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thiscat.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('catGrabDefeatedVore1', true);
            
        
        }else if(this.playerDefeatedAnimationStage === 3) {

            if (!this.animationPlayed) {

                this.animationPlayed = true;
                this.anims.play('catGrabDefeatedVore2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 4) {

            this.playJumpySound('3',700);
            this.anims.play('catGrabDefeatedVore3', true)
            
        }else if(this.playerDefeatedAnimationStage === 5) {

            //this.playJumpySound('3',700);

            //console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            let randomInt = Math.floor(Math.random() * 3);
            //console.log("randomInt", randomInt)
            if (!this.animationPlayed) {
               
                this.animationPlayed = true;
                if(randomInt === 0){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('catGrabDefeatedVore4').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;

                    });
                }else if(randomInt === 1){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+35,'charBubble',"GROAN...");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','8',0.1);
                    this.anims.play('catGrabDefeatedVore5').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });

                }else if(randomInt === 2){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+18,'charBubble',"GLORP");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textSquishLeft(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('catGrabDefeatedVore6').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }
                
            }
        }else if(this.playerDefeatedAnimationStage === 6) {

            if (!this.animationPlayed) {

                this.scene.initSoundEffect('stomachSFX','5',0.1);

                this.animationPlayed = true;
                this.anims.play('catGrabDefeatedVore7').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 7) {

            if (!this.animationPlayed) {

                this.scene.initSoundEffect('stomachSFX','2',0.1);
                this.playJumpySound('3',800);
                this.animationPlayed = true;
                this.anims.play('catGrabDefeatedVore8').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
            }
           
        }else if(this.playerDefeatedAnimationStage === 8) {

            this.playJumpySound('3',800);

            this.anims.play('catGrabDefeatedVore9', true)
            
        }
    }
    
    //plays cat sound based in type input being 1-5 and a time delay
    playcatSound(type,delay){
        if(this.catSoundCoolDown === false){
            //this.scene.initSoundEffect('bluecatSFX',type,0.3);
            this.catSoundCoolDown = true;
    
            let currentcat = this;
            setTimeout(function () {
                currentcat.catSoundCoolDown= false;
            }, delay);
        }

    }

    //function to show off animation 
    animationGrab(){
        console.log(' activating cat view grab logic');
        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.catGrabFalse();
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
        
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            this.scene.player1.y = this.y - 150;
            //this.scene.player1.body.setGravityY(0);
            //this.body.setGravityY(0);
            //puts the key display in the correct location.
            this.scene.KeyDisplay.visible = true;
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                this.playJumpySound('3',700);

            // handles input for progressing animation
            if (this.scene.checkDPressed() === true) {
                this.playerProgressingAnimation = true;
                }

                // displays inputs while in the first stage of the animation viewing.
                if (this.keyAnimationPlayed === false) {
                    //console.log(" setting keyW display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }      
            }

            if( this.playerProgressingAnimation === true){
                
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                    if(this.angry === true){
                        this.playerIsDefeatedLogicVore();
                    }else{
                        this.playerIsDefeatedLogic();
                    }
                    
                }else{
                    //hide the tab indicator and key prompts
                    skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,false);
                    this.scene.KeyDisplay.visible = false;    
                }
            }
        }
    }
    
    
}
