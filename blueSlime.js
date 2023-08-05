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
// when making enemys bve warry of defining it as a global variable. when you use settimeout function this can cause problems where the global variable name is unintentionally shared between objects.
// when making settimeout functions for entitys that you make a group of always use a local variable defined before the settimeout function that is defined as that object.
//let currentSlime;
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
        this.moveCycleTimer = false;
        this.activatedCycleTimer = false;
        this.randomMoveTimer =  Math.floor((Math.random() * 5000) + 2000);
        this.randomXVelocity =  Math.floor((Math.random() * 50) + 100);
        this.randomYVelocity =  Math.floor((Math.random() * 100) + 100);
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.mitosing = false;
        this.SlimeAnimationPosition; 
        this.mitosisCounter = false;
        this.struggleFree = false;
        this.grabCoolDown = false;
        this.slimeId = 0;
        this.largeSlimeDamageCounter = false;
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
        this.randomInput = Math.floor((Math.random() * 2));
        this.randomInputCooldown = false;
        this.keyAnimationPlayed = false;
        this.struggleCounterTick = false;
        this.setScale(.34);
        
        
        
    
       
        
        
        console.log("sex passed in slime: "+sex);
        //defines Slime animations.
        if(sex === 0){
            this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 0, end: 3 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 5, end: 5 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 14, end: 19 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabBreak',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 20, end: 22 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'slimeGrabFallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 23, end: 30 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 31, end: 34 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 36, end: 37 }),frameRate: 7,repeat: 1});
            this.anims.create({key: 'slimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 36, end: 39 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 40, end: 45 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 46, end: 52 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 53, end: 55 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated7',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 56, end: 66 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGameOver',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 67, end: 71 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'mitosis',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 72, end: 78 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeLargeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 78, end: 81 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeLargeUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 82, end: 82 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeLargeDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 83, end: 83 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeStruggle',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 85, end: 100 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimefallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 101, end: 108 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 104, end: 107 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 108, end: 112 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 113, end: 116 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 116, end: 119 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 120, end: 141 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 141, end: 144 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGameOver1',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 145, end: 148 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGameOver2',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 149, end: 152 }),frameRate: 7,repeat: -0});
            this.anims.create({key: 'slimeGameOver3',frames: this.anims.generateFrameNames('CommonBlueSlime-evan', { start: 152, end: 155 }),frameRate: 7,repeat: -1});
        }else{
            this.anims.create({key: 'slimeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 0, end: 3 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 5, end: 5 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeJumpDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 6, end: 6 }),frameRate: 12,repeat: -1});
            this.anims.create({key: 'slimeGrab',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 14, end: 19 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabBreak',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 20, end: 22 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'slimeGrabFallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 23, end: 30 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 31, end: 34 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 36, end: 37 }),frameRate: 7,repeat: 1});
            this.anims.create({key: 'slimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 36, end: 39 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 40, end: 45 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 46, end: 52 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 53, end: 55 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGrabDefeated7',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 56, end: 66 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeGameOver',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 67, end: 71 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'mitosis',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 72, end: 78 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'slimeLargeIdle',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 78, end: 81 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeLargeUp',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 82, end: 82 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeLargeDown',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 83, end: 83 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeStruggle',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 85, end: 100 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimefallingDefeated',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 101, end: 108 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated1',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 104, end: 107 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated2',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 108, end: 112 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated3',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 113, end: 116 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated4',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 116, end: 119 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'largeSlimeGrabDefeated5',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 120, end: 141 }),frameRate: 7,repeat: 0});
            this.anims.create({key: 'largeSlimeGrabDefeated6',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 141, end: 144 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGameOver1',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 145, end: 148 }),frameRate: 7,repeat: -1});
            this.anims.create({key: 'slimeGameOver2',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 149, end: 152 }),frameRate: 7,repeat: -0});
            this.anims.create({key: 'slimeGameOver3',frames: this.anims.generateFrameNames('CommonBlueSlime-evelyn', { start: 152, end: 155 }),frameRate: 7,repeat: -1});
        }

      
       
    }

    //functions that move slime objects.
    moveSlime(player1){
        
        //console.log("previous slime y: "+ this.slimePreviousY+" current slime y:"+this.y);
        //if the slime is of size 1 then set its hit box to the correct size
        if(this.slimeSize === 1){
        this.setSize(90,65,true);
        this.setOffset(105,233);
        
        this.body.setGravityY(600);
        //else if the slime is size 2 then set its hit box to the correct size
        }else if(this.slimeSize === 2){
            this.setSize(130,90,true);
            this.setOffset(82,209);
            this.body.setGravityY(700);
        }
        //this.movecycletimer is used to keep track of the slime movement. its incrimented to 100 and then set to zero so it loops
        if(this.moveCycleTimer === true && this.activatedCycleTimer === false){
            let currentSlime = this;
            //console.log("recieved the delay, currentSlime.moveCycleTimer: "+ currentSlime.moveCycleTimer+" currentSlime.activatedCycleTimer:"+currentSlime.activatedCycleTimer);
            setTimeout(function(){
                currentSlime.moveCycleTimer = false;
                currentSlime.activatedCycleTimer = false;
                //console.log("After three seconds we completely reset both of our cycle variables. currentSlime.moveCycleTimer: "+ currentSlime.moveCycleTimer+" currentSlime.activatedCycleTimer:"+currentSlime.activatedCycleTimer);
               // console.log("currentSlime.randomMoveTimer: "+ currentSlime.randomMoveTimer);
                currentSlime.randomMoveTimer =  Math.floor((Math.random() * 3000) + 2000);
                },this.randomMoveTimer);
               // console.log("now that this case has been called we should block it from being called multiple times, currentSlime.moveCycleTimer: "+ currentSlime.moveCycleTimer+" currentSlime.activatedCycleTimer:"+currentSlime.activatedCycleTimer);
                this.activatedCycleTimer = true;
        }
        //checks to see if slime should jump to move if the player is in range
        if(player1.x > this.x-400 && player1.x < this.x+400){
            console.log("player is in range of slime");
            //checks to see if slime should jump to move if the move cycle is correct for the current instance of slime.
            if(player1.x > this.x && this.moveCycleTimer === false && this.activatedCycleTimer === false){
                console.log("player is to the right of the slime");
                //this if statement checks where the slime is in its jump cycle. if its going up then it plays the up animation
                if(this.slimePreviousY > this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2 && this.mitosing === false){
                        this.anims.play('slimeLargeUp',true); 
                    }
                //otherwise it plays falling down animation
                }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2 && this.mitosing === false){
                        this.anims.play('slimeLargeDown',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2 && this.mitosing === false){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                // jumps the slime to the right
                //console.log("jump slime right");
                if(this.slimeSize === 1){
                    //this.setVelocityX(200);
                    //this.setVelocityY(-200); 
                    this.setVelocityX(this.randomXVelocity);
                    this.setVelocityY(this.randomYVelocity * -1); 
                    //console.log("this.randomXVelocity: "+this.randomXVelocity+" this.randomYVelocity: "+ this.randomYVelocity);
                }else if(this.slimeSize === 2){
                    this.setVelocityX(this.randomXVelocity);
                    this.setVelocityY(this.randomYVelocity * -1); 
                }
                let currentSlime = this;
                setTimeout(function(){
                    currentSlime.moveCycleTimer = true;
                    currentSlime.randomXVelocity =  Math.floor((Math.random() * 50) + 150);
                    currentSlime.randomYVelocity =  Math.floor((Math.random() * 100) + 150);
                    },200);
                //console.log("the slime has moved so now we should delay, this.moveCycleTimer: "+this.moveCycleTimer);
            }else if(player1.x < this.x &&  this.moveCycleTimer === false && this.activatedCycleTimer  === false){
                //console.log("player is to the left of the slime");
                if(this.slimePreviousY < this.y){
                    
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpUp',true); 
                    } else if(this.slimeSize === 2&& this.mitosing === false){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else if(this.slimePreviousY <= this.y){
                    if(this.slimeSize === 1){
                        this.anims.play('slimeJumpDown',true); 
                    } else if(this.slimeSize === 2&& this.mitosing === false){
                        this.anims.play('slimeLargeUp',true); 
                    }
                    }else{
                    if(this.slimeSize === 1){
                        this.anims.play('slimeIdle',true); 
                    } else if(this.slimeSize === 2&& this.mitosing === false){
                        this.anims.play('slimeLargeIdle',true); 
                    }
                }
                // jumps the slime to the left
                //console.log("jump slime left");
                if(this.slimeSize === 1){
                    this.setVelocityX(this.randomXVelocity * -1);
                    this.setVelocityY(this.randomYVelocity * -1); 
                    console.log("this.randomXVelocity: "+this.randomXVelocity+" this.randomYVelocity: "+ this.randomYVelocity);
                }else if(this.slimeSize === 2){
                    this.setVelocityX(this.randomXVelocity * -1);
                    this.setVelocityY(this.randomYVelocity * -1); 
                } 
                let currentSlime = this;
                setTimeout(function(){
                    currentSlime.moveCycleTimer = true;
                    currentSlime.randomXVelocity =  Math.floor((Math.random() * 50) + 150);
                    currentSlime.randomYVelocity =  Math.floor((Math.random() * 100) + 150);
                    },200);
                
                //console.log("the slime has moved so now we should delay, this.moveCycleTimer: "+this.moveCycleTimer);
            }else if(this.moveCycleTimer === true && this.activatedCycleTimer === true && this.body.blocked.down){
                if(this.slimeSize === 1){
                    this.anims.play('slimeIdle',true); 
                } else if(this.slimeSize === 2 && this.mitosing === false){
                    this.anims.play('slimeLargeIdle',true); 
                }
                this.setVelocityX(0);
                //this.moveCycleTimer = true;
                //this.activatedCycleTimer = false;
                
            }
            let currentSlime = this;
            //console.log("currentSlime.moveCycleTimer: "+ currentSlime.moveCycleTimer+" currentSlime.activatedCycleTimer:"+currentSlime.activatedCycleTimer);
        }else{
            //console.log("player is not in range of slime");
            this.anims.play('slimeIdle',true);
            this.setVelocityX(0);
            //console.log("slime idoling");
        }
        //updates the previous y value to tell if slime is falling or going up in its jump.
        this.slimePreviousY = this.y;
        //console.log("currentSlime.moveCycleTimer: "+ currentSlime.moveCycleTimer+" currentSlime.activatedCycleTimer:"+currentSlime.activatedCycleTimer);
    }
    //simple idle function played when the player is grabbed by something that isnt this slime.
    moveSlimeIdle(){
        if(this.slimeSize === 1){
        this.anims.play('slimeIdle',true); 
        this.setSize(90,65,true);
        }else if(this.slimeSize === 2){
            this.anims.play('slimeLargeIdle',true); 
            this.setSize(40,34,true);
        }
        this.body.setGravityY(600);
        this.setVelocityX(0);

    }

    slimeGameOver(){
        this.setSize(100,150,true);
        this.setOffset(90,150);
        this.anims.play('slimeGameOver',true);
    }

    largeSlimeGameOver(){
        this.setSize(130,90,true);
        this.setOffset(82,209);
        this.anims.play('slimeGameOver1',true);
        this.y-500;
        let currentSlime = this;
        setTimeout(function(){
            currentSlime.anims.play('slimeGameOver2',true);
          },1000);
          setTimeout(function(){
            currentSlime.anims.play('slimeGameOver3',true);
          },1700);
    }
    
    //the grab function. is called when player has overlaped with an enemy slime.
    slimeGrab(player1,hpBar,keyA,KeyDisplay,keyD,scene,keyTAB){
        let currentSlime = this;
        //console.log("this.playerGrabbed: "+this.playerGrabbed);
        //first checks if slime object has detected grab. then sets some values in acordance with that and sets this.playerGrabbed = true.
        this.clearTint();
        // moves player attackhitbox out of the way.
        scene.attackHitBox.y = player1.y+10000;
        // if the grabbed is false but this function is called then do the following.
        if(this.playerGrabbed === false){
        // hides the players hitbox. all animations take place in the enemy sprite sheet during a grab.
        console.log("this slime did not grab the player this.slimeID: "+ this.slimeId);
        player1.visible = false;
        // puts the player hitbox out of the way and locked to a specific location.
        //this.x = player1.x;
        //this.y = player1.y;
        player1.y = this.y-150;
        // makes the key prompts visible.
        KeyDisplay.visible = true;
        
        // if its a small slime then play the small slime grab animation.
        if(this.slimeSize === 1){
            // check to make sure animations dont conflict with eachother.
            if(this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed){
            this.anims.play("slimeGrab",true);
            }

            // when entering grabs sets offset correctly so play isn't clipping through the ground. or clips through the ground falling nito the void
        //this.setOffset(40,129);
        
        }else if(this.slimeSize === 2){
            if(this.playerDefeated == false && this.playerBrokeFree == 0 && !this.animationPlayed){
                this.anims.play("largeSlimeStruggle",true);
                }
            //this.y -= 100;
            /*scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    if(hpBar.playerHealth > 0 && this.playerGrabbed === true){
                        this.anims.play("slimeGrabLargeHold", true);
                    }
                },
                loop: true
            });*/
        }
        // makes sure the internal grab variable in this slime obj3ect is set to true.
        this.playerGrabbed = true;
        //if the player is grabbed then do the following.
        }else if(this.playerGrabbed === true){
            //console.log("this slime did grab the player this.slimeID: "+ this.slimeId);
            // if the player is properly grabbed then change some attribute of thep lay to get there hitbox out of the way.
            player1.y = this.y-150;
            player1.body.setGravityY(0);
            //this.body.setGravityY(0);
            player1.setSize(10,10,true);
            //puts the key display in the correct location.
            KeyDisplay.x = this.x;
            KeyDisplay.y = this.y+70;
            // deals damage to the player. should remove the last part of the ifstatement once small defeated animation function is implemented.
            if(this.playerDamaged === false && hpBar.playerHealth > 0 ){
                hpBar.calcDamage(1);
                this.playerDamaged = true;
            }
             //console.log('Phaser.Input.Keyboard.JustDown(keyA) '+ Phaser.Input.Keyboard.JustDown(scene.keyA)+' strugglecounter: '+this.struggleCounter+" hpBar.playerHealth: "+hpBar.playerHealth+" this.slimeSize: "+this.slimeSize);
             // something wacky. once the Phaser.Input.Keyboard.JustDown(keyA) is checked for something ur uses,
             // it changes back to false. atleast thats what i think is happening. so if we are checking if its true its the only thing we can do during that update loop function call.
             // so we have to structure it like so.
             // this chunk of code checks a random number to tell what button prompt it is. 0 is keyA and 1 is Key D
             // after we decide the correct key we then check of the correct key is down. if so add to the struggle counter
             // if slime is size 2 it has this behavio4r, other wise it has a simple keyA prompt.
             if(this.playerDefeated === false){
             if(this.randomInput === 0 && this.slimeSize === 2){
                if(Phaser.Input.Keyboard.JustDown(keyA) === true ){
                    console.log('Phaser.Input.Keyboard.JustDown(keyA) ');
                     if(hpBar.playerHealth >= 1){
                        this.struggleCounter += 20;
                    console.log('strugglecounter: '+this.struggleCounter);
                    }
                }
                }else if(this.randomInput === 1 && this.slimeSize === 2){
                    // important anims.play block so that the animation can player properly.
                    if(Phaser.Input.Keyboard.JustDown(keyD) === true ){
                        console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                         if(hpBar.playerHealth >= 1){
                            this.struggleCounter += 20;
                        console.log('strugglecounter: '+this.struggleCounter);
                        }
                    } 
                 }else if(this.slimeSize === 1){
                    // important anims.play block so that the animation can player properly.
                   
                    if(Phaser.Input.Keyboard.JustDown(keyA) === true ){
                        console.log('Phaser.Input.Keyboard.JustDown(keyD) ');
                        if(this.slimeSize === 1 && hpBar.playerHealth >= 1){
                            this.struggleCounter += 25;
                        console.log('strugglecounter: '+this.struggleCounter);
                     }
                 }

             }
             // randomizing input
             if(this.randomInputCooldown === false && this.slimeSize === 2){
                
                this.randomInputCooldown = true;
                this.randomInput = Math.floor((Math.random() * 2));
                console.log("randomizing the key prompt "+this.randomInput);
                // important anims.play block so that the animation can player properly.
                if(this.keyAnimationPlayed === false && this.randomInput === 0){
                    console.log(" setting keyA display");
                    KeyDisplay.playAKey();
                    this.keyAnimationPlayed = true;
                }else if(this.keyAnimationPlayed === false && this.randomInput === 1){
                    console.log(" setting keyD display");
                    KeyDisplay.playDKey();
                    this.keyAnimationPlayed = true;
                }
                setTimeout(function(){
                    currentSlime.randomInputCooldown = false;
                    // resets the animation block.
                    currentSlime.keyAnimationPlayed = false;
                  },2000);
            }
        }
             // reduces the struggle counter over time. could use settime out to make sure the count down is consistant?
             if(this.struggleCounter > 0 && this.struggleCounter < 100){
                // this case subtracts from the struggle free counter if the value is not pressed fast enough.
                this.struggleCounter--;
                this.struggleCounterTick = true;
                // the settimeout function ensures that the strugglecounter is consistant and not dependant on pc settings and specs.
                setTimeout(function(){
                    currentSlime.struggleCounterTick = false;
                  },1);
                //console.log('strugglecounter: '+this.struggleCounter);
             }
             // large slime functions for breaking free as well
             if(this.slimeSize === 2 && hpBar.playerHealth >= 1 && this.largeSlimeDamageCounter === false && this.struggleCounter <= 100){
                this.largeSlimeDamageCounter = true;
                hpBar.calcDamage(1);
                setTimeout(function(){
                    currentSlime.largeSlimeDamageCounter = false;
                  },1500);
            }else if(this.slimeSize === 1 && hpBar.playerHealth === 0){// if the player has been defeated the do the following steps.
                this.playerDefeated = true;
                 //console.log(" keyA: "+keyA+" keyD: "+keyD);
                 scene.skipIndicator.visible = true;
                 scene.enemyThatDefeatedPlayer = "blueSlime";
                // if we start the player defeated animation then we need to set a few things.
                 if(this.playerDefeatedAnimationStage === 0){
                    KeyDisplay.playDKey();
                    let currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
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
                    let currentSlime = this;
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
                this.playerDefeated = true;
                //console.log(" keyA: "+keyA+" keyD: "+keyD);
                scene.skipIndicator.visible = true;
                scene.enemyThatDefeatedPlayer = "largeBlueSlime";
               // if we start the player defeated animation then we need to set a few things.
                if(this.playerDefeatedAnimationStage === 0){
                   KeyDisplay.playDKey();
                   let currentSlime = this; // important, sets currentSlime to the current object so that we can use variables attached to this current slime object in our set timeout functions.
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

                if(keyD.isDown && KeyDisplay.visible === true && this.playerDefeatedAnimationStage != 3 && this.playerDefeatedAnimationStage != 6 ){
                   KeyDisplay.visible = false;
                   //this.stageTimer = 0;
                   this.playerDefeatedAnimationStage++;
                   let currentSlime = this;
                   console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                   
                   this.currentSlime = this;// massively important. allows for the settimeout functions to acess variables attached to this object.
                   setTimeout(function(){
                       console.log("defeated animation delay.");
                       KeyDisplay.visible = true;
                       KeyDisplay.playDKey();
                       },3000);
                }
                // if tab is pressed or the player finished the defeated animations then we call the game over scene.
                if(keyTAB.isDown ||(this.playerDefeatedAnimationStage > 7 && keyD.isDown)){
                   KeyDisplay.visible = false;
                   console.log("changing scene");
                   scene.changeToGameover();
               }
                
                //console.log("player defeated by small slime");
                this.largeSlimeDefeatedPlayerAnimation();
            }
            // if the player breaks free then do the following
             if(this.struggleCounter >= 100 && hpBar.playerHealth >= 1){
                KeyDisplay.visible = false;
                // can we replace this with a settimeout function? probbably. lets make a backup first.
                if(this.slimeSize === 1 && this.struggleFree === false ){
                    console.log("Free counter: "+this.struggleFree);
                    // handles the breaking free animation.
                    if(!this.animationPlayed){
                        this.anims.play('slimeGrabBreak');
                        this.animationPlayed = true;
                    }
                    setTimeout(function(){
                        currentSlime.struggleFree = true;
                      },1500);
            
                    
                    
                    
                }else if(this.slimeSize === 2 && this.struggleFree === false && hpBar.playerHealth >= 1 ){
                    
                    setTimeout(function(){
                        currentSlime.struggleFree = true;
                      },100);
            
    
                }else if(this.struggleFree === true && hpBar.playerHealth >= 1){
                    this.struggleFree = false;
                    this.playerBrokeFree = 0;
                    if(this.slimeSize === 1){
                        this.anims.play("slimeIdle",true);
                    }else if(this.slimeSize === 2){
                        this.anims.play("slimeLargeIdle",true);
                    }
                    this.struggleCounter = 0;
                    this.animationPlayed = false;
                    this.setSize(90,65,true);
                    this.playerDamaged = false;
                    this.playerGrabbed = false;
                    this.keyAnimationPlayed = false;
                    player1.visible = true;
                    player1.setSize(23,68,true);
                    player1.body.setGravityY(600);
                    this.body.setGravityY(600);
                    player1.x = this.x;
                    player1.y = this.y;
                    KeyDisplay.visible = false;
                    // creates a window of time where the player cant be grabbed after being released.
                    // creates a cooldown window so the player does not get grabbed as they escape.
                    setTimeout(function(){
                        currentSlime.grabCoolDown = false;
                        scene.grabCoolDown = false;
                        console.log("grab cooldown has ended. player can be grabbed agian.");
                        },3000);
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
                this.setSize(130,90,true);
                this.setOffset(82,209);
                this.anims.play("mitosis");
                this.slimeSize = 2;
                this.slimeHp = 40;
                this.mitosing = true;
                //console.log("this.mitosing: "+ this.mitosing);
                this.mitosisCounter = true;
                //console.log("this.mitosisCounter: "+ this.mitosisCounter);
                otherSlime.destroy();
                let currentSlime = this;
                setTimeout(function(){
                    currentSlime.mitosisCounter = false;
                    currentSlime.mitosing = true;
                    
                    },1000);

            }
        }else if(grabbed === true){
            this.mitosisCounter = false;
        }
    }

    mitosisDelayCheck(){
        if(this.slimeSize === 2 && this.mitosisCounter === false){
            this.mitosing = false;
            //console.log("this.mitosing: "+ this.mitosing);
            //console.log("this.mitosisCounter: "+ this.mitosisCounter);
        }else if(this.mitosisCounter === true){
            //this.mitosisCounter--;
            //this.anims.play("mitosis");
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
        let currentSlime = this;
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

    largeSlimeDefeatedPlayerAnimation(){
        let currentSlime = this;
        if(this.playerDefeatedAnimationStage === 1){
            if(!this.animationPlayed){
                this.anims.play('largeSlimefallingDefeated');
                this.animationPlayed = true;
                
                setTimeout(function(){
                    currentSlime.animationPlayed = false;
                    //this.playerDefeatedAnimationStage++;
                    },1000);
            }
        }else if(this.playerDefeatedAnimationStage === 2){
            this.anims.play('largeSlimeGrabDefeated1',true);
        }else if(this.playerDefeatedAnimationStage === 3){
            if(!this.animationPlayed){
                this.anims.play('largeSlimeGrabDefeated2');
                this.animationPlayed = true;
                    setTimeout(function(){
                        currentSlime.animationPlayed = false;
                        currentSlime.playerDefeatedAnimationStage++;
                        console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                        },1000);
                }
        }else if(this.playerDefeatedAnimationStage === 4){
            this.anims.play('largeSlimeGrabDefeated3',true);
        }else if(this.playerDefeatedAnimationStage === 5){
            this.anims.play('largeSlimeGrabDefeated4',true);
        }else if(this.playerDefeatedAnimationStage === 6){
            if(!this.animationPlayed){
                this.anims.play('largeSlimeGrabDefeated5');
                this.animationPlayed = true;
                    setTimeout(function(){
                        currentSlime.animationPlayed = false;
                        currentSlime.playerDefeatedAnimationStage++;
                        console.log("currentSlime.playerDefeatedAnimationStage: "+currentSlime.playerDefeatedAnimationStage);
                        },3000);
                }
        }else if(this.playerDefeatedAnimationStage === 7){
            this.anims.play('largeSlimeGrabDefeated6',true);
        }
    
    
    }

    pauseSlimeAnimations(scene){
        if(scene.isPaused === true){
            this.anims.pause();
        }else if(scene.isPaused === false){
            this.anims.resume();
        }

    }


}
