/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
https://docs.idew.org/video-game/project-references/phaser-coding/enemy-behavior
// example enemy behaviors
*/
//at one hp cannot escape from small slime
//if grabbed right at the start of mitosis animation break.
//key display not under player near the boarder of the screen. fix by setting location of key to directly under player while in grabbed animation need to convert from screne x y to world xy
//set player x after grab to be located on the slime animation
// if player collides with two slimes at once then  they both play grabbed animation
let currentSlime;
class blueSlime extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, xPos, yPos,sex){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'blueSlime');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
        this.lastmove = "left";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
        this.slimePreviousY = 0;
        this.body.setGravityY(600); // sets gravity 
        //this.setPushable(false);
        this.slimeSize = 1;
        this.moveCycleTimer = 0;
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.mitosing = false;
        this.SlimeAnimationPosition; 
        this.mitosisCounter = 0;
        this.struggleFree = 0;
        this.grabCoolDown = 0;
        this.slimeId = 0;
        this.largeSlimeDamageCounter = 0;
        this.playerDefeated = false;
        this.playerBrokeFree = 0;
        this.playerDefeatedAnimationStage = 0;
        this.stageTimer = 0;
        this.stageNumber = 2;
        this.body.bounce.x = 1;
        this.slimeHp = 20;
        this.damageCoolDown = false;
        this.hitboxOverlaps = false;
        this.animationPlayed = false;
    
       
        
        
        console.log("sex passed in slime: "+sex);
        //defines Slime animations.
        if(sex === 0){
            this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 0, end: 4 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 7, end: 7 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 15, end: 20 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabBreak',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 21, end: 23 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'slimeGrabFallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 25, end: 30 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 30, end: 33 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 34, end: 36 }),frameRate: 7,repeat: 1});
            this.anims.create({key: 'slimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 36, end: 39 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 40, end: 45 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 46, end: 52 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 53, end: 56 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated7',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 56, end: 66 }),frameRate: 7,repeat: 0});
        }else{
            this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 0, end: 4 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 7, end: 7 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 15, end: 20 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabBreak',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 21, end: 23 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'slimeGrabFallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 25, end: 30 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 30, end: 33 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 34, end: 36 }),frameRate: 7,repeat: 1});
            this.anims.create({key: 'slimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 36, end: 39 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 40, end: 45 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 46, end: 52 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 53, end: 56 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated7',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 56, end: 66 }),frameRate: 7,repeat: 0});
        }

      
       
    }

    //functions that move slime objects.
    moveSlime(player1){
        //console.log("moving slime, player x"+player1.x+" slime x:"+this.x+" move cycle:"+ this.moveCycle+"move cycle timer: "+this.moveCycleTimer);
        //console.log("previous slime y: "+ this.slimePreviousY+" current slime y:"+this.y);
        //if the slime is of size 1 then set its hit box to the correct size
        if(this.slimeSize === 1){
        this.setSize(30,20,true);
        this.body.setGravityY(600);
        //else if the slime is size 2 then set its hit box to the correct size
        }else if(this.slimeSize === 2){
            this.setSize(40,34,true);
            this.body.setGravityY(600);
        }
        //this.movecycletimer is used to keep track of the slime movement. its incrimented to 100 and then set to zero so it loops
        if(this.moveCycleTimer === 200){
            this.moveCycleTimer = 0;
        }
        //checks to see if slime should jump to move if the player is in range
        if(player1.x > this.x-400 && player1.x < this.x+400){
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if(player1.x > this.x && this.moveCycleTimer > 180){
                //this if statement checks where the slime is in its jump cycle. if its going up then it plays the up animation
                if(this.slimePreviousY > this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                //otherwise it plays falling down animation
                }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                // jumps the slime to the right
                if(this.slimeSize === 1){
                    this.setVelocityX(150);
                    this.setVelocityY(-160); 
                }else if(this.slimeSize === 2){
                    this.setVelocityX(100);
                    this.setVelocityY(-120); 
                }
            }else if(player1.x < this.x && this.moveCycleTimer > 180){
                if(this.slimePreviousY < this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                // jumps the slime to the left
                if(this.slimeSize === 1){
                    this.setVelocityX(-150);
                    this.setVelocityY(-160); 
                }else if(this.slimeSize === 2){
                    this.setVelocityX(-100);
                    this.setVelocityY(-120); 
                }
            }else if(this.moveCycleTimer > 30 && this.moveCycleTimer < 32){
                if(this.slimeSize === 1){
                    this.anims.play('slimeIdle',true); 
                } else if(this.slimeSize === 2){
                    this.anims.play('slimeLargeIdle',true); 
                }
                this.setVelocityX(0);
                
            }

        }else{
            this.anims.play('slimeIdle',true);
            //console.log("slime idoling");
        }
        //incriments the move cycle timer.
        if(this.moveCycleTimer <= 200){
            this.moveCycleTimer++;
        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.slimePreviousY = this.y;
    }
    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveSlimeIdle(){
        if(this.slimeSize === 1){
        this.anims.play('slimeIdle',true); 
        this.setSize(30,20,true);
        }else if(this.slimeSize === 2){
            this.anims.play('slimeLargeIdle',true); 
            this.setSize(40,34,true);
        }
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    slimeGameOver(){
        this.setSize(40,60,true);
        this.anims.play('slimeGameOver',true);
    }
    
    //the grab function. is called when player has overlaped with an enemy slime.
    slimeGrab(player1,hpBar,keyA,KeyDisplay,keyD,scene,keyTAB){
        //console.log("this.playerGrabbed: "+this.playerGrabbed);
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.
        scene.attackHitBox.y = player1.y+10000;
        // if the grabbed is false but this function is called then do the following.
        if(this.playerGrabbed === false){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        this.x = player1.x;
        this.y = player1.y;
        player1.y = this.y-150;
        // makes the key prompts visible.
        KeyDisplay.visible = true;
        KeyDisplay.playAKey();
        
        // if its a small slime then play the small slime grab animation.
        if(this.slimeSize === 1){
            // check to make sure animations dont conflict with eachother.
            if(this.playerDefeated == false && this.playerBrokeFree == 0){
            this.anims.play("slimeGrab",true);
            }

            // when entering grabs sets offset correctly so play isn't clipping through the ground. or clips through the ground falling nito the void
        this.setOffset(40,59);
        
        }else if(this.slimeSize === 2){
            this.setSize(20,65,true);
            this.anims.play("slimeGrabLarge");
            this.y -= 10;
            scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    if(hpBar.playerHealth > 0 && this.playerGrabbed === true){
                        this.anims.play("slimeGrabLargeHold", true);
                    }
                },
                loop: true
            });
        }
        // makes sure the internal grab variable in this slime obj3ect is set to true.
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
        }else if(this.playerGrabbed === true){
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            player1.y = this.y-150;
            player1.body.setGravityY(0);
            player1.setSize(10,10,true);
            //puts the key display in the correct location.
            KeyDisplay.x = this.x;
            KeyDisplay.y = this.y+50;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            if(this.playerDamaged === false && hpBar.playerHealth > 0 ){
                hpBar.calcDamage(1);
                this.playerDamaged = true;
            }
             // controlls the int which determines the value to break free. the first case checks to see if thep layer pressed a then adds a int to the struggle free counter.
             if(Phaser.Input.Keyboard.JustDown(keyA) && this.struggleCounter < 100 && hpBar.playerHealth >= 1 && this.slimeSize === 1 ){
                this.struggleCounter += 25;
                console.log('strugglecounter: '+this.struggleCounter);
             }else if(keyA.isDown && this.struggleCounter < 100 && hpBar.playerHealth > 1 && this.slimeSize === 2){
                this.struggleCounter++;
                //if player breaks free then set value here. used to make sure animation plays properly.
                if(this.struggleCounter>= 100){
                    this.playerBrokeFree = 1;
                }
             }else if(this.struggleCounter > 0 && this.struggleCounter < 100){// this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                console.log('strugglecounter: '+this.struggleCounter);
             }
             // large slime functions for breaking free as well
             if(hpBar.playerHealth >= 1 && this.largeSlimeDamageCounter === 200){
                this.largeSlimeDamageCounter = 0 ;
                hpBar.calcDamage(1);
            }else if(this.slimeSize === 2 && this.largeSlimeDamageCounter < 200 && hpBar.playerHealth >= 1){
                this.largeSlimeDamageCounter++;
                console.log(" large slime damage counter: "+this.largeSlimeDamageCounter);
            }else if(this.slimeSize === 1 && hpBar.playerHealth === 0){// if the player has been defeated the do the following steps.
                this.playerDefeated = true;
                 //console.log(" keyA: "+keyA+" keyD: "+keyD);
                 scene.skipIndicator.visible = true;
                // if we start the player defeated animation then we need to set a few things.
                 if(this.playerDefeatedAnimationStage === 0){
                    KeyDisplay.playDKey();
                    currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
                    //console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                    // delay the button prompt so the animation can play.
                    setTimeout(function(){
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                        //incriment the animation prompt since we want to move on to the next animation after the current one finishes
                        currentSlime.playerDefeatedAnimationStage++;
                        console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                        },1000);
                    this.playerDefeatedAnimationStage++;
                    console.log("this.playerDefeatedAnimationStage: "+this.playerDefeatedAnimationStage);
                 }

                 if(keyD.isDown && KeyDisplay.visible === true && this.playerDefeatedAnimationStage != 5 && this.playerDefeatedAnimationStage != 6 && this.playerDefeatedAnimationStage != 8){
                    KeyDisplay.visible = false;
                    //this.stageTimer = 0;
                    this.playerDefeatedAnimationStage++;
                    console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                    
                    this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                    setTimeout(function(){
                        console.log("defeated animation delay.");
                        KeyDisplay.visible = true;
                        KeyDisplay.playDKey();
                        },3000);
                 }
                 // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                 if(keyTAB.isDown ||(this.playerDefeatedAnimationStage > 8 && keyD.isDown)){
                    KeyDisplay.visible = false;
                    console.log("changing scene");
                    scene.changeToGameover();
                }
                 
                 //console.log("player defeated by small slime");
                 this.smallSlimeDefeatedPlayerAnimation();
            }else if(this.slimeSize === 2 && hpBar.playerHealth === 0){
               
            }
            // if the player breaks free then do the following
             if(this.struggleCounter >= 100){
                KeyDisplay.visible = false;
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if(this.slimeSize === 1 && this.struggleFree < 100 ){
                    console.log("Free counter: "+this.struggleFree);
                    this.struggleFree++; 
                    if(!this.animationPlayed){
                        this.anims.play('slimeGrabBreak');
                        this.animationPlayed = true;
                    }
            
                    
                    
                    
                }else if(this.slimeSize === 2 && this.struggleFree < 120 ){
                    console.log("Free counter: "+this.struggleFree);
                    this.struggleFree++;
    
                }else if(this.struggleFree >= 100){
                    this.struggleFree = 0;
                    this.playerBrokeFree = 0;
                    if(this.slimeSize === 1){
                        this.anims.play("slimeIdle",true);
                    }else if(this.slimeSize === 2){
                        this.anims.play("slimeLargeIdle",true);
                    }
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.setSize(20,20,true);
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    player1.visible = true;
                    player1.setSize(23,68,true);
                    player1.body.setGravityY(600);
                    player1.x = this.x;
                    player1.y = this.y;
                    KeyDisplay.visible = false;
                }
                
             }
        }
        
    }


    slimeCombine(otherSlime,grabbed){
        //console.log("combining slime with id: "+this.slimeId+" to the other slime with id: "+otherSlime.slimeId)
        //console.log("grabbed : "+ grabbed);
        if(grabbed === false){
            if(this.slimeId === otherSlime.slimeId){
                //console.log("slime overlap with its self detected;");
                return;
            }else if(this.slimeId < otherSlime.slimeId) {
                //console.log("this slime with Id: "+ this. slimeId+" is living")
                this.anims.play("mitosis");
                this.slimeSize = 2;
                this.slimeHp = 40;
                this.mitosing = true;
                //console.log("this.mitosing: "+ this.mitosing);
                this.mitosisCounter = 20;
                //console.log("this.mitosisCounter: "+ this.mitosisCounter);
                otherSlime.destroy();
            }
        }else if(grabbed === true){
            this.mitosisCounter = 0;
        }
    }

    mitosisDelayCheck(){
        if(this.slimeSize === 2 && this.mitosisCounter === 0){
            this.mitosing = false;
            console.log("this.mitosing: "+ this.mitosing);
            console.log("this.mitosisCounter: "+ this.mitosisCounter);
        }else if(this.mitosisCounter > 0){
            this.mitosisCounter--;
            this.anims.play("mitosis");
            console.log("this.mitosisCounter: "+ this.mitosisCounter);
        }
    }

    slimeDamage(scene){
        this.setVelocityX(0);
        if(this.damageCoolDown === false){
            this.damageCoolDown = true;
            this.setTint(0xff7a7a);
            if(this.slimeHp > 0){
                //apply damage function here. maybe keep ristances as a variable a part of enemy then make a function to calculate damage
                this.slimeCalcDamage( 
                    scene.player1.sliceDamage,
                    scene.player1.bluntDamage,
                    scene.player1.pierceDamage,
                    scene.player1.heatDamage,
                    scene.player1.lightningDamage,
                    scene.player1.coldDamage
                    );
                if(this.slimeHp <= 0){
                    this.destroy();
                }
            } 
            console.log("damage cool down:"+this.damageCoolDown);
            let that = this;
            
            setTimeout(function(){
                that.damageCoolDown = false;
                console.log("damage cool down:"+ that.damageCoolDown);
                that.clearTint();
              },100);
        }
    }
    //handles damage types for blue slime. get these damage types from the attack that hits the enemy
    slimeCalcDamage(slice,blunt,pierce,heat,lightning,cold){
        console.log("slice "+ slice+" blunt "+blunt+" pierce "+pierce+" heat "+heat+" lightning "+lightning+" cold "+cold);
        if(slice > 0){
            this.slimeHp -= (slice/4);
        }
        if(blunt > 0){
            this.slimeHp -= (blunt*3);
        }
        if(pierce > 0){
            this.slimeHp -= (pierce/2);
        }
        if(heat > 0){
            this.slimeHp -= (heat/4);
        }
        if(lightning > 0){
            this.slimeHp -= (lightning*2);
        }
        if(cold > 0){
            this.slimeHp -= (cold/4);
        }
    }

    smallSlimeDefeatedPlayerAnimation(){
        if(this.playerDefeatedAnimationStage === 1){
            if(!this.animationPlayed){
                this.anims.play('slimeGrabFallingDefeated');
                this.animationPlayed = true;
                setTimeout(function(){
                    currentSlime.animationPlayed = false;
                    //this.playerDefeatedAnimationStage++;
                    },1000);
            }
        }else if(this.playerDefeatedAnimationStage === 2){
            this.anims.play('slimeGrabDefeated1',true);
        }else if(this.playerDefeatedAnimationStage === 3){
            this.anims.play('slimeGrabDefeated2',true);
        }else if(this.playerDefeatedAnimationStage === 4){
            this.anims.play('slimeGrabDefeated3',true);
        }else if(this.playerDefeatedAnimationStage === 5){
            if(!this.animationPlayed){
            this.anims.play('slimeGrabDefeated4');
            this.animationPlayed = true;
                setTimeout(function(){
                    currentSlime.animationPlayed = false;
                    currentSlime.playerDefeatedAnimationStage++;
                    console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                    },1000);
            }
        }else if(this.playerDefeatedAnimationStage === 6){
            if(!this.animationPlayed){
                this.anims.play('slimeGrabDefeated5');
                this.animationPlayed = true;
                    setTimeout(function(){
                        currentSlime.animationPlayed = false;
                        currentSlime.playerDefeatedAnimationStage++;
                        console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                        },1000);
                }
        }else if(this.playerDefeatedAnimationStage === 7){
            this.anims.play('slimeGrabDefeated6',true);
        }else if(this.playerDefeatedAnimationStage === 8){
            if(!this.animationPlayed){
                this.anims.play('slimeGrabDefeated7');
                this.animationPlayed = true;
                    setTimeout(function(){
                        currentSlime.animationPlayed = false;
                        currentSlime.playerDefeatedAnimationStage++;
                        console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                        },1000);
                }
        }
    
    
    }


}
