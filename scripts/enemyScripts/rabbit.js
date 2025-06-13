
//implementation for the rabbit enemy.
class rabbit extends enemy {

    /*
    rabbit rework road map
    - leaping grab / some sort of grab animation that doesnt cause the hitbox to leave the ground, just astetic.
    - add changes to other enemys, drops, seperate hitbox ect
    - if player is wearing the carrot ring, change rabbits ai have the rabbit pant and drewl at the player when out of range
    - if player is close, have the rabbit run after them,
    - rabbit trys to knock down the player similiar to the white cat, running shove?
    - if the player is grabbed while down, the struggle is the rabbit trying to eat the player
    - struggle progresses to the player struggling in the belly while the rabbit humps them
    - if player breaks free they come out of the back end of the rabbit? fun mix up?
    - if the player gets digested, then the rabbit grows larger. becomes a futa if sex is different to enemy.
    */
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        
        //on set up, need to decide if rabbit is make or female, using preference variable in settings.
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the rabbit.
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 1){
                super(scene, xPos, yPos, sex, id, 20, 'rabbitFemale');
                this.enemySex = 1;
            }else{
                super(scene, xPos, yPos, sex, id, 20, 'rabbitMale');
                this.enemySex = 0;
            }
        }
    
        // sets gravity 
        this.body.setGravityY(600); 

        // variables for movement
        this.rabbitSoundCoolDown = false;
        this.jumpAnimationPlayed = false;
        this.rabbitDamageCounter = false;
        this.jumped = false;
        this.startJump = false;
        this.grabTimer = false;
        this.grabAnimationPlayed = false;

        // sets the rabbits hp value
        this.enemyHP = 35;

        //make a hitbox so the cat can grab the player.
        this.grabHitBox = new hitBoxes(scene,this.x,this.y);
        this.grabHitBox.setSize(25,10,true);
        this.hitboxActive = false;
        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;

        //make a hitbox so the cat can attack the player.
        this.attackHitBox = new hitBoxes(scene,this.x,this.y);
        this.attackHitBox.setSize(30,10,true);
        this.attackHitboxActive = false;

        this.rabbitIsHungry = false;
        this.rabbitIsHungryStart = false;
        this.randomInput = Math.floor((Math.random() * 3));
        this.randomInputCooldown = false;
        this.knockdownCoolDown = false;
        this.struggleAnimationInterupt = false;

        this.grabCoolDown = false;
        this.shoveCoolDown = false;
        this.spitUp = false;

        //defines rabbit animations based on the players sex.
        if(this.enemySex === 0) {
            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopStart', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopInAir', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabStart', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 11, end: 11 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiddle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 12, end: 14 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 15, end: 16 }), frameRate: 4, repeat: 0 });

            //mod frame end
            this.anims.create({ key: 'rabbitIdleRailed', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 75, end: 78 }), frameRate: 6, repeat: -1 });
            
            this.anims.create({ key: 'rabbitDefeatedFall', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 60, end: 62 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitDefeatedFallIdle', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 63, end: 66 }), frameRate: 5, repeat: -1 });
            
            this.anims.create({ key: 'rabbitHungerIdle', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 0, end: 3 }), frameRate: 4, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerIdleLoop', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerWalk', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 4, end: 13 }), frameRate: 16, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerWalkSlow', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 4, end: 13 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerHopGrabStart', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 14, end: 15 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 16, end: 17 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleIdle', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 42, end: 46 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerStruggleLeft', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 47, end: 50 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleRight', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 51, end: 54 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleUp', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 55, end: 58 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestion1', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 75, end: 77 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestionIdle', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 78, end: 81 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerDigestion2', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 82, end: 87 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestedIdle', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 88, end: 91 }), frameRate: 6, repeat: -1 });

            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 21, end: 25 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 25, end: 28 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 29, end: 39 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 39, end: 42 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 42, end: 51 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 56, end: 59 }), frameRate: 6, repeat: -1 });

                //mod frame of player getting railed as a tf rabbit
                this.anims.create({ key: 'rabbitRail4', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 67, end: 70}), frameRate: 8, repeat: -1 });
                //frames of rabbit getting railed by other rabbit. 
                this.anims.create({ key: 'rabbitsRailing', frames: this.anims.generateFrameNames('rabbit-male-male', { start: 71, end: 74}), frameRate: 8, repeat: -1 });

                //vore animation frames specific to male on male.
                this.anims.create({ key: 'rabbitHungerSwallow1', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 18, end: 25 }), frameRate: 5, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSwallow2', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 26, end: 29 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSwallow3', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 30, end: 41 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSpitUp', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 59, end: 74 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerGameover1', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 92, end: 95 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHungerGameover2', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 96, end: 99 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHungerGameover3', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 100, end: 103 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerGameover4', frames: this.anims.generateFrameNames('rabbit-male-male-vore', { start: 104, end: 107 }), frameRate: 6, repeat: -1 });


            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 4, end: 8 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGrind', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 8, end: 11 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitPenetrate', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 12, end: 22 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitRail1', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitRail2', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitRail3', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 22, end: 25 }), frameRate: 14, repeat: -1 });
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 25, end: 40 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-male-female', { start: 41, end: 44 }), frameRate: 6, repeat: -1 });
            }
            
        }else{

            this.anims.create({ key: 'rabbitIdle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 1, end: 4 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHopStart', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 5, end: 7 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopInAir', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 8, end: 10 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabStart', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 11, end: 11 }), frameRate: 3, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiddle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 12, end: 14 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 15, end: 16 }), frameRate: 4, repeat: 0 });

            this.anims.create({ key: 'rabbitDefeatedFall', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 53, end: 55 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitDefeatedFallIdle', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 56, end: 59 }), frameRate: 8, repeat: -1 });

            this.anims.create({ key: 'rabbitHungerIdle', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 0, end: 3 }), frameRate: 4, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerIdleLoop', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerWalk', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 4, end: 13 }), frameRate: 16, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerWalkSlow', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 4, end: 13 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerHopGrabStart', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 14, end: 15 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerHopGrabMiss', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 16, end: 17 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleIdle', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 42, end: 46 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerStruggleLeft', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 47, end: 50 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleRight', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 51, end: 54 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerStruggleUp', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 55, end: 58 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestion1', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 75, end: 77 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestionIdle', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 78, end: 81 }), frameRate: 6, repeat: -1 });
            this.anims.create({ key: 'rabbitHungerDigestion2', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 82, end: 87 }), frameRate: 6, repeat: 0 });
            this.anims.create({ key: 'rabbitHungerDigestedIdle', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 88, end: 91 }), frameRate: 6, repeat: -1 });

            if(sex === 0 ){
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 17, end: 20 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 21, end: 31 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 31, end: 34 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 35, end: 38 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 35, end: 38 }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 39, end: 48 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-female-male', { start: 49, end: 52}), frameRate: 6, repeat: -1 }); 

                //vore animation frames specific to male on male.
                this.anims.create({ key: 'rabbitHungerSwallow1', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 18, end: 25 }), frameRate: 5, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSwallow2', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 26, end: 29 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSwallow3', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 30, end: 41 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerSpitUp', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 59, end: 74 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerGameover1', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 92, end: 95 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHungerGameover2', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 96, end: 99 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHungerGameover3', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 100, end: 103 }), frameRate: 6, repeat: 0 });
                this.anims.create({ key: 'rabbitHungerGameover4', frames: this.anims.generateFrameNames('rabbit-female-male-vore', { start: 104, end: 107 }), frameRate: 6, repeat: -1 });

            }else{
                this.anims.create({ key: 'rabbitGrab', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 17-17, end: 20-17 }), frameRate: 6, repeat: -1 });
                this.anims.create({ key: 'rabbitShove', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 21-17, end: 31-17 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitHump1', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 31-17, end: 34-17 }), frameRate: 8, repeat: -1 });
                this.anims.create({ key: 'rabbitHump2', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 35-17, end: 38-17 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'rabbitHump3', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 35-17, end: 38-17 }), frameRate: 14, repeat: -1 });   
                this.anims.create({ key: 'rabbitClimax', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 39-17, end: 48-17 }), frameRate: 8, repeat: 0 });
                this.anims.create({ key: 'rabbitGameover', frames: this.anims.generateFrameNames('rabbit-female-female', { start: 49-17, end: 52-17}), frameRate: 6, repeat: -1 }); 
            }
            
        }

        this.inSafeMode = inSafeMode;
        
        //if(this.inSafeMode === true){ 
            this.anims.play('rabbitIdle',true);
        //}

        this.setSize(70, 179, true);
        this.setOffset(180, 110);
    }

    resetVariables(){
        this.rabbitSoundCoolDown = false;
        this.jumpAnimationPlayed = false;
        this.rabbitDamageCounter = false;
        this.jumped = false;
        this.startJump = false;
        this.grabTimer = false;
        this.grabAnimationPlayed = false;
        this.attemptingGrab = false;
        this.isPlayingMissedAnims = false;
        this.attackHitboxActive = false;
        this.hitboxActive = false;
        this.rabbitIsHungry = false;
        this.rabbitIsHungryStart = false;
        this.randomInputCooldown = false;
        this.swallowDelay  = false;

        this.playerBrokeFree = 0;
        this.struggleCounter = 0;
        this.playerDefeatedAnimationStage = 0;

    }

    //functions that move rabbit objects.
    move(){
        
        //sets gravity
        this.body.setGravityY(600);

        //checks to see if rabbit should move if the player is within range.
        if (this.checkXRangeFromPlayer(350, 350) && this.enemyInDefeatedLogic === false) {
            this.setSize(70, 179, true);
            this.setOffset(180, 110);

             //code to change rabbit behavior
             //console.log("this.scene.player1.ringType: ",this.scene.player1.ringType)
             if(this.scene.player1.ringType === 8){
                if(this.rabbitIsHungry === false){
                    this.rabbitIsHungryStart = true;
                }
                
                
             }else if(this.scene.player1.ringType !== 8 && this.rabbitIsHungry === true){

                this.resetVariables();
                this.setVelocityX(0);
                        
             }else if(this.rabbitIsHungry === false){
                this.attackHitboxActive = false;
             }

             //console.log("this.grabTimer: ",this.grabTimer,"this.attemptingGrab : ",this.attemptingGrab ,"this.jumped: ",this.jumped,"this.startJump: ",this.startJump, );
            if(this.rabbitIsHungryStart === false && this.rabbitIsHungry === false){
                // if the player is in range, rabbit is on the ground, and grab timer is false.
                if(this.body.blocked.down && (this.checkXRangeFromPlayer(80, 80) && this.checkYRangeFromPlayer(20,120) && this.grabTimer === false && this.startJump === false && this.jumped === false && this.grabCoolDown === false)){
                            
                            console.log("starting grab animation");

                            //play animation
                            this.grabTimer = true;
            
                            //if player to the left move the grab hitbox to the left
                            if(this.scene.player1.x < this.x){
                                this.flipX = true;
                            }else{
                                this.flipX = false;
                            }
                            //stop velocity
                            this.setVelocityX(0);

                            this.setDepth(6);
                            if (!this.grabAnimationPlayed) {
                                this.grabAnimationPlayed = true;
                                this.anims.play('rabbitHopGrabStart').once('animationcomplete', () => {

                                    //if player to the left move the grab hitbox to the left
                                    if(this.scene.player1.x < this.x){
                                        this.setVelocityX(-130);
                                        this.flipX = true;
                                    }else{
                                        this.setVelocityX(130);
                                        this.flipX = false;
                                    }

                                    this.playJumpySound('3',700);
                
                                    this.hitboxActive = true;
                                    this.grabHitBox.body.enable = true;
                                    this.attemptingGrab = true;

                                    this.anims.play('rabbitHopGrabMiddle').once('animationcomplete', () => {
                                        
                                        if(this.scene.player1.x < this.x){
                                        this.setVelocityX(-130);
                                        this.flipX = true;
                                        }else{
                                            this.setVelocityX(130);
                                            this.flipX = false;
                                        }
                                        this.grabAnimationPlayed = false;
                                    //controls the x velocity when the bee ischarging to grab the player
                                    });
                                    
                                });
                            }
        
                }else if(this.body.blocked.down && this.attemptingGrab === true ){

                            console.log("grab animation missed");
                            this.startJump = false;
                            this.jumped = false;
                            

                            if(this.isPlayingMissedAnims === false){
                                this.isPlayingMissedAnims = true;
                                //set value to play missed grabb animation
                                
                                this.anims.play('rabbitHopGrabMiss').once('animationcomplete', () => {
                                    this.setDepth(5);
                                    this.hitboxActive = false;
                                    this.attemptingGrab = false;
                                    this.grabTimer = false;
                                    this.isPlayingMissedAnims = false;   
                                    this.jumped = false;
                                    this.startJump = false;
                                    this.jumpAnimationPlayed = false;
                                    this.setVelocityX(0);

                                    this.grabCoolDown = true;
                                    let currentRabbit = this;
                                    setTimeout(function () {
                                        currentRabbit.grabCoolDown = false;
                                        console.log("grab cooldown has ended. player can be grabbed agian.");
                                    }, 2000);

                                });
                            }
                        
                //if the rabbit is left of the player move the rabbit right twards the player
                }else if (this.body.blocked.down && this.scene.player1.x > this.x && this.startJump === false && this.grabTimer === false && this.attemptingGrab === false && this.playerGrabbed === false) {

                    this.startJump = true;

                    console.log("jumping left");
                    this.flipX = false;

                    //if we havent played jump animation
                        if(!this.jumpAnimationPlayed && this.playerGrabbed === false && this.rabbitIsHungryStart === false && this.rabbitIsHungry === false && this.attemptingGrab === false && this.grabTimer === false && this.enemyInDefeatedLogic === false) {

                            //set it to true
                            this.jumpAnimationPlayed = true;
                            
                            //stop velocity so bending legs animation stays still
                            this.setVelocityX(0);

                            //play the animation then on completion of the animation
                            this.anims.play('rabbitHopStart').once('animationcomplete', () => {

                                //we nolonger played the jumping animation so set it to false
                                this.jumpAnimationPlayed = false;

                                //if the player isnt grabbed, then make the rabbit jump by setting its velocity
                                if(this.playerGrabbed === false && this.rabbitIsHungryStart === false && this.rabbitIsHungry === false && this.attemptingGrab === false && this.grabTimer === false && this.enemyInDefeatedLogic === false){
                                    let randomXVelocity = Math.floor((Math.random() * 260) + 30);
                                    this.setVelocityX(randomXVelocity);
                                    this.setVelocityY(240*-1);
                                    this.scene.initSoundEffect('jumpSFX','1',0.1);
                                }
                            
                                //play the animation for rabbit being in the air.
                                this.anims.play('rabbitHopInAir');
                                
                            
                            });
                        }
                    
                //if the rabbit is to the right of the player, then move the rabbit left
                }else if (this.body.blocked.down && this.scene.player1.x < this.x && this.startJump === false && this.grabTimer === false && this.attemptingGrab === false && this.playerGrabbed === false) {

                    this.startJump = true;
                    console.log("jumping right");
                    this.flipX = true;

                    //if we havent played jump animation
                        if(!this.jumpAnimationPlayed && this.playerGrabbed === false && this.rabbitIsHungryStart === false && this.rabbitIsHungry === false && this.attemptingGrab === false && this.grabTimer === false && this.enemyInDefeatedLogic === false) {

                            //set it to true
                            this.jumpAnimationPlayed = true;
                            
                            //stop velocity so bending legs animation stays still
                            this.setVelocityX(0);

                            //play the animation then on completion of the animation
                            this.anims.play('rabbitHopStart').once('animationcomplete', () => {

                                //we nolonger played the jumping animation so set it to false
                                this.jumpAnimationPlayed = false;

                                //if the player isnt grabbed, then make the rabbit jump by setting its velocity
                                if(this.playerGrabbed === false && this.rabbitIsHungryStart === false && this.rabbitIsHungry === false && this.attemptingGrab === false && this.grabTimer === false && this.enemyInDefeatedLogic === false){
                                    let randomXVelocity = Math.floor((Math.random() * 260) + 30);
                                    this.setVelocityX(randomXVelocity*-1);
                                    this.setVelocityY(240*-1);
                                    this.scene.initSoundEffect('jumpSFX','1',0.1);
                                }

                                //play the animation for rabbit being in the air.
                                this.anims.play('rabbitHopInAir');
                                
                            });
                        }
                //if the rabbit is on the ground, and the variables are not set, then reset them for the next jump       
                }else if(this.startJump === true && this.body.blocked.down){

                    console.log("resetting start jump");
                    this.setVelocityX(0);
                    this.startJump = false;
                    this.jumped = false;
                
                }else if(!this.body.blocked.down && this.grabTimer === true ){

                    console.log("preventing weird grab jump");
                    this.grabTimer = false;
                    this.hitboxActive = false;
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.isPlayingMissedAnims = false;   
                    this.jumped = false;
                    this.startJump = false;
                    this.jumpAnimationPlayed = false;

                    //play the animation for rabbit being in the air.
                    this.anims.play('rabbitHopInAir');

                }/*else if(this.grabTimer === true && this.attemptingGrab === false && this.jumped === false && this.startJump === false ){
                    this.grabTimer = false;
                }*/

            // if the player is wearing the carrot ring, then safely reset rabbits variable while there on the ground, and set hungry to true.
            }else if(this.rabbitIsHungryStart === true && this.body.blocked.down){

                //resets the enemy variables and player variables.
                this.playerBrokeFree = 0;
                this.struggleCounter = 0;
                this.playerDamaged = false;
                this.playerGrabbed = false;
                this.keyAnimationPlayed = false;
                this.scene.grabbed = false;
                this.scene.player1.visible = true;
                this.isPlayingMissedAnims = false;
                this.grabTimer = false;
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.startedGrab = false;
                this.playerDefeatedAnimationStage = 0;
                this.struggleAnimationInterupt = false;
                this.spitUp = false;
                this.hitboxActive = false;
                this.attackHitboxActive = false;
                this.hitboxActive = false;
                this.grabCoolDown = false;

                //if player to the left move the grab hitbox to the left
                if(this.scene.player1.x < this.x){
                    this.flipX = true;
                }else{
                    this.flipX = false;
                }

                //play animation where rabbit hungers for the player.
                if(!this.animationPlayed){

                    this.animationPlayed = true;
                    this.anims.play('rabbitHungerIdle').once('animationcomplete', () => {

                        
                        this.rabbitIsHungry = true;
                        this.rabbitIsHungryStart = false;
                        this.animationPlayed = false;
                    });
                }
                
            //after rabbit transitions to hungry state perform hungry enemy ai
            }else if(this.rabbitIsHungry === true){

                //if rabbit is too close, and grabb attempt is false, then 
                if((this.checkXRangeFromPlayer(30, 30) && this.checkYRangeFromPlayer(20,70) && this.grabTimer === false) && this.scene.playerStuckGrab === false && this.shoveCoolDown === false){
                    
                    // IF THE PLAYER ISNT MOVING LEFT OR RIGHT then set velocity to zero so they dont over shoot the player.
                    if(this.scene.checkDIsDown() && this.x < this.scene.player1.x ){
                        this.setVelocityX(300);
                    }else if(this.scene.checkAIsDown() && this.x > this.scene.player1.x){
                        this.setVelocityX(-300);
                    }else{
                        this.setVelocityX(0);
                    }
                    // otherwise keep the rabbits current momentum.
                    this.grabTimer = true;

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setDepth(7);
                    
                    this.anims.play('rabbitHungerHopGrabStart').once('animationcomplete', () => {
                        
                        //this.playJumpySound('3',700);
                        this.setVelocityX(0);
                        this.attackHitboxActive = true;
                        this.attackHitBox.body.enable = true;
                        this.attemptingGrab = true;
                        this.playJumpySound('3',700);
                        
                    });

                //activate missed animation
                }else if(this.checkXRangeFromPlayer(20, 20) && this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false){

                    //stop momentum play idle loop
                    this.setVelocityX(0);
                    this.anims.play('rabbitHungerIdleLoop', true);

                //attempt to grab the player
                }else if(this.attemptingGrab === true && this.scene.playerStuckGrab === false){

                    if(this.isPlayingMissedAnims === false){
                        this.isPlayingMissedAnims = true;
                        //set value to play missed grabb animation

                        this.setVelocityX(0);
                        
                        this.anims.play('rabbitHungerHopGrabMiss').once('animationcomplete', () => {

                            this.setDepth(5);
                            this.attackHitboxActive = false;
                            this.attemptingGrab = false;
                            this.grabTimer = false;
                            this.isPlayingMissedAnims = false;  
                            if(!this.checkYRangeFromPlayer(20,70)){
                                this.anims.play('rabbitHungerIdleLoop', true);
                            }
                            
                            this.shoveCoolDown = true;
                            let currentRabbit = this;
                            setTimeout(function () {
                                currentRabbit.shoveCoolDown = false;
                                console.log("shoveCoolDown has ended. player can be grabbed agian.");
                            }, 2000);
                        });
                    }

                //move the rabbit right if the player isnt knocked down
                }else if(this.scene.player1.x > this.x && this.checkYRangeFromPlayer(20,70) && this.attemptingGrab === false && this.grabTimer === false && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat right"); 
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;            
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('rabbitHungerWalk', true);
                    this.setVelocityX(300); 
                    
            
                //if the player not knocked how move the rabbit left
                }else if(this.scene.player1.x < this.x && this.checkYRangeFromPlayer(20,70) && this.attemptingGrab === false && this.grabTimer === false  && this.scene.playerStuckGrab === false) {
                    //console.log("moving cat left");
                    this.swallowDelay = false; 
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;  
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('rabbitHungerWalk', true);
                    this.setVelocityX(-300); 
                    

                // if the rabbit is close enough to the player and they are knocked down.
                }else if((this.checkXRangeFromPlayer(80,80) && this.scene.playerStuckGrab === true)){

                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.attackHitboxActive = false;
                    this.setDepth(7);
                    //have the rabbit move to the correct position with the feet and face the right direction.
                    //if the player is facing left

                    if(!this.checkXRangeFromPlayer(20,20) && this.scene.player1.x < this.x){
                        this.flipX = true;
                        this.setVelocityX(-30);
                        this.anims.play('rabbitHungerWalkSlow', true);
                        this.swallowDelay  = false;
                    }else if(!this.checkXRangeFromPlayer(20,20) && this.scene.player1.x > this.x){
                        this.flipX = false;
                        this.setVelocityX(30);
                        this.anims.play('rabbitHungerWalkSlow', true);
                        this.swallowDelay  = false;
                    }else{

                        this.setVelocityX(0);

                        if(this.swallowDelay  === false){
                            this.swallowDelay  = true;
                            this.anims.play('rabbitHungerIdle').once('animationcomplete', () => {

                                this.swallowDelay = false;

                                this.hitboxActive = true;
                                this.grabHitBox.body.enable = true;
                                this.attemptingGrab = true;

                            });
                        }
                    }

                }else if(this.scene.player1.x > this.x  && this.checkYRangeFromPlayer(20,70)  && this.grabTimer === false && this.swallowDelay === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat right");        
                    this.direction = "right";
                    this.jumpAnimationPlayed = false; 
                    this.hitboxActive = false;
                    this.flipX = false;

                    this.anims.play('rabbitHungerWalk', true);
                    this.setVelocityX(70); 
                    
            
                //if the player is to the right then move enemy to the left
                }else if(this.scene.player1.x < this.x  && this.checkYRangeFromPlayer(20,70)  && this.grabTimer === false && this.swallowDelay === false && this.scene.playerStuckGrab === true) {
                    //console.log("moving cat left");   
                    this.direction = "left";
                    this.jumpAnimationPlayed = false;
                    this.flipX = true;
                    this.hitboxActive = false;
                    this.anims.play('rabbitHungerWalk', true);
                    this.setVelocityX(-70); 
                
                //if the cat is above the knocked down player, then grab them
                }else if(!this.checkYRangeFromPlayer(20,70) && this.checkXRangeFromPlayer(30, 30) && this.grabCoolDown === false){

                    this.attackHitboxActive = false;
                    this.attemptingGrab = false;
                    this.grabTimer = false;
                    this.isPlayingMissedAnims = false; 

                    this.grabCoolDown = true;
                    let currentRabbit = this;
                    setTimeout(function () {
                        currentRabbit.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 2000);
                    

                    //if player to the left move the grab hitbox to the left
                    if(this.scene.player1.x < this.x){
                        this.flipX = true;
                    }else{
                        this.flipX = false;
                    }

                    this.setVelocityX(0); 
                    this.anims.play('rabbitHungerIdleLoop', true);

                    console.log("rabbit has lost the plot.")
                }  
            
            }

        //if the rabit is not in range then stop there velocity and reset the jumping variables.
        }else{
            this.setVelocityX(0);
        }

        //handles hit box positioning
        if(this.hitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                //console.log("moving cat hitbox to the left");
                this.grabHitBox.x = this.x-10;

            //otherwise put it to the right.
            }else{
                //console.log("moving cat hitbox to the right");
                this.grabHitBox.x = this.x+10;
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
        
        //updates the previous y value to tell if rabbit is falling or going up in its jump.
        this.enemyPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this rabbit.
    moveIdle() {
        this.anims.play('rabbitIdle', true);
        this.body.setGravityY(600);
        this.setVelocityX(0);

        //reset the jump variables if the player is grabbed by another enemy
        this.startJump = false;
        this.jumpAnimationPlayed = false;

        //object is on view layer 4 so idling enemys dont overlap current one.
        this.setDepth(4);
    }

    // functioned called to play animation when the player is defeated by the rabbit in gameover.
    gameOver() {
        const femalePreferance = this.scene.preferance !== 0

        this.setSize(70, 180, true);
        this.setOffset(180, 110);
        this.anims.play('rabbitGameover', true);

        const rabbit1 = new rabbit(this.scene, this.x + 150, this.y - 30, 0, 99)
        const rabbit2 = new rabbit(this.scene, this.x - 150, this.y - 30, 0, 101)
        rabbit1.anims.play(femalePreferance ? 'rabbitIdle' : 'rabbitIdleRailed')
        rabbit2.anims.play(femalePreferance ? 'rabbitIdle' : 'rabbitIdleRailed')
        rabbit1.setGravityY(0)
        rabbit2.setGravityY(0)
        
        if (femalePreferance) {
            return
        } 
        
        const railingRabbitsXCoor = this.x + 45
        const railingRabbitsYCoor = this.y + 2
        const railingRabbits = new rabbit(this.scene, railingRabbitsXCoor, railingRabbitsYCoor, 0, 100)
        railingRabbits.anims.play('rabbitsRailing').on('animationrepeat', () => {
            if (!this.onomatPlayed) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,railingRabbitsXCoor-randX+30,railingRabbitsYCoor-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.setScale(.25);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(() => {
                    this.onomatPlayed = false;
                }, 500);
            }
        })
        railingRabbits.setGravityY(0)
    }

    gameOverVore(){

        this.setSize(70, 180, true);
        this.setOffset(180, 108);
        this.anims.play('rabbitHungerGameover1', true);

        this.gameoverLoopingSounds = 0;
        let currentEnemy = this;
        setTimeout(function () {
            currentEnemy.anims.play('rabbitHungerGameover2', true);   

            currentEnemy.gameoverLoopingSounds++;
            setTimeout(function () {
                if(currentEnemy.scene.sound.get("plapSFX") !== null && currentEnemy.scene.sound.get("plapSFX") !== undefined){
                        currentEnemy.scene.sound.get("plapSFX").stop();
                }
            },3000);

            setTimeout(function () {
                currentEnemy.gameoverLoopingSounds++;

                currentEnemy.playPlapSound('plap5',500);
                

                currentEnemy.anims.play('rabbitHungerGameover3').once('animationcomplete', () => {
                
                    currentEnemy.gameoverLoopingSounds++;

                    currentEnemy.anims.play('rabbitHungerGameover4',true);

                });  
               
            }, 5000);

        }, 10000);

    }
    //the grab function. is called when player has overlaped with an enemy rabbit.
    grab(){
        //console.log("this.struggleCounter: ",this.struggleCounter);
        //code could be used to get sprite to the ground faster.
        //this.body.setGravityY(600);

        let currentrabbit = this;
        //first checks if rabbit object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the velocity of the enemy
        this.setVelocityX(0);

        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();

        } else if (this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null,
                playerMaxHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            //makes the struggle bar visible
            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
            struggleEmitter.emit(struggleEvent.updateStruggleBarCap,100);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //logic for when the player is grabbed
            this.rabbitGrabTrue(playerHealthObject);

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
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100){

            //calls a function to handle the player taking damage
            this.playerIsStrugglingLogic();

            
            }

            //logic for if the player escapes the grab
            if(playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter >= 100){

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                this.playerEscaped(playerHealthObject);

            //logic for if the player is defeated
            }else if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax && this.rabbitIsHungry === false){

                 // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "cursed"){
                    this.scene.defeatedTitle = "cursed";
                }

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDefeatedLogic(playerHealthObject);
            }else if(playerHealthObject.playerHealth === 0 && this.rabbitIsHungry === true){

                //console.log("player defeated and eat logic")
                 // changes the title to reflect the game over.
                if(this.scene.defeatedTitle !== "eaten"){
                    this.scene.defeatedTitle = "eaten";
                }

                //hide the giveup indicator
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                //makes the struggle bar invisible
                struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                //hides the mobile controls in the way of the tab/skip indicator.
                controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
            
                //handle the defeated logic that plays defeated animations
                this.playerIsDSefeatedVoreLogic(playerHealthObject);
            }
        }
    }

    rabbitGrabFalse(){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        //console.log("this rabbit did not grab the player this.rabbitID: " + this.enemyId);
        this.scene.player1.visible = false;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;
 
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.

        //ensures hitboxes are put out of the way
        this.attackHitBox.x = this.x;
        this.attackHitBox.y = this.y + 3000; 
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000;
    }

    rabbitGrabTrue(playerHealthObject){

        this.setVelocityX(0);

        //plays bouncy sound during the struggle animation if the tiger has eaten.
        if(playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.rabbitIsHungry === false){
            this.playJumpySound('4',700);
        }
        
        //puts the key display in the correct location.
        this.scene.player1.y = this.y - 150;
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;
    
    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //logic handles random key imputs display to player and there interactability.
        //checks if the player is struggleing free by pressing the right buttons.
        let currentrabbit = this;

        if(this.animationPlayed === false){

            //show struggle button, and bar
            this.scene.KeyDisplay.visible = true;

             if (this.keyAnimationPlayed === false && this.rabbitIsHungry === false) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }

            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);

            if(this.rabbitIsHungry === false){

                if (this.scene.checkDPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                    if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                        this.struggleCounter += 15;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                }else if(this.scene.checkAPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
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

                this.keyAnimationPlayed = true;    
            }else if(this.rabbitIsHungry === true){

                //handle random inputs
                if (this.randomInput === 0) {
                    //if s is the key to be pressed then play animation and increase the struggle bar
                    if (this.scene.checkAPressed() === true) {
                        
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                            this.struggleCounter += 20;
                            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                            //console.log('strugglecounter: ' + this.struggleCounter);
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;
                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                            this.scene.onomat.visible = true;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);
        
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('rabbitHungerStruggleLeft').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','3',0.1);
                            this.anims.play('rabbitHungerStruggleRight').once('animationcomplete', () => {
                                this.scene.onomat.destroy();
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkWPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('rabbitHungerStruggleUp').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }
                }else if(this.randomInput === 1) {
                    //if s is the key to be pressed then play animation and increase the struggle bar
                    if (this.scene.checkAPressed() === true) {
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }

                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;
                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                            this.scene.onomat.visible = true;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);
        
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('rabbitHungerStruggleLeft').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','3',0.1);
                            this.anims.play('rabbitHungerStruggleRight').once('animationcomplete', () => {
                                this.scene.onomat.destroy();
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkWPressed() === true){
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                            this.struggleCounter += 20;
                            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('rabbitHungerStruggleUp').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }
                }else if(this.randomInput === 2) {
                    if (this.scene.checkAPressed() === true) {
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }

                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;
                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                            this.scene.onomat.visible = true;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);
        
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('rabbitHungerStruggleLeft').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                            this.struggleCounter += 20;
                            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','3',0.1);
                            this.anims.play('rabbitHungerStruggleRight').once('animationcomplete', () => {
                                this.scene.onomat.destroy();
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkWPressed() === true){
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 5 > 0){
                            this.struggleCounter -= 5;
                        }else{
                            this.struggleCounter = 0;
                        }

                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 1){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('rabbitHungerStruggleUp').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }
                }

                // randomizing input
                if (this.randomInputCooldown === false) {
        
                    this.randomInputCooldown = true;
                    this.randomInput = Math.floor((Math.random() * 3));
                    console.log("randomizing the key prompt " + this.randomInput);
                    // important anims.play block so that the animation can player properly.
                    if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                        console.log(" setting keyA display");
                        this.scene.KeyDisplay.playAKey();
                        this.keyAnimationPlayed = true;
                    } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                        console.log(" setting keyW display");
                        this.scene.KeyDisplay.playWKey();
                        this.keyAnimationPlayed = true;
                    }else if (this.keyAnimationPlayed === false && this.randomInput === 2) {
                        console.log(" setting keyD display");
                        this.scene.KeyDisplay.playDKey();
                        this.keyAnimationPlayed = true;
                    }
        
                    let currentRabbit = this;
                    setTimeout(function () {
                        currentRabbit.randomInputCooldown = false;
                        // resets the animation block.
                        currentRabbit.keyAnimationPlayed = false;
                    }, 2000);
                } 

            }

            // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
            // problem is here. on high htz rates this is reducing the struggle couter too quickly. need the proper check
            if (this.struggleCounter > 0 && this.struggleCounter < 200 && this.struggleCounterTick !== true && this.spitUp === false) {
                // this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                this.struggleCounterTick = true;
                // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
                setTimeout(function () {
                    currentrabbit.struggleCounterTick = false;
                }, 10);
                    //console.log('strugglecounter: '+this.struggleCounter);
            }

        }else{

            //hide struggle bar and button
            this.scene.KeyDisplay.visible = false;
            struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            //reset struggle progress between phases.
            this.struggleCounter = 0;
        }

    }

    playerIsStrugglingLogic(){

        let currentrabbit = this;

        if(this.rabbitIsHungry === false && this.playerDamageTimer === false){

            this.playerDamageTimer = true;

            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.curseBuildUp,2);
            }

            setTimeout(function () {
                currentrabbit.playerDamageTimer = false;
            }, 1500);


        }else if(this.rabbitIsHungry === true && this.playerDamageTimer === false){

            this.playerDamageTimer = true;

            //deal 1 hp damager everys second.
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }
                setTimeout(function () {
                        currentrabbit.playerDamageTimer = false;
                }, 1000);


        }

        if(this.rabbitIsHungry === false){

            if(this.startedGrab === false){

                this.anims.play('rabbitGrab',true);

            }
        }else if(this.rabbitIsHungry === true){

            if(this.playerDefeatedAnimationStage === 0){

                if (!this.animationPlayed && this.struggleAnimationInterupt === false) {

                    console.log("the animation has not been played");
                    this.animationPlayed = true;
                    this.scene.initSoundEffect('swallowSFX','2',0.6);
                    
                    //this.scene.onomat.destroy();
                    this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.increaseRight(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);
                    
                    this.anims.play('rabbitHungerSwallow1').once('animationcomplete', () => {
                        console.log("animation finished");
                        this.scene.initSoundEffect('swallowSFX','3',0.6);

                        this.anims.play('rabbitHungerSwallow2').once('animationcomplete', () => {

                            this.scene.initSoundEffect('swallowSFX','3',0.6);

                            this.anims.play('rabbitHungerSwallow3').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.playerDefeatedAnimationStage++;
                                this.inStartDefeatedLogic = false;
                                console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
        
                            });
                        });
                    });
                    
                }
            }else if(this.playerDefeatedAnimationStage === 1 && this.struggleAnimationInterupt === false){
                    this.anims.play("rabbitHungerStruggleIdle", true);
                    this.playStomachSound('3',800); 
                    this.playJumpySound('4',800);
            }
        }
    }

    playerIsDefeatedLogic(playerHealthObject){

        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the rabbit.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        if(this.enemySex === 1){
            this.scene.enemyThatDefeatedPlayer = "femaleRabbit";
        }else{
            this.scene.enemyThatDefeatedPlayer = "maleRabbit";
        }

        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {
            this.scene.KeyDisplay.playDKey();
            let currentrabbit = this; // important, sets currentrabbit to the current object so that we can use variables attached to this current rabbit object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentrabbit.scene.KeyDisplay.visible = true;
                currentrabbit.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;

            //case to make sure defeated stage 2 is not skipped during animation view
            if(this.playerDefeatedAnimationStage !== 1 ||this.playerDefeatedAnimationStage !== 2 || this.inSafeMode === false){
                this.playerDefeatedAnimationStage++;
            }

            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }

        //based on the enemys sex, play different animations. 
        if(this.enemySex === 0){
            if(this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 3 &&
                      this.playerDefeatedAnimationStage !== 7) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentrabbit = this;
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

                this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentrabbit.scene.KeyDisplay.visible = true;
                    currentrabbit.scene.KeyDisplay.playDKey();
                    currentrabbit.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;

                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.maleRabbitDefeatedPlayerAnimation();

        }else{
            if (this.scene.checkDPressed() &&
                this.playerDefeatedAnimationCooldown === false &&
                 this.inStartDefeatedLogic === true &&
                  this.scene.KeyDisplay.visible === true &&
                  this.playerDefeatedAnimationStage !== 1 &&
                     this.playerDefeatedAnimationStage !== 5) {

               this.scene.KeyDisplay.visible = false;
               //this.stageTimer = 0;
               this.playerDefeatedAnimationCooldown = true;
               this.playerDefeatedAnimationStage++;
               let currentrabbit = this;
               console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

               this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
               setTimeout(function () {
                   console.log("defeated animation delay.");
                   currentrabbit.scene.KeyDisplay.visible = true;
                   currentrabbit.scene.KeyDisplay.playDKey();
                   currentrabbit.playerDefeatedAnimationCooldown = false;
               }, 3000);
           }
           // if tab is pressed or the player finished the defeated animations then we call the game over scene.
           if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkDIsDown())) {
                if(this.enemySex === 0){
                    this.scene.enemyThatDefeatedPlayer = "maleRabbit";
                }else{
                    this.scene.enemyThatDefeatedPlayer = "femaleRabbit";
                }
                this.scene.KeyDisplay.visible = false;
               console.log("changing scene");
               this.scene.changeToGameover();
           }
            this.femaleRabbitDefeatedPlayerAnimation();
        }
        
    }

    playerIsDSefeatedVoreLogic(){
        // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the rabbit.
        this.playerDefeated = true;
        //calls emitter to show the tabtoskip graphic
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        if(this.enemySex === 1){
            this.scene.enemyThatDefeatedPlayer = "femaleRabbitVore";
        }else{
            this.scene.enemyThatDefeatedPlayer = "maleRabbitVore";
        }

        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {
            this.scene.KeyDisplay.playDKey();
            let currentrabbit = this; // important, sets currentrabbit to the current object so that we can use variables attached to this current rabbit object in our set timeout functions.
            //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
            // delay the button prompt so the animation can play.
            setTimeout(function () {
                currentrabbit.scene.KeyDisplay.visible = true;
                currentrabbit.scene.KeyDisplay.playDKey();
                //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);
            }, 1000);
            this.inStartDefeatedLogic = true;

            //case to make sure defeated stage 2 is not skipped during animation view
            if(this.playerDefeatedAnimationStage === 1 && this.inSafeMode === false){
                this.playerDefeatedAnimationStage++;
            }

            console.log("this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
        }
        //based on the enemys sex, play different animations. 
            if(this.scene.checkDPressed() &&
                 this.playerDefeatedAnimationCooldown === false &&
                  this.inStartDefeatedLogic === true &&
                   this.scene.KeyDisplay.visible === true &&
                     this.playerDefeatedAnimationStage !== 0 &&
                     this.playerDefeatedAnimationStage !== 2 &&
                     this.playerDefeatedAnimationStage !== 4
                    ) {

                this.scene.KeyDisplay.visible = false;
                //this.stageTimer = 0;
                this.playerDefeatedAnimationCooldown = true;
                this.playerDefeatedAnimationStage++;
                let currentrabbit = this;
                console.log("currentrabbit.playerDefeatedAnimationStage: " + currentrabbit.playerDefeatedAnimationStage);

                this.currentrabbit = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                setTimeout(function () {
                    console.log("defeated animation delay.");
                    currentrabbit.scene.KeyDisplay.visible = true;
                    currentrabbit.scene.KeyDisplay.playDKey();
                    currentrabbit.playerDefeatedAnimationCooldown = false;
                }, 3000);
            }

            // if tab is pressed or the player finished the defeated animations then we call the game over scene.
            if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkDIsDown())) {
                this.scene.KeyDisplay.visible = false;

                console.log("changing scene");
                this.scene.changeToGameover();
            }

            this.RabbitDefeatedPlayerVoreAnimation();

        
    }

    playerEscaped(playerHealthObject){
        this.scene.KeyDisplay.visible = false;
            
            console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {
                    //if the palyer is grabbed, and in the tiger stomach
                    if(this.playerDefeatedAnimationStage === 1 && this.spitUp === false){
                        console.log("activating spit up logic");
                        this.spitUp = true;

                        //spit up sound effect.
                        this.scene.initSoundEffect('swallowSFX','4',0.02);

                        //play spitup animation
                        this.anims.play("rabbitHungerSpitUp").once('animationcomplete', () => {
                            //then free player.
                            this.struggleFree = true;
                        });

                    }else if(this.playerDefeatedAnimationStage === 0){
    
                    this.struggleFree = true;
                        
                    }

                    //hides the mobile controls in the way of the tab/skip indicator.
                    controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                    

                    // if the player if freed do the following to reset the player.
                }else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {

                    this.flipX = false;
                    this.anims.play("rabbitHungerIdle");
                    //resets the enemy variables and player variables.
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    this.keyAnimationPlayed = false;
                    this.scene.grabbed = false;
                    this.scene.player1.visible = true;
                    this.isPlayingMissedAnims = false;
                    this.grabTimer = false;

                    this.startedGrab = false;
                    this.playerDefeatedAnimationStage = 0;
                    this.struggleAnimationInterupt = false;
                    this.spitUp = false;

                    this.attackHitboxActive = false;
                    this.hitboxActive = false;
                    this.attemptingGrab = false;
                    this.swallowDelay  = false;
                    this.attackHitboxActive = false;
                    //player1.setSize(23, 68, true);

                    struggleEmitter.emit(struggleEvent.activateStruggleBar, false);

                    //hides the mobile controls in the way of the tab/skip indicator.
                    controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, true);

                    this.scene.player1.x = this.x;
                    this.scene.player1.y = this.y;
                    this.scene.grabbed = false;
                    this.scene.KeyDisplay.visible = false;
                    // creates a window of time where the player cant be grabbed after being released.
                    // creates a cooldown window so the player does not get grabbed as they escape.
                    let currentRabbit = this;
                    setTimeout(function () {
                        currentRabbit.grabCoolDown = false;
                        currentRabbit.scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 1500);

                    this.shoveCoolDown = true;   
                    setTimeout(function () {
                        currentRabbit.shoveCoolDown = false;
                        console.log("shoveCoolDown has ended. player can be grabbed agian.");
                    }, 2000);
            }   
    }

    // controls the damage resistance of the rabbit.
    damage() {

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

                this.playJumpySound('2',700);
                
                if (this.enemyHP <= 0) {
                    if (this.enemyHP <= 0) {

                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drop chance
                    let dropChance = Math.round((Math.random() * ((75) - (60 * this.scene.player1.dropChance)) + (60 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * ((3 * this.scene.player1.dropAmount) - (1 * this.scene.player1.dropAmount)) + 3));

                    this.setDepth(4);

                    //decides amount of slime drops based on size
                    if( dropChance > 0){
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,23,1,dropAmount,"BUNNY FLUFF","SOFT BALLS OF BUNNY FUR","drop",5);
                    }

                    this.anims.play('rabbitDefeatedFall').once('animationcomplete', () => {

                        this.enemyInDefeatedLogic = true;

                        //delete enemy hit box since they have been defeated.
                        this.attackHitBox.x = this.x;
                        this.attackHitBox.y = this.y + 3000; 
                        this.grabHitBox.x = this.x;
                        this.grabHitBox.y = this.y + 3000; 
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

    enemyDefeatedLogic(){
        this.setVelocityX(0);
        this.anims.play('rabbitDefeatedFallIdle', true);
        
        this.attackHitBox.x = this.x;
        this.attackHitBox.y = this.y + 3000; 
        this.grabHitBox.x = this.x;
        this.grabHitBox.y = this.y + 3000; 

    }

    //handles damage types for blue rabbit. get these damage types from the attack that hits the enemy
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

    // plays the rabbit defeated player animations.
    maleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {

            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 8;

            if (!this.animationPlayed) {

                this.animationPlayed = true;
                //plays cute jumpy sound for shove
                this.jumpySoundCoolDown = false;
                this.playJumpySound('4',700);

                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    
                });
            }
        } else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitGrind', true);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                this.scene.onomat = new makeText(this.scene,this.x+10,this.y+15,'charBubble',"RUB!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(700);
                
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 800);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            if (!this.animationPlayed) {

                

                this.playPlapSound('plap1',1800);

                this.scene.onomat = new makeText(this.scene,this.x+15,this.y+10,'charBubble',"SLOOORRRP!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);
            
                this.animationPlayed = true;
                this.anims.play('rabbitPenetrate').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                    if (this.scene.internalView) {
                        this.scene.internalView.destroy();
                    }
                    this.scene.internalView = new internalView(this.scene,this.x,this.y+60,'rabbit')
                    this.scene.internalView.anims.play("rabbitPening1");
                    this.scene.internalView.setRotation(3.14);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitRail1', true);
            this.scene.internalView.anims.play("rabbitPening1",true);
            this.playPlapSound('plap3',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 600);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            this.anims.play('rabbitRail2', true);
            this.scene.internalView.anims.play("rabbitPening2",true);
            this.playPlapSound('plap9',1000);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(400);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 400);
            }
           
        } else if (this.playerDefeatedAnimationStage === 6) {
            this.anims.play('rabbitRail3', true);
            this.scene.internalView.anims.play("rabbitPening3",true);
            this.playPlapSound('plap9',500);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 300);
            }
           
        } else if (this.playerDefeatedAnimationStage === 7) {
            if (!this.animationPlayed) {
                //plays curse sound effect
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.scene.internalView.anims.play("rabbitClimax");

                this.scene.onomat = new makeText(this.scene,this.x+20,this.y+12,'charBubble',"SQUIRT");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.increaseRight(700);
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    
                    if (this.scene.playerSex === 0) {
                        return setTimeout(() => {
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                        }, 2000)
                    }
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage += 2;
                    this.scene.internalView.destroy();
                    
                    //this.scene.internalView.destroy();
                });
            }
        } else if (this.playerDefeatedAnimationStage === 8) {
            this.anims.play('rabbitRail4', true);
            this.scene.internalView.anims.play("rabbitPening4",true);
            this.playPlapSound('plap3', 850);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+13,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(.25);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 500);
            }
        }
    }

    // plays the rabbit defeated player animations.
    femaleRabbitDefeatedPlayerAnimation() {
        let currentrabbit = this;
        if (this.playerDefeatedAnimationStage === 1) {

            //sets the ending value correctly once this enemy defeated animation activates.
            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
            
                this.animationPlayed = true;
                //plays cute jumpy sound for shove
                this.jumpySoundCoolDown = false;
                this.playJumpySound('4',700);

                this.anims.play('rabbitShove').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    this.jumpySoundCoolDown = false;
                    this.playJumpySound('3',700);

                    if(this.scene.playerSex === 0){
                        this.scene.internalView = new internalView(this.scene,this.x+35,this.y+60,'rabbit')
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation(3.14/3);
                    }

                });
            }
        }else if (this.playerDefeatedAnimationStage === 2) {
            this.anims.play('rabbitHump1', true);

            this.playPlapSound('plap3',800);

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 600);
            }
           
        } else if (this.playerDefeatedAnimationStage === 3) {
            this.anims.play('rabbitHump2', true);

            this.playPlapSound('plap9',1000);

            if(this.scene.playerSex === 0){
               this.scene.internalView.anims.play("pen2",true);
            }

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(400);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 400);
            }
           
        } else if (this.playerDefeatedAnimationStage === 4) {
            this.anims.play('rabbitHump3', true);

            this.playPlapSound('plap9',500);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen3",true);
            }

            let thisrabbit = this;
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX+30,this.y-randY+20,'charBubble',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                setTimeout(function () {
                    thisrabbit.onomatPlayed = false;
                }, 300);
            }
           
        } else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {
                //plays curse sound effect
                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInRabbit");
                 }
                this.scene.initSoundEffect('curseSFX','curse',0.3);
                this.animationPlayed = true;
                this.anims.play('rabbitClimax').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                });
            }
        }
    }

    RabbitDefeatedPlayerVoreAnimation(){

         
        switch(this.playerDefeatedAnimationStage) {

           
            case 0:
                this.playerDefeatedAnimationStageMax = 5;

                if (!this.animationPlayed) {

                        console.log("the animation has not been played");
                        this.animationPlayed = true;
                        this.scene.initSoundEffect('swallowSFX','2',0.6);
                        
                        //this.scene.onomat.destroy();
                        this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                        this.scene.onomat.visible = this.scene.onomatopoeia;
                        this.scene.onomat.setScale(1/4);
                        this.scene.onomat.increaseRight(600);
                        this.scene.onomat.textFadeOutAndDestroy(600);
                        
                        this.anims.play('rabbitHungerSwallow1').once('animationcomplete', () => {
                            console.log("animation finished");
                            this.scene.initSoundEffect('swallowSFX','3',0.6);

                            this.anims.play('rabbitHungerSwallow2').once('animationcomplete', () => {

                                this.scene.initSoundEffect('swallowSFX','3',0.6);

                                this.anims.play('rabbitHungerSwallow3').once('animationcomplete', () => {
                                    this.animationPlayed = false;
                                    this.playerDefeatedAnimationStage++;
                                    this.inStartDefeatedLogic = false;
                                    console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
            
                                });
                            });
                        });       
                }
                break;
            case 1:
                console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
                if (!this.animationPlayed) {
                    this.animationPlayed = true;
                    
                    let random = Math.floor((Math.random() * 3)+1);
                    console.log(random);
                    if(random === 3){
                        this.scene.initSoundEffect('stomachSFX','8',0.5);
                        this.anims.play("rabbitHungerStruggleUp", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        });  
                    }else if(random === 2){
                        this.scene.initSoundEffect('stomachSFX','3',0.1);
                        this.anims.play("rabbitHungerStruggleRight", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        }); 
                    }else{
                         this.scene.initSoundEffect('stomachSFX','4',0.1);
                        this.anims.play("rabbitHungerStruggleLeft", true).once('animationcomplete', () => {
                            this.animationPlayed = false;
                        });
                    
                    }
                }

                break;
            case 2:
                if (!this.animationPlayed) {

                        console.log("the animation has not been played");
                        this.animationPlayed = true;
                        this.scene.initSoundEffect('swallowSFX','2',0.6);
                        
                        //this.scene.onomat.destroy();
                        this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                        this.scene.onomat.visible = this.scene.onomatopoeia;
                        this.scene.onomat.setScale(1/4);
                        this.scene.onomat.increaseRight(600);
                        this.scene.onomat.textFadeOutAndDestroy(600);
                        this.scene.initSoundEffect('stomachSFX','1',0.03);
                        this.anims.play('rabbitHungerDigestion1').once('animationcomplete', () => {
                            console.log("animation finished");
                           
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false;
                            
                        });       
                }
                break;
            case 3:
                 this.playJumpySound('3',700);
                    this.anims.play('rabbitHungerDigestionIdle',true);
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
            
                break;
            case 4:
                    if (!this.animationPlayed) {

                        console.log("the animation has not been played");
                        this.animationPlayed = true;
                        
                        //this.scene.onomat.destroy();
                        this.scene.initSoundEffect('stomachSFX','1',0.03);
                        this.anims.play('rabbitHungerDigestion2').once('animationcomplete', () => {
                            console.log("animation finished");
                           
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false;
                            
                        });       
                }
                break;
             case 5:
                    this.anims.play('rabbitHungerDigestedIdle',true);
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
            
                break;
            default:
              // code block
        }
    
    }

    //function to show off animation 
    animationGrab(){

        let currentRabbit = this;
        //first checks if beeDrone object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.rabbitGrabFalse();
            this.isViewingAnimation = true;
            this.playerProgressingAnimation = false;

            this.scene.gameoverLocation = "forestGameover";

        //if the player is grabbed then.
        } else if(this.playerGrabbed === true) {

            //object is on view layer 5 so enemy is infront of others.
            this.setDepth(5);

            //hides the mobile controls in the way of the tab/skip indicator.
            controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);

            //plays jumpy sound during grab.
            if (this.playerProgressingAnimation === false) {
                this.playJumpySound('3',700);
            }

            //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
            let playerHealthObject = {
                playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
         
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            
            //if the player is not defeated
            if (this.playerProgressingAnimation === false) {

                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 100;

                if(this.rabbitIsHungry === true){
                    
                }else{
                    this.anims.play("rabbitGrab",true);
                    //handles sound effect diring grab struggle
                    this.playJumpySound('2',700);
                }
                

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
                
                //calls animation grab code until the animation is finished                     //additional case since the female has one less animation stage with the male rabbit.
                console.log("this.scene.playerSex: ",this.scene.playerSex,"  this.playerDefeatedAnimationStage: ", this.playerDefeatedAnimationStage, " this.playerDefeatedAnimationStageMax: ",this.playerDefeatedAnimationStageMax);
                if(this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax || ( this.enemySex === 0 && this.scene.playerSex === 1 && this.playerDefeatedAnimationStage <= this.playerDefeatedAnimationStageMax+1)){
                    //handle the defeated logic that plays defeated animations 
                    if(this.rabbitIsHungry === false){
                        this.playerIsDefeatedLogic(playerHealthObject);
                    }else{

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
