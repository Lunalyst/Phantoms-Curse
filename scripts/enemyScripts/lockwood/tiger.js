
//implementation for the tiger enemy.
class tiger extends enemy {
    
    constructor(scene, xPos, yPos, sex, id,inSafeMode) {
        //super() calls the constructor() from the parent class we are extending
        //console.log("scene.preferance: ",scene.preferance);
        if(scene.preferance === 0){
            super(scene, xPos, yPos, sex, id, 100, 'tigerMale');
            this.enemySex = 0;
        }else if(scene.preferance === 1){
            super(scene, xPos, yPos, sex, id, 100, 'tigerFemale');
            this.enemySex = 1;
        
        //if the pref is either, then we randomly pick a sex for the bat.
        
        }else{
            let randomPref = Math.floor((Math.random() * 2));
            console.log('randomPref',randomPref);
            if(randomPref === 0){
                super(scene, xPos, yPos, sex, id, 100, 'tigerMale');
                this.enemySex = 0;
            }else{
                super(scene, xPos, yPos, sex, id, 100, 'tigerFemale');
                this.enemySex = 1;
            }
        }
        
        this.body.setGravityY(600); // sets gravity 
       
        this.randomMoveTimer = Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity = Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity = Math.floor((Math.random() * 100) + 100);
        //value used to tell if the player can escape.

        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;

        this.taunting = false;
        this.jumped = false;
        
        this.struggleCounterTick = false;
        this.TigerDamageCounter = false;
        this.isHidding = true;
        this.noticedPlayer = false;
        this.peakActivated = false;
        this.noticeRangeOuter = 240;
        this.noticeRangeInner = 225;
        this.noticedAndHiddenOuter = 224;
        this.playerInOuterRange = false;

        this.activateTigerRange = 150;
        this.playerEnteredActivationRange = false;
        this.activatedSuprise = false;

        this.jumpAnimationPlayed = false;
        this.playerEnteredHidingSpace = false;

        this.tigerIsEating = false;
        this.tigerHasEatenRabbit = false;

        this.grabTimer = false;

        this.struggleAnimationInterupt = false;

        this.spitUp = false;

        this.maleTigerGameoverCheck = false;
        this.maleTigerStroking = false;

         //make a hitbox so the cat can grab the player.
         this.grabHitBox = new hitBoxes(scene,this.x,this.y);
         this.grabHitBox.setSize(45,10,true);
         this.hitboxActive = false;
         this.attemptingGrab = false;
         this.isPlayingMissedAnims = false;

        this.enemyHP = 30;
        console.log("this.enemySex: ",this.enemySex);
        if(this.enemySex === 1) {
            //defines tiger animations based on the players sex.
            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('tigerFemale', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingPeak', frames: this.anims.generateFrameNames('tigerFemale', { start: 1, end: 3 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'hidingCheckLeft', frames: this.anims.generateFrameNames('tigerFemale', { start: 4, end: 4 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingCheckMiddle', frames: this.anims.generateFrameNames('tigerFemale', { start: 3, end: 3 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingCheckRight', frames: this.anims.generateFrameNames('tigerFemale', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hide', frames: this.anims.generateFrameNames('tigerFemale', { start: 6, end: 9 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'suprise', frames: this.anims.generateFrameNames('tigerFemale', { start: 9, end: 19 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerIdle', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 20 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'tigerWalk', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 29 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerRun', frames: this.anims.generateFrameNames('tigerFemale', { start: 20, end: 29 }), frameRate: 13, repeat: -1 });
            this.anims.create({ key: 'tigerJumpStart', frames: this.anims.generateFrameNames('tigerFemale', { start: 30, end: 32 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerInAir', frames: this.anims.generateFrameNames('tigerFemale', { start: 33, end: 33 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tigerFemale', { start: 34, end: 45 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTauntLoop', frames: this.anims.generateFrameNames('tigerFemale', { start: 34, end: 45 }), frameRate: 7, repeat: -1 });
            //adding enemy sprite extension to prevent loading issues.
            this.anims.create({ key: 'tigerWalkBigBooba', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 0, end: 9 }), frameRate: 9, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowMaleRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 10, end: 16 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerSwallowFemaleRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 61, end: 67 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerSwallowRabbitMiddle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 17, end: 26 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerDigestRabbit', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 102, end: 116 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'tigerStartGrab', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 113, end: 115}), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerMissGrab', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 116, end: 118}), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerStartBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 117, end: 119 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerMissBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 120, end: 122 }), frameRate: 8, repeat: 0 });

            //male animations
            if (sex === 0) {
                this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerFemale', { start: 46, end: 59 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerFemale', { start: 60, end: 63 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerFemale', { start: 65, end: 71 }), frameRate: 7, repeat: 0 });

                this.anims.create({ key: 'tigerBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 27, end: 30 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaLayDown', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 31, end: 39 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerBoobaSnuggle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 40, end: 43 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaHump1', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 44, end: 47 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaHump2', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 44, end: 47 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaCurse', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 48, end: 56 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 57, end: 60 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'tigerSplitUpPlayer', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 85, end: 98}), frameRate: 7, repeat: 0 });
            //female animations    
            } else if(sex === 1) {

                this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerFemale', { start: 72, end: 85 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerFemale', { start: 86, end: 89 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerFemale', { start: 90, end: 97 }), frameRate: 7, repeat: 0 });

                this.anims.create({ key: 'tigerBoobaGrab', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 68, end: 71 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaLayDown', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 72, end: 80 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerBoobaSnuggle', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 81, end: 84 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaHump1', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 85, end: 88 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaHump2', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 85, end: 88 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'tigerBoobaCurse', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 89, end: 97 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerFemaleExtension', { start: 98, end: 101 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'tigerSplitUpPlayer', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 99, end: 112}), frameRate: 7, repeat: 0 });
            
            }
            //this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tigerFemale', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallow2', frames: this.anims.generateFrameNames('tigerFemale', { start: 98, end: 102 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 103-103, end: 106-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 107-103, end: 110-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 111-103, end: 114-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 115-103, end: 118-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobbleIdle', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 111-103, end: 118-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 119-103, end: 129-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 130-103, end: 136-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 137-103, end: 151-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 151-103, end: 154-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 155-103, end: 166-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 167-103, end: 171-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyRestArms', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 172-103, end: 173-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax3', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 174-103, end: 178-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummybreastSquish', frames: this.anims.generateFrameNames('tigerFemaleDigestion', { start: 179-103, end: 186-103 }), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'tigerDefeatedFall', frames: this.anims.generateFrameNames('tigerFemaleDefeated', { start: 0, end: 3}), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerDefeatedLoop', frames: this.anims.generateFrameNames('tigerFemaleDefeated', { start: 4, end: 7}), frameRate: 7, repeat: -1 });
            
        }else{

            this.anims.create({ key: 'hiding', frames: this.anims.generateFrameNames('tigerMale', { start: 0, end: 0 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingPeak', frames: this.anims.generateFrameNames('tigerMale', { start: 1, end: 3 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'hidingCheckLeft', frames: this.anims.generateFrameNames('tigerMale', { start: 4, end: 4 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingCheckMiddle', frames: this.anims.generateFrameNames('tigerMale', { start: 3, end: 3 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hidingCheckRight', frames: this.anims.generateFrameNames('tigerMale', { start: 5, end: 5 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hide', frames: this.anims.generateFrameNames('tigerMale', { start: 6, end: 9 }), frameRate: 20, repeat: 0 });
            this.anims.create({ key: 'suprise', frames: this.anims.generateFrameNames('tigerMale', { start: 9, end: 19 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerIdle', frames: this.anims.generateFrameNames('tigerMale', { start: 20, end: 20 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'tigerWalk', frames: this.anims.generateFrameNames('tigerMale', { start: 20, end: 29 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerRun', frames: this.anims.generateFrameNames('tigerMale', { start: 20, end: 29 }), frameRate: 13, repeat: -1 });
            this.anims.create({ key: 'tigerJumpStart', frames: this.anims.generateFrameNames('tigerMale', { start: 30, end: 32 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerInAir', frames: this.anims.generateFrameNames('tigerMale', { start: 33, end: 33 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTaunt', frames: this.anims.generateFrameNames('tigerMale', { start: 34, end: 45 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTauntLoop', frames: this.anims.generateFrameNames('tigerMale', { start: 34, end: 45 }), frameRate: 7, repeat: -1 });


            //adding enemy sprite extension to prevent loading issues.
            this.anims.create({ key: 'tigerWalkBigBooba', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 0, end: 9 }), frameRate: 9, repeat: -1 });
            this.anims.create({ key: 'tigerSwallowMaleRabbit', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 10, end: 16 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerSwallowFemaleRabbit', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 63, end: 69 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerSwallowRabbitMiddle', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 17, end: 26 }), frameRate: 12, repeat: 0 });
            this.anims.create({ key: 'tigerDigestRabbit', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 107, end: 120 }), frameRate: 7, repeat: 0 });

            this.anims.create({ key: 'tigerStartGrab', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 122, end: 124}), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerMissGrab', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 125, end: 127}), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerStartBoobaGrab', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 122, end: 124 }), frameRate: 8, repeat: 0 });
            this.anims.create({ key: 'tigerMissBoobaGrab', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 125, end: 126 }), frameRate: 8, repeat: 0 });

            //male animations
            if (sex === 0) {
                this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerMale', { start: 46, end: 59 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerMale', { start: 60, end: 63 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerMale', { start: 65, end: 71 }), frameRate: 7, repeat: 0 });

                this.anims.create({ key: 'tigerBenisRide', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 27, end: 30 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBenisPen', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 31, end: 38 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerBenisSmash1', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 39, end: 42 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBenisSmash2', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 43, end: 46 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'tigerClimaxCurse', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 47, end: 54 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerInflatedPlayer', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 55, end: 58 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 59, end: 62 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'tigerSplitUpPlayer', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 94, end: 107}), frameRate: 7, repeat: 0 });
            //female animations    
            } else if(sex === 1) {
                this.anims.create({ key: 'tigerGrab', frames: this.anims.generateFrameNames('tigerMale', { start: 72, end: 85 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerStruggle', frames: this.anims.generateFrameNames('tigerMale', { start: 86, end: 89 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerSwallow1', frames: this.anims.generateFrameNames('tigerMale', { start: 90, end: 97 }), frameRate: 7, repeat: 0 });

                this.anims.create({ key: 'tigerBenisRide', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 70, end: 73 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBenisPen', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 74, end: 82 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerBenisSmash1', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 82, end: 85 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerBenisSmash2', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 86, end: 89 }), frameRate: 12, repeat: -1 });
                this.anims.create({ key: 'tigerClimaxCurse', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 90, end: 97 }), frameRate: 7, repeat: 0 });
                this.anims.create({ key: 'tigerInflatedPlayer', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 98, end: 101 }), frameRate: 7, repeat: -1 });
                this.anims.create({ key: 'tigerCubGameover', frames: this.anims.generateFrameNames('tigerMaleExtension', { start: 102, end: 105 }), frameRate: 7, repeat: -1 });

                this.anims.create({ key: 'tigerSplitUpPlayer', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 108, end: 121}), frameRate: 7, repeat: 0 });
            
            }
            //this.anims.create({ key: 'tigerStruggleBreakRight', frames: this.anims.generateFrameNames('tigerMale', { start: 58, end: 62 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerSwallow2', frames: this.anims.generateFrameNames('tigerMale', { start: 98, end: 102 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyPush1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 103-103, end: 106-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyPush2', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 107-103, end: 110-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobble1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 111-103, end: 114-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobble2', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 115-103, end: 118-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyWobbleIdle', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 111-103, end: 118-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummySquish1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 119-103, end: 129-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyRumble1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 130-103, end: 136-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyDigestion1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 137-103, end: 151-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax1', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 151-103, end: 154-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummyDigestion2', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 155-103, end: 166-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax2', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 167-103, end: 171-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyRestArms', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 172-103, end: 173-103 }), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerTummyrelax3', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 174-103, end: 178-103 }), frameRate: 7, repeat: -1 });
            this.anims.create({ key: 'tigerTummyBallSquish', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 76, end: 83 }), frameRate: 5, repeat: 3 });
            this.anims.create({ key: 'tigerTummyShaftGrab', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 84, end: 85}), frameRate: 5, repeat: 0 });
            this.anims.create({ key: 'tigerTummyShaftStroke', frames: this.anims.generateFrameNames('tigerMaleDigestion', { start: 86, end: 93}), frameRate: 5, repeat: -1 });
            this.anims.create({ key: 'tigerDefeatedFall', frames: this.anims.generateFrameNames('tigerMaleDefeated', { start: 0, end: 3}), frameRate: 7, repeat: 0 });
            this.anims.create({ key: 'tigerDefeatedLoop', frames: this.anims.generateFrameNames('tigerMaleDefeated', { start: 4, end: 7}), frameRate: 7, repeat: -1 });
           
        }

        this.inSafeMode = inSafeMode;

       
        if(this.inSafeMode === true){
            this.anims.play("tigerTauntLoop",true); 
        }else{
            this.anims.play("tigerTaunt",true);
        }
        
    }

    //functions that move tiger objects.
    move(){
                
        //sets the gravity for tiger
        this.body.setGravityY(600);
        //possitions her sprite box correctly along with her hitbox
        this.setSize(100, 253, true);
        this.setOffset(120, 25);

        //if the tiger is hungry then
        if(this.tigerHasEatenRabbit === false && this.enemyDefeated === false){

            if(this.tigerIsEating === true){
                this.setVelocityX(0);
    
            }else if(this.isHidding === false && this.tigerIsEating === false ){
                
                //console.log("this.grabTimer: ",this.grabTimer," this.attemptingGrab:",this.attemptingGrab );
                //console.log("this.body.blocked.down: ",this.body.blocked.down,"this.jumped: ",this.jumped,"this.jumpAnimationPlayed: ",this.jumpAnimationPlayed,);
    
                //checks to see if enemy is in range of player
                if (this.checkXRangeFromPlayer(600, 600) ) {
                    
                    if(this.body.blocked.down && (this.checkXRangeFromPlayer(40, 40) && this.checkYRangeFromPlayer(20,50) && this.grabTimer === false && this.jumped === false)){
                        
                        console.log("starting grab animation");
                        //play animation
                        this.setVelocityX(0);
                        this.grabTimer = true;
        
                        //if player to the left move the grab hitbox to the left
                        if(this.scene.player1.x < this.x){
                            this.flipX = true;
                        }else{
                            this.flipX = false;
                        }
    
                        this.setDepth(6);
                        if (!this.jumpAnimationPlayed) {
                            this.jumpAnimationPlayed = true;
                            this.anims.play('tigerStartGrab').once('animationcomplete', () => {
                                this.playJumpySound('3',700);
        
                                this.hitboxActive = true;
                                this.grabHitBox.body.enable = true;
                                this.attemptingGrab = true;
                                
                                this.jumpAnimationPlayed = false;
                                //controls the x velocity when the bee ischarging to grab the player
                                
                            });
                        }
    
                    }else if(this.body.blocked.down && this.attemptingGrab === true  && this.jumped === false ){

                        console.log("grab animation missed");

                        this.setVelocityX(0);

                        if(this.isPlayingMissedAnims === false){
                            this.isPlayingMissedAnims = true;
                            //set value to play missed grabb animation
                            
                            this.anims.play('tigerMissGrab').once('animationcomplete', () => {
                                this.setDepth(5);
                                this.hitboxActive = false;
                                this.attemptingGrab = false;
                                this.grabTimer = false;
                                this.isPlayingMissedAnims = false;    
                            });
                        }
                    
                    //if the player is out of range of the player in the y axis, then taunt player.
                    }else if(this.body.blocked.down && this.y-100 > this.scene.player1.y && this.taunting === false && this.grabTimer === false && this.scene.grabbed === false){

                        console.log("player too high so tiger is taunting");

                        //set taunting to true
                        this.taunting = true;
                        //stop velocity
                        this.setVelocityX(0);
                        //play animation then
                        this.anims.play('tigerTaunt').once('animationcomplete', () => { 
                            this.taunting = false; 
                        });
    
                    //if the player is to the right and above tiger then jump towards the player
                    }else if(this.body.blocked.down && this.y > this.scene.player1.y && this.x < this.scene.player1.x && this.jumped === false && this.taunting === false && this.grabTimer === false && this.scene.grabbed === false) {
                        //console.log("jumping right")

                        console.log("tiger is jumping right");

                        this.jumped = true;

                        this.setVelocityX(0);
                          
                        if (!this.jumpAnimationPlayed) {
                            this.jumpAnimationPlayed = true;
    
                            //animation getting interupted causing things to break.
                            this.flipX = false;
                            this.anims.play('tigerJumpStart').once('animationcomplete', () => {
                                this.jumpAnimationPlayed = false;
                                if(this.tigerIsEating === false && this.scene.grabbed === false && this.grabTimer === false){
                                this.setVelocityY(250*-1);
                                }
                                this.grabTimer = false;
                                let currentTiger = this;
                                setTimeout(function () {
                                    currentTiger.jumped = false;
                                    if(currentTiger.playerGrabbed === false && currentTiger.grabTimer === false && currentTiger.tigerIsEating === false && currentTiger.scene.grabbed === false){
                                        currentTiger.setVelocityX(310);
                                    }
                                }, 160);
    
                                this.anims.play('tigerInAir');
                            
                            });
                        
                        }
    
                    //if the player is to the right and above tiger then jump towards the player
                    }else if(this.body.blocked.down && this.y > this.scene.player1.y  && this.x > this.scene.player1.x && this.jumped === false && this.taunting === false && this.grabTimer === false && this.scene.grabbed === false ) {
                        //console.log("jumping left")
                        
                        console.log("tiger is jumping left");

                        this.jumped = true;

                        this.setVelocityX(0);
                           
                        if (!this.jumpAnimationPlayed) {
                            this.jumpAnimationPlayed = true;
    
                            this.flipX = true;
                            this.anims.play('tigerJumpStart').once('animationcomplete', () => {
                                this.jumpAnimationPlayed = false;
                                if(this.tigerIsEating === false && this.scene.grabbed === false && this.grabTimer === false){
                                    this.setVelocityY(250*-1);
                                }
                                
                                this.grabTimer = false;
                                let currentTiger = this;
                                setTimeout(function () {
                                    if(currentTiger.playerGrabbed === false && currentTiger.grabTimer === false && currentTiger.tigerIsEating === false && currentTiger.scene.grabbed === false){
                                        currentTiger.setVelocityX(310*-1);
                                    }
                                    currentTiger.jumped = false;
                                }, 160);
    
                                this.anims.play('tigerInAir');
                            
                            });
                        
                        }
    
                    //if the player is to the right then move enemy to the right
                    }else if(this.body.blocked.down && this.scene.player1.x > this.x+10 && this.taunting === false && this.grabTimer === false && this.attemptingGrab === false) {
                        
                        console.log("tiger is walking right");

                        this.direction = "right";
                        this.jumpAnimationPlayed = false; 
                        
                        this.flipX = false;
                        this.anims.play('tigerRun', true);
                        this.setVelocityX(310); 
                
                    //if the player is to the right then move enemy to the left
                    } else if (this.body.blocked.down && this.scene.player1.x < this.x-10 && this.taunting === false && this.grabTimer === false && this.attemptingGrab === false) {
                            
                        console.log("tiger is walking left");

                        this.direction = "left";
                        this.jumpAnimationPlayed = false;
                        this.flipX = true;
                        this.anims.play('tigerRun', true);
                        this.setVelocityX(310*-1); 
                        
                    //otherwise if the enemy is on the ground then
                    } else if (this.body.blocked.down && this.taunting === false && this.grabTimer === false) {
                        
                        console.log("tiger is idling");
                        //player idle animation in the correct direction
                        if(this.direction === "left"){
                            this.flipX = true;
                            this.anims.play('tigerIdle', true);
                        }else if(this.direction === "right") {
                            this.flipX = false;
                            this.anims.play('tigerIdle', true);
                        }
    
                        //sets velocity to zero since the enemy should not be moving.
                        this.setVelocityX(0);
                    }
    
                    if(this.body.blocked.down){
                        this.jumped = false;
                    }
                   
                }else{
                    this.setVelocityX(0);
        
                }
    
            //if the tiger has not been activated, stay in hiding logic
            }else if(this.isHidding === true){
    
                //if the player enters the activation range
                if (this.playerEnteredActivationRange === false && this.checkRangeFromPlayer(this.activateTigerRange, this.activateTigerRange, this.activateTigerRange, this.activateTigerRange)){
                    //set value to true
                    this.playerEnteredActivationRange = true;
    
                //so when thep player leaves the range
                }else if(this.playerEnteredActivationRange === true && !this.checkRangeFromPlayer(this.activateTigerRange, this.activateTigerRange, this.activateTigerRange, this.activateTigerRange)){
                    
                    //play animation of tiger emerging from bush
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.scene.initSoundEffect('bushSFX','1',1);
                        this.anims.play('suprise').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.scene.initSoundEffect('bushSFX','2',1);
                            //start logic for tiger chasing player.
                            this.isHidding = false;
                        });
                    }
    
                //player hasnt been noticed but is within tigers range
                }else if(this.noticedPlayer === false && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.peakActivated = true;
                    if (!this.animationPlayed) {
                        this.animationPlayed = true;
                        this.scene.initSoundEffect('bushSFX','1',1);
                        this.anims.play('hidingPeak').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.noticedPlayer =true;
                        });
                    }
                    
                //if the player hasn't been noticed and isnt in range
                }else if(this.noticedPlayer === false && this.peakActivated === false){
    
                    //keep tiger hidden
                    this.flipX = false;
                    this.scene.initSoundEffect('bushSFX','1',1);
                    this.anims.play('hiding', true);
    
                //if the player has been noticed and is to the right, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x + this.noticeRangeInner && this.scene.player1.x < this.x + this.noticeRangeOuter)){
    
                    this.flipX = false;
                    this.anims.play('hidingCheckRight', true);
                    //this.scene.initSoundEffect('bushSFX','2',1);
                    this.playerInOuterRange = false;
    
                //if the player has been noticed and is to the left, look at them
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x - this.noticeRangeOuter && this.scene.player1.x < this.x - this.noticeRangeInner)){
    
                    this.flipX = false;
                    this.anims.play('hidingCheckLeft', true);
                    //this.scene.initSoundEffect('bushSFX','2',1);
                    this.playerInOuterRange = false;
    
                //once the player is spotted, hide agian
                }else if(this.noticedPlayer === true && (this.scene.player1.x > this.x  - this.noticedAndHiddenOuter && this.scene.player1.x < this.x + this.noticedAndHiddenOuter)){
                    //plays the hiding animation
                    this.activatedSuprise = true;
                    if (!this.animationPlayed && this.playerInOuterRange === false) {
                        this.animationPlayed = true;
                        this.flipX = false;
                        this.scene.initSoundEffect('bushSFX','2',1);
                        this.anims.play('hide').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.playerInOuterRange = true;
                            this.scene.initSoundEffect('bushSFX','1',1);
                        });
                    //if hiding animation has been played, play hide animation
                    }else if (this.playerInOuterRange === true && this.activatedSuprise === false){
                        //console.log('this.playerInOuterRange === true');
                        this.flipX = false;
                        this.anims.play('hiding', true);
                    }
                }  
            }
            
        //else the tiger has eaten so do different logic
        }else if(this.enemyDefeated === false){

            if(this.checkXRangeFromPlayer(40, 40) && this.checkYRangeFromPlayer(20,50) && this.grabTimer === false){
                        
                console.log("starting booba grab animation");
                //play animation
                this.setVelocityX(0);
                this.grabTimer = true;

                //if player to the left move the grab hitbox to the left
                if(this.scene.player1.x < this.x){
                    this.flipX = true;
                }else{
                    this.flipX = false;
                }

                this.setDepth(6);
                if (!this.jumpAnimationPlayed) {
                    this.jumpAnimationPlayed = true;
                    this.anims.play('tigerStartBoobaGrab').once('animationcomplete', () => {
                        this.playJumpySound('3',700);

                        this.hitboxActive = true;
                        this.grabHitBox.body.enable = true;
                        this.attemptingGrab = true;
                        
                        this.jumpAnimationPlayed = false;
                        //controls the x velocity when the bee ischarging to grab the player
                        
                    });
                }

            }else if(this.attemptingGrab === true){

                console.log("grab booba animation missed");

                this.setVelocityX(0);

                if(this.isPlayingMissedAnims === false){
                    this.isPlayingMissedAnims = true;
                    //set value to play missed grabb animation
                    
                    this.anims.play('tigerMissBoobaGrab').once('animationcomplete', () => {
                        this.setDepth(5);
                        this.hitboxActive = false;
                        this.attemptingGrab = false;
                        this.grabTimer = false;
                        this.isPlayingMissedAnims = false;    
                    });
                }
            
            
            }else if(this.body.blocked.down && this.scene.player1.x > this.x && this.attemptingGrab === false && this.grabTimer === false) {
                            
                this.direction = "right";
                this.jumpAnimationPlayed = false; 
                
                this.flipX = false;
                this.anims.play('tigerWalkBigBooba', true);
                this.setVelocityX(70); 
        
            //if the player is to the right then move enemy to the left
            } else if (this.body.blocked.down && this.scene.player1.x < this.x && this.attemptingGrab === false && this.grabTimer === false) {
                    
                this.direction = "left";
                this.jumpAnimationPlayed = false;
                this.flipX = true;
                this.anims.play('tigerWalkBigBooba', true);
                this.setVelocityX(70*-1); 
                
            //otherwise if the enemy is on the ground then
            } else if (this.body.blocked.down && this.attemptingGrab === false && this.grabTimer === false) {

                //player idle animation in the correct direction
                if(this.direction === "left"){
                    this.flipX = true;
                    this.anims.play('tigerIdle', true);
                }else if(this.direction === "right") {
                    this.flipX = false;
                    this.anims.play('tigerIdle', true);
                }

                //sets velocity to zero since the enemy should not be moving.
                this.setVelocityX(0);
            }
        }

        //handles hit box positioning
        if(this.hitboxActive === true){

            //hitbox should be to left if player is to the left
            if(this.flipX === true){
                //console.log("moving cat hitbox to the left");
                this.grabHitBox.x = this.x-20;

            //otherwise put it to the right.
            }else{
                //console.log("moving cat hitbox to the right");
                this.grabHitBox.x = this.x+20;
            }
            this.grabHitBox.y = this.y;

        }else{
            this.grabHitBox.x = this.x;
            this.grabHitBox.y = this.y + 3000; 
        }
        
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.tigerPreviousY = this.y;
    }

    //simple idle function played when the player is grabbed by something that isnt this enemy.
    moveIdle() {
        this.setVelocityX(0);
        this.grabTimer = false;
        if(this.isHidding === false){
            //player idle animation in the correct direction 
            if(this.tigerHasEatenRabbit === false && this.enemyDefeated === false){
                this.anims.play('tigerTaunt', true);
            }else if(this.tigerHasEatenRabbit === false && this.enemyDefeated === true){
                this.anims.play('tigerDefeatedLoop', true);
            }else{
                this.anims.play('tigerTummybreastSquish', true);
            }
            
            //sets velocity to zero since the enemy should not be moving.
            this.body.setGravityY(600);
        }
        this.setVelocityX(0);
        //object is on view layer 4 so idling enemys dont overlap current one.
        this.setDepth(4);
    }

    // functioned called to play animation when the player is defeated by the enemy in gameover.
    gameOver(version) {
        
        //puts the sprite and hitbox in the correct locations.
        this.setSize(100, 253, true);
        this.setOffset(120, 25);

        //plays game over animation
        if(this.enemySex === 1){
            if(version === 1){
                this.anims.play('tigerCubGameover',true);
            }else{
                if(this.enemySex === 1){
                    this.anims.play('tigerTummybreastSquish',true);
                }else{
                    this.anims.play('tigerTummyShaftStroke',true);
                }
            }
        }else{
            if(version === 1){
                this.anims.play('tigerCubGameover',true);
            }else{
                if(this.maleTigerGameoverCheck === false){
                    this.maleTigerGameoverCheck = true;

                    this.anims.play('tigerTummyBallSquish').once('animationcomplete', () => {
                        this.anims.play('tigerTummyShaftGrab').once('animationcomplete', () => {
                            this.maleTigerStroking = true;
                            this.anims.play('tigerTummyShaftStroke',true);
                        });
                    });


                }
                
            } 
        }
        
        
    }

    //function called to play tiger eating animations.
    tigerEatsRabbit(rabbitSex){
       //sets velocity to zero since the enemy should not be moving.
       this.setVelocityX(0);

        // decides if the male or female rabbit is being eaten.
        this.tigerIsEating = true;
        let rabbitSexFlag = 'tigerSwallowMaleRabbit';
        if(rabbitSex === 1){
            rabbitSexFlag = 'tigerSwallowFemaleRabbit';
        }
        
        //plays long string of animations to show the tiger eating the rabbit and digesting her meal.
        this.scene.initSoundEffect('swallowSFX','2',0.6);
        this.anims.play(rabbitSexFlag).once('animationcomplete', () => {
            this.scene.initSoundEffect('swallowSFX','3',0.6);
            this.anims.play('tigerSwallowRabbitMiddle').once('animationcomplete', () => {
                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble1').once('animationcomplete', () => {
                        this.scene.initSoundEffect('stomachSFX','6',0.1);
                        this.anims.play('tigerTummyWobble2').once('animationcomplete', () => {
                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                                this.scene.initSoundEffect('stomachSFX','1',0.03);
                                this.anims.play('tigerDigestRabbit').once('animationcomplete', () => {
                                    this.scene.initSoundEffect('stomachSFX','2',0.03);
                                    this.anims.play('tigerTummyDigestion2').once('animationcomplete', () => {
                                        this.anims.play('tigerTummyrelax2').once('animationcomplete', () => {
                                            this.tigerIsEating = false;
                                            this.tigerHasEatenRabbit = true;
                                            this.enemyHP = 60;
            
                                        });
                                    });
                                
                                }); 
                            });
                        }); 
                    }); 
                
            }); 
        });
    }
    
    //the grab function. is called when player has overlaped with an enemy.
    grab() {

        this.clearTint();
        //console.log("this.playerGrabbed: ",this.playerGrabbed);
        // moves player attackhitbox out of the way.
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {
           
            this.tigerGrabFalse();

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

            this.tigerGrabTrue(playerHealthObject);

            //displays the give up option on screen
            giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,true);
            
            if (this.playerDefeated === false) {

                this.playerIsNotDefeatedInputs(playerHealthObject);

                //allows the player to press tab to let the enemy defeat them
                this.tabToGiveUp();
            }

            // these cases check if the player should be damages over time if grabbed. if so then damage the player based on the size of the slime.
            if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter <= 100 && this.TigerDamageCounter === false) {
                
                this.playerIsStrugglingLogic(playerHealthObject);

            } 
            
            //if player escapes then do escape logic.
            if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax && this.struggleCounter >= 100 ) {

                //if the player escapes hide the give up indicator.
                giveUpIndicatorEmitter.emit(giveUpIndicator.activateGiveUpIndicator,false);

                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                
                this.playerEscaped(playerHealthObject);

            }else if (playerHealthObject.playerHealth === 0 && this.tigerHasEatenRabbit === false) {

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
                
                //defeated animation logic.
                this.playerIsDefeatedLogic(playerHealthObject);
            }else if (playerHealthObject.playerCurse === playerHealthObject.playerCurseMax && this.tigerHasEatenRabbit === true) {

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
                
                //defeated animation logic.
                if(this.enemySex === 1){
                    this.playerplayerIsDefeatedLogicBooba(playerHealthObject);
                }else{
                    this.playerplayerIsDefeatedLogicBenis(playerHealthObject);
                }
            }
            // if the player breaks free then do the following
            
        }

    }

    tigerGrabFalse(){

        //console.log("this.playerGrabbed",this.playerGrabbed);
        this.scene.player1.visible = false;
        // makes the key prompts visible.
        this.scene.KeyDisplay.visible = true;

        this.playerGrabbed = true;
        //if the player is grabbed then do the following.

    }

    tigerGrabTrue(playerHealthObject){

        // stopps velocity once player is grabbed
        this.setVelocityX(0);
        
        //plays bouncy sound during the struggle animation if the tiger has eaten.
        if(this.tigerHasEatenRabbit === true && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax){
            let randomInt = Math.ceil(Math.random() * (10 - 6) + 6);
            let sound = ''+randomInt;
            //console.log("randomInt: ", randomInt);
            //console.log("sound: ", sound);
            this.playJumpySound(sound,700);
        }
        

        //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
        // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
        this.scene.player1.y = this.y - 150;
        this.scene.KeyDisplay.x = this.x;
        this.scene.KeyDisplay.y = this.y + 100;
        //console.log("this.scene.KeyDisplay: ",this.scene.KeyDisplay);

    }

    playerIsNotDefeatedInputs(playerHealthObject){
        //if we arnt actively phase tranistioning.
        if(this.animationPlayed === false){

            //show struggle button, and bar
            this.scene.KeyDisplay.visible = true;

            if (this.keyAnimationPlayed === false && this.tigerHasEatenRabbit === true) {
                console.log(" setting keyA display");
                this.scene.KeyDisplay.playAKey();
                this.keyAnimationPlayed = true;
            }

            struggleEmitter.emit(struggleEvent.activateStruggleBar, true);

            // if the player has not eaten the rabbit
            if(this.tigerHasEatenRabbit === false){
                //handle random inputs
                if (this.randomInput === 0) {

                    //if s is the key to be pressed then play animation and increase the struggle bar
                    if (this.scene.checkSPressed() === true) {
                        
                        //reduce struggle meter by an amount
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                            this.struggleCounter += 20;
                            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;
                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                            this.scene.onomat.visible = true;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);
        
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('tigerTummySquish1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','3',0.1);
                            this.anims.play('tigerTummyPush1').once('animationcomplete', () => {
                                this.scene.onomat.destroy();
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkAPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-9,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','5',0.1);
                            this.anims.play('tigerTummyPush2').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkWPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }
                } else if (this.randomInput === 1) {
                    // important anims.play block so that the animation can player properly.
                    if (this.scene.checkWPressed() === true) {
                        
                        if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                            this.struggleCounter += 20;
                            struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                            console.log('strugglecounter: ' + this.struggleCounter);
                        }

                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            this.struggleAnimationInterupt = true;

                            //play the down animation for the struggle event
                            this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','8',0.5);
                            this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    }else if (this.scene.checkSPressed() === true) {
                        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        //if the striggule animation is false and the defeated stage is 2
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;
                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                            this.scene.onomat.visible = true;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);
        
                            this.scene.initSoundEffect('stomachSFX','4',0.1);
                            this.anims.play('tigerTummySquish1').once('animationcomplete', () => {
                                this.animationPlayed = false;
                                this.scene.onomat.destroy();
                                this.struggleAnimationInterupt = false;
                            });
                        }
                    //otherwise play struggle animation of other keys but subtract from the struggle bar.
                    }else if(this.scene.checkDPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);

                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','3',0.1);
                            this.anims.play('tigerTummyPush1').once('animationcomplete', () => {
                                this.scene.onomat.destroy();
                                this.animationPlayed = false;
                                this.struggleAnimationInterupt = false;
                            });
                        }

                    }else if(this.scene.checkAPressed() === true){
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                        
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        
                        if(this.struggleAnimationInterupt === false && this.playerDefeatedAnimationStage === 2){

                            //play the down animation for the struggle event
                            this.struggleAnimationInterupt = true;

                            this.scene.onomat = new makeText(this.scene,this.x-9,this.y+35,'charBubble',"GURGLE");
                            this.scene.onomat.visible = this.scene.onomatopoeia;
                            this.scene.onomat.setScale(1/4);
                            this.scene.onomat.textBuldgeDown(600);
                            this.scene.onomat.textFadeOutAndDestroy(600);

                            this.scene.initSoundEffect('stomachSFX','5',0.1);
                            this.anims.play('tigerTummyPush2').once('animationcomplete', () => {
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
                    this.randomInput = Math.floor((Math.random() * 2));
                    console.log("randomizing the key prompt " + this.randomInput);
                    // important anims.play block so that the animation can player properly.
                    if (this.keyAnimationPlayed === false && this.randomInput === 0) {
                        console.log(" setting keyS display");
                        this.scene.KeyDisplay.playSKey();
                        this.keyAnimationPlayed = true;
                    } else if (this.keyAnimationPlayed === false && this.randomInput === 1) {
                        console.log(" setting keyW display");
                        this.scene.KeyDisplay.playWKey();
                        this.keyAnimationPlayed = true;
                    }
        
                    let currentTiger = this;
                    setTimeout(function () {
                        currentTiger.randomInputCooldown = false;
                        // resets the animation block.
                        currentTiger.keyAnimationPlayed = false;
                    }, 2000);
                } 

            }else if(this.tigerHasEatenRabbit === true){
                //console.log('TIGER HAS HEATED RABBIT STRUGGLE LOGIC.');
                if (this.scene.checkAPressed() === true) {
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                    if (playerHealthObject.playerHealth >= 1 && playerHealthObject.playerCurse !== playerHealthObject.playerCurseMax) {
                        this.struggleCounter += 20;
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
                }else if(this.scene.checkDPressed() === true || this.scene.checkWPressed() === true || this.scene.checkSPressed() === true ){
                    if (playerHealthObject.playerHealth >= 1) {
        
                        //makes sure the struggle bar does not go into the negitives
                        if(this.struggleCounter - 21 > 0){
                            this.struggleCounter -= 21;
                        }else{
                            this.struggleCounter = 0;
                        }
                            
                        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                        //console.log('strugglecounter: ' + this.struggleCounter);
                    }
        
                }

                this.keyAnimationPlayed = true;    
            }

            // reduces the struggle counter over time.
            if (this.struggleCounter > 0 && this.struggleCounter < 100 && this.struggleCounterTick !== true) {
                // this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                this.struggleCounterTick = true;
                struggleEmitter.emit(struggleEvent.updateStruggleBar,this.struggleCounter);
                // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
                let currentTiger =this;
                setTimeout(function () {
                    currentTiger.struggleCounterTick = false;
                }, 10);
                //console.log('strugglecounter: '+this.struggleCounter);
            }
        //otherwise we are in a phase transition so hide the keyprompts.
        }else{

            //hide struggle bar and button
            this.scene.KeyDisplay.visible = false;
            struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
            //reset struggle progress between phases.
            this.struggleCounter = 0;
        }
    
    }
    
    playerIsStrugglingLogic(playerHealthObject){

        let currentTiger = this;

        //damage functions for tiger having eaten rabbit
        if(this.tigerHasEatenRabbit === true && this.playerDamageTimer === false){

            this.playerDamageTimer = true;

            if(this.animationPlayed === false){
                healthEmitter.emit(healthEvent.curseBuildUp,3);
            }

            setTimeout(function () {
                currentTiger.playerDamageTimer = false;
            }, 1500);

        //if the tiger hasnt eaten a rabbit
        }else if(this.tigerHasEatenRabbit === false && this.playerDamageTimer === false && this.startedGrab === true){

            this.playerDamageTimer = true;

            //if the player is above 75% health
            if(playerHealthObject.playerHealth >= (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 2 hp damager everys second.
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }
                setTimeout(function () {
                        currentTiger.playerDamageTimer = false;
                }, 1000);

            }else if(playerHealthObject.playerHealth < (playerHealthObject.playerMaxHealth/4) * 3){

                //deal 3 hp damager everys second.
                if(this.animationPlayed === false){
                    healthEmitter.emit(healthEvent.loseHealth,1);
                }

                setTimeout(function () {
                    currentTiger.playerDamageTimer = false;
                }, 800);
            }
            

        }

        //function for tiger has eaten, so handle animations for that
        if(this.tigerHasEatenRabbit === true){

            if(this.startedGrab === false){

                if (this.onomatPlayed === false) {

                    this.onomatPlayed = true;
                    let randX = Math.floor((Math.random() * 15));
                    let randY = Math.floor((Math.random() * 15));
                    this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY,'charBlack',"@heart@");
                    this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                    this.scene.heartOnomat1.setScale(1/4);
                    this.scene.heartOnomat1.textFadeOutAndDestroy(600);
    
                    let thisTiger = this;
                    setTimeout(function () {
                        thisTiger.onomatPlayed = false;
                    }, 600);
                }
                if(this.enemySex === 1){
                    this.anims.play('tigerBoobaGrab',true);
                }else{
                    this.anims.play('tigerBenisRide',true);
                }
            }
        //otherwise perform tiger logic with rabbit not eaten.
        }else if(this.tigerHasEatenRabbit === false){

            //start of grab does licking animation
            if(this.startedGrab === false && this.animationPlayed === false){

                this.animationPlayed = true;

                this.scene.initSoundEffect('lickSFX','5',0.5);

                this.scene.onomat = new makeText(this.scene,this.x-11,this.y-30,'charBubble',"LICK!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.anims.play('tigerGrab').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.startedGrab = true;
                    this.animationPlayed = false;
                });
            

            }else if(this.playerDefeatedAnimationStage === 0 && this.startedGrab === true){
                this.anims.play("tigerStruggle", true);
                this.playJumpySound('2',700);

            }else if(this.playerDefeatedAnimationStage === 1){

                if(!this.animationPlayed && this.struggleAnimationInterupt === false) {

                    console.log("the animation has not been played");
                    this.animationPlayed = true;
                    this.scene.initSoundEffect('swallowSFX','2',0.6);
                    
                    //this.scene.onomat.destroy();
                    this.scene.onomat = new makeText(this.scene,this.x,this.y-50,'charBubble',"GULP!");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.increaseRight(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);
                    
                    this.anims.play('tigerSwallow1').once('animationcomplete', () => {
                        console.log("animation finished");
                        this.scene.initSoundEffect('swallowSFX','3',0.6);

                        this.anims.play('tigerSwallow2').once('animationcomplete', () => {
                            this.animationPlayed = false;
                            this.playerDefeatedAnimationStage++;
                            this.inStartDefeatedLogic = false;
                            console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
    
                        });
                    });
                    
                }
            }else if(this.playerDefeatedAnimationStage === 2 && this.struggleAnimationInterupt === false){
                this.anims.play("tigerTummyWobbleIdle", true);
                this.playStomachSound('3',800); 
            }

            //apply phase transitions based on player hp

            //case to progress defeated stage, soo that we can have different struggle animations.
            //in this case, if the player health is less than half there max health and the stage is 0
            if(playerHealthObject.playerHealth < (playerHealthObject.playerMaxHealth/4) * 3 && this.playerDefeatedAnimationStage === 0 && this.startedGrab === true){
                //increment the stage so behavior changes.
                this.playerDefeatedAnimationStage++;
            }

        }

    }

    playerIsDefeatedLogic(playerHealthObject){
        this.playerDefeated = true;
        
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);

        if(this.enemySex === 1){
            this.scene.enemyThatDefeatedPlayer = bestiaryKey.tigerFemaleVore;
        }else{
            this.scene.enemyThatDefeatedPlayer = bestiaryKey.tigerMaleVore;
        }
        

        // if we start the player defeated animation then we need to set a few things.
        if (this.inStartDefeatedLogic === false) {

                this.scene.KeyDisplay.playWKey();
                let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentTiger.scene.KeyDisplay.visible = true;
                    currentTiger.scene.KeyDisplay.playWKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                     console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;
                //if()
                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
                //case to make sure defeated stage 2 is not skipped during animation view
                if(this.playerDefeatedAnimationStage !== 2 || this.inSafeMode === false){
                    this.playerDefeatedAnimationStage++;
                }
                
                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
         }


                if (this.scene.checkWPressed() && 
                    this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationCooldown === false &&
                    this.inStartDefeatedLogic === true &&
                     this.playerDefeatedAnimationStage !== 1 &&
                      this.playerDefeatedAnimationStage !== 3 &&
                       this.playerDefeatedAnimationStage !== 5 &&
                       this.playerDefeatedAnimationStage !== 6 &&
                       this.playerDefeatedAnimationStage !== 7) {

                    this.scene.KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    let currentTiger = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        currentTiger.scene.KeyDisplay.visible = true;
                        currentTiger.scene.KeyDisplay.playWKey();
                        currentTiger.playerDefeatedAnimationCooldown = false
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 8 && this.scene.checkWIsDown())) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimation();
    }

    //players defeated animation for when the a rabbit has been eaten.
    playerplayerIsDefeatedLogicBooba(){
        this.playerDefeated = true;
        
        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
        this.scene.enemyThatDefeatedPlayer = bestiaryKey.tigerFemaleTF;

        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playWKey();
                let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentTiger.scene.KeyDisplay.visible = true;
                    currentTiger.scene.KeyDisplay.playWKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                     console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;

                if(this.playerDefeatedAnimationStage !== 2){
                    this.playerDefeatedAnimationStage++;
                }

                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
         }


                if (this.scene.checkWPressed() && 
                    this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationCooldown === false &&
                    this.inStartDefeatedLogic === false &&
                     this.playerDefeatedAnimationStage !== 1 &&
                       this.playerDefeatedAnimationStage !== 5) {

                    this.scene.KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    let currentTiger = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        currentTiger.scene.KeyDisplay.visible = true;
                        currentTiger.scene.KeyDisplay.playWKey();
                        currentTiger.playerDefeatedAnimationCooldown = false
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 6 && this.scene.checkWIsDown())) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimationBooba();

    }

    playerplayerIsDefeatedLogicBenis(){

        this.playerDefeated = true;

        skipIndicatorEmitter.emit(skipIndicator.activateSkipIndicator,true);
        this.scene.enemyThatDefeatedPlayer = bestiaryKey.tigerMaleTF;

        // if we start the player defeated animation then we need to set a few things.
        if (this.playerDefeatedAnimationStage === 0) {
                this.scene.KeyDisplay.playWKey();
                let currentTiger = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                // delay the button prompt so the animation can play.
                setTimeout(function () {
                    currentTiger.scene.KeyDisplay.visible = true;
                    currentTiger.scene.KeyDisplay.playWKey();
                    //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                     console.log("currentTiger.playerDefeatedAnimationStage: " + currentTiger.playerDefeatedAnimationStage);
                }, 1000);
                this.inStartDefeatedLogic = true;

                if(this.playerDefeatedAnimationStage !== 2){
                    this.playerDefeatedAnimationStage++;
                }

                console.log(" in main this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);
                
         }


                if (this.scene.checkWPressed() && 
                    this.scene.KeyDisplay.visible === true &&
                    this.playerDefeatedAnimationCooldown === false &&
                    this.inStartDefeatedLogic === false &&
                     this.playerDefeatedAnimationStage !== 1 &&
                    this.playerDefeatedAnimationStage !== 4) {

                    this.scene.KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationCooldown = true;
                    this.playerDefeatedAnimationStage++;
                    console.log(" in check this.playerDefeatedAnimationStage: " + this.playerDefeatedAnimationStage);

                    let currentTiger = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function () {
                        console.log("defeated animation delay.");
                        currentTiger.scene.KeyDisplay.visible = true;
                        currentTiger.scene.KeyDisplay.playWKey();
                        currentTiger.playerDefeatedAnimationCooldown = false
                    }, 3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if (this.scene.checkSkipIndicatorIsDown() || (this.playerDefeatedAnimationStage > 5 && this.scene.checkWIsDown())) {
                    this.scene.KeyDisplay.visible = false;
                    console.log("changing scene");
                    this.scene.changeToGameover();
                }

                //console.log("player defeated by small slime");
                this.defeatedPlayerAnimationBenis();

    }

    playerEscaped(playerHealthObject){

            this.scene.KeyDisplay.visible = false;
            
            console.log("this.struggleFree: ", this.struggleFree,"this.spitUp: ",this.spitUp, "this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if (this.struggleFree === false && playerHealthObject.playerHealth >= 1) {
                    //if the palyer is grabbed, and in the tiger stomach
                    if(this.playerDefeatedAnimationStage === 2 && this.spitUp === false){

                        this.spitUp = true;

                        //spit up sound effect.
                        this.scene.initSoundEffect('swallowSFX','4',0.02);

                        //play spitup animation
                        this.anims.play("tigerSplitUpPlayer").once('animationcomplete', () => {
                            //then free player.
                            this.struggleFree = true;
                        });

                    }else if(this.playerDefeatedAnimationStage === 0){
    
                    this.struggleFree = true;
                        
                    }

                    //hides the mobile controls in the way of the tab/skip indicator.
                    controlKeyEmitter.emit(controlKeyEvent.toggleForStruggle, false);
                    

                    // if the player if freed do the following to reset the player.
                } else if (this.struggleFree === true && playerHealthObject.playerHealth >= 1) {
                    this.flipX = false;
                    this.anims.play("tigerIdle");
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    //this.anims.play("tigerStruggleBreakRight", true);
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
                    let currentTiger = this;
                    setTimeout(function () {
                        currentTiger.grabCoolDown = false;
                        currentTiger.scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                    }, 1500);
                }
    }

    damage() {
        this.setVelocityX(0);

        console.log("this.damageCoolDown:" + this.damageCoolDown,"this.isHidding:" + this.isHidding);
        if (this.damageCoolDown === false && this.isHidding === false) {
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            console.log("activating damage function");
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

                    //remove colliders since we no longer need them.
                    this.removeColliders();

                    //set enemy defeated to true, so the move behavior cant interupt the game over animations.
                    this.enemyDefeated = true;
                    this.setVelocityX(0);

                    //calculate item drop chance
                    let dropChance = Math.round((Math.random() * ((75) - (45 * this.scene.player1.dropChance)) + (45 * this.scene.player1.dropChance))/100);
                    let dropAmount = Math.round((Math.random() * (3 * this.scene.player1.dropAmount)) + 1);

                    this.setDepth(4);

                    //decides amount of slime drops based on size
                    if( dropChance > 0){
                        console.log("dropAmount: ",dropAmount);
                        this.scene.initItemDrop(this.x + (Math.random() * (20 - 10) + 10)-10,this.y,15,1,dropAmount,"TIGER CLAW","SHARP TIGER CLAW. COULD BE DANGEROUS.","drop",5);
                    }

                    this.anims.play('tigerDefeatedFall').once('animationcomplete', () => {

                        this.enemyInDefeatedLogic = true;

                        
                        //delete enemy hit box since they have been defeated.
                        this.grabHitBox.destroy();
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

    enemyDefeatedLogic(){
        this.anims.play('tigerDefeatedLoop', true);
    }
   
    calcDamage(slice, blunt, pierce, heat, lightning, cold,curse) {
        console.log("slice " + slice + " blunt " + blunt + " pierce " + pierce + " heat " + heat + " lightning " + lightning + " cold " + cold);
        if (slice > 0) {
            this.enemyHP -= (slice / 2);
        }
        if (blunt > 0) {
            this.enemyHP -= (blunt / 2);
        }
        if (pierce > 0) {
            this.enemyHP -= (pierce / 2);
        }
        if (heat > 0) {
            this.enemyHP -= (heat * 2);
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

    // plays the tiger defeated player animations.
    defeatedPlayerAnimation() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;

            this.playerDefeatedAnimationStageMax = 9;

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

                console.log("this.scene.onomat: ",this.scene.onomat);
                
                this.anims.play('tigerSwallow1').once('animationcomplete', () => {
                    console.log("animation finished");
                    this.scene.initSoundEffect('swallowSFX','3',0.6);

                    //onomat.textWob();

                    this.anims.play('tigerSwallow2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.playerDefeatedAnimationStage++;
                        this.inStartDefeatedLogic = false;
                        console.log("this.playerDefeatedAnimationStage: ",this.playerDefeatedAnimationStage);

                    });
                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            //make a random number from 0-5
            //console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            let randomInt = Math.floor(Math.random() * 6);
            //console.log("randomInt", randomInt)
            if (!this.animationPlayed) {
               
                this.animationPlayed = true;
                if(randomInt === 0){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GURGLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','3',0.1);
                    this.anims.play('tigerTummyPush1').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;

                    });
                }else if(randomInt === 1){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+35,'charBubble',"GURGLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','5',0.1);
                    this.anims.play('tigerTummyPush2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });

                }else if(randomInt === 2){

                    this.scene.onomat = new makeText(this.scene,this.x-9,this.y+18,'charBubble',"WOBBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textSquishLeft(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 3){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+18,'charBubble',"WOBBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textSquishRight(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','6',0.1);
                    this.anims.play('tigerTummyWobble2').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 4){

                    this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"GLORP");
                    this.scene.onomat.visible = true;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','4',0.1);
                    this.anims.play('tigerTummySquish1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                    });
                    
                }else if(randomInt === 5){

                    this.scene.onomat = new makeText(this.scene,this.x-12,this.y+35,'charBubble',"RUMBLE");
                    this.scene.onomat.visible = this.scene.onomatopoeia;
                    this.scene.onomat.setScale(1/4);
                    this.scene.onomat.textBuldgeDown(600);
                    this.scene.onomat.textFadeOutAndDestroy(600);

                    this.scene.initSoundEffect('stomachSFX','8',0.5);
                    this.anims.play('tigerTummyRumble1').once('animationcomplete', () => {
                        this.animationPlayed = false;
                        this.scene.onomat.destroy();
                        
                    });
                    
                }
                
            }

        } else if (this.playerDefeatedAnimationStage === 3) {
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"CHURN!");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.scene.initSoundEffect('stomachSFX','1',0.03);
                this.animationPlayed = true;
                this.anims.play('tigerTummyDigestion1').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 4) {
               
                    this.anims.play('tigerTummyrelax1',true);
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
            
                
        }else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {

                this.scene.onomat = new makeText(this.scene,this.x-11,this.y+35,'charBubble',"SHRINK...");
                this.scene.onomat.visible = this.scene.onomatopoeia;
                this.scene.onomat.setScale(1/4);
                this.scene.onomat.textWave();
                this.scene.onomat.textFadeOutAndDestroy(1000);

                this.animationPlayed = true;
                this.scene.initSoundEffect('stomachSFX','2',0.03);
                this.scene.initSoundEffect('burpSFX','3',0.3);
                this.anims.play('tigerTummyDigestion2').once('animationcomplete', () => {
                    this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
        }else if (this.playerDefeatedAnimationStage === 6) {
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyrelax2').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
            }
            
        }else if (this.playerDefeatedAnimationStage === 7) {
    
            if (!this.animationPlayed) {
                this.animationPlayed = true;
                this.anims.play('tigerTummyRestArms').once('animationcomplete', () => {
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
                });
               
            }
        }else if (this.playerDefeatedAnimationStage === 8) {
               
            this.anims.play('tigerTummyrelax3',true);
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);
    
        
        }
    }

    defeatedPlayerAnimationBooba() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;

            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
                console.log("the animation has not been played");
                this.animationPlayed = true;
                
                console.log("this.scene.onomat: ",this.scene.onomat);
                
                this.anims.play('tigerBoobaLayDown').once('animationcomplete', () => {

                    console.log("animation finished");
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;

                    if(this.scene.playerSex === 0 && this.flipX === true){
                        this.scene.internalView = new internalView(this.scene,this.x+10,this.y+60,'tiger');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation((3.14)+(3.14)/3);
                    }else if(this.scene.playerSex === 0){
                        this.scene.internalView = new internalView(this.scene,this.x-10,this.y+60,'tiger');
                        this.scene.internalView.visible = this.scene.internalViewBool;
                        this.scene.internalView.anims.play("pen1",true);
                        this.scene.internalView.setRotation(-(3.14)/3);
                    }

                });
                

            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {
            
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);
                let thisTiger = this;
                setTimeout(function () {
                    thisTiger.onomatPlayed = false;
                }, 600);
            }
            this.playJumpySound('2',700);

            this.anims.play('tigerBoobaSnuggle',true);
            
        } else if (this.playerDefeatedAnimationStage === 3) {

            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)

            this.playPlapSound('plap3',700);
            this.playJumpySound('3',700);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen2",true);
            }
             
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisTiger = this;
                setTimeout(function () {
                    thisTiger.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('tigerBoobaHump1',true);

        }else if (this.playerDefeatedAnimationStage === 4) {
               
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

            this.playPlapSound('plap9',500);

            this.playJumpySound('4',500);

            if(this.scene.playerSex === 0){
                this.scene.internalView.anims.play("pen3",true);
            }

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                let tempTiger = this;
                setTimeout(function () {
                    tempTiger.onomatPlayed = false;
                }, 300);
            }

            this.anims.play('tigerBoobaHump2',true);
                 
        }else if (this.playerDefeatedAnimationStage === 5) {
            if (!this.animationPlayed) {

                if(this.scene.playerSex === 0){
                    this.scene.internalView.anims.play("playerClimaxInTiger");
                 }

                this.scene.initSoundEffect('curseSFX','curse',0.3);
               
                this.animationPlayed = true;
                //this.scene.initSoundEffect('stomachSFX','2',0.03);
                this.anims.play('tigerBoobaCurse').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

                    
                });
            }
        }
    }

    defeatedPlayerAnimationBenis() {
        if (this.playerDefeatedAnimationStage === 1) {
            //this.animationPlayed = false;

            this.playerDefeatedAnimationStageMax = 6;

            if (!this.animationPlayed) {
                console.log("the animation has not been played");
                this.animationPlayed = true;

                this.playPlapSound('plap1',1800);
                
                console.log("this.scene.onomat: ",this.scene.onomat);
                
                this.anims.play('tigerBenisPen').once('animationcomplete', () => {

                    console.log("animation finished");
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    this.inStartDefeatedLogic = false;
                });
                
            }
            
        } else if (this.playerDefeatedAnimationStage === 2) {

            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage)

            this.playPlapSound('plap9',500);
            this.playJumpySound('3',700);
             
            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(600);

                let thisTiger = this;
                setTimeout(function () {
                    thisTiger.onomatPlayed = false;
                }, 600);
            }

            this.anims.play('tigerBenisSmash1',true);

        }else if (this.playerDefeatedAnimationStage === 3) {
               
            console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

            this.playPlapSound('plap10',500);

            this.playJumpySound('4',500);

            if (this.onomatPlayed === false) {
                this.onomatPlayed = true;
                let randX = Math.floor((Math.random() * 15));
                let randY = Math.floor((Math.random() * 15));
                this.scene.heartOnomat1 = new makeText(this.scene,this.x-randX,this.y-randY+35,'charBlack',"@heart@");
                this.scene.heartOnomat1.visible = this.scene.onomatopoeia;
                this.scene.heartOnomat1.setScale(1/4);
                this.scene.heartOnomat1.textFadeOutAndDestroy(300);
                let tempTiger = this;
                setTimeout(function () {
                    tempTiger.onomatPlayed = false;
                }, 300);
            }

            this.anims.play('tigerBenisSmash2',true);
                 
        }else if (this.playerDefeatedAnimationStage === 4) {

            if (!this.animationPlayed) {

                this.scene.initSoundEffect('curseSFX','curse',0.3);
               
                this.animationPlayed = true;
                //this.scene.initSoundEffect('stomachSFX','2',0.03);
                this.anims.play('tigerClimaxCurse').once('animationcomplete', () => {
                    //this.scene.onomat.destroy();
                    this.animationPlayed = false;
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage",this.playerDefeatedAnimationStage);

                    
                });
            }
        }else if(this.playerDefeatedAnimationStage === 5){
            this.anims.play('tigerInflatedPlayer',true);
            this.playPlapSound('plap3',1000);
        }
    }

    //function to show off animation 
    animationGrab(){

        //first checks if bat object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        
        //stops the x velocity of the enemy
        this.setVelocityX(0);
       
        this.scene.attackHitBox.y = this.scene.player1.y + 10000;
        // if the grabbed is false but this function is called then do the following.
        if (this.playerGrabbed === false) {

            this.tigerGrabFalse();
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

                // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
                //puts the key display in the correct location.
                this.scene.KeyDisplay.visible = true;
                this.scene.KeyDisplay.x = this.x;
                this.scene.KeyDisplay.y = this.y + 100;
                // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
                
                //this.inStartDefeatedLogic = true;

                if(this.tigerHasEatenRabbit === true){
                    //play struggle animation and sounds.
                    if(this.enemySex === 1){
                        this.anims.play("tigerBoobaGrab", true);
                    }else{
                        this.anims.play("tigerBenisRide", true);
                    }
                }else{
                    this.anims.play("tigerStruggle",true);
                }
                //handles sound effect diring grab struggle
                this.playJumpySound('2',700);

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
                    if(this.tigerHasEatenRabbit === true){
                        //defeated animation logic.
                        if(this.enemySex === 1){
                            this.playerplayerIsDefeatedLogicBooba(playerHealthObject);
                        }else{
                            this.playerplayerIsDefeatedLogicBenis(playerHealthObject);
                        }
                    } else{
                        this.playerIsDefeatedLogic(playerHealthObject);
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
