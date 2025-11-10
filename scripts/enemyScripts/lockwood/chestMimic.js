
//implementation for the chestMimic enemy.
class chestMimic extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode,soundSprite) {
        
        //on set up, need to decide if chestMimic is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos-12, sex, id, 20, 'chestMimicMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos-12, sex, id, 20, 'mimicFemale-evelyn-TF');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the chestMimic.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos-12, sex, id, 20, 'chestMimicFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos-12, sex, id, 20, 'chestMimicMale');
                this.enemySex = 0;
            }
        }

        // variables for movement
        this.chestMimicSoundCoolDown = false;
        this.chestMimicDamageCounter = false;
    
        this.grabTimer = false;
        this.hitboxActive = false;

        //make a hitbox so the bee can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(70,10,true);
        this.grabHitBox.body.enable = false;
        // sets the chestMimics hp value
        this.enemyHP = 25;

        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.containerKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.containerKeyPrompts.visible = false;
        this.keyPlayed = false;

        //defines a string containing telling the enemy which sound channel to use.
        this.chestMimicSFX = soundSprite;
        this.playingSound = false;

        this.hiding = true;
        this.attacked = false;
        this.attackedGrabPlayed = false;
        this.peeking = false;
        this.grabbing = false;
        this.angryGrabbedPosition = 1;
        this.angry = false;
        this.playerDefeated = false;

        
        //defines chestMimic animations based on the players sex.
        this.anims.create({ key: 'mimicChestJump', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 37, end: 45 }), frameRate: 7, repeat: 0 });
        if(this.enemySex === 0) {
            this.anims.create({ key: 'mimicHide', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicPeak', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 0, end: 13 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'mimicFrontGrabStart', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 14, end: 18 }), frameRate: 14, repeat: 0 });
            this.anims.create({ key: 'mimicFrontGrabMiss', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 19, end: 21 }), frameRate: 14, repeat: 0 });
            this.anims.create({ key: 'mimicFrontIdle', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 22, end: 25 }), frameRate: 7, repeat: -1 });
           
            this.anims.create({ key: 'mimicAngryIdle', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryIdleTwice', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start: 0, end: 3 }), frameRate: 12, repeat: 2 });
            this.anims.create({ key: 'mimicAngryLeft', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start: 4, end: 7 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryRight', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start: 8, end: 11 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryLeftGrabStart', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:12, end: 15 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'mimicAngryLeftGrabMiss', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:16, end: 18 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'mimicAngryRightGrabStart', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:19, end: 22 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'mimicAngryRightGrabMiss', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:23, end: 25 }), frameRate: 7, repeat: 0 });
            
            if(sex === 0 ){
                this.anims.create({ key: 'mimicGrabbed', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 26, end: 36 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF1', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 46-9, end: 48-9 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF2', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 49-9, end: 52-9 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF3', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 49-9, end: 52-9 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF4', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 53-9, end: 69-9 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverTF', frames: this.anims.generateFrameNames('mimicMale-evan-TF', { start: 61, end: 64 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'mimicAngryLeftGrabbedPlayer', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:26, end: 29 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicAngryRightGrabbedPlayer', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:30, end: 33 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore1', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:34, end: 36 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore2', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:37, end: 40 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedVore3', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:41, end: 45 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverVore', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:103, end: 106 }), frameRate: 7, repeat: -1 });
                
            }else{
                this.anims.create({ key: 'mimicGrabbed', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF1', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 11, end: 13 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF2', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 14, end: 17 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF3', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 14, end: 17 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF4', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 18, end: 35 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverTF', frames: this.anims.generateFrameNames('mimicMale-evelyn-TF', { start: 38-1, end: 41-1 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'mimicAngryLeftGrabbedPlayer', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:0, end: 3 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicAngryRightGrabbedPlayer', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:4, end: 7 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore1', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:8, end: 10 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore2', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:11, end: 14 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedVore3', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:15, end: 19 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverVore', frames: this.anims.generateFrameNames('mimicMale-evelyn-vore', { start:20, end: 23 }), frameRate: 7, repeat: -1 });
                
                
            }

        this.anims.create({ key: 'mimicDefeatedVore4', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:45, end: 51 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore5', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:52, end: 55 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'mimicDefeatedVore6', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:56, end: 69 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore7', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:70, end: 73 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'mimicDefeatedVore8', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:74, end: 92 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore9', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:93, end: 98 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore10', frames: this.anims.generateFrameNames('mimicMale-evan-vore', { start:99, end: 102 }), frameRate: 7, repeat: -1 });
             
        }else{
            this.anims.create({ key: 'mimicHide', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 0, end: 0 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicPeak', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 0, end: 13 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'mimicFrontGrabStart', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 14, end: 18 }), frameRate: 14, repeat: 0 });
            this.anims.create({ key: 'mimicFrontGrabMiss', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 19, end: 21 }), frameRate: 14, repeat: 0 });
            this.anims.create({ key: 'mimicFrontIdle', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 22, end: 25 }), frameRate: 7, repeat: -1 });
           
            this.anims.create({ key: 'mimicAngryIdle', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryIdleTwice', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start: 0, end: 3 }), frameRate: 12, repeat: 2 });
            this.anims.create({ key: 'mimicAngryLeft', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start: 4, end: 7 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryRight', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start: 8, end: 11 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'mimicAngryLeftGrabStart', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:12, end: 15 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'mimicAngryLeftGrabMiss', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:16, end: 18 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'mimicAngryRightGrabStart', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:19, end: 22 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'mimicAngryRightGrabMiss', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:23, end: 25 }), frameRate: 7, repeat: 0 });
            
            if(sex === 0 ){
                this.anims.create({ key: 'mimicGrabbed', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 26, end: 37 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF1', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 46, end: 48 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF2', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 49, end: 52 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF3', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 49, end: 52 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF4', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 53, end: 72 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverTF', frames: this.anims.generateFrameNames('mimicFemale-evan-TF', { start: 73, end: 76 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'mimicAngryLeftGrabbedPlayer', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:26, end: 29 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicAngryRightGrabbedPlayer', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:30, end: 33 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore1', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:34, end: 36 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore2', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:37, end: 40 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedVore3', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:41, end: 45 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverVore', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:103, end: 106 }), frameRate: 7, repeat: -1 });
                
            }else{
                this.anims.create({ key: 'mimicGrabbed', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 0, end: 10 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF1', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 11, end: 13 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedTF2', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 14, end: 17 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF3', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 14, end: 17 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedTF4', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 18, end: 37 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverTF', frames: this.anims.generateFrameNames('mimicFemale-evelyn-TF', { start: 38, end: 41 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'mimicAngryLeftGrabbedPlayer', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:0, end: 3 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicAngryRightGrabbedPlayer', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:4, end: 7 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore1', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:8, end: 10 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'mimicDefeatedVore2', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:11, end: 14 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'mimicDefeatedVore3', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:15, end: 19 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'gameoverVore', frames: this.anims.generateFrameNames('mimicFemale-evelyn-vore', { start:20, end: 23 }), frameRate: 7, repeat: -1 });
                
                
            }

        this.anims.create({ key: 'mimicDefeatedVore4', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:45, end: 51 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore5', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:52, end: 55 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'mimicDefeatedVore6', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:56, end: 69 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore7', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:70, end: 73 }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'mimicDefeatedVore8', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:74, end: 92 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore9', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:93, end: 98 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'mimicDefeatedVore10', frames: this.anims.generateFrameNames('mimicFemale-evan-vore', { start:99, end: 102 }), frameRate: 7, repeat: -1 });
        
        }

        this.inSafeMode = inSafeMode;
        
        if(this.inSafeMode === true){
            if(this.angry === true){
                this.anims.play('mimicAngryIdle',true);
            } else{
                this.anims.play('mimicFrontIdle',true);
            } 
        }else{
            this.anims.play('mimicHide',true);  
        }
        
        //applys lighting to the enemy.
        if(this.scene.lightingSystemActive === true){ 
            this.setPipeline('Light2D');
            //also sets up the curse light for if the player is ucrsed.
            this.curseLight = this.scene.lights.addLight(this.x,this.y-30, 65, 0xb317ff);
            this.curseLight.visible = false;
          }

    }

    //functions that move chestMimic objects.
    move(){
        this.setSize(200,100,true);
        this.setOffset(90, 200);
        console.log("this.hiding: ",this.hiding,"this.attacked: ",this.attacked)

        if(this.hiding === true){
            //handles the devious fake prompt to the player to open the mimic chest >:3
            if(this.attacked === false && (this.scene.player1.x > this.x - 40 && this.scene.player1.x < this.x + 40) && (this.scene.player1.y > this.y - 40 && this.scene.player1.y < this.y + 40)){
                //handles displaying the mimic key prompts
                this.containerKeyPrompts.visible = true;

                if(this.keyPlayed === false){
                    this.containerKeyPrompts.playWKey(); 
                    this.keyPlayed = true;
                }

                //if w is pressed infront of the mimic
                if(this.scene.checkWPressed()){
                    this.grabbing = true;

                    //plays creek sound effect 
                    this.scene.initSoundEffect('creakSFX','wood',0.05);
                    this.anims.play('mimicFrontGrabStart').once('animationcomplete', () => {

                        this.hiding = false;
                        this.containerKeyPrompts.visible = false;
                        this.keyPlayed  = false;
                        this.grabHitBox.x = this.x;
                        this.grabHitBox.y = this.y;
                        this.grabHitBox.setSize(70,10,true);
                        this.grabHitBox.body.enable = true;

                        this.playJumpySound('3',700);

                        this.anims.play('mimicFrontGrabMiss').once('animationcomplete', () => {
                            this.grabHitBox.body.enable = false;
                            this.grabbing = false;

                            this.anims.play('mimicAngryIdleTwice').once('animationcomplete', () => {
                            this.attacked = true;
                            console.log("setting angery to true!")
                            if(this.playerDefeated === false){
                                this.angry = true; 
                            }
                            });
                        
                        });
                        
                    });

                }

                
            }else if(this.attacked === true){

                if(this.attackedGrabPlayed === false){

                    this.grabbing = true;
                    this.attackedGrabPlayed = true;
                    //plays creek sound effect 
                    this.scene.initSoundEffect('creakSFX','wood',0.05);

                    this.anims.play('mimicFrontGrabStart').once('animationcomplete', () => {
                        this.hiding = false;
                        this.containerKeyPrompts.visible = false;
                        this.keyPlayed  = false;
                        this.grabHitBox.setSize(70,10,true);
                        this.grabHitBox.x = this.x;
                        this.grabHitBox.y = this.y;
                        this.grabHitBox.body.enable = true;

                        this.playJumpySound('3',700);
        
                        this.anims.play('mimicFrontGrabMiss').once('animationcomplete', () => {
                            this.grabHitBox.body.enable = false;
                            this.grabbing = false;
        
                            this.anims.play('mimicAngryIdleTwice').once('animationcomplete', () => {
                            this.attacked = true;
                            this.attackedGrabPlayed = false;
                            console.log("setting angery to true!")
                            if(this.playerDefeated === false){
                                this.angry = true; 
                            }
                            
                            });
                        
                        });
                        
                    });
                }
            //if the mimic is just hiding then 
            }else{
                // button prompt since player is out of range
                this.containerKeyPrompts.visible = false;
                this.keyPlayed  = false;

                //check the player idle timer to see if the player is afk
                if(this.scene.player1.idleTimer === 2000){
                    //if so then do peek animation
                    if(this.peeking === false){

                        this.peeking = true;
                        //plays creek sound effect 
                        this.scene.initSoundEffect('creakSFX','wood',0.05);

                        this.anims.play('mimicPeak',true).once('animationcomplete', () => {
                            //this.peeking = false;
                            this.anims.play('mimicHide',true); 

                            //after peek animation played, then reset it in 3 seconds to peak agian.
                            let mimic = this;
                            setTimeout(function(){
                                mimic.peeking = false;
                            },3000);
                        });   
                    }
                }else if(this.grabbing === false){
                    this.peeking = false;
                    this.anims.play('mimicHide',true);  
                }
            }
        
        //if the player dodged the initial grab, then she becomes angry and will now attempt to vore the player >:3
        }else if(this.angry === true){
            if((this.scene.player1.x > this.x - 90 && this.scene.player1.x < this.x + 90) && (this.scene.player1.y > this.y - 400 && this.scene.player1.y < this.y+20 )){
                //check if player is right 
                if(this.scene.player1.x > this.x+50 && this.attackedGrabPlayed === false){

                    if(this.attackedGrabPlayed === false){
                        this.attackedGrabPlayed = true;
                        this.angryGrabbedPosition = 2;
                        //this.grabHitBox.setSize(100,10,true);
                        
                        //attempt to grab them if in range
                        this.anims.play('mimicAngryRightGrabStart').once('animationcomplete', () => {
                            this.grabHitBox.body.enable = true;
                            this.grabHitBox.setSize(64,10,true);
                            this.grabHitBox.x = this.x+35;
                            this.grabHitBox.y = this.y;
                            
                            this.playJumpySound('3',700);
                        
                            this.anims.play('mimicAngryRightGrabMiss').once('animationcomplete', () => {
                                this.grabHitBox.body.enable = false;
                                this.grabbing = false;
                                this.attackedGrabPlayed = false;
                            
                            });
                            
                        });
                    }
                
                //else if thep layer is to the left.    
                }else if(this.scene.player1.x < this.x-50 && this.attackedGrabPlayed === false){

                    if(this.attackedGrabPlayed === false){
                        this.attackedGrabPlayed = true;
                        this.angryGrabbedPosition = 0;
                        //this.grabHitBox.setSize(100,10,true);
                        
                        //attempt to grab them if in range
                        this.anims.play('mimicAngryLeftGrabStart').once('animationcomplete', () => {
                            
                            this.grabHitBox.body.enable = true;
                            this.grabHitBox.setSize(64,10,true);
                            this.grabHitBox.x = this.x-35;
                            this.grabHitBox.y = this.y;

                            this.playJumpySound('3',700);

                            this.anims.play('mimicAngryLeftGrabMiss').once('animationcomplete', () => {
                                this.grabHitBox.body.enable = false;
                                this.grabbing = false;
                                this.attackedGrabPlayed = false;
                            
                            });
                            
                        });
                    }
                //if the player is in the middle of the mimic then grab center
                }else{

                    if(this.attackedGrabPlayed === false){
                        this.attackedGrabPlayed = true;
                        this.angryGrabbedPosition = 1; 
                        this.anims.play('mimicFrontGrabMiss').once('animationcomplete', () => {

                            this.hiding = false;
                            this.containerKeyPrompts.visible = false;
                            this.keyPlayed  = false;
                            this.grabHitBox.x = this.x;
                            this.grabHitBox.y = this.y;
                            this.grabHitBox.setSize(70,10,true);
                            this.grabHitBox.body.enable = true;

                            this.playJumpySound('3',700);

                            this.anims.play('mimicFrontGrabMiss').once('animationcomplete', () => {
                                this.grabHitBox.body.enable = false;
                                this.grabbing = false;
                                this.attackedGrabPlayed = false;
                            
                            });
                            
                        });
                    }
                }
            //if the player is within 100 pixels play agressive idle animations
            }else if((this.scene.player1.x > this.x - 210 && this.scene.player1.x < this.x + 210) && (this.scene.player1.y > this.y - 200 && this.scene.player1.y < this.y + 200)){
                
                //check if player is right 
                if(this.attackedGrabPlayed === false && this.scene.player1.x > this.x+20){
                    this.anims.play('mimicAngryRight',true);
                
                //else if thep layer is to the left.    
                }else if(this.attackedGrabPlayed === false && this.scene.player1.x < this.x-20){
                    this.anims.play('mimicAngryLeft',true);
                }else{
                    if(this.attackedGrabPlayed === false){
                        this.anims.play('mimicAngryIdle',true);
                    }
                    
                }
            //otherwise if the player is too far away
            }else{
                if(this.attackedGrabPlayed === false){
                    //play frustrated animation.
                    this.anims.play('mimicAngryIdle',true);
                }
            }

        }
        

        
        
        //updates the previous y value to tell if chestMimic is falling or going up in its jump.
        this.enemyPreviousY = this.y;

    }

    //simple idle function played when the player is grabbed by something that isnt this chestMimic.
    moveIdle() {
        if(this.hiding === true){
            this.anims.play('mimicHide', true);
        }else{
            this.anims.play('mimicFrontIdle', true);
        }
        
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.setDepth(4);
        this.grabHitBox.body.enable = false;
        this.grabTimer = false;
    }

    // functioned called to play animation when the player is defeated by the chestMimic in gameover.
    gameOver(playerSex) {
        if(this.angry === false){
            this.anims.play('gameoverTF', true);
        }else{
            this.anims.play('gameoverVore', true);
        }
    }


    //the grab function. is called when player has overlaped with an enemy chestMimic.
    grab(){

        let currentchestMimic = this;
        //first checks if chestMimic object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.chestMimicGrabFalse();

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
            this.chestMimicGrabTrue(playerHealthObject);

            //displays the give up option on screen
           //giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            //if the player is not defeated
            if (this.playerDefeated === false) {

                console.log('activating player damage function');
                //then allow the player to use controls to escape.
                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                //this.tabToGiveUp();
                
            }

            //logic for if the player is not defeated and struggling
            if(playerHealthObject.playerHealth >= 1 && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

            //logic for if the player escapes the grab
            }else if(this.struggleCounter >= 100 && playerHealthObject.playerHealth >= 1){

                //if the player escapes hide the give up indicator.
                //giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerHealth === 0){

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                
                //console.log("this.angry: ",this.angry);
                //handle the defeated logic that plays defeated animations
                if(this.angry === false){
                    this.playerIsDefeatedLogic();
                }else{
                    this.playerIsDefeatedVoreLogic();
                }
                
            }
        }
    }

    chestMimicGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this chestMimic did not grab the player this.chestMimicID: " + this.enemyId);
        this.scene.player1.visible = false;

        //play jummpy sound once for grab
        this.playJumpySound('3',700);
        
        // check to make sure animations dont conflict with eachother.
        if (this.playerDefeated === false && this.playerBrokeFree === 0 && !this.animationPlayed) {
           
            //moves bee upward so that when the tween starts it isnt bumping up on the ground if the player is too close

            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            this.playerDefeated = true;

            console.log("this.angryGrabbedPosition: ",this.angryGrabbedPosition )

            //determining grab animation depending on if this enemy is angry or not.
            if(this.angry === false){
                this.anims.play('mimicGrabbed').once('animationcomplete', () => {
                    healthEmitter.emit(healthEvent.loseHealth,9999)
                    console.log('return value of health emitter: ', playerHealthObject.playerHealth);
                    this.playerProgressingAnimation = true;
                });

            //if the mimic is angry, play the grab animation depending on which diretion mimic was facing.
            }else{
                if(this.angryGrabbedPosition === 2){
                    this.anims.play('mimicAngryRightGrabbedPlayer').once('animationcomplete', () => {
                        healthEmitter.emit(healthEvent.loseHealth,9999)
                        console.log('return value of health emitter: ', playerHealthObject.playerHealth);
                        this.playerProgressingAnimation = true;
                    });
                      
                }else if(this.angryGrabbedPosition === 1){
                    healthEmitter.emit(healthEvent.loseHealth,9999)
                    console.log('return value of health emitter: ', playerHealthObject.playerHealth);
                    this.playerProgressingAnimation = true;

                }else if(this.angryGrabbedPosition === 0){
                    this.anims.play('mimicAngryLeftGrabbedPlayer').once('animationcomplete', () => {
                        healthEmitter.emit(healthEvent.loseHealth,9999)
                        console.log('return value of health emitter: ', playerHealthObject.playerHealth);
                        this.playerProgressingAnimation = true;
                    });
                }
                
            }
            
  
        }
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
    }

    chestMimicGrabTrue(playerHealthObject){

        //puts the key display in the correct location.
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;
        // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
        if (this.playerDamaged === false && playerHealthObject.playerHealth > 0) {
            //hpBar.calcDamage(1);
            this.playerDamaged = true;
        }

        
    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.
       
    }

    playerIsStrugglingLogic(){
       
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the chestMimic.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
       
        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
            this.scene.KeyDisplay.visible === true
            this.scene.KeyDisplay.playDKey();
            let currentchestMimic = this; // important, sets currentchestMimic to the current object so that we can use variables attached to this current chestMimic object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentchestMimic.scene.KeyDisplay.visible = true;
                currentchestMimic.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                //console.log("currentchestMimic.playerDefeatedAnimationStage: " + currentchestMimic.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;
            this.playerDefeatedAnimationStage++;
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

        //console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            if (this.scene.checkDIsDown() &&
                this.playerDefeatedAnimationCooldown === false &&
                this.inStartDefeatedLogic === false &&
                this.scene.KeyDisplay.visible === true &&
                this.playerDefeatedAnimationStage !== 1 &&
                this.playerDefeatedAnimationStage !== 2 &&
                this.playerDefeatedAnimationStage !== 5) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentchestMimic = this;
                console.log("currentchestMimic.playerDefeatedAnimationStage: " + currentchestMimic.playerDefeatedAnimationStage);

                this.currentchestMimic = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentchestMimic.scene.KeyDisplay.visible = true;
                    currentchestMimic.scene.KeyDisplay.playDKey();
                    currentchestMimic.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            //if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
            
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
                console.log("activating game over by hitting tab")
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.mimicMaleTF;
                }else{
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.mimicFemaleTF;
                }

                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.chestMimicDefeatedPlayerAnimation();
     
    }

    playerIsDefeatedVoreLogic(){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the chestMimic.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
       
        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
            this.scene.KeyDisplay.visible === true
            this.scene.KeyDisplay.playDKey();
            let currentchestMimic = this; // important, sets currentchestMimic to the current object so that we can use variables attached to this current chestMimic object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentchestMimic.scene.KeyDisplay.visible = true;
                currentchestMimic.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                //console.log("currentchestMimic.playerDefeatedAnimationStage: " + currentchestMimic.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;
            this.playerDefeatedAnimationStage++;
            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

        //console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
            if (this.scene.checkDIsDown() &&
                this.playerDefeatedAnimationCooldown === false &&
                this.inStartDefeatedLogic === false &&
                this.scene.KeyDisplay.visible === true &&
                this.playerDefeatedAnimationStage !== 1 &&
                this.playerDefeatedAnimationStage !== 3 &&
                this.playerDefeatedAnimationStage !== 4 &&
                this.playerDefeatedAnimationStage !== 6 &&
                this.playerDefeatedAnimationStage !== 8 &&
                this.playerDefeatedAnimationStage !== 9 ) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentchestMimic = this;
                console.log("currentchestMimic.playerDefeatedAnimationStage: " + currentchestMimic.playerDefeatedAnimationStage);

                this.currentchestMimic = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentchestMimic.scene.KeyDisplay.visible = true;
                    currentchestMimic.scene.KeyDisplay.playDKey();
                    currentchestMimic.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            //if (Phaser.Input.Keyboard.JustDown(this.scene.keyTAB) || (this.playerDefeatedAnimationStage > 6 && this.scene.checkDIsDown())) {
            
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 10 && this.scene.checkDIsDown())) {
                console.log("activating game over by hitting tab")
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.mimicMaleVore;
                }else{
                    this.scene.enemyThatDefeatedPlayer = bestiaryKey.mimicFemaleVore;
                }

                this.scene.KeyDisplay.visible = false;
                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.chestMimicDefeatedPlayerVoreAnimation();
     
    }

    playerEscaped(playerHealthObject){

        let currentchestMimic = this;

            this.scene.KeyDisplay.visible = false;
            // can we replace this with a settimeout function? probbably. lets make a backup first.
            if (this.struggleFree === false) {
                console.log("Free counter: " + this.struggleFree);
                currentchestMimic.struggleFree = true;
                    
            }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                console.log("player has broken free" );
                
                this.anims.play("chestMimicIdle", true);
                
                //resets the enemy variables and player variables.
                this.struggleFree = false;
                this.playerBrokeFree = 0;
                this.struggleCounter = 0;
                this.animationPlayed = false;
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;

                //set butt slamming to false
                this.isButtSlamming = false;
                this.grabTimer = false;
                this.isPlayingMissedAnims = false; 

                //sets the cooldown to true, then calls the built in function of the scene to 
                //set it to false in 3 seconds. need to do this in scene to be safe
                // if the enemy is destroyed then the timeout function wont have a refrence if done here.
                this.scene.grabCoolDown = true;

                //sets grabb cooldown for the scene
                this.scene.startGrabCoolDown();

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                this.scene.player1.visible = true;
                //this.scene.player1.setSize(23, 68, true);
                //this.scene.player1.body.setGravityY(600);
                //this.scene.player1.x = this.x;
                this.scene.player1.y = this.y;
                this.scene.KeyDisplay.visible = false;
                // creates a window of time where the player cant be grabbed after being released.
                // creates a cooldown window so the player does not get grabbed as they escape.
                currentchestMimic = this;

                //reset the jump variables if the player escapes this enemys grab
                this.startJump = false;
                this.jumpAnimationPlayed = false;
                setTimeout(function () {

                    currentchestMimic.grabCoolDown = false;
                    console.log("grab cooldown has ended. player can be grabbed agian.");
                }, 1500);
            }

        
    }

    // controls the damage resistance of the chestMimic.
    damage() {
        this.setVelocityX(0);
        if (this.damageCoolDown === false) {
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
                
                if (this.enemyHP <= 0) {

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    if(this.scene.playerLocation === "TestCave"){
                        //if the mimic dies, then add a special weapon to the player inventory if in specific place
                        //make a temp object
                        let object = {
                            flagToFind: "obtained_mimic_rapier",
                            foundFlag: false,
                        };
            
                        // call the emitter to check if the value already was picked up.
                        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

                        if(object.foundFlag === false){
                            //create a temp variable to hold our item that is passed to the player
                        let item = oneTimeItemArray.obtained_mimic_rapier;

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
                        this.scene.initFakeItemDrop(this.x , this.y+16 ,3); 
                        }
                        
                        //or give them a special ring.

                    }else if(this.scene.playerLocation === "sunFlowerCave"){

                        //if the mimic dies, then add a special weapon to the player inventory if in specific place
                        //make a temp object
                        let object = {
                            flagToFind: "obtained_mimic_ring",
                            foundFlag: false,
                        };
            
                        // call the emitter to check if the value already was picked up.
                        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

                        if(object.foundFlag === false){

                            //create a temp variable to hold our item that is passed to the player
                            let item = oneTimeItemArray.obtained_mimic_ring;

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
                            this.scene.initFakeItemDrop(this.x , this.y+16 ,6); 
                            }

                    }
                    
                    this.scene.sound.get(this.chestMimicSFX).stop();
                    this.grabHitBox.destroy();
                    this.containerKeyPrompts.destroy();
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

    //handles damage types for blue chestMimic. get these damage types from the attack that hits the enemy
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt / 2);
        }
        if (pierce > 0) {
            this.enemyHP -=(pierce / 2);
        }
        if (heat > 0) {
            this.enemyHP -= (heat / 2);
        }
        if (lightning > 0) {
            this.enemyHP -= (lightning / 2);
        }
        if (cold > 0) {
            this.enemyHP -= (cold / 2);
        }
        if (curse > 0) {
            this.enemyHP -= curse;
        }
    }

    // plays the chestMimic defeated player animations.
    chestMimicDefeatedPlayerAnimation() {

        let currentchestMimic = this;
        if (this.playerDefeatedAnimationStage === 1) {
            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
                this.animationPlayed = true;

                let thisMimic = this;
                setTimeout(function () {
                    thisMimic.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
                }, 500);

                setTimeout(function () {
                    thisMimic.scene.initSoundEffect('woodBarrierSFX','woodHit',0.1);
                }, 1000);

                this.anims.play('mimicChestJump').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('mimicDefeatedTF1').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    if(this.scene.playerSex === 0 && this.enemySex === 1){
                        this.scene.internalView = new internalView(this.scene,this.x,this.y+65,'mimic');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation(3.14/3);
                    }else if(this.enemySex === 0){
                        this.scene.internalView = new internalView(this.scene,this.x,this.y+65,'mimic');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("mimicPening1",true);
                        this.scene.internalView.setRotation(3.14+(3.14/3));
                    }
                    
                });
            }
  
        }else if (this.playerDefeatedAnimationStage === 3) {
            
            this.anims.play('mimicDefeatedTF2', true);

            this.playJumpySound('3',700);
            this.playPlapSound('plap1',1200);

            let thischestMimic = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 30));
                let randY = Math.floor((Math.random() * 30));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x + 15 -randX,this.y + 40 -randY,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thischestMimic.onomatPlayed = false;
                }, 600);
            }

        }else if (this.playerDefeatedAnimationStage === 4) {
            
            this.anims.play('mimicDefeatedTF3', true);
            this.playJumpySound('3',700);
            this.playPlapSound('plap9',1000);

            if(this.scene.playerSex === 0 && this.enemySex === 1){
                this.scene.internalView.anims.play("pen2",true);
            }else if(this.enemySex === 0){
                this.scene.internalView.anims.play("mimicPening2",true);
            }

            let thischestMimic = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 30));
                let randY = Math.floor((Math.random() * 30));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x + 15 -randX,this.y + 40 -randY,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thischestMimic.onomatPlayed = false;
                }, 600);
            }

        } else if (this.playerDefeatedAnimationStage === 5) {
            console.log("flag");
            if (!this.animationPlayed) {

                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInMimic").once('animationcomplete', () => {
                        this.scene.internalView.destroy();
                    });
                }else if(this.enemySex === 0){
                    this.scene.internalView.anims.play("mimicClimax").once('animationcomplete', () => {
                        this.scene.internalView.destroy();
                    });
                }

                this.animationPlayed = true;
                this.scene.initSoundEffect('curseSFX','curse',0.3);

                let currentMimic = this;
                setTimeout(function () {

                    //display the curselight when player is cursed.
                    if(currentMimic.scene.lightingSystemActive === true){
                        currentMimic.curseLight.x = currentMimic.x;
                        currentMimic.curseLight.y = currentMimic.y-5;
                        currentMimic.curseLight.visible = true;
                    }
                }, 400);

                setTimeout(function () {

                    //display the curselight when player is cursed.
                    if(currentMimic.scene.lightingSystemActive === true){
                        currentMimic.curseLight.visible = false;
                    }
                }, 1500);

                this.anims.play('mimicDefeatedTF4').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();

                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                 
                });
            }
        }
        else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('mimicHide', true);
        }
    }

    // plays the chestMimic defeated player animations.
    chestMimicDefeatedPlayerVoreAnimation() {

        let currentchestMimic = this;
        if (this.playerDefeatedAnimationStage === 1) {
            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 10;

            this.playJumpySound('4',700);

            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('mimicDefeatedVore1').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    if(this.enemySex === 1){
                        this.scene.internalView = new internalView(this.scene,this.x+30,this.y-10,'mimic');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("femaleTongueIn",true);
                        this.scene.internalView.setRotation(3.14/2);
                    }else{
                        this.scene.internalView = new internalView(this.scene,this.x+30,this.y-10,'mimic');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("maleTongueIn",true);
                        this.scene.internalView.setRotation(3.14/2);
                    }
                    
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            
            this.anims.play('mimicDefeatedVore2', true);

            this.playPlapSound('plap9',1000);
            this.playJumpySound('3',700);

        }else if (this.playerDefeatedAnimationStage === 3) {

            if (!this.animationPlayed) {
                this.scene.internalView.destroy();
                this.animationPlayed = true;
                this.scene.initSoundEffect('swallowSFX','3',0.6);
                this.anims.play('mimicDefeatedVore3').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {    
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                let thisMimic = this;
                setTimeout(function () {
                    thisMimic.scene.initSoundEffect('burpSFX','3',0.3);
                }, 500);
                this.anims.play('mimicDefeatedVore4').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 5) {   

            this.anims.play('mimicDefeatedVore5', true);

            let thisMimic = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;

                this.scene.initSoundEffect('stomachSFX','8',0.5);  
                
                setTimeout(function () {
                    thisMimic.onomatPlayed = false;
                }, 1000);
            }

        }else if (this.playerDefeatedAnimationStage === 6) { 

            
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.scene.initSoundEffect('stomachSFX','8',0.5); 

                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+15,'charBubble',"CHURN!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);
                this.anims.play('mimicDefeatedVore6').once('animationcomplete', () => {

                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 7) {    
            this.anims.play('mimicDefeatedVore7', true);
            this.playJumpySound('3',700);

        }else if (this.playerDefeatedAnimationStage === 8) {    
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.scene.initSoundEffect('stomachSFX','2',0.03);

                this.scene.initSoundEffect('burpSFX','3',0.3);

                let thisMimic = this;
                setTimeout(function () {
                    thisMimic.scene.initSoundEffect('burpSFX','4',0.3);
                }, 1000);

                setTimeout(function () {
                    thisMimic.scene.initSoundEffect('burpSFX','3',0.3);
                }, 1500);

                this.anims.play('mimicDefeatedVore8').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 9) {    
            if (!this.animationPlayed) {
                this.animationPlayed = true;

                this.scene.initSoundEffect('stomachSFX','4',0.03);

                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+15,'charBubble',"SHRINK...");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.anims.play('mimicDefeatedVore9').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        }else if (this.playerDefeatedAnimationStage === 10) { 
            this.playJumpySound('3',700);   
            this.anims.play('mimicDefeatedVore10', true);
        }
    }

    //function to show off animation 
    animationGrab(){

        //first checks if chestMimic object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        //console.log("this.playerGrabbed: ",this.playerGrabbed,"this.angry: ",this.angry,"this.playerProgressingAnimation: ",this.playerProgressingAnimation)
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        
        if (this.playerGrabbed === false) {

            this.chestMimicGrabFalse();
            this.isViewingAnimation = true;
            //this.playerProgressingAnimation = false;

            this.scene.gameoverLocation = "caveGameover";

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
            //this.scene.player1.setSize(10, 10, true);
            //puts the key display in the correct location.
            this.scene.KeyDisplay.visible = true;
            this.scene.KeyDisplay.x = this.x;
            this.scene.KeyDisplay.y = this.y + 100;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

            // handles input for progressing animation
            //console.log('this.scene.checkDPressed()',this.scene.checkDPressed())
            /*if (this.scene.checkDPressed() === true) {
                this.playerProgressingAnimation = true;
                }*/

                // displays inputs while in the first stage of the animation viewing.
                if (this.keyAnimationPlayed === false) {
                    //console.log(" setting keyW display");
                    this.scene.KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }      
            }

            //console.log("this.playerProgressingAnimation: ",this.playerProgressingAnimation)
            if( this.playerProgressingAnimation === true){
                //calls animation grab code until the animation is finished
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax){
                    //handle the defeated logic that plays defeated animations
                    if(this.angry === true){
                        this.playerIsDefeatedVoreLogic();
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
